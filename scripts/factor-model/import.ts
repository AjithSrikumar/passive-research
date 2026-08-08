import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

import { FISCAL_YEARS, METRICS, MIN_N, type Block } from "./config";
import { loadWorkbook, loadCompanies, loadMetricSheet, loadMembership, cellValue } from "./workbook";
import { blockScore, compositeScore, type BlockScoreResult, type MetricRow, type ScoreContext } from "./score";
import { runBacktest } from "./backtest";
import { buildRicSlugMap } from "./map-names";

const __dir = dirname(fileURLToPath(import.meta.url));

try {
  const envPath = join(__dir, "../../.env.local");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* no .env.local -> rely on real env */
}

const DATABASE_URL = process.env.DATABASE_URL;
const DRY_RUN = process.argv.includes("--dry-run");
if (!DATABASE_URL) {
  console.error("DATABASE_URL missing (set it in .env.local)");
  process.exit(1);
}
const pool = DRY_RUN ? null : new pg.Pool({ connectionString: DATABASE_URL, max: 4 });

async function upsertMany(
  table: string,
  cols: string[],
  rows: unknown[][],
  conflictCols: string[]
): Promise<void> {
  if (rows.length === 0) return;
  if (DRY_RUN) {
    console.log(`  [dry] ${table}: ${rows.length} rows`);
    return;
  }
  const colList = cols.join(", ");
  const conflict = conflictCols.join(", ");
  const updates = cols
    .filter((c) => !conflictCols.includes(c))
    .map((c) => `${c} = EXCLUDED.${c}`)
    .join(", ");
  const CHUNK = 1000;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const placeholders = chunk
      .map((_, r) => `(${cols.map((_, c) => `$${r * cols.length + c + 1}`).join(", ")})`)
      .join(", ");
    await pool!.query(
      `INSERT INTO ${table} (${colList}) VALUES ${placeholders}
       ON CONFLICT (${conflict}) DO UPDATE SET ${updates}`,
      chunk.flat()
    );
  }
}

async function run() {
  const schema = readFileSync(join(__dir, "../../db/factor_model.sql"), "utf8");
  if (!DRY_RUN) await pool!.query(schema);

  const wb = await loadWorkbook();
  const companies = loadCompanies(wb.getWorksheet("Companies")!);
  console.log(`companies: ${companies.length} (removed: ${companies.filter((c) => c.removedPeriod).length})`);
  const ricSet = new Set(companies.map((c) => c.ric));

  // ---- raw metric values: ric|metricKey|fy -> value ----
  const valueMap = new Map<string, number>();
  for (const def of METRICS) {
    if (def.key === "momentum_1y") continue; // computed from prices below
    const rows = loadMetricSheet(wb.getWorksheet(def.sheet)!);
    let n = 0;
    for (const r of rows) {
      if (!ricSet.has(r.ric)) continue;
      for (const [fy, value] of r.values) {
        valueMap.set(`${r.ric}|${def.key}|${fy}`, value);
        n++;
      }
    }
    console.log(`  ${def.key}: ${rows.length} rows, ${n} values`);
  }

  // ---- prices + corrected 1-year momentum (replaces buggy Price_Close_HY%) ----
  const priceRows = loadMetricSheet(wb.getWorksheet("Price_Close")!);
  const priceMap = new Map<string, Map<number, number>>();
  for (const r of priceRows) {
    if (!ricSet.has(r.ric)) continue;
    priceMap.set(r.ric, r.values);
  }
  let momentumCount = 0;
  for (const [ric, years] of priceMap) {
    for (let i = 1; i < FISCAL_YEARS.length; i++) {
      const fy = FISCAL_YEARS[i];
      const prev = FISCAL_YEARS[i - 1];
      const cur = years.get(fy);
      const pv = years.get(prev);
      if (cur !== undefined && pv !== undefined && pv !== 0) {
        valueMap.set(`${ric}|momentum_1y|${fy}`, cur / pv - 1);
        momentumCount++;
      }
    }
  }
  console.log(`momentum_1y (recomputed): ${momentumCount} values`);

  // ---- membership ----
  const membershipRows = loadMembership(wb.getWorksheet("Nifty500_Membership")!);
  const membership = new Map(membershipRows.map((r) => [r.ric, r.years]));

  // ---- eligibility: FY12 full universe; FY13+ Nifty500 members ----
  const eligibleForYear = new Map<number, Set<string>>();
  const membershipByKey = new Map<string, boolean>();
  for (const fy of FISCAL_YEARS) {
    const s = new Set<string>();
    for (const c of companies) {
      const isMember = membership.get(c.ric)?.get(fy) ?? false;
      membershipByKey.set(`${c.ric}|${fy}`, isMember);
      if (fy === FISCAL_YEARS[0] || isMember) s.add(c.ric);
    }
    eligibleForYear.set(fy, s);
  }

  const collectCache = new Map<string, MetricRow[]>();
  const ctx: ScoreContext = {
    collect: (metricKey: string, fy: number): MetricRow[] => {
      const cacheKey = `${metricKey}|${fy}`;
      let rows = collectCache.get(cacheKey);
      if (!rows) {
        const eligible = eligibleForYear.get(fy)!;
        rows = [];
        for (const ric of eligible) {
          const v = valueMap.get(`${ric}|${metricKey}|${fy}`);
          if (v !== undefined) rows.push({ ric, value: v });
        }
        collectCache.set(cacheKey, rows);
      }
      return rows;
    },
    value: (ric: string, metricKey: string, fy: number) => valueMap.get(`${ric}|${metricKey}|${fy}`),
  };

  // ---- block scores + composites + ranks ----
  const blocks: Block[] = ["growth", "quality", "valuation", "momentum"];
  const scoreRows: { ric: string; block: Block; fy: number; score: number; n: number }[] = [];
  const compositeRows: { ric: string; fy: number; composite: number; rank: number }[] = [];
  for (const fy of FISCAL_YEARS) {
    const ranked: { ric: string; composite: number }[] = [];
    for (const ric of eligibleForYear.get(fy)!) {
      const res: Record<Block, BlockScoreResult> = {
        growth: blockScore(ric, fy, "growth", ctx),
        quality: blockScore(ric, fy, "quality", ctx),
        valuation: blockScore(ric, fy, "valuation", ctx),
        momentum: blockScore(ric, fy, "momentum", ctx),
      };
      for (const b of blocks) scoreRows.push({ ric, block: b, fy, score: res[b].score, n: res[b].nMetricsUsed });
      ranked.push({ ric, composite: compositeScore(res) });
    }
    ranked.sort((a, b) => b.composite - a.composite || a.ric.localeCompare(b.ric));
    ranked.forEach((r, i) => compositeRows.push({ ric: r.ric, fy, composite: r.composite, rank: i + 1 }));
  }

  // ---- backtest (Top-20, no look-ahead) ----
  const backtests = [];
  for (let i = 0; i < FISCAL_YEARS.length - 1; i++) {
    const fy = FISCAL_YEARS[i];
    const scores = new Map<string, number>();
    const returns = new Map<string, number>();
    for (const c of compositeRows.filter((r) => r.fy === fy)) {
      const exitClose = priceMap.get(c.ric)?.get(FISCAL_YEARS[i + 1] as number);
      const entryClose = priceMap.get(c.ric)?.get(fy as number);
      if (exitClose === undefined || entryClose === undefined || entryClose === 0) continue;
      scores.set(c.ric, c.composite);
      returns.set(c.ric, exitClose / entryClose - 1);
    }
    if (scores.size >= MIN_N) backtests.push(runBacktest({ fiscalYear: fy, scores, returns }));
  }

  // ---- RIC -> site slug mapping (via workbook Coverage_Map sheet) ----
  const coverage = wb.getWorksheet("Coverage_Map")!;
  const coverageNames: { name: string; ric: string }[] = [];
  for (let r = 5; r <= coverage.rowCount; r++) {
    const name = cellValue(coverage.getRow(r).getCell(2));
    const ric = cellValue(coverage.getRow(r).getCell(5));
    if (typeof name === "string" && name.trim() && typeof ric === "string" && ric.trim()) {
      coverageNames.push({ name: name.trim(), ric: ric.trim() });
    }
  }
  const { byRic, bySlug, matches } = buildRicSlugMap(coverageNames);
  console.log(`Coverage_Map rows: ${coverageNames.length}; site->RIC matches: ${matches}/133`);
  const slugByRic = new Map<string, string | null>();
  for (const c of companies) slugByRic.set(c.ric, byRic.get(c.ric) ?? null);
  const matched = [...slugByRic.values()].filter(Boolean).length;
  console.log(`RIC->slug mapping: ${matched}/${companies.length}`);
  const unmatchedSite = [...bySlug.entries()]
    .filter(([, ric]) => !ricSet.has(ric))
    .map(([slug, ric]) => `${slug}->${ric}`);
  if (unmatchedSite.length) console.log("  mapped to RIC not in universe:", unmatchedSite.join("; "));
  const unmatchedWb = companies.filter((c) => !slugByRic.get(c.ric) && !c.removedPeriod).slice(0, 10).map((c) => `${c.ric} (${c.name})`);
  if (unmatchedWb.length) console.log("  active, unmatched:", unmatchedWb.join("; "));

  // ---- writes ----
  await upsertMany(
    "factor_companies",
    ["ric", "name", "market_cap", "sector", "industry", "removed_period", "company_slug"],
    companies.map((c) => [c.ric, c.name, c.marketCap, c.sector, c.industry, c.removedPeriod, slugByRic.get(c.ric) ?? null]),
    ["ric"]
  );

  await upsertMany(
    "factor_years",
    ["fiscal_year", "is_live", "nifty500_filtered"],
    FISCAL_YEARS.map((fy, i) => [fy, i === FISCAL_YEARS.length - 1, i > 0]),
    ["fiscal_year"]
  );

  await upsertMany(
    "factor_metrics",
    ["metric_key", "sheet", "block", "block_weight", "weight_in_block", "higher_is_better", "display_name"],
    METRICS.map((m) => [m.key, m.sheet, m.block, m.blockWeight, m.weightInBlock, m.higherIsBetter, m.displayName]),
    ["metric_key"]
  );

  await upsertMany(
    "factor_values",
    ["ric", "metric_key", "fiscal_year", "value", "missing"],
    [...valueMap.entries()].map(([k, v]) => {
      const [ric, metricKey, fy] = k.split("|");
      return [ric, metricKey, Number(fy), v, false];
    }),
    ["ric", "metric_key", "fiscal_year"]
  );

  await upsertMany(
    "factor_price_history",
    ["ric", "fiscal_year", "close", "momentum_1y_pct", "return_1y_pct"],
    [...priceMap.entries()].flatMap(([ric, years]) =>
      [...years.entries()].map(([fy, close]) => [ric, fy, close, null, null])
    ),
    ["ric", "fiscal_year"]
  );
  // fill momentum + realized return from price math (Postgres-side for consistency)
  if (!DRY_RUN) {
    await pool!.query(`
      UPDATE factor_price_history p
      SET momentum_1y_pct = p.close / prev.close - 1,
          return_1y_pct = next.close / p.close - 1
      FROM factor_price_history prev,
           factor_price_history next
      WHERE prev.ric = p.ric AND prev.fiscal_year = p.fiscal_year - 1
        AND next.ric = p.ric AND next.fiscal_year = p.fiscal_year + 1
    `);
  }

  await upsertMany(
    "universe_membership",
    ["ric", "fiscal_year", "is_member"],
    [...membershipByKey.entries()].map(([k, v]) => {
      const [ric, fy] = k.split("|");
      return [ric, Number(fy), v];
    }),
    ["ric", "fiscal_year"]
  );

  await upsertMany(
    "factor_scores",
    ["ric", "block", "fiscal_year", "score", "n_metrics_used"],
    scoreRows.map((r) => [r.ric, r.block, r.fy, r.score, r.n]),
    ["ric", "block", "fiscal_year"]
  );

  await upsertMany(
    "factor_composites",
    ["ric", "fiscal_year", "composite", "rank"],
    compositeRows.map((r) => [r.ric, r.fy, r.composite, r.rank]),
    ["ric", "fiscal_year"]
  );

  await upsertMany(
    "backtest_years",
    ["fiscal_year", "n_eligible", "portfolio_return", "benchmark_return", "excess_return", "ic"],
    backtests.map((b) => [b.fiscalYear, b.nEligible, b.portfolioReturn, b.benchmarkReturn, b.excessReturn, b.ic]),
    ["fiscal_year"]
  );

  await upsertMany(
    "backtest_constituents",
    ["fiscal_year", "rank", "ric", "entry_close", "exit_close", "return_pct"],
    backtests.flatMap((b) =>
      b.selected.map((s) => {
        const entry = priceMap.get(s.ric)?.get(b.fiscalYear);
        const exit = priceMap.get(s.ric)?.get(b.fiscalYear + 1);
        return [b.fiscalYear, s.rank, s.ric, entry ?? 0, exit ?? 0, s.returnPct];
      })
    ),
    ["fiscal_year", "rank"]
  );

  // ---- report ----
  console.log("\n=== Backtest (Top-20, no look-ahead) ===");
  for (const b of backtests) {
    console.log(
      `FY${b.fiscalYear}: n=${b.nEligible} portfolio=${(b.portfolioReturn * 100).toFixed(1)}% benchmark=${(b.benchmarkReturn * 100).toFixed(1)}% excess=${(b.excessReturn * 100).toFixed(1)}% IC=${b.ic?.toFixed(3)}`
    );
  }

  const rel = compositeRows.filter((r) => r.ric === "RELI.NS");
  console.log("\nRELI composites:", rel.map((r) => `FY${r.fy}=${r.composite.toFixed(4)}`).join(" "));
  const relMomentum = [...(priceMap.get("RELI.NS")?.entries() ?? [])];
  console.log("RELI prices:", relMomentum.map(([fy, v]) => `FY${fy}=${v.toFixed(2)}`).join(" "));
  const relMom = (priceMap.get("RELI.NS")?.get(14) ?? 0) / (priceMap.get("RELI.NS")?.get(13) ?? 1) - 1;
  console.log(`RELI momentum FY14 (validation): ${(relMom * 100).toFixed(2)}% (expected ~13.62%)`);

  if (!DRY_RUN) {
    const counts = await pool!.query(`
      SELECT
        (SELECT count(*) FROM factor_companies) AS companies,
        (SELECT count(*) FROM factor_values) AS values,
        (SELECT count(*) FROM factor_scores) AS scores,
        (SELECT count(*) FROM factor_composites) AS composites,
        (SELECT count(*) FROM backtest_years) AS backtests,
        (SELECT count(*) FROM backtest_constituents) AS constituents
    `);
    console.log("\nImport complete:", counts.rows[0]);
    await pool!.end();
  } else {
    console.log("\nDry-run complete (no DB writes).");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import ExcelJS from "exceljs";

import { FISCAL_YEARS, METRICS, SCORED_YEARS, SIGNAL_YEARS, FACTOR_WEIGHTS, MIN_FACTORS, TOP_N, RISK_FREE_RATE, type Block } from "./config";
import { loadWorkbook, loadCompanies, loadMetricSheet, loadUniverse, loadBenchmark, cellValue } from "./workbook";
import { blockScore, compositeScore, type BlockScoreResult, type MetricRow, type ScoreContext } from "./score";
import { buildRicSlugMap } from "./map-names";
import {
  runFactorBacktest,
  computeStats,
  type FactorData,
} from "../../src/lib/factor/engine";
import { DEFAULT_BACKTEST_PARAMS } from "../../src/lib/factor/params";

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

// ---------------------------------------------------------------------------
// Dashboard cached values (ground truth for validation)
// ---------------------------------------------------------------------------

interface DashYearRow {
  growth: number | null;
  quality: number | null;
  value: number | null;
  momentum: number | null;
  composite: number | null;
  rank: number | null;
}

function loadDashboardScores(wb: ExcelJS.Workbook): Map<number, Map<string, DashYearRow>> {
  const fs = wb.getWorksheet("Factor_Scores_by_Year")!;
  const out = new Map<number, Map<string, DashYearRow>>();
  for (let r = 2; r <= fs.rowCount; r++) {
    const row = fs.getRow(r);
    const yearRaw = cellValue(row.getCell(1));
    const included = cellValue(row.getCell(2));
    const ric = cellValue(row.getCell(3));
    if (typeof yearRaw !== "number" || included !== "YES" || typeof ric !== "string") continue;
    const year = yearRaw - 2000;
    const num = (c: number): number | null => {
      const v = cellValue(row.getCell(c));
      return typeof v === "number" && Number.isFinite(v) ? v : null;
    };
    if (!out.has(year)) out.set(year, new Map());
    out.get(year)!.set(ric, {
      growth: num(55),
      quality: num(56),
      value: num(57),
      momentum: num(58),
      composite: num(60),
      rank: num(61),
    });
  }
  return out;
}

function loadDashboardPortfolios(wb: ExcelJS.Workbook): Map<number, { ric: string; rank: number; returnPct: number | null }[]> {
  const py = wb.getWorksheet("Portfolio_by_Year")!;
  const out = new Map<number, { ric: string; rank: number; returnPct: number | null }[]>();
  for (let r = 2; r <= py.rowCount; r++) {
    const row = py.getRow(r);
    const yearRaw = cellValue(row.getCell(1));
    const selected = cellValue(row.getCell(3));
    const ric = cellValue(row.getCell(4));
    const rank = cellValue(row.getCell(2));
    if (typeof yearRaw !== "number" || selected !== "SELECTED" || typeof ric !== "string" || typeof rank !== "number") continue;
    const year = yearRaw - 2000;
    const fwd = cellValue(row.getCell(13));
    if (!out.has(year)) out.set(year, []);
    out.get(year)!.push({ ric, rank, returnPct: typeof fwd === "number" && Number.isFinite(fwd) ? fwd : null });
  }
  for (const list of out.values()) list.sort((a, b) => a.rank - b.rank);
  return out;
}

interface DashBacktest {
  nav: Map<number, number>;
  benchNav: Map<number, number>;
  stats: { cagr: number; benchCagr: number; sharpe: number; benchSharpe: number; vol: number; maxDrawdown: number; hitRate: number; informationRatio: number };
  annual: Map<number, { universe: number; scored: number; strategy: number; benchmark: number }>;
}

function loadDashboardBacktest(wb: ExcelJS.Workbook): DashBacktest {
  const br = wb.getWorksheet("Backtest_Results")!;
  const nav = new Map<number, number>();
  const benchNav = new Map<number, number>();
  for (let r = 18; r <= 31; r++) {
    const label = cellValue(br.getRow(r).getCell(1));
    const s = cellValue(br.getRow(r).getCell(3));
    const b = cellValue(br.getRow(r).getCell(4));
    if (typeof label !== "string" || typeof s !== "number" || typeof b !== "number") continue;
    const m = /^FY(\d{4})$/.exec(label.trim());
    if (m) {
      nav.set(Number(m[1]) - 2000, s);
      benchNav.set(Number(m[1]) - 2000, b);
    }
  }
  const num = (r: number, c: number): number => {
    const v = cellValue(br.getRow(r).getCell(c));
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const annual = new Map<number, { universe: number; scored: number; strategy: number; benchmark: number }>();
  for (let r = 35; r <= 47; r++) {
    const label = cellValue(br.getRow(r).getCell(1));
    if (typeof label !== "string") continue;
    const m = /^FY(\d{4})$/.exec(label.trim());
    if (!m) continue;
    annual.set(Number(m[1]) - 2000, {
      universe: num(r, 3),
      scored: num(r, 4),
      strategy: num(r, 6),
      benchmark: num(r, 7),
    });
  }
  return {
    nav,
    benchNav,
    stats: {
      cagr: num(7, 2),
      benchCagr: num(8, 2),
      sharpe: num(10, 2),
      benchSharpe: num(11, 2),
      vol: num(12, 2),
      maxDrawdown: num(13, 2),
      hitRate: num(14, 2),
      informationRatio: num(15, 2),
    },
    annual,
  };
}

// ---------------------------------------------------------------------------

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

  // ---- prices + 1-year momentum (Price_Close FYnn/FYnn-1 - 1, per GQVM) ----
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

  // ---- per-year universe (GQVM: composition -> Coverage_Map Covered -> Companies, deduped) ----
  const universe = loadUniverse(wb, ricSet);
  const universeSizes = [...universe.entries()].map(([y, m]) => `FY${y + 2000}:${m.length}`).join(" ");
  console.log(`universe (per year): ${universeSizes}`);

  // ---- eligibility per year (FY12 has no model data) ----
  const eligibleForYear = new Map<number, Set<string>>();
  const membershipByKey = new Map<string, boolean>();
  for (const fy of FISCAL_YEARS) {
    const s = new Set<string>();
    if (fy >= 13) {
      const members = universe.get(fy) ?? [];
      for (const m of members) {
        s.add(m.ric);
        membershipByKey.set(`${m.ric}|${fy}`, true);
      }
    }
    for (const c of companies) if (!membershipByKey.has(`${c.ric}|${fy}`)) membershipByKey.set(`${c.ric}|${fy}`, false);
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

  const metricDefsByBlock = new Map<Block, { key: string; higherIsBetter: boolean }[]>();
  for (const b of ["growth", "quality", "valuation", "momentum"] as Block[]) {
    metricDefsByBlock.set(b, METRICS.filter((m) => m.block === b).map((m) => ({ key: m.key, higherIsBetter: m.higherIsBetter })));
  }

  // ---- block scores + composites + ranks (FY13..FY26) ----
  const blocks: Block[] = ["growth", "quality", "valuation", "momentum"];
  const scoreRows: { ric: string; block: Block; fy: number; score: number; n: number }[] = [];
  const compositeRows: { ric: string; fy: number; composite: number; rank: number }[] = [];
  for (const fy of SCORED_YEARS) {
    const ranked: { ric: string; composite: number }[] = [];
    for (const ric of eligibleForYear.get(fy)!) {
      const res: Record<Block, BlockScoreResult> = {
        growth: blockScore(ric, fy, "growth", metricDefsByBlock.get("growth")!, ctx),
        quality: blockScore(ric, fy, "quality", metricDefsByBlock.get("quality")!, ctx),
        valuation: blockScore(ric, fy, "valuation", metricDefsByBlock.get("valuation")!, ctx),
        momentum: blockScore(ric, fy, "momentum", metricDefsByBlock.get("momentum")!, ctx),
      };
      for (const b of blocks) if (res[b].nMetricsUsed > 0) scoreRows.push({ ric, block: b, fy, score: res[b].score, n: res[b].nMetricsUsed });
      const composite = compositeScore(res, FACTOR_WEIGHTS, MIN_FACTORS);
      if (composite !== null) ranked.push({ ric, composite });
    }
    ranked.sort((a, b) => b.composite - a.composite || (a.ric < b.ric ? -1 : a.ric > b.ric ? 1 : 0));
    ranked.forEach((r, i) => compositeRows.push({ ric: r.ric, fy, composite: r.composite, rank: i + 1 }));
    console.log(`FY${fy + 2000}: eligible ${eligibleForYear.get(fy)!.size}, scored/ranked ${ranked.length}`);
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
  const { byRic, matches } = buildRicSlugMap(coverageNames);
  console.log(`Coverage_Map rows: ${coverageNames.length}; site->RIC matches: ${matches}/133`);
  const slugByRic = new Map<string, string | null>();
  for (const c of companies) slugByRic.set(c.ric, byRic.get(c.ric) ?? null);
  const matched = [...slugByRic.values()].filter(Boolean).length;
  console.log(`RIC->slug mapping: ${matched}/${companies.length}`);

  // ---- benchmark (Nifty 50 PRICE index, end-June closes) ----
  const benchmarkCloses = loadBenchmark(wb.getWorksheet("Benchmark_Nifty50")!);
  const benchmarkReturns = new Map<number, number>();
  for (const fy of SIGNAL_YEARS) {
    const cur = benchmarkCloses.get(fy + 2001);
    const prev = benchmarkCloses.get(fy + 2000);
    if (cur !== undefined && prev !== undefined && prev !== 0) benchmarkReturns.set(fy, cur / prev - 1);
  }
  console.log(`benchmark returns FY${SIGNAL_YEARS[0]}..FY${SIGNAL_YEARS[SIGNAL_YEARS.length - 1]}:`,
    [...benchmarkReturns.entries()].map(([fy, r]) => `FY${fy + 2000}=${(r * 100).toFixed(1)}%`).join(" "));

  // ---- backtest (engine, GQVM default parameters, signal years FY13..FY25) ----
  const closes = new Map<string, number>();
  for (const [ric, years] of priceMap) {
    for (const [fy, close] of years) closes.set(`${ric}|${fy}`, close);
  }
  const names = new Map<string, { name: string; slug: string | null }>();
  for (const c of companies) names.set(c.ric, { name: c.name, slug: slugByRic.get(c.ric) ?? null });
  const engineData: FactorData = {
    years: [...SIGNAL_YEARS],
    metrics: METRICS.map((m) => ({
      key: m.key,
      block: m.block,
      higherIsBetter: m.higherIsBetter,
      weightInBlock: 1,
    })),
    values: valueMap,
    membership: membershipByKey,
    closes,
    names,
    benchmark: benchmarkReturns,
  };
  const backtests = runFactorBacktest(engineData, DEFAULT_BACKTEST_PARAMS);
  const stats = computeStats(backtests, RISK_FREE_RATE);

  // ===========================================================================
  // VALIDATION vs the dashboard's cached values (FY13..FY25)
  // ===========================================================================
  const dashScores = loadDashboardScores(wb);
  const dashPortfolios = loadDashboardPortfolios(wb);
  const dashBt = loadDashboardBacktest(wb);

  let rankMatchTotal = 0;
  let rankMatchHits = 0;
  let maxCompositeDiff = 0;
  let portfolioMatchYears = 0;
  let portfolioYears = 0;
  for (const fy of SIGNAL_YEARS) {
    const ours = new Map(compositeRows.filter((r) => r.fy === fy).map((r) => [r.ric, r]));
    const dash = dashScores.get(fy);
    if (dash) {
      for (const [ric, d] of dash) {
        const o = ours.get(ric);
        if (o && d.composite !== null) maxCompositeDiff = Math.max(maxCompositeDiff, Math.abs(o.composite - d.composite));
        if (o && d.rank !== null) {
          rankMatchTotal++;
          if (o.rank === d.rank) rankMatchHits++;
        }
      }
    }
    const dPort = dashPortfolios.get(fy) ?? [];
    if (dPort.length > 0) {
      portfolioYears++;
      const ourTop = compositeRows.filter((r) => r.fy === fy).sort((a, b) => a.rank - b.rank).slice(0, TOP_N).map((r) => r.ric);
      const theirTop = dPort.slice(0, TOP_N).map((r) => r.ric);
      if (ourTop.length === theirTop.length && ourTop.every((ric, i) => ric === theirTop[i])) portfolioMatchYears++;
    }
  }

  let maxNavDiff = 0;
  let maxBenchNavDiff = 0;
  let annualMatches = 0;
  for (const fy of SIGNAL_YEARS) {
    const b = backtests.find((x) => x.fiscalYear === fy)!;
    const dNav = dashBt.nav.get(fy + 1);
    const dBnav = dashBt.benchNav.get(fy + 1);
    if (dNav !== undefined) maxNavDiff = Math.max(maxNavDiff, Math.abs(b.nav - dNav));
    if (dBnav !== undefined) maxBenchNavDiff = Math.max(maxBenchNavDiff, Math.abs(0 - dBnav)); // benchmark NAV not computed locally
    const annual = dashBt.annual.get(fy);
    if (annual && Math.abs(b.portfolioReturn - annual.strategy) < 1e-9 && Math.abs(b.benchmarkReturn - annual.benchmark) < 1e-9) annualMatches++;
  }

  console.log("\n=== VALIDATION vs GQVM dashboard (FY13..FY25) ===");
  console.log(`rank match: ${rankMatchHits}/${rankMatchTotal} (${((100 * rankMatchHits) / Math.max(1, rankMatchTotal)).toFixed(2)}%)`);
  console.log(`composite max abs diff: ${maxCompositeDiff.toExponential(3)}`);
  console.log(`top-${TOP_N} portfolio RIC match: ${portfolioMatchYears}/${portfolioYears} years`);
  console.log(`annual return match (strategy+benchmark): ${annualMatches}/${SIGNAL_YEARS.length} years`);
  console.log(`NAV max abs diff: ${maxNavDiff.toExponential(3)} (dashboard FY26 NAV ${dashBt.nav.get(26)?.toFixed(2)})`);
  const tol = 1e-9;
  const navOk = [...SIGNAL_YEARS].every((fy) => {
    const d = dashBt.nav.get(fy + 1);
    return d === undefined || Math.abs(backtests.find((x) => x.fiscalYear === fy)!.nav - d) < tol;
  });
  const rankOk = rankMatchTotal > 0 && rankMatchHits === rankMatchTotal;
  const compositeOk = maxCompositeDiff < 1e-9;
  const portfolioOk = portfolioYears > 0 && portfolioMatchYears === portfolioYears;
  const annualOk = annualMatches === SIGNAL_YEARS.length;
  const statsOk = Math.abs(stats.cagr - dashBt.stats.cagr) < 1e-9
    && Math.abs(stats.sharpe - dashBt.stats.sharpe) < 1e-9
    && Math.abs(stats.vol - dashBt.stats.vol) < 1e-9
    && Math.abs(stats.maxDrawdown - dashBt.stats.maxDrawdown) < 1e-9
    && Math.abs(stats.hitRate - dashBt.stats.hitRate) < 1e-9
    && Math.abs(stats.informationRatio - dashBt.stats.informationRatio) < 1e-9;
  console.log(`stats match: ${statsOk ? "OK" : "MISMATCH"} (ours: CAGR ${(stats.cagr * 100).toFixed(4)}% vol ${(stats.vol * 100).toFixed(4)}% ` +
    `Sharpe ${stats.sharpe.toFixed(4)} MDD ${(stats.maxDrawdown * 100).toFixed(4)}% hit ${stats.hitRate.toFixed(4)} IR ${stats.informationRatio.toFixed(4)} | ` +
    `dash: CAGR ${(dashBt.stats.cagr * 100).toFixed(4)}% vol ${(dashBt.stats.vol * 100).toFixed(4)}% Sharpe ${dashBt.stats.sharpe.toFixed(4)} ` +
    `MDD ${(dashBt.stats.maxDrawdown * 100).toFixed(4)}% hit ${dashBt.stats.hitRate.toFixed(4)} IR ${dashBt.stats.informationRatio.toFixed(4)})`);
  console.log(`checks: nav ${navOk ? "OK" : "FAIL"} | ranks ${rankOk ? "OK" : "FAIL"} | composites ${compositeOk ? "OK" : "FAIL"} | ` +
    `portfolios ${portfolioOk ? "OK" : "FAIL"} | annual ${annualOk ? "OK" : "FAIL"} | stats ${statsOk ? "OK" : "FAIL"}`);
  if (!DRY_RUN && !(navOk && rankOk && compositeOk && portfolioOk && annualOk && statsOk)) {
    console.error("\nVALIDATION FAILED — dashboard parity not achieved; aborting DB writes (use --dry-run to inspect).");
    await pool!.end();
    process.exit(1);
  }

  // ---- writes ----
  if (!DRY_RUN) {
    // derived tables: fully rebuilt each import (no stale rows from prior models)
    await pool!.query("DELETE FROM factor_composites");
    await pool!.query("DELETE FROM factor_scores");
    await pool!.query("DELETE FROM universe_membership");
  }

  await upsertMany(
    "factor_companies",
    ["ric", "name", "market_cap", "sector", "industry", "removed_period", "company_slug"],
    companies.map((c) => [c.ric, c.name, c.marketCap, c.sector, c.industry, c.removedPeriod, slugByRic.get(c.ric) ?? null]),
    ["ric"]
  );

  await upsertMany(
    "factor_years",
    ["fiscal_year", "is_live", "nifty500_filtered"],
    FISCAL_YEARS.map((fy) => [fy, fy === FISCAL_YEARS[FISCAL_YEARS.length - 1], fy >= SCORED_YEARS[0]]),
    ["fiscal_year"]
  );

  await upsertMany(
    "factor_metrics",
    ["metric_key", "sheet", "block", "block_weight", "weight_in_block", "higher_is_better", "display_name"],
    METRICS.map((m) => [m.key, m.sheet, m.block, FACTOR_WEIGHTS[m.block], 1, m.higherIsBetter, m.displayName]),
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
    "factor_benchmark",
    ["fiscal_year", "nifty_close", "return_pct"],
    SIGNAL_YEARS.map((fy) => [fy, benchmarkCloses.get(fy + 2001) ?? 0, benchmarkReturns.get(fy) ?? null]),
    ["fiscal_year"]
  );

  // ---- backtest writes: derived tables, fully rebuilt each import ----
  if (!DRY_RUN) {
    await pool!.query("DELETE FROM backtest_constituents");
    await pool!.query("DELETE FROM backtest_years");
  }
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
      b.constituents.map((s) => {
        const entry = priceMap.get(s.ric)?.get(b.fiscalYear);
        const exit = priceMap.get(s.ric)?.get(b.fiscalYear + 1);
        return [b.fiscalYear, s.rank, s.ric, entry ?? 0, exit ?? 0, s.returnPct];
      })
    ),
    ["fiscal_year", "rank"]
  );

  // ---- report ----
  console.log(`\n=== Backtest (engine, GQVM defaults, Top-${DEFAULT_BACKTEST_PARAMS.topN}, no look-ahead) ===`);
  console.log(
    `params: G ${DEFAULT_BACKTEST_PARAMS.blockWeights.growth} Q ${DEFAULT_BACKTEST_PARAMS.blockWeights.quality} ` +
    `V ${DEFAULT_BACKTEST_PARAMS.blockWeights.valuation} M ${DEFAULT_BACKTEST_PARAMS.blockWeights.momentum} | ` +
    `minN ${DEFAULT_BACKTEST_PARAMS.minN} minFactors ${DEFAULT_BACKTEST_PARAMS.minFactors} topN ${DEFAULT_BACKTEST_PARAMS.topN}`
  );
  for (const b of backtests) {
    console.log(
      `FY${b.fiscalYear}: n=${b.nEligible} portfolio=${(b.portfolioReturn * 100).toFixed(1)}% benchmark=${(b.benchmarkReturn * 100).toFixed(1)}% excess=${(b.excessReturn * 100).toFixed(1)}% IC=${b.ic?.toFixed(3)}`
    );
  }
  console.log(`mean portfolio ${(stats.meanPortfolioReturn * 100).toFixed(2)}% | mean benchmark ${(stats.meanBenchmarkReturn * 100).toFixed(2)}% | ` +
    `CAGR ${(stats.cagr * 100).toFixed(2)}% | NAV ${stats.navFinal.toFixed(2)} | Sharpe ${stats.sharpe.toFixed(3)} | MDD ${(stats.maxDrawdown * 100).toFixed(2)}% | hit ${stats.hitRate.toFixed(2)} | IR ${stats.informationRatio.toFixed(3)}`);

  const rel = compositeRows.filter((r) => r.ric === "RELI.NS");
  console.log("\nRELI composites:", rel.map((r) => `FY${r.fy + 2000}=${r.composite.toFixed(4)}`).join(" "));

  // FY26 live portfolio preview
  const liveTop = compositeRows.filter((r) => r.fy === 26).sort((a, b) => a.rank - b.rank).slice(0, 10);
  console.log("\nLive FY2026 top-10 preview:");
  for (const r of liveTop) {
    const c = companies.find((x) => x.ric === r.ric)!;
    console.log(`  #${r.rank} ${r.ric} ${c?.name ?? ""} composite=${r.composite.toFixed(4)}`);
  }

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

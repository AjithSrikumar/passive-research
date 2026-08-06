import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

import { companies as companyRows } from "../../src/lib/companies";
import { sectors as sectorRows } from "../../src/lib/sectors";
import {
  reportToc,
  financialHistory,
  forecasts,
  growthCagr,
  readingTime,
  round1,
  scenarioCases,
  pricedInAnalysis,
  totalReturnPct,
  ratingLanguage,
  upsides,
  weightedTarget,
  type ScenarioCase,
} from "../../src/lib/report";

// ---- minimal .env.local loader (no dotenv dependency) ----
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
if (!DATABASE_URL) {
  console.error("DATABASE_URL missing (set it in .env.local)");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: DATABASE_URL, max: 4 });

type Company = (typeof companyRows)[number];

function peerAvgPe(c: Company): number {
  const peers = companyRows
    .filter((p) => p.sector === c.sector && p.slug !== c.slug)
    .sort((a, b) => b.marketCapCr - a.marketCapCr)
    .slice(0, 4);
  const avg = peers.reduce((s, p) => s + (p.pe ?? 0), 0);
  return peers.length > 0 ? round1(avg / peers.length) : (c.pe ?? 0);
}

/** Derived report payloads per 25-section framework — mirrors ReportContent.tsx. */
function buildSectionContent(c: Company, peerAvg: number): Record<string, unknown> {
  const scenarios = scenarioCases(c);
  const pia = pricedInAnalysis(c, peerAvg);
  const premium =
    c.pe && peerAvg > 0 ? Math.round(((c.pe - peerAvg) / peerAvg) * 100) : 0;

  return {
    fullName: `${c.name} (${c.ticker})`,
    sector: c.sector,
    recommendation: c.recommendation,
    ratingLanguage: ratingLanguage(c),
    currentPrice: c.currentPrice,
    targetPrice: c.targetPrice,
    upsidePct: c.upsidePct,
    upside: upsides(c),
    totalReturnPct: round1(totalReturnPct(c)),
    dividendYieldPct: c.dividendYieldPct,
    marketCapCr: c.marketCapCr,
    revenueCr: c.revenueCr,
    netProfitCr: c.netProfitCr,
    revenueGrowthPct: c.revenueGrowthPct,
    ebitdaMarginPct: c.ebitdaMarginPct,
    roePct: c.roePct,
    rocePct: c.rocePct,
    fcfCr: c.fcfCr,
    pe: c.pe,
    debtEquity: c.debtEquity,
    growthCagr: growthCagr(c),
    readingTime: readingTime(c),
    weightedTarget: weightedTarget(c),
    peerAvgPe: peerAvg,
    peerPremiumPct: premium,
    financialHistory: financialHistory(c),
    forecasts: forecasts(c),
    pricedIn: pia
      ? {
          eps0: pia.eps0,
          epsFy2: pia.epsFy2,
          impliedCagrPct: round1(pia.impliedCagrPct),
          ourCagrPct: round1(pia.ourCagrPct),
          exitPeAtTarget: round1(pia.exitPeAtTarget),
        }
      : null,
    scenarios: scenarios.map((s: ScenarioCase) => ({
      name: s.name,
      revenueCagr: s.revenueCagr,
      marginPct: s.marginPct,
      exitMultiplePct: s.exitMultiplePct,
      weightPct: s.weightPct,
      target: s.target,
    })),
  };
}

async function run() {
  const schema = readFileSync(join(__dir, "../../db/schema.sql"), "utf8");
  await pool.query(schema);

  // sectors
  await pool.query("TRUNCATE sectors CASCADE");
  {
    const rows = sectorRows
      .map((s, i) => `($${i * 4 + 1},$${i * 4 + 2},$${i * 4 + 3},$${i * 4 + 4})`)
      .join(",");
    const values = sectorRows.flatMap((s) => [s.slug, s.name, s.description, s.icon]);
    await pool.query(
      `INSERT INTO sectors (slug, name, description, icon) VALUES ${rows}`,
      values
    );
  }

  // companies (full 22-field record + author)
  await pool.query("TRUNCATE companies CASCADE");
  {
    const COLS = 25;
    const rows = companyRows
      .map((_, i) => `(${Array.from({ length: COLS }, (_, k) => `$${i * COLS + k + 1}`).join(",")})`)
      .join(",");
    const values = companyRows.flatMap((c) => [
      c.slug, c.name, c.legalName, c.ticker, c.sector, c.industry,
      c.logoColor, c.recommendation, c.currentPrice, c.targetPrice,
      c.upsidePct, c.marketCapCr, c.revenueCr, c.netProfitCr,
      c.revenueGrowthPct, c.ebitdaMarginPct, c.roePct, c.rocePct,
      c.fcfCr, c.pe, c.dividendYieldPct, c.debtEquity, c.shortThesis,
      c.updatedDate, c.author,
    ]);
    await pool.query(
      `INSERT INTO companies (
        slug, name, legal_name, ticker, sector, industry, logo_color,
        recommendation, current_price, target_price, upside_pct, market_cap_cr,
        revenue_cr, net_profit_cr, revenue_growth_pct, ebitda_margin_pct,
        roe_pct, roce_pct, fcf_cr, pe, dividend_yield_pct, debt_equity,
        short_thesis, updated_date, author
      ) VALUES ${rows}`,
      values
    );
  }

  // report_sections — one row per (company, section), 133 × 25
  await pool.query("TRUNCATE report_sections");
  {
    const rows = [];
    const values: unknown[] = [];
    const payloads = new Map<string, Record<string, unknown>>();
    for (const c of companyRows) {
      payloads.set(c.slug, buildSectionContent(c, peerAvgPe(c)));
    }
    for (const c of companyRows) {
      const payload = payloads.get(c.slug)!;
      for (const [i, sec] of reportToc.entries()) {
        rows.push(`($${values.length + 1}::text,$${values.length + 2}::text,$${values.length + 3},$${values.length + 4},$${values.length + 5}::jsonb)`);
        values.push(c.slug, sec.id, i + 1, sec.label, JSON.stringify(payload));
      }
    }
    await pool.query(
      `INSERT INTO report_sections (company_slug, section_key, sort_order, label, content)
       VALUES ${rows.join(",")}`,
      values
    );
  }

  const counts = await pool.query(`
    SELECT
      (SELECT count(*) FROM sectors) AS sectors,
      (SELECT count(*) FROM companies) AS companies,
      (SELECT count(*) FROM report_sections) AS report_sections
  `);
  console.log("Seed complete:", counts.rows[0]);
  await pool.end();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
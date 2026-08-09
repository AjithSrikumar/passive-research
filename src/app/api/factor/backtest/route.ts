import { isDbConfigured, queryText } from "@/lib/db";
import {
  runFactorBacktest,
  type BacktestParams,
  type Block,
  type FactorData,
  type MetricMeta,
  type YearResult,
} from "@/lib/factor/engine";

/**
 * POST /api/factor/backtest
 * Runs the factor backtest with caller-supplied parameters (factor weights,
 * per-metric weights, MinN, MinFactors, TopN) against the imported factor data.
 * Signal years are FY13..FY25 (FY26 = live, no forward return yet).
 *
 * Body (all optional; omitted values fall back to the GQVM recommended defaults):
 *   { blockWeights?: Record<"growth"|"quality"|"valuation"|"momentum", number>,
 *     metricWeights?: Record<string, number>,   // 0 = metric excluded
 *     minN?: number,                            // default 2
 *     minFactors?: number,                      // default 3
 *     topN?: number }                           // default 20
 */

export const dynamic = "force-dynamic";

const BLOCKS: Block[] = ["growth", "quality", "valuation", "momentum"];
const DEFAULT_BLOCK_WEIGHTS: Record<Block, number> = { growth: 0.2, quality: 0.1, valuation: 0.6, momentum: 0.1 };
const DEFAULT_MIN_N = 2;
const DEFAULT_MIN_FACTORS = 3;
const DEFAULT_TOP_N = 20;
const SIGNAL_YEARS: number[] = [];
for (let fy = 13; fy <= 25; fy++) SIGNAL_YEARS.push(fy);

interface DbMetricRow {
  metric_key: string;
  block: string;
  higher_is_better: boolean;
  weight_in_block: string;
  display_name: string;
}

interface DbValueRow {
  ric: string;
  metric_key: string;
  fiscal_year: number;
  value: string;
}

interface DbCloseRow {
  ric: string;
  fiscal_year: number;
  close: string;
}

interface DbMembershipRow {
  ric: string;
  fiscal_year: number;
  is_member: boolean;
}

interface DbCompanyRow {
  ric: string;
  name: string;
  company_slug: string | null;
}

interface DbBenchmarkRow {
  fiscal_year: number;
  return_pct: string | null;
}

const num = (v: string) => Number(v);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function parseNumber(x: unknown): number | null {
  if (typeof x !== "number" || !Number.isFinite(x)) return null;
  return x;
}

function buildParams(body: unknown, metrics: DbMetricRow[]): { params: BacktestParams | null; error: string | null } {
  const b = (body ?? {}) as Record<string, unknown>;

  // block weights: merge over the defaults, validate ranges
  const blockWeights: Record<Block, number> = { ...DEFAULT_BLOCK_WEIGHTS };
  if (b.blockWeights !== undefined) {
    if (typeof b.blockWeights !== "object" || b.blockWeights === null) return { params: null, error: "blockWeights must be an object" };
    for (const key of BLOCKS) {
      const raw = (b.blockWeights as Record<string, unknown>)[key];
      if (raw === undefined) continue;
      const v = parseNumber(raw);
      if (v === null) return { params: null, error: `blockWeights.${key} must be a finite number` };
      blockWeights[key] = clamp(v, 0, 10);
    }
  }

  // metric weights: merge over DB defaults (weightInBlock), 0 = excluded
  const metricWeights: Record<string, number> = {};
  for (const m of metrics) metricWeights[m.metric_key] = Number(m.weight_in_block);
  if (b.metricWeights !== undefined) {
    if (typeof b.metricWeights !== "object" || b.metricWeights === null) return { params: null, error: "metricWeights must be an object" };
    for (const [key, raw] of Object.entries(b.metricWeights as Record<string, unknown>)) {
      if (!(key in metricWeights)) return { params: null, error: `unknown metric "${key}"` };
      const v = parseNumber(raw);
      if (v === null) return { params: null, error: `metricWeights.${key} must be a finite number` };
      metricWeights[key] = clamp(v, 0, 10);
    }
  }

  let minN = DEFAULT_MIN_N;
  if (b.minN !== undefined) {
    const v = parseNumber(b.minN);
    if (v === null) return { params: null, error: "minN must be a finite number" };
    minN = Math.round(clamp(v, 2, 500));
  }
  let minFactors = DEFAULT_MIN_FACTORS;
  if (b.minFactors !== undefined) {
    const v = parseNumber(b.minFactors);
    if (v === null) return { params: null, error: "minFactors must be a finite number" };
    minFactors = Math.round(clamp(v, 1, 4));
  }
  let topN = DEFAULT_TOP_N;
  if (b.topN !== undefined) {
    const v = parseNumber(b.topN);
    if (v === null) return { params: null, error: "topN must be a finite number" };
    topN = Math.round(clamp(v, 1, 100));
  }

  return { params: { blockWeights, metricWeights, minN, minFactors, topN }, error: null };
}

export async function POST(request: Request): Promise<Response> {
  if (!isDbConfigured()) {
    return Response.json(
      { error: "Database not configured — backtest parameters cannot be evaluated here. See the static snapshot on the page." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const [metricRes, valueRes, closeRes, membershipRes, companyRes, benchmarkRes] = await Promise.all([
      queryText<DbMetricRow>("SELECT metric_key, block, higher_is_better, weight_in_block, display_name FROM factor_metrics ORDER BY metric_key"),
      queryText<DbValueRow>(`SELECT ric, metric_key, fiscal_year, value FROM factor_values WHERE fiscal_year BETWEEN $1 AND $2`, [SIGNAL_YEARS[0], SIGNAL_YEARS[SIGNAL_YEARS.length - 1]]),
      queryText<DbCloseRow>("SELECT ric, fiscal_year, close FROM factor_price_history"),
      queryText<DbMembershipRow>("SELECT ric, fiscal_year, is_member FROM universe_membership"),
      queryText<DbCompanyRow>("SELECT ric, name, company_slug FROM factor_companies"),
      queryText<DbBenchmarkRow>("SELECT fiscal_year, return_pct FROM factor_benchmark"),
    ]);
    if (metricRes.rows.length === 0) {
      return Response.json({ error: "Factor data is empty — run `npm run factor:import` first." }, { status: 503 });
    }

    const parsed = buildParams(body, metricRes.rows);
    if (parsed.error || !parsed.params) return Response.json({ error: parsed.error ?? "Invalid parameters" }, { status: 400 });
    const params = parsed.params;

    const metrics: MetricMeta[] = metricRes.rows.map((m) => ({
      key: m.metric_key,
      block: m.block as Block,
      higherIsBetter: m.higher_is_better,
      weightInBlock: Number(m.weight_in_block),
    }));

    const values = new Map<string, number>();
    for (const r of valueRes.rows) values.set(`${r.ric}|${r.metric_key}|${r.fiscal_year}`, num(r.value));
    const closes = new Map<string, number>();
    for (const r of closeRes.rows) closes.set(`${r.ric}|${r.fiscal_year}`, num(r.close));
    const membership = new Map<string, boolean>();
    for (const r of membershipRes.rows) membership.set(`${r.ric}|${r.fiscal_year}`, r.is_member);
    const names = new Map<string, { name: string; slug: string | null }>();
    for (const r of companyRes.rows) names.set(r.ric, { name: r.name, slug: r.company_slug });
    const benchmark = new Map<number, number>();
    for (const r of benchmarkRes.rows) {
      if (r.return_pct !== null) benchmark.set(r.fiscal_year, num(r.return_pct));
    }

    const data: FactorData = { years: SIGNAL_YEARS, metrics, values, membership, closes, names, benchmark };
    const results: YearResult[] = runFactorBacktest(data, params);
    const mean = (fn: (r: YearResult) => number) => (results.length === 0 ? 0 : results.reduce((s, r) => s + fn(r), 0) / results.length);

    return Response.json({
      params,
      summary: {
        meanPortfolioReturn: mean((r) => r.portfolioReturn),
        meanBenchmarkReturn: mean((r) => r.benchmarkReturn),
        meanExcessReturn: mean((r) => r.excessReturn),
      },
      results,
    });
  } catch (e) {
    console.error("backtest API error:", e);
    return Response.json({ error: "Backtest failed: " + (e instanceof Error ? e.message : "unknown error") }, { status: 500 });
  }
}

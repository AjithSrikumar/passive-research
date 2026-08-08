/**
 * Data-driven factor backtest engine (pure, no I/O).
 * Shared by:
 *  - POST /api/factor/backtest (custom weights/parameters)
 *  - scripts/factor-model/optimize.ts (default-parameter search)
 *  - tests/factor/*.test.ts
 *
 * The engine reproduces the import pipeline's math (see score.ts/backtest.ts)
 * but takes block weights, per-metric weights, MinN and TopN as parameters,
 * so users can run their own backtest. Signal years are FY13..FY25 (FY12 is
 * excluded from the backtest by design).
 */

export type Block = "growth" | "quality" | "valuation" | "momentum";

export interface MetricMeta {
  key: string;
  block: Block;
  higherIsBetter: boolean;
  /** Model default weight within its block (0.125, 1/7, 1.0). */
  weightInBlock: number;
}

export interface BacktestParams {
  /** Factor weights: growth/quality/valuation/momentum (need not sum to 1; ranking is scale-invariant). */
  blockWeights: Record<Block, number>;
  /** Per-metric weight; 0 = excluded from the block. Renormalized within block. */
  metricWeights: Record<string, number>;
  /** Minimum cross-section for a metric to count in a year. */
  minN: number;
  /** Portfolio size (Top-N). */
  topN: number;
}

export interface FactorData {
  /** Signal years (13..25). */
  years: number[];
  metrics: MetricMeta[];
  /** `${ric}|${metricKey}|${fy}` -> value */
  values: Map<string, number>;
  /** `${ric}|${fy}` -> Nifty500 membership */
  membership: Map<string, boolean>;
  /** `${ric}|${fy}` -> annual close */
  closes: Map<string, number>;
  /** ric -> { name, slug } */
  names: Map<string, { name: string; slug: string | null }>;
}

export interface ConstituentRow {
  rank: number;
  ric: string;
  name: string;
  slug: string | null;
  returnPct: number;
  composite: number;
}

export interface YearResult {
  fiscalYear: number;
  nEligible: number;
  portfolioReturn: number;
  benchmarkReturn: number;
  excessReturn: number;
  ic: number | null;
  constituents: ConstituentRow[];
}

/**
 * Per-metric percentile maps, precomputed for reuse across many parameter
 * runs. Keyed fy -> metricKey -> ric -> percentile in [0,1]. A metric whose
 * eligible cross-section < minN is absent (treated as missing).
 */
export type PercentileCache = Map<number, Map<string, Map<string, number>>>;

/** Percentile with ties averaged: rank = below + equal/2 (1-based). */
export function percentileOf(sorted: number[], n: number, value: number, higherIsBetter: boolean): number {
  if (n <= 1) return 1;
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  const below = lo;
  let hi2 = n;
  while (hi2 > lo) {
    const mid = (lo + hi2 - 1) >> 1;
    if (sorted[mid] === value) lo = mid + 1;
    else hi2 = mid;
  }
  const rank = higherIsBetter ? below + (lo - below) / 2 + 1 : n - below - (lo - below) / 2;
  return rank / (n - 1);
}

function spearman(a: number[], b: number[]): number {
  const n = a.length;
  const rank = (xs: number[]): number[] => {
    const order = xs.map((x, i) => ({ x, i })).sort((p, q) => p.x - q.x);
    const r = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      const tieStart = i;
      while (i + 1 < n && order[i + 1].x === order[i].x) i++;
      const avg = (tieStart + i) / 2 + 1;
      for (let k = tieStart; k <= i; k++) r[order[k].i] = avg;
    }
    return r;
  };
  const ra = rank(a);
  const rb = rank(b);
  const ma = ra.reduce((s, x) => s + x, 0) / n;
  const mb = rb.reduce((s, x) => s + x, 0) / n;
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) {
    num += (ra[i] - ma) * (rb[i] - mb);
    da += (ra[i] - ma) ** 2;
    db += (rb[i] - mb) ** 2;
  }
  if (da === 0 || db === 0) return 0;
  return num / Math.sqrt(da * db);
}

/** Nifty500 members in the given signal year (the backtest universe). */
export function eligibleCompanies(data: FactorData, fy: number): string[] {
  const out: string[] = [];
  for (const ric of data.names.keys()) {
    if (data.membership.get(`${ric}|${fy}`) === true) out.push(ric);
  }
  return out;
}

function valueOf(data: FactorData, key: string, ric: string, fy: number): number | undefined {
  if (key === "momentum_1y") {
    const cur = data.closes.get(`${ric}|${fy}`);
    const prev = data.closes.get(`${ric}|${fy - 1}`);
    if (cur === undefined || prev === undefined || prev === 0) return undefined;
    return cur / prev - 1;
  }
  return data.values.get(`${ric}|${key}|${fy}`);
}

function returnPct(data: FactorData, ric: string, fy: number): number | undefined {
  const exit = data.closes.get(`${ric}|${fy + 1}`);
  const entry = data.closes.get(`${ric}|${fy}`);
  if (exit === undefined || entry === undefined || entry === 0) return undefined;
  return exit / entry - 1;
}

/**
 * Precompute per-metric percentile maps for every signal year under a given
 * MinN. Reuse this across runs that share minN; pass it to
 * runFactorBacktest to skip the expensive percentile step (the optimizer
 * does this to search thousands of weight combinations in seconds).
 */
export function buildPercentileCache(data: FactorData, minN: number): PercentileCache {
  const cache: PercentileCache = new Map();
  for (const fy of data.years) {
    const universe = eligibleCompanies(data, fy);
    const byMetric = new Map<string, Map<string, number>>();
    for (const meta of data.metrics) {
      const rows: { ric: string; value: number }[] = [];
      for (const ric of universe) {
        const v = valueOf(data, meta.key, ric, fy);
        if (v !== undefined && Number.isFinite(v)) rows.push({ ric, value: v });
      }
      if (rows.length < minN) continue;
      const sorted = rows.map((r) => r.value).sort((a, b) => a - b);
      const map = new Map<string, number>();
      for (const r of rows) map.set(r.ric, percentileOf(sorted, sorted.length, r.value, meta.higherIsBetter));
      byMetric.set(meta.key, map);
    }
    cache.set(fy, byMetric);
  }
  return cache;
}

/**
 * Runs the factor backtest for every signal year with the given parameters.
 * Conventions: signal at FY-end close, entry at same close, exit at FY+1
 * close; equal-weight Top-N; benchmark = equal-weight eligible universe;
 * IC = Spearman(composite, realized return), N ≥ 30. Momentum is recomputed
 * as close(fy)/close(fy-1) - 1 from prices.
 *
 * If `cache` is provided it must have been built with the same minN as
 * `p.minN`; otherwise it is built here.
 */
export function runFactorBacktest(data: FactorData, p: BacktestParams, cache?: PercentileCache): YearResult[] {
  const blocks: Block[] = ["growth", "quality", "valuation", "momentum"];
  const percentileByYear = cache ?? buildPercentileCache(data, p.minN);

  // hoist per-run weight groups: block -> [{ key, w }] (w > 0 only)
  const blockMetrics: Record<Block, { key: string; w: number }[]> = {
    growth: [],
    quality: [],
    valuation: [],
    momentum: [],
  };
  for (const meta of data.metrics) {
    const w = p.metricWeights[meta.key] ?? 0;
    if (w > 0) blockMetrics[meta.block].push({ key: meta.key, w });
  }

  const results: YearResult[] = [];
  for (const fy of data.years) {
    const universe = eligibleCompanies(data, fy);
    const n = universe.length;
    const idx = new Map<string, number>();
    for (let i = 0; i < n; i++) idx.set(universe[i], i);
    const percentileByMetric = percentileByYear.get(fy)!;

    // block scores by accumulating present rics per on-metric (fast path:
    // iterates percentile maps instead of all metrics per ric)
    const blockScore = new Map<Block, Float64Array>();
    for (const block of blocks) {
      const weighted = new Float64Array(n);
      const weightSum = new Float64Array(n);
      for (const { key, w } of blockMetrics[block]) {
        const pm = percentileByMetric.get(key);
        if (!pm) continue;
        for (const [ric, pv] of pm) {
          const i = idx.get(ric);
          if (i === undefined) continue;
          weighted[i] += w * pv;
          weightSum[i] += w;
        }
      }
      const scores = new Float64Array(n);
      for (let i = 0; i < n; i++) scores[i] = weightSum[i] === 0 ? 0 : weighted[i] / weightSum[i];
      blockScore.set(block, scores);
    }

    // composite + rank
    const g = blockScore.get("growth")!;
    const q = blockScore.get("quality")!;
    const v = blockScore.get("valuation")!;
    const m = blockScore.get("momentum")!;
    const ranked: { ric: string; composite: number }[] = new Array(n);
    for (let i = 0; i < n; i++) {
      ranked[i] = {
        ric: universe[i],
        composite: p.blockWeights.growth * g[i]
          + p.blockWeights.quality * q[i]
          + p.blockWeights.valuation * v[i]
          + p.blockWeights.momentum * m[i],
      };
    }
    ranked.sort((a, b) => b.composite - a.composite || a.ric.localeCompare(b.ric));

    const selected = ranked.slice(0, p.topN).map((r, i) => {
      const info = data.names.get(r.ric)!;
      return {
        rank: i + 1,
        ric: r.ric,
        name: info.name,
        slug: info.slug,
        returnPct: returnPct(data, r.ric, fy) ?? 0,
        composite: r.composite,
      };
    });

    const portfolioReturn = selected.length > 0
      ? selected.reduce((s, c) => s + c.returnPct, 0) / selected.length
      : 0;

    const bench = ranked
      .map((r) => returnPct(data, r.ric, fy))
      .filter((v): v is number => v !== undefined);
    const benchmarkReturn = bench.length > 0
      ? bench.reduce((s, x) => s + x, 0) / bench.length
      : 0;

    const icScores: number[] = [];
    const icReturns: number[] = [];
    for (const r of ranked) {
      const ret = returnPct(data, r.ric, fy);
      if (ret !== undefined) {
        icScores.push(r.composite);
        icReturns.push(ret);
      }
    }
    const ic = icScores.length >= 30 ? spearman(icScores, icReturns) : null;

    results.push({
      fiscalYear: fy,
      nEligible: universe.length,
      portfolioReturn,
      benchmarkReturn,
      excessReturn: portfolioReturn - benchmarkReturn,
      ic,
      constituents: selected,
    });
  }
  return results;
}

/** Mean portfolio return across years (the optimizer's objective). */
export function meanPortfolioReturn(results: YearResult[]): number {
  if (results.length === 0) return 0;
  return results.reduce((s, r) => s + r.portfolioReturn, 0) / results.length;
}

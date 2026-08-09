/**
 * Data-driven factor backtest engine (pure, no I/O).
 * Shared by:
 *  - POST /api/factor/backtest (custom weights/parameters)
 *  - scripts/factor-model/optimize.ts (default-parameter search)
 *  - scripts/factor-model/import.ts (seed the backtest tables)
 *  - tests/factor/*.test.ts
 *
 * Reproduces the GQVM dashboard's math (see scripts/factor-model/score.ts):
 * per-metric percentiles p = COUNTIF(< v)/(COUNT-1) within each year's
 * included universe (inverted for value + two quality metrics), factor
 * scores = mean of available percentiles, composite = renormalized weighted
 * mean of available factor scores, rankable with >= minFactors scores, ties
 * broken by RIC, Top-N equal-weight portfolio, forward returns FYnn->FY(nn+1).
 * Signal years are FY13..FY25 (FY26 is the live year, no forward return).
 */

export type Block = "growth" | "quality" | "valuation" | "momentum";

export interface MetricMeta {
  key: string;
  block: Block;
  higherIsBetter: boolean;
  /** Model default weight within its block (GQVM: equal weights, all 1.0). */
  weightInBlock: number;
}

export interface BacktestParams {
  /** Factor weights: growth/quality/valuation/momentum (renormalized over available factors). */
  blockWeights: Record<Block, number>;
  /** Per-metric weight; 0 = excluded from the block. Renormalized within block. */
  metricWeights: Record<string, number>;
  /** Minimum cross-section for a metric's percentile to count in a year (GQVM: 2). */
  minN: number;
  /** Minimum number of factor scores for a stock to be rankable (GQVM: 3). */
  minFactors: number;
  /** Portfolio size (Top-N). */
  topN: number;
}

export interface FactorData {
  /** Signal years (13..25). */
  years: number[];
  metrics: MetricMeta[];
  /** `${ric}|${metricKey}|${fy}` -> value */
  values: Map<string, number>;
  /** `${ric}|${fy}` -> included in that year's universe */
  membership: Map<string, boolean>;
  /** `${ric}|${fy}` -> annual close (FY12 present for FY13 momentum) */
  closes: Map<string, number>;
  /** ric -> { name, slug } */
  names: Map<string, { name: string; slug: string | null }>;
  /** fy -> Nifty 50 PRICE-index annual return over fy..fy+1 (fallback: universe mean) */
  benchmark?: Map<number, number>;
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
  /** NAV after this year's return (chained from NAV_START at the first year). */
  nav: number;
  constituents: ConstituentRow[];
}

export interface BacktestStats {
  navFinal: number;
  cagr: number;
  vol: number;
  sharpe: number;
  maxDrawdown: number;
  hitRate: number;
  informationRatio: number;
  meanPortfolioReturn: number;
  meanBenchmarkReturn: number;
  meanExcessReturn: number;
}

/**
 * Per-metric percentile maps, precomputed for reuse across many parameter
 * runs. Keyed fy -> metricKey -> ric -> percentile in [0,1]. A metric whose
 * eligible cross-section < minN is absent (treated as missing).
 */
export type PercentileCache = Map<number, Map<string, Map<string, number>>>;

/** GQVM percentile: below / (n-1), inverted for lower-is-better metrics. */
export function percentileOf(sorted: number[], n: number, value: number, higherIsBetter: boolean): number | undefined {
  if (n < 2) return undefined;
  let lo = 0;
  let hi = n;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  const p = lo / (n - 1);
  return higherIsBetter ? p : 1 - p;
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

/** Nifty500 members included in the given signal year (the backtest universe). */
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
      for (const r of rows) {
        const p = percentileOf(sorted, sorted.length, r.value, meta.higherIsBetter);
        if (p !== undefined) map.set(r.ric, p);
      }
      byMetric.set(meta.key, map);
    }
    cache.set(fy, byMetric);
  }
  return cache;
}

/**
 * Runs the factor backtest for every signal year with the given parameters.
 * Conventions: signal at FY-end close, entry at same close, exit at FY+1
 * close; equal-weight Top-N (holdings without a forward price are excluded
 * from the average, never imputed); benchmark = Nifty 50 index return when
 * available (FactorData.benchmark), else equal-weight eligible universe;
 * IC = Spearman(composite, realized return), N >= 30. NAV chained from 100
 * at the first signal year.
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
  let nav = 100;
  for (const fy of data.years) {
    const universe = eligibleCompanies(data, fy);
    const n = universe.length;
    const idx = new Map<string, number>();
    for (let i = 0; i < n; i++) idx.set(universe[i], i);
    const percentileByMetric = percentileByYear.get(fy)!;

    // block scores by accumulating present rics per on-metric (fast path:
    // iterates percentile maps instead of all metrics per ric)
    const blockScore = new Map<Block, Float64Array>();
    const blockWeightSum = new Map<Block, Float64Array>();
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
      blockWeightSum.set(block, weightSum);
    }

    // composite (renormalized over available factors) + rank
    const g = blockScore.get("growth")!;
    const q = blockScore.get("quality")!;
    const v = blockScore.get("valuation")!;
    const m = blockScore.get("momentum")!;
    const ranked: { ric: string; composite: number }[] = [];
    for (let i = 0; i < n; i++) {
      const available = (blockWeightSum.get("growth")![i] ? 1 : 0)
        + (blockWeightSum.get("quality")![i] ? 1 : 0)
        + (blockWeightSum.get("valuation")![i] ? 1 : 0)
        + (blockWeightSum.get("momentum")![i] ? 1 : 0);
      let weightSum = 0;
      let weighted = 0;
      if (p.blockWeights.growth > 0 && blockWeightSum.get("growth")![i]) { weighted += p.blockWeights.growth * g[i]; weightSum += p.blockWeights.growth; }
      if (p.blockWeights.quality > 0 && blockWeightSum.get("quality")![i]) { weighted += p.blockWeights.quality * q[i]; weightSum += p.blockWeights.quality; }
      if (p.blockWeights.valuation > 0 && blockWeightSum.get("valuation")![i]) { weighted += p.blockWeights.valuation * v[i]; weightSum += p.blockWeights.valuation; }
      if (p.blockWeights.momentum > 0 && blockWeightSum.get("momentum")![i]) { weighted += p.blockWeights.momentum * m[i]; weightSum += p.blockWeights.momentum; }
      if (available < p.minFactors || weightSum === 0) continue;
      ranked.push({ ric: universe[i], composite: weighted / weightSum });
    }
    ranked.sort((a, b) => b.composite - a.composite || (a.ric < b.ric ? -1 : a.ric > b.ric ? 1 : 0));

    const withReturn = new Set<string>();
    for (const r of ranked.slice(0, p.topN)) if (returnPct(data, r.ric, fy) !== undefined) withReturn.add(r.ric);

    const selected = ranked.slice(0, p.topN).map((r, i) => {
      const info = data.names.get(r.ric)!;
      const ret = returnPct(data, r.ric, fy);
      return {
        rank: i + 1,
        ric: r.ric,
        name: info.name,
        slug: info.slug,
        returnPct: ret ?? 0,
        composite: r.composite,
      };
    });

    const portfolioReturn = withReturn.size > 0
      ? selected.filter((c) => withReturn.has(c.ric)).reduce((s, c) => s + c.returnPct, 0) / withReturn.size
      : 0;

    const benchSource = data.benchmark?.get(fy);
    let benchmarkReturn = benchSource;
    if (benchmarkReturn === undefined) {
      const bench = ranked
        .map((r) => returnPct(data, r.ric, fy))
        .filter((x): x is number => x !== undefined);
      benchmarkReturn = bench.length > 0 ? bench.reduce((s, x) => s + x, 0) / bench.length : 0;
    }

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

    nav *= 1 + portfolioReturn;
    results.push({
      fiscalYear: fy,
      nEligible: universe.length,
      portfolioReturn,
      benchmarkReturn,
      excessReturn: portfolioReturn - benchmarkReturn,
      ic,
      nav,
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

const stdevP = (xs: number[]): number => {
  const n = xs.length;
  if (n < 2) return 0;
  const mean = xs.reduce((s, x) => s + x, 0) / n;
  return Math.sqrt(xs.reduce((s, x) => s + (x - mean) ** 2, 0) / n);
};

/**
 * GQVM backtest summary stats (mirrors the dashboard's Backtest_Results):
 * CAGR over the NAV series, STDEV.P vol, Sharpe with the risk-free rate,
 * max drawdown on the NAV series (including the start point), hit rate
 * (years beating the benchmark), and information ratio.
 */
export function computeStats(results: YearResult[], riskFreeRate = 0.065): BacktestStats {
  const n = results.length;
  const returns = results.map((r) => r.portfolioReturn);
  const bench = results.map((r) => r.benchmarkReturn);
  const excess = results.map((r) => r.excessReturn);

  const mean = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((s, x) => s + x, 0) / xs.length);
  const navSeries = [100, ...results.map((r) => r.nav)];
  let peak = navSeries[0];
  let maxDrawdown = 0;
  for (const x of navSeries) {
    peak = Math.max(peak, x);
    maxDrawdown = Math.min(maxDrawdown, x / peak - 1);
  }

  const navFinal = results.length ? results[results.length - 1].nav : 100;
  const cagr = n > 0 ? Math.pow(navFinal / 100, 1 / n) - 1 : 0;
  const vol = stdevP(returns);
  const meanRet = mean(returns);
  const meanBench = mean(bench);
  const meanExcess = mean(excess);
  const hitRate = n > 0 ? returns.filter((r, i) => r > bench[i]).length / n : 0;
  const ir = stdevP(excess) === 0 ? 0 : meanExcess / stdevP(excess);

  return {
    navFinal,
    cagr,
    vol,
    sharpe: vol === 0 ? 0 : (meanRet - riskFreeRate) / vol,
    maxDrawdown,
    hitRate,
    informationRatio: ir,
    meanPortfolioReturn: meanRet,
    meanBenchmarkReturn: meanBench,
    meanExcessReturn: meanExcess,
  };
}

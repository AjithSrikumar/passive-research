import { METRICS, MIN_N, type Block, type MetricDef } from "./config";

export interface MetricRow {
  ric: string;
  value: number;
}

export interface ScoreContext {
  /** Eligible + valued rows for a metric/year, in any order. */
  collect: (metricKey: string, fiscalYear: number) => MetricRow[];
  /** Value for a specific company/metric/year, or undefined if missing. */
  value: (ric: string, metricKey: string, fiscalYear: number) => number | undefined;
}

/**
 * Percentile of `value` within `rows` in [0,1]: rank/(n-1) after sorting.
 * Higher-is-better and lower-is-better flip the ranking direction.
 */
export function percentile(rows: MetricRow[], value: number, higherIsBetter: boolean): number {
  const n = rows.length;
  if (n === 0) return 0;
  let below = 0;
  let equal = 0;
  for (const r of rows) {
    if (r.value < value) below++;
    else if (r.value === value) equal++;
  }
  const rank = higherIsBetter ? below + equal / 2 : n - below - equal / 2;
  return n === 1 ? 1 : rank / (n - 1);
}

export interface BlockScoreResult {
  score: number;
  nMetricsUsed: number;
  percentiles: Map<string, number>;
}

/**
 * Block score = weighted average of per-metric percentiles, renormalized
 * across the metrics that have values (missing metrics never count as 0).
 * A metric whose eligible cross-section < MIN_N is treated as missing.
 */
export function blockScore(
  ric: string,
  fiscalYear: number,
  block: Block,
  ctx: ScoreContext
): BlockScoreResult {
  const defs: MetricDef[] = METRICS.filter((m) => m.block === block);
  const percentiles = new Map<string, number>();
  let weighted = 0;
  let weightSum = 0;
  for (const def of defs) {
    const value = ctx.value(ric, def.key, fiscalYear);
    if (value === undefined) continue;
    const rows = ctx.collect(def.key, fiscalYear);
    if (rows.length < MIN_N) continue;
    const p = percentile(rows, value, def.higherIsBetter);
    percentiles.set(def.key, p);
    weighted += def.weightInBlock * p;
    weightSum += def.weightInBlock;
  }
  if (weightSum === 0) return { score: 0, nMetricsUsed: 0, percentiles };
  return { score: weighted / weightSum, nMetricsUsed: percentiles.size, percentiles };
}

/** Composite = 0.3·G + 0.3·Q + 0.3·V + 0.1·M (weights from METRICS config). */
export function compositeScore(blocks: Record<Block, BlockScoreResult>): number {
  return BLOCK_WEIGHTS.growth * blocks.growth.score
    + BLOCK_WEIGHTS.quality * blocks.quality.score
    + BLOCK_WEIGHTS.valuation * blocks.valuation.score
    + BLOCK_WEIGHTS.momentum * blocks.momentum.score;
}

const BLOCK_WEIGHTS: Record<Block, number> = {
  growth: METRICS.find((m) => m.block === "growth")!.blockWeight,
  quality: METRICS.find((m) => m.block === "quality")!.blockWeight,
  valuation: METRICS.find((m) => m.block === "valuation")!.blockWeight,
  momentum: METRICS.find((m) => m.block === "momentum")!.blockWeight,
};

import { MIN_CROSS_SECTION, type Block } from "./config";

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
 * GQVM percentile of `value` within `rows` in [0,1]:
 *   p = COUNTIF(values < value) / (COUNT(values) - 1)
 * where lower-is-better metrics (inverted) return 1 - p. Blanks are excluded
 * from numerator and denominator. Undefined when fewer than two values.
 */
export function percentile(rows: MetricRow[], value: number, higherIsBetter: boolean): number | undefined {
  const n = rows.length;
  if (n < MIN_CROSS_SECTION) return undefined;
  let below = 0;
  for (const r of rows) if (r.value < value) below++;
  const p = below / (n - 1);
  return higherIsBetter ? p : 1 - p;
}

export interface BlockScoreResult {
  score: number;
  nMetricsUsed: number;
  percentiles: Map<string, number>;
}

/**
 * Block score = mean of the per-metric percentiles that have a value
 * (missing metrics never contribute). A block with no valued metrics yields
 * score 0 with nMetricsUsed 0 (treated as unavailable in the composite).
 */
export function blockScore(
  ric: string,
  fiscalYear: number,
  block: Block,
  metricDefs: { key: string; higherIsBetter: boolean }[],
  ctx: ScoreContext
): BlockScoreResult {
  const percentiles = new Map<string, number>();
  let sum = 0;
  for (const def of metricDefs) {
    const value = ctx.value(ric, def.key, fiscalYear);
    if (value === undefined) continue;
    const rows = ctx.collect(def.key, fiscalYear);
    const p = percentile(rows, value, def.higherIsBetter);
    if (p === undefined) continue;
    percentiles.set(def.key, p);
    sum += p;
  }
  return { score: percentiles.size === 0 ? 0 : sum / percentiles.size, nMetricsUsed: percentiles.size, percentiles };
}

/**
 * GQVM composite = renormalized weighted mean of the available factor
 * scores (weights 0.2/0.1/0.6/0.1). Rankable only when at least minFactors
 * factor scores are present. Returns null when not rankable.
 */
export function compositeScore(
  blocks: Record<Block, BlockScoreResult>,
  weights: Record<Block, number>,
  minFactors: number
): number | null {
  let weighted = 0;
  let weightSum = 0;
  let nAvailable = 0;
  for (const block of ["growth", "quality", "valuation", "momentum"] as Block[]) {
    const w = weights[block];
    if (w <= 0) continue;
    if (blocks[block].nMetricsUsed === 0) continue;
    weighted += w * blocks[block].score;
    weightSum += w;
    nAvailable++;
  }
  if (nAvailable < minFactors || weightSum === 0) return null;
  return weighted / weightSum;
}

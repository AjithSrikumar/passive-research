import { TOP_N } from "./config";

export interface BacktestInput {
  fiscalYear: number;
  /** ric -> composite score at signal date (only eligible companies). */
  scores: Map<string, number>;
  /** ric -> realized 1-year return (exit/entry − 1). */
  returns: Map<string, number>;
}

export interface BacktestResult {
  fiscalYear: number;
  nEligible: number;
  selected: { rank: number; ric: string; composite: number; returnPct: number }[];
  portfolioReturn: number;
  benchmarkReturn: number;
  excessReturn: number;
  ic: number | null;
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

/**
 * Top-20 backtest with a strict no-look-ahead convention:
 * signal at FY-end close; entry at same close; exit at FY+1 close.
 */
export function runBacktest(input: BacktestInput): BacktestResult {
  const ranked = [...input.scores.entries()].sort((a, b) => b[1] - a[1]);
  const selected = ranked.slice(0, TOP_N).map(([ric, composite], i) => ({
    rank: i + 1,
    ric,
    composite,
    returnPct: input.returns.get(ric) ?? 0,
  }));
  const portfolioReturn =
    selected.length > 0
      ? selected.reduce((s, c) => s + c.returnPct, 0) / selected.length
      : 0;
  const allReturns = [...input.returns.values()];
  const benchmarkReturn =
    allReturns.length > 0
      ? allReturns.reduce((s, x) => s + x, 0) / allReturns.length
      : 0;
  const scores = [...input.scores.values()];
  const returns = [...input.returns.values()];
  const ic = scores.length >= 30 ? spearman(scores, returns) : null;
  return {
    fiscalYear: input.fiscalYear,
    nEligible: input.scores.size,
    selected,
    portfolioReturn,
    benchmarkReturn,
    excessReturn: portfolioReturn - benchmarkReturn,
    ic,
  };
}

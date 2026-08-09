import { describe, expect, it } from "vitest";
import {
  buildPercentileCache,
  meanPortfolioReturn,
  percentileOf,
  runFactorBacktest,
  type BacktestParams,
  type FactorData,
} from "@/lib/factor/engine";
import { DEFAULT_BACKTEST_PARAMS, FACTOR_METRICS } from "@/lib/factor/params";

function makeData(): FactorData {
  const rics = ["A", "B", "C", "D", "E", "F"];
  const rev: Record<string, number> = { A: 10, B: 20, C: 30, D: 40, E: 50, F: 60 };
  const pe: Record<string, number> = { A: 6, B: 5, C: 4, D: 3, E: 2, F: 1 };
  const close13: Record<string, number> = { A: 100, B: 110, C: 120, D: 130, E: 140, F: 150 };
  const close14: Record<string, number> = { A: 110, B: 100, C: 140, D: 120, E: 160, F: 180 };
  const values = new Map<string, number>();
  const closes = new Map<string, number>();
  const membership = new Map<string, boolean>();
  const names = new Map<string, { name: string; slug: string | null }>();
  for (const ric of rics) {
    values.set(`${ric}|rev|13`, rev[ric]);
    values.set(`${ric}|pe|13`, pe[ric]);
    closes.set(`${ric}|12`, 100);
    closes.set(`${ric}|13`, close13[ric]);
    closes.set(`${ric}|14`, close14[ric]);
    membership.set(`${ric}|13`, true);
    membership.set(`${ric}|14`, true);
    names.set(ric, { name: `Company ${ric}`, slug: null });
  }
  return {
    years: [13, 14],
    metrics: [
      { key: "rev", block: "growth", higherIsBetter: true, weightInBlock: 1 },
      { key: "pe", block: "valuation", higherIsBetter: false, weightInBlock: 1 },
      { key: "momentum_1y", block: "momentum", higherIsBetter: true, weightInBlock: 1 },
    ],
    values,
    membership,
    closes,
    names,
  };
}

const MODEL_PARAMS: BacktestParams = {
  blockWeights: { growth: 0.5, quality: 0, valuation: 0.5, momentum: 0 },
  metricWeights: { rev: 1, pe: 1, momentum_1y: 1 },
  minN: 2,
  minFactors: 1,
  topN: 2,
};

describe("percentileOf", () => {
  it("computes below/(n-1) and flips direction for lower-is-better", () => {
    expect(percentileOf([1, 2, 2, 3], 4, 2, true)).toBeCloseTo(1 / 3, 9); // 1 of 4 values below 2
    expect(percentileOf([1, 2, 2, 3], 4, 2, false)).toBeCloseTo(2 / 3, 9);
    expect(percentileOf([1, 2, 2, 3], 4, 1, true)).toBe(0); // worst value scores 0
    expect(percentileOf([5], 1, 5, true)).toBeUndefined(); // n < 2
  });
});

describe("runFactorBacktest conventions", () => {
  const data = makeData();

  it("selects top-N by composite using custom block + metric weights", () => {
    // rev percentile (higher): F=1, E=0.8, D=0.6, C=0.4, B=0.2, A=0
    // pe percentile (lower, inverted): F=1, E=0.8, D=0.6, C=0.4, B=0.2, A=0
    const results = runFactorBacktest(data, MODEL_PARAMS);
    const r13 = results.find((r) => r.fiscalYear === 13)!;
    expect(r13.nEligible).toBe(6);
    expect(r13.constituents.map((c) => c.ric)).toEqual(["F", "E"]);
    // returns: F=180/150-1=0.20, E=160/140-1=0.142857
    expect(r13.constituents[0].returnPct).toBeCloseTo(0.2, 9);
    expect(r13.portfolioReturn).toBeCloseTo((0.2 + 0.14285714285714285) / 2, 9);
    // NAV chains from 100
    expect(r13.nav).toBeCloseTo(100 * (1 + r13.portfolioReturn), 9);
    // benchmark = mean of all six one-year returns
    const returns = [110 / 100 - 1, 100 / 110 - 1, 140 / 120 - 1, 120 / 130 - 1, 160 / 140 - 1, 180 / 150 - 1];
    expect(r13.benchmarkReturn).toBeCloseTo(returns.reduce((s, x) => s + x, 0) / 6, 9);
    expect(r13.excessReturn).toBeCloseTo(r13.portfolioReturn - r13.benchmarkReturn, 9);
  });

  it("counts a zero-percentile block as present (no renormalization bias)", () => {
    // A has the worst rev AND worst pe -> both percentiles 0; the blocks must
    // still count as present so A is rankable (minFactors 2) with composite 0.
    const results = runFactorBacktest(data, {
      ...MODEL_PARAMS,
      minFactors: 2,
      topN: 6,
    });
    const r13 = results.find((r) => r.fiscalYear === 13)!;
    expect(r13.constituents.map((c) => c.ric)).toEqual(["F", "E", "D", "C", "B", "A"]);
    expect(r13.constituents[5].composite).toBe(0);
  });

  it("recomputes momentum from prices and honors momentum block weight", () => {
    const results = runFactorBacktest(data, {
      ...MODEL_PARAMS,
      blockWeights: { growth: 0, quality: 0, valuation: 0, momentum: 1 },
      metricWeights: { rev: 1, pe: 1, momentum_1y: 1 },
    });
    const r13 = results.find((r) => r.fiscalYear === 13)!;
    expect(r13.constituents[0].ric).toBe("F"); // highest 1-year price change
  });

  it("excludes metrics below MinN: no qualifying metric leaves nothing rankable", () => {
    const results = runFactorBacktest(data, { ...MODEL_PARAMS, minN: 7, minFactors: 0 });
    const r13 = results.find((r) => r.fiscalYear === 13)!;
    expect(r13.constituents).toEqual([]);
    expect(r13.portfolioReturn).toBe(0);
  });

  it("returns null IC below N=30 and a value with a big enough cross-section", () => {
    const small = runFactorBacktest(data, MODEL_PARAMS);
    expect(small[0].ic).toBeNull();

    const big = makeData();
    const rics = [...big.names.keys()];
    for (let i = 0; i < 40; i++) {
      const ric = `X${i}`;
      rics.push(ric);
      big.names.set(ric, { name: ric, slug: null });
      big.values.set(`${ric}|rev|13`, 100 + i);
      big.values.set(`${ric}|pe|13`, 100 - i);
      big.closes.set(`${ric}|12`, 100);
      big.closes.set(`${ric}|13`, 100);
      big.closes.set(`${ric}|14`, 100 + (i % 5) * 2);
      big.membership.set(`${ric}|13`, true);
      big.membership.set(`${ric}|14`, true);
    }
    const res = runFactorBacktest(big, MODEL_PARAMS);
    const ic = res[0].ic;
    expect(ic).not.toBeNull();
    expect(ic).toBeGreaterThan(-1);
    expect(ic).toBeLessThan(1);
  });

  it("reusing a percentile cache yields identical results", () => {
    const cache = buildPercentileCache(data, MODEL_PARAMS.minN);
    const cached = runFactorBacktest(data, MODEL_PARAMS, cache);
    const fresh = runFactorBacktest(data, MODEL_PARAMS);
    expect(cached).toEqual(fresh);
  });

  it("meanPortfolioReturn averages yearly portfolio returns", () => {
    const results = runFactorBacktest(data, MODEL_PARAMS);
    const expected = results.reduce((s, r) => s + r.portfolioReturn, 0) / results.length;
    expect(meanPortfolioReturn(results)).toBeCloseTo(expected, 9);
  });
});

describe("default params sanity", () => {
  it("covers every metric in the catalog", () => {
    for (const m of FACTOR_METRICS) {
      expect(DEFAULT_BACKTEST_PARAMS.metricWeights[m.key]).toBeDefined();
    }
  });

  it("defaults are within UI ranges", () => {
    expect(DEFAULT_BACKTEST_PARAMS.minN).toBeGreaterThanOrEqual(2);
    expect(DEFAULT_BACKTEST_PARAMS.minN).toBeLessThanOrEqual(150);
    expect(DEFAULT_BACKTEST_PARAMS.minFactors).toBeGreaterThanOrEqual(1);
    expect(DEFAULT_BACKTEST_PARAMS.minFactors).toBeLessThanOrEqual(4);
    expect(DEFAULT_BACKTEST_PARAMS.topN).toBeGreaterThanOrEqual(10);
    expect(DEFAULT_BACKTEST_PARAMS.topN).toBeLessThanOrEqual(30);
    for (const key of ["growth", "quality", "valuation", "momentum"] as const) {
      const w = DEFAULT_BACKTEST_PARAMS.blockWeights[key];
      expect(w).toBeGreaterThanOrEqual(0);
      expect(w).toBeLessThanOrEqual(1);
    }
  });

  it("GQVM defaults match the dashboard's recommended configuration", () => {
    expect(DEFAULT_BACKTEST_PARAMS.blockWeights).toEqual({ growth: 0.2, quality: 0.1, valuation: 0.6, momentum: 0.1 });
    expect(DEFAULT_BACKTEST_PARAMS.minN).toBe(2);
    expect(DEFAULT_BACKTEST_PARAMS.minFactors).toBe(3);
    expect(DEFAULT_BACKTEST_PARAMS.topN).toBe(20);
  });
});

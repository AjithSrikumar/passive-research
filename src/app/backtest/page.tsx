import type { Metadata } from "next";
import FactorBacktestRunner from "@/components/FactorBacktestRunner";
import { BACKTEST_CONSTITUENTS, BACKTEST_YEARS } from "@/lib/factor/backtest";
import { FACTOR_BY_YEAR, FACTOR_YEARS } from "@/lib/factor/data";
import { OPTIMIZER_SUMMARY } from "@/lib/factor/params";

export const metadata: Metadata = {
  title: "Factor Model Backtest",
  description:
    "GQVM factor backtest (FY13–FY25) with the live FY2026 portfolio: adjust factor weights, per-metric parameters, MinN, MinFactors and Top-N, or start from the GQVM recommended defaults and view each year's portfolio.",
};

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const pctCls = (v: number) => (v > 0 ? "positive" : v < 0 ? "negative" : "");

export default function BacktestPage() {
  const liveYear = FACTOR_YEARS[FACTOR_YEARS.length - 1];
  const liveTop = (FACTOR_BY_YEAR[liveYear] ?? [])
    .slice(0, 20)
    .map((r) => ({
      rank: r[4],
      ric: r[0],
      name: r[1],
      slug: r[2],
      composite: r[5],
    }));

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Factor Model Backtest</span>
          <h1>Top-20 Factor Portfolio, FY13 → FY25</h1>
          <p>
            Every 30 June, the model ranks the eligible universe on a composite
            of growth (20%), quality (10%), valuation (60%) and momentum (10%)
            factor scores. The top N form an equal-weight portfolio held for
            one year. Weights, the metrics inside each factor, MinN,
            MinFactors and Top-N are all adjustable — run your own backtest, or
            start from the GQVM recommended defaults and see the live FY2026
            portfolio.
          </p>
          <div className="hero-meta">
            <span>
              <strong>{pct(OPTIMIZER_SUMMARY.meanPortfolioReturn)}</strong>{" "}
              avg portfolio (GQVM defaults)
            </span>
            <span>
              <strong>{pct(OPTIMIZER_SUMMARY.meanBenchmarkReturn)}</strong> avg
              benchmark
            </span>
            <span>
              <strong className={pctCls(OPTIMIZER_SUMMARY.meanExcessReturn)}>
                {pct(OPTIMIZER_SUMMARY.meanExcessReturn)}
              </strong>{" "}
              avg excess
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <FactorBacktestRunner
            staticYears={BACKTEST_YEARS}
            staticConstituents={BACKTEST_CONSTITUENTS}
            liveTop={liveTop}
          />
        </div>
      </section>
    </main>
  );
}

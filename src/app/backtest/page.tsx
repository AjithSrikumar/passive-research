import type { Metadata } from "next";
import FactorBacktestRunner from "@/components/FactorBacktestRunner";
import { BACKTEST_CONSTITUENTS, BACKTEST_YEARS } from "@/lib/factor/backtest";
import { OPTIMIZER_SUMMARY } from "@/lib/factor/params";

export const metadata: Metadata = {
  title: "Factor Model Backtest",
  description:
    "Run your own top-N factor backtest (FY13–FY25): adjust factor weights, per-metric parameters, MinN and Top-N, or start from the optimized defaults and view each year's portfolio with a year dropdown.",
};

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const pctCls = (v: number) => (v > 0 ? "positive" : v < 0 ? "negative" : "");

export default function BacktestPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Factor Model Backtest</span>
          <h1>Top-20 Factor Portfolio, FY13 → FY25</h1>
          <p>
            Every March, the model ranks the eligible universe on composite
            score. The top N form an equal-weight portfolio held for one year.
            Weights (growth · quality · valuation · momentum), the metrics
            inside each factor, MinN and Top-N are all adjustable — run your
            own backtest, or start from the defaults optimized for the highest
            mean portfolio return.
          </p>
          <div className="hero-meta">
            <span>
              <strong>{pct(OPTIMIZER_SUMMARY.meanPortfolioReturn)}</strong>{" "}
              avg portfolio (optimized defaults)
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
          />
        </div>
      </section>
    </main>
  );
}

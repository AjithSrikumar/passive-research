import type { Metadata } from "next";
import Link from "next/link";
import { BACKTEST_CONSTITUENTS, BACKTEST_YEARS } from "@/lib/factor/backtest";

export const metadata: Metadata = {
  title: "Factor Model Backtest",
  description:
    "How the four-factor model (growth, quality, valuation, momentum) would have performed as a top-20 portfolio since FY12 — yearly returns, benchmark comparison, information coefficients and constituents.",
};

const pct = (v: number | null) => (v === null ? "—" : `${(v * 100).toFixed(1)}%`);
const pctCls = (v: number | null) =>
  v === null ? "" : v > 0 ? "positive" : v < 0 ? "negative" : "";

export default function BacktestPage() {
  const byYear = new Map<number, typeof BACKTEST_CONSTITUENTS>();
  for (const c of BACKTEST_CONSTITUENTS) {
    if (!byYear.has(c[0])) byYear.set(c[0], []);
    byYear.get(c[0])!.push(c);
  }

  const avg = (vals: (number | null)[]) => {
    const present = vals.filter((v): v is number => v !== null);
    if (present.length === 0) return null;
    return present.reduce((a, b) => a + b, 0) / present.length;
  };

  const portfolioAvg = avg(BACKTEST_YEARS.map((y) => y[2]));
  const benchmarkAvg = avg(BACKTEST_YEARS.map((y) => y[3]));
  const excessAvg = avg(BACKTEST_YEARS.map((y) => y[4]));

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Factor Model Backtest</span>
          <h1>Top-20 Factor Portfolio, FY12 → FY25</h1>
          <p>
            Every March, the model ranks the eligible universe on composite
            score (growth 30% · quality 30% · valuation 30% · momentum 10%).
            The top 20 form an equal-weight portfolio held for one year. The
            table below is the full historical record.
          </p>
          <div className="hero-meta">
            <span>
              <strong>{pct(portfolioAvg)}</strong> avg portfolio
            </span>
            <span>
              <strong>{pct(benchmarkAvg)}</strong> avg benchmark
            </span>
            <span>
              <strong className={pctCls(excessAvg)}>{pct(excessAvg)}</strong>{" "}
              avg excess
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="coverage-table-wrap">
            <table className="coverage-table backtest-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Universe</th>
                  <th>Portfolio</th>
                  <th>Benchmark</th>
                  <th>Excess</th>
                  <th>IC</th>
                  <th>Top-20</th>
                </tr>
              </thead>
              <tbody>
                {BACKTEST_YEARS.map((y) => (
                  <tr key={y[0]}>
                    <td className="num">FY{y[0] + 2000}</td>
                    <td className="num">{y[1]}</td>
                    <td className={`num ${pctCls(y[2])}`}>{pct(y[2])}</td>
                    <td className={`num ${pctCls(y[3])}`}>{pct(y[3])}</td>
                    <td className={`num ${pctCls(y[4])}`}>
                      <strong>{pct(y[4])}</strong>
                    </td>
                    <td className="num">{y[5] === null ? "—" : y[5].toFixed(3)}</td>
                    <td className="num">{y[6]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sort-row" style={{ marginTop: 32 }}>
            <span>
              <b>{BACKTEST_YEARS.length}</b> backtested years ·{" "}
              <b>{BACKTEST_CONSTITUENTS.length}</b> portfolio slots · IC is
              Spearman rank correlation between composite score and next-year
              return (N ≥ 30)
            </span>
          </div>

          {BACKTEST_YEARS.slice()
            .reverse()
            .map((y) => {
              const constituents = byYear.get(y[0]) ?? [];
              return (
                <div key={y[0]} className="backtest-year">
                  <h2 className="backtest-year-title">FY{y[0] + 2000} portfolio</h2>
                  <div className="coverage-table-wrap">
                    <table className="coverage-table backtest-constituents">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Company</th>
                          <th>1-Yr Return</th>
                        </tr>
                      </thead>
                      <tbody>
                        {constituents.map((c) => (
                          <tr key={`${c[0]}-${c[2]}`}>
                            <td className="num">{c[1]}</td>
                            <td>
                              {c[5] ? (
                                <Link href={`/company/${c[5]}`} className="co-name">
                                  {c[4]}
                                  <span className="co-ticker">{c[2]}</span>
                                </Link>
                              ) : (
                                <span className="co-name">
                                  {c[4]}
                                  <span className="co-ticker">{c[2]}</span>
                                </span>
                              )}
                            </td>
                            <td className={`num ${pctCls(c[3])}`}>{pct(c[3])}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
}

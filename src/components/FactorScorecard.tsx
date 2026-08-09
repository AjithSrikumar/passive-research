import Link from "next/link";
import {
  getCompanyFactorHistory,
  rankedCount,
} from "@/lib/factor/company";

const pct = (v: number | null) => (v === null ? "—" : `${(v * 100).toFixed(1)}%`);

const BLOCKS = [
  { key: "growth" as const, label: "Growth", title: "Growth score" },
  { key: "quality" as const, label: "Quality", title: "Quality score" },
  { key: "valuation" as const, label: "Valuation", title: "Valuation score" },
  { key: "momentum" as const, label: "Momentum", title: "Momentum score" },
];

export default function FactorScorecard({ slug }: { slug: string }) {
  const history = getCompanyFactorHistory(slug);
  if (!history) return null;

  const latest = history[history.length - 1];
  const universe = rankedCount(latest.fiscalYear);

  return (
    <section className="section">
      <div className="section-inner">
        <div className="factor-scorecard-head">
          <h2>Factor Model Scores</h2>
          <p>
            Rank in the GQVM factor model universe — growth 20%, quality 10%,
            valuation 60%, momentum 10% (
            <Link href="/screener">open screener</Link> ·{" "}
            <Link href="/backtest">backtest record</Link>). FY{latest.fiscalYear + 2000} is live.
          </p>
        </div>

        <div className="factor-scorecard-grid">
          <div className="factor-scorecard-latest">
            <span className="factor-scorecard-label">
              FY{latest.fiscalYear + 2000} composite · rank {latest.rank} of{" "}
              {universe}
            </span>
            <b className="factor-scorecard-big">
              {pct(latest.composite)}
            </b>
            <div className="factor-scorecard-blocks">
              {BLOCKS.map((b) => (
                <div key={b.key} className="factor-scorecard-block" title={b.title}>
                  <span>{b.label}</span>
                  <b>{pct(latest[b.key])}</b>
                </div>
              ))}
            </div>
          </div>

          <div className="factor-scorecard-table-wrap">
            <table className="coverage-table factor-scorecard-table">
              <thead>
                <tr>
                  <th>FY</th>
                  <th>Rank</th>
                  <th>Composite</th>
                  <th>G</th>
                  <th>Q</th>
                  <th>V</th>
                  <th>M</th>
                  <th>Top-20 Return</th>
                </tr>
              </thead>
              <tbody>
                {[...history].reverse().map((y) => (
                  <tr key={y.fiscalYear}>
                    <td className="num">FY{y.fiscalYear + 2000}</td>
                    <td className="num">{y.rank}</td>
                    <td className="num">{pct(y.composite)}</td>
                    <td className="num">{pct(y.growth)}</td>
                    <td className="num">{pct(y.quality)}</td>
                    <td className="num">{pct(y.valuation)}</td>
                    <td className="num">{pct(y.momentum)}</td>
                    <td className={`num ${y.returnPct !== null && y.returnPct >= 0 ? "positive" : y.returnPct !== null && y.returnPct < 0 ? "negative" : ""}`}>
                      {y.returnPct === null ? "—" : `${pct(y.returnPct)}*`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="factor-scorecard-note">
          * Realized next-year return when selected in that year&apos;s Top-20
          factor portfolio.
        </p>
      </div>
    </section>
  );
}

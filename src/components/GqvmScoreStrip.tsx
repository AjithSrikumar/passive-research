import Link from "next/link";
import { getCompanyFactorHistory, rankedCount } from "@/lib/factor/company";

const pct = (v: number | null) => (v === null ? "—" : `${(v * 100).toFixed(1)}%`);

const BLOCKS = [
  { key: "growth" as const, label: "Growth", title: "Growth score" },
  { key: "quality" as const, label: "Quality", title: "Quality score" },
  { key: "valuation" as const, label: "Valuation", title: "Valuation score" },
  { key: "momentum" as const, label: "Momentum", title: "Momentum score" },
];

/** Compact GQVM score strip (block scores + total score at 1 decimal) for the
 *  top of company pages. Renders null when the company has no factor data. */
export default function GqvmScoreStrip({ slug }: { slug: string }) {
  const history = getCompanyFactorHistory(slug);
  if (!history) return null;

  const latest = history[history.length - 1];
  const universe = rankedCount(latest.fiscalYear);

  return (
    <div className="gqvm-strip">
      {BLOCKS.map((b) => (
        <div key={b.key} className="gqvm-strip-tile" title={b.title}>
          <span className="gqvm-strip-label">{b.label}</span>
          <b className="gqvm-strip-value">{pct(latest[b.key])}</b>
        </div>
      ))}
      <div className="gqvm-strip-tile gqvm-strip-total" title="Total GQVM score">
        <span className="gqvm-strip-label">Total Score</span>
        <b className="gqvm-strip-value">{pct(latest.composite)}</b>
      </div>
      <p className="gqvm-strip-caption">
        FY{latest.fiscalYear + 2000} GQVM scores · rank {latest.rank} of {universe} in the
        NSE-900 universe (
        <Link href="/screener">screener</Link>)
      </p>
    </div>
  );
}

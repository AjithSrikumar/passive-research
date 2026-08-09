import type { Metadata } from "next";
import Link from "next/link";
import FactorScreener from "@/components/FactorScreener";
import { FACTOR_BY_YEAR, FACTOR_YEARS } from "@/lib/factor/data";

export const metadata: Metadata = {
  title: "Factor Screener",
  description:
    "Rank the full research universe on the GQVM factor model — growth, quality, valuation and momentum — with composite scores for every fiscal year from FY13.",
};

export default function ScreenerPage() {
  const latest = FACTOR_YEARS[FACTOR_YEARS.length - 1];
  const count = FACTOR_BY_YEAR[latest]?.length ?? 0;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Factor Screener</span>
          <h1>Rank Every Company on Four Factors</h1>
          <p>
            {count} companies ranked for FY{latest + 2000} — growth 20%, quality
            10%, valuation 60%, momentum 10%. Filters, sortable columns and CSV
            export. Read the model in{" "}
            <Link href="/methodology" className="inline-link">
              Methodology
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section">
        <FactorScreener byYear={FACTOR_BY_YEAR} />
      </section>
    </main>
  );
}

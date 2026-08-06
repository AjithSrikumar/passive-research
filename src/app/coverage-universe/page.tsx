import type { Metadata } from "next";
import Link from "next/link";
import {
  companies,
  formatCr,
  formatPrice,
  sortByRating,
} from "@/lib/companies";
import { sectorName } from "@/lib/sectors";
import RatingBadge from "@/components/RatingBadge";

export const metadata: Metadata = {
  title: "Coverage Universe",
  description:
    "The complete Passive coverage universe — every company we research, with ticker, sector, rating, price, target and market cap in one table.",
};

export default function CoveragePage() {
  const sorted = sortByRating(companies);
  const ratings = companies.reduce<Record<string, number>>((acc, c) => {
    acc[c.recommendation] = (acc[c.recommendation] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Coverage Universe</span>
          <h1>Every Company We Cover</h1>
          <p>
            {companies.length} companies. {new Set(companies.map((c) => c.sector)).size}{" "}
            sectors. Sorted by rating — Strong Buy first.
          </p>
          <div className="hero-meta">
            {Object.entries(ratings).map(([r, n]) => (
              <span key={r}>
                <RatingBadge rating={r as "Strong Buy"} size="sm" /> {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="coverage-table-wrap">
            <table className="coverage-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Sector</th>
                  <th>Rating</th>
                  <th>Price (₹)</th>
                  <th>Target (₹)</th>
                  <th>Upside</th>
                  <th>Mkt Cap</th>
                  <th>P/E</th>
                  <th>ROE</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c) => (
                  <tr key={c.slug}>
                    <td>
                      <Link href={`/company/${c.slug}`} className="co-name">
                        {c.name}
                        <span className="co-ticker">{c.ticker}</span>
                      </Link>
                    </td>
                    <td>{sectorName(c.sector)}</td>
                    <td>
                      <RatingBadge rating={c.recommendation} size="sm" />
                    </td>
                    <td>{formatPrice(c.currentPrice)}</td>
                    <td>{formatPrice(c.targetPrice)}</td>
                    <td
                      className={c.upsidePct >= 0 ? "positive" : "negative"}
                      style={{ fontWeight: 700 }}
                    >
                      {c.upsidePct >= 0 ? "+" : ""}
                      {c.upsidePct.toFixed(1)}%
                    </td>
                    <td>{formatCr(c.marketCapCr)}</td>
                    <td>{c.pe ? `${c.pe}x` : "—"}</td>
                    <td>{c.roePct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
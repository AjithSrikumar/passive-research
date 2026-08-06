import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import RatingBadge from "./RatingBadge";
import {
  companies,
  formatUpdated,
  formatPrice,
  formatCr,
} from "@/lib/companies";

const GROUP_LABELS: Record<string, string> = {
  Today: "Today",
  Yesterday: "Yesterday",
};

function groupLabel(c: (typeof companies)[number]) {
  const g = formatUpdated(c.updatedDate);
  return GROUP_LABELS[g] ?? "Earlier this week";
}

export default function LatestList() {
  const sorted = [...companies]
    .sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))
    .slice(0, 8);

  const rows: {
    company: (typeof companies)[number];
    group: string;
    first: boolean;
  }[] = [];
  for (const c of sorted) {
    const g = groupLabel(c);
    const first = g !== rows[rows.length - 1]?.group;
    rows.push({ company: c, group: g, first });
  }

  return (
    <div className="latest-list">
      {rows.map(({ company: c, group, first }) => (
        <div key={c.slug} className={`latest-row ${first ? "is-group-start" : ""}`}>
          {first && (
            <div className="latest-group-label">
              <span className="dot" />
              {group}
            </div>
          )}
          <Link href={`/company/${c.slug}`} className="latest-row-link">
            <span className="lr-logo">
              <CompanyLogo company={c} size={40} />
            </span>
            <span className="lr-main">
              <span className="lr-title">
                <span className="lr-name">{c.name}</span>
                <span className="lr-ticker">{c.ticker}</span>
              </span>
              <span className="lr-meta">
                {c.industry} · {formatCr(c.marketCapCr)}
              </span>
            </span>
            <span className="lr-price">{formatPrice(c.currentPrice)}</span>
            <span className={`lr-upside ${c.upsidePct >= 0 ? "positive" : "negative"}`}>
              {c.upsidePct >= 0 ? "+" : ""}
              {c.upsidePct.toFixed(1)}%
            </span>
            <RatingBadge rating={c.recommendation} size="sm" />
            <span className="lr-time">{formatUpdated(c.updatedDate)}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

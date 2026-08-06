import Link from "next/link";
import type { Company } from "@/lib/companies";
import { formatCr, formatPrice, formatUpdated } from "@/lib/companies";
import CompanyLogo from "./CompanyLogo";
import RatingBadge from "./RatingBadge";

export default function CompanyCard({
  company,
  compact = false,
}: {
  company: Company;
  compact?: boolean;
}) {
  return (
    <Link href={`/company/${company.slug}`} className="company-card">
      <div className="company-card-top">
        <CompanyLogo company={company} size={compact ? 40 : 44} />
        <div className="company-card-id">
          <h3>{company.name}</h3>
          <p>
            {company.ticker} · {company.industry}
          </p>
        </div>
        <RatingBadge rating={company.recommendation} size="sm" />
      </div>

      <p className="company-thesis">{company.shortThesis}</p>

      <div className="company-stats">
        <div className="stat">
          <span className="stat-label">Current Price</span>
          <span className="stat-value">{formatPrice(company.currentPrice)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Target Price</span>
          <span className="stat-value">{formatPrice(company.targetPrice)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Upside</span>
          <span
            className={`stat-value stat-upside ${
              company.upsidePct >= 0 ? "positive" : "negative"
            }`}
          >
            {company.upsidePct >= 0 ? "+" : ""}
            {company.upsidePct.toFixed(1)}%
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatCr(company.marketCapCr)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Sector</span>
          <span className="stat-value stat-sector">
            {company.sector.replace(/-/g, " ")}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Updated</span>
          <span className="stat-value">{formatUpdated(company.updatedDate)}</span>
        </div>
      </div>
    </Link>
  );
}
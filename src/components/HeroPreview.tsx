import Link from "next/link";
import CompanyLogo from "./CompanyLogo";
import RatingBadge from "./RatingBadge";
import { getCompany, formatPrice } from "@/lib/companies";

const CHART_BARS = [38, 52, 44, 60, 55, 72, 66, 82, 76, 92, 85, 100];

export default function HeroPreview() {
  const company = getCompany("trent");

  return (
    <div className="hero-preview" aria-hidden>
      <div className="hero-preview-card">
        <div className="hero-preview-float">
          <span className="fp-label">Target</span>
          <span className="fp-value">₹7,920</span>
        </div>
        {company ? (
          <>
            <div className="hero-preview-top">
              <CompanyLogo company={company} size={48} />
              <div className="hero-preview-title">
                <b>{company.name}</b>
                <span>
                  {company.ticker} · {company.sector.replace(/-/g, " ")}
                </span>
              </div>
              <RatingBadge rating={company.recommendation} size="sm" />
            </div>
            <div className="hero-preview-chart">
              {CHART_BARS.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="hero-preview-metrics">
              <div className="hero-preview-metric">
                <b className="positive">{company.upsidePct >= 0 ? "+" : ""}{company.upsidePct.toFixed(1)}%</b>
                <span>Upside</span>
              </div>
              <div className="hero-preview-metric">
                <b>{formatPrice(company.currentPrice)}</b>
                <span>Current</span>
              </div>
              <div className="hero-preview-metric">
                <b>{formatPrice(company.targetPrice)}</b>
                <span>Target</span>
              </div>
            </div>
          </>
        ) : (
          <div className="hero-preview-top">
            <div className="hero-preview-title">
              <b>Research Preview</b>
              <span>Full 25-section report</span>
            </div>
            <RatingBadge rating="Buy" size="sm" />
          </div>
        )}
      </div>
      <Link href="/latest-research" className="hero-preview-cta">
        View a sample report →
      </Link>
    </div>
  );
}
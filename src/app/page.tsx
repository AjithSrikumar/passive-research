import type { Metadata } from "next";
import Link from "next/link";
import SearchCompanies from "@/components/SearchCompanies";
import SectorCard from "@/components/SectorCard";
import CompanyCard from "@/components/CompanyCard";
import HeroPreview from "@/components/HeroPreview";
import LatestList from "@/components/LatestList";
import { sectors } from "@/lib/sectors";
import { companies } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Professional Equity Research for Indian Stocks",
  description:
    `Passive delivers institutional-grade equity research on ${companies.length} Indian listed companies across ${sectors.length} sectors — Screener-grade financials, DCF valuations, and decisive ratings.`,
};

const FEATURED = [
  "adani-green-energy",
  "trent",
  "bharti-airtel",
  "pi-industries",
  "suzlon-energy",
  "hdfc-bank",
  "tata-motors",
  "dixon-technologies",
];

const POPULAR_SEARCHES = ["HDFC Bank", "TCS", "Titan", "Trent", "ICICI Bank"];

const MARKET_SNAPSHOT = [
  { name: "NIFTY 50", value: "25,610", change: "+0.84%", dir: "positive" },
  { name: "SENSEX", value: "83,724", change: "+0.75%", dir: "positive" },
  { name: "BANK NIFTY", value: "55,140", change: "-0.14%", dir: "negative" },
  { name: "INDIA VIX", value: "12.6", change: "-2.3%", dir: "positive" },
  { name: "USD/INR", value: "86.21", change: "-0.08%", dir: "positive" },
];

function popularLink(name: string) {
  const match = companies.find(
    (c) => c.name.toLowerCase().includes(name.toLowerCase())
  );
  return match ? `/company/${match.slug}` : `/research?q=${encodeURIComponent(name)}`;
}

export default function HomePage() {
  const featured = companies.filter((c) => FEATURED.includes(c.slug));

  return (
    <main>
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden />
        <div className="hero-inner">
          <div>
            <span className="hero-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {companies.length} Indian Companies · {sectors.length} Sectors ·
              Independently Rated
            </span>
            <h1>
              Research built to be{" "}
              <span className="accent">decisive.</span>
            </h1>
            <p className="hero-sub">
              Passive is an independent research platform for Indian listed
              equities. Full financial models, honest DCF valuations, and a
              single decisive rating per name — the way institutional analysts
              work.
            </p>
            <div className="hero-search">
              <SearchCompanies />
              <div className="hero-quick-links">
                <span className="ql-label">Popular:</span>
                {POPULAR_SEARCHES.map((n) => (
                  <Link key={n} href={popularLink(n)}>
                    {n}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <b>{companies.length}+</b>
                <span>Companies Covered</span>
              </div>
              <div className="hero-stat">
                <b>{sectors.length}</b>
                <span>Sectors Analysed</span>
              </div>
              <div className="hero-stat">
                <b>25</b>
                <span>Sections per Report</span>
              </div>
              <div className="hero-stat">
                <b>100%</b>
                <span>Transparent Method</span>
              </div>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      <div className="market-strip">
        <div className="market-strip-inner">
          <span className="ms-label">Market Snapshot</span>
          {MARKET_SNAPSHOT.map((m) => (
            <span key={m.name} className="market-item">
              <span className="mi-name">{m.name}</span>
              <span className="mi-value">{m.value}</span>
              <span className={`mi-change ${m.dir}`}>{m.change}</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section bg-soft-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2>Browse by Sectors</h2>
              <p>
                Every major Indian industry, covered the same disciplined way.
              </p>
            </div>
            <Link href="/sectors" className="section-link">
              View all {sectors.length} sectors →
            </Link>
          </div>
          <div className="sectors-grid">
            {sectors.slice(0, 12).map((s) => (
              <SectorCard key={s.slug} slug={s.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2>Featured Research</h2>
              <p>
                High-conviction ideas across India&apos;s best businesses.
              </p>
            </div>
            <Link href="/research" className="section-link">
              Browse all research →
            </Link>
          </div>
          <div className="companies-grid">
            {featured.map((c) => (
              <CompanyCard key={c.slug} company={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft-section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2>Recently Updated Reports</h2>
              <p>Newly refreshed research across sectors — newest first.</p>
            </div>
            <Link href="/latest-research" className="section-link">
              View latest →
            </Link>
          </div>
          <LatestList />
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <span className="eyebrow">Institutional quality, no noise</span>
          <h2>Independent research, built for long-term investors.</h2>
          <p>
            Every report is the same 25-section structure: business,
            financials, valuation, risks, and a single decisive rating. Read
            one, you know how to read them all.
          </p>
          <div className="cta-actions">
            <Link href="/research" className="btn btn-lg">
              Explore Research
            </Link>
            <Link href="/methodology" className="btn btn-lg btn-outline-light">
              See the Methodology
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
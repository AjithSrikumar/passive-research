import type { Metadata } from "next";
import Link from "next/link";
import SearchCompanies from "@/components/SearchCompanies";
import SectorCard from "@/components/SectorCard";
import CompanyCard from "@/components/CompanyCard";
import { sectors } from "@/lib/sectors";
import { companies } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Professional Equity Research for Indian Stocks",
  description:
    "Passive delivers institutional-grade equity research on 100+ Indian listed companies across 23 sectors — Screener-grade financials, DCF valuations, and decisive ratings.",
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

export default function HomePage() {
  const featured = companies.filter((c) => FEATURED.includes(c.slug));

  return (
    <main>
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden />
        <div className="hero-inner">
          <span className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            117 Indian Companies · 23 Sectors · Independently Rated
          </span>
          <h1>
            Equity research built to be <span className="accent">decisive</span>.
          </h1>
          <p className="hero-sub">
            Passive is an institutional-grade research platform for Indian
            listed companies. Screener-grade financials, honest DCF valuations,
            and one clear rating per name — no noise.
          </p>
          <div className="hero-search">
            <SearchCompanies />
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
              <span>Transparent Methodology</span>
            </div>
          </div>
        </div>
        <div className="hero-waves" aria-hidden>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
            <path
              d="M0,50 C240,90 480,10 720,40 C960,70 1200,20 1440,50 L1440,90 L0,90 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

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
              <h2>Latest Research</h2>
              <p>Recently refreshed reports across sectors.</p>
            </div>
            <Link href="/latest-research" className="section-link">
              View latest →
            </Link>
          </div>
          <div className="companies-grid tight">
            {[...companies]
              .sort((a, b) => b.updatedDate.localeCompare(a.updatedDate))
              .slice(0, 6)
              .map((c) => (
                <CompanyCard key={c.slug} company={c} compact />
              ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Research that respects your time.</h2>
          <p>
            Every report is the same 25-section structure: business, financials,
            valuation, risks, and a clear rating. Read one, you know how to read
            them all.
          </p>
          <div>
            <Link href="/research" className="btn btn-lg">
              Explore Research
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
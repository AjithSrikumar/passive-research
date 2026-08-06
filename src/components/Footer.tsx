import Link from "next/link";
import { sectors } from "@/lib/sectors";
import { companies } from "@/lib/companies";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-mark">P</span>
            <span className="logo-block">
              <span className="logo-text">PASSIVE</span>
              <span className="logo-sub">Professional Equity Research</span>
            </span>
          </Link>
          <p>
            Independent, institutional-grade equity research on{" "}
            {companies.length} Indian listed companies. Screener-grade
            financials, DCF valuation, and clear ratings — engineered to be
            decisive.
          </p>
          <p className="footer-disclaimer">
            Research is for informational purposes and does not constitute
            investment advice or a solicitation. Always consult a SEBI-registered
            advisor before investing.
          </p>
        </div>

        <div className="footer-col">
          <h4>Research</h4>
          <Link href="/research">Browse Research</Link>
          <Link href="/latest-research">Latest Research</Link>
          <Link href="/coverage-universe">Coverage Universe</Link>
          <Link href="/sectors">Browse by Sectors</Link>
          <Link href="/methodology">Methodology</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/about">About Passive</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/legal">Legal & Disclaimer</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>

        <div className="footer-col footer-sectors">
          <h4>Top Sectors</h4>
          {sectors
            .slice(0, 6)
            .map((s) => (
              <Link key={s.slug} href={`/sectors/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          <Link href="/sectors" className="footer-all">
            View all {sectors.length} sectors →
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Passive Research. All rights reserved.</span>
        <span className="footer-dot">·</span>
        <span>Independent research for Indian markets</span>
      </div>
    </footer>
  );
}
import Link from "next/link";
import { sectors } from "@/lib/sectors";
import { companies } from "@/lib/companies";

const SOCIALS = [
  {
    name: "X (Twitter)",
    href: "https://x.com",
    path: "M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2zm-1.1 18h1.7L6.6 3.9H4.8L17.8 20z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.1h4.56V23H.22V8.1zM8.34 8.1h4.37v2.04h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.23h-4.55v-7.3c0-1.74-.03-3.98-2.43-3.98-2.43 0-2.8 1.9-2.8 3.85V23H8.34V8.1z",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    path: "M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z",
  },
];

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

          <div className="footer-newsletter">
            <h5>Weekly research digest</h5>
            <p>New ratings and refreshed reports, straight to your inbox.</p>
            <form action="/contact" method="get">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                aria-label="Email address"
                required
              />
              <button type="submit" className="btn btn-sm">
                Subscribe
              </button>
            </form>
          </div>

          <div className="footer-social">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>

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
        <span>
          © {new Date().getFullYear()} Passive Research. All rights reserved.
        </span>
        <span className="fb-legal">
          <Link href="/legal">Legal & Disclaimer</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </span>
      </div>
    </footer>
  );
}
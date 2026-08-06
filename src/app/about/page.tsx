import type { Metadata } from "next";
import { companies } from "@/lib/companies";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "About Passive",
  description:
    "Passive is an independent equity research platform covering 100+ Indian listed companies with institutional-grade analysis, transparent methodology, and clear ratings.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">About Passive</span>
          <h1>Research, stripped of noise.</h1>
          <p>
            We are a team of analysts who believe Indian investors deserve the
            same quality of research as institutional desks — presented in a
            format anyone can act on.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner prose">
          <p>
            <strong>Passive</strong> is an independent equity research platform
            built for India&apos;s listed markets. We cover{" "}
            <strong>{companies.length} companies across {sectors.length} sectors</strong>,
            from banking to infrastructure, and we cover every name the same
            way: the same 25-section report structure, the same financial
            framework, the same valuation discipline.
          </p>
          <p>
            Most retail research is either too shallow to act on or too dense
            to read. Our founding bet is that there&apos;s a middle path —
            institutional-grade rigour with consumer-grade clarity. Every
            report starts with an Executive Summary, works through business
            quality and financials, builds a DCF and peer valuation, and ends
            with one clear, colour-coded rating.
          </p>
          <h2>Why &ldquo;Passive&rdquo;?</h2>
          <p>
            Great investing is mostly passive in the best sense: patient,
            disciplined, and unbothered by daily noise. Our reports are
            designed to give you the conviction to act and then the calm to
            hold. We are not a trading desk and we do not publish calls for
            the sake of volume — we publish research that we would act on
            ourselves.
          </p>
          <h2>What we cover</h2>
          <ul>
            <li>
              <strong>{companies.length}+ listed companies</strong> across{" "}
              {sectors.length} sectors with Screener-style financial data.
            </li>
            <li>
              <strong>Full research reports</strong> — 25 standard sections
              including investment thesis, competitive positioning, financial
              analysis, DCF valuation, risks, and ESG.
            </li>
            <li>
              <strong>Clear ratings</strong> — Strong Buy, Buy, Accumulate,
              Hold, Reduce, or Sell — with target prices and implied upside.
            </li>
            <li>
              <strong>Peer comparisons</strong> — sector benchmarks so one
              company is always seen in context.
            </li>
          </ul>
          <h2>How we are different</h2>
          <ul>
            <li>
              <strong>Standardised structure:</strong> read one report, you can
              navigate them all. No analyst vanity projects.
            </li>
            <li>
              <strong>Transparent methodology:</strong> our valuation
              assumptions are stated, not hidden (see{" "}
              <a href="/methodology" style={{ color: "var(--accent)", fontWeight: 600 }}>
                Methodology
              </a>
              ).
            </li>
            <li>
              <strong>Independent ratings:</strong> no investment banking
              relationships, no corporate mandates, no paid coverage.
            </li>
            <li>
              <strong>Decisive output:</strong> every report ends with a
              rating and a target — because research should help you decide.
            </li>
          </ul>
          <h2>Our research principles</h2>
          <ul>
            <li>
              <strong>Quality over volume:</strong> we would rather cover 100
              companies deeply than 1,000 shallowly.
            </li>
            <li>
              <strong>Consistency:</strong> metrics are defined the same way
              across every report so comparisons are honest.
            </li>
            <li>
              <strong>Honesty:</strong> when a stock is a Hold or a Sell, we
              say so — regardless of popularity.
            </li>
            <li>
              <strong>Respect for the reader:</strong> clear writing, real
              numbers, and a layout built for reading, not scrolling.
            </li>
          </ul>
          <p>
            Passive is a research publication, not a brokerage and not an
            advisory. We don&apos;t manage money, we don&apos;t sell
            recommendations, and we take no commissions from the companies we
            cover. That independence is the foundation of everything we
            publish.
          </p>
        </div>
      </section>
    </main>
  );
}
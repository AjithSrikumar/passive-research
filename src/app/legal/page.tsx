import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Disclaimer",
  description:
    "Passive Research legal disclaimer — the terms governing our research reports, ratings, and all content published on this site.",
};

export default function LegalPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Fine Print, Readably</span>
          <h1>Legal & Disclaimer</h1>
          <p>
            What Passive is, what it isn&apos;t, and the terms under which our
            research is made available.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner prose">
          <p className="last-updated">Last updated: August 2026</p>

          <h2>1. Not investment advice</h2>
          <p>
            All content on this website, including research reports, ratings,
            target prices, financial data, and commentary, is provided{" "}
            <strong>for informational purposes only</strong> and does not
            constitute investment advice, an offer to buy or sell securities,
            a recommendation, or a solicitation under the Securities and
            Exchange Board of India (SEBI) regulations or any other
            jurisdiction. Nothing on this site is tailored to your personal
            financial circumstances.
          </p>

          <h2>2. No SEBI registration</h2>
          <p>
            Passive Research is an independent research publication and is{" "}
            <strong>not a SEBI-registered research analyst</strong> under the
            SEBI (Research Analysts) Regulations, 2014, nor a registered
            investment adviser. We do not manage portfolios, execute trades, or
            charge for recommendations. Please consult a SEBI-registered
            investment adviser before making any investment decision.
          </p>

          <h2>3. Accuracy of information</h2>
          <p>
            We make best efforts to ensure financial data is accurate as of
            each report&apos;s stated &ldquo;Last updated&rdquo; date, using
            company filings and exchange disclosures. We do not warrant that
            any figure is error-free, and figures may change between updates.
            Historical reconstructions and model-implied values are labelled
            where used.
          </p>

          <h2>4. Ratings and target prices</h2>
          <p>
            Ratings and target prices are point-in-time opinions based on our
            stated methodology (see <a href="/methodology">Methodology</a>).
            They are not guarantees of future performance and may be revised
            without notice. The market may move against a rating for reasons
            unrelated to fundamentals.
          </p>

          <h2>5. No conflict of interest</h2>
          <p>
            Passive does not hold, and has not held, any trading relationship,
            investment-banking mandate, or fee arrangement with any company
            covered on this site. Coverage decisions are editorial. No analyst
            may trade in a covered security within a restricted period around
            publication.
          </p>

          <h2>6. Liability limitation</h2>
          <p>
            To the maximum extent permitted by law, Passive Research, its
            authors, and its affiliates shall not be liable for any loss or
            damage, direct or indirect, arising from reliance on content
            published on this website. Investing in equity markets involves
            risk, including loss of principal.
          </p>

          <h2>7. Intellectual property</h2>
          <p>
            All reports, analysis, layout, branding, and data compilations on
            this site are the property of Passive Research and may not be
            reproduced, redistributed, or republished without prior written
            permission, except brief excerpts with attribution and a link to
            the source.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about this disclaimer can be sent to{" "}
            <a href="mailto:legal@passive-research.in" style={{ color: "var(--accent)", fontWeight: 600 }}>
              legal@passive-research.in
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms under which you may use the Passive Research website and its content.",
};

export default function TermsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Terms of Use</span>
          <h1>Terms of Use</h1>
          <p>
            The conditions that govern your access to and use of
            passive-research.in.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner prose">
          <p className="last-updated">Last updated: August 2026</p>

          <h2>1. Acceptance of terms</h2>
          <p>
            By accessing or using this website you agree to these Terms of Use
            and our <a href="/legal">Legal & Disclaimer</a>. If you do not
            agree, please do not use the site.
          </p>

          <h2>2. Use of the site</h2>
          <p>
            You may use the site for personal, non-commercial research. You
            agree not to scrape, republish, or resell content without written
            permission, or to use the site in any way that could damage,
            disable, or impair it.
          </p>

          <h2>3. Content and intellectual property</h2>
          <p>
            All content is provided &ldquo;as is&rdquo; without warranties of
            any kind. The site, its reports, and its brand are protected by
            applicable intellectual property laws.
          </p>

          <h2>4. Third-party links</h2>
          <p>
            The site may link to external websites. We are not responsible for
            the content or practices of those sites.
          </p>

          <h2>5. No guarantee of availability</h2>
          <p>
            We may update, suspend, or discontinue any part of the site at any
            time without notice.
          </p>

          <h2>6. Changes to these terms</h2>
          <p>
            We may revise these terms periodically. The current version always
            applies and will be dated at the top of this page.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these terms:{" "}
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
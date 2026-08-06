import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Passive Research collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Privacy Policy</span>
          <h1>Privacy Policy</h1>
          <p>
            We collect as little as possible, use it for as little as
            possible, and never sell it.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner prose">
          <p className="last-updated">Last updated: August 2026</p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Search queries</strong> — used solely to provide results;
              we do not store personally identifiable search history.
            </li>
            <li>
              <strong>Theme preference</strong> — stored locally in your
              browser (light/dark mode); never transmitted.
            </li>
            <li>
              <strong>Usage analytics</strong> — aggregated, anonymised page
              views to understand which research is most useful.
            </li>
            <li>
              <strong>Contact form messages</strong> — the email and details
              you voluntarily provide when emailing us.
            </li>
          </ul>

          <h2>2. What we do NOT collect</h2>
          <p>
            We do not require registration, do not track your investments, and
            do not build advertising profiles. We do not sell or rent any
            personal data to third parties.
          </p>

          <h2>3. Cookies</h2>
          <p>
            We use a minimal set of cookies for functional purposes (such as
            remembering your theme preference). No third-party advertising
            cookies are used.
          </p>

          <h2>4. Data security</h2>
          <p>
            Data is transmitted over HTTPS and stored on secure infrastructure.
            We retain analytics and correspondence only as long as needed.
          </p>

          <h2>5. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of any
            personal data we hold at{" "}
            <a href="mailto:privacy@passive-research.in" style={{ color: "var(--accent)", fontWeight: 600 }}>
              privacy@passive-research.in
            </a>
            .
          </p>

          <h2>6. Changes</h2>
          <p>
            Material changes to this policy will be announced on this page with
            a new effective date.
          </p>
        </div>
      </section>
    </main>
  );
}
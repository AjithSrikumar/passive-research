import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Passive",
  description:
    "Get in touch with the Passive Research team — for investor questions, media enquiries, coverage suggestions, or partnership opportunities.",
};

const CARDS = [
  {
    title: "Coverage & Research",
    desc: "Found an error in a report, or want us to cover a company? Our analysts reply within 48 hours.",
    detail: "coverage@passive-research.in",
  },
  {
    title: "Media & Partnerships",
    desc: "Reprints, data licensing, or analyst commentary for print, broadcast, and digital media.",
    detail: "press@passive-research.in",
  },
  {
    title: "Technical Support",
    desc: "A bug on the site, or trouble with search and navigation? Report it here.",
    detail: "help@passive-research.in",
  },
  {
    title: "General Enquiries",
    desc: "Anything else — feedback, academic use, or just to say hi. We read everything.",
    detail: "hello@passive-research.in",
  },
];

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Get in Touch</span>
          <h1>Contact Passive</h1>
          <p>
            The right address for your message is usually below. For
            coverage-related corrections, please include the company ticker.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner contact-grid">
          {CARDS.map((card) => (
            <div className="contact-card" key={card.detail}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <a href={`mailto:${card.detail}`}>{card.detail}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="cta-band-inner">
          <h2>Spot an error in a report?</h2>
          <p>
            Accuracy is our license to operate. If you see a number that looks
            wrong, tell us — and we&apos;ll correct and republish the report
            transparently.
          </p>
          <div>
            <a href="mailto:coverage@passive-research.in" className="btn btn-lg">
              Email the Research Desk
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
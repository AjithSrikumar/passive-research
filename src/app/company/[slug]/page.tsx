import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companies, formatCr, formatPrice, formatUpdated, getCompany } from "@/lib/companies";
import { sectorName } from "@/lib/sectors";
import { reportToc, readingTime, upsides } from "@/lib/report";
import CompanyLogo from "@/components/CompanyLogo";
import RatingBadge from "@/components/RatingBadge";
import ReportToc from "@/components/ReportToc";
import ReportContent from "@/components/ReportContent";
import ReportNote from "@/components/ReportNote";
import FactorScorecard from "@/components/FactorScorecard";
import { getNote, noteToc } from "@/lib/notes";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) return {};
  const title = `${c.name} (${c.ticker}) — ${c.recommendation} Rating, Target ${formatPrice(c.targetPrice)}`;
  return {
    title,
    description: `${c.legalName} equity research report by Passive: ${c.shortThesis} Rating: ${c.recommendation}. Target price ${formatPrice(c.targetPrice)} (${upsides(c)}). ROE ${c.roePct}%, EBITDA margin ${c.ebitdaMarginPct}%.`,
    keywords: [
      c.name,
      c.ticker,
      `${c.name} share price`,
      `${c.name} target price`,
      `${c.name} fundamental analysis`,
      "equity research India",
    ],
    openGraph: {
      type: "article",
      title,
      description: c.shortThesis,
      authors: [c.author],
      publishedTime: c.updatedDate + "T00:00:00Z",
      section: sectorName(c.sector),
    },
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCompany(slug);
  if (!c) notFound();
  const note = getNote(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ResearchArticle",
    headline: `${c.name} — ${c.recommendation}`,
    about: {
      "@type": "Organization",
      name: c.legalName,
      tickerSymbol: c.ticker,
    },
    author: {
      "@type": "Person",
      name: c.author,
      affiliation: { "@type": "Organization", name: "Passive Research" },
    },
    publisher: {
      "@type": "Organization",
      name: "Passive Research",
    },
    datePublished: c.updatedDate + "T00:00:00Z",
    description: c.shortThesis,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="report-hero">
        <div className="report-hero-inner">
          <div className="report-breadcrumbs">
            <Link href="/">Home</Link> →
            <Link href="/sectors">Sectors</Link> →
            <Link href={`/sectors/${c.sector}`}>{sectorName(c.sector)}</Link> →
            <span>{c.name}</span>
          </div>

          <div className="report-title-row">
            <CompanyLogo company={c} size={64} />
            <div style={{ flex: 1, minWidth: 240 }}>
              <h1>{c.name}</h1>
              <p style={{ color: "var(--text-45)", fontSize: 14.5 }}>
                {c.legalName} · NSE: {c.ticker} · {c.industry}
              </p>
            </div>
            <div className="ratings-stack">
              <RatingBadge rating={c.recommendation} size="lg" />
              <small>
                Target {formatPrice(c.targetPrice)} · {upsides(c)} ·{" "}
                {readingTime(c)}
              </small>
            </div>
          </div>

          <p style={{ fontSize: 15.5, color: "var(--text-65)", maxWidth: 760 }}>
            {c.shortThesis}
          </p>

          <div className="report-quick-stats">
            <div className="report-quick-stat">
              <b>{formatPrice(c.currentPrice)}</b>
              <span>Current Price</span>
            </div>
            <div className="report-quick-stat">
              <b>{formatPrice(c.targetPrice)}</b>
              <span>Target Price</span>
            </div>
            <div
              className="report-quick-stat"
            >
              <b className={c.upsidePct >= 0 ? "positive" : "negative"}>
                {upsides(c)}
              </b>
              <span>Implied Upside</span>
            </div>
            <div className="report-quick-stat">
              <b>{formatCr(c.marketCapCr)}</b>
              <span>Market Cap</span>
            </div>
            <div className="report-quick-stat">
              <b>{c.pe ? `${c.pe}x` : "—"}</b>
              <span>P/E Ratio</span>
            </div>
            <div className="report-quick-stat">
              <b>{c.roePct}%</b>
              <span>ROE</span>
            </div>
          </div>

          {!note && (
            <div className="report-byline">
              <span className="avatar">{c.author.charAt(0)}</span>
              <div>
                <b>{c.author}</b>
                <span>
                  Research Analyst · Passive Research · Last updated{" "}
                  {formatUpdated(c.updatedDate)} · {sectorName(c.sector)}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="report-layout">
        {note ? (
          <>
            <ReportToc items={noteToc(note)} />
            <ReportNote note={note} />
          </>
        ) : (
          <>
            <ReportToc items={reportToc} />
            <ReportContent company={c} />
          </>
        )}
      </div>

      <FactorScorecard slug={slug} />
    </main>
  );
}
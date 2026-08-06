import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSector, sectors } from "@/lib/sectors";
import {
  getCompaniesBySector,
  latestSectorUpdate,
  formatUpdated,
  sortByRating,
  formatCr,
} from "@/lib/companies";
import CompanyCard from "@/components/CompanyCard";
import SectorIcon from "@/components/SectorIcon";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};
  return {
    title: sector.name,
    description: `${sector.description} — ${getCompaniesBySector(slug).length} companies covered by Passive research.`,
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const list = sortByRating(getCompaniesBySector(slug));
  const updated = latestSectorUpdate(slug);
  const totalMcap = list.reduce((a, c) => a + c.marketCapCr, 0);

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Sector Research</span>
          <h1>{sector.name}</h1>
          <p>{sector.description}</p>
          <div className="hero-meta">
            <span>
              {list.length} companies covered
            </span>
            <span>Updated {formatUpdated(updated)}</span>
            <span>Combined Mkt Cap {formatCr(totalMcap)}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <h2>Research Reports</h2>
              <p>
                Ranked by rating — Strong Buy first — then by market cap.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "var(--text-65)",
                fontSize: 14,
              }}
            >
              <SectorIcon name={sector.icon} size={20} />
              {sector.name}
            </div>
          </div>

          <div className="companies-grid">
            {list.map((c) => (
              <CompanyCard key={c.slug} company={c} />
            ))}
          </div>

          {list.length === 0 && (
            <div
              style={{
                border: "1px dashed var(--border-2)",
                borderRadius: 14,
                padding: 40,
                textAlign: "center",
                color: "var(--text-65)",
              }}
            >
              <p style={{ marginBottom: 16 }}>
                Reports for this sector are in production. Check back soon.
              </p>
              <Link href="/research" className="btn btn-outline">
                Browse other sectors
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
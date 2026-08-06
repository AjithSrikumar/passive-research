import type { Metadata } from "next";
import CompanyCard from "@/components/CompanyCard";
import SearchCompanies from "@/components/SearchCompanies";
import { companies } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Latest Research",
  description:
    "The most recently updated Passive research reports across all sectors — refreshed coverage sorted newest first.",
};

export default function LatestResearchPage() {
  const sorted = [...companies].sort((a, b) =>
    b.updatedDate.localeCompare(a.updatedDate)
  );

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Newest First</span>
          <h1>Latest Research</h1>
          <p>
            Every weekly refresh, in release order. Reports are re-rated as
            companies report, so check back often.
          </p>
          <div style={{ marginTop: 28 }}>
            <SearchCompanies size="md" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="companies-grid tight">
            {sorted.map((c) => (
              <CompanyCard key={c.slug} company={c} compact />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
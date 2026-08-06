import type { Metadata } from "next";
import { Suspense } from "react";
import ResearchBrowser from "@/components/ResearchBrowser";
import SearchCompanies from "@/components/SearchCompanies";
import { companies } from "@/lib/companies";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Browse full-length equity research reports on 100+ Indian listed companies — filter by sector, sort by rating or market cap.",
};

export default function ResearchPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Research Universe</span>
          <h1>All Research Reports</h1>
          <p>
            {companies.length} companies across {sectors.length} sectors. Every
            report follows the same 25-section structure — start with the
            Executive Summary, dig into valuation, and finish with the
            conclusion.
          </p>
          <div style={{ marginTop: 28 }}>
            <SearchCompanies size="md" />
          </div>
        </div>
      </section>

      <section className="section">
        <Suspense>
          <ResearchBrowser />
        </Suspense>
      </section>
    </main>
  );
}
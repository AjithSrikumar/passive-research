import type { Metadata } from "next";
import SectorCard from "@/components/SectorCard";
import { sectors } from "@/lib/sectors";
import { companies } from "@/lib/companies";

export const metadata: Metadata = {
  title: "Sectors",
  description:
    "Explore Passive's equity research by sector — 23 sectors covering India's listed equity market, from Banking to Infrastructure.",
};

export default function SectorsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">Sector Coverage</span>
          <h1>Browse by Sectors</h1>
          <p>
            {sectors.length} sectors. {companies.length} companies. One
            consistent research framework across every industry.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="sectors-grid">
            {sectors.map((s) => (
              <SectorCard key={s.slug} slug={s.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
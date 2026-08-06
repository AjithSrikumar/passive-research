import Link from "next/link";
import { getSector } from "@/lib/sectors";
import { latestSectorUpdate, sectorCompanyCount } from "@/lib/companies";
import SectorIcon from "./SectorIcon";
import { formatUpdated } from "@/lib/companies";

export default function SectorCard({ slug }: { slug: string }) {
  const sector = getSector(slug);
  if (!sector) return null;
  const count = sectorCompanyCount(slug);
  const updated = latestSectorUpdate(slug);

  return (
    <Link href={`/sectors/${slug}`} className="sector-card">
      <div className="sector-card-top">
        <span className="sector-icon-wrap">
          <SectorIcon name={sector.icon} size={24} />
        </span>
        <span className="sector-count">{count} Research Reports</span>
      </div>
      <h3>{sector.name}</h3>
      <p>{sector.description}</p>
      <span className="sector-card-foot">
        Updated {formatUpdated(updated)} <span className="arrow">→</span>
      </span>
    </Link>
  );
}
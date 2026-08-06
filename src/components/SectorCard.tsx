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
          <SectorIcon name={sector.icon} size={26} />
        </span>
        <span className="sector-count">{count} Companies</span>
      </div>
      <h3>{sector.name}</h3>
      <p>{sector.description}</p>
      <div className="sector-card-foot">
        <span>
          <b>{count}</b> Reports · Updated {formatUpdated(updated)}
        </span>
        <span className="arrow" aria-hidden>
          →
        </span>
      </div>
    </Link>
  );
}
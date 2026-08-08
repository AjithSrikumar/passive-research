import { FACTOR_BY_YEAR, FACTOR_YEARS } from "@/lib/factor/data";
import { BACKTEST_CONSTITUENTS } from "@/lib/factor/backtest";

const RIC = 0;
const SLUG = 2;
const RANK = 4;
const COMPOSITE = 5;
const GROWTH = 6;
const QUALITY = 7;
const VALUATION = 8;
const MOMENTUM = 9;

export interface CompanyFactorYear {
  fiscalYear: number;
  ric: string;
  rank: number;
  composite: number | null;
  growth: number | null;
  quality: number | null;
  valuation: number | null;
  momentum: number | null;
  /** realized 1-year return if the company was in that year's Top-20, else null */
  returnPct: number | null;
}

/**
 * Factor history for a covered company (by site slug), from the static
 * snapshot. Returns null when the company is not in the factor universe
 * (e.g. SKF India — not part of the NSE-900 workbook).
 */
export function getCompanyFactorHistory(
  slug: string
): CompanyFactorYear[] | null {
  const out: CompanyFactorYear[] = [];
  let ric: string | null = null;

  for (const fy of FACTOR_YEARS) {
    const rows = FACTOR_BY_YEAR[fy] ?? [];
    let hit: typeof rows[number] | undefined;
    if (ric) {
      hit = rows.find((r) => r[RIC] === ric);
    } else {
      hit = rows.find((r) => r[SLUG] === slug);
      if (hit) ric = hit[RIC];
    }
    if (!hit) continue;
    const top20Row = BACKTEST_CONSTITUENTS.find(
      (c) => c[0] === fy && c[2] === hit![RIC]
    );
    out.push({
      fiscalYear: fy,
      ric: hit[RIC],
      rank: hit[RANK],
      composite: hit[COMPOSITE],
      growth: hit[GROWTH],
      quality: hit[QUALITY],
      valuation: hit[VALUATION],
      momentum: hit[MOMENTUM],
      returnPct: top20Row ? top20Row[3] : null,
    });
  }

  return out.length === 0 ? null : out;
}

/** Latest fiscal year in the snapshot (FY26 = live) */
export function latestFiscalYear(): number {
  return FACTOR_YEARS[FACTOR_YEARS.length - 1];
}

/** Number of companies ranked in a fiscal year */
export function rankedCount(fiscalYear: number): number {
  return (FACTOR_BY_YEAR[fiscalYear] ?? []).length;
}

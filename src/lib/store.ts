import "server-only";
import type { Company } from "./companies";
import type { Sector } from "./sectors";
import { companies as staticCompanies } from "./companies";
import { sectors as staticSectors } from "./sectors";
import { queryText, isDbConfigured } from "./db";

/**
 * Hybrid data store — try Postgres first, fall back to the bundled static
 * modules when the database is unreachable or unconfigured. Server-only.
 * Results are memoized per process so SSG builds stay fast.
 */

interface CompanyRow {
  slug: string;
  name: string;
  legal_name: string;
  ticker: string;
  sector: string;
  industry: string;
  logo_color: string;
  recommendation: Company["recommendation"];
  current_price: string;
  target_price: string;
  upside_pct: string;
  market_cap_cr: string;
  revenue_cr: string;
  net_profit_cr: string;
  revenue_growth_pct: string;
  ebitda_margin_pct: string;
  roe_pct: string;
  roce_pct: string;
  fcf_cr: string;
  pe: string | null;
  dividend_yield_pct: string;
  debt_equity: string;
  short_thesis: string;
  updated_date: Date;
  author: string;
}

interface SectorRow {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

interface SectionRow {
  section_key: string;
  label: string;
  content: Record<string, unknown>;
}

function toCompany(r: CompanyRow): Company {
  return {
    slug: r.slug,
    name: r.name,
    legalName: r.legal_name,
    ticker: r.ticker,
    sector: r.sector,
    industry: r.industry,
    logoColor: r.logo_color,
    recommendation: r.recommendation,
    currentPrice: Number(r.current_price),
    targetPrice: Number(r.target_price),
    upsidePct: Number(r.upside_pct),
    marketCapCr: Number(r.market_cap_cr),
    revenueCr: Number(r.revenue_cr),
    netProfitCr: Number(r.net_profit_cr),
    revenueGrowthPct: Number(r.revenue_growth_pct),
    ebitdaMarginPct: Number(r.ebitda_margin_pct),
    roePct: Number(r.roe_pct),
    rocePct: Number(r.roce_pct),
    fcfCr: Number(r.fcf_cr),
    pe: r.pe === null ? null : Number(r.pe),
    dividendYieldPct: Number(r.dividend_yield_pct),
    debtEquity: Number(r.debt_equity),
    shortThesis: r.short_thesis,
    updatedDate: r.updated_date.toISOString().slice(0, 10),
    author: r.author,
  };
}

const cache: {
  companies: Company[] | null;
  sectors: Sector[] | null;
} = { companies: null, sectors: null };

export async function getAllCompanies(): Promise<Company[]> {
  if (cache.companies) return cache.companies;
  if (!isDbConfigured()) {
    cache.companies = staticCompanies;
    return cache.companies;
  }
  try {
    const res = await queryText<CompanyRow>(
      `SELECT * FROM companies ORDER BY name ASC`
    );
    cache.companies = res.rows.map(toCompany);
  } catch {
    cache.companies = staticCompanies;
  }
  return cache.companies;
}

export async function getAllSectors(): Promise<Sector[]> {
  if (cache.sectors) return cache.sectors;
  if (!isDbConfigured()) {
    cache.sectors = staticSectors;
    return cache.sectors;
  }
  try {
    const res = await queryText<SectorRow>(
      `SELECT slug, name, description, icon FROM sectors ORDER BY name ASC`
    );
    cache.sectors = res.rows;
  } catch {
    cache.sectors = staticSectors;
  }
  return cache.sectors;
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const list = await getAllCompanies();
  return list.find((c) => c.slug === slug) ?? null;
}

export async function getReportSections(
  companySlug: string
): Promise<SectionRow[] | null> {
  if (!isDbConfigured()) return null;
  try {
    const res = await queryText<SectionRow>(
      `SELECT section_key, label, content
       FROM report_sections
       WHERE company_slug = $1
       ORDER BY sort_order ASC`,
      [companySlug]
    );
    return res.rows.length > 0 ? res.rows : null;
  } catch {
    return null;
  }
}

export interface DbStatus {
  configured: boolean;
  reachable: boolean;
  companies: number;
  sectors: number;
  reportSections: number;
}

export async function getDbStatus(): Promise<DbStatus> {
  const configured = isDbConfigured();
  let reachable = false;
  let companies = 0;
  let sectors = 0;
  let reportSections = 0;
  if (configured) {
    try {
      const res = await queryText<{ n: string }>(
        `SELECT
           (SELECT count(*) FROM companies) AS n`
      );
      companies = Number(res.rows[0]?.n ?? 0);
      const s = await queryText<{ n: string }>(
        `SELECT (SELECT count(*) FROM sectors) AS n`
      );
      sectors = Number(s.rows[0]?.n ?? 0);
      const rs = await queryText<{ n: string }>(
        `SELECT (SELECT count(*) FROM report_sections) AS n`
      );
      reportSections = Number(rs.rows[0]?.n ?? 0);
      reachable = true;
    } catch {
      reachable = false;
    }
  }
  return { configured, reachable, companies, sectors, reportSections };
}
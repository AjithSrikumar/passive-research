import { companies as companyRows } from "../../src/lib/companies";

const NORMALIZE_RE = /\b(ltd|limited|private|pvt|plc|inc|corporation|corp|co|the|&|and)\b|[,.\-']/g;

function normalize(name: string): string {
  return name
    .toLowerCase()
    .replace(NORMALIZE_RE, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface RicSlugMap {
  bySlug: Map<string, string>;
  byRic: Map<string, string>;
  matches: number;
}

/**
 * Manual overrides for names the Coverage_Map spells differently or lacks.
 * Every RIC in this map was verified against the workbook Companies sheet
 * (2026-08-08). Only add verified entries.
 */
const MANUAL_RIC: Record<string, string> = {
  "icici-lombard": "ICIL.NS",
  "star-health": "STAU.NS",
  "ongc": "ONGC.NS",
  "bpcl": "BPCL.NS",
  "kpr-mill": "KPRM.NS",
  "adani-ports": "APSE.NS",
  "indian-oil-corporation": "IOC.NS",
  "petronet-lng": "PLNG.NS",
  "indus-towers": "INUS.NS",
  "vodafone-idea": "VODA.NS",
  "bharti-hexacom": "BHAX.NS",
  "jindal-steel-power": "JNSP.NS",
  "steel-authority-of-india": "SAIL.NS",
  "coal-india": "COAL.NS",
  "nmdc": "NMDC.NS",
  "hindustan-zinc": "HZNC.NS",
  "kec-international": "KECL.NS",
  "crompton-greaves": "CROP.NS",
};

export function buildRicSlugMap(coverageNames: { name: string; ric: string }[]): RicSlugMap {
  const byRic = new Map<string, string>();
  const bySlug = new Map<string, string>();

  const coverageByNorm = new Map<string, { name: string; ric: string }[]>();
  for (const c of coverageNames) {
    const n = normalize(c.name);
    const list = coverageByNorm.get(n) ?? [];
    list.push(c);
    coverageByNorm.set(n, list);
  }

  for (const site of companyRows) {
    if (MANUAL_RIC[site.slug]) {
      byRic.set(MANUAL_RIC[site.slug], site.slug);
      bySlug.set(site.slug, MANUAL_RIC[site.slug]);
      continue;
    }
    const siteNorm = normalize(site.name);
    const hits = coverageByNorm.get(siteNorm);
    if (hits && hits.length === 1) {
      byRic.set(hits[0].ric, site.slug);
      bySlug.set(site.slug, hits[0].ric);
      continue;
    }
    if (hits && hits.length > 1) {
      const exact = hits.find((h) => h.ric.endsWith(".NS") && !h.ric.includes("^"));
      if (exact) {
        byRic.set(exact.ric, site.slug);
        bySlug.set(site.slug, exact.ric);
      }
      continue;
    }
    let best: { ric: string; score: number } | null = null;
    for (const [norm, list] of coverageByNorm) {
      const score = overlapScore(siteNorm, norm);
      if (score > 0 && (!best || score > best.score)) best = { ric: list[0].ric, score };
    }
    if (best && best.score >= 0.66) {
      byRic.set(best.ric, site.slug);
      bySlug.set(site.slug, best.ric);
    }
  }

  return { bySlug, byRic, matches: bySlug.size };
}

function overlapScore(a: string, b: string): number {
  const as = new Set(a.split(" "));
  const bs = new Set(b.split(" "));
  const inter = [...as].filter((w) => bs.has(w)).length;
  return (2 * inter) / (as.size + bs.size);
}

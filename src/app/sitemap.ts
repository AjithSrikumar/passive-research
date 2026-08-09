import type { MetadataRoute } from "next";
import { companies } from "@/lib/companies";
import { sectors } from "@/lib/sectors";
import { FACTOR_COMPANIES } from "@/lib/factor/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://passive-research.in";

  const staticPages = [
    "",
    "/research",
    "/sectors",
    "/latest-research",
    "/about",
    "/methodology",
    "/coverage-universe",
    "/screener",
    "/backtest",
    "/contact",
    "/legal",
    "/terms",
    "/privacy",
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  const sectorPages = sectors.map((s) => ({
    url: `${base}/sectors/${s.slug}`,
    lastModified: new Date(),
  }));

  const coveredSlugs = new Set(companies.map((c) => c.slug));

  const companyPages = companies.map((c) => ({
    url: `${base}/company/${c.slug}`,
    lastModified: new Date(c.updatedDate + "T00:00:00Z"),
  }));

  const factorPages = FACTOR_COMPANIES.filter(([, , , slug]) => !coveredSlugs.has(slug)).map(
    ([, , , slug]) => ({ url: `${base}/company/${slug}`, lastModified: new Date() })
  );

  return [...staticPages, ...sectorPages, ...companyPages, ...factorPages];
}
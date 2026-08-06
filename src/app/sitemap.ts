import type { MetadataRoute } from "next";
import { companies } from "@/lib/companies";
import { sectors } from "@/lib/sectors";

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
    "/contact",
    "/legal",
    "/terms",
    "/privacy",
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));

  const sectorPages = sectors.map((s) => ({
    url: `${base}/sectors/${s.slug}`,
    lastModified: new Date(),
  }));

  const companyPages = companies.map((c) => ({
    url: `${base}/company/${c.slug}`,
    lastModified: new Date(c.updatedDate + "T00:00:00Z"),
  }));

  return [...staticPages, ...sectorPages, ...companyPages];
}
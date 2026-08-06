# API.md — Public Surface & Route Table

> **There is no backend API.** The externally visible surface is the set of
> pre-rendered routes, `sitemap.xml`, `robots.txt`, and JSON-LD structured
> data. This file is the contract for that surface and the plan for a future
> API.

## 1. Routes

All routes respond `GET` with `text/html` (pre-rendered). Base URL:
`https://passive-research.in`.

### Content pages (static)

| Route | Content | Notes |
|---|---|---|
| `/` | Home | Hero, search, sector grid, recent reports |
| `/research` | Research browser | Client filter/sort; reads `?sector=` & `?q=` |
| `/sectors` | Sector index | 23 sector cards |
| `/sectors/[slug]` | Sector detail | Companies in sector; unknown → 404 |
| `/company/[slug]` | Company report | 25-section report + JSON-LD; unknown → 404 |
| `/latest-research` | Recently updated | Sorted by `updatedDate` |
| `/coverage-universe` | All companies | Alphabetical |
| `/methodology` | Methodology | Framework/evidence/valuation/rating docs |
| `/about`, `/contact`, `/legal`, `/terms`, `/privacy` | Company pages | Static prose |
| `/_not-found` | 404 | Custom; any unknown path |

### Generated files

| Route | Method | Content |
|---|---|---|
| `/sitemap.xml` | GET | XML sitemap: 11 static pages (lastmod = build date), 23 sector pages, 117 company pages (lastmod = `updatedDate`) |
| `/robots.txt` | GET | `User-agent: *` / `Allow: /` + sitemap pointer |

## 2. Structured Data (JSON-LD)

`/company/[slug]` embeds a `<script type="application/ld+json">` block:

```json
{
  "@context": "https://schema.org",
  "@type": "ResearchArticle",
  "headline": "HDFC Bank — Buy",
  "about": { "@type": "Organization", "name": "HDFC Bank Ltd", "tickerSymbol": "HDFCBANK" },
  "author": { "@type": "Person", "name": "<analyst>", "affiliation": { "@type": "Organization", "name": "Passive Research" } },
  "publisher": { "@type": "Organization", "name": "Passive Research" },
  "datePublished": "2026-08-06T00:00:00Z",
  "description": "<shortThesis>"
}
```

Generated from the internal dataset only — never from user input
(`docs/SECURITY.md`).

## 3. Query parameters

| Route | Param | Values | Effect |
|---|---|---|---|
| `/research` | `sector` | sector slug | Filters the list |
| `/research` | `q` | free text | Searches name/ticker/industry |

Deep links are stable; `ResearchBrowser` syncs its state to the URL.

## 4. Headers & caching

| Property | Value |
|---|---|
| Cache | Static assets & pages cacheable by CDN/host defaults |
| `robots.txt` | allow all |
| Security headers | Vercel defaults today; strict CSP is task M1 (`docs/SECURITY.md`) |

## 5. Error codes

No API error codes exist. Behavioral errors:

| Situation | Behavior |
|---|---|
| Unknown `/company/<slug>` | HTTP 404 + custom 404 page |
| Unknown `/sectors/<slug>` | 404 via `getSector()` guard |
| Any other unknown path | 404 (`_not-found`) |

## 6. Future public API (proposal, not built)

Task M6/ROADMAP: a read-only JSON API for the coverage universe, e.g.
`GET /api/companies`, `GET /api/companies/:slug` returning the `Company`
shape in `docs/DATABASE.md`, plus `GET /api/reports/:slug` returning report
sections. Would sit on the same `src/lib` layer (no page changes). ADR
required before implementation.
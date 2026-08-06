# API.md — Public Surface & Route Table

> The site is pre-rendered; **the content surface is HTML routes,**
> `sitemap.xml`, `robots.txt`, and JSON-LD structured data. Since v0.6.0 a
> small **read-only JSON API** (`/api/*`, see § 7) serves the same dataset
> from the Postgres mirror with a static fallback (`src/lib/store.ts`).
> This file is the contract for that surface.

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
| `/sitemap.xml` | GET | XML sitemap: 11 static pages (lastmod = build date), 23 sector pages, 133 company pages (lastmod = `updatedDate`) |
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

## 6. Future public API (proposal)

Enrichment/superset ideas beyond the current surface: `/api/reports/:slug`
returning rendered sections, sector-filtered lists, consensus comparison,
and watchlist/auth-gated endpoints (each requires an ADR before
implementation).

## 7. JSON API (live, v0.6.0+)

Read-only, `GET`, JSON responses. **Hybrid-backed** (`src/lib/store.ts`):
serves from Postgres when reachable, falls back to the bundled static
dataset otherwise — the endpoint shape never changes. No auth, no write
verbs, no query params today.

| Route | Response |
|---|---|
| `GET /api/health` | `{ ok, service: "db", configured, reachable, counts: { companies, sectors, reportSections }, timestamp }` — `ok` false when unconfigured/unreachable |
| `GET /api/companies` | `{ companies: Company[], sectors: Sector[], count, generatedAt }` |
| `GET /api/companies/[slug]` | `{ company: Company, sections: {section_key,label,content}[] \| null, generatedAt }`; `404 { error, slug }` on unknown slug |

Notes:

- `Company`/`Sector` are the typed shapes from `src/lib/companies.ts` /
  `src/lib/sectors.ts` (`Company` rows are mapped from snake_case DB
  columns, `pe: null` preserved).
- `sections` is `null` when the DB is unreachable (section payloads only
  live in the DB mirror).
- Route handlers live in `src/app/api/*/route.ts`, marked dynamic (they are
  never statically prerendered; data is queried per request with the pool
  memoization in `store.ts`).
- Error model: 404 only for unknown slugs; DB failure is never a 5xx —
  it degrades to the static dataset (health endpoint reports it).
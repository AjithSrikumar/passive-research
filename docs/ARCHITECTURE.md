# ARCHITECTURE.md

> **Status:** Current, mirrors the code as of 2026-08-07 (v0.7.0).
> This is the most important document in the repository. Update it the moment
> architecture changes.

## 1. Overview

**Passive** is a static-first, server-rendered equity research website. All
**pages** are derived at build time from TypeScript data modules and deployed
as pre-rendered HTML. Since v0.6.0 (ADR-011) there is also an **optional
Supabase Postgres mirror** of the same content, served through a hybrid
server-only store (`src/lib/store.ts`) and three read-only JSON API routes.
No auth, no persistence of user data, no write endpoints. Pages never depend
on the DB (a missing/unreachable `DATABASE_URL` changes nothing rendered).

```mermaid
flowchart LR
  A[src/lib/companies.ts<br/>133 companies] --> C[Report engine<br/>src/lib/report.ts]
  B[src/lib/sectors.ts<br/>23 sectors] --> C
  C --> D[SSG pages<br/>src/app/**]
  D --> E[Static HTML + JSON-LD<br/>172 pages]
  N[src/lib/notes/<br/>bespoke notes registry] --> P[ReportNote<br/>block renderer]
  P -.slug match.-> D
  A2[db/schema.sql<br/>Postgres mirror] --> F[src/lib/db.ts<br/>pg pool]
  F --> G[src/lib/store.ts<br/>hybrid loaders]
  G --> H[/api/health /api/companies<br/>/api/companies/[slug]/]
  G -.fallback.-> A
```

### Architecture layers

| Layer | Implementation |
|---|---|
| Frontend | React 19 server components; App Router; 6 client components |
| Backend | None on the page path (SSG at build time) |
| APIs | Read-only JSON: `/api/health`, `/api/companies`, `/api/companies/[slug]` (v0.6.0, ADR-011) |
| Database | Optional Supabase Postgres mirror (`db/schema.sql`, `npm run db:seed`); pages stay on static TS modules (`docs/DATABASE.md`) |
| Authentication / Authorization | Not applicable (public read-only site; API is GET-only) |
| Storage | No user storage; theme preference in `localStorage`; DB mirror holds the dataset snapshot |
| Deployment | Next.js on any Node host; Vercel recommended (`docs/DEPLOYMENT.md`) |

## 2. Design Philosophy

1. **Decision-first content.** Reports are written to the institutional
   standard: rating/target on the first screen, evidence labelled
   (F/M/C/E/I/S/U), forecasts driver-based, valuation tested with reverse DCF,
   and risks expressed as monitorable registers. This is content design, not
   UI gimmickry.
2. **Single source of truth.** The 25-section framework lives once in
   `reportToc` (`src/lib/report.ts`). Methodology, table of contents, and the
   on-page sidebar all derive from it. Data fields are never re-derived with
   divergent constants.
3. **Static by default.** Every page is SSG; anything that must be interactive
   is a deliberately small client island (search, filters, theme, scrollspy).
4. **No new dependencies.** Runtime deps are `next`, `react`, `react-dom` —
   nothing else. Features are built with CSS + React only.
5. **Docs are code.** Every meaningful change updates `docs/` (see
   `OPENCODE.md` § Documentation Rules).

## 3. Folder Structure

```
src/
  app/                    # Routes (App Router, server components by default)
    layout.tsx            # Root layout: DM Sans, Nav, Footer, global metadata
    globals.css           # Entire design system — the only stylesheet
    page.tsx              # Home (hero, search, sector grid, recent reports)
    research/             # Research browser (client filter/sort)
    sectors/              # Sector index
    sectors/[slug]/       # Sector detail page (SSG via generateStaticParams)
    company/[slug]/       # Company report page (SSG; dynamicParams=false)
    latest-research/      # Recently updated reports
    coverage-universe/    # All companies, alphabetical
    about/ contact/ legal/ privacy/ terms/ methodology/
    not-found.tsx         # 404
    sitemap.ts            # sitemap.xml
    robots.ts             # robots.txt
  components/             # 15 reusable components (6 client, 9 server)
  lib/                    # Pure TypeScript logic + data (no React)
    companies.ts          # Company interface, 133 rows, helpers
    sectors.ts            # Sector interface, 23 rows, helpers
    report.ts             # reportToc + report math helpers
    notes/                # Bespoke research notes (ADR-012)
      types.ts            # ResearchNote typed block model
      index.ts            # slug -> note registry (getNote/hasNote/noteToc)
      # 33 bespoke note content files, one per company: trent.ts, hdfc-bank.ts,
      # reliance.ts, titan.ts, dmart.ts, bharti-airtel.ts (v0.7.0-v0.8.0) plus
      # tcs.ts, infosys.ts, hcl-technologies.ts, sbi.ts, icici-bank.ts,
      # hul.ts, itc.ts, bajaj-finance.ts, lnt.ts, maruti.ts, sun-pharma.ts,
      # tata-motors.ts, mahindra.ts, kotak.ts, axis.ts, coal-india.ts,
      # bajaj-auto.ts, siemens.ts, nestle.ts, bel.ts, adani-power.ts,
      # jsw-steel.ts, ntpc.ts, ongc.ts, power-grid.ts, adani-ports.ts,
      # bajaj-finserv.ts (v0.9.0)
```

## 4. Data Flow

### Build-time (generation)

```mermaid
flowchart TB
  ROWS[companies.ts ROWS tuples] --> MAP[companies.map() -> Company[]]
  SECTORS[sectors.ts] --> LIBS[lib helpers]
  MAP --> SSG[generateStaticParams<br/>133 slugs]
  MAP --> REPORT[report.ts<br/>financialHistory/forecasts/scenarios/pricedIn]
  SSG --> PAGE[company/[slug]/page.tsx]
  REPORT --> PAGE
  LIBS --> PAGE
  PAGE --> HTML[Static HTML + ResearchArticle JSON-LD]
  HTML --> SITEMAP[sitemap.ts]
```

### Runtime

- The browser fetches static HTML + RSC payload. All data is already embedded.
- Client components hydrate for interactivity only:
  - `Nav` (mobile menu, scroll state)
  - `ThemeToggle` (dark mode)
  - `SearchCompanies` (live dropdown over the 133-company index)
  - `ResearchBrowser` (filter/sort of report list; reads `useSearchParams`)
  - `ReportToc` (IntersectionObserver scrollspy over `[data-report-section]`)
  - `FactorScreener` (year/search/composite/block filters, sort, CSV export
    over the static factor snapshot)
  - `FactorScorecard` (server) — per-company factor history from
    `src/lib/factor/company.ts` on every `/company/[slug]` page
  - `FactorBacktestRunner` (client) — weight sliders, per-metric toggles,
    MinN/Top-N, Run → `POST /api/factor/backtest`; year dropdown over
    portfolio years

### Factor model layer (v2.0 GQVM)

The GQVM factor model (growth/quality/valuation/momentum over the NSE-900
universe, **FY13–FY26 scored**, FY26 live) is imported from the source
workbook (`GQVM Factor Dashboard.xlsx`) by `scripts/factor-model/*` into
the Postgres mirror (`db/factor_model.sql`, `npm run factor:import`), then
reduced to **build-time static snapshots** (`src/lib/factor/data.ts`,
`src/lib/factor/backtest.ts`, regenerated via
`npm run factor:snapshot`). Pages read only the snapshots — consistent
with the rule that pages never depend on the DB:

```mermaid
flowchart LR
  X[GQVM Factor Dashboard.xlsx] --> I[scripts/factor-model<br/>import.ts + score.ts + optimize.ts]
  I --> DB2[factor_* tables<br/>db/factor_model.sql]
  DB2 --> S[snapshot.ts]
  S --> D2[src/lib/factor/data.ts<br/>6,150 rows FY13-FY26]
  D2 --> P2[/screener/ FactorScreener]
  DB2 --> S2[snapshot.ts backtest]
  S2 --> D3[src/lib/factor/backtest.ts<br/>13 years x 20 constituents]
  D3 --> P3[/backtest/ FactorBacktestRunner]
  P3 --POST params--> A[/api/factor/backtest/]
  DB2 --> A
  A --> P3
```

The backtest is **parametric**: `src/lib/factor/engine.ts` is the one
shared, pure implementation of the backtest math (block weights,
per-metric weights, MinN, MinFactors, Top-N, benchmark) used by (a) the
import seeding the DB tables, (b) the dynamic `POST /api/factor/backtest`
route (server-only, reads the mirror, benchmark from `factor_benchmark`),
and (c) the `/backtest` page. The page renders the static snapshot
instantly and can upgrade to live custom runs; the API returns 503 (and
the page falls back to the snapshot) when no `DATABASE_URL` is configured.
The default parameters are pinned to the dashboard's recommended GQVM
configuration (`src/lib/factor/params.ts`: weights 0.2/0.1/0.6/0.1, all 24
metrics, minN 2, minFactors 3, topN 20); `npm run factor:optimize`
(`scripts/factor-model/optimize.ts`) explores alternatives but reports
only, since import's validation gates require dashboard parity.

The import is **validated against the workbook's own cached outputs**
(composites, top-20 portfolios, annual returns, NAV/stats — full parity at
1e-9; see `docs/FACTOR_MODEL.md` §7), so the DB mirror and the dashboard
cannot drift. Model spec, scoring algorithm, backtest convention and
data-quality rules live in `docs/FACTOR_MODEL.md`; the DB schema in
`docs/DATA_MODEL.md`.

### Theme flow

`localStorage["passive-theme"]` holds `"dark" | "light"`. `ThemeToggle` flips
the `dark` class on `<html>`. The initial class is set by a small inline
script so there is no flash; the toggle intentionally drives the DOM directly
(class-driven) rather than via React state to satisfy the
`react-hooks/set-state-in-effect` lint rule (see `docs/DECISIONS.md` ADR-005).

## 5. State Management

- **Server**: none — pages are pure functions of `(slug) => data`.
- **Client**: local component state only (`useState`/`useEffect`). No global
  store, no context providers, no external state libraries.
- **URL as state**: `ResearchBrowser` reads the `sector` and `q` search
  params; deep links work.
- **Persistence**: theme preference only, in `localStorage`.

## 6. Rendering Strategy

| Route type | Strategy | Notes |
|---|---|---|
| `/company/[slug]` | **SSG** (`generateStaticParams`, `dynamicParams=false`) | 133 pages pre-rendered; unknown slug → 404 |
| `/sectors/[slug]` | **SSG** (`generateStaticParams`) | 23 pages |
| `/screener` | **Static** | Ranked factor table from `src/lib/factor/data.ts` |
| `/backtest` | **Static** | Top-20 backtest from `src/lib/factor/backtest.ts` |
| All other pages | **Static** | Prerendered at build |
| `sitemap.xml` / `robots.txt` | Generated routes | Built from `metadataBase` (`https://passive-research.in`) |

Full static export (`output: "export"`) is **not** enabled — hosting is a
Node-capable Next.js host (Vercel). A pure static export remains a future
option (`docs/ROADMAP.md`).

## 7. API Architecture

The content surface is pre-rendered HTML (+ sitemap/robots/JSON-LD), and
since v0.6.0 there is also a small read-only JSON API backed by the Postgres
mirror:

- **HTML pages** — see `docs/API.md` for the full route table.
- **`/sitemap.xml`** — all 172+ URLs with lastmod from data.
- **`/robots.txt`** — allow all, sitemap pointer.
- **JSON-LD** — `ResearchArticle` schema on every `/company/[slug]` page,
  injected via `dangerouslySetInnerHTML` with data built from the internal
  dataset.
- **`/api/*` (read-only JSON)** — `src/app/api/{health,companies,
  companies/[slug]}/route.ts`, dynamic handlers that hit the Postgres mirror
  through the hybrid store (`src/lib/store.ts` → `src/lib/db.ts`) and fall
  back to the bundled static modules when the DB is down. Pages are never
  wired to these routes (ADR-011).
  dataset only (no user input — safe by construction; `docs/SECURITY.md`).

## 8. Component Architecture

- **Server components (default)** render content: `CompanyCard`, `SectorCard`,
  `CompanyLogo`, `RatingBadge`, `SectorIcon`, `ReportContent`, `ReportNote`,
  `Footer`.
- **Client components** ("use client"): `Nav`, `ThemeToggle`,
  `SearchCompanies`, `ResearchBrowser`, `ReportToc`.
- Components are **presentational + data-accepting**: they receive `Company`
  / `Sector` objects (never fetch), and link through `next/link`.
- Full props/usage catalog: `docs/COMPONENTS.md`.

## 9. Service Architecture

"Services" are pure functions in `src/lib/`:

- `companies.ts` — dataset + lookups (`getCompany`, `getCompaniesBySector`,
  `getPeers`, `sortByRating`, `sectorCompanyCount`, `latestSectorUpdate`) and
  formatters (`formatCr`, `formatIndian`, `formatPrice`, `formatUpdated`).
- `sectors.ts` — dataset + lookups (`getSector`, `sectorName`).
- `report.ts` — report framework (`reportToc` = 25 sections) and math:
  `financialHistory`, `forecasts`, `growthCagr`, `upsides`, `ratingLanguage`,
  `readingTime`, `impliedPeOnTarget`, `scenarioCases`, `weightedTarget`,
  `pricedInAnalysis`, `totalReturnPct`, `impliedEps`, `round1`.
- `notes/` (ADR-012) — typed bespoke-note registry: `types.ts` (block model),
  `index.ts` (`getNote`/`hasNote`/`noteToc`) + 33 per-company content files.
  Pure data; rendered by `ReportNote`, never by the generic framework.

Contract notes:
- All money amounts are **₹ crore**; prices are **₹ per share**.
- All helpers are pure and total (return `undefined`/`null`/`"—"` rather than
  throwing) so SSG never fails on a data edge case.

## 10. Report Framework (content architecture)

Every company page renders 25 fixed sections (`reportToc`), which the
Methodology page and `ReportToc` sidebar share. Sections 01–25:

01 Executive Summary · 02 Investment Thesis · 03 Business Overview ·
04 Business Model · 05 Revenue Breakdown · 06 Geographic Mix ·
07 Segment Analysis · 08 Competitive Positioning · 09 Industry Overview ·
10 Market Size · 11 Growth Drivers · 12 Management Quality ·
13 Corporate Governance · 14 Financial Analysis · 15 Balance Sheet ·
16 Capital Allocation · 17 Historical Performance · 18 Forecasts ·
19 Valuation · 20 Target Price · 21 Risks · 22 Catalysts · 23 ESG ·
24 Conclusion · 25 Appendix

Institutional conventions implemented in `ReportContent` (per the *Institutional
Equity Research Manual*, `docs/DECISIONS.md` ADR-006):

- Evidence labels `[F] [M] [E] [I]` inline and `(E)` on estimate columns.
- Thesis map, moat scorecard, risk register, catalyst register (tables).
- Reverse-DCF "what is priced in" table, sensitivity grid, 25/50/25
  bull/base/bear scenario cards, probability-weighted target check.
- Source policy: screener.in primary (annual reports, credit ratings, concall
  transcripts/PPT), in.marketscreener.com for consensus.

### 10.1 Bespoke notes (ADR-012)

When a company deserves a treatment the generic framework cannot express, a
**bespoke note** is added to `src/lib/notes/` and registered by company slug.
If a note exists for the slug, `company/[slug]/page.tsx` renders `ReportNote`
(with the note's own TOC) instead of the generic `ReportContent`; the other
100 companies are untouched. **33 bespoke notes** exist: Trent (v0.7.0), HDFC
Bank, Reliance Industries, Titan, DMart (Avenue Supermarts) and Bharti Airtel
(v0.8.0), and the top-27-by-market-cap generic reports (TCS, Infosys, HCLTech,
SBI, ICICI Bank, HUL, ITC, Bajaj Finance, L&T, Maruti, Sun Pharma, Tata Motors,
M&M, Kotak, Axis, NTPC, ONGC, Power Grid, Adani Ports, Coal India, Bajaj
Finserv, Bajaj Auto, Siemens India, Nestlé, BEL, Adani Power, JSW Steel —
v0.9.0). Each follows an initiation-note structure: it
replaces *Corporate Governance* with *Shareholding pattern*, uses real fiscal
years (FY22–FY26 + Q1 FY27), omits the byline/evidence legend/AI wording,
sources each claim to downloadable primary documents, and
renders every table as responsive stacked cards on mobile (no horizontal
scroll). Bespoke notes intentionally waive ADR-006 evidence labels in favor
of inline citations, `(E)` marks, and a Sources & downloads section (the full
decision is in `docs/DECISIONS.md` ADR-012).

## 11. Error Handling

- Unknown company/sector slug → `notFound()` → custom 404 (`not-found.tsx`).
- Data edge cases (e.g., missing P/E) → `null` / `"—"` rendering, never NaN:
  `pricedInAnalysis` returns `null` when P/E is missing; guards exist around
  division by zero (`Math.max(1, …)`) in share/scale math.
- No network or server errors are possible at runtime (fully static).

## 12. Logging

None in production (static site). Build output is the diagnostic surface:
`next build` reports compilation, type-check, and per-page generation.
Development logs come from `next dev`.

## 13. Performance Strategy

- 100% static HTML; zero client data fetching. Logos are committed local
  assets in `public/logos/` (`next/image` unoptimized, initials-square
  fallback) — no runtime image requests to third parties.
- One stylesheet, no third-party CSS; DM Sans is self-hosted by
  `next/font` (no Google Fonts request at runtime).
- Client JS is limited to the 6 interactive components; everything else is RSC
  output.
- `scroll-padding-top` + smooth scroll for anchor navigation.
- Build-time goal: no network in the browser beyond the HTML/RSC payload.

## 14. Security Strategy

- Attack surface is near zero (static, read-only, no forms that persist, no
  auth). Full threat model in `docs/SECURITY.md`.
- `dangerouslySetInnerHTML` used in exactly one place — the JSON-LD script —
  with data sourced exclusively from the internal dataset.
- Content-Security-Policy, headers, and dependency policy are documented in
  `docs/SECURITY.md` (Vercel defaults currently; strict CSP is a roadmap item).

## 15. Scalability Considerations

- Adding companies = adding rows in `companies.ts`; build time grows linearly
  (~172 pages today, SSG in under 20s on a laptop).
- The pure-function data layer could be swapped for a real data source
  (API/DB) without touching page components — that is the intended upgrade
  path (`docs/ROADMAP.md`, `docs/DATABASE.md`).
- At thousands of companies, options: keep SSG (build time), switch to
  `output: "export"` + CDN, or move to ISR/on-demand rendering.

## 16. Future Architecture Plans

See `docs/ROADMAP.md`. Short version:

- Real-data enrichment pipeline (screener.in exports → typed JSON → same lib
  contract) — **no page changes required**.
- Charts (SVG) for history/bridges per the manual's chart standards.
- Strict CSP + security headers; `npm audit` gate in CI.
- Optional: public JSON API for the coverage universe; static export + CDN.

---

## Change Log for this file

| Date | Change |
|---|---|
| 2026-08-07 | Added bespoke notes layer (ADR-012): `src/lib/notes/` registry + `ReportNote` renderer; company page branches note-vs-generic; Trent renders the bespoke note |
| 2026-08-06 | Created; documents the static data-driven architecture (v0.3.0) |
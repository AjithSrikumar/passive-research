# COMPONENTS.md — UI Component Catalog

> 20 components in `src/components/`. 8 are client (`"use client"`); 12 are
> server components. All are presentational and data-accepting — none fetch
> data. Update this file whenever a component or its props change.

## Summary

| Component | Type | Purpose |
|---|---|---|
| `Nav` | client | Top navigation, mobile menu, scroll state, theme toggle slot |
| `Footer` | server | Site footer (newsletter form, socials, grouped legal) |
| `ThemeToggle` | client | Dark/light toggle (class-driven) |
| `SearchCompanies` | client | Live company search dropdown |
| `CompanyCard` | server | Company summary card |
| `CompanyLogo` | client | Real logo image with initials square fallback |
| `RatingBadge` | server | Rating pill |
| `SectorCard` | server | Sector summary card (counts, updated, explore) |
| `SectorIcon` | server | 23 inline SVG sector icons |
| `ResearchBrowser` | client | Filterable/sortable research list |
| `ReportToc` | client | Sidebar scrollspy TOC |
| `ReportContent` | server | 25-section report body (generic framework) |
| `ReportNote` | server | Bespoke research-note renderer (ADR-012) |
| `HeroPreview` | server | Home hero report-card illustration (desktop only) |
| `LatestList` | server | Home "Recently Updated" grouped timeline list |
| `FactorScreener` | client | NSE-900 screener (filters, sort, CSV export) |
| `FactorBacktestRunner` | client | Parametric backtest UI + live FY2026 portfolio |
| `FactorScorecard` | server | Per-company GQVM history (composite + 4 blocks + rank) |
| `TickerLogo` | client | NSE-symbol logo with deterministic initials fallback |
| `GqvmScoreStrip` | server | FY2026 G/Q/V/M + Total Score strip for researched pages |

---

## Client Components

### `Nav`
- **Purpose:** Global header: logo, nav links, mobile hamburger, theme toggle.
- **Props:** none.
- **Behavior:** mobile menu state, sticky with scroll-state styling
  (`window.scrollY > 12`).

### `ThemeToggle`
- **Purpose:** Toggles `.dark` on `<html>`; persists to `localStorage`
  (`passive-theme`).
- **Props:** none.
- **Design constraint:** class-driven on the DOM (not React state) to satisfy
  `react-hooks/set-state-in-effect` (ADR-005). Do not refactor to state.

### `SearchCompanies`
- **Props:** `{ size?: "lg" | "md" }` — `lg` for the home hero, `md` for nav.
- **Purpose:** Live dropdown filtering the 133-company index by name, ticker,
  industry. Links to `/company/[slug]`.

### `ResearchBrowser`
- **Props:** none (`useSearchParams`).
- **Purpose:** Renders all reports with sector filter + text filter; URL
  drives state (`?sector=`, `?q=`).

### `ReportToc`
- **Props:** `{ items: TocItem[] }` where `TocItem = { id: string; label: string }`.
- **Purpose:** Sticky sidebar listing the 25 sections; `IntersectionObserver`
  scrollspy over `[data-report-section]`; smooth-scrolls with an 88px offset.
- **Contract:** section `id`s must match `reportToc` ids.

---

## Server Components

### `CompanyCard`
- **Props:** `{ company: Company; compact?: boolean }`.
- **Renders:** logo (44px, 40px compact), name/ticker/industry,
  `RatingBadge`, `shortThesis` (3-line clamp), stat strip
  (current/target/upside/mcap/sector/updated — 3-col × 2-row grid,
  `tabular-nums`, bottom-anchored for equal card heights; upside
  emphasized `.stat-upside`). Links to report.

### `HeroPreview`
- **Props:** none.
- **Renders:** decorative desktop-only report card (Trent as sample):
  logo, rating badge, CSS bar chart, target/current/upside metrics,
  floating target callout + "View a sample report" link. `aria-hidden`.

### `LatestList`
- **Props:** none.
- **Renders:** 8 most-recently-updated companies as a grouped timeline list
  (Today / Yesterday groups), each row: logo (40px), name/ticker, industry +
  market cap, price + upside, rating badge, updated label.

### `CompanyLogo`
- **Type:** client (uses `onError` fallback).
- **Props:** `{ company: Company; size?: number }` (default 52).
- **Renders:** the company's real logo image (`/logos/<ticker>.png`,
  `next/image` + `unoptimized`, `object-fit: contain` on a white
  backdrop) inside the `.company-logo` square; if the image fails to
  load, swaps to the gradient-initials square (`logoColor` gradient).
  `aria-hidden`; `loading="lazy"`.
- **Asset contract:** logo files live in `public/logos/<NSE_TICKER>.png`
  (one per company, sourced from Dhan's stock-logo CDN, committed to
  the repo). Add the file whenever a new company row is added, or the
  fallback initials render instead.

### `RatingBadge`
- **Props:** `{ rating: Company["recommendation"]; size?: "sm" | "md" | "lg" }`.
- **Renders:** pill with class `rating-<slugified>` + `badge-<size>`.

### `SectorCard`
- **Props:** `{ slug: string }`.
- **Renders:** accent icon (26px, 52px wrap), "{count} Companies" pill,
  name, description, footer ("{count} Reports · Updated X" + explore
  arrow). Hover: lift + accent border + icon fill/scale.
- **Renders:** Sector name, description, `SectorIcon`, company count
  (`sectorCompanyCount`), latest update (`latestSectorUpdate`). Links to
  `/sectors/[slug]`.

### `SectorIcon`
- **Props:** `{ name: string; size?: number }` (default 22).
- **Renders:** 24×24 stroke SVG from the `icons` map; falls back to the
  `consumer` glyph for unknown names. `aria-hidden`.

### `ReportContent`
- **Props:** `{ company: Company }`.
- **Purpose:** The full 25-section report (Sections 01–25), institutional
  standard with evidence labels, thesis map, reverse-DCF, scenarios, and
  registers. Maintains `id` + `data-report-section` per section for
  `ReportToc`.
- **Note (render responsibility):** uses many `src/lib/report.ts` helpers —
  keep them as the single computation source; do not inline divergent math.

### `ReportNote`
- **Props:** `{ note: ResearchNote }`.
- **Purpose:** Renders a bespoke research note (ADR-012): an institution
  header KV strip followed by sections of typed blocks — `p`, `h3`,
  `callout` (info/key/warn), `kv`, `table`/`drivers` (responsive — tables
  become stacked labelled cards below 760px, no horizontal scroll), `cards`,
  `list`, `quote`, `risks` (probability-labelled cards), `downloads`
  (primary-source links), `small`. Sections carry `id` +
  `data-report-section` so `ReportToc` scrollspy works with note TOC items
  from `noteToc()`.
- **Wiring:** `src/app/company/[slug]/page.tsx` renders the note when
  `getNote(slug)` matches; the generic `ReportContent` path is untouched.
  The analyst byline is omitted on note pages.
- **Content model:** `src/lib/notes/types.ts`; registry `src/lib/notes/index.ts`.

### `Footer`
- **Props:** none.

---

## Factor Components

### `FactorScreener`
- **Type:** client.
- **Props:** none (static data from `src/lib/factor/data.ts`).
- **Purpose:** Ranked table of the NSE-900 universe for a selected fiscal
  year (default FY2026): year switcher, text search, sector + composite +
  block filters, sortable columns, CSV export. Every row: `TickerLogo` +
  name + NSE symbol + sector + composite/G/Q/V/M at 1 decimal, linking to
  `/company/<slug>`.

### `FactorBacktestRunner`
- **Type:** client.
- **Props:** none.
- **Purpose:** `/backtest` UI: static snapshot results for FY2013–FY2025
  (year dropdown, portfolio vs benchmark, IC, top-20 constituents with
  logos) plus the **live FY2026 portfolio** panel (current top-20, no
  realized return yet); custom parametric runs via `POST
  /api/factor/backtest` (G/Q/V/M weight sliders, per-metric chips,
  MinN/Top-N). Constituent + live tables show `TickerLogo` rows linking to
  the company pages.

### `FactorScorecard`
- **Type:** server.
- **Props:** `{ slug: string }`.
- **Purpose:** The covered company's factor history from
  `src/lib/factor/company.ts`: composite + G/Q/V/M + rank per fiscal year
  (FY2013–FY2026), with the Top-20 realized return where applicable.

### `TickerLogo`
- **Type:** client (image fallback).
- **Props:** `{ ticker: string; name: string; size?: number }`.
- **Purpose:** Company logo for factor-universe rows: renders
  `/logos/<TICKER>.png` (`next/image` + `unoptimized`); on load failure
  swaps to a deterministic initials square (initials from `name`, color
  hashed from a 10-color palette — stable across renders, no external
  requests). `aria-hidden`.

### `GqvmScoreStrip`
- **Type:** server.
- **Props:** `{ slug: string }`.
- **Purpose:** FY2026 score strip at the top of researched company pages:
  Growth/Quality/Valuation/Momentum tiles + a "Total Score" tile (all at 1
  decimal), with a caption "FY2026 GQVM scores · rank X of Y in the
  NSE-900 universe (screener)".

---

## Conventions & Best Practices

- **Data:** pass `Company`/`Sector` objects in; never call lookups inside a
  child that would duplicate a parent's work when props suffice.
- **Accessibility:** icon/decorative elements set `aria-hidden`; semantic
  `<nav>`, `<article>`, `<h1–h4>` used; focus handled by native links.
- **Routing:** use `next/link`; slugs via `formatSlug` conventions in data
  (`company.slug`).
- **Styling:** class names in kebab-case; pattern classes (`.report-section`,
  `.callout`, `.fin-table`, `.key-value-grid`, `.scenario-card`,
  `.evidence`) are documented in `docs/STYLING.md` — reuse, don't fork.
- **Formatting:** money via `formatCr`, prices via `formatPrice`, dates via
  `formatUpdated` (never inline manual formatting).
- **Known dependency graph:** `ReportContent` → `RatingBadge`, `Link`,
  `src/lib/report.ts`, `src/lib/companies.ts`, `src/lib/sectors.ts`.
- **Bespoke note convention (ADR-012):** `ReportNote` treats `**…**` in note
  text as bold (simple split — no MD parser, no `dangerouslySetInnerHTML`).
  New companies that need a bespoke treatment become a `src/lib/notes/*.ts`
  content module registered in `src/lib/notes/index.ts`; the generic
  framework is never modified for them.
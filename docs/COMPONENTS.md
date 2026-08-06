# COMPONENTS.md — UI Component Catalog

> 12 components in `src/components/`. 5 are client (`"use client"`); 7 are
> server components. All are presentational and data-accepting — none fetch
> data. Update this file whenever a component or its props change.

## Summary

| Component | Type | Purpose |
|---|---|---|
| `Nav` | client | Top navigation, mobile menu, scroll state, theme toggle slot |
| `Footer` | server | Site footer |
| `ThemeToggle` | client | Dark/light toggle (class-driven) |
| `SearchCompanies` | client | Live company search dropdown |
| `CompanyCard` | server | Company summary card |
| `CompanyLogo` | server | Initials logo (CSS gradient) |
| `RatingBadge` | server | Rating pill |
| `SectorCard` | server | Sector summary card |
| `SectorIcon` | server | 23 inline SVG sector icons |
| `ResearchBrowser` | client | Filterable/sortable research list |
| `ReportToc` | client | Sidebar scrollspy TOC |
| `ReportContent` | server | 25-section report body |

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
- **Purpose:** Live dropdown filtering the 117-company index by name, ticker,
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
- **Renders:** logo, name/ticker/industry, `RatingBadge`, `shortThesis`,
  stat strip (current/target/upside/mcap/sector/updated). Links to report.

### `CompanyLogo`
- **Props:** `{ company: Company; size?: number }` (default 52).
- **Renders:** initials square with `logoColor` gradient; `aria-hidden`.

### `RatingBadge`
- **Props:** `{ rating: Company["recommendation"]; size?: "sm" | "md" | "lg" }`.
- **Renders:** pill with class `rating-<slugified>` + `badge-<size>`.

### `SectorCard`
- **Props:** `{ slug: string }`.
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

### `Footer`
- **Props:** none.

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
# TASKS.md

> Maintain continuously. Move completed work into **Completed** with its
> completion date. Never lose historical information.

## Backlog

### High Priority

| # | Task | Description | Dependencies | Files affected | Complexity |
|---|---|---|---|---|---|
| H1 | **Real-data enrichment pipeline** | Replace synthetic (`(E)`) financial values in `report.ts` with sourced data. Design: screener.in exports → typed JSON → same `Company`-field contract, so page components are untouched. Must keep evidence labels honest. | None (design first) | `src/lib/*`, new `data/` dir, `docs/DATABASE.md`, `docs/DECISIONS.md` | High |
| H2 | **Chart library (SVG)** | History (FY-3→FY0) trend, revenue/EBITDA margin bridge, valuation bridge, and consistency with the manual's chart standards (§ XI). Pure CSS/SVG; no chart dep (ADR-001 rule). | — | new `src/components/charts/*`, `globals.css`, `ReportContent.tsx`, `docs/ARCHITECTURE.md`, `docs/COMPONENTS.md` | High |
| H3 | **Test runner + smoke automation** | Adopt Vitest for `src/lib` (report math, formatting, guards) and add a scripted smoke test (the current PowerShell checklist). | — | `package.json`, new `tests/`, `docs/TESTING.md`, `docs/DECISIONS.md` | Medium |

### Medium Priority

| # | Task | Description | Status | Dependencies | Files affected | Complexity |
|---|---|---|---|---|---|---|
| M1 | **Strict CSP + security headers** | Add a Content-Security-Policy and headers (Vercel config or middleware note); document default-source policy for the inline JSON-LD script. | — | — | `next.config.ts`, `vercel.json` or middleware, `docs/SECURITY.md` | Low |
| M2 | **`npm audit` CI gate** | Add `npm audit --audit-level=high` to the CI/release checklist. | — | — | `docs/DEPLOYMENT.md`, `docs/SECURITY.md` | Low |
| M3 | **Editorial pass on report language** | Sweep `ReportContent` and Methodology copy for tone/grammar consistency (Sprint-1 hardening). | — | — | `src/components/ReportContent.tsx`, `src/app/methodology/page.tsx` | Low |
| M4 | **Sector page hardening** | Set `dynamicParams = false` on `sectors/[slug]` for symmetry with company pages (unknown → 404). | — | — | `src/app/sectors/[slug]/page.tsx` | Low |
| M5 | **Component extraction** | Extract evidence-tag (`[E]`) spans and scenario cards into presentational components if usage grows. | — | — | `src/components/`, `docs/COMPONENTS.md` | Low |
| M6 | **Coverage search on index pages** | Add a search box to `coverage-universe` / `research` powered above `SearchCompanies`. | — | — | `src/app/coverage-universe/page.tsx`, components | Medium |

### Low Priority

| # | Task | Description |
|---|---|---|
| L1 | **LICENSE file + README license section** | Decide open/proprietary license and add `LICENSE`, to update the README note. |
| L2 | **Full static export** | Evaluate `output: "export"` + CDN hosting if serverless Node hosting isn't needed. |
| L3 | **OG social images** | Generate an OG image for company pages (currently defaults). |
| L4 | **i18n** | Not planned; note here so the decision is recorded when space changes. |
| L5 | **Analytics consent** | Add privacy-respecting analytics + update `/privacy`. |

---

## Completed

| Date | Task | Notes |
|---|---|---|
| 2026-08-07 | **Bespoke notes ×5 — HDFC Bank, Reliance, Titan, DMart, Bharti Airtel** (v0.8.0) | Extended ADR-012 bespoke-note layer from Trent to 5 more large-caps; same 21-section institutional structure on verified primary-source data: HDFC Bank (Q1 FY27 PAT ₹19,060 Cr, NIM 3.26/3.40%, GNPA 1.17%), Reliance (Q1 FY27 revenue ₹3.40 lakh Cr, Jio DRHP, net cash ₹2.46 lakh Cr), Titan (FY26 ex-bull income ₹76,078 Cr +33%, PAT ₹5,073 Cr +52%, EBIT 10.6%), DMart (Q1 FY27 revenue +14.9%, mature-store LFL +5.5%), Bharti Airtel (Q1 FY27 PAT ₹8,167 Cr +37%, ARPU ₹264, Africa >79%). Registered all five in `notes/index.ts` (6 bespoke slugs); `companies.ts` rows updated to verified figures + `updatedDate` pinned 2026-08-07; facts verified against Q1 FY27 results, FY26 disclosures, consensus and live quotes; lint clean, build green (174 pages), dev smoke 200 + note markers on all five company pages; DB mirror must be re-seeded. |
| 2026-08-07 | **Bespoke Trent research note** (v0.7.0) | Complete redesign/rewrite of the Trent report as a bespoke note via new `src/lib/notes/` block-model registry (ADR-012) + `ReportNote` renderer; page branches note-vs-generic (other 132 untouched); structure per brief (What changed / Variant perception / 3 drivers / inflection / catalysts / 3 evidence-linked theses / shareholding pattern replacing governance / real fiscal years FY22–FY26/Q1-FY27 / consensus / valuation with sensitivity / risk register with probability-impact-mitigation-KPI / downloadable sources); no horizontal-scroll tables (responsive stacked cards), institutional blue-grey styling + print rules, byline/evidence-legend/AI wording removed for Trent; `Company` row updated to verified primary-source figures; facts verified against Q4FY25/Q4FY26/Q1FY27 press releases, FY26 AR, shareholding PDF, FY22 AR, Marketscreener consensus; lint clean, build green, live smoke test (`/company/trent` note markers present, byline absent; `/company/hdfc-bank` generic intact), so the DB mirror must be re-seeded (companies.ts is the seed source of truth). |
| 2026-08-07 | **Database connection + article storage** (v0.6.0) | Supabase Postgres mirror (`db/schema.sql`: sectors · companies · report_sections); `npm run db:seed` truncate + batch-seed 133/23/3325; server-only `src/lib/db.ts` (`pg` pool, TLS in code, not in URL); hybrid `src/lib/store.ts` (DB-first → static fallback); read-only JSON API (`/api/health`, `/api/companies`, `/api/companies/[slug]`) — live-DB + fallback paths verified; docs (DATABASE/API/SECURITY/README/OPENCODE/DECISIONS/CHANGELOG/ROADMAP) updated; lint clean, build green (172 static + 3 dynamic). |
| 2026-08-06 | **Dark default + homepage refinement** (v0.5.3) | Dark mode is now the default: `beforeInteractive` theme-init script in layout (no FOUC, persists `passive-theme`, first visit = dark); `color-scheme` per theme; `themeColor #0b1220`; theme-toggle sun/moon rules moved out of the ≤980 media query (desktop showed both icons). Hero decluttered (badge + Popular chips removed, stats pulled up). Latest research rebuilt as fixed-column CSS Grid table (logo · name/ticker/sector+mcap · price · upside · badge · date, tabular numerals, 18px rows) with a dedicated mobile card layout — nothing hidden, meta wraps instead of truncating. Lint clean, build green (172 pages). |
| 2026-08-06 | **Homepage polish pass** (v0.5.2) | No-redesign polish: radius token tiers (`--radius-card` 18px, `--radius-btn` 14px, `--radius-input` 16px); 3-tier elevation aliases (`--elevation-low/medium/high`); nav 72→62px scroll-shrink + underline `.active` state; hero stats → start-aligned 4-col grid (2×2 mobile), tightened heights; premium market-strip ticker (dividers, tabular values); SectorCard 56px chip + 20px title + 2-line clamp; CompanyCard 2-line thesis clamp, equal-width badges; Latest research → 5-column CSS grid (logo·company·price·badge·time). Lint clean, build green (172 pages). |
| 2026-08-06 | **Homepage redesign** (v0.5.1) | Single 1280px container; two-column hero with `HeroPreview` illustration, 38px credibility stats, popular-search chips, market-snapshot strip; SectorCard rich hierarchy (counts/reports/updated, accent hover); Featured → 4-col, logo 44px, upside emphasis; `LatestList` grouped timeline replaces second card grid; CTA band + secondary button; footer newsletter/socials/legal group; mobile scroll-snap carousels; nav 15px + prominent CTA; Hold rating → gray. Lint clean, 172-page build green. |
| 2026-08-06 | **UI audit & design system** (v0.5.0) | `docs/UI_AUDIT.md` written (system/card/badge/responsive/a11y findings, status-tracked); added spacing/radius/elevation/type token scales + `--gap-grid`; mobile-first grids (1→2→3→4→5 cols), cards 20px radius + 3-line clamp + equal heights, badges fixed-height, controls 12px radius + 44px targets, `tabular-nums` everywhere, `--text-45` AA bump, `:focus-visible` rings, live universe counts (117→133) in hero/metadata/footer. Lint clean, build green (172 pages). |
| 2026-08-06 | **Stock logos** (v0.4.0) | 133 company logos downloaded from Dhan's CDN (`images.dhan.co/symbol/<TICKER>.png`) into `public/logos/`; `CompanyLogo` now image-first with gradient-initials fallback (client component, `next/image` unoptimized); `.company-logo` CSS extended. |
| 2026-08-06 | **Deployment wiring** (v0.3.1) | Repo pushed to `AjithSrikumar/passive-research`; Vercel connected — auto-deploy on every push to `main` (`https://passive-research.vercel.app`); auto-commit policy added to OPENCODE/AGENTS/DEPLOYMENT docs. |
| 2026-08-06 | **Doc-engineering sprint** (v0.3.0) | `README`, `docs/ARCHITECTURE`, `docs/OPENCODE.md`, `docs/TASKS.md`, `docs/CHANGELOG.md`, `docs/DECISIONS.md`, `docs/ROADMAP.md`, `docs/DATABASE.md`, `docs/API.md`, `docs/COMPONENTS.md`, `docs/STYLING.md`, `docs/TESTING.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY.md`; AGENTS.md pointer. |
| 2026-08-06 | **Institutional content upgrade** (v0.2.0) | Rewrote the methodology page per the Institutional Equity Research Manual; upgraded `ReportContent` (decision-first executive summary, thesis map, moat scorecard, reverse-DCF priced-in, sensitivity grid, 25/50/25 scenario cards, risk register, catalyst register, evidence labels `[F]/[M]/[E]/[I]`, sources screener.in + in.marketscreener) and added lib/report helpers (`scenarioCases`, `weightedTarget`, `pricedInAnalysis`, `totalReturnPct`, `impliedEps`, `round1`) plus CSS for evidence tags/scenario cards. Build 172 static pages, lint clean, smoke-tested. |
| 2026-08-06 | **Report engine** | `src/lib/report.ts` — `reportToc` (25), `financialHistory`, `forecasts`, `growthCagr`, `readingTime`, `upsides`, `ratingLanguage`. |
| 2026-08-06 | **Full site build** (v0.1.0 baseline) | Docify → Next conversion: all pages/components/dark mode/SEO (sitemap, robots, metadataBase `passive-research.in`, JSON-LD); deleted legacy Docify files; lint + build green (172 pages); dev smoke tests. |

*(Note: preceding dates are the day the migration and upgrade landed in this log; workstream details in `CHANGELOG.md` and `DECISIONS.md`.)*

---

**Backfill note:** This backlog was created on 2026-08-06 to give the project a
definitive starting point. Items marked `—` are unstarted.
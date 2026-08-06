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
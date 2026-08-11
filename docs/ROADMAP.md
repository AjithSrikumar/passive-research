# ROADMAP.md

> Living roadmap. Sprints roll forward; finished items move to
> `docs/CHANGELOG.md` and `docs/TASKS.md#Completed`.

## Current Sprint — Sprint 3 (in progress, targeting 2026-08)

**Theme: Institutional content + documentation system.**

- [x] Institutional article upgrade (v0.2.0) — all 133 reports + methodology.
- [x] Documentation system (v0.3.0) — README/OPENCODE/ARCHITECTURE/DECISIONS/
      TASKS/CHANGELOG/ROADMAP/DATABASE/API/COMPONENTS/STYLING/TESTING/
      DEPLOYMENT/SECURITY.
- [x] Live deployment (v0.3.1) — repo on GitHub, Vercel auto-deploy on push
      to `main` (`https://passive-research.vercel.app`), auto-commit policy.
- [x] **Database connection + article storage (v0.6.0)** — Supabase Postgres
      mirror (23 sectors, 133 companies, 3,325 report sections), seeded via
      `npm run db:seed`, hybrid store (`src/lib/store.ts`), read-only JSON
      API (`/api/health`, `/api/companies`, `/api/companies/[slug]`).
- [x] **Bespoke Trent research note (v0.7.0, ADR-012)** — full institutional
      redesign/rewrite of the Trent report on verified primary-source data
      via the `src/lib/notes/` registry + `ReportNote` renderer (first of the
      "analyst-authored notes" vision).
- [x] **Bespoke notes ×5 — HDFC Bank, Reliance, Titan, DMart, Bharti Airtel
      (v0.8.0, ADR-012 extension)** — the same institutional note structure
      on verified primary-source data for five more large-caps; six of 133
      reports are now bespoke.
- [x] **Bespoke notes ×27 — top market caps (v0.9.0, ADR-012 extension)** —
      TCS, Infosys, HCLTech, SBI, ICICI Bank, HUL, ITC, Bajaj Finance, L&T,
      Maruti, Sun Pharma, Tata Motors, M&M, Kotak, Axis, NTPC, ONGC, Power
      Grid, Adani Ports, Coal India, Bajaj Finserv, Bajaj Auto, Siemens India,
      Nestlé, BEL, Adani Power, JSW Steel on verified data (live quotes
      2026-08-07); **33 of 133 reports are now bespoke** (Tata Motors row
      reflects the post-demerger TMPV entity).
- [x] **Factor model platform (v0.10.0–v0.11.1)** — GQVM factor model over the
      NSE-900 universe: import pipeline (`npm run factor:import`) with
      dashboard-parity validation gates, Postgres factor schema, build-time
      snapshots (`src/lib/factor/data.ts` + `backtest.ts`), `/screener`,
      `/backtest` (parametric engine + `POST /api/factor/backtest` +
      optimizer), per-company scorecards, **individual pages for all 900
      companies** (901 SSG pages), NSE-symbol mapping + logos for 672
      companies (`TickerLogo`), FY2026 GQVM score strips on researched
      pages, "Latest Research" removed from the nav, Vitest suite (20 tests).
- [ ] Editorial review pass of report language (M3).
- [ ] First chart increment: financial history trend + margin bridge (H2
      partial).

## Next Sprint — Sprint 4

- **Factor model enrichment** (H1/H4 follow-up): widen the factor universe
  coverage (e.g. NSE-500 → all listed), add the remaining ~228 unmapped
  company symbols/logos (delisted/renamed entities currently fall back to
  initials), and surface more factor analytics (sector-level rankings, IC
  history charts).
- **Data enrichment design** (H1): enrich `Company` fields from sourced
  data, then re-seed the mirror (`npm run db:seed`); keep evidence labels
  honest.
- **Test runner adoption** (H3): extend Vitest to `src/lib/companies.ts` +
  smoke-checklist script — partially done (factor layer covered).
- **Sector page symmetry** (M4): `dynamicParams = false`.
- **CSP/headers** (M1) + `npm audit` gate (M2).
- **API hardening** (M6 follow-up): rate limiting at the edge if `/api/*`
  traffic grows; consider `GET /api/sectors` and `/api/reports/:slug`.

## Next Month

- Extend real-data enrichment and bespoke notes to the next tier of
  mid/large-caps beyond the 33 currently bespoke; re-label estimates as
  sourced `[F]` per field.
- SVG chart library complete: history, margin bridge, target-price bridge,
  scenario ranges (per manual § XI).
- Coverage search on index pages (M6); component extraction (M5).

## Future Vision

- **Passive as a full research publishing system:** analyst-authored notes
  (initiation / update / flash) with versioned model state, re-using the
  same 25-section framework or the bespoke-note layer (`src/lib/notes/`,
  ADR-012) when a company needs a deeper treatment.
- **Consensus + owned estimates UI:** compare our `pricedInAnalysis` with
  in.marketscreener consensus interactively.
- **Data API + private dashboards:** expand `/api/*` (sector lists, report
  sections, consensus), then auth-gated coverage, saved watchlists,
  alerting on signposts/catalysts from Section 21–22 registers.
- **Static export + CDN** for the public site; optional accounts layer
  separate from the public read-only product.

## Long-Term Goals

1. Become the reference institutional research source for Indian mid- and
   large-cap equities.
2. Pipeline that keeps every number attributable (F/M/C/E/I/S/U) end-to-end
   from ingestion to PDF.
3. Model-change notes (ADR on report types) so every target revision has an
   auditable bridge (manual § XV templates).
4. Positioning-ready: print/PDF exports per the manual's production standards.

---

*Last updated: 2026-08-09 (Sprint 3 closed — factor platform v0.10.0–v0.11.1: NSE-900 GQVM model, 901 company pages, logos)*
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
- [ ] Editorial review pass of report language (M3).
- [ ] First chart increment: financial history trend + margin bridge (H2
      partial).

## Next Sprint — Sprint 4

- **Data enrichment design** (H1): enrich `Company` fields from sourced
  data, then re-seed the mirror (`npm run db:seed`); keep evidence labels
  honest.
- **Test runner adoption** (H3): Vitest for `src/lib` + move the smoke
  checklist into a script.
- **Sector page symmetry** (M4): `dynamicParams = false`.
- **CSP/headers** (M1) + `npm audit` gate (M2).
- **API hardening** (M6 follow-up): rate limiting at the edge if `/api/*`
  traffic grows; consider `GET /api/sectors` and `/api/reports/:slug`.

## Next Month

- Finish real-data enrichment for the top ~25 companies by market cap;
  re-label estimates as sourced `[F]` per field.
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

*Last updated: 2026-08-07 (Sprint 3 closed — six bespoke notes v0.7.0/v0.8.0)*
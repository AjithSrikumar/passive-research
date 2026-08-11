# OPENCODE.md — AI Agent Session File

> Read this file at the **start of every session**. It is the project's
> on-ramp for AI agents and new engineers. The repository — not chat history —
> is the source of truth. If this file conflicts with your memory, this file
> wins. If it conflicts with code, the code wins (and this file should be
> updated).

---

**Passive** — an institutional-grade equity research platform for Indian listed
stocks. A Next.js 16 App Router site: **901 company pages** (133 researched
reports + 768 GQVM factor-score pages), 23 sector pages, and standard content
pages. Pages are generated **at build time** (SSG) from TypeScript data modules
(`src/lib`). Reports follow a fixed 25-section institutional framework with
evidence labels, driver-based forecasting, reverse-DCF valuation, scenarios,
and monitorable risks. Since v0.6.0 a **Supabase Postgres mirror** + read-only
JSON API (`/api/*`) serve the same dataset through hybrid loaders (DB-first,
static fallback — ADR-011); the build and all pages remain fully static and
DB-independent. Since v0.7.0 selected companies can carry a **bespoke research
note** (`src/lib/notes/` + `ReportNote`, ADR-012) rendered instead of the
generic framework when the slug matches — the generic 25-section reports remain
untouched; **33** reports are bespoke institutional redesigns on verified
primary-source data (v0.7.0–v0.9.0). Since v0.10.0 a **GQVM factor platform**
(NSE-900 universe, FY13–FY26, dashboard-parity validated) powers the screener,
backtest, per-company scorecards and factor pages for all 900 companies
(v0.10.0–v0.11.1).

## Current Project Status

- **Version:** 0.11.1 (see `docs/CHANGELOG.md`)
- **Build state:** GREEN — `npm run build` passes (**901 `/company/[slug]`
  SSG pages** + 23 sector + static content/API routes); `npm run lint` passes
  clean; `npm run test` (Vitest) **20/20 green**. Build works with **no**
  `DATABASE_URL` (pages never read the DB).
- **Deployment:** LIVE — Vercel auto-deploys from the `main` branch
  (`https://passive-research.vercel.app`); domain `passive-research.in` is the
  canonical origin (see `docs/DEPLOYMENT.md`).
- **Database:** Supabase Postgres connected (ADR-011) — schema
  `db/schema.sql` (`{ sectors: 23, companies: 133, report_sections: 3325 }`)
  + factor schema `db/factor_model.sql` (`factor_companies` 900 · values ·
  scores · composites · backtest · benchmark, applied via
  `npm run factor:import`), accessed server-only through `src/lib/db.ts` +
  `src/lib/store.ts`. `.env.local` holds `DATABASE_URL` (gitignored); Vercel
  env must be set in the dashboard for production API reads to hit the DB.
- **Factor platform (v0.11.1):** GQVM model v2.0 (G 0.2 / Q 0.1 / V 0.6 /
  M 0.1) validated 1:1 against `GQVM Factor Dashboard.xlsx` (repo root, **not
  committed**) — composites 5,656/5,656 ranks, NAV 873.33, CAGR 18.14%,
  Sharpe 0.622. Every NSE-900 company has its own page
  (`/company/<slug>`, 901 SSG, `dynamicParams=false`); researched pages get a
  top **GQVM score strip** (G/Q/V/M + Total at 1 decimal). NSE symbols mapped
  for **672/900** (`factor_companies.nse_symbol` via
  `scripts/factor-model/map-symbols.ts`) and logos committed to
  `public/logos/` (672 PNGs from Dhan's CDN via `fetch-logos.ts`); the
  residual 228 are delisted/renamed names that render a deterministic
  initials fallback (`TickerLogo`). Screener + backtest tables show
  logo + symbol and link every row to its company page. "Latest Research"
  removed from the nav (page, footer link and hero CTA kept).
- **Content state:** The institutional upgrade (executive summary, thesis map,
  reverse-DCF, scenarios, risk/catalyst registers, evidence labels) is complete
  for all 133 companies. **33 bespoke institution-grade notes** on verified
  primary-source data (Q1 FY27 results, FY26 disclosures, consensus, live
  quotes of 2026-08-07): Trent (v0.7.0); HDFC Bank, Reliance, Titan, DMart,
  Bharti Airtel (v0.8.0); and the top-27-by-market-cap set (v0.9.0) — TCS,
  Infosys, HCLTech, SBI, ICICI Bank, HUL, ITC, Bajaj Finance, L&T, Maruti,
  Sun Pharma, Tata Motors, M&M, Kotak, Axis, NTPC, ONGC, Power Grid, Adani
  Ports, Coal India, Bajaj Finserv, Bajaj Auto, Siemens India, Nestlé, BEL,
  Adani Power, JSW Steel — see `src/lib/notes/index.ts`. Note: Tata Motors'
  row reflects the post-demerger TMPV listed entity; Siemens' FY26 is an
  18-month period. Methodology page rewritten per the manual. Company
  logos (real brand images from `public/logos/`) replace the initials-only
  squares (v0.4.0).
- **UI state:** Dark mode is the default (v0.5.3) — `beforeInteractive`
  theme-init script applies the saved `passive-theme` preference before first
  paint (no FOUC); hero badge + popular chips removed; latest-research rebuilt
  as an aligned fixed-column table (desktop) with a dedicated no-clip card
  layout (mobile). Earlier: v0.5.2 polish (radius/elevation/type tokens,
  nav scroll-shrink, premium market strip), v0.5.1 homepage redesign, v0.5.0
  design tokens/audit (`docs/UI_AUDIT.md` + `docs/STYLING.md`).
- **Docs state:** Full documentation system in `docs/` (ARCHITECTURE,
  DECISIONS, TASKS, CHANGELOG, ROADMAP, DATABASE, API, COMPONENTS, STYLING,
  TESTING, DEPLOYMENT, SECURITY, UI_AUDIT, FACTOR_MODEL, DATA_MODEL) +
  `OPENCODE.md` + rewritten `README.md`.

---

## Active Objectives

1. Keep the repo the single source of truth — docs synchronized with code.
2. Factor platform enrichment: widen universe coverage, close the 228-name
   symbol gap, sector-level rankings / IC-history charts.
3. Enrich data quality (real vs synthetic financials) — top roadmap item.
4. Add charts (SVG) per the institutional manual's chart standards.
5. Strict security headers + CSP; `npm audit` gate.
6. Optional: coverage-universe JSON API / full static export.

See `docs/ROADMAP.md` for sprint details and `docs/TASKS.md` for the queue.

---

## Current Sprint

**(Sprint 3, in progress) — Institutional content + docs system.**
The institutional upgrade is done; documentation is done; the factor platform
(v0.10.0–v0.11.1: NSE-900 GQVM model, screener/backtest, 901 company pages,
logos) is shipped. Remaining sprint-3 work is small: content review pass over
report language, add charts (first increments), and any fix-ups found in
review.

---

## Coding Standards

- TypeScript everywhere, strict typing; `verbatimModuleSyntax`-style type-only
  imports (`import type`).
- **Production quality, readable. Prefer composition over inheritance. Keep
  functions small. No cleverness.**
- **No comments in code unless explicitly requested** — let the code be
  self-documenting; put the *why* in `docs/DECISIONS.md`.
- Pure helpers: total functions, no throwing on data edge cases; return
  `null` / `undefined` / `"—"` and render guards.
- All money in **₹ crore**; share prices in **₹**. Formatters in
  `src/lib/companies.ts` (`formatCr`, `formatIndian`, `formatPrice`,
  `formatUpdated`).
- Lint with ESLint 9 + `eslint-config-next`. The project actively enforces
  `react-hooks/set-state-in-effect` (this caused the class-driven
  `ThemeToggle` design — ADR-005).
- Docs are code: completing any task includes updating the relevant markdown.

## Naming Conventions

| Thing | Convention |
|---|---|
| Components | `PascalCase.tsx`, default export, typed `props` inline |
| Lib files | `camelCase.ts`; named exports |
| Routes | `kebab-case` slugs; folder per route |
| Data rows | `slug`, `ticker`, `name` fields; slugs are lowercase kebab |
| CSS classes | `kebab-case`; layout patterns: `page-hero`, `section-inner`,
  `report-section`, `key-value-grid`, `kv-item`, `callout`, `fin-table` |
| Test/smoke scripts | PowerShell files documenting manual checks |

## Folder Conventions

```
src/app            App Router pages (server-first)
src/components     Presentational + data-accepting components
src/lib            Pure logic + datasets (no React, no DOM)
docs/              Markdown documentation (source of truth)
public/            Static assets
```

## Preferred Libraries

- **Next.js 16.3.0** (App Router, Turbopack) — framework, non-negotiable.
- **React 19.2.8** — UI.
- **TypeScript 5** + **ESLint 9** (`eslint-config-next`).
- **CSS custom properties** — styling; no Tailwind/SCSS/styled-components.
- **DM Sans** via `next/font/google`.
- **`pg` + `server-only`** — Postgres client + boundary guard for the DB
  mirror (runtime, ADR-011). `tsx`/`@types/pg` as dev deps.
- **Do not add further runtime dependencies** without an ADR (see
  `docs/DECISIONS.md`). If you need a feature, build it with CSS/TS first.

## Design System

- Accent `#2563eb` (`--accent`, light) / `#60a5fa` (dark). Text `#111827`
  / `#f1f5f9`. Background `#fff` / `#0b1220` (dark). Full tokens in
  `docs/STYLING.md`.
- Dark mode = `.dark` class on `<html>`; key `passive-theme` persists the
  preference; set pre-hydration to avoid flash.
- Type scale & spacing, cards, tables, callouts, badges, evidence tags, and
  scenario cards are all documented in `docs/STYLING.md` and defined in
  `src/app/globals.css`.

## Component Patterns

- Server components render data; client components add the bare minimum of
  interactivity. Only 8 components are `"use client"`.
- Components accept data (a `Company`/`Sector` object) and never fetch.
- Links via `next/link`. Icons are inline SVG strokes. Company logos are
  real images from `public/logos/<TICKER>.png` (Dhan-sourced, committed);
  `CompanyLogo` falls back to the gradient-initials square on load failure.
- Full catalog: `docs/COMPONENTS.md`.

## Architecture Constraints

- **Static by default.** All pages SSG; unknown company slug → 404
  (`dynamicParams = false`); sector pages SSG.
- **Single source of truth** for the report framework: `reportToc` in
  `src/lib/report.ts`. Methodology page, TOC sidebar, and section rendering
  must all derive from it — never hardcode the 25 sections twice.
- **Bespoke notes override by slug only** (ADR-012): `getNote(slug)` in
  `src/lib/notes/` decides which report renders. The generic framework is
  never changed for a bespoke company; a bespoke note must never touch
  `reportToc` or `ReportContent`.
- Data must flow: `companies.ts` / `sectors.ts` → `report.ts` → pages. No
  component may recompute these with divergent constants.
- **Pages never read the DB.** The Postgres mirror (ADR-011) is served only
  through `src/lib/db.ts` + `src/lib/store.ts` and the `/api/*` routes;
  server components that need universe data import the static modules
  directly. A missing/`unreachable` `DATABASE_URL` must not change any
  rendered output.
- RSC output + tiny client islands; no global state library.
- `report-section` class + `data-report-section` attribute are required by the
  `ReportToc` scrollspy. Section elements and `id`s must match `reportToc`.

## Things Never To Change (read carefully)

1. **The 25-section framework and its ids** (`reportToc` in
   `src/lib/report.ts`). Sections are indexed in `company` pages, the TOC
   sidebar, the Methodology page, and JSON-LD. A bespoke note (ADR-012) may
   replace the framework for its own slug only — it must never alter
   `reportToc` or `ReportContent`, and no other company's report may change.
2. **Rating enumeration** — `Strong Buy | Buy | Accumulate | Hold | Reduce |
   Sell` — used by `RatingBadge`, `sortByRating`, methodology, and data.
3. **Company/Sector field contract** — `Company`/`Sector` interfaces; many
   formatters and report sections depend on them. Add fields = additive, never
   rename.
4. **Brand tokens** — `#2563eb` accent (light) / `#60a5fa` (dark), `DM Sans`,
   ₹ plural. Any brand change needs an ADR.
5. **The domain** `https://passive-research.in` — `metadataBase`, sitemap,
   robots.
6. **`dangerouslySetInnerHTML` usage** — allowed for the JSON-LD script only
   (data from internal dataset). Never for user-derived markup.
7. **Keeping runtime dependencies at next/react/react-dom/pg/server-only**
   — a new runtime dep requires an ADR (pg + server-only added by ADR-011).
8. The auto-generated `AGENTS.md` guard block (Next.js agent rules) — it must
   not be edited or removed; `next dev` re-adds it. See "Things never to
   change/AGENTS.
9. The eslint-enforced `react-hooks/set-state-in-effect` — don't reintroduce
   setState-in-effect patterns (see ThemeToggle ADR-005).

## Current Known Issues

- Financials are **synthetic** (derived from `Company` fields) and marked
  `(E)` — they are model-implied, and a disclaimer lives on the Methodology
  page. **Exception (v0.7.0+):** the 33 bespoke companies have rows and notes
  using verified primary-source figures; estimates in the notes remain marked
  `(E)`.
- Factor symbols/logos: 228 of 900 NSE-900 names are unmapped
  (`factor_companies.nse_symbol IS NULL`) — delisted/renamed entities whose
  rows render the initials fallback in tables (acceptable by design).
- Vitest covers the factor layer (20 tests); `src/lib/companies.ts` and the
  smoke checklist are not yet scripted (checked in `docs/TESTING.md`).
- `sectors/[slug]` route does not set `dynamicParams=false` (that's fine —
  unknown slugs → 404 via `getSector` guard).
- Brand phrasing/English copy may need a final editorial pass (Sprint 1
  hardening).
- No charts yet (planned); no CSP (planned).
- DB mirror must be re-seeded (`npm run db:seed`) after any data change in
  `companies.ts`/`sectors.ts`; the factor tables need `npm run factor:import`
  after workbook changes — the TS modules remain the source of truth for
  pages; the mirror is a snapshot.
- Vercel production needs `DATABASE_URL` set in the project env for the API
  to read the DB (falls back to static data without it).

## Recently Completed Features

See `docs/CHANGELOG.md` v0.1.0–v0.11.1 and `docs/DECISIONS.md`. Highlights:

- Docify → Next.js full conversion (ADR-001, deleted legacy files).
- 133-company + 23-sector data model, report engine, static build.
- Institutional upgrade: executive summary decision film, thesis map, reverse
  DCF, scenario cards, risk/catalyst registers, evidence labels (ADR-006).
- **Bespoke research notes (v0.7.0-v0.9.0, ADR-012)**: Trent, HDFC Bank,
  Reliance, Titan, DMart, Bharti Airtel, plus the top-27-by-market-cap set
  (TCS, Infosys, HCLTech, SBI, ICICI Bank, HUL, ITC, Bajaj Finance, L&T,
  Maruti, Sun Pharma, Tata Motors, M&M, Kotak, Axis, NTPC, ONGC, Power Grid,
  Adani Ports, Coal India, Bajaj Finserv, Bajaj Auto, Siemens India, Nestlé,
  BEL, Adani Power, JSW Steel) carry full institutional redesigns of
  their reports (variant perception, driver matrix, evidence-linked theses,
  shareholding pattern, real fiscal years, consensus-anchored valuation, risk
  register, downloadable sources) on verified primary-source data; responsive
  stacked table cards, print rules, byline/evidence-legend/AI wording removed
  for bespoke companies.
- **GQVM factor platform (v0.10.0–v0.11.1)**: NSE-900 model (FY13–FY26)
  imported from `GQVM Factor Dashboard.xlsx` with dashboard-parity validation
  gates; `/screener` + `/backtest` + per-company scorecards; parametric
  backtest engine (`POST /api/factor/backtest`) + exploration-only optimizer;
  **individual pages for all 900 companies** (901 SSG), FY2026 GQVM score
  strips at 1 decimal on researched pages; NSE-symbol mapping (672/900) +
  Dhan-CDN logos (672 PNGs in `public/logos/`) with initials fallback;
  "Latest Research" removed from the nav; Vitest suite (20 tests).
- Methodology page rewrite per the Institutional Research Manual.
- Performance/SEO: sitemap, robots, metadataBase, JSON-LD, dark mode.
- Documentation system (this sprint, v0.3.0).

## Pending Refactors

- Extend Vitest to `src/lib/companies.ts` and script the smoke checklist
  (see ADR proposal in `docs/DECISIONS.md` backlog thoughts).
- Possibly component-first: extract scenario cards / risk tables behind
  presentational components if they exceed readability.
- Normalize the "evidence tag" (`[E]`) spans into a dedicated component if
  usage grows.
- Consider `output: "export"` if hosting moves to pure static CDN.

See `docs/TASKS.md` for the full queue.

## Current Priorities

1. Keep the repo the single source of truth — docs synchronized with the
   new hybrid DB + factor layer.
2. Factor platform enrichment (universe coverage, symbol gap, sector views).
3. Data enrichment pipeline (real companies data → typed JSON → re-seed).
4. Chart library (manual-driven) for history + bridges.
5. Security headers + CSP + `npm audit` gate.

## Coding Workflow

1. Read: `AGENTS.md` (Next 16 rules) → `OPENCODE.md` → `docs/ARCHITECTURE.md`
   → `docs/DECISIONS.md` → `docs/TASKS.md`.
2. Plan the change; identify which docs must move in parallel.
3. Implement with strict typing; match conventions (naming/format/lint).
4. Verify: `npm run lint` + `npm run build` (TS check + SSG).
5. Smoke test on the running dev server (`http://localhost:3000`) with the
   `docs/TESTING.md` checklist (status 200 + content markers per page).
6. Update docs (ARCHITECTURE/COMPONENTS/CSS/DATABASE/API as applicable),
   `docs/TASKS.md` (move to Completed), `docs/CHANGELOG.md`, and `docs/DECISIONS.md`
   if design decisions changed.
7. **Commit & push** (see the Commit & Deploy Policy below). Do **not** wait to
   be asked — the repo and the live site must always reflect the latest state.

## Commit & Deploy Policy (mandatory)

- **Auto-commit:** after every change (code, data, or docs), commit with a
  clear, concise message and push to `main`. The working tree must be clean at
  the end of every session. Do not leave uncommitted work behind — the
  repository is the source of truth.
- **Auto-deploy:** Vercel is connected to the GitHub repo; every push to
  `main` triggers a production deployment automatically
  (`https://passive-research.vercel.app`). No manual deploy steps exist.
- **Branching:** work directly on `main` (solo project). If a change is risky
  or large, use a `feature/` branch and merge via PR — but never leave
  branches unmerged for long.
- **Commit hygiene:** stage only intended files; never commit secrets,
  `node_modules`, `.next`, or `.env*` (`.gitignore` covers these). One logical
  change per commit; message style: imperative, summary line + optional body.
- **Verify before commit:** `npm run lint` + `npm run build` green, smoke
  checks passed, docs updated — then commit.
- If a commit is amended or the push fails, fix forward (new commit), never
  rewrite published history.

## Documentation Rules

- Docs are code. Any change that alters behavior, structure, naming, design
  tokens, routes, or decisions must update the docs in the same commit.
- `docs/ARCHITECTURE.md` and `docs/COMPONENTS.md` must mirror implementation.
- Add one ADR per new decision (DECISIONS.md); never delete old ADRs.
- Keep summaries short and accurate; prefer tables over prose.
- Use Mermaid only when it explains structure/flow meaningfully.

## Session Startup Instructions

1. Read this file.
2. Read `README.md` + `docs/ARCHITECTURE.md`.
3. Read `docs/TASKS.md` + `docs/DECISIONS.md` + `docs/CHANGELOG.md`.
4. Read the touched code (data libs + related components — full file; don't
   assume).
5. Confirm the build baseline: `npm run lint; npm run build`.
6. Pick a task from `docs/TASKS.md` (or the user's request) and start.

## Session Shutdown Instructions

Before you consider any task finished:

- [ ] Code compiles (`npm run build`, `npm run lint`).
- [ ] Smoke checks pass (`docs/TESTING.md`).
- [ ] `docs/TASKS.md` updated (completed task moved; add completion date).
- [ ] `docs/CHANGELOG.md` bumped to the next semantic version with changes.
- [ ] `docs/DECISIONS.md` updated for any new decisions; older ADRs preserved.
- [ ] `docs/ARCHITECTURE.md` (and COMPONENTS/STYLING/API/DATABASE as needed)
      reflect reality.
- [ ] `OPENCODE.md` updated as needed for status/deps/schema changes.
- [ ] **Committed + pushed to `main`** (Commit & Deploy Policy) — tree clean,
      Vercel auto-deploys the result.

## Shutdown — deployment confirmation

1. `git status` must show a clean working tree (`git status -sb` no unstaged
   files) and no unpushed commits (`git log origin/main..main` empty).
2. If new commits were pushed, confirm the Vercel deployment is healthy:
   `Invoke-WebRequest https://passive-research.vercel.app` → 200, then spot
   check the changed routes. Vercel builds take ~1–2 minutes; a 200 on the
   domain once the deployment completes is the pass signal.

Definition of done: code + docs verified + task & changelog reflecting the
change. If any of the above is missed, the task is **not fixed**.

---

*Last updated: 2026-08-09 (v0.11.1 — company pages for all 900, logos, nav cleanup)*
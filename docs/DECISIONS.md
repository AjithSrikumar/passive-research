# DECISIONS.md — Architectural Decision Log

> Format: **ADR-NNN · Date · Context · Problem · Options · Decision ·
> Reasoning · Tradeoffs · Consequences · Future Review**. Never delete a
> decision; append new ones. New decisions are added in a PR with code
> changes (docs are code).

---

## ADR-001 — Next.js App Router + TypeScript as the platform

- **Date:** 2026-08-01 (log entry 2026-08-06)
- **Context:** The project started as a Docify static-site template (Next.js
  `pages`-style docs template). Product direction became an institutional
  equity research platform with structured, data-driven reports.
- **Problem:** Template pages and content structures no longer fit the
  product; the template also carried dead routes and legacy components.
- **Options:** (a) keep Docify template and bolt on content; (b) full
  migration to Next.js App Router with server components, TS, and SSG;
  (c) another framework (Astro, SvelteKit).
- **Decision:** Full migration to Next.js 16 App Router + TypeScript + SSG
  (`generateStaticParams`), custom CSS, zero extra runtime deps.
- **Reasoning:** Same underlying platform as Docify (fast path), strongest
  static/SSG story, server-component-first model fits a data-driven read-only
  site, and the team's lint/tooling story (ESLint 9 + eslint-config-next).
- **Tradeoffs:** App Router breaking-change churn (Next 16 conventions differ
  from training data — mitigated by the AGENTS.md guard block); no `pages`
  escape hatch.
- **Consequences:** All content derives from `src/lib/*`; every page is
  pre-rendered; the Docify-era files were deleted (see ADR-002).
- **Future review:** If the site needs client-heavy interactivity (live
  charting, dashboards), revisit.

---

## ADR-002 — Static data modules instead of a database / backend

- **Date:** 2026-08-01 (log entry 2026-08-06)
- **Context:** The coverage universe (133 companies, 23 sectors) and report
  math are deterministic.
- **Problem:** A DB/API would add infrastructure, auth, and latency for data
  that changes only when an analyst publishes a new estimate.
- **Options:** (a) static TS modules as the data layer; (b) SQLite at build
  time; (c) live API + DB with ISR.
- **Decision:** Static TypeScript modules in `src/lib/` as the single data
  layer; no runtime storage.
- **Reasoning:** Build-time correctness, zero server costs, instant pages,
  and the whole universe compiles with type-checking.
- **Tradeoffs:** Adding/editing companies requires a code change + rebuild
  (no CMS); no live prices.
- **Consequences:** The lib contract (Company/Sector) becomes the de-facto
  schema (see `docs/DATABASE.md`); the upgrade path to a real API is
  deliberate and page-agnostic (ROADMAP H1).
- **Future review:** When data freshness matters, switch the lib layer
  behind the same interfaces (ISR/on-demand).

---

## ADR-003 — Custom CSS design system, no Tailwind

- **Date:** 2026-08-01 (log entry 2026-08-06)
- **Context:** Brand: PASSIVE, accent `#2563eb`, professional research look.
- **Problem:** Styling approach for a token-heavy, light/dark themed site
  with tables, cards, callouts.
- **Options:** (a) Tailwind; (b) CSS modules/SCSS; (c) one global CSS with
  custom properties.
- **Decision:** A single `src/app/globals.css` using CSS custom properties,
  `.dark` overrides, and utility-lite layout classes.
- **Reasoning:** Zero dependencies, full control over the design system,
  trivial dark mode via variable swap, and easy component reuse (class
  patterns documented in `docs/STYLING.md`).
- **Tradeoffs:** No Tailwind utility ergonomics; some class repetition.
- **Consequences:** Token changes are one-file edits; CSS must stay
  documented to stay usable.
- **Future review:** OK as long as class names stay documented.

---

## ADR-004 — Dark mode via `.dark` class + localStorage

- **Date:** 2026-08-01 (log entry 2026-08-06)
- **Context:** Professional finance users work in dark rooms; consistent
  brand across modes.
- **Problem:** Flash-of-wrong-theme on load and SSR/hydration mismatch.
- **Options:** (a) media-query only; (b) `.dark` class + `localStorage` with
  pre-hydration script; (c) `next-themes`.
- **Decision:** `.dark` on `<html>`, persisted at key `passive-theme`; an
  inline pre-hydration script sets the initial class; `ThemeToggle` toggles
  the class directly on the DOM (class-driven, not state-driven).
- **Reasoning:** No dependency; instant toggle; class-driven design keeps
  hydration deterministic and satisfies the active lint rule
  `react-hooks/set-state-in-effect`.
- **Tradeoffs:** Theme preference is per-browser; the initial class is set by
  inline script (small, static, safe).
- **Consequences:** `suppressHydrationWarning` on `<html>`; any future SSR
  framework must preserve this pattern.
- **Future review:** If per-user accounts arrive, persist theme server-side.

---

## ADR-005 — Report framework: 25 fixed sections with single source of truth

- **Date:** 2026-08-02 (log entry 2026-08-06)
- **Context:** Institutional consistency across 133 reports; the sidebar TOC,
  the Methodology page, and report rendering must agree.
- **Problem:** Divergent section lists would corrupt comparison and
  navigation.
- **Options:** (a) hardcode sections in each place; (b) derive from
  `reportToc`.
- **Decision:** `reportToc` in `src/lib/report.ts` is the single source of
  truth; Methodology, `ReportToc`, and `ReportContent` derive from it;
  sections keep stable `id`s matching `data-report-section`.
- **Reasoning:** One edit changes all surfaces; ids are stable anchors.
- **Tradeoffs:** Adding a section requires touching `ReportContent` plus the
  roles map on the Methodology page.
- **Consequences:** Section order/labels are effectively frozen by convention
  (see OPENCODE "Things Never To Change").
- **Future review:** Keep stable unless a content rearchitecture demands it
  (then bump major).

---

## ADR-006 — Institutional research methodology (manual-driven)

- **Date:** 2026-08-06
- **Context:** The *Institutional Equity Research Manual* (2026 edition) —
  located at `D:\Tutorials\Telegram\Equity Research Workflow\Institutional_Equity_Research_Manual.md`
  (outside the repo) — prescribes how institutional research is written:
  decision-first architecture, evidence chains, driver-based forecasts,
  priced-in analysis, scenarios, risk registers, catalysts, source discipline.
- **Problem:** Articles were narrative boilerplate; methodology was thin;
  the audience (professional institutional investors) needed the manual's
  standard.
- **Options:** (a) adopt the manual wholesale for all articles; (b) partial
  adoption.
- **Decision:** Full adoption across `ReportContent` (all 133 articles) and
  the Methodology page: decision-first executive summary; thesis map; moat
  scorecard; reverse-DCF "what is priced in"; 25/50/25 scenarios with
  operating assumptions; risk register with leading indicators; catalyst
  register; evidence labels `[F] [M] [C] [E] [I] [S] [U]`; source policy
  (screener.in primary: annual reports, credit ratings, concall
  transcripts/PPT; in.marketscreener.com for consensus).
- **Reasoning:** Matches audience expectations and the platform's purpose;
  measurable and auditable content.
- **Tradeoffs:** More content per page (reading time ~8–12 min); synthetic
  financials must remain honestly labelled `(E)`.
- **Consequences:** The manual is an external dependency — if it changes,
  methodology docs and `ReportContent` must be re-reviewed. The manual text
  itself is not copied into the repo (only conventions).
- **Future review:** On each content release, re-run the manual's
  "institutional test" (5 questions after first 3 pages).

---

## ADR-007 — Synthetic financials labelled `(E)`, real-data pipeline later

- **Date:** 2026-08-06
- **Context:** No live market/fundamentals API is wired; the report engine
  derives history and forecasts deterministically from each company's
  headline fields.
- **Problem:** Readers (and future pipelines) must never mistake model math
  for reported data.
- **Options:** (a) omit numbers; (b) compute with `(E)`/`[E]` labels
  everywhere and an appendix note; (c) fake unlabeled numbers.
- **Decision:** (b) — model-implied history/estimates are computed in
  `src/lib/report.ts` and labelled `(E)` (analyst estimate) in every table
  and prose context; methodology documents the convention.
- **Reasoning:** Keeps reports complete while preserving integrity; the
  labels satisfy the manual's evidence-classification rule.
- **Tradeoffs:** Numeric precision is illustrative, not sourced.
- **Consequences:** H1 (data enrichment) is the top roadmap item; when real
  data lands, labels flip to `[F]` per-source.
- **Future review:** With each data release.

---

## ADR-008 — SSG with `dynamicParams = false` + generated sitemap/robots

- **Date:** 2026-08-02 (log entry 2026-08-06)
- **Context:** 133 company pages and 23 sector pages; canonical origin
  `https://passive-research.in`.
- **Problem:** SEO quality, unknown-slug behavior, and URL canonicalization.
- **Options:** (a) default dynamic rendering; (b) SSG with params and 404 for
  unknown slugs; (c) export.
- **Decision:** `generateStaticParams` everywhere; `dynamicParams = false`
  on `/company/[slug]`; `sitemap.ts` + `robots.ts` derive from
  `metadataBase` and the data layer.
- **Reasoning:** Deterministic 404s, full SEO surface, zero runtime costs.
- **Tradeoffs:** New companies require a rebuild (accepted per ADR-002).
- **Consequences:** `sitemap.xml` lists all URLs; unknown company → custom
  404. Sector route doesn't set `dynamicParams=false` (adds symmetry later —
  task M4).
- **Future review:** Keep while content stays build-time.

---

## ADR-009 — Documentation-as-code governance (this repo's meta-decision)

- **Date:** 2026-08-06
- **Context:** Long-lived project that must survive context resets and model
  changes.
- **Problem:** Chat history is volatile; the repo must be the memory.
- **Options:** (a) chat-only decisions; (b) ad-hoc notes; (c) structured
  docs with conventions.
- **Decision:** (c) — `README.md` + `OPENCODE.md` + `docs/*` (ARCHITECTURE,
  DECISIONS, TASKS, CHANGELOG, ROADMAP, DATABASE, API, COMPONENTS, STYLING,
  TESTING, DEPLOYMENT, SECURITY) with a defined session workflow and
  definition of done.
- **Reasoning:** Enables immediate continuation by any engineer or LLM;
  every decision has an ADR; tasks and changelog never lose history.
- **Tradeoffs:** Documentation maintenance overhead; risk of stale docs
  (mitigated by the "docs are code" rule).
- **Consequences:** Definition of done now includes docs. The session
  workflow is defined in `OPENCODE.md`.
- **Future review:** Quarterly.

---

## ADR-010 — Real company logos as committed static assets

- **Date:** 2026-08-06
- **Context:** The app originally rendered company identifiers as
  CSS-gradient initials squares to avoid image assets entirely.
- **Problem:** Real brand logos materially improve credibility and scannability
  of an equity research platform.
- **Options:** (a) keep initials-only squares; (b) hot-link external logo CDNs
  (Dhan/other) at runtime; (c) download logos once and commit to
  `public/logos/`.
- **Decision:** (c) — 133 logos fetched from Dhan's public stock-logo CDN
  (`https://images.dhan.co/symbol/<NSE_SYMBOL>.png`) and committed under
  `public/logos/` named by the app's `ticker` field (Dhan's symbol differs
  from the stored ticker in one case: `LTIM` → stored as `LTIMIND.png`).
  `CompanyLogo` renders the image via `next/image` (`unoptimized`) and falls
  back to the gradient-initials square on load failure.
- **Reasoning:** No runtime third-party image requests (privacy, speed,
  stability); build-time availability is type-checked by route count; brand
  logos stay consistent across deployments.
- **Tradeoffs:** Repo size grows (~1 MB of PNGs); logos are third-party
  trademarks used for identification/nominative purposes only.
- **Consequences:** Any new company added to `companies.ts` must ship a logo
  file `public/logos/<ticker>.png` or render the initials fallback.
  **2026-08-09 (v0.11.1):** extended to the full NSE-900 universe — the
  factor RIC codes are mapped to real NSE symbols
  (`scripts/factor-model/map-symbols.ts`, `factor_companies.nse_symbol`,
  672/900) and logos fetched into `public/logos/` (672 files); the screener
  and backtest tables render them via `TickerLogo` (deterministic initials
  fallback) and link every row to its `/company/<slug>` page.
- **Future review:** If a company rebrands or a logo is wrong, replace the
  file in `public/logos/` (data-driven; no code change).

---

## ADR-011 — Postgres mirror + hybrid data store (v0.6.0)

- **Date:** 2026-08-07
- **Context:** The site is static by design (ADR-002/008); analysts asked
  whether the project could "connect a database." The static TS modules
  remain the build-time source of truth for all 172 pages.
- **Problem:** (a) No DB-backed story for programmatic/API consumers; (b)
  the dataset lives only in code, so no external tooling can query it.
- **Options:** (a) DB as a full replacement for `companies.ts`/`sectors.ts`
  (pages build from DB — couples deploys to a remote DB and breaks the
  "static by default" rule); (b) DB as a mirror + read-only API on top,
  with hybrid loaders (DB-first, static fallback); (c) no DB.
- **Decision:** (b). Supabase Postgres mirrors `sectors` (23), `companies`
  (133, snake_case, + `author` column), and `report_sections` (133 × 25
  derived JSONB payloads). Schema lives in `db/schema.sql` (idempotent);
  `npm run db:seed` (tsx) truncates and batch-inserts from the TS source of
  truth. `src/lib/db.ts` (server-only `pg`) + `src/lib/store.ts` (hybrid
  loaders) feed three read-only API routes (`/api/health`,
  `/api/companies`, `/api/companies/[slug]`).
- **Reasoning:** Pages keep generating from TS (build is DB-independent —
  if `DATABASE_URL` is absent or down, everything renders and the API serves
  static data). The DB adds a queryable, contract-typed store and an API
  surface with zero regression risk to the static product.
- **Tradeoffs:** Two sources of content (sync by re-seed); `pg`,
  `server-only`, `tsx`, `@types/pg` are new dev/runtime deps (ADR-001
  dependency rule waived by this ADR); section payloads are served only from
  the DB mirror (fall to `null` when unreachable).
- **Consequences:** SECURITY/DATABASE/API docs updated; `.env.local` +
  Vercel env `DATABASE_URL`; future enrichment flows through a DDL change,
  seed, and rebuild. Data freshness for live prices is out of scope (ADR-007).
- **Future review:** If the DB becomes the primary store (CMS, live prices),
  replace the hybrid fallback with a sole-DB loader behind the same
  interfaces and revisit `dynamicParams` (ADR-008).

---

## ADR-012 — Bespoke per-company research notes (v0.7.0 → v0.9.0)

- **Date:** 2026-08-07 (extended 2026-08-07 to a six-note catalogue;
  extended again 2026-08-07 to a 33-note catalogue)
- **Context:** The 25-section `ReportContent` framework (ADR-005) guarantees
  consistency, but it caps depth where a company deserves an institution-grade
  note. Product brief: completely redesign and rewrite the **Trent** report to
  be indistinguishable from a Morgan Stanley / UBS / Goldman Sachs initiation
  note — not longer, but evidence-backed, driver-linked, consensus-grounded,
  with no horizontal-scroll tables, real fiscal years, downloadable sources,
  and no byline / evidence-legend / AI wording. **v0.8.0** extends the same
  structure to a further five companies — HDFC Bank, Reliance Industries,
  Titan, DMart (Avenue Supermarts) and Bharti Airtel — each on verified
  primary-source data (Q1 FY27 results, FY26 disclosures, broker consensus,
  live quotes). **v0.9.0** extends it to the top-27-by-market-cap generic
  reports (TCS, Infosys, HCLTech, SBI, ICICI Bank, HUL, ITC, Bajaj Finance,
  L&T, Maruti, Sun Pharma, Tata Motors, M&M, Kotak, Axis, NTPC, ONGC, Power
  Grid, Adani Ports, Coal India, Bajaj Finserv, Bajaj Auto, Siemens India,
  Nestlé, BEL, Adani Power, JSW Steel) — 33 bespoke notes total; note the
  Tata Motors demerger (listed entity is Tata Motors Passenger Vehicles) and
  Siemens' 18-month FY26 (Oct-2024→Mar-2026).
- **Problem:** Delivering a fully bespoke report for exactly one company
  without touching the framework every other company relies on (and without
  breaking the `reportToc` / `ReportToc` contract).
- **Options:** (a) parameterize/override `ReportContent` per company
  (complex conditional surface, fails the mandated layouts); (b) fork the
  generic component (drift risk, violates the "single source of truth"
  convention); (c) a typed, slug-keyed registry of bespoke notes with a small
  block renderer, falling back to the generic report for all other companies.
- **Decision:** (c). `src/lib/notes/types.ts` defines `ResearchNote` (a KV
  header strip + ordered sections of typed blocks: paragraph, heading,
  callout, KV grid, table, driver matrix, cards, list, quote, risk register,
  downloads, small print). One content file per bespoke company —
  `trent.ts`, `hdfc-bank.ts`, `reliance.ts`, `titan.ts`, `dmart.ts`,
  `bharti-airtel.ts` (v0.8.0) plus 27 more in v0.9.0: `tcs.ts`, `infosys.ts`,
  `hcl-technologies.ts`, `sbi.ts`, `icici-bank.ts`, `hul.ts`, `itc.ts`,
  `bajaj-finance.ts`, `bajaj-finserv.ts`, `lnt.ts`, `maruti.ts`,
  `sun-pharma.ts`, `tata-motors.ts`, `mahindra.ts`, `kotak.ts`, `axis.ts`,
  `coal-india.ts`, `bajaj-auto.ts`, `siemens.ts`, `nestle.ts`, `bel.ts`,
  `adani-power.ts`, `jsw-steel.ts`, `ntpc.ts`, `ongc.ts`, `power-grid.ts`,
  `adani-ports.ts` — and `src/lib/notes/index.ts` is the
  registry (`getNote`, `hasNote`, `noteToc`).
  `company/[slug]/page.tsx` branches once: note present → note + its TOC,
  note absent → generic `ReportContent` + `reportToc`. The analyst byline is
  omitted for note pages.
- **Reasoning:** One registry key + one conditional; `ReportContent` and the
  25-section framework are untouched for the other 100 companies; the block
  model is server-rendered and safe (no `dangerouslySetInnerHTML`); content is
  plain-typed data, auditable and printable.
- **Tradeoffs:** Two content renderers exist (generic + bespoke); a bespoke
  note intentionally deviates from ADR-006 evidence labels — it instead uses
  inline citations, `(E)` marks and a `Sources & downloads` section with
  primary-document links so provenance stays auditable.
- **Consequences:** Trent's `Company` row updated to verified primary-source
  figures (price ₹4,376, target ₹5,200, FY26 consolidated financials,
  Q1 FY27 results); note styling added (institutional blue-grey, responsive
  stacked table cards, print rules) in `globals.css`; v0.8.0 extended the
  verified-primary-source treatment to the five new notes and their
  `Company` rows (price/target/mcap/EPS/margin/ROE/thesis + `updatedDate`
  pinned to the note date); v0.9.0 repeated it for the 27 top-cap notes
  (live quotes as of 2026-08-07; Tata Motors row reflects the post-demerger
  TMPV entity; Siemens row reflects its 18-month FY26). Docs updated. DB mirror
  must be re-seeded after this change because `companies.ts` is the seed's
  source of truth (ADR-011).
- **Future review:** If more companies earn bespoke notes, grow the block
  vocabulary (chart blocks, bridges) via new ADRs rather than re-opening the
  generic framework.

---

## Backlog — decision candidates (not yet ADRs)

- **Proposed ADR:** Adopt Vitest for `src/lib` unit tests (task H3).
- **Proposed ADR:** Chart library strategy — pure SVG vs `recharts`
  (task H2; bias: pure SVG to respect ADR-001 dependency rule).
- **Proposed ADR:** Licensing decision (task L1).

---

*Index of ADRs: 001 platform · 002 data layer · 003 styling · 004 dark mode ·
005 report framework · 006 methodology · 007 synthetic financials ·
008 SSG/SEO · 009 docs governance · 010 logo assets · 011 Postgres mirror ·
012 bespoke research notes.*
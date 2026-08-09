# CHANGELOG.md

All meaningful changes to **Passive** are recorded here, semantically
versioned. Format: **Added / Changed / Fixed / Removed / Security**.

Version history:

- **0.11.0** — GQVM model v2.0 + live FY2026 portfolio (dashboard parity)
- **0.10.1** — parametric backtest + optimizer (dynamic weights, year dropdown)
- **0.10.0** — factor model pipeline, schema, screener + backtest pages
- **0.9.0** — bespoke notes ×27 (top market caps; 33 total)
- **0.8.0** — bespoke notes ×5 (HDFC Bank, Reliance, Titan, DMart, Airtel)
- **0.7.0** — bespoke Trent research note (institutional redesign)
- **0.6.0** — Postgres mirror + read-only JSON API
- **0.5.3** — dark default + homepage refinement
- **0.5.2** — homepage polish pass
- **0.5.1** — homepage redesign
- **0.5.0** — UI audit & design-system overhaul
- **0.4.0** — stock logos
- **0.3.1** — deployment wiring + auto-commit policy
- **0.3.0** — documentation system
- **0.2.0** — institutional content upgrade
- **0.1.0** — Next.js conversion + full site build (baseline)

---

## [0.11.0] — 2026-08-09

Migrated the factor platform to the **GQVM Factor Dashboard** model
(`GQVM Factor Dashboard.xlsx`, repo root, not committed) — v2.0 per
`docs/FACTOR_MODEL.md` — with **full parity against the dashboard's own
cached outputs** (validation gates at 1e-9), the **live FY2026 portfolio**
and FY2026 GQVM scores on every company page.

**Added**:

- **Import validation gates** — `scripts/factor-model/import.ts` now
  recomputes composites, top-20 portfolios, annual strategy + benchmark
  returns and the full stats suite from the workbook and compares them
  with the dashboard's cached values before writing: rank match
  **5,656/5,656 (100%)**, composite max abs diff 1.1e-16, top-20 RICs
  **13/13 years**, annual returns **13/13 years**, NAV max abs diff
  2.3e-13, CAGR/vol/Sharpe/MDD/hit-rate/IR all equal (CAGR 18.14%,
  Sharpe 0.622, NAV 873.33). Any check failing within 1e-9 aborts the
  DB writes; the live FY2026 top-10 is printed on every run.
- **Live FY2026 portfolio** — `/backtest` shows a "live FY2026" panel
  with the current top-20 (BMBK.NS 0.8527, JKBK.NS, UNBK.NS, CHPC.NS,
  NALU.NS, SCI.NS, WGSR.NS, BOI.NS, GENA.NS, PNBK.NS, …); a
  `bt-live-badge` styles the panel.
- **MinFactors control** — `FactorBacktestRunner` gains a MinFactors
  select (1..4); the engine/API validate it.
- **Benchmark from DB** — `factor_benchmark` table (Nifty 50 PRICE
  index annual returns, end-June closes) feeds the backtest benchmark;
  the API returns it per year; equal-weight-universe fallback retained.
- **FY2026 scorecards** — every `/company/[slug]` scorecard now shows
  the live FY2026 GQVM composite/rank (year-dynamic data layer).

**Changed**:

- **Model spec (v2.0)** — universe = `Nifty500_Composition` per-year
  membership × `Coverage_Map` "Covered" × `Companies` (deduped), sizes
  381..496 per year FY13–FY26; metrics = 23 fundamental + momentum
  recomputed 1-year from `Price_Close` (52W sheet ignored); percentile =
  `COUNTIF(< v)/(n−1)` exactly like the dashboard (minimum scores 0);
  block score = mean of available metric percentiles; composite =
  renormalized weighted mean over available blocks; ranked only with ≥3
  block scores; ties by RIC.
- **Defaults pinned to the dashboard's recommended GQVM config** —
  weights **G 0.2 / Q 0.1 / V 0.6 / M 0.1**, all 24 metrics, minN 2,
  minFactors 3, topN 20 (was Valuation 1.0 / P/E-only / MinN 50 from the
  v0.10.1 optimizer). `POST /api/factor/backtest` defaults and the UI
  match; `OPTIMIZER_SUMMARY` now carries the engine-computed stats of the
  recommended config.
- **Optimizer rewritten exploration-only** — `npm run factor:optimize`
  searches block weights → metric inclusion → MinN×Top-N → refined
  weights over the workbook data (best informational: G0.2/Q0.1/V0.6/M0.1,
  minN 2, topN 10, Revenue-3Y-CAGR/ROE/P-BV only, mean 26.03% vs 12.59%,
  excess +13.44%) but **reports only** — written defaults stay pinned to
  the dashboard-validated GQVM config.
- **Snapshot** — scored years now **FY13–FY26** (FY12 has prices only):
  `data.ts` 6,150 rows (was 7,692 FY12–FY26); `backtest.ts` 13 years ×
  20 = 260 constituents; per-year scored counts 366..494.
- **Derived tables rebuilt** — `factor_composites`, `factor_scores`,
  `universe_membership` are DELETEd and reinserted on every import so no
  stale rows from v1.0 (e.g. FY12 × 900) survive; backtest tables were
  already rebuilt.
- Screener/backtest/scorecard copy now states the GQVM weights, FY13+
  history and the "research universe" framing; live year noted on
  scorecards.
- `docs/FACTOR_MODEL.md` rewritten for v2.0 (spec + validation gates);
  `docs/ARCHITECTURE.md` factor-layer section updated.

**Fixed**:

- **Engine block-presence bug** — a block was considered missing when its
  weighted score was 0, so a legitimate 0 percentile (worst-in-universe,
  e.g. LVLS.NS^L20 momentum FY15) dropped the block from the composite
  renormalization and inflated scores (0.8200 vs dashboard 0.7379),
  corrupting the FY15 top-20. Blocks now count as present when any metric
  percentile exists, even 0.
- **Dashboard portfolio loader offset** — portfolios were read starting
  at row 4 but the FY2013 block starts at row 2, skipping ranks 1–2
  (ALOK.NS, SNTX.NS^C23) during validation; now reads from row 2.
- **Year-key bug** — `yearRaw − 2000` in the import's portfolio loader
  produced a bad year for validation lookups.

**Tests** — `tests/factor/engine.test.ts` rewritten for the
COUNTIF/(n−1) percentile (incl. lower-better inversion, worst = 0),
zero-percentile block presence (topN 6 still ranks the composite-0
holding), minN 7 → empty constituents, GQVM default exact-match;
`tests/factor/snapshot.test.ts` covers FY13–FY26 with RELI FY26 = 0.5656
— **20 tests green**. Lint clean, build green, live DB import + snapshot
verified.

## [0.10.1] — 2026-08-08

**Added** the **parametric backtest** (dynamic weights + optimizer):

- **Shared backtest engine** — `src/lib/factor/engine.ts` (pure, no I/O):
  `runFactorBacktest` takes factor weights (G/Q/V/M), per-metric weights
  (0 = excluded, renormalized within block), MinN and Top-N as parameters;
  `buildPercentileCache` precomputes per-metric percentiles per MinN so
  thousands of parameter runs reuse one cache. One implementation feeds
  import/seeding, the live API and the page — numbers always agree.
- **Default-parameter optimizer** — `npm run factor:optimize`
  (`scripts/factor-model/optimize.ts`): grid search over block weights
  (0..1, step 0.25), per-block metric inclusion (defaults/single/leave-one-
  out), MinN (50–150) and Top-N (10–30) maximizing the mean portfolio
  return over FY13–FY25, staged with the percentile cache (~10k candidate
  runs in under a minute). Writes `src/lib/factor/params.ts`
  (`DEFAULT_BACKTEST_PARAMS`, `FACTOR_METRICS`, `OPTIMIZER_SUMMARY`).
  **Result:** Valuation 1.0 / P/E only / MinN 50 / Top-20 → mean portfolio
  **25.47%** vs benchmark **12.07%** (excess +13.40%). (In-sample
  caveat documented in `docs/FACTOR_MODEL.md` §6.2.)
- **`POST /api/factor/backtest`** — dynamic server route: validates caller
  parameters (block weights 0–10, metric weights 0–10, minN 20–500, topN
  1–100; unspecified metric weights merge over model defaults), runs the
  engine on the DB mirror, returns yearly results + constituents + mean
  stats; 400 on invalid input, 503 without a configured DB.
- **`/backtest` page rework** — `FactorBacktestRunner` client component:
  sliders for the four factor weights, per-metric on/off chips grouped by
  factor, MinN/Top-N selects, Run/Reset buttons, summary cards, yearly
  table (FY13–FY25) and a **year dropdown** (FY2025…FY2013) to view each
  portfolio — no long scrolling. Renders the static snapshot instantly and
  upgrades to live runs when the DB is available.
- **Changed:** backtest signal years are now **FY13–FY25** — FY2012
  returns and portfolio removed by design (it predates the Nifty500
  membership universe). `backtest_years`/`backtest_constituents` are
  derived tables, DELETEd and rebuilt on every import (no stale rows);
  snapshot now 13 years × 20 = 260 constituents. `scripts/factor-model/
  backtest.ts` (fixed-weights) removed in favor of the engine.
- **Tests:** `tests/factor/engine.test.ts` (percentile ties, Top-N
  selection, momentum from prices, MinN gating + RIC tiebreak, IC
  N≥30 threshold, cache equivalence, default-params sanity) — 18 tests
  green. `docs/TESTING.md`, `docs/FACTOR_MODEL.md` (§6.1/§6.2),
  `docs/DATA_MODEL.md`, `docs/ARCHITECTURE.md`, `docs/TASKS.md` updated.
  Lint clean, tests green, build green.

## [0.10.0] — 2026-08-08

Added the **factor-model data platform**: imports the NSE-900
`Factor-Dashboard-v4_Unbiased.xlsx` workbook into a normalized Supabase schema
(`db/factor_model.sql`: factor_companies/years/metrics/values/price_history/
scores/composites/universe_membership/backtest_years/backtest_constituents),
with a reproducible `tsx` pipeline (`npm run factor:import`) that corrects the
workbook's buggy momentum (Price_Close_HY% was 2-year; recomputed as
1-year `close_t/close_t-1 − 1`, RELI FY14 = 13.62%) and formalizes the
backtest as **Top-20 equal-weight** (signal at FY-end close, exit at FY+1
close, Spearman IC with N≥30) per `docs/FACTOR_MODEL.md`. Validated against
workbook values (RELI P/E FY12 10.30 = sheet value). A build-time snapshot
(`src/lib/factor/data.ts`, 7,692 rows across FY12–FY26) feeds the new
**`/screener` page** (static SSG, per architecture rule "pages never depend on
the DB"): year selector, search, min-composite and min-block filters,
sortable rank/composite/G/Q/V/M columns, CSV export, links to covered company
pages (132/133 site slugs resolved via Coverage_Map + verified MANUAL_RIC;
SKF India not in the NSE-900 universe). A second snapshot
(`src/lib/factor/backtest.ts`: 14 years, 280 constituents) feeds the new
**`/backtest` page**: yearly portfolio/benchmark/excess returns, IC,
universe size, and per-year Top-20 constituents. Company pages now carry a
**factor scorecard** (`FactorScorecard`): the covered company's composite +
G/Q/V/M block scores and rank for every FY12–FY26, plus realized Top-20
returns (hidden for companies outside the NSE-900 universe, e.g. SKF India).
**Vitest adopted** (`npm test`, `vitest.config.mts`, `tests/factor/`): 9
snapshot-integrity + lookup tests for the factor layer (partial H3). Nav +
sitemap updated; lint clean, tests green, build green (176 pages).

## [0.9.0] — 2026-08-07

Extended the bespoke-note layer (ADR-012) to the **top 27 companies by market
cap**, converting their generic 25-section reports into bespoke institutional
notes — **33 of 133 reports are now bespoke** (Trent + the six from v0.8.0 +
these 27).

### Added
- 27 bespoke notes in `src/lib/notes/`: `tcs.ts`, `infosys.ts`,
  `hcl-technologies.ts`, `sbi.ts`, `icici-bank.ts`, `hul.ts`, `itc.ts`,
  `bajaj-finance.ts`, `bajaj-finserv.ts`, `lnt.ts`, `maruti.ts`,
  `sun-pharma.ts`, `tata-motors.ts`, `mahindra.ts`, `kotak.ts`, `axis.ts`,
  `ntpc.ts`, `ongc.ts`, `power-grid.ts`, `adani-ports.ts`, `coal-india.ts`,
  `bajaj-auto.ts`, `siemens.ts`, `nestle.ts`, `bel.ts`, `adani-power.ts`,
  `jsw-steel.ts`.
- All 27 notes on verified primary-source data (Q1 FY27 results, FY26
  disclosures, consensus, live quotes fetched 2026-08-07 directly from
  stockanalysis.com — Yahoo v7 API 401, web-search rate-limited).
- Handled structural changes: **Tata Motors** demerged by Nov-2025 — the
  listed entity is Tata Motors Passenger Vehicles (NSE:TMPV, ₹345.90, mcap
  ~₹1.27 lakh Cr) with CV separately listed; **Siemens India**'s FY26 is an
  18-month period (Oct-2024→Mar-2026, revenue ₹16,787 Cr, OPM ~10%, net cash
  ₹53,094 Cr, backlog ~₹45,000 Cr) — Q1 FY27 due 11-Aug, not yet reported.
- All 27 `companies.ts` rows updated to verified figures (price/target/mcap/
  FY26 revenue/PAT/margin/ROE/P/E/thesis) and added to the `updatedDate`
  pinned-2026-08-07 list. Verified values e.g. TCS Buy ₹2,650 (₹2,455),
  Infosys Buy ₹1,320 (₹1,175), HCLTech Accumulate ₹1,500 (₹1,356.6), SBI Buy
  ₹1,230 (₹1,098), ICICI Buy ₹1,680 (₹1,420), Kotak Accumulate ₹460 (₹385),
  Axis Accumulate ₹1,350 (₹1,102), HUL Accumulate ₹2,260 (₹2,078), ITC
  Accumulate ₹320 (₹289), Bajaj Finance Buy ₹1,175 (₹1,060), L&T Accumulate
  ₹4,497 (₹4,040), Maruti Accumulate ₹16,000 (₹13,984), Sun Pharma Buy
  ₹2,167 (₹1,946), M&M Buy ₹4,100 (₹3,468.3), Bajaj Auto Accumulate ₹12,500
  (₹11,856), Siemens Accumulate ₹4,300 (₹3,938), Nestlé Accumulate ₹1,592
  (₹1,535), BEL Buy ₹465 (₹390), Adani Power Accumulate ₹252 (₹209), JSW
  Accumulate ₹1,378 (₹1,298), NTPC Accumulate ₹400 (₹344.3), ONGC Buy ₹295
  (₹237.3), Power Grid Buy ₹325 (₹271.6), Adani Ports Buy ₹1,950 (₹1,690).

### Changed
- `docs/ARCHITECTURE.md` (§3 layout + §10.1), `OPENCODE.md`, `docs/TASKS.md`,
  `docs/ROADMAP.md` and `docs/DECISIONS.md` (ADR-012) updated to the 33-note
  bespoke set.

### Fixed
- Various note authoring errors surfaced by `tsc --noEmit`: missing trailing
  commas, stray keys (`essence`) violating the driver-row contract, typo'd
  `monetary` → `monitor`, malformed KV pairs, unbalanced parentheses.

Verified with `npm run lint` (clean), `npm run build` (174 static pages), and
a dev-server smoke pass — all 27 note pages return 200 with the note body
("What changed") present.

---

## [0.8.0] — 2026-08-07

Extended the bespoke-note layer (ADR-012) from Trent to **five more large-cap
reports — HDFC Bank, Reliance Industries, Titan, DMart (Avenue Supermarts) and
Bharti Airtel** — each rebuilt on verified primary-source data with the same
institutional structure as the Trent note. The generic 25-section framework
and all other company reports remain untouched.

### Added
- Bespoke notes in `src/lib/notes/`: **`hdfc-bank.ts`** (Q1 FY27 PAT
  ₹19,060 Cr, NIM 3.26%/3.40%, GNPA 1.17%, RoE 14.1%), **`reliance.ts`** (Q1
  FY27 record quarter, ₹3.40 lakh Cr gross revenue, Jio DRHP filed, net cash
  ₹2.46 lakh Cr), **`titan.ts`** (FY26 income ex-bullion ₹76,078 Cr +33%,
  PAT ₹5,073 Cr +52%, EBIT margin 10.6%, Damas consolidation) and
  **`dmart.ts`** (Q1 FY27 revenue +14.9%, EBITDA 8.3%, mature-store LFL +5.5%)
  and **`bharti-airtel.ts`** (Q1 FY27 PAT ₹8,167 Cr +37%, ARPU ₹264, Africa
  stake >79%).
- Registered all five in `src/lib/notes/index.ts` — `getNote`/`hasNote`/
  `noteToc` now serve 6 bespoke slugs.
- Updated the corresponding rows in `src/lib/companies.ts` to verified
  primary-source figures (price, target, market cap, FY26 revenue/PAT, margin,
  ROE, P/E, thesis) and pinned their `updatedDate` to the note date.

### Changed
- `docs/ARCHITECTURE.md`, `OPENCODE.md`, `README.md` and `docs/TASKS.md`
  updated to reflect the six-note bespoke set.

Verified with `npm run lint` (clean), `npm run build` (174 pages green), and a
dev-server smoke pass (`/company/hdfc-bank`, `/company/reliance-industries`,
`/company/titan`, `/company/avenue-supermarts`, `/company/bharti-airtel` all
200 with the note body present).

---

## [0.7.0] — 2026-08-07

Redesigned and rewrote the **Trent** report end-to-end as a bespoke
institution-grade research note (MD/GS/UBS style) via a new bespoke-note
layer (ADR-012), while leaving the generic 25-section framework and the other
132 reports untouched.

### Added
- **`src/lib/notes/`** (`ADR-012`): typed block model (`types.ts`),
  Trent content (`trent.ts`), slug registry (`index.ts` — `getNote`,
  `hasNote`, `noteToc`). Note structure: What changed / Variant perception /
  Three investment drivers / Business inflection point / Catalysts / Three
  evidence-linked theses / Business overview / Business model / Revenue
  breakdown / Geographic mix / Segment analysis / Management / Industry /
  Competitive positioning / Shareholding pattern / Financial analysis /
  Forecasts / Consensus / Valuation / Risk register / Sources & downloads.
- **`src/components/ReportNote.tsx`** — server-side block renderer (KV strip,
  callouts, tables, driver matrix, cards, risk register, downloads) with a
  `**bold**` inline parser (no MD dep).
- **`src/app/company/[slug]/page.tsx`** — one branch: note present →
  `ReportNote` + note TOC; else generic `ReportContent` + `reportToc`. Analyst
  byline omitted on note pages.
- **Verified primary-source dataset for Trent** — FY22–FY26 consolidated
  financials, FY25/FY26/Q1-FY27 store data, shareholding pattern
  (promoter 37.01%), consensus (in.marketscreener avg target ₹4,832),
  Marketscreener multiples. Trent's `Company` row updated to these figures
  (price ₹4,376, target ₹5,200, mcap ₹155,600 Cr, FY26 revenue ₹20,074 Cr,
  PAT ₹1,721 Cr, EPS 90x, ROCE 36.5%).
- **Institutional styling** — `.note-*` classes (navy-blue-grey accent tokens
  + dark overrides), responsive tables that become labelled stacked cards
  below 760px (no horizontal scroll), probability-labelled risk cards, and
  `@media print` rules.

### Changed
- Responsive report tables: generic `.table-wrap/.fin-table` unchanged;
  bespoke tables are new `.note-table` (stacking on mobile).
- docs updated: ARCHITECTURE (§3/§8/§9/§10.1), COMPONENTS (`ReportNote`),
  DECISIONS (ADR-012), TASKS, CHANGELOG, OPENCODE, README.

### Fixed
- n/a.

### Removed
- Generic 25-section layout, analyst byline, evidence legend, and
  AI-sounding wording for the Trent page only (others untouched).

### Security
- no `dangerouslySetInnerHTML` added; note content is typed data rendered
  via React components; external source links open in new tabs with
  `rel="noopener noreferrer"`.

---

## [0.6.0] — 2026-08-07

Connected a Supabase Postgres database to the project and stored the full
equity-research dataset (133 companies, 23 sectors, 3,325 report sections)
in it, behind a hybrid store that falls back to the static modules when the
DB is unavailable. Pages remain SSG and DB-independent (ADR-011).

### Added
- **Postgres mirror** (`ADR-011`): Supabase instance at
  `db.aeondocnbprzdivhzjuv.supabase.co`; idempotent schema `db/schema.sql`
  (`sectors`, `companies` with 22 snake_case fields + `author` + rating
  `CHECK` + real FK to sectors, `report_sections` with JSONB content);
  seeder `scripts/db/seed.ts` (`npm run db:seed`, run via `tsx`) —
  truncates and batch-inserts all tables. Verified live:
  `{ sectors: 23, companies: 133, report_sections: 3325 }`.
- **`src/lib/db.ts`** — server-only (`import "server-only"`) lazy `pg.Pool`
  singleton (`max: 4`, `connectionTimeoutMillis: 5000`, TLS with
  `rejectUnauthorized: false`); `isDbConfigured()`, `pingDb()`,
  `queryText<T>()`, `withClient<T>()`. URL must not carry `sslmode` (pg
  aliases `require` → `verify-full`, which rejects Supabase's cert chain).
- **`src/lib/store.ts`** — hybrid loaders (`getAllCompanies`,
  `getAllSectors`, `getCompanyBySlug`, `getReportSections`, `getDbStatus`):
  try DB first, fall back to the bundled static arrays; memoized per process.
- **Read-only JSON API** (dynamic route handlers):
  - `GET /api/health` — DB status + row counts.
  - `GET /api/companies` — full `Company[]` + `Sector[]`.
  - `GET /api/companies/[slug]` — one company + its 25 report sections;
    404 JSON on unknown slug.
- Runtime deps `pg` + `server-only`; dev deps `@types/pg`, `tsx`.

### Changed
- Docs rewritten for the two-layer data story: `docs/DATABASE.md` (mirror
  schema, seed, hybrid store), `docs/API.md` (§7 live JSON API),
  `docs/SECURITY.md` (parameterized SQL, secrets, dependency policy),
  `README.md` (stack/env/scripts/folders), `OPENCODE.md`, ADR-011 appended
  to `docs/DECISIONS.md`.

### Fixed
- `sslmode`-in-URL connection failure ("self-signed certificate in
  certificate chain") — TLS config moved to code; verified live
  `OK ... postgres`.

### Removed
- n/a.

### Security
- SQL is parameterized only; `DATABASE_URL` lives in gitignored `.env.local`
  + Vercel env (never in source); the API is read-only GET; DB failure
  degrades to static data, never an error page.

---

## [0.5.3] — 2026-08-06

Clarity, hierarchy and dark-mode-first pass over the homepage. No redesign —
branding, layout, components and content unchanged.

### Added
- **Dark mode is now the default.** `beforeInteractive` theme-init inline
  script in `app/layout.tsx` applies the saved `passive-theme` preference
  before first paint (no FOUC); first-time visitors get dark, returning
  visitors get their saved choice. `color-scheme` set on `:root`/`.dark` so
  scrollbars and native form controls match the theme; `themeColor` viewport
  now `#0b1220`.
- **Theme toggle icons fixed on desktop** — sun/moon swap rules were trapped
  inside the `≤980px` media query (both icons showed side-by-side on desktop);
  moved to base rules next to `.theme-toggle`.

### Changed
- **Hero decluttered**: removed the "133 Indian Companies · 23 Sectors ·
  Independently Rated" badge and the "Popular:" search chips; hero heading
  moved up, stats pulled closer (`margin-top 24px`, divider `20px`) so the
  block reads badge-less yet balanced; `HeroPreview` untouched.
- **Latest research → aligned table**: rows now a fixed-column CSS Grid
  (`44px | 1fr | 92px | 72px | 88px | 88px` — logo, name/ticker + sector/mcap,
  right-aligned price, right-aligned upside, centered badge, right-aligned
  date); all rows share identical column tracks for perfect vertical
  alignment; tabular numerals throughout; `18px` row padding; subtle
  `--bg-soft` hover.
- **Mobile latest research → dedicated card layout** (not a shrunk table):
  grid areas `logo/main/price / main/upside / badge/time`; nothing hidden —
  ticker, sector and market cap all visible, meta wraps instead of
  truncating, 44px logo, 16px padding, clean row separators.

### Fixed
- `.lr-meta` was clipping sector/mcap on mobile; now wraps.
- `.mobile-menu.open` rule was accidentally dropped while relocating the
  theme-icon rules — restored.
- Unused `POPULAR_SEARCHES`/`popularLink` removed from `page.tsx`.

### Removed
- Hero badge, hero quick-link chips, their CSS (`.hero-badge`,
  `.hero-quick-links`, `.ql-label`).

---

## [0.5.2] — 2026-08-06

Polish pass over the existing homepage (no redesign): tightened spacing,
elevation, radii, and typography to a stricter token scale; refined nav,
hero, market strip, sector cards, company cards, and the recent-reports
list for a cleaner, more deliberate take.

### Added
- Directive-radius tokens: `--radius-btn` (14px), `--radius-input` (16px),
  `--radius-card` bumped to 18px, `--radius-lg` → 14px, `--radius-md` → 10px.
- Semantic elevation aliases `--elevation-low/medium/high` (3 tiers only);
  `--shadow-card`/`--shadow-hover` now resolve to them.
- `--type-section` fixed at 40px (+ `--type-section-clamp`) and
  `--type-card-title` (20px) for consistent headings/card titles.

### Changed
- **Nav**: 72px height that shrinks to 62px on scroll (with transition);
  `.active` link gets an animated `::after` underline + accent tint; hover
  is text-color only; `btn-nav` 40px min-height + elevation; logo mark 40px
  with glow shadow removed.
- **Mobile menu**: top follows 72/62px header, `menuIn` animation (typo'd
  `menu-in` removed), 44px touch targets.
- **Hero**: reduced padding (`56px` top / `40px` bottom), headline tightened
  to `14ch` max-width, submax `62ch`; search bar taller with `--radius-input`,
  focus ring + stronger border; quick-link chips 36px min-height; stats now a
  start-aligned 4-col grid with 36px numerals and `--space-8` gaps.
- **Market strip**: premium ticker styling — right-aligned value/change,
  reduced sizes, dividers between items, hidden UM label on mobile.
- **SectorCard**: 56px icon chip (28px icon), 20px title
  (`--type-card-title`), 2-line clamped description, min-height 192px,
  18px radius via token.
- **CompanyCard**: 20px title, 2-line thesis clamped, lighter divider, hover
  no longer recolors border (uses `--border-strong` + elevation); stats 14px,
  upside 15px/800; badges equal-width via `min-width` (sm 64 / md 76 / lg 92).
- **Latest research**: rows converted from flex to a 5-column CSS Grid
  (logo · identity · price/upside · badge · time); row dividers re-done to
  clean separators; time hidden ≤980px; name/subdownsized on mobile.
- **CTA band**: 72px padding, `--type-section-clamp` heading, 48px CTA button
  with `--elevation-high`, tightened paragraph/actions.
- **Footer**: newsletter input uses `--radius-input` + `--border-strong`,
  14px link type.
- Responsive breakpoints tightened: hero 2×2 stats ≤720px; `.section` mobile
  `64px 18px`; `.section-head` gap 12px; mobile search radius tokenized.

### Fixed
- `.latest-row` duplicate top border (`.latest-row` + `.is-group-start`
  conflict) — group start no longer double-divided.
- Stale `--shadow-md` refs on hero preview card + floating pill → elevation
  aliases.

### Removed
- (none)

---

## [0.5.1] — 2026-08-06

### Added
- **`HeroPreview`** — desktop-only report-card illustration (Trent: logo,
  rating, CSS bar chart, current/target/upside, floating target pill)
  giving the hero a research-preview anchor.
- **`LatestList`** — "Recently Updated Reports" as a grouped timeline (Today /
  Yesterday groups), logo · name/ticker · industry+mcap · price/upside ·
  rating · updated.
- **Market snapshot strip** (`NIFTY 50`, `SENSEX`, `BANK NIFTY`, `INDIA VIX`,
  `USD/INR`) below the hero with tabular-nums + directional colors.
- **Hero quick links** — "Popular:" pill chips (HDFC Bank, TCS, Titan, Trent,
  ICICI Bank) deep-linking to company/research pages.
- **CTA band** — "See the Methodology" secondary button + eyebrow +
  grid-texture overlay.
- **Footer** — weekly-digest newsletter form (GET → /contact), social icons
  (X, LinkedIn, GitHub), restructured legal links in the bottom bar,
  larger footer logo, `1280px` container.

### Changed
- **Single site-wide container**: `--container: 1280px` applied to nav,
  sections, footer, report-layout (was mixed 1240/1400).
- **Hero redesign**: two-column desktop layout (`copy + HeroPreview`),
  reduced vertical whitespace (72px → 48px bottom), `--type-hero`
  clamp(52–64px), stats bumped to 38px tabular numerals with uppercase
  labels and top divider.
- **SectorCard**: 26px icon in 52px accent chip (hover: scale + accent fill),
  "{n} Companies" pill, "{n} Reports · Updated X" footer, accent hover
  border + lift.
- **CompanyCard**: logo normalized to 44px (40px compact), upside emphasized
  with `.stat-upside` (16px), stats divider `--border-strong`, accent hover
  border.
- **Featured grid**: capped at 4 columns/row (no 5-col ultra-wide).
- **Mobile (≤480px)**: sector + company grids become horizontal scroll-snap
  carousels; hero single column, reduced padding, 30px stats.
- **Nav**: links 15px, `40px` hit targets, prominent accent `btn-nav` CTA
  with shadow.
- **Rating palette**: `Hold` → gray (was amber) for consistent semantics;
  `.rating-hold` dark override added.
- **Section titles/spec** `--type-section` clamp(32,4vw,40px); `gutter`
  token drives page padding.

### Fixed
- Home hero no longer "empty" — preview card + quick links fill the
  450–500px whitespace.
- Inconsistent max-widths across sections unified to 1280px.

### Removed
- `hero-waves` SVG divider (replaced by market strip).
- Left-aligned centered 820px hero; footer `footer-dot` rule.

### Security
- Newsletter form is a GET to `/contact` (no data persisted server-side);
  social links use `rel="noopener noreferrer"`.

---

## [0.5.0] — 2026-08-06

### Added
- **`docs/UI_AUDIT.md`** — application-wide UI/UX audit report (system,
  company-card, badge, responsive, a11y findings) with status tracking.
- **Design tokens** in `globals.css`: spacing scale (`--space-1..16`),
  radius scale (`--radius-sm/md/lg/card/pill`), elevation scale
  (`--shadow-xs/sm/md/lg`, `--shadow-card/hover` now map to it), type scale
  (`--type-xs..5xl`), and `--gap-grid` (24/20/16px responsive gutters).
- `tabular-nums` on all numeric surfaces (`.stat-value`, `.kv-item b`,
  `.report-quick-stat b`, `.fin-table td`, `.sc-target`) — no price jitter.
- Global `:focus-visible` rings, `:target` scroll-margin, `.empty-state`
  pattern, `prefers-reduced-motion` hardening (existing rule kept).

### Changed
- **Cards**: radius 15→20px, padding → `--space-5`, gap → `--space-3`;
  `.company-thesis` clamps 3 lines (was 2); `.company-stats` bottom-anchored
  (`margin-top: auto`) → equal-height cards in a row; hover lift 0.18→0.14s.
- **Grids**: mobile-first column counts — companies/sectors 1 → 2 (≥480) →
  3 (≥768/≥1100) → 4 (≥1280) → 5 (≥1600); `.section-inner` 1240→1400px for
  ultra-wide density.
- **Badges**: fixed heights per size (24/30/38px) instead of padding-based.
- **Buttons/inputs**: 12px radius standard (`.btn`, `.search-bar`,
  `.search-btn`, `.table-wrap`, `.kv-item`, `.scenario-card`, `.peer-card`);
  `.btn`/`.search-btn`/`.filter-pill` min-height 44px; `.theme-toggle` 40→44px;
  nav links ≥44px hit area.
- **Contrast**: `--text-45` 0.45 → 0.58 alpha — WCAG AA for small text on
  both themes.
- **Hard-coded universe counts removed**: home hero badge, home/research/
  about metadata, layout metadata, footer now render live `companies.length`
  / `sectors.length` (133/23).
- `ResearchBrowser` empty state → `.empty-state`; search results dropdown
  `max-height: min(420px, 70vh)` + `overscroll-behavior: contain`.

### Fixed
- Home hero badge displayed stale "117 Indian Companies" (now dynamic 133).
- Cards capped at 3 columns even on 1920px screens (now 4–5 across).

### Removed
- n/a.

### Security
- No new external dependencies; logos remain local static assets.

---

## [0.4.0] — 2026-08-06

### Added
- Real company logos for all 133 companies, sourced from Dhan's stock-logo
  CDN (`https://images.dhan.co/symbol/<NSE_TICKER>.png`), stored locally in
  `public/logos/` (133 PNGs).
- `CompanyLogo` now renders the image-first with the previous
  gradient-initials square as an automatic fallback (client component,
  `onError` swap; `next/image` + `unoptimized`).

### Changed
- `src/components/CompanyLogo.tsx` — now `"use client"`; renders
  `/logos/<ticker>.png` with initials fallback.
- `src/app/globals.css` — `.company-logo` gets `overflow: hidden` and a light
  backdrop; new `.company-logo img` rule (`object-fit: contain`, white
  padding backdrop, `padding: 12%`).
- Corrected stale universe count in docs: **133 companies** (not 117) across
  README, ARCHITECTURE, COMPONENTS, DATABASE, API, DECISIONS, DEPLOYMENT,
  ROADMAP, OPENCODE.
- `CompanyLogo` is now the 6th client component (COMPONENTS.md summary
  updated).

### Fixed
- n/a.

### Removed
- n/a.

### Security
- Logos are static assets committed to the repo; no external image requests
  at runtime (privacy/performance win, no CDN dependency).

---

## [0.3.1] — 2026-08-06

### Added
- **Auto-commit & auto-deploy policy**: every change is committed and pushed
  to `main` immediately; Vercel (connected to the GitHub repo
  `AjithSrikumar/passive-research`) auto-deploys on every push. Policy codified
  in `OPENCODE.md` ("Commit & Deploy Policy"), `AGENTS.md` pointer, and
  `docs/DEPLOYMENT.md`.
- Live production deployment verified: `https://passive-research.vercel.app`
  returns 200 on `/`, `/methodology`, `/company/hdfc-bank`, `/sitemap.xml`.

### Changed
- `OPENCODE.md`: workflow step 7 = commit & push (no longer "don't commit
  unless asked"); shutdown checklist includes commit + post-deploy check.
- `docs/DEPLOYMENT.md`: CI/CD section updated from "none" to Vercel
  GitHub-integration auto-deploy.

### Fixed
- n/a.

### Removed
- n/a.

### Security
- n/a (unchanged).

---

## [0.3.0] — 2026-08-06

### Added
- Full documentation system: `README.md` (rewritten from boilerplate),
  `OPENCODE.md` (AI session file), and `docs/ARCHITECTURE.md`,
  `docs/DECISIONS.md`, `docs/TASKS.md`, `docs/CHANGELOG.md`, `docs/ROADMAP.md`,
  `docs/DATABASE.md`, `docs/API.md`, `docs/COMPONENTS.md`, `docs/STYLING.md`,
  `docs/TESTING.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY.md`.
- `AGENTS.md` pointer block instructing agents to read `OPENCODE.md` and the
  docs (kept outside the auto-generated Next.js rules block).

### Changed
- `README.md` now documents the product, stack, scripts, folder map, docs
  index, limitations, and roadmap pointers instead of the create-next-app
  boilerplate.

### Fixed
- n/a (documentation-only release).

### Removed
- n/a.

### Security
- n/a (documentation-only). Security posture documented in
  `docs/SECURITY.md`.

---

## [0.2.0] — 2026-08-06

### Added
- Institutional report content per the *Institutional Equity Research Manual*
  (2026 edition), applied across all 133 company pages:
  - Decision-first Executive Summary (rating/target/implied + total return,
    "why now", "what is priced in", three drivers, falsifier).
  - Thesis map (Driver | Evidence | Model impact | Signpost | Failure test),
    moat scorecard, risk register, catalyst register.
  - Reverse-DCF "what is priced in" table, 2-assumption sensitivity grid,
    bull/base/bear scenario cards (25/50/25), probability-weighted target
    check.
  - Evidence labels `[F] [M] [E] [I]` and `(E)` estimate markers; source
    policy (screener.in primary; in.marketscreener.com for consensus).
- New report helpers in `src/lib/report.ts`: `scenarioCases`, `weightedTarget`,
  `pricedInAnalysis`, `totalReturnPct`, `impliedEps`, `round1`.
- New CSS: evidence tags (`.evidence`, `-f/-m/-e/-i` variants) and scenario
  cards (`.scenario-cards`, `.scenario-card`).
- Rewritten `src/app/methodology/page.tsx`: decision-first framework, the
  25-section roles map, the institutional test, evidence classification table,
  source policy, valuation framework (60/40 DCF–peer, reverse DCF, scenarios),
  rating scale, risk/catalyst standards, ESG materiality, independence.

### Changed
- `src/components/ReportContent.tsx` rewritten section-by-section (all 25
  sections, ids and `data-report-section` anchors preserved) to
  institutional-grade language.
- Rating/valuation text now includes dividends in expected total return.

### Fixed
- Typo/consistency fixes in methodology prose.

### Removed
- Generic "five-pillar thesis" boilerplate in favor of the driver-based thesis
  map.

### Security
- n/a.

---

## [0.1.0] — 2026-08-06 (baseline snapshot; conversion completed in earlier sessions)

### Added
- Full Next.js 16 (App Router, TypeScript, Turbopack) conversion of the
  Docify-based site into **Passive**:
  - Data layer: `src/lib/companies.ts` (133 companies, `Company` interface,
    helpers: `getCompany`, `getCompaniesBySector`, `getPeers`,
    `sortByRating`, `sectorCompanyCount`, `latestSectorUpdate`, formatters
    `formatCr` / `formatIndian` / `formatPrice` / `formatUpdated`),
    `src/lib/sectors.ts` (23 sectors), `src/lib/report.ts` (25-section
    `reportToc`, financial history/forecast math, reading time, rating
    language).
  - Routes: `/`, `/research`, `/latest-research`, `/coverage-universe`,
    `/sectors`, `/sectors/[slug]`, `/company/[slug]` (SSG,
    `dynamicParams=false`), `/about`, `/methodology`, `/contact`, `/legal`,
    `/terms`, `/privacy`, custom `/not-found` (404).
  - Components: `Nav`, `Footer`, `ThemeToggle`, `SearchCompanies`,
    `CompanyCard`, `CompanyLogo`, `RatingBadge`, `SectorCard`, `SectorIcon`,
    `ResearchBrowser`, `ReportToc`, `ReportContent`.
  - Design system: single `globals.css` with CSS custom properties, dark mode
    (`.dark` + `localStorage["passive-theme"]`), DM Sans via
    `next/font/google`.
  - SEO: `metadataBase` (`https://passive-research.in`), title template,
    OG/Twitter metadata, `sitemap.xml`, `robots.txt`, `ResearchArticle`
    JSON-LD on company pages.

### Changed
- Legacy Docify-era files removed (404/, all-collections/, contact-support/,
  doc/, faq/, privacy-policy/, terms/, [category]/ routes and components).

### Fixed
- Dark-mode flash avoided; `ThemeToggle` made class-driven to satisfy
  `react-hooks/set-state-in-effect` (see ADR-005).

### Removed
- All Docify template files (see Changed).

### Security
- Site is fully static; no auth; JSON-LD only from internal dataset (see
  `docs/SECURITY.md`).

---

## Unreleased

Nothing pending.

---

## Conventions

- Bump rules: `minor` for feature content, `patch` for fixes, `major` for
  breaking contract changes (e.g., `Company` interface renames, route
  renames).
- One entry per meaningful change; dates as ISO `YYYY-MM-DD`.
- "Security" section is explicit even when empty (n/a), per repo policy.
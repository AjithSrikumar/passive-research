# CHANGELOG.md

All meaningful changes to **Passive** are recorded here, semantically
versioned. Format: **Added / Changed / Fixed / Removed / Security**.

Version history:

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
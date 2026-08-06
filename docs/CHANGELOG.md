# CHANGELOG.md

All meaningful changes to **Passive** are recorded here, semantically
versioned. Format: **Added / Changed / Fixed / Removed / Security**.

Version history:

- **0.3.1** — deployment wiring + auto-commit policy
- **0.3.0** — documentation system
- **0.2.0** — institutional content upgrade
- **0.1.0** — Next.js conversion + full site build (baseline)

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
  (2026 edition), applied across all 117 company pages:
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
  - Data layer: `src/lib/companies.ts` (117 companies, `Company` interface,
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
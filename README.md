# Passive — Professional Equity Research for Indian Stocks

An institutional-grade equity research platform covering **901 Indian listed
companies** (133 with full research reports across 23 sectors, plus 768
GQVM factor-score pages over the NSE-900 universe). Every covered company
gets a structured, 25-section research report built to a standard an
institutional portfolio manager can act on: decision-first executive
summary, driver-based forecasts, DCF + peer valuation with explicit "what is
priced in" analysis, bull/base/bear scenarios, a monitorable risk register,
and dated catalysts. Companies that warrant a deeper treatment get a
**fully bespoke initiation-style note** instead of the generic framework —
33 reports are bespoke on verified primary-source data (ADR-012, v0.7.0–v0.9.0).

> **Repository is the source of truth.** Architecture, decisions, tasks, and
> conventions live in the Markdown docs. Start with
> [`docs/`](./docs/README-structure) and especially
> [`OPENCODE.md`](./OPENCODE.md) if you are an AI agent.

## Product Overview

- **133 full company reports** — SSG pages, each with a fixed 25-section
  institutional framework.
- **Bespoke research notes** (ADR-012) — a typed note layer
  (`src/lib/notes/` + `ReportNote`) that replaces the generic framework for
  registered slugs; currently **33** institutional-grade notes (Trent, HDFC
  Bank, Reliance, Titan, DMart, Airtel, and the top-27-by-market-cap set) on
  verified primary-source data (real fiscal years, shareholding pattern,
  consensus-anchored valuation, downloadable sources, responsive tables).
- **23 sector pages** with coverage counts, descriptions, and icon sets.
- **Ratings** — Strong Buy / Buy / Accumulate / Hold / Reduce / Sell, each with
  an expected 12-month total-return band.
- **Search & browse** — live client-side search, filter/sort research browser,
  sector and coverage-universe indexes.
- **Factor model platform** (v0.11.x, GQVM v2.0) — a four-factor model
  (growth 20%, quality 10%, valuation 60%, momentum 10%) over the NSE-900
  universe, FY13–FY26, imported from `GQVM Factor Dashboard.xlsx` (not
  committed) via `npm run factor:import` with dashboard-parity validation
  gates (spec: `docs/FACTOR_MODEL.md`). Public surfaces: a **`/screener`**
  (rank all 900 companies, filters, sort, CSV export), a **`/backtest`**
  (parametric: adjust factor weights, per-metric parameters, MinN and Top-N
  and run your own backtest — defaults pinned to the dashboard's GQVM
  config; year dropdown per portfolio, FY13–FY25, plus the **live FY2026
  portfolio**), **individual pages for all 900 companies** with GQVM
  score strips at 1 decimal, and **logos for 672 companies** (NSE symbols
  mapped from the workbook RIC codes). Data flows workbook → Postgres
  mirror → build-time static snapshot (`src/lib/factor/`) → SSG pages,
  with the live backtest API (`POST /api/factor/backtest`) reading
  the mirror on demand.
- **Institutional methodology** — a documented evidence-classification system
  (Fact / Management / Consensus / Estimate / Inference / Scenario /
  Uncertainty), a 60/40 DCF–peer-multiple valuation framework, reverse-DCF
  "what is priced in" tables, 25/50/25 probability-weighted scenarios, and a
  source policy (screener.in primary, in.marketscreener.com for consensus).
- **SEO-ready** — static HTML per page, `sitemap.xml`, `robots.txt`,
  metadata/OG/Twitter tags, and `ResearchArticle` JSON-LD on report pages.
- **Dark mode** — `.dark` class, persisted via `localStorage`, flash-free.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16.3.0** (App Router, Turbopack) | Breaking-change discipline: see the generated `AGENTS.md` block; Next 16 docs ship in `node_modules/next/dist/docs/` |
| UI | **React 19.2.8** | Server components by default; 8 client components |
| Language | **TypeScript 5** | strict project config |
| Styling | **Custom CSS** (CSS custom properties) | No Tailwind, no CSS-in-JS, single `src/app/globals.css` |
| Fonts | **DM Sans** via `next/font/google` | `--font-dm-sans`, `display: swap` |
| Linting | **ESLint 9** + `eslint-config-next` | `npm run lint` |
| Data | **Static TypeScript modules** (build-time source of truth) | Pages never read a DB (ADR-011 keeps builds DB-independent) |
| Database | **Supabase Postgres mirror** (optional) | `sectors` / `companies` / `report_sections`; seeded by `npm run db:seed`; hybrid access via `src/lib/store.ts` + `/api/*` (ADR-011) |
| Runtime dependencies | `next`, `react`, `react-dom`, `pg`, `server-only` | `pg`/`server-only` added by ADR-011 |

## Getting Started

Prerequisites: Node.js 20+ (npm).

```bash
npm install        # install dependencies
npm run dev        # start the dev server on http://localhost:3000
```

Open <http://localhost:3000>. A dev server is expected to be running during
development; agents must re-verify with smoke tests after changes (see
`docs/TESTING.md`).

## Development Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Turbopack dev server |
| `npm run build` | Production build; compiles + type-checks + SSG (901 company pages) |
| `npm start` | Serve the production build (`next start`) |
| `npm run lint` | ESLint over the project |
| `npm test` | Vitest suite (factor snapshot/lookup + engine; 20 tests) |
| `npm run db:seed` | (Optional) Re-seed the Postgres mirror from `src/lib` — needs `DATABASE_URL` |
| `npm run factor:import` | Import the GQVM workbook into the factor tables (needs `DATABASE_URL`) |
| `npm run factor:snapshot` | Regenerate `src/lib/factor/data.ts` + `backtest.ts` from the DB |
| `npm run factor:optimize` | Exploration-only optimizer search (reports, does not write) |

## Environment Variables

- **Required: none.** The canonical origin `https://passive-research.in` is
  hard-coded in `src/app/layout.tsx` (`metadataBase`) and used by
  `src/app/sitemap.ts` / `src/app/robots.ts`.
- **Optional:** `DATABASE_URL` (Supabase Postgres) enables the DB mirror +
  API reads. Put it in `.env.local` (gitignored) for local seeds; set it in
  the Vercel project env for production. Without it, `/api/*` serve the
  bundled static dataset — the build and pages are unaffected.

## Build & Deploy

```bash
npm run lint && npm run build   # CI gate (run before every commit)
git push origin main            # triggers auto-deploy
```

**Deployed on Vercel** (auto-deploy from the `main` branch, every push):
[passive-research.vercel.app](https://passive-research.vercel.app). Custom
domain `passive-research.in` attached. See [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md)
for hosting, environments, and the release checklist.

## Folder Overview

```
src/
  app/                 # App-router pages and routes (all RSC unless noted)
    layout.tsx         # Root layout: Nav, Footer, fonts, global metadata
    globals.css        # Entire design system (custom properties, dark mode)
    page.tsx           # Home
    about/ contact/ legal/ privacy/ terms/
    research/          # Research index
    latest-research/   # Recently updated reports
    coverage-universe/ # Full company list
    sectors/           # Sector index + [slug] sector page
    company/[slug]/    # 901 SSG pages: 133 reports (bespoke note or generic ReportContent) + 768 GQVM factor pages
    screener/          # Factor screener over the NSE-900 snapshot
    backtest/          # Parametric backtest UI + live FY2026 portfolio
    api/               # Read-only JSON API: health, companies, companies/[slug], factor/backtest
    not-found.tsx      # 404
    sitemap.ts         # sitemap.xml (metadataBase-driven)
    robots.ts          # robots.txt
  components/          # 20 reusable components (8 client, 12 server)
  lib/
    companies.ts       # 133-company dataset + helpers (build-time source of truth)
    sectors.ts         # 23-sector dataset + helpers
    report.ts          # 25-section framework + report math helpers
    notes/             # Bespoke research notes: types.ts, trent.ts, index.ts (ADR-012)
    factor/            # GQVM factor layer: data.ts/backtest.ts snapshots, engine.ts, company.ts, params.ts, ric.ts
    db.ts              # server-only Postgres pool + query helpers (ADR-011)
    store.ts           # hybrid loaders: DB-first, static fallback
db/
  schema.sql           # Postgres schema (sectors/companies/report_sections)
scripts/
  db/seed.ts           # npm run db:seed — truncate + re-seed from src/lib
  factor-model/        # Factor pipeline: import.ts, snapshot.ts, verify.ts, map-symbols.ts, fetch-logos.ts, optimize.ts
public/                # Static assets (logos/ = company logos)
docs/                  # This repository's living documentation (source of truth)
  ARCHITECTURE.md
  API.md
  CHANGELOG.md
  COMPONENTS.md
  DATABASE.md
  DATA_MODEL.md
  DECISIONS.md
  DEPLOYMENT.md
  FACTOR_MODEL.md
  OPENCODE.md
  ROADMAP.md
  SECURITY.md
  STYLING.md
  TASKS.md
  TESTING.md
  README.md
```

## Documentation Index

Repositories are the memory of the project. Every session starts by reading:

| Document | What it tells you |
|---|---|
| [`OPENCODE.md`](./OPENCODE.md) | AI session startup: project status, standards, things never to change, workflow |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | System design, data flow, rendering strategy, component architecture |
| [`docs/CHANGELOG.md`](./docs/CHANGELOG.md) | Semantic-versioned history of every meaningful change |
| [`docs/DECISIONS.md`](./docs/DECISIONS.md) | Architectural decision log (ADR) |
| [`docs/TASKS.md`](./docs/TASKS.md) | Backlog + completed work |
| [`docs/ROADMAP.md`](./docs/ROADMAP.md) | Sprints and vision |
| [`docs/DATABASE.md`](./docs/DATABASE.md) | The data layer: Company/Sector schemas + the Postgres mirror (schema, seed, hybrid store) |
| [`docs/API.md`](./docs/API.md) | Route table, JSON-LD, sitemap/robots, and the live `/api/*` JSON API |
| [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) | All 20 components: props, usage, best practices |
| [`docs/STYLING.md`](./docs/STYLING.md) | Design system, tokens, typography, dark mode, responsive, a11y |
| [`docs/TESTING.md`](./docs/TESTING.md) | Verification strategy and the manual smoke-test checklist |
| [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) | Hosting, environments, release checklist |
| [`docs/SECURITY.md`](./docs/SECURITY.md) | Static-site threat model and security posture |

## Methodology (content standard)

The research methodology — including the 25-section framework, rating scale,
valuation rules, evidence labels, risk/catalyst registers, and source policy —
is written for users on the public [Methodology page](../../src/app/methodology/page.tsx)
and documented for developers in `docs/ARCHITECTURE.md` § Report framework.
It implements the conventions in the *Institutional Equity Research Manual*
(2026 edition) located outside the repo (see `docs/DECISIONS.md` ADR-006).

## Known Limitations

- **Synthetic financials.** Historical reconstructions and forward estimates
  (`src/lib/report.ts`) are model-implied from each company's headline fields
  and labelled `(E)` / `[E]`. They are *not* pulled from a live data feed.
  **Exception (v0.7.0+):** the 33 bespoke companies have rows and notes using
  verified primary-source figures; estimates in the notes remain marked
  `(E)`. Real-data enrichment for the rest is the top roadmap item
  (`docs/ROADMAP.md`).
- **Factor symbols/logos partial.** 672 of 900 NSE-900 companies have real
  NSE symbols and logos; delisted/renamed entities render a deterministic
  initials fallback.
- **Static content root.** Pages are generated from `src/lib` TS modules; the
  Postgres mirror is a re-seeded snapshot (not a CMS). No persistence, no
  authentication, no write endpoints.
- **Unit tests cover the factor layer only** (Vitest, 20 tests); report math
  and formatters remain on lint + build + a documented manual smoke pass
  (`docs/TESTING.md`).

## License

Proprietary / internal project. See repository owner. (No LICENSE file yet —
see `docs/ROADMAP.md`.)

## Future Roadmap

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the current sprint, next
sprint, next month, and the long-term vision.
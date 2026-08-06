# Passive — Professional Equity Research for Indian Stocks

An institutional-grade equity research platform covering **133 Indian listed
companies across 23 sectors**. Every company gets a structured, 25-section
research report built to a standard an institutional portfolio manager can act
on: decision-first executive summary, driver-based forecasts, DCF + peer
valuation with explicit "what is priced in" analysis, bull/base/bear scenarios,
a monitorable risk register, and dated catalysts.

> **Repository is the source of truth.** Architecture, decisions, tasks, and
> conventions live in the Markdown docs. Start with
> [`docs/`](./docs/README-structure) and especially
> [`OPENCODE.md`](./OPENCODE.md) if you are an AI agent.

## Product Overview

- **133 full company reports** — SSG pages, each with a fixed 25-section
  institutional framework.
- **21 sector pages** with coverage counts, descriptions, and icon sets.
- **Ratings** — Strong Buy / Buy / Accumulate / Hold / Reduce / Sell, each with
  an expected 12-month total-return band.
- **Search & browse** — live client-side search, filter/sort research browser,
  sector and coverage-universe indexes.
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
| UI | **React 19.2.8** | Server components by default; 5 client components |
| Language | **TypeScript 5** | strict project config |
| Styling | **Custom CSS** (CSS custom properties) | No Tailwind, no CSS-in-JS, single `src/app/globals.css` |
| Fonts | **DM Sans** via `next/font/google` | `--font-dm-sans`, `display: swap` |
| Linting | **ESLint 9** + `eslint-config-next` | `npm run lint` |
| Data | **Static TypeScript modules** | No database, no backend, no runtime API |
| Runtime dependencies | `next`, `react`, `react-dom` only | No other runtime packages |

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
| `npm run build` | Production build; compiles + type-checks + generates 172 static pages |
| `npm start` | Serve the production build (`next start`) |
| `npm run lint` | ESLint over the project |

## Environment Variables

None are required. The canonical origin `https://passive-research.in` is
hard-coded in `src/app/layout.tsx` (`metadataBase`) and used by
`src/app/sitemap.ts` / `src/app/robots.ts`.

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
    company/[slug]/    # 133 SSG report pages (JSON-LD + ReportToc + ReportContent)
    not-found.tsx      # 404
    sitemap.ts         # sitemap.xml (metadataBase-driven)
    robots.ts          # robots.txt
  components/          # 12 reusable components (5 client, 7 server)
  lib/
    companies.ts       # 133-company dataset + helpers (the "database")
    sectors.ts         # 23-sector dataset + helpers
    report.ts          # 25-section framework + report math helpers
  public/              # Static assets
docs/                  # This repository's living documentation (source of truth)
  ARCHITECTURE.md
  API.md
  CHANGELOG.md
  COMPONENTS.md
  DATABASE.md
  DECISIONS.md
  DEPLOYMENT.md
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
| [`docs/DATABASE.md`](./docs/DATABASE.md) | The static data layer: Company/Sector schemas, relationships, constraints |
| [`docs/API.md`](./docs/API.md) | Route table, JSON-LD, sitemap/robots (public surface; no backend API) |
| [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) | All 12 components: props, usage, best practices |
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
  Real-data enrichment is the top roadmap item (`docs/ROADMAP.md`).
- **No backend API, authentication, or persistence.** Everything is static.
- **No automated test runner** yet — verification is `lint` + `build` +
  a documented manual smoke pass (`docs/TESTING.md`).

## License

Proprietary / internal project. See repository owner. (No LICENSE file yet —
see `docs/ROADMAP.md`.)

## Future Roadmap

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the current sprint, next
sprint, next month, and the long-term vision.
# TESTING.md — Verification Strategy

> Current state: **no automated test runner** (task H3). Verification =
> static checks (`lint` + `build`) + a documented manual smoke pass. This
> file is the checklist; run it after every change.

## 1. Strategy Overview

| Layer | Today | Target (H3) |
|---|---|---|
| Static analysis | ESLint 9 (`npm run lint`) | + `tsc --noEmit` (build already type-checks) |
| Type safety | `next build` type-check | same |
| Unit (lib math) | none | Vitest for `src/lib/*` (report math, formatters, guards) |
| Component tests | none | optional (server components are pure data → JSX) |
| E2E | manual smoke | scripted smoke (PowerShell/Playwright) |
| Visual | manual browser pass | screenshot review optional |

## 2. Static Checks

```bash
npm run lint    # ESLint (must be clean)
npm run build   # compiles + type-checks + SSG (172 pages, must succeed)
```

The build is the real gate: any `Company` row failing type/schema, any
divide-by-zero NaN leaking into `pricedInAnalysis`, or any broken import
fails here. Keep it green after every change.

## 3. Manual Smoke Test (run on the dev server, `http://localhost:3000`)

### 3.1 Route health

- [ ] `/` home 200
- [ ] `/research`, `/latest-research`, `/coverage-universe` 200
- [ ] `/sectors` 200 and `/sectors/<slug>` 200 for a sample of 3–4 sectors
- [ ] `/company/<slug>` 200 for a spread: banks, IT, consumer, loss-margin
      names, high-PE names (e.g., `hdfc-bank`, `trent`, `wipro`,
      `bata-india`, `polycab-india`, `ltimindtree`)
- [ ] `/methodology`, `/about`, `/contact`, `/legal`, `/terms`, `/privacy` 200
- [ ] `/company/does-not-exist` → 404 (custom page)
- [ ] `/sitemap.xml` and `/robots.txt` 200 and contain expected URLs

### 3.2 Content markers (company page)

- [ ] Executive Summary shows rating, target, implied return
- [ ] "What is priced in" present
- [ ] Reverse DCF table present (`pricedInAnalysis` non-null — guard pages
      with `pe: null` show `"—"`)
- [ ] Scenario cards (`.scenario-card`) render Bull/Base/Bear
- [ ] Risk register table and catalyst register table render
- [ ] No `undefined`, `NaN`, `[object Object]` in visible text (strip
      `<script>` payloads before checking — RSC flight data legitimately
      contains `$undefined` markers)
- [ ] Evidence labels (`[F] [M] [E] [I]`) appear in prose and tables

### 3.3 Behavior

- [ ] Search dropdown filters companies (home + nav)
- [ ] Research browser filter by sector and by text; deep link
      `/research?sector=banking` filters on load
- [ ] Dark mode toggle persists across reload; no flash on first paint
- [ ] ReportToc highlights the section in view; clicking smooth-scrolls
- [ ] Mobile width (~390px): nav hamburger works; tables scroll inside
      `.table-wrap`; sidebar hidden

## 4. Coverage Goals

- `src/lib` math helpers (report.ts, formatters): 100% core-branch coverage
  once Vitest lands (H3) — targets: `scenarioCases`, `weightedTarget`,
  `pricedInAnalysis` (incl. `pe: null`), `totalReturnPct`, `growthCagr`,
  `formatIndian` grouping, `formatUpdated` boundaries.
- Smoke path: all routes 200 (scripted later).

## 5. Manual Testing Checklist (pre-release)

- [ ] `npm run lint` clean
- [ ] `npm run build` clean (172 static pages)
- [ ] Section 3 pass on dev server
- [ ] `docs/` updated for the change (see `OPENCODE.md` § Shutdown)
- [ ] No secrets or absolute local paths in committed files
- [ ] `npm audit` (when CI gate added; today: spot-check)

## 6. Known Gaps

- No automated unit/E2E (H3, high priority).
- Visual regression untested across browser matrix — desktop Chrome +
  mobile viewport is the manual baseline.
# TESTING.md — Verification Strategy

> Current state: **Vitest adopted for `src/lib` unit tests** (partial H3,
> 2026-08-08 — factor-model layer covered; report math remains a target).
> Verification = unit tests + static checks (`lint` + `build`) + a documented
> manual smoke pass. This file is the checklist; run it after every change.

## 1. Strategy Overview

| Layer | Today | Target (H3) |
|---|---|---|
| Static analysis | ESLint 9 (`npm run lint`) | + `tsc --noEmit` (build already type-checks) |
| Type safety | `next build` type-check | same |
| Unit (lib math) | Vitest for `src/lib/factor/*` (`npm test`) | + report math, formatters, guards |
| Component tests | none | optional (server components are pure data → JSX) |
| E2E | manual smoke | scripted smoke (PowerShell/Playwright) |
| Visual | manual browser pass | screenshot review optional |

## 1.1 Unit Tests (Vitest)

```bash
npm test    # vitest run — tests/**, 9 tests (factor snapshot + lookup)
```

- `vitest.config.mts` — `@` alias → `src/`, node environment, `tests/**`.
- Coverage: `src/lib/factor/` snapshot integrity (years, contiguous ranks,
  score bounds, backtest alignment) and `getCompanyFactorHistory` (slug
  resolution, out-of-universe null, Top-20 return exposure).
- Regenerate the snapshot (`npm run factor:snapshot`) whenever the import
  changes — tests assert against the committed static data.

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
- [ ] `/screener` 200 — table renders, year selector works, CSV export
      downloads a file
- [ ] `/backtest` 200 — yearly summary table + 14 constituent tables render
- [ ] `/company/<slug>` factor scorecard present for covered names
      (e.g. `reliance-industries`), absent for non-universe names
      (e.g. `skf-india`)
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
- [ ] `npm test` green
- [ ] `npm run build` clean (176 static pages)
- [ ] Section 3 pass on dev server
- [ ] `docs/` updated for the change (see `OPENCODE.md` § Shutdown)
- [ ] No secrets or absolute local paths in committed files
- [ ] `npm audit` (when CI gate added; today: spot-check)

## 6. Known Gaps

- Unit coverage limited to the factor layer — report math, formatters and
  guards (`src/lib/report.ts`, `companies.ts`) still untested (H3).
- No component/E2E automation — desktop Chrome + mobile viewport is the
  manual baseline.
- Visual regression untested across browser matrix.
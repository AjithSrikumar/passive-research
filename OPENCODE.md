# OPENCODE.md — AI Agent Session File

> Read this file at the **start of every session**. It is the project's
> on-ramp for AI agents and new engineers. The repository — not chat history —
> is the source of truth. If this file conflicts with your memory, this file
> wins. If it conflicts with code, the code wins (and this file should be
> updated).

---

## Project Summary

**Passive** — an institutional-grade equity research platform for Indian listed
stocks. A fully static Next.js 16 App Router site: 117 company report pages,
23 sector pages, and standard content pages, all generated at build time from
TypeScript data modules. Reports follow a fixed 25-section institutional
framework with evidence labels, driver-based forecasting, reverse-DCF
valuation, scenarios, and monitorable risks. No database, no backend, no
authentication.

## Current Project Status

- **Version:** 0.3.0 (see `docs/CHANGELOG.md`)
- **Build state:** GREEN — `npm run build` passes, 172 static pages; `npm run
  lint` passes clean.
- **Content state:** The institutional upgrade (executive summary, thesis map,
  reverse-DCF, scenarios, risk/catalyst registers, evidence labels) is complete
  for all 117 companies. Methodology page rewritten per the manual.
- **Docs state:** Full documentation system in `docs/` (ARCHITECTURE,
  DECISIONS, TASKS, CHANGELOG, ROADMAP, DATABASE, API, COMPONENTS, STYLING,
  TESTING, DEPLOYMENT, SECURITY) + `OPENCODE.md` + rewritten `README.md`.

---

## Active Objectives

1. Keep the repo the single source of truth — docs synchronized with code.
2. Enrich data quality (real vs synthetic financials) — top roadmap item.
3. Add charts (SVG) per the institutional manual's chart standards.
4. Strict security headers + CSP; `npm audit` gate.
5. Optional: coverage-universe JSON API / full static export.

See `docs/ROADMAP.md` for sprint details and `docs/TASKS.md` for the queue.

---

## Current Sprint

**(Sprint 3, in progress) — Institutional content + docs system.**
The institutional upgrade is done; documentation is done. Remaining sprint-3
work is small: content review pass over report language, add charts (first
increments), and any fix-ups found in review.

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
- **Do not add runtime dependencies** without an ADR (see `docs/DECISIONS.md`
  ADR-001). If you need a feature, build it with CSS/TS first.

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
  interactivity. Only 5 components are `"use client"`.
- Components accept data (a `Company`/`Sector` object) and never fetch.
- Links via `next/link`. Icons are inline SVG strokes. Logos are CSS-gradient
  initial squares (no images: lot of green).
- Full catalog: `docs/COMPONENTS.md`.

## Architecture Constraints

- **Static by default.** All pages SSG; unknown company slug → 404
  (`dynamicParams = false`); sector pages SSG.
- **Single source of truth** for the report framework: `reportToc` in
  `src/lib/report.ts`. Methodology page, TOC sidebar, and section rendering
  must all derive from it — never hardcode the 25 sections twice.
- Data must flow: `companies.ts` / `sectors.ts` → `report.ts` → pages. No
  component may recompute these with divergent constants.
- RSC output + tiny client islands; no global state library.
- `report-section` class + `data-report-section` attribute are required by the
  `ReportToc` scrollspy. Section elements and `id`s must match `reportToc`.

## Things Never To Change (read carefully)

1. **The 25-section framework and its ids** (`reportToc` in
   `src/lib/report.ts`). Sections are indexed in `company` pages, the TOC
   sidebar, the Methodology page, and JSON-LD.
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
7. **Keeping runtime dependencies at next/react/react-dom** — a new runtime
   dep requires an ADR.
8. The auto-generated `AGENTS.md` guard block (Next.js agent rules) — it must
   not be edited or removed; `next dev` re-adds it. See "Things never to
   change/AGENTS.
9. The eslint-enforced `react-hooks/set-state-in-effect` — don't reintroduce
   setState-in-effect patterns (see ThemeToggle ADR-005).

## Current Known Issues

- Financials are **synthetic** (derived from `Company` fields) and marked
  `(E)` — they are model-implied, and a disclaimer lives on the Methodology
point. Not a bug; by design.
- No test runner; manual smoke only up to now (checked in `docs/TESTING.md`).
- `sectors/[slug]` route does not set `dynamicParams=false` (that's fine —
  unknown slugs → 404 via `getSector` guard).
- Brand phrasing/English copy may need a final editorial pass (Sprint 1
  hardening).
- No charts yet (planned); no CSP (planned).

## Recently Completed Features

See `docs/CHANGELOG.md` v0.1.0–v0.3.0 and `docs/DECISIONS.md`. Highlights:

- Docify → Next.js full conversion (ADR-001, deleted legacy files).
- 117-company + 23-sector data model, report engine, 172-page static build.
- Institutional upgrade: executive summary decision film, thesis map, reverse
  DCF, scenario cards, risk/catalyst registers, evidence labels (ADR-006).
- Methodology page rewrite per the Institutional Research Manual.
- Performance/SEO: sitemap, robots, metadataBase, JSON-LD, dark mode.
- Documentation system (this sprint, v0.3.0).

## Pending Refactors

- Add test runner (Vitest) and smoke-test automation (see ADR proposal in
  `docs/DECISIONS.md` backlog thoughts).
- Possibly component-first: extract scenario cards / risk tables behind
  presentational components if they exceed readability.
- Normalize the "evidence tag" (`[E]`) spans into a dedicated component if
  usage grows.
- Consider `output: "export"` if hosting moves to pure static CDN.

See `docs/TASKS.md` for the full queue.

## Current Priorities

1. Get Sprint 1 closed (review pass, fixes).
2. Data enrichment pipeline design (real companies data → typed JSON).
3. Chart library (manual-driven) for history + bridges.
4. Security headers + CSP + `npm audit` gate.

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
7. Report the summary, don't commit unless asked.

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
- [ ] `OPENCODE.md` worked around as needed for status/deps/schema changes.
- [ ] If the user asked to commit, leave the tree clean.

Definition of done: code + docs verified + task & changelog reflecting the
change. If any of the above is missed, the task is **not fixed**.

---

*Last updated: 2026-08-06 (v0.3.0)*
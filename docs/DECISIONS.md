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
- **Context:** The coverage universe (117 companies, 23 sectors) and report
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
- **Context:** Institutional consistency across 117 reports; the sidebar TOC,
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
- **Decision:** Full adoption across `ReportContent` (all 117 articles) and
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
- **Context:** 117 company pages and 23 sector pages; canonical origin
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

## Backlog — decision candidates (not yet ADRs)

- **Proposed ADR:** Adopt Vitest for `src/lib` unit tests (task H3).
- **Proposed ADR:** Chart library strategy — pure SVG vs `recharts`
  (task H2; bias: pure SVG to respect ADR-001 dependency rule).
- **Proposed ADR:** Licensing decision (task L1).

---

*Index of ADRs: 001 platform · 002 data layer · 003 styling · 004 dark mode ·
005 report framework · 006 methodology · 007 synthetic financials ·
008 SSG/SEO · 009 docs governance.*
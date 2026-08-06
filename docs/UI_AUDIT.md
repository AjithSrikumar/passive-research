# UI_AUDIT.md — Application-Wide UI/UX Audit

> Date: 2026-08-06 · Scope: every route + every component.
> Method: static audit of `src/app/globals.css`, all 13 components, all
> pages, source-order reading (no image capture tooling available). Every
> issue below is code-verifiable, not guesswork.

Status key: 🟢 fixed in v0.5.0 · 🟡 acknowledged/ongoing · 🔴 open

---

## 1. Global Design System Issues

| # | Issue | Severity | Status |
|---|---|---|---|
| G1 | **No spacing scale** — arbitrary `px` paddings everywhere (card 22px, sector-card 24px, contact 28px, badges 4–20px, sections 84px). Nothing references tokens. | High | 🟢 |
| G2 | **No radius tokens beyond `--radius-card:15px` & pill** — buttons 999px pill, inputs vary (16/14/12/8px), cards 15px. No 20px card / 12px control standard. | High | 🟢 |
| G3 | **No elevation tokens applied consistently** — shadows exist (`--shadow-card/hover`) but coincide; cards "flat, no visible elevation", hover only translateY. | Med | 🟢 |
| G4 | **No typography scale** — font sizes in raw px (`11.5,12.5,13.5,15.5,16.5,17.5…`), no type tokens, inconsistent line-heights (1.5–1.85). | Med | 🟢 |
| G5 | **No `font-variant-numeric: tabular-nums`** on any numeric value → prices/statistics/market cap jitter → claims stand still. Violates institutional terminal norm (#10 in task). | High | 🟢 |
| G6 | **No `:focus-visible` rings anywhere** — keyboard users get default outline only; interactive elements (nav links, buttons, cards, pills) have no styled focus. ARIA partially present. | High | 🟢 |
| G7 | **Contrast `--text-45` fails AA** — `rgba(17,24,39,.45)` ≈ #74747a ≈ 3.0:1 on white; used for body-size labels (11–13px). Must bump to ≥4.5:1. | High | 🟢 |
| G8 | **Tap targets < 44px** — nav links `9px` vertical padding; theme toggle 40px; filter pills ~38px. | Med | 🟢 |
| G9 | **Transition durations vary** 0.12–0.25s; no shared curve. | Low | 🟢 |
| G10 | **No skeleton / explicit empty-state styling** — one inline empty `<p>` in ResearchBrowser; loading states don't exist (static site, acceptable; but empty state uninstrumentedistinct). | Low | 🟡 |
| G11 | **Hard-coded universe counts** — home hero badge literally `"117 Indian Companies"` (stale; actual 133); `/research` copy `100+ Indian listed companies`. | Med | 🟢 |

## 2. Company Card (`CompanyCard.tsx` + `.company-card`)

| # | Issue | Status |
|---|---|---|
| C1 | Grid `repeat(auto-fill,minmax(320px,1fr))` → only 3 columns even at 1920px (container caps 1240px); never fills ultra-wide; last-row blank space. | 🟢 |
| C2 | Cards in a row don't share height (metadata not pushed to bottom) — `.company-stats` needs `margin-top:auto`. | 🟢 |
| C3 | Metadata falls 1 row of 6 (3×2 implied) — spec: explicit 3-column label/value pairs (Price/Target/Upside, Mcap/Sector/Updated). Current markup IS 6 grid cells (3×2). Alignment good but values/labels not baseline-normalized (uppercase tracking + different font sizes). | 🟢 |
| C4 | Description (`.company-thesis`) clamps **2 lines**; spec requires 3 with fade. | 🟢 |
| C5 | Numbers not `tabular-nums`. | 🟢 |
| C6 | Heading hierarchy: h3 16.5px/700 vs ticker-in-paragraph vs sector — weaker step (`company-card-id p` but mixes `<ticker> · <industry>`). Add ticker muted 13px, sector secondary 13px. | 🟢 |
| C7 | Divider + text crowding: `.stats` border-top sits 14px below thesis — spec 24 above / 20 below. | 🟢 |
| C8 | Hover: translateY(-3px) 0.18s — spec 100–150ms, `shadow-sm→md`, border `--border-2`, cursor. | 🟢 |
| C9 | Grid gap single value 18px everywhere — spec 24/20/16 breakpoints. | 🟢 |
| C10 | Radius 15px → 20px. | 🟢 |
| C11 | Overall density: 22px padding, 14px gaps ok → tighten to spacing scale. | 🟢 |
| C12 | Badge variance (sm/md/lg, all pill) — standardize tokenized heights/padding. | 🟢 |

## 3. Rating Badges & Buttons / Inputs

| # | Issue | Fix |
|---|---|---|
| B1 | Badge sizes via `padding` only (`4px 11px`→`9px 20px`) — inconsistent perceptual weight vs font. Fixed height? For sm/md/lg: height 24/28/36 + horizontal padding. | 🟢 |
| B2 | Buttons pill `--radius-pill` (999px) vs 12px standard requested — keep `.btn` 12px; badge/dot keep pill. | 🟢 |
| B3 | Inputs: search `.search-bar` 20px pill (lg) / 12px (md) — normalize 12px; focus ring exists (`:focus-within`) but no `:focus-visible` for nest controls. | 🟢 |
| B4 | No `aria-pressed` on filter pills; no `role="group"`/step labels. | 🟢 |
| B5 | Sortered `select` styled inline (inline styles in JSX — move to class). | 🟡 |

## 4. Responsive / Breakpoints

| # | Issue | Fix |
|---|---|---|
| R1 | **No mobile-first queries** — all base rules desktop; breakpoints only `max-width`. | 🟢 |
| R2 | Card columns: 1 (mobile) / 2 (tablet) / 3 (laptop) / 4 (≥1200). | 🟢 |
| R3 | Tables: `.fin-table` `min-width:520px` inside `.table-wrap` (scrolls) ok on tablet/mobile; coverage-table 900px ok. Add touch momentum. | 🟢 |
| R4 | Nav: hamburger at ≤980px only; tablet keeps hamburger — acceptable (bottom-nav out of scope for static). | 🟡 |
| R5 | Hero/key sections: `clamp()` present; verify at 320px (fonts + waves) → add `min-width` guards. | 🟢 |
| R6 | Footer grid collapses correctly. | 🟢 |
| R7 | `report-layout` collapses at ≤1100 to 1 col, TOC hidden. | 🟢 |
| R8 | **Ultra-wide density**: container max 1240px caps; raise `.section-inner`/`.nav-inner` to 1400px effective where appropriate. | 🟢 |

## 5. Component-Level (misc)

| # | Issue | Fix |
|---|---|---|
| M1 | Search: `sr-title em` muted 13px ok; dropdown missing `max-height` overflow on short screens → add `max-height: min(70vh,420px)`. | 🟢 |
| M2 | Skeleton states: none — static site, but add `.skeleton` utility for future; not required for QA now. | 🟡 |
| M3 | Empty state ResearchBrowser — inline `<p>` → shared `.empty-state` class (Phase 5 component). | 🟢 |
| M4 | Reports: tables + k/v grids auto-fit ok; scenario cards ok. `p strong` subtle. | 🟢 |
| M5 | `hero-waves` uses `currentColor: var(--bg)` — in dark ok; fine. | — |
| M6 | Some pages use inline `style={{...}}` (ResearchBrowser select, empty state, page.tsx hero-stats margin). Move to classes for tokens-unification. | 🟡 |

---

## Summary of Root Causes

1. One monolithic stylesheet with hard-pixel values and **no token scale** (spacing/radius/type/elevation).
2. `CompanyCard` metadata bottom row not pinned → unequal card heights.
3. Desktop-first grids cap at 4 cols and never fill wide screens.
4. Numbers lack `tabular-nums` (institutional readability).
5. No `:focus-visible`, weak contrast on `--text-45`, hard-coded universe counts.
6. Minor: pill vs radius inconsistency; missing shared empty states.

## Fixes Landed (v0.5.0)

- Added token scales: `--space-*`, `--radius-*`, `--radii`, `--radius-card/btn/input/field`, `--type-*`, elevation `--shadow-xs–lg`, raising `--text-45` for AA.
- `tabular-nums` on all numeric `.stat-value`, `.kv-item b`, `.report-quick-stat b`, price spans.
- Cards: radius 20px, equal-height via `margin-top:auto`, 3-line clamp + fade, gap 24/20/16, hover 140ms.
- Badges: fixed heights per size + radius standard.
- Grids: explicit column counts per breakpoint (mobile-first), wide-density at ≥1600.
- `:focus-visible` global rings + `:target` scroll + skip link.
- Replaced hard-coded counts (117 → dynamic `companies.length`).
- Empty state component class; spinner/skeleton utilities.
- Verified: `npm run lint` clean, `npm run build` green (172 pages), dev-server smoke across 375/768/1280 viewport widths, no horizontal scroll.

## Open / Not Required
- Loading skeleton triggers (site is 100% static — render is synchronous); `.skeleton` utilities ready for future data pages.
- Bottom-sheet filters / drawer nav (static site; hamburger sufficient for now).
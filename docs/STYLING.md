# STYLING.md — Design System

> Single stylesheet: `src/app/globals.css` (~2,100 lines, no preprocessor, no
> CSS-in-JS). All tokens are CSS custom properties; dark mode swaps the token
> block. This file documents the system; the CSS is the definition of truth.

## 1. Tokens (`:root` / `.dark`)

### Colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--accent` | `#2563eb` | `#60a5fa` | Primary action/link/accent |
| `--accent-2` | `#3b82f6` | `#3b82f6` | Secondary accent |
| `--accent-tint` | `rgba(37,99,235,.08)` | `rgba(96,165,250,.12)` | Tinted surfaces (callouts) |
| `--accent-strong` | `#1d4ed8` | `#2563eb` | Hover accent |
| `--text` | `#111827` | `#f1f5f9` | Body text |
| `--text-65` | `rgba(17,24,39,.65)` | `rgba(241,245,249,.65)` | Secondary text |
| `--text-45` | `rgba(17,24,39,.45)` | `rgba(241,245,249,.45)` | Muted/caption text |
| `--bg` | `#ffffff` | `#0b1220` | Page background |
| `--bg-soft` | `#f8fafc` | `#0f172a` | Card/section background |
| `--bg-softer` | `#f1f5f9` | `#131c2e` | Hover/raised surfaces |
| `--bg-softest` | `#e2e8f0` | `#1b2540` | Borders on soft surfaces |
| `--border` | `#eef2f7` | `#1e293b` | Default border |
| `--border-2` | `#dde3ea` | `#2b3a55` | Stronger border |
| `--glass` | `rgba(255,255,255,.82)` | `rgba(11,18,32,.82)` | Sticky header background |
| `--positive` | `#059669` | `#34d399` | Upside/positive values |
| `--negative` | `#dc2626` | `#f87171` | Downside/negative values |

### Radii, shadows, fonts

| Token | Value |
|---|---|
| `--radius-card` | `15px` |
| `--radius-pill` | `1000px` |
| `--shadow-card` | soft 1px/8px shadow |
| `--shadow-hover` | raised 2px/16px shadow |
| `--font-body` | `var(--font-dm-sans)`, DM Sans, Inter, system-ui |
| `--font-mono` | SFMono-Regular, Menlo, Consolas |

## 2. Typography

- **Family:** DM Sans (`next/font/google`, `--font-dm-sans`), latin subset,
  `display: swap`.
- **Scale:** `h1` (hero ~clamp), `h2` section titles (reports/methodology),
  `h3` sub-sections, body 15–16px, `line-height: 1.7`.
- **Micro-text:** `--text-45` captions, `eyebrow` (letter-spaced uppercase
  label above page heroes), `last-updated`.
- **Numerics:** tabular-ish rendering acceptable via mono in `report-byline`
  and table cells; prices always via `formatPrice` (`₹` + Indian grouping).

## 3. Dark Mode

- Toggle = `.dark` class on `<html>`; token block swap (above).
- Persistence: `localStorage["passive-theme"]` (`"dark" | "light"`).
- No-flash: pre-hydration inline script sets the initial class; `ThemeToggle`
  flips the DOM class directly (class-driven — ADR-005).
- `html` gets `suppressHydrationWarning`.

## 4. Page Layout Patterns

| Pattern | Purpose |
|---|---|
| `.page-hero` / `.page-hero-inner` | Top hero band for content pages (eyebrow, h1, lede) |
| `.section` / `.section-inner` | Standard content wrapper; `prose` class for article text |
| `.report-hero` / `.report-hero-inner` | Company report header (breadcrumbs, title row, quick stats, byline) |
| `.report-layout` | Two-column: `ReportToc` sidebar + `.report-content` |
| `.report-section` | One of the 25 sections; `h2` + `.sec-num` (01–25) |
| `.report-toc` | Sticky in-this-report sidebar (`.active` state) |
| `.key-value-grid` / `.kv-item` | Metric stat cards (label + bold value; `.positive`/`.negative`) |
| `.company-card` / `.sector-card` / `.peer-card` | Card grids; hover shadow lift |

## 5. Component Patterns

- `.company-logo` — initials square, gradient from `logoColor`, `aria-hidden`.
- `.rating-badge` + `rating-<rating>` (e.g., `rating-strong-buy`,
  `rating-buy`, `rating-hold` …) + `badge-sm|md|lg` — colored pills.
- `.sector-icon` — 24×24 stroke SVG, `currentColor`.
- `.stat` / `.stat-label` / `.stat-value` — CompanyCard stat strip.
- `.callout` (accent left border + tint), `.callout-warn` (amber) — key
  summary boxes inside reports.
- `.evidence` + variants `.evidence-f|m|e|i` — provenance labels
  (`[F]`-style); default neutral for `S`.
- `.scenario-cards` / `.scenario-card` — Bull/Base/Bear cards with
  `.sc-target` price and assumption list.

## 6. Tables

- `.table-wrap` — scrollable frame (overflow-x) + 1px border + radius.
- `.fin-table` — `min-width: 520px`, sticky header optional; hover row
  highlight; first column left-aligned label.
- Table headers use `(E)` suffix for estimate columns; footnotes use
  `.evidence` labels.

## 7. Responsive Rules

- Desktop-first; the layout collapses under ~900px:
  - `ReportToc` sidebar hides (scrollspy removed from flow) — report
    remains single-column readable.
  - `key-value-grid`/`scenario-cards`/`peers-grid` become single/2-column.
  - Nav switches to hamburger menu (`Nav` `mobileOpen` state).
- Fluid type via `clamp()` in hero headings.

## 8. Animations

- Theme transition: `background/color 0.25s ease`.
- `html { scroll-behavior: smooth; scroll-padding-top: 90px }`.
- Card hover: `--shadow-hover` lift, 0.2–0.3s transitions.
- No decorative keyframe animations (performance + institutional tone).

## 9. Accessibility Notes

- Decorative icons/avatars: `aria-hidden`.
- Nav: hamburger toggles `aria-expanded`; skip-link patterns followed where
  practical.
- Contrast: `--text-45` only for captions (large/auxiliary), never body copy.
- Focus styles rely on default browser outlines; keep them visible on
  `.dark` surfaces (check when adding surfaces).

## 10. Adding New Styles

1. Add tokens to `:root` + `.dark` in `globals.css` (never hardcode a color
   in a component).
2. Reuse pattern classes; only create new ones when the pattern is new.
3. Document new patterns in this file in the same change.
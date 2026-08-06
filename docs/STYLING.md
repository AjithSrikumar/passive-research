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
| `--text-45` | `rgba(17,24,39,.58)` | `rgba(241,245,249,.58)` | Muted/caption text (AA-compliant on both themes) |
| `--bg` | `#ffffff` | `#0b1220` | Page background |
| `--bg-soft` | `#f8fafc` | `#0f172a` | Card/section background |
| `--bg-softer` | `#f1f5f9` | `#131c2e` | Hover/raised surfaces |
| `--bg-softest` | `#e2e8f0` | `#1b2540` | Borders on soft surfaces |
| `--border` | `#eef2f7` | `#1e293b` | Default border |
| `--border-2` | `#dde3ea` | `#2b3a55` | Stronger border |
| `--glass` | `rgba(255,255,255,.82)` | `rgba(11,18,32,.82)` | Sticky header background |
| `--positive` | `#059669` | `#34d399` | Upside/positive values |
| `--negative` | `#dc2626` | `#f87171` | Downside/negative values |

### Radii, shadows, spacing, type, fonts

| Token | Value | Use |
|---|---|---|
| `--radius-sm/md/lg` | `6px / 8px / 12px` | Controls (buttons, inputs, tables, kv-items) |
| `--radius-card` | `20px` | Cards |
| `--radius-pill` | `1000px` | Badges, filter pills, nav pills |
| `--shadow-xs/sm/md/lg` | 4-step elevation scale | `sm` = resting cards, `md` = hover, `lg` = overlays |
| `--shadow-card` | `var(--shadow-sm)` | Resting card surface |
| `--shadow-hover` | `var(--shadow-md)` | Hover elevation |
| `--space-1..16` | `4/8/12/16/20/24/32/40/48/64px` | 4px spacing scale (padding/gaps) |
| `--gap-grid` | `24px` (`20px` ≤1024, `16px` ≤640) | Grid gutters |
| `--type-xs..5xl` | `12/13.5/15/16.5/18/22/26/34/44px` | Type scale |
| `--font-body` | `var(--font-dm-sans)`, DM Sans, Inter, system-ui | Body |
| `--font-mono` | SFMono-Regular, Menlo, Consolas | Mono/figures |

## 2. Typography

- **Family:** DM Sans (`next/font/google`, `--font-dm-sans`), latin subset,
  `display: swap`.
- **Scale:** `h1` (hero ~clamp), `h2` section titles (reports/methodology),
  `h3` sub-sections, body 15–16px, `line-height: 1.7`.
- **Micro-text:** `--text-45` captions, `eyebrow` (letter-spaced uppercase
  label above page heroes), `last-updated`.
- **Numerics:** `font-variant-numeric: tabular-nums` applied to `.stat-value`,
  `.kv-item b`, `.report-quick-stat b`, `.fin-table td`, `.sc-target` so
  prices/capitals/valuations don't jitter; prices always via `formatPrice`
  (`₹` + Indian grouping).

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

- `.company-logo` — logo square: `border-radius: 12px`, `overflow: hidden`,
  light backdrop (`--bg-soft`), small shadow. Contains the company logo
  image (`.company-logo img`: `object-fit: contain`, `background: #fff`,
  `padding: 12%`) or, on load failure, the gradient-initials square
  (`linear-gradient(135deg, logoColor, logoColorcc)` + white initials).
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

- **Mobile-first grids** — `companies-grid` / `sectors-grid` column counts:
  1 (base) → 2 (≥480) → 3 (≥768, ≥1100) → 4 (≥1280) → 5 (≥1600 for
  companies). Gaps follow `--gap-grid` (24/20/16).
- `.section-inner` max-width 1400px (dense ultra-wide layouts).
- Desktop collapse rules (~1100px and below):
  - `ReportToc` sidebar hides (scrollspy removed from flow) — report
    remains single-column readable.
  - `key-value-grid`/`scenario-cards`/`peers-grid` become single/2-column.
  - Nav switches to hamburger menu (`Nav` `mobileOpen` state) ≤980px.
- Fluid type via `clamp()` in hero headings.

## 8. Animations

- Theme transition: `background/color 0.25s ease`.
- `html { scroll-behavior: smooth; scroll-padding-top: 90px }`.
- Card hover: `--shadow-hover` lift, **0.14s** transitions.
- No decorative keyframe animations (performance + institutional tone).
- `prefers-reduced-motion: reduce` disables all animation/transition
  durations (0.01ms).

## 9. Accessibility Notes

- Decorative icons/avatars: `aria-hidden`.
- Nav: hamburger toggles `aria-expanded`; skip-link patterns followed where
  practical.
- Contrast: `--text-45` (now 0.58 alpha) passes WCAG AA for small text on
  both themes; `--text-65` well above.
- Focus: global `:focus-visible` ring (`2px solid var(--accent)`,
  2px offset) — visible on both themes; `:target { scroll-margin-top }`.
- Tap targets: `.btn` ≥44px height, `.filter-pill` ≥44px, `.theme-toggle`
  44px, nav links ≥44px hit area.
- Numbers use `tabular-nums`; rows `aria-hidden` decorations never carry
  meaning.

## 10. Adding New Styles

1. Add tokens to `:root` + `.dark` in `globals.css` (never hardcode a color
   in a component).
2. Reuse pattern classes; only create new ones when the pattern is new.
3. Document new patterns in this file in the same change.
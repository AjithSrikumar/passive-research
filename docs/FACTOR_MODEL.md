# FACTOR_MODEL.md — Factor Scoring & Backtest Specification

> The single source of truth for the factor model. The Excel workbook
> `GQVM Factor Dashboard.xlsx` (repo root, **not committed**) is the
> *source dataset*; every derived number in the DB (percentiles, block
> scores, composites, backtest returns) is recomputed by the pipeline in
> `scripts/factor-model/` according to this document — workbook formulas are
> never imported as scores.
>
> Model version: **v2.0 (GQVM)** (2026-08-09). Replaces the v1.0
> `Factor-Dashboard-v4_Unbiased.xlsx` model. The dashboard's own cached
> scores/portfolios/backtest are used as a **validation oracle**: the import
> gates DB writes on exact parity (see §8). See `docs/DECISIONS.md` ADR-013.

## 1. Universe

- **900 companies** from the `Companies` sheet (rows 5–904; header row 4,
  identifier column B, e.g. `RELI.NS`).
- Per-year membership comes from the `Nifty500_Composition` sheet
  (columns 3..18 = calendar years 2013..2026): a company is a member of
  fiscal year FY*yy* iff it appears in the composition column for calendar
  year 20*yy* AND its `Coverage_Map` status is `Covered` (coverage rows 5+,
  name col B, RIC col E, status col F). The member list is intersected with
  the `Companies` sheet and **deduped keeping the first RIC occurrence**.
- Universe sizes FY13..FY26 (matches the dashboard exactly): 381, 403, 416,
  426, 433, 439, 442, 450, 459, 460, 461, 475, 492, 496.
- Linked to the site's covered companies via `factor_companies.company_slug`
  (nullable FK → `companies.slug`); matches established by company-name
  mapping (`scripts/factor-model/map-names.ts`). 132/133 site companies map;
  132/900 RICs have slugs.

## 2. Fiscal years

Fiscal years FY12–FY26 (Indian FY, April–March; **FY26 is the live year** —
scored and ranked, but no forward return exists). Metric sheets hold
columns D… = FY12…FY26 (header row 4, data rows 5–904). Scored/ranked years:
**FY13–FY26** (14 years); FY12 exists only as the momentum/return base year.

## 3. Metric catalogue

Raw metric values come from the workbook sheets (header row 4, data rows 5+,
columns D… = FY12…FY26). `factor_values.missing` marks blank cells.
Momentum is **recomputed from prices** (see §4).

| Block | Weight | Metric (sheet) | Direction |
|---|---|---|---|
| Growth | 20% | Rev_3Yr_CAGR | higher better |
| Growth | | Rev_5Yr_CAGR | higher better |
| Growth | | EBITDA_3Yr_CAGR | higher better |
| Growth | | EBITDA_5Yr_CAGR | higher better |
| Growth | | PAT_3Yr_CAGR | higher better |
| Growth | | PAT_5Yr_CAGR | higher better |
| Growth | | EPS_3Yr_CAGR | higher better |
| Growth | | CFO_3Yr_CAGR | higher better |
| Quality | 10% | ROCE | higher better |
| Quality | | ROE | higher better |
| Quality | | Div_Payout_Ratio | higher better |
| Quality | | NI_to_CFO | higher better |
| Quality | | Current_Ratio | higher better |
| Quality | | Interest_Coverage | higher better |
| Quality | | Net_Debt_Equity | **lower better** |
| Quality | | Net_Trade_Cycle | **lower better** |
| Valuation | 60% | P_E | lower better |
| Valuation | | P_BV | lower better |
| Valuation | | P_CF | lower better |
| Valuation | | P_CFO | lower better |
| Valuation | | P_FCF | lower better |
| Valuation | | EV_EBIT | lower better |
| Valuation | | EV_EBITDA | lower better |
| Momentum | 10% | momentum_1y (from Price_Close) | higher better |

- Factor weights confirmed by the dashboard's `Parameters` tab and the
  `Backtest_Results` summary: **G 0.2 / Q 0.1 / V 0.6 / M 0.1**.
- Within-block metric weights are equal (each present metric counts 1,
  renormalized within the block).
- Excluded by design from the dashboard (not imported): Enterprise_Value,
  CFO_per_Share, Rev_per_Share, and the 52W_Total_Return sheet.

## 4. Momentum

- `Price_Close` sheet: one close per fiscal year per company (e.g.
  RELI FY12 = 563.48, FY13 = 680.82, FY14 = 773.54).
- Momentum for FY _t_ = `close(FY_t)/close(FY_t−1) − 1` (1-year, same
  sampling point as the dashboard's own momentum column — verified: the
  dashboard's Factor_Scores_by_Year momentum values equal this recompute).
- The pipeline recomputes momentum from `Price_Close` and stores it in
  `factor_price_history.momentum_1y_pct`; the 52W_Total_Return sheet is
  **ignored**.

## 5. Scoring algorithm (per fiscal year, independently)

1. **Eligibility:** members of the year's Nifty500 composition that are
   `Covered` and present in the `Companies` sheet (§1). FY12 has no
   universe (prices only).
2. **Percentile per metric:** among eligible companies with a non-missing
   value, score = `COUNTIF(values < v) / (n − 1)` in [0,1] (exactly the
   dashboard's formula; the minimum value scores 0). For **lower-better**
   metrics the score is inverted: `1 − COUNTIF(< v)/(n − 1)`. A metric
   requires a cross-section of ≥ 2 (MIN_CROSS_SECTION) to count.
3. **Block score:** mean of the available metric percentiles within the
   block (missing metrics are never treated as 0).
4. **Composite:** weighted mean of the four block scores, **renormalized
   over the available blocks** — a block counts as available when at least
   one metric percentile exists for the company, even if its score is
   exactly 0. Reproduces the dashboard's composites to 1e-16.
5. **Rankability:** a company is ranked only when it has ≥ 3 (minFactors)
   available block scores. Ties broken by RIC. Ranks 1..N per year.

## 6. Backtest (Top-20, matches the dashboard)

The dashboard's own backtest (Backtest_Results sheet) is reproduced
exactly (validation gates in §8):

- **Signal date:** end of FY _t_ (30 June; the FY-end `Price_Close`).
- **Selection:** top-20 (nPort) eligible companies by composite score.
- **Entry/exit:** entry at the close of FY _t_, exit at the close of
  FY _t_+1; return = `close(FY_t+1)/close(FY_t) − 1`, equal-weighted across
  holdings with a forward price (holdings with a flat carried-forward
  price return 0 and are included).
- **Benchmark:** the **Nifty 50 PRICE index** annual return
  (`Benchmark_Nifty50` sheet, end-June closes): FY13 30.3%, FY14 9.9%,
  FY15 −1.0%, FY16 14.9%, FY17 12.5%, FY18 10.0%, FY19 −12.6%, FY20 52.6%,
  FY21 0.4%, FY22 21.6%, FY23 25.1%, FY24 6.3%, FY25 −6.5%.
- **IC:** Spearman rank correlation of composite vs. realized 1-year return
  across ranked companies (N ≥ 30 required, else NULL).
- **NAV:** chained from 100 at the first signal year (FY13).
- Years tested: **FY13–FY25** (FY26 is live — no exit price yet).
- Dashboard target (validated to 1e-9): mean portfolio **19.97%**,
  mean benchmark **12.59%**, CAGR **18.14%**, NAV **873.33**, Sharpe **0.622**,
  MDD **−11.06%**, hit rate 69.2%, IR 0.321.
- Results land in `backtest_years` + `backtest_constituents`
  (derived tables, DELETE + rebuilt every import) and `factor_benchmark`
  (per-signal-year benchmark returns), seeded by the shared engine with
  `DEFAULT_BACKTEST_PARAMS`.

## 6.1 Interactive backtest (user-adjustable parameters)

The backtest is **parametric**: factor weights, metrics inside each factor,
MinN, MinFactors and Top-N are runtime inputs. The math lives in one
shared, pure module — `src/lib/factor/engine.ts` (`runFactorBacktest`) —
used by all three consumers, so numbers always agree:

- **Import/seeding** — `scripts/factor-model/import.ts` runs the engine
  with the GQVM defaults to populate `backtest_years` /
  `backtest_constituents`; the build-time snapshot
  (`src/lib/factor/backtest.ts`) is regenerated from those tables.
- **Live API** — `POST /api/factor/backtest` (dynamic server route) reads
  the DB mirror, validates caller parameters (block weights 0..10,
  metric weights 0..10 where 0 = excluded, minN 2..500, minFactors 1..4,
  topN 1..100) and returns yearly results + constituents. Unspecified
  metric weights merge over the model defaults (`weight_in_block`).
- **UI** — `/backtest` renders the static snapshot instantly and offers
  sliders for the four factor weights, per-metric on/off chips grouped by
  factor, MinN/MinFactors/Top-N selects and a Run button; a year dropdown
  shows each year's Top-N portfolio, plus a **live FY2026 portfolio panel**
  (the current top-20 by composite). If the API is unavailable (no
  `DATABASE_URL` on the host), the page keeps showing the static snapshot
  with a note.

Conventions are identical to §6 (signal/entry at FY-end close, exit at
FY+1 close, equal-weight Top-N, benchmark = Nifty 50 PRICE index from
`factor_benchmark` with equal-weight-universe fallback, Spearman IC N ≥ 30,
momentum recomputed from prices).

## 6.2 Default-parameter optimization (optimizer)

`npm run factor:optimize` (`scripts/factor-model/optimize.ts`) runs an
**exploratory** grid search over the workbook data (no DB needed)
maximizing the mean Top-N portfolio return over FY13..FY25, staged for
speed with a precomputed percentile cache:

1. block weights (0..1 in 0.25 steps, momentum = remainder, plus the
   model default 0.2/0.1/0.6/0.1) with model metric defaults;
2. per-block metric inclusion (defaults / single-metric / leave-one-out);
3. MinN (2..100) × Top-N (10..30) with the best weights;
4. block weights re-searched with the best metric set.

The search result is **reported only**. The written defaults stay pinned to
the dashboard's recommended GQVM configuration — `DEFAULT_BACKTEST_PARAMS`
(0.2/0.1/0.6/0.1, all 24 metrics, minN 2, minFactors 3, topN 20), used by
import + UI defaults — because import's validation gates (§8) require the
backtest tables to match the dashboard exactly. `OPTIMIZER_SUMMARY` carries
the engine-computed stats of the recommended configuration (identical to
the dashboard's Backtest_Results).

## 7. Validation & import gates

`scripts/factor-model/import.ts` recomputes everything from the workbook
and compares against the dashboard's **cached** outputs before writing:

- composite vs `Factor_Scores_by_Year` (rank match 5,656/5,656; max abs
  diff 1e-16);
- top-20 portfolio RICs vs `Portfolio_by_Year` SELECTED rows (13/13 years);
- per-year strategy + benchmark returns vs the `Backtest_Results` annual
  table (13/13 years);
- NAV chain and full stats (CAGR/vol/Sharpe/MDD/hit rate/IR) vs the
  dashboard summary.

Any check failing within 1e-9 aborts the DB writes (exit 1). The FY2026
top-10 is printed as a live preview on every run.

## 8. Data-quality rules

- Empty cells → `missing = true`, never 0.
- Non-numeric junk in a metric cell → treated as missing (logged).
- Duplicate RIC rows (none expected) → first wins, logged.
- Derived tables (`factor_composites`, `factor_scores`,
  `universe_membership`, `backtest_*`) are **DELETE + rebuilt** on every
  import so no stale rows from prior model versions survive.
- The pipeline is **idempotent** (upsert, re-runnable end-to-end).

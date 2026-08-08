# FACTOR_MODEL.md — Factor Scoring & Backtest Specification

> The single source of truth for the factor model. The Excel workbook
> `Factor-Dashboard-v4_Unbiased.xlsx` (repo root, **not committed**) is the
> *source dataset*; every derived number in the DB (percentiles, block
> scores, composites, backtest returns) is recomputed by the pipeline in
> `scripts/factor-model/` according to this document — workbook formulas are
> never imported as scores.
>
> Model version: **v1.0** (2026-08-08). See `docs/DECISIONS.md` ADR-013.

## 1. Universe

- **NSE-900 universe** from the `Companies` sheet: **900 companies**,
  data rows 5–904 (1-indexed; row 2 = title, row 4 = header).
- Identifier = RIC-style code in column B (e.g. `RELI.NS`, `HDBK.NS`).
  845 companies have plain `*.NS` RICs; 55 carry a delisting/rename marker
  appended with `^` (e.g. `MINT.NS^K22` — MindTree, removed in period
  K-2022) or use `.BO` (e.g. `KENI.BO`). These are kept in the universe with
  `removed_period` populated; the screener hides them by default.
- Linked to the site's covered companies via `factor_companies.company_slug`
  (nullable FK → `companies.slug`); matches are established by company-name
  mapping (see `scripts/factor-model/map-names.ts`).

## 2. Fiscal years

15 fiscal years **FY12–FY26** (Indian FY, April–March; FY26 is the current/
live year — no return can be computed for it). Columns D… of every metric
sheet, in order.

## 3. Metric catalogue

All raw metric values come from the workbook sheets (header row 4, data from
row 5, columns D… = FY12…FY26). `factor_values.missing` marks blank cells.

| Block | Weight | Metric (sheet) | Direction |
|---|---|---|---|
| Growth | 30% | Rev_3Yr_CAGR | higher better |
| Growth | | Rev_5Yr_CAGR | higher better |
| Growth | | EBITDA_3Yr_CAGR | higher better |
| Growth | | EBITDA_5Yr_CAGR | higher better |
| Growth | | PAT_3Yr_CAGR | higher better |
| Growth | | PAT_5Yr_CAGR | higher better |
| Growth | | EPS_3Yr_CAGR | higher better |
| Growth | | CFO_3Yr_CAGR | higher better |
| Quality | 30% | ROCE | higher better |
| Quality | | ROE | higher better |
| Quality | | Div_Payout_Ratio | higher better |
| Quality | | Current_Ratio | higher better |
| Quality | | Interest_Coverage | higher better |
| Quality | | NI_to_CFO | **lower better** |
| Quality | | Net_Debt_Equity | **lower better** |
| Quality | | Net_Trade_Cycle | **lower better** |
| Valuation | 30% | P_E | lower better |
| Valuation | | P_BV | lower better |
| Valuation | | P_CF | lower better |
| Valuation | | P_CFO | lower better |
| Valuation | | P_FCF | lower better |
| Valuation | | EV_EBIT | lower better |
| Valuation | | EV_EBITDA | lower better |
| Momentum | 10% | Price_Close_HY% | higher better |

- Within-block weights: Growth 8 metrics × 12.5% = 100% of block;
  Quality 8 × 12.5% = 100%; Valuation 7 × 14.2857% ≈ 100%; Momentum 1 × 100%.
  (Confirmed by the workbook's own `Model_Assumptions` sheet — factor weights
  0.3/0.3/0.3/0.1, MinN 100, directions 1/−1, within-factor weights 0.125 /
  0.142857 — plus the valuation continuation P_FCF, EV_EBIT, EV_EBITDA.)
- Composite = 0.30·Growth + 0.30·Quality + 0.30·Valuation + 0.10·Momentum.
- **Valuation direction:** in the workbook a *lower* P/E is better; the
  percentile ranking inverts valuation metrics before averaging.

## 4. Momentum — the Price_Close_HY% fix

- `Price_Close` sheet: one close per fiscal year per company (900 data rows;
  e.g. RELI FY12 = 563.48, FY13 = 680.82, FY14 = 773.54).
- **Workbook bug (confirmed):** the `Price_Close_HY%` value for FY14 in the
  workbook equals `close(FY14)/close(FY12) − 1` (RELI: 773.54/563.48 − 1 =
  0.3728) — i.e. a *2-year* return, contradicting its "YoY" label.
- **Corrected definition (v1.0):** momentum for FY _t_ =
  `close(FY_t)/close(FY_t−1) − 1` (1-year, same half-year sampling point).
  RELI FY14 → 773.54/680.82 − 1 ≈ **0.1362**. Validation uses this sample.
- The pipeline recomputes momentum from `Price_Close` and stores it in
  `factor_price_history.momentum_1y_pct`; the workbook's HY% values are
  **ignored**.

## 5. Scoring algorithm (per fiscal year, independently)

1. **Eligibility:** fiscal year ≥ FY13 requires Nifty500 membership
   (`universe_membership.is_member`, from the `Nifty500_Membership` sheet —
   FY12 column is blank: no membership history, so FY12 uses the full
   universe). Min universe size **N ≥ 100**, else no scores are emitted for
   that year.
2. **Percentile per metric:** among eligible companies with a non-missing
   value, rank ascending by value; score = `rank / (n_valid − 1)` in
   [0,1]. For **lower-better** metrics use the inverted score
   `1 − rank/(n_valid − 1)`.
3. **Block score:** weighted average of the available metric percentiles,
   **renormalized** across metrics that are non-missing (a company with 7 of
   8 Growth metrics present gets its block score from those 7, each weighted
   12.5/87.5 — missing metrics are never treated as 0).
4. **Composite:** weighted sum of the four block scores (see §3).
5. **Ranks:** companies ranked 1..N per year by composite (ties broken by
   RIC) — stored in `factor_scores.rank`; used by the screener and backtest.

## 6. Backtest (Top-20, replaces the workbook's quintile design)

The workbook's `Backtest`/`Performance_Summary` sheets (rows 5–17, FY13–FY25,
quintile Q1/Q5/IC/#Eligible 434–499) use an unreproducible return convention
(several candidate definitions were tested against the workbook's own detail
tables and none matched; the workbook's momentum values in those tables are
also the buggy 2-year figures). **v1.0 defines a clean, no-look-ahead
convention** and recomputes everything:

- **Signal date:** end of FY _t_ (data as of March 31 of year _t_).
- **Selection:** Top-20 eligible companies by composite score at the signal
  date (eligible = §5.1; exact-20, N/A if fewer than 20 eligible).
- **Entry:** at the close of FY _t_+1? — **No.** Entry = close of FY _t_
  (signal/entry coincide at FY-end); **Exit:** close of FY _t_+1.
- **Return:** `close(FY_t+1)/close(FY_t) − 1`, equal-weighted across the 20.
- **Benchmark:** equal-weighted mean return of all eligible companies in the
  same year; **excess** = portfolio − benchmark; **IC** = Spearman rank
  correlation of composite vs. realized 1-year return across eligible
  companies (N ≥ 30 required, else NULL).
- Years tested: **FY13–FY25** (FY26 is live — no exit price yet).
- Results land in `backtest_years` + `backtest_constituents` (per-year top-20
  with prices/returns); the workbook's quintile tables are not imported.

## 7. Data-quality rules

- Empty cells → `missing = true`, never 0.
- Non-numeric junk in a metric cell → treated as missing (logged).
- Duplicate RIC rows (none expected) → first wins, logged.
- The pipeline is **idempotent** (upsert, re-runnable end-to-end).

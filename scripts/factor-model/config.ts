// GQVM factor model configuration (source: GQVM Factor Dashboard.xlsx).
// Model spec (see the workbook's Methodology_Notes tab):
//  - Universe: per-year Nifty500 constituent list (Nifty500_Composition)
//    intersected with Coverage_Map (Status='Covered'); duplicate RICs within
//    a year keep only the first occurrence.
//  - 23 metrics (8 growth / 8 quality / 7 value) percentile-ranked within
//    the year's included universe: p = COUNTIF(< v) / (COUNT - 1), inverted
//    for quality's Net Debt/Equity + Net Trade Cycle and all 7 value metrics.
//  - Momentum = Price_Close[FYnn] / Price_Close[FYnn-1] - 1.
//  - Factor scores = mean of available metric percentiles; composite =
//    renormalized weighted mean (0.2/0.1/0.6/0.1); rankable only when >=
//    minFactors factor scores are present; ties broken by RIC.
//  - Portfolio = top-20 (nPort) by composite, equal weight at rebalance.
//  - Backtest FY13..FY25 rebalances, forward returns to FY26, NAV from 100 at
//    30-Jun-2013; benchmark = Nifty 50 PRICE index (Benchmark_Nifty50 tab).

export const WORKBOOK_PATH = "GQVM Factor Dashboard.xlsx";

export const FISCAL_YEARS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] as const;

/** Years with scored factor model data (FY13..FY26; FY26 = live, no forward return). */
export const SCORED_YEARS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] as const;

/** Backtest rebalance (signal) years. */
export const SIGNAL_YEARS = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25] as const;

export const HEADER_ROW = 4;
export const DATA_START_ROW = 5;
export const YEAR_COL_FIRST = 4; // col D = FY12

/** Live GQVM configuration (Parameters tab, recommended). */
export const FACTOR_WEIGHTS = { growth: 0.2, quality: 0.1, valuation: 0.6, momentum: 0.1 } as const;
export const MIN_FACTORS = 3;
export const TOP_N = 20;
export const RISK_FREE_RATE = 0.065;
export const NAV_START = 100;

/** Minimum cross-section for a metric's percentile to be defined (COUNT-1 denominator). */
export const MIN_CROSS_SECTION = 2;

export type Block = "growth" | "quality" | "valuation" | "momentum";

export interface MetricDef {
  key: string;
  sheet: string;
  block: Block;
  higherIsBetter: boolean;
  displayName: string;
}

export const METRICS: MetricDef[] = [
  { key: "rev_3yr_cagr", sheet: "Rev_3Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "Revenue 3Y CAGR" },
  { key: "rev_5yr_cagr", sheet: "Rev_5Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "Revenue 5Y CAGR" },
  { key: "ebitda_3yr_cagr", sheet: "EBITDA_3Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "EBITDA 3Y CAGR" },
  { key: "ebitda_5yr_cagr", sheet: "EBITDA_5Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "EBITDA 5Y CAGR" },
  { key: "pat_3yr_cagr", sheet: "PAT_3Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "PAT 3Y CAGR" },
  { key: "pat_5yr_cagr", sheet: "PAT_5Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "PAT 5Y CAGR" },
  { key: "eps_3yr_cagr", sheet: "EPS_3Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "EPS 3Y CAGR" },
  { key: "cfo_3yr_cagr", sheet: "CFO_3Yr_CAGR", block: "growth", higherIsBetter: true, displayName: "CFO 3Y CAGR" },
  { key: "roce", sheet: "ROCE", block: "quality", higherIsBetter: true, displayName: "ROCE" },
  { key: "roe", sheet: "ROE", block: "quality", higherIsBetter: true, displayName: "ROE" },
  { key: "div_payout_ratio", sheet: "Div_Payout_Ratio", block: "quality", higherIsBetter: true, displayName: "Dividend Payout Ratio" },
  { key: "ni_to_cfo", sheet: "NI_to_CFO", block: "quality", higherIsBetter: true, displayName: "NI to CFO" },
  { key: "current_ratio", sheet: "Current_Ratio", block: "quality", higherIsBetter: true, displayName: "Current Ratio" },
  { key: "interest_coverage", sheet: "Interest_Coverage", block: "quality", higherIsBetter: true, displayName: "Interest Coverage" },
  { key: "net_debt_equity", sheet: "Net_Debt_Equity", block: "quality", higherIsBetter: false, displayName: "Net Debt / Equity" },
  { key: "net_trade_cycle", sheet: "Net_Trade_Cycle", block: "quality", higherIsBetter: false, displayName: "Net Trade Cycle" },
  { key: "pe", sheet: "P_E", block: "valuation", higherIsBetter: false, displayName: "P/E" },
  { key: "pbv", sheet: "P_BV", block: "valuation", higherIsBetter: false, displayName: "P/BV" },
  { key: "pcf", sheet: "P_CF", block: "valuation", higherIsBetter: false, displayName: "P/CF" },
  { key: "pcfo", sheet: "P_CFO", block: "valuation", higherIsBetter: false, displayName: "P/CFO" },
  { key: "pfcf", sheet: "P_FCF", block: "valuation", higherIsBetter: false, displayName: "P/FCF" },
  { key: "ev_ebit", sheet: "EV_EBIT", block: "valuation", higherIsBetter: false, displayName: "EV/EBIT" },
  { key: "ev_ebitda", sheet: "EV_EBITDA", block: "valuation", higherIsBetter: false, displayName: "EV/EBITDA" },
  { key: "momentum_1y", sheet: "Price_Close", block: "momentum", higherIsBetter: true, displayName: "Momentum (1Y)" },
];

export const BLOCKS: Block[] = ["growth", "quality", "valuation", "momentum"];

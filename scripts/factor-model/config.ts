export const WORKBOOK_PATH = "Factor-Dashboard-v4_Unbiased.xlsx";

export const FISCAL_YEARS = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] as const;

export const HEADER_ROW = 4;
export const DATA_START_ROW = 5;
export const YEAR_COL_FIRST = 4; // col D = FY12

export const MIN_N = 100;
export const TOP_N = 20;

export type Block = "growth" | "quality" | "valuation" | "momentum";

export interface MetricDef {
  key: string;
  sheet: string;
  block: Block;
  blockWeight: number;
  weightInBlock: number;
  higherIsBetter: boolean;
  displayName: string;
}

export const METRICS: MetricDef[] = [
  { key: "rev_3yr_cagr", sheet: "Rev_3Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "Revenue 3Y CAGR" },
  { key: "rev_5yr_cagr", sheet: "Rev_5Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "Revenue 5Y CAGR" },
  { key: "ebitda_3yr_cagr", sheet: "EBITDA_3Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "EBITDA 3Y CAGR" },
  { key: "ebitda_5yr_cagr", sheet: "EBITDA_5Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "EBITDA 5Y CAGR" },
  { key: "pat_3yr_cagr", sheet: "PAT_3Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "PAT 3Y CAGR" },
  { key: "pat_5yr_cagr", sheet: "PAT_5Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "PAT 5Y CAGR" },
  { key: "eps_3yr_cagr", sheet: "EPS_3Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "EPS 3Y CAGR" },
  { key: "cfo_3yr_cagr", sheet: "CFO_3Yr_CAGR", block: "growth", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "CFO 3Y CAGR" },
  { key: "roce", sheet: "ROCE", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "ROCE" },
  { key: "roe", sheet: "ROE", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "ROE" },
  { key: "div_payout_ratio", sheet: "Div_Payout_Ratio", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "Dividend Payout Ratio" },
  { key: "ni_to_cfo", sheet: "NI_to_CFO", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: false, displayName: "NI to CFO" },
  { key: "current_ratio", sheet: "Current_Ratio", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "Current Ratio" },
  { key: "interest_coverage", sheet: "Interest_Coverage", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: true, displayName: "Interest Coverage" },
  { key: "net_debt_equity", sheet: "Net_Debt_Equity", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: false, displayName: "Net Debt / Equity" },
  { key: "net_trade_cycle", sheet: "Net_Trade_Cycle", block: "quality", blockWeight: 0.3, weightInBlock: 0.125, higherIsBetter: false, displayName: "Net Trade Cycle" },
  { key: "pe", sheet: "P_E", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "P/E" },
  { key: "pbv", sheet: "P_BV", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "P/BV" },
  { key: "pcf", sheet: "P_CF", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "P/CF" },
  { key: "pcfo", sheet: "P_CFO", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "P/CFO" },
  { key: "pfcf", sheet: "P_FCF", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "P/FCF" },
  { key: "ev_ebit", sheet: "EV_EBIT", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "EV/EBIT" },
  { key: "ev_ebitda", sheet: "EV_EBITDA", block: "valuation", blockWeight: 0.3, weightInBlock: 1 / 7, higherIsBetter: false, displayName: "EV/EBITDA" },
  { key: "momentum_1y", sheet: "Price_Close_HY%", block: "momentum", blockWeight: 0.1, weightInBlock: 1, higherIsBetter: true, displayName: "Momentum (1Y)" },
];

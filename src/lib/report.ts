import type { Company } from "./companies";
import { formatIndian, formatPrice, getPeers } from "./companies";
import { getSector, sectorName } from "./sectors";

export interface Section {
  id: string;
  label: string;
}

export const reportToc: Section[] = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "investment-thesis", label: "Investment Thesis" },
  { id: "business-overview", label: "Business Overview" },
  { id: "business-model", label: "Business Model" },
  { id: "revenue-breakdown", label: "Revenue Breakdown" },
  { id: "geographic-mix", label: "Geographic Mix" },
  { id: "segment-analysis", label: "Segment Analysis" },
  { id: "competitive-positioning", label: "Competitive Positioning" },
  { id: "industry-overview", label: "Industry Overview" },
  { id: "market-size", label: "Market Size" },
  { id: "growth-drivers", label: "Growth Drivers" },
  { id: "management-quality", label: "Management Quality" },
  { id: "corporate-governance", label: "Corporate Governance" },
  { id: "financial-analysis", label: "Financial Analysis" },
  { id: "balance-sheet", label: "Balance Sheet" },
  { id: "capital-allocation", label: "Capital Allocation" },
  { id: "historical-performance", label: "Historical Performance" },
  { id: "forecasts", label: "Forecasts" },
  { id: "valuation", label: "Valuation" },
  { id: "target-price", label: "Target Price" },
  { id: "risks", label: "Risks" },
  { id: "catalysts", label: "Catalysts" },
  { id: "esg", label: "ESG" },
  { id: "conclusion", label: "Conclusion" },
  { id: "appendix", label: "Appendix" },
];

export function readingTimeWords(c: Company): number {
  const base =
    550 +
    c.shortThesis.length * 0.8 +
    c.revenueGrowthPct * 22 +
    c.roePct * 12 +
    c.ebitdaMarginPct * 9 +
    c.marketCapCr.toString().length * 6;
  return Math.max(1800, Math.round(base));
}

export function readingTime(c: Company): string {
  const minutes = Math.round(readingTimeWords(c) / 220);
  return `${minutes} min read`;
}

export interface FinancialRow {
  metric: string;
  values: string[];
}

export function financialHistory(c: Company): FinancialRow[] {
  const rev = [c.revenueCr * 0.72, c.revenueCr * 0.84, c.revenueCr * 0.95, c.revenueCr];
  const profit = [c.netProfitCr * 0.5, c.netProfitCr * 0.68, c.netProfitCr * 0.86, c.netProfitCr];
  const fcf = [c.fcfCr * 0.55, c.fcfCr * 0.72, c.fcfCr * 0.9, c.fcfCr];
  return [
    { metric: "Revenue (₹ Cr)", values: rev.map((v) => formatIndian(v)) },
    { metric: "Revenue Growth (%)", values: [c.revenueGrowthPct - 7, c.revenueGrowthPct - 4, c.revenueGrowthPct - 1, c.revenueGrowthPct].map((v) => `${v.toFixed(1)}` ) },
    { metric: "EBITDA Margin (%)", values: [c.ebitdaMarginPct - 2, c.ebitdaMarginPct - 1, c.ebitdaMarginPct, c.ebitdaMarginPct + 0.5].map((v) => `${v.toFixed(1)}`) },
    { metric: "Net Profit (₹ Cr)", values: profit.map((v) => formatIndian(v)) },
    { metric: "ROE (%)", values: [c.roePct - 3, c.roePct - 1.5, c.roePct, c.roePct + 1].map((v) => `${v.toFixed(1)}`) },
    { metric: "ROCE (%)", values: [c.rocePct - 2, c.rocePct - 1, c.rocePct, c.rocePct + 0.5].map((v) => `${v.toFixed(1)}`) },
    { metric: "Free Cash Flow (₹ Cr)", values: fcf.map((v) => formatIndian(v)) },
  ];
}

export function forecasts(c: Company): FinancialRow[] {
  const g1 = c.revenueGrowthPct;
  const g2 = c.revenueGrowthPct + 2;
  const profit1 = c.netProfitCr * (1 + g1 / 100);
  const profit2 = profit1 * (1 + g2 / 100);
  return [
    { metric: "Revenue (₹ Cr)", values: [formatIndian(c.revenueCr * 1.1), formatIndian(c.revenueCr * 1.24)] },
    { metric: "Revenue Growth (%)", values: [g1.toFixed(1), g2.toFixed(1)] },
    { metric: "EBITDA Margin (%)", values: [(c.ebitdaMarginPct + 1).toFixed(1), (c.ebitdaMarginPct + 1.8).toFixed(1)] },
    { metric: "Net Profit (₹ Cr)", values: [formatIndian(profit1), formatIndian(profit2)] },
    { metric: "ROE (%)", values: [(c.roePct + 1.2).toFixed(1), (c.roePct + 2).toFixed(1)] },
  ];
}

export function growthCagr(c: Company): string {
  return ((c.revenueGrowthPct + 4) / 2).toFixed(1);
}

export function impliedPeOnTarget(c: Company): string {
  const eps = c.netProfitCr / (c.marketCapCr / c.currentPrice);
  if (eps <= 0 || !isFinite(eps)) return "—";
  return formatPrice(Math.round(c.targetPrice / eps));
}

export function sectorDescription(c: Company): string {
  return getSector(c.sector)?.description ?? "";
}

export { getPeers, sectorName };

export const upsides = (c: Company): string =>
  c.upsidePct >= 0 ? `+${c.upsidePct.toFixed(1)}%` : `${c.upsidePct.toFixed(1)}%`;

export function ratingLanguage(c: Company): string {
  switch (c.recommendation) {
    case "Strong Buy":
      return "strong conviction in the company's ability to outperform over a 24-month horizon";
    case "Buy":
      return "expect the company to outperform the broader market over a 12-24 month horizon";
    case "Accumulate":
      return "expect gradual upside; we recommend building positions on declines";
    case "Hold":
      return "expect performance broadly in line with the market at current valuations";
    case "Reduce":
      return "expect underperformance; we recommend trimming exposure on strength";
    case "Sell":
      return "expect material downside; we recommend exiting positions";
  }
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export interface ScenarioCase {
  name: "Bull" | "Base" | "Bear";
  revenueCagr: number;
  marginPct: number;
  exitMultiplePct: number;
  weightPct: number;
  target: number;
}

export function scenarioCases(c: Company): ScenarioCase[] {
  const baseMultiple = c.pe ?? 25;
  return [
    {
      name: "Bull",
      revenueCagr: c.revenueGrowthPct + 6,
      marginPct: round1(c.ebitdaMarginPct + 2.5),
      exitMultiplePct: round1(baseMultiple * 1.12),
      weightPct: 25,
      target: Math.round(c.targetPrice * 1.12),
    },
    {
      name: "Base",
      revenueCagr: c.revenueGrowthPct,
      marginPct: round1(c.ebitdaMarginPct + 1),
      exitMultiplePct: baseMultiple,
      weightPct: 50,
      target: Math.round(c.targetPrice),
    },
    {
      name: "Bear",
      revenueCagr: round1(Math.max(0, c.revenueGrowthPct * 0.35)),
      marginPct: round1(c.ebitdaMarginPct - 2.5),
      exitMultiplePct: round1(baseMultiple * 0.8),
      weightPct: 25,
      target: Math.round(c.currentPrice * 0.78),
    },
  ];
}

export function weightedTarget(c: Company): string {
  const s = scenarioCases(c);
  const w = Math.round(s[0].target * 0.25 + s[1].target * 0.5 + s[2].target * 0.25);
  return formatPrice(w);
}

export function impliedEps(c: Company): number | null {
  if (!c.pe || c.pe <= 0) return null;
  return (c.netProfitCr * c.currentPrice) / c.marketCapCr;
}

export interface PricedIn {
  eps0: number;
  epsFy2: number;
  impliedCagrPct: number;
  ourCagrPct: number;
  exitPeAtTarget: number;
}

export function pricedInAnalysis(c: Company, peerPe: number): PricedIn | null {
  if (!c.pe || c.pe <= 0 || !isFinite(peerPe) || peerPe <= 0) return null;
  const eps0 = (c.netProfitCr * c.currentPrice) / c.marketCapCr;
  const g1 = c.revenueGrowthPct;
  const g2 = c.revenueGrowthPct + 2;
  const profitFy2 = c.netProfitCr * (1 + g1 / 100) * (1 + g2 / 100);
  const epsFy2 = (profitFy2 * c.currentPrice) / c.marketCapCr;
  const impliedCagrPct = (Math.pow(c.pe / peerPe, 0.5) - 1) * 100;
  const ourCagrPct = eps0 > 0 ? (Math.pow(epsFy2 / Math.max(eps0, 0.01), 0.5) - 1) * 100 : 0;
  const exitPeAtTarget = epsFy2 > 0 ? c.targetPrice / epsFy2 : 0;
  return { eps0, epsFy2, impliedCagrPct, ourCagrPct, exitPeAtTarget };
}

export function totalReturnPct(c: Company): number {
  const div = (c.dividendYieldPct / 100) * c.currentPrice;
  return ((c.targetPrice - c.currentPrice + div) / c.currentPrice) * 100;
}

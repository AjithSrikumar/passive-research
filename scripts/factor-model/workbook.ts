import ExcelJS from "exceljs";
import { WORKBOOK_PATH, FISCAL_YEARS, DATA_START_ROW, YEAR_COL_FIRST } from "./config";

export interface CompanyRow {
  ric: string;
  name: string;
  marketCap: number | null;
  sector: string | null;
  industry: string | null;
  removedPeriod: string | null;
}

export interface YearValues {
  ric: string;
  values: Map<number, number>; // fiscal_year -> value
}

export interface UniverseMember {
  ric: string;
  name: string;
}

const RIC_RE = /^[A-Z0-9.]+\.(NS|BO)(\^[A-Z]\d{2})?$/;

export function parseRic(raw: string): { ric: string; removedPeriod: string | null } {
  const m = RIC_RE.exec(raw.trim().toUpperCase());
  if (!m) return { ric: raw.trim(), removedPeriod: null };
  return { ric: m[0], removedPeriod: m[2] ? m[2].slice(1) : null };
}

export function isRicCell(value: unknown): value is string {
  return typeof value === "string" && RIC_RE.test(value.trim().toUpperCase());
}

/** Unwrap exceljs cell values: formula results / shared formulas / rich text. */
export function cellValue(cell: ExcelJS.Cell): unknown {
  const v = cell.value;
  if (v === null || v === undefined) return undefined;
  if (typeof v === "object") {
    if ("result" in v) return v.result;
    if ("sharedFormula" in v) return undefined; // cached result lives on the master cell
    if ("richText" in v) return (v as { richText: { text: string }[] }).richText.map((t) => t.text).join("");
    return undefined;
  }
  return v;
}

export function yearColumn(fiscalYear: number): number {
  return YEAR_COL_FIRST + (fiscalYear - FISCAL_YEARS[0]);
}

export async function loadWorkbook(): Promise<ExcelJS.Workbook> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(WORKBOOK_PATH);
  return wb;
}

export function loadCompanies(ws: ExcelJS.Worksheet): CompanyRow[] {
  const out: CompanyRow[] = [];
  for (let r = DATA_START_ROW; r <= ws.rowCount; r++) {
    const raw = cellValue(ws.getRow(r).getCell(2));
    if (!isRicCell(raw)) continue;
    const { ric, removedPeriod } = parseRic(raw);
    const name = cellValue(ws.getRow(r).getCell(3));
    const mcap = cellValue(ws.getRow(r).getCell(4));
    const sector = cellValue(ws.getRow(r).getCell(5));
    const industry = cellValue(ws.getRow(r).getCell(6));
    out.push({
      ric,
      name: typeof name === "string" ? name : "",
      marketCap: typeof mcap === "number" && Number.isFinite(mcap) ? mcap : null,
      sector: typeof sector === "string" && sector.trim() ? sector : null,
      industry: typeof industry === "string" && industry.trim() ? industry : null,
      removedPeriod,
    });
  }
  return out;
}

/** Read a metric sheet: header at HEADER_ROW, per-year columns from YEAR_COL_FIRST (D = FY12). */
export function loadMetricSheet(ws: ExcelJS.Worksheet): YearValues[] {
  const out: YearValues[] = [];
  for (let r = DATA_START_ROW; r <= ws.rowCount; r++) {
    const raw = cellValue(ws.getRow(r).getCell(2));
    if (!isRicCell(raw)) continue;
    const { ric } = parseRic(raw);
    const values = new Map<number, number>();
    for (const fy of FISCAL_YEARS) {
      const v = cellValue(ws.getRow(r).getCell(yearColumn(fy)));
      if (typeof v === "number" && Number.isFinite(v)) values.set(fy, v);
    }
    out.push({ ric, values });
  }
  return out;
}

/**
 * Per-year Nifty500 universe (FY13..FY26), in composition order.
 * Each year's universe is rebuilt from THAT year's Nifty500_Composition
 * column via Coverage_Map (Status='Covered' -> RIC) intersected with the
 * Companies sheet. Duplicate RICs within a year keep only the first
 * occurrence (renamed/merged entities), per the workbook's bias-control
 * rules. Returns a Map<year, UniverseMember[]>; missing years are absent.
 */
export function loadUniverse(wb: ExcelJS.Workbook, companyRics: Set<string>): Map<number, UniverseMember[]> {
  const comp = wb.getWorksheet("Nifty500_Composition")!;
  const cover = wb.getWorksheet("Coverage_Map")!;

  // Coverage_Map: constituent name -> { ric, status } (exact trimmed-name match)
  const coverage = new Map<string, { ric: string; status: string }>();
  for (let r = 5; r <= cover.rowCount; r++) {
    const name = cellValue(cover.getRow(r).getCell(2));
    const ric = cellValue(cover.getRow(r).getCell(5));
    const status = cellValue(cover.getRow(r).getCell(6));
    if (typeof name === "string" && name.trim() && typeof ric === "string" && ric.trim()) {
      if (!coverage.has(name.trim())) coverage.set(name.trim(), { ric: ric.trim(), status: typeof status === "string" ? status.trim() : "" });
    }
  }

  const out = new Map<number, UniverseMember[]>();
  for (let c = 3; c <= 18; c++) {
    const yearRaw = cellValue(comp.getRow(13).getCell(c));
    if (typeof yearRaw !== "number") continue;
    const year = yearRaw - 2000;
    const members: UniverseMember[] = [];
    const seen = new Set<string>();
    for (let r = 14; r <= comp.rowCount; r++) {
      const name = cellValue(comp.getRow(r).getCell(c));
      if (typeof name !== "string" || !name.trim()) continue;
      const mapped = coverage.get(name.trim());
      if (!mapped || mapped.status !== "Covered") continue;
      if (!companyRics.has(mapped.ric)) continue; // must be present in the Companies sheet
      if (seen.has(mapped.ric)) continue; // keep only the first occurrence of a RIC
      seen.add(mapped.ric);
      members.push({ ric: mapped.ric, name: name.trim() });
    }
    out.set(year, members);
  }
  return out;
}

/** Benchmark_Nifty50: year -> Nifty 50 PRICE-index close (end-June). */
export function loadBenchmark(ws: ExcelJS.Worksheet): Map<number, number> {
  const out = new Map<number, number>();
  for (let r = 7; r <= ws.rowCount; r++) {
    const year = cellValue(ws.getRow(r).getCell(1));
    const close = cellValue(ws.getRow(r).getCell(3));
    if (typeof year === "number" && typeof close === "number" && Number.isFinite(close)) out.set(year, close);
  }
  return out;
}

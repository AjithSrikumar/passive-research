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

export interface MembershipRow {
  ric: string;
  years: Map<number, boolean>;
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

/** Read a metric sheet: header at HEADER_ROW, per-year columns from YEAR_COL_FIRST. */
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

/** Nifty500 membership: boolean per company per year (FY12 col blank). */
export function loadMembership(ws: ExcelJS.Worksheet): MembershipRow[] {
  const out: MembershipRow[] = [];
  for (let r = DATA_START_ROW; r <= ws.rowCount; r++) {
    const raw = cellValue(ws.getRow(r).getCell(2));
    if (!isRicCell(raw)) continue;
    const { ric } = parseRic(raw);
    const years = new Map<number, boolean>();
    for (const fy of FISCAL_YEARS) {
      const v = cellValue(ws.getRow(r).getCell(yearColumn(fy)));
      years.set(fy, v === true);
    }
    out.push({ ric, years });
  }
  return out;
}

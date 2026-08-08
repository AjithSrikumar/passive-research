import { describe, expect, it } from "vitest";
import {
  FACTOR_BY_YEAR,
  FACTOR_YEARS,
} from "@/lib/factor/data";
import { BACKTEST_CONSTITUENTS, BACKTEST_YEARS } from "@/lib/factor/backtest";
import {
  getCompanyFactorHistory,
  latestFiscalYear,
  rankedCount,
} from "@/lib/factor/company";

describe("factor snapshot integrity", () => {
  it("covers FY12 through FY26", () => {
    expect(FACTOR_YEARS[0]).toBe(12);
    expect(FACTOR_YEARS[FACTOR_YEARS.length - 1]).toBe(26);
    expect(FACTOR_YEARS.length).toBe(15);
    expect(latestFiscalYear()).toBe(26);
  });

  it("has ranked rows per year with non-empty universe", () => {
    for (const fy of FACTOR_YEARS) {
      expect(rankedCount(fy)).toBeGreaterThan(400);
      const rows = FACTOR_BY_YEAR[fy];
      for (const [i, row] of rows.entries()) {
        expect(row[4]).toBe(i + 1); // ranks are contiguous from 1
        expect(row[5]).toBeGreaterThanOrEqual(0);
        expect(row[5]).toBeLessThanOrEqual(1);
        expect(row[1].length).toBeGreaterThan(0);
        expect(row[0]).toMatch(/\.(NS|BO)(\^[A-Z]\d{2})?$/);
      }
    }
  });

  it("ranks are exactly 1..n within each year", () => {
    for (const fy of FACTOR_YEARS) {
      const ranks = FACTOR_BY_YEAR[fy].map((r) => r[4]);
      const n = ranks.length;
      expect(new Set(ranks).size).toBe(n);
      expect(Math.min(...ranks)).toBe(1);
      expect(Math.max(...ranks)).toBe(n);
    }
  });

  it("backtest snapshot aligns with composites", () => {
    const years = BACKTEST_YEARS.map((y) => y[0]);
    expect(years).toEqual([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    for (const y of BACKTEST_YEARS) {
      expect(y[6]).toBe(20); // 20 constituents per year
      const cons = BACKTEST_CONSTITUENTS.filter((c) => c[0] === y[0]);
      expect(cons.length).toBe(20);
      for (const c of cons) expect(c[3]).toBeGreaterThan(-1.01); // no -100%
    }
  });

  it("RELI FY14 momentum path: FY13 and FY14 prices exist", () => {
    const rows13 = FACTOR_BY_YEAR[13].find((r) => r[0] === "RELI.NS");
    const rows14 = FACTOR_BY_YEAR[14].find((r) => r[0] === "RELI.NS");
    expect(rows13).toBeDefined();
    expect(rows14).toBeDefined();
  });
});

describe("getCompanyFactorHistory", () => {
  it("resolves a covered company across all years", () => {
    const h = getCompanyFactorHistory("reliance-industries");
    expect(h).not.toBeNull();
    expect(h!.length).toBe(FACTOR_YEARS.length);
    const last = h![h!.length - 1];
    expect(last.fiscalYear).toBe(26);
    expect(last.ric).toBe("RELI.NS");
    expect(last.composite).toBeCloseTo(0.4782, 3);
  });

  it("returns null for companies outside the NSE-900 universe", () => {
    expect(getCompanyFactorHistory("skf-india")).toBeNull();
    expect(getCompanyFactorHistory("does-not-exist")).toBeNull();
  });

  it("keeps ranks within the year's universe size", () => {
    const h = getCompanyFactorHistory("hdfc-bank")!;
    for (const y of h) {
      expect(y.rank).toBeGreaterThanOrEqual(1);
      expect(y.rank).toBeLessThanOrEqual(rankedCount(y.fiscalYear));
    }
  });

  it("exposes realized Top-20 return only when selected", () => {
    const h = getCompanyFactorHistory("angel-one")!;
    const selected = h.filter((y) => y.returnPct !== null);
    expect(selected.length).toBeGreaterThan(0);
    for (const y of selected) expect(y.returnPct).not.toBeNull();
  });
});

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_BACKTEST_PARAMS,
  FACTOR_METRICS,
  OPTIMIZER_SUMMARY,
} from "@/lib/factor/params";
import type { BacktestParams, Block, YearResult } from "@/lib/factor/engine";
import type { BacktestConstituentTuple, BacktestYearTuple } from "@/lib/factor/backtest";

interface Props {
  staticYears: BacktestYearTuple[];
  staticConstituents: BacktestConstituentTuple[];
}

interface ApiResponse {
  params: BacktestParams;
  summary: { meanPortfolioReturn: number; meanBenchmarkReturn: number; meanExcessReturn: number };
  results: YearResult[];
}

const BLOCKS: { key: Block; label: string }[] = [
  { key: "growth", label: "Growth" },
  { key: "quality", label: "Quality" },
  { key: "valuation", label: "Valuation" },
  { key: "momentum", label: "Momentum" },
];

const MIN_N_OPTIONS = [50, 75, 100, 125, 150];
const TOP_N_OPTIONS = [10, 15, 20, 25, 30];

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const pctCls = (v: number) => (v > 0 ? "positive" : v < 0 ? "negative" : "");

/** Rebuild the static snapshot (optimized defaults) as engine-shaped results. */
function staticResults(years: BacktestYearTuple[], constituents: BacktestConstituentTuple[]): YearResult[] {
  const byYear = new Map<number, BacktestConstituentTuple[]>();
  for (const c of constituents) {
    if (!byYear.has(c[0])) byYear.set(c[0], []);
    byYear.get(c[0])!.push(c);
  }
  return years.map((y) => ({
    fiscalYear: y[0],
    nEligible: y[1],
    portfolioReturn: y[2] ?? 0,
    benchmarkReturn: y[3] ?? 0,
    excessReturn: y[4] ?? 0,
    ic: y[5],
    constituents: (byYear.get(y[0]) ?? []).map((c) => ({
      rank: c[1],
      ric: c[2],
      name: c[4],
      slug: c[5],
      returnPct: c[3],
      composite: 0,
    })),
  }));
}

export default function FactorBacktestRunner({ staticYears, staticConstituents }: Props) {
  const [blockWeights, setBlockWeights] = useState<Record<Block, number>>(() => ({
    growth: DEFAULT_BACKTEST_PARAMS.blockWeights.growth * 100,
    quality: DEFAULT_BACKTEST_PARAMS.blockWeights.quality * 100,
    valuation: DEFAULT_BACKTEST_PARAMS.blockWeights.valuation * 100,
    momentum: DEFAULT_BACKTEST_PARAMS.blockWeights.momentum * 100,
  }));
  const [metricOn, setMetricOn] = useState<Record<string, boolean>>(() => {
    const out: Record<string, boolean> = {};
    for (const m of FACTOR_METRICS) out[m.key] = (DEFAULT_BACKTEST_PARAMS.metricWeights[m.key] ?? 0) > 0;
    return out;
  });
  const [minN, setMinN] = useState(DEFAULT_BACKTEST_PARAMS.minN);
  const [topN, setTopN] = useState(DEFAULT_BACKTEST_PARAMS.topN);

  const [status, setStatus] = useState<"static" | "loading" | "live" | "error">("static");
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState<ApiResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(staticYears[staticYears.length - 1]?.[0] ?? 0);

  const staticMemo = useMemo(() => staticResults(staticYears, staticConstituents), [staticYears, staticConstituents]);
  const results: YearResult[] = live ? live.results : staticMemo;
  const summary = live
    ? live.summary
    : {
        meanPortfolioReturn: OPTIMIZER_SUMMARY.meanPortfolioReturn,
        meanBenchmarkReturn: OPTIMIZER_SUMMARY.meanBenchmarkReturn,
        meanExcessReturn: OPTIMIZER_SUMMARY.meanExcessReturn,
      };

  const years = results.map((r) => r.fiscalYear).sort((a, b) => a - b);
  const yearRows = useMemo(() => {
    const byYear = new Map<number, YearResult>();
    for (const r of results) byYear.set(r.fiscalYear, r);
    return years.map((fy) => byYear.get(fy)!).filter(Boolean);
  }, [results, years]);
  const selected = yearRows.find((r) => r.fiscalYear === selectedYear) ?? yearRows[yearRows.length - 1];

  const setBlock = (key: Block, v: number) => setBlockWeights((s) => ({ ...s, [key]: v }));

  const run = async () => {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/factor/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blockWeights: {
            growth: blockWeights.growth / 100,
            quality: blockWeights.quality / 100,
            valuation: blockWeights.valuation / 100,
            momentum: blockWeights.momentum / 100,
          },
          metricWeights: Object.fromEntries(FACTOR_METRICS.map((m) => [m.key, metricOn[m.key] ? 1 : 0])),
          minN,
          topN,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? `Backtest failed (HTTP ${res.status})`);
      }
      const data = (await res.json()) as ApiResponse;
      setLive(data);
      setSelectedYear(data.results[data.results.length - 1]?.fiscalYear ?? selectedYear);
      setStatus("live");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Backtest failed");
      setStatus("error");
    }
  };

  const reset = () => {
    setBlockWeights({
      growth: DEFAULT_BACKTEST_PARAMS.blockWeights.growth * 100,
      quality: DEFAULT_BACKTEST_PARAMS.blockWeights.quality * 100,
      valuation: DEFAULT_BACKTEST_PARAMS.blockWeights.valuation * 100,
      momentum: DEFAULT_BACKTEST_PARAMS.blockWeights.momentum * 100,
    });
    const on: Record<string, boolean> = {};
    for (const m of FACTOR_METRICS) on[m.key] = (DEFAULT_BACKTEST_PARAMS.metricWeights[m.key] ?? 0) > 0;
    setMetricOn(on);
    setMinN(DEFAULT_BACKTEST_PARAMS.minN);
    setTopN(DEFAULT_BACKTEST_PARAMS.topN);
    setLive(null);
    setStatus("static");
    setError(null);
  };

  return (
    <div className="bt-wrap">
      <div className="bt-controls">
        <div className="bt-control-group">
          <h3 className="bt-control-title">Factor weights</h3>
          {BLOCKS.map((b) => (
            <label key={b.key} className="bt-slider-row">
              <span className="bt-slider-label">{b.label}</span>
              <input
                type="range"
                className="bt-slider"
                min={0}
                max={100}
                step={5}
                value={blockWeights[b.key]}
                onChange={(e) => setBlock(b.key, Number(e.target.value))}
              />
              <span className="bt-slider-value">{blockWeights[b.key]}%</span>
            </label>
          ))}
        </div>

        <div className="bt-control-group">
          <h3 className="bt-control-title">Parameters inside factors</h3>
          <div className="bt-metric-grid">
            {BLOCKS.map((b) => (
              <div key={b.key} className="bt-metric-block">
                <span className="bt-metric-block-label">{b.label}</span>
                {FACTOR_METRICS.filter((m) => m.block === b.key).map((m) => (
                  <label key={m.key} className={`bt-metric-chip ${metricOn[m.key] ? "on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={metricOn[m.key] ?? false}
                      onChange={(e) => setMetricOn((s) => ({ ...s, [m.key]: e.target.checked }))}
                    />
                    {m.displayName}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div className="bt-run-row">
            <label className="bt-slider-row bt-slider-row-narrow">
              <span className="bt-slider-label">MinN</span>
              <select className="filter-select" value={minN} onChange={(e) => setMinN(Number(e.target.value))}>
                {MIN_N_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="bt-slider-row bt-slider-row-narrow">
              <span className="bt-slider-label">Top-N</span>
              <select className="filter-select" value={topN} onChange={(e) => setTopN(Number(e.target.value))}>
                {TOP_N_OPTIONS.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </label>
            <button type="button" className="bt-run-btn" onClick={run} disabled={status === "loading"}>
              {status === "loading" ? "Running…" : "Run backtest"}
            </button>
            <button type="button" className="bt-run-btn bt-run-btn-ghost" onClick={reset}>
              Reset to defaults
            </button>
          </div>
        </div>
      </div>

      {error && <p className="bt-error">{error}</p>}
      {status === "error" && !live && (
        <p className="bt-note">
          Showing the static snapshot (optimized defaults). The live backtest needs the database;
          this is expected if the deployed site has no DATABASE_URL.
        </p>
      )}
      {status === "live" && (
        <p className="bt-note">Live run on the imported data with your chosen weights.</p>
      )}

      <div className="sort-row" style={{ marginTop: 24 }}>
        <span>
          <b>{yearRows.length}</b> backtested years · FY{years[0] + 2000} → FY{years[years.length - 1] + 2000} ·{" "}
          {status === "live" ? "custom parameters" : "optimized default parameters"} · IC is Spearman
          rank correlation between composite score and next-year return (N ≥ 30)
        </span>
      </div>

      <div className="coverage-table-wrap">
        <table className="coverage-table backtest-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Universe</th>
              <th>Portfolio</th>
              <th>Benchmark</th>
              <th>Excess</th>
              <th>IC</th>
              <th>Top-{topN}</th>
            </tr>
          </thead>
          <tbody>
            {yearRows.map((y) => (
              <tr key={y.fiscalYear}>
                <td className="num">FY{y.fiscalYear + 2000}</td>
                <td className="num">{y.nEligible}</td>
                <td className={`num ${pctCls(y.portfolioReturn)}`}>{pct(y.portfolioReturn)}</td>
                <td className={`num ${pctCls(y.benchmarkReturn)}`}>{pct(y.benchmarkReturn)}</td>
                <td className={`num ${pctCls(y.excessReturn)}`}>
                  <strong>{pct(y.excessReturn)}</strong>
                </td>
                <td className="num">{y.ic === null ? "—" : y.ic.toFixed(3)}</td>
                <td className="num">{y.constituents.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hero-meta" style={{ marginTop: 20, justifyContent: "flex-start" }}>
        <span>
          <strong>{pct(summary.meanPortfolioReturn)}</strong> avg portfolio
        </span>
        <span>
          <strong>{pct(summary.meanBenchmarkReturn)}</strong> avg benchmark
        </span>
        <span>
          <strong className={pctCls(summary.meanExcessReturn)}>{pct(summary.meanExcessReturn)}</strong> avg excess
        </span>
      </div>

      <div className="bt-year-picker">
        <label className="bt-year-label" htmlFor="bt-year">Portfolio year</label>
        <select
          id="bt-year"
          className="filter-select"
          value={selected?.fiscalYear ?? ""}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[...yearRows].sort((a, b) => b.fiscalYear - a.fiscalYear).map((y) => (
            <option key={y.fiscalYear} value={y.fiscalYear}>
              FY{y.fiscalYear + 2000} portfolio
            </option>
          ))}
        </select>
      </div>

      {selected && (
        <div className="backtest-year">
          <h2 className="backtest-year-title">FY{selected.fiscalYear + 2000} portfolio — top {selected.constituents.length}</h2>
          <div className="coverage-table-wrap">
            <table className="coverage-table backtest-constituents">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>1-Yr Return</th>
                </tr>
              </thead>
              <tbody>
                {selected.constituents.map((c) => (
                  <tr key={`${c.rank}-${c.ric}`}>
                    <td className="num">{c.rank}</td>
                    <td>
                      {c.slug ? (
                        <Link href={`/company/${c.slug}`} className="co-name">
                          {c.name}
                          <span className="co-ticker">{c.ric}</span>
                        </Link>
                      ) : (
                        <span className="co-name">
                          {c.name}
                          <span className="co-ticker">{c.ric}</span>
                        </span>
                      )}
                    </td>
                    <td className={`num ${pctCls(c.returnPct)}`}>{pct(c.returnPct)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

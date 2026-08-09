// Grid-search optimizer for the GQVM factor backtest.
//
// Runs an exploratory search (block weights, per-metric inclusion, MinN,
// TopN) over the GQVM universe and reports the best configuration found.
// The written defaults stay pinned to the dashboard's recommended GQVM
// configuration (Parameters tab) — the /backtest page and import.ts depend
// on those exact defaults, and the import's validation gates guarantee
// parity with the dashboard.
//
// Run: npx tsx scripts/factor-model/optimize.ts
// Source: workbook only (no DB required).

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FISCAL_YEARS,
  METRICS,
  MIN_CROSS_SECTION,
  MIN_FACTORS,
  TOP_N,
  RISK_FREE_RATE,
  type Block,
} from "./config";
import { loadWorkbook, loadCompanies, loadMetricSheet, loadUniverse, loadBenchmark, cellValue } from "./workbook";
import { buildRicSlugMap } from "./map-names";
import {
  buildPercentileCache,
  computeStats,
  meanPortfolioReturn,
  runFactorBacktest,
  type BacktestParams,
  type FactorData,
  type MetricMeta,
  type PercentileCache,
} from "../../src/lib/factor/engine";

const __dir = dirname(fileURLToPath(import.meta.url));

const BLOCKS: Block[] = ["growth", "quality", "valuation", "momentum"];

/** GQVM recommended configuration (source of truth for written defaults). */
const MODEL_BLOCK_WEIGHTS: Record<Block, number> = { growth: 0.2, quality: 0.1, valuation: 0.6, momentum: 0.1 };

interface OptResult {
  params: BacktestParams;
  mean: number;
  meanBenchmark: number;
  meanExcess: number;
}

async function main() {
  const wb = await loadWorkbook();
  const companies = loadCompanies(wb.getWorksheet("Companies")!);
  const ricSet = new Set(companies.map((c) => c.ric));
  const metrics: MetricMeta[] = METRICS.map((m) => ({
    key: m.key,
    block: m.block,
    higherIsBetter: m.higherIsBetter,
    weightInBlock: 1,
  }));

  // ---- FactorData from the workbook (same pipeline as import.ts) ----
  const values = new Map<string, number>();
  for (const def of METRICS) {
    if (def.key === "momentum_1y") continue;
    for (const r of loadMetricSheet(wb.getWorksheet(def.sheet)!)) {
      if (!ricSet.has(r.ric)) continue;
      for (const [fy, v] of r.values) values.set(`${r.ric}|${def.key}|${fy}`, v);
    }
  }
  const closes = new Map<string, number>();
  for (const r of loadMetricSheet(wb.getWorksheet("Price_Close")!)) {
    if (!ricSet.has(r.ric)) continue;
    for (const [fy, v] of r.values) closes.set(`${r.ric}|${fy}`, v);
  }
  const universe = loadUniverse(wb, ricSet);
  const membership = new Map<string, boolean>();
  for (const fy of FISCAL_YEARS) {
    for (const c of companies) membership.set(`${c.ric}|${fy}`, false);
    const members = universe.get(fy) ?? [];
    for (const m of members) membership.set(`${m.ric}|${fy}`, true);
  }

  const benchmarkCloses = loadBenchmark(wb.getWorksheet("Benchmark_Nifty50")!);
  const benchmark = new Map<number, number>();
  for (let i = 1; i < FISCAL_YEARS.length; i++) {
    const fy = FISCAL_YEARS[i];
    if (fy > 25) break;
    const cur = benchmarkCloses.get(fy + 2001);
    const prev = benchmarkCloses.get(fy + 2000);
    if (cur !== undefined && prev !== undefined && prev !== 0) benchmark.set(fy, cur / prev - 1);
  }

  const coverage = wb.getWorksheet("Coverage_Map")!;
  const coverageNames: { name: string; ric: string }[] = [];
  for (let r = 5; r <= coverage.rowCount; r++) {
    const name = cellValue(coverage.getRow(r).getCell(2));
    const ric = cellValue(coverage.getRow(r).getCell(5));
    if (typeof name === "string" && name.trim() && typeof ric === "string" && ric.trim()) {
      coverageNames.push({ name: name.trim(), ric: ric.trim() });
    }
  }
  const { byRic } = buildRicSlugMap(coverageNames);
  const names = new Map<string, { name: string; slug: string | null }>();
  for (const c of companies) names.set(c.ric, { name: c.name, slug: byRic.get(c.ric) ?? null });

  const years = FISCAL_YEARS.filter((y) => y >= 13 && y <= 25);
  const data: FactorData = {
    years: [...years],
    metrics,
    values,
    membership,
    closes,
    names,
    benchmark,
  };
  console.log(`optimizer: years FY${data.years[0]}..FY${data.years[data.years.length - 1]}, ` +
    `companies ${names.size}, metrics ${metrics.length}`);

  // ---- parameter generators ----
  const metricWeights = (on: Set<string>): Record<string, number> => {
    const out: Record<string, number> = {};
    for (const m of metrics) out[m.key] = on.has(m.key) ? 1 : 0;
    return out;
  };
  const blockMetricOptions = (block: Block): Record<string, number>[] => {
    const inBlock = metrics.filter((m) => m.block === block);
    const all = inBlock.map((m) => m.key);
    if (all.length === 1) {
      return [metricWeights(new Set(all)), { [all[0]]: 0 }];
    }
    const opts: Record<string, number>[] = [];
    const allDefault = metricWeights(new Set(all));
    opts.push(allDefault);
    for (const k of all) {
      const single: Record<string, number> = {};
      for (const k2 of all) single[k2] = k2 === k ? 1 : 0;
      opts.push(single);
      const loo = { ...allDefault };
      loo[k] = 0;
      opts.push(loo);
    }
    return opts;
  };

  const blockWeightCandidates: Record<Block, number>[] = [];
  for (let g = 0; g <= 4; g++) {
    for (let q = 0; q <= 4 - g; q++) {
      for (let v = 0; v <= 4 - g - q; v++) {
        const sum = g + q + v;
        const bw: Record<Block, number> = {
          growth: g / 4,
          quality: q / 4,
          valuation: v / 4,
          momentum: sum === 4 ? 0 : (4 - sum) / 4,
        };
        if (bw.growth === 0 && bw.quality === 0 && bw.valuation === 0) continue;
        blockWeightCandidates.push(bw);
      }
    }
  }
  blockWeightCandidates.push(MODEL_BLOCK_WEIGHTS);

  const defaultMetricWeights = metricWeights(new Set(metrics.map((m) => m.key)));

  const base: BacktestParams = {
    blockWeights: MODEL_BLOCK_WEIGHTS,
    metricWeights: defaultMetricWeights,
    minN: MIN_CROSS_SECTION,
    minFactors: MIN_FACTORS,
    topN: TOP_N,
  };

  // ---- stage 1: block weights with model metric defaults ----
  let best: OptResult | null = null;
  const evaluate = (params: BacktestParams, cache: PercentileCache) => {
    const results = runFactorBacktest(data, params, cache);
    const mean = meanPortfolioReturn(results);
    if (!best || mean > best.mean) {
      const bench = results.reduce((s, r) => s + r.benchmarkReturn, 0) / results.length;
      const excess = results.reduce((s, r) => s + r.excessReturn, 0) / results.length;
      best = { params, mean, meanBenchmark: bench, meanExcess: excess };
    }
    return mean;
  };

  const cacheMinN = buildPercentileCache(data, MIN_CROSS_SECTION);
  for (const bw of blockWeightCandidates) {
    evaluate({ ...base, blockWeights: bw }, cacheMinN);
  }
  console.log(`stage 1 (block weights): best mean ${(best!.mean * 100).toFixed(2)}%`);

  // ---- stage 2: per-metric inclusion per block ----
  const growthOpts = blockMetricOptions("growth");
  const qualityOpts = blockMetricOptions("quality");
  const valuationOpts = blockMetricOptions("valuation");
  const momentumOpts = blockMetricOptions("momentum");
  let stage2Best: OptResult | null = null;
  let nStage2 = 0;
  for (const g of growthOpts) {
    for (const q of qualityOpts) {
      for (const v of valuationOpts) {
        for (const m of momentumOpts) {
          nStage2++;
          const merged = { ...g, ...q, ...v, ...m };
          const results = runFactorBacktest(data, { ...base, metricWeights: merged }, cacheMinN);
          const mean = meanPortfolioReturn(results);
          if (!stage2Best || mean > stage2Best.mean) {
            const bench = results.reduce((s, r) => s + r.benchmarkReturn, 0) / results.length;
            const excess = results.reduce((s, r) => s + r.excessReturn, 0) / results.length;
            stage2Best = { params: { ...base, metricWeights: merged }, mean, meanBenchmark: bench, meanExcess: excess };
          }
        }
      }
    }
  }
  console.log(`stage 2 (metric inclusion, ${nStage2} combos): best mean ${(stage2Best!.mean * 100).toFixed(2)}%`);
  best = stage2Best;

  // ---- stage 3: MinN x TopN grid ----
  let stage3Best: OptResult | null = null;
  for (const minN of [2, 10, 25, 50, 100]) {
    const cache = buildPercentileCache(data, minN);
    for (const topN of [10, 15, 20, 25, 30]) {
      const results = runFactorBacktest(data, { ...best!.params, minN, topN }, cache);
      const mean = meanPortfolioReturn(results);
      if (!stage3Best || mean > stage3Best.mean) {
        const bench = results.reduce((s, r) => s + r.benchmarkReturn, 0) / results.length;
        const excess = results.reduce((s, r) => s + r.excessReturn, 0) / results.length;
        stage3Best = { params: { ...best!.params, minN, topN }, mean, meanBenchmark: bench, meanExcess: excess };
      }
    }
  }
  console.log(`stage 3 (minN x topN): best mean ${(stage3Best!.mean * 100).toFixed(2)}% ` +
    `(minN ${stage3Best!.params.minN}, topN ${stage3Best!.params.topN})`);
  best = stage3Best;

  // ---- stage 4: block weights re-searched with the best metric set ----
  const finalCache = buildPercentileCache(data, stage3Best!.params.minN);
  for (const bw of blockWeightCandidates) {
    const results = runFactorBacktest(data, { ...stage3Best!.params, blockWeights: bw }, finalCache);
    const mean = meanPortfolioReturn(results);
    if (!best || mean > best.mean) {
      const bench = results.reduce((s, r) => s + r.benchmarkReturn, 0) / results.length;
      const excess = results.reduce((s, r) => s + r.excessReturn, 0) / results.length;
      best = { params: { ...stage3Best!.params, blockWeights: bw }, mean, meanBenchmark: bench, meanExcess: excess };
    }
  }
  console.log(`stage 4 (block weights, refined): best mean ${(best!.mean * 100).toFixed(2)}%`);

  // ---- report ----
  const p = best!.params;
  const fmtW = (x: number) => Number(x.toFixed(4));
  const selected: Record<string, string> = {};
  for (const b of BLOCKS) {
    const on = METRICS.filter((m) => m.block === b && (p.metricWeights[m.key] ?? 0) > 0)
      .map((m) => m.displayName);
    selected[b] = on.length === 0 ? "(none)" : on.join(", ");
  }
  console.log("\n=== Search best (informational; NOT written) ===");
  console.log(`block weights: G ${fmtW(p.blockWeights.growth)} Q ${fmtW(p.blockWeights.quality)} ` +
    `V ${fmtW(p.blockWeights.valuation)} M ${fmtW(p.blockWeights.momentum)}`);
  console.log(`minN ${p.minN}, minFactors ${p.minFactors}, topN ${p.topN}`);
  for (const b of BLOCKS) console.log(`  ${b}: ${selected[b]}`);
  console.log(`mean portfolio ${(best!.mean * 100).toFixed(2)}% | benchmark ${(best!.meanBenchmark * 100).toFixed(2)}% | ` +
    `excess ${(best!.meanExcess * 100).toFixed(2)}% (FY${data.years[0]}..FY${data.years[data.years.length - 1]})`);

  // ---- write the pinned GQVM recommended config + its engine-computed stats ----
  const stats = computeStats(runFactorBacktest(data, base, cacheMinN), RISK_FREE_RATE);

  const outPath = join(__dir, "../../src/lib/factor/params.ts");
  const lines: string[] = [];
  lines.push("// GENERATED by scripts/factor-model/optimize.ts - DO NOT EDIT.");
  lines.push("// GQVM model configuration (source: GQVM Factor Dashboard.xlsx, Parameters");
  lines.push("// tab — the dashboard's recommended configuration). Backtest signal years");
  lines.push("// FY13..FY25; forward returns to FY26. Regenerate after re-importing the");
  lines.push("// workbook: npm run factor:optimize");
  lines.push("");
  lines.push("import type { BacktestParams } from \"./engine\";");
  lines.push("");
  lines.push("/** Metric catalog for the backtest controls (display names). */");
  lines.push("export const FACTOR_METRICS: { key: string; block: string; displayName: string; higherIsBetter: boolean }[] = [");
  for (const m of metrics) {
    lines.push(`  { key: ${JSON.stringify(m.key)}, block: ${JSON.stringify(m.block)}, displayName: ${JSON.stringify(METRICS.find((x) => x.key === m.key)!.displayName)}, higherIsBetter: ${m.higherIsBetter} },`);
  }
  lines.push("];");
  lines.push("");
  lines.push("export const DEFAULT_BACKTEST_PARAMS: BacktestParams = {");
  lines.push("  blockWeights: {");
  for (const b of BLOCKS) lines.push(`    ${b}: ${fmtW(MODEL_BLOCK_WEIGHTS[b])},`);
  lines.push("  },");
  lines.push("  metricWeights: {");
  for (const m of metrics) lines.push(`    ${JSON.stringify(m.key)}: 1,`);
  lines.push("  },");
  lines.push(`  minN: ${MIN_CROSS_SECTION},`);
  lines.push(`  minFactors: ${MIN_FACTORS},`);
  lines.push(`  topN: ${TOP_N},`);
  lines.push("};");
  lines.push("");
  lines.push("/** GQVM recommended-configuration results (informational; in-sample FY13..FY25). */");
  lines.push("export const OPTIMIZER_SUMMARY = {");
  lines.push(`  years: "FY${data.years[0]}..FY${data.years[data.years.length - 1]}",`);
  lines.push(`  meanPortfolioReturn: ${stats.meanPortfolioReturn},`);
  lines.push(`  meanBenchmarkReturn: ${stats.meanBenchmarkReturn},`);
  lines.push(`  meanExcessReturn: ${stats.meanExcessReturn},`);
  lines.push(`  cagr: ${stats.cagr},`);
  lines.push(`  vol: ${stats.vol},`);
  lines.push(`  sharpe: ${stats.sharpe},`);
  lines.push(`  maxDrawdown: ${stats.maxDrawdown},`);
  lines.push(`  hitRate: ${stats.hitRate},`);
  lines.push(`  informationRatio: ${stats.informationRatio},`);
  lines.push(`  navFinal: ${stats.navFinal},`);
  lines.push(`  riskFreeRate: ${RISK_FREE_RATE},`);
  lines.push("} as const;");
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`\nwrote ${outPath} (pinned GQVM recommended config)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// Grid-search optimizer for the factor backtest.
// Finds the parameter set (block weights, per-metric inclusion, MinN, TopN)
// that maximizes the mean portfolio return of the Top-N factor backtest
// over FY13..FY25, then writes the winning defaults to
// src/lib/factor/params.ts (used by import.ts to seed the backtest tables
// and by the /backtest page as initial control values).
//
// Run: npx tsx scripts/factor-model/optimize.ts
// Source: workbook only (no DB required).
//
// Search stages (percentile cache makes each run ~2ms):
//   1. block weights (0..1 step .25, momentum = remainder) with model metric defaults
//   2. per-block metric inclusion (default / uniform / single / leave-one-out)
//   3. MinN x TopN grid with the best weights
//   4. block weights re-searched with the best metric set, MinN and TopN

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { FISCAL_YEARS, METRICS, type Block } from "./config";
import { loadWorkbook, loadCompanies, loadMetricSheet, loadMembership, cellValue } from "./workbook";
import { buildRicSlugMap } from "./map-names";
import {
  buildPercentileCache,
  meanPortfolioReturn,
  runFactorBacktest,
  type BacktestParams,
  type FactorData,
  type MetricMeta,
  type PercentileCache,
} from "../../src/lib/factor/engine";

const __dir = dirname(fileURLToPath(import.meta.url));

const BLOCKS: Block[] = ["growth", "quality", "valuation", "momentum"];
const MODEL_BLOCK_WEIGHTS: Record<Block, number> = { growth: 0.3, quality: 0.3, valuation: 0.3, momentum: 0.1 };

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
    weightInBlock: m.weightInBlock,
  }));

  // ---- FactorData from the workbook ----
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
  const membership = new Map<string, boolean>();
  for (const r of loadMembership(wb.getWorksheet("Nifty500_Membership")!)) {
    for (const [fy, isMember] of r.years) membership.set(`${r.ric}|${fy}`, isMember);
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

  const data: FactorData = {
    years: [...FISCAL_YEARS].slice(1, -1), // FY13..FY25 (FY12 excluded; FY26 has no exit close)
    metrics,
    values,
    membership,
    closes,
    names,
  };
  console.log(`optimizer: years FY${data.years[0]}..FY${data.years[data.years.length - 1]}, ` +
    `companies ${names.size}, metrics ${metrics.length}`);

  // ---- parameter generators ----
  const metricWeights = (on: Set<string>): Record<string, number> => {
    const out: Record<string, number> = {};
    for (const m of metrics) out[m.key] = on.has(m.key) ? m.weightInBlock : 0;
    return out;
  };
  const blockMetricOptions = (block: Block): Record<string, number>[] => {
    const inBlock = metrics.filter((m) => m.block === block);
    const all = inBlock.map((m) => m.key);
    if (all.length === 1) {
      // single-metric block: only on/off matters
      return [metricWeights(new Set(all)), { [all[0]]: 0 }];
    }
    const opts: Record<string, number>[] = [];
    const allDefault = metricWeights(new Set(all));
    opts.push(allDefault); // model defaults (equal weights within a block)
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
        if (bw.growth === 0 && bw.quality === 0 && bw.valuation === 0) continue; // useless
        blockWeightCandidates.push(bw);
      }
    }
  }
  blockWeightCandidates.push(MODEL_BLOCK_WEIGHTS); // always try the model default

  const defaultMetricWeights = metricWeights(new Set(metrics.map((m) => m.key)));

  // ---- stage 1: block weights with model metric defaults (minN 100, topN 20) ----
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

  const cache100 = buildPercentileCache(data, 100);
  for (const bw of blockWeightCandidates) {
    evaluate({ blockWeights: bw, metricWeights: defaultMetricWeights, minN: 100, topN: 20 }, cache100);
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
          const results = runFactorBacktest(data, {
            blockWeights: best!.params.blockWeights,
            metricWeights: merged,
            minN: 100,
            topN: 20,
          }, cache100);
          const mean = meanPortfolioReturn(results);
          if (!stage2Best || mean > stage2Best.mean) {
            const bench = results.reduce((s, r) => s + r.benchmarkReturn, 0) / results.length;
            const excess = results.reduce((s, r) => s + r.excessReturn, 0) / results.length;
            stage2Best = { params: { blockWeights: best!.params.blockWeights, metricWeights: merged, minN: 100, topN: 20 }, mean, meanBenchmark: bench, meanExcess: excess };
          }
        }
      }
    }
  }
  console.log(`stage 2 (metric inclusion, ${nStage2} combos): best mean ${(stage2Best!.mean * 100).toFixed(2)}%`);
  best = stage2Best;

  // ---- stage 3: MinN x TopN grid ----
  let stage3Best: OptResult | null = null;
  for (const minN of [50, 75, 100, 125, 150]) {
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

  // ---- report + write defaults ----
  const p = best!.params;
  const fmtW = (x: number) => Number(x.toFixed(4));
  const selected: Record<string, string> = {};
  for (const b of BLOCKS) {
    const on = METRICS.filter((m) => m.block === b && (p.metricWeights[m.key] ?? 0) > 0)
      .map((m) => m.displayName);
    selected[b] = on.length === 0 ? "(none)" : on.join(", ");
  }
  console.log("\n=== Optimized defaults ===");
  console.log(`block weights: G ${fmtW(p.blockWeights.growth)} Q ${fmtW(p.blockWeights.quality)} ` +
    `V ${fmtW(p.blockWeights.valuation)} M ${fmtW(p.blockWeights.momentum)}`);
  console.log(`minN ${p.minN}, topN ${p.topN}`);
  for (const b of BLOCKS) console.log(`  ${b}: ${selected[b]}`);
  console.log(`mean portfolio ${(best!.mean * 100).toFixed(2)}% | benchmark ${(best!.meanBenchmark * 100).toFixed(2)}% | ` +
    `excess ${(best!.meanExcess * 100).toFixed(2)}% (FY${data.years[0]}..FY${data.years[data.years.length - 1]})`);

  const outPath = join(__dir, "../../src/lib/factor/params.ts");
  const lines: string[] = [];
  lines.push("// GENERATED by scripts/factor-model/optimize.ts - DO NOT EDIT.");
  lines.push("// Default backtest parameters chosen to maximize the mean Top-N");
  lines.push(`// portfolio return over FY${data.years[0]}..FY${data.years[data.years.length - 1]} (` +
    `grid search, ${BLOCKS.join("/")} blocks, per-metric inclusion, MinN, TopN).`);
  lines.push("// Regenerate after re-importing the workbook: npm run factor:optimize");
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
  lines.push(`    growth: ${fmtW(p.blockWeights.growth)},`);
  lines.push(`    quality: ${fmtW(p.blockWeights.quality)},`);
  lines.push(`    valuation: ${fmtW(p.blockWeights.valuation)},`);
  lines.push(`    momentum: ${fmtW(p.blockWeights.momentum)},`);
  lines.push("  },");
  lines.push("  metricWeights: {");
  for (const m of metrics) lines.push(`    ${JSON.stringify(m.key)}: ${fmtW(p.metricWeights[m.key] ?? 0)},`);
  lines.push("  },");
  lines.push(`  minN: ${p.minN},`);
  lines.push(`  topN: ${p.topN},`);
  lines.push("};");
  lines.push("");
  lines.push("/** Search result metadata (informational). */");
  lines.push("export const OPTIMIZER_SUMMARY = {");
  lines.push(`  years: "FY${data.years[0]}..FY${data.years[data.years.length - 1]}",`);
  lines.push(`  meanPortfolioReturn: ${best!.mean},`);
  lines.push(`  meanBenchmarkReturn: ${best!.meanBenchmark},`);
  lines.push(`  meanExcessReturn: ${best!.meanExcess},`);
  lines.push("} as const;");
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`\nwrote ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

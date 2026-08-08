import { buildRicSlugMap } from "./map-names";
import { loadWorkbook, cellValue } from "./workbook";
import { companies } from "../../src/lib/companies";

async function main() {
  const wb = await loadWorkbook();
  const coverage = wb.getWorksheet("Coverage_Map")!;
  const coverageNames: { name: string; ric: string }[] = [];
  for (let r = 5; r <= coverage.rowCount; r++) {
    const name = cellValue(coverage.getRow(r).getCell(2));
    const ric = cellValue(coverage.getRow(r).getCell(5));
    if (typeof name === "string" && name.trim() && typeof ric === "string" && ric.trim()) {
      coverageNames.push({ name: name.trim(), ric: ric.trim() });
    }
  }
  const ws = wb.getWorksheet("Companies")!;
  const ricToWbName = new Map<string, string>();
  for (let r = 5; r <= ws.rowCount; r++) {
    const ric = cellValue(ws.getRow(r).getCell(2));
    const name = cellValue(ws.getRow(r).getCell(3));
    if (typeof ric === "string" && ric.trim() && typeof name === "string") ricToWbName.set(ric.trim(), name.trim());
  }
  const { bySlug } = buildRicSlugMap(coverageNames);
  const wrong: string[] = [];
  for (const c of companies) {
    const ric = bySlug.get(c.slug);
    const wbName = ric ? ricToWbName.get(ric) : undefined;
    const ov = wbName ? nameOverlap(c.name, wbName) : 0;
    if (!ric || ov < 0.5) wrong.push(`${c.slug} -> ${ric ?? "?"} (${wbName ?? "?"}) vs site "${c.name}"`);
  }
  console.log("suspicious/unmatched:", wrong.length);
  console.log(wrong.join("\n"));
}

function nameOverlap(a: string, b: string): number {
  const norm = (s: string) => s.toLowerCase().replace(/\b(ltd|limited|private|pvt|plc|inc|corporation|corp|co|the|&|and)\b|[,.\-']/g, " ").replace(/\s+/g, " ").trim();
  const as = new Set(norm(a).split(" "));
  const bs = new Set(norm(b).split(" "));
  const inter = [...as].filter((w) => bs.has(w)).length;
  return (2 * inter) / (as.size + bs.size);
}

main();

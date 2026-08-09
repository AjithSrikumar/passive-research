// Maps every factor company to its real NSE symbol and stores it in
// factor_companies.nse_symbol. Sources (in order):
//   1. Covered companies -> the site's ticker (src/lib/companies.ts by slug).
//   2. Everyone else -> NSE daily bhavcopy SYMBOL/NAME (all listed equities),
//      falling back to the official Nifty 500 list, matched on normalized name.
// The fetched lists are cached in scripts/factor-model/data/nse-symbols.csv
// so re-runs work offline.
//
// Run: npx tsx scripts/factor-model/map-symbols.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { companies } from "../../src/lib/companies";

const __dir = dirname(fileURLToPath(import.meta.url));

try {
  const envPath = join(__dir, "../../.env.local");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL missing (set it in .env.local)");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: DATABASE_URL, max: 4 });
const dataDir = join(__dir, "data");
const cachePath = join(dataDir, "nse-symbols.csv");

/** Normalize a company name for fuzzy matching ("Reliance Industries Ltd." == "Reliance Industries Limited"). */
export function normName(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\b(pvt|private|limited|ltd|llp|inc|corp|corporation|incorporated)\b\.?/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchText(url: string, timeoutMs = 60000): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        Referer: "https://www.niftyindices.com/",
        Accept: "text/csv,text/plain,*/*",
      },
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    return new TextDecoder("utf-8").decode(buf);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const NIFTY_LIST_URLS = [
  "https://www.niftyindices.com/IndexConstituent/ind_nifty50list.csv",
  "https://www.niftyindices.com/IndexConstituent/ind_niftynext50list.csv",
  "https://www.niftyindices.com/IndexConstituent/ind_nifty200list.csv",
  "https://www.niftyindices.com/IndexConstituent/ind_nifty500list.csv",
  "https://www.niftyindices.com/IndexConstituent/ind_niftysmallcap250list.csv",
];

async function fetchNiftyLists(): Promise<{ name: string; symbol: string }[] | null> {
  const out: { name: string; symbol: string }[] = [];
  const seen = new Set<string>();
  for (const url of NIFTY_LIST_URLS) {
    const txt = await fetchText(url);
    if (!txt) {
      console.log(`  ! ${url.split("/").pop()} unavailable`);
      continue;
    }
    const lines = txt.split(/\r?\n/).filter((l) => l.trim());
    const header = lines[0].split(",").map((h) => h.trim().toUpperCase());
    const nameIdx = header.findIndex((h) => h === "COMPANY NAME");
    const symbolIdx = header.findIndex((h) => h === "SYMBOL");
    if (nameIdx < 0 || symbolIdx < 0 || lines.length < 50) {
      console.log(`  ! ${url.split("/").pop()} not a CSV (${lines.length} lines)`);
      continue;
    }
    let n = 0;
    for (const line of lines.slice(1)) {
      const cells = line.split(",");
      if (cells.length <= Math.max(nameIdx, symbolIdx)) continue;
      const name = cells[nameIdx].trim();
      const symbol = cells[symbolIdx].trim();
      if (name && symbol && !symbol.includes("^") && !seen.has(symbol)) {
        seen.add(symbol);
        out.push({ name, symbol });
        n++;
      }
    }
    console.log(`  + ${url.split("/").pop()} (${n} rows)`);
  }
  return out.length > 100 ? out : null;
}

/** Resolve a company name to its NSE symbol via Yahoo Finance's search API
 *  (matches on company name; prefers the .NS listing). Throttled. */
async function yahooLookup(name: string): Promise<string | null> {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), 25000);
  try {
    const q = encodeURIComponent(name);
    const res = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${q}&quotesCount=6&country=India&lang=en-US&region=IN`,
      {
        signal: c.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      quotes?: { symbol: string; longname?: string }[];
    };
    const hit = (data.quotes ?? []).find((q) => q.symbol.endsWith(".NS")) ?? (data.quotes ?? [])[0];
    if (!hit || !hit.symbol) return null;
    const sym = hit.symbol.replace(/\.(NS|BO)$/i, "");
    const n = normName(hit.longname ?? "");
    return n && n === normName(name) ? sym : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Hand-verified NSE symbols, keyed by factor RIC (taken from the unmatched
 *  output), for names not in any current index list and not resolvable via
 *  Yahoo. Every entry is verified against the logo CDN before storing. */
const MANUAL_BY_RIC: Record<string, string> = {
  "ALOK.NS": "ALOKTEXT",
  "BASF.NS": "BASF",
  "CARB.NS": "CARBORUNIV",
  "DBCL.NS": "DHANBANK",
  "EDEL.NS": "EDELWEISS",
  "ENIL.NS": "ENIL",
  "FDC.NS": "FDC",
  "GNFC.NS": "GNFC",
  "GSFC.NS": "GSFC",
  "ITDC.NS": "ITDC",
  "KCP.NS": "KCP",
  "MTAR.NS": "MTARTECH",
  "MUTH.NS": "MUTHOOTMF",
  "TAKE.NS": "TAKE",
  "TVSS.NS": "TVSSRICHAK",
  "UJJI.NS": "UJJIVANSFB",
};

const CDN_HEAD = "https://images.dhan.co/symbol/";
const manualByRic = new Map(Object.entries(MANUAL_BY_RIC));

/** Logo CDN is the final authority for a symbol (also guards manual entries). */
async function dhanHasLogo(symbol: string): Promise<boolean> {
  const c = new AbortController();
  const timer = setTimeout(() => c.abort(), 15000);
  try {
    const res = await fetch(`${CDN_HEAD}${symbol}.png`, {
      method: "HEAD",
      signal: c.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      },
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  let n500 = await fetchNiftyLists();

  if (n500) {
    mkdirSync(dataDir, { recursive: true });
    const rows = n500.map((r) => `${r.name},${r.symbol}`);
    const header = ["NAME,SYMBOL", ...rows];
    writeFileSync(cachePath, header.join("\n"), "utf8");
    console.log(`cached ${rows.length} name->symbol pairs to ${cachePath}`);
  } else if (existsSync(cachePath)) {
    console.log("network unavailable; using cached symbol list");
    const lines = readFileSync(cachePath, "utf8").split(/\r?\n/).filter((l) => l.trim());
    n500 = lines.slice(1).map((l) => {
      const i = l.lastIndexOf(",");
      return { name: l.slice(0, i), symbol: l.slice(i + 1) };
    });
  } else {
    console.error("could not fetch a symbol list (nifty indices + no cache)");
    process.exit(1);
  }

  const byName = new Map<string, string>();
  for (const r of n500) {
    const k = normName(r.name);
    if (k && !byName.has(k)) byName.set(k, r.symbol);
  }
  console.log(`symbol lookup: ${byName.size} normalized names`);

  const covered = new Map(companies.map((c) => [c.slug, c.ticker]));

  const { rows } = await pool.query(
    "SELECT ric, name, company_slug, nse_symbol AS existing FROM factor_companies ORDER BY ric"
  );
  const updates: { ric: string; name: string; symbol: string | null }[] = [];
  let coveredN = 0;
  let byNameN = 0;
  let manualN = 0;
  for (const r of rows) {
    let symbol: string | null = null;
    if (r.company_slug) {
      symbol = covered.get(r.company_slug) ?? null;
      if (symbol) coveredN++;
    }
    if (!symbol) {
      symbol = byName.get(normName(r.name)) ?? null;
      if (symbol) byNameN++;
    }
    if (!symbol) {
      symbol = manualByRic.get(r.ric) ?? null;
      if (symbol && !(await dhanHasLogo(symbol))) symbol = null;
      if (symbol) manualN++;
    }
    if (!symbol) symbol = r.existing ?? null;
    updates.push({ ric: r.ric, name: r.name, symbol });
  }
  console.log(`symbols from covered map: ${coveredN}; name match: ${byNameN}; manual (CDN-verified): ${manualN}`);

  // Resolve the still-unmatched names (currently-listed small/odd-lot names)
  // through Yahoo's search API, throttled.
  const toResolve = updates.filter((u) => !u.symbol);
  console.log(`resolving ${toResolve.length} names via Yahoo search (throttled)...`);
  let done = 0;
  let yahooN = 0;
  for (const u of toResolve) {
    const sym = await yahooLookup(u.name);
    if (sym) {
      u.symbol = sym;
      yahooN++;
    }
    done++;
    if (done % 25 === 0) console.log(`  yahoo progress: ${done}/${toResolve.length} (${yahooN} found)`);
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
  console.log(`symbols from yahoo: ${yahooN}`);

  await pool.query("ALTER TABLE factor_companies ADD COLUMN IF NOT EXISTS nse_symbol TEXT");
  let matched = 0;
  let unchanged = 0;
  for (const u of updates) {
    const res = await pool.query(
      `UPDATE factor_companies SET nse_symbol = $2 WHERE ric = $1 AND (nse_symbol IS DISTINCT FROM $2)`,
      [u.ric, u.symbol]
    );
    if (res.rowCount) matched++;
    if (u.symbol) unchanged++;
  }

  const unmatched = updates.filter((u) => !u.symbol).map((u) => u.ric);
  console.log(`companies: ${rows.length}; with symbol: ${unchanged}; updated rows: ${matched}; unmatched: ${unmatched.length}`);
  if (unmatched.length) console.log(`unmatched: ${unmatched.join(", ")}`);

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

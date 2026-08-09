// Fetches NSE ticker logos for every company in the factor universe (900)
// from Dhan's stock-logo CDN into public/logos/<TICKER>.png.
// Existing files are skipped; failures fall back to initials at render time.
//
// Run: npx tsx scripts/factor-model/fetch-logos.ts

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

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

const logosDir = join(__dir, "../../public/logos");
const CDN = (ticker: string) => `https://images.dhan.co/symbol/${ticker}.png`;
const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;

const tickerFromRic = (ric: string) =>
  ric.split("^")[0].replace(/\.(NS|BO)$/i, "").toUpperCase();

async function fetchWithRetry(ticker: string, attempts = 2): Promise<Buffer | null> {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(CDN(ticker), { signal: controller.signal });
      if (!res.ok) return null;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) return null;
      return buf;
    } catch {
      if (attempt < attempts) await new Promise((r) => setTimeout(r, 500));
    } finally {
      clearTimeout(timer);
    }
  }
  return null;
}

async function main() {
  const { rows } = await pool.query(
    "SELECT ric, nse_symbol FROM factor_companies ORDER BY ric"
  );
  // Prefer the mapped real NSE symbol (nse_symbol); fall back to the RIC
  // derivation for the residual unmapped names.
  const tickers = [
    ...new Set(rows.map((r) => (r.nse_symbol ?? tickerFromRic(r.ric)).toUpperCase())),
  ];

  const todo = tickers.filter((t) => !existsSync(join(logosDir, `${t}.png`)));
  console.log(`total tickers: ${tickers.length}; already present: ${tickers.length - todo.length}; to fetch: ${todo.length}`);

  let done = 0;
  let ok = 0;
  const failed: string[] = [];
  const queue = [...todo];
  const worker = async () => {
    while (queue.length > 0) {
      const ticker = queue.shift()!;
      const buf = await fetchWithRetry(ticker);
      if (buf) {
        writeFileSync(join(logosDir, `${ticker}.png`), buf);
        ok++;
      } else {
        failed.push(ticker);
      }
      done++;
      if (done % 50 === 0) console.log(`progress: ${done}/${todo.length}`);
    }
  };

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  console.log(`fetched: ${ok}; failed: ${failed.length}`);
  if (failed.length) {
    console.log(`failed tickers: ${failed.join(", ")}`);
  }
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

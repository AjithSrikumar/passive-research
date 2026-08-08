import { readFileSync } from "node:fs";
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
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 4 });

const q = async (label: string, text: string) => {
  const r = await pool.query(text);
  console.log(`\n--- ${label} ---`);
  console.table(r.rows);
};

async function main() {
  await q("RELI P/E FY12 (expect 10.30)", "SELECT fiscal_year, value FROM factor_values WHERE ric = 'RELI.NS' AND metric_key = 'pe' AND fiscal_year = 12");
  await q("RELI momentum FY14 (expect 0.1362)", "SELECT fiscal_year, ROUND(momentum_1y_pct::numeric, 6) AS mom FROM factor_price_history WHERE ric = 'RELI.NS' AND fiscal_year BETWEEN 13 AND 16");
  await q("Top-5 FY25 composite", "SELECT fc.ric, ROUND(fc.composite::numeric, 4) AS composite, fc.rank, fc2.name FROM factor_composites fc JOIN factor_companies fc2 USING (ric) WHERE fc.fiscal_year = 25 ORDER BY fc.rank LIMIT 5");
  await q("Nifty500 membership FY25", "SELECT is_member, count(*) FROM universe_membership WHERE fiscal_year = 25 GROUP BY 1");
  await q("Site-linked companies in factor set", "SELECT count(*) AS linked FROM factor_companies WHERE company_slug IS NOT NULL");
  await q("Sample FY24 backtest", "SELECT by.fiscal_year, ROUND(by.portfolio_return::numeric, 4) AS port, ROUND(by.benchmark_return::numeric, 4) AS bench, ROUND(by.excess_return::numeric, 4) AS excess, by.ic, by.n_eligible FROM backtest_years by WHERE by.fiscal_year = 24");
  await q("FY24 top-3 constituents", "SELECT bc.rank, bc.ric, fc.company_slug, ROUND(bc.return_pct::numeric, 4) AS ret FROM backtest_constituents bc LEFT JOIN factor_companies fc USING (ric) WHERE bc.fiscal_year = 24 ORDER BY bc.rank LIMIT 3");
  await pool.end();
}

main();
import "server-only";
import { Pool, type PoolClient, type QueryResult } from "pg";

/** Server-only Postgres access. Never import from a Client Component. */

const getPool = (() => {
  let pool: Pool | null = null;
  return () => {
    const url = process.env.DATABASE_URL;
    if (!url) return null;
    if (!pool) {
      pool = new Pool({
        connectionString: url,
        ssl: { rejectUnauthorized: false },
        max: 4,
        connectionTimeoutMillis: 5000,
      });
      pool.on("error", () => {
        /* DB unreachable → callers fall back to static data */
      });
    }
    return pool;
  };
})();

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function pingDb(): Promise<boolean> {
  const pool = toPool();
  if (!pool) return false;
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

function toPool(): Pool | null {
  return getPool();
}

export async function queryText<T extends object>(
  text: string,
  values: unknown[] = []
): Promise<QueryResult<T>> {
  const pool = toPool();
  if (!pool) return { rows: [], rowCount: -1 } as unknown as QueryResult<T>;
  return pool.query<T>(text, values);
}

export async function withClient<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T | null> {
  const pool = toPool();
  if (!pool) return null;
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}
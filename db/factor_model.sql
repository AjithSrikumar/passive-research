-- Passive — factor model schema (Supabase).
-- Idempotent: safe to run on every seed/import. Mirrors docs/DATA_MODEL.md
-- and docs/FACTOR_MODEL.md. Run AFTER db/schema.sql (FK to companies).

CREATE TABLE IF NOT EXISTS factor_companies (
  ric            TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  market_cap     NUMERIC,
  sector         TEXT,
  industry       TEXT,
  removed_period TEXT,
  company_slug   TEXT REFERENCES companies(slug)
);

CREATE TABLE IF NOT EXISTS factor_years (
  fiscal_year        SMALLINT PRIMARY KEY,
  is_live            BOOLEAN NOT NULL DEFAULT FALSE,
  nifty500_filtered  BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS factor_metrics (
  metric_key      TEXT PRIMARY KEY,
  sheet           TEXT NOT NULL,
  block           TEXT NOT NULL CHECK (block IN ('growth','quality','valuation','momentum')),
  block_weight    NUMERIC NOT NULL,
  weight_in_block NUMERIC NOT NULL,
  higher_is_better BOOLEAN NOT NULL,
  display_name    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS factor_values (
  ric         TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  metric_key  TEXT NOT NULL REFERENCES factor_metrics(metric_key) ON DELETE CASCADE,
  fiscal_year SMALLINT NOT NULL REFERENCES factor_years(fiscal_year),
  value       NUMERIC NOT NULL,
  missing     BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (ric, metric_key, fiscal_year)
);

CREATE TABLE IF NOT EXISTS factor_price_history (
  ric             TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  fiscal_year     SMALLINT NOT NULL REFERENCES factor_years(fiscal_year),
  close           NUMERIC NOT NULL,
  momentum_1y_pct NUMERIC,
  return_1y_pct   NUMERIC,
  PRIMARY KEY (ric, fiscal_year)
);

CREATE TABLE IF NOT EXISTS factor_scores (
  ric           TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  block         TEXT NOT NULL CHECK (block IN ('growth','quality','valuation','momentum')),
  fiscal_year   SMALLINT NOT NULL REFERENCES factor_years(fiscal_year),
  score         NUMERIC NOT NULL,
  n_metrics_used SMALLINT NOT NULL,
  PRIMARY KEY (ric, block, fiscal_year)
);

CREATE TABLE IF NOT EXISTS factor_composites (
  ric         TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  fiscal_year SMALLINT NOT NULL REFERENCES factor_years(fiscal_year),
  composite   NUMERIC NOT NULL,
  rank        INTEGER NOT NULL,
  PRIMARY KEY (ric, fiscal_year)
);

CREATE INDEX IF NOT EXISTS idx_factor_composites_year_rank ON factor_composites(fiscal_year, rank);

CREATE TABLE IF NOT EXISTS factor_benchmark (
  fiscal_year SMALLINT PRIMARY KEY REFERENCES factor_years(fiscal_year),
  nifty_close NUMERIC NOT NULL,
  return_pct  NUMERIC
);

CREATE TABLE IF NOT EXISTS universe_membership (
  ric         TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  fiscal_year SMALLINT NOT NULL REFERENCES factor_years(fiscal_year),
  is_member   BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (ric, fiscal_year)
);

CREATE TABLE IF NOT EXISTS backtest_years (
  fiscal_year      SMALLINT PRIMARY KEY REFERENCES factor_years(fiscal_year),
  n_eligible       INTEGER NOT NULL,
  portfolio_return NUMERIC,
  benchmark_return NUMERIC,
  excess_return    NUMERIC,
  ic               NUMERIC
);

CREATE TABLE IF NOT EXISTS backtest_constituents (
  fiscal_year SMALLINT NOT NULL REFERENCES backtest_years(fiscal_year) ON DELETE CASCADE,
  rank        INTEGER NOT NULL,
  ric         TEXT NOT NULL REFERENCES factor_companies(ric) ON DELETE CASCADE,
  entry_close NUMERIC NOT NULL,
  exit_close  NUMERIC NOT NULL,
  return_pct  NUMERIC NOT NULL,
  PRIMARY KEY (fiscal_year, rank)
);

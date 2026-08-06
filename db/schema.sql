-- Passive — Postgres schema (Supabase).
-- Idempotent: safe to run on every seed. Mirrors docs/DATABASE.md.

CREATE TABLE IF NOT EXISTS sectors (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT NOT NULL,
  icon        TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
  slug                TEXT PRIMARY KEY,
  name                TEXT NOT NULL,
  legal_name          TEXT NOT NULL,
  ticker              TEXT NOT NULL,
  sector              TEXT NOT NULL REFERENCES sectors(slug),
  industry            TEXT NOT NULL,
  logo_color          TEXT NOT NULL,
  recommendation      TEXT NOT NULL CHECK (recommendation IN
                      ('Strong Buy','Buy','Accumulate','Hold','Reduce','Sell')),
  current_price       NUMERIC NOT NULL,
  target_price        NUMERIC NOT NULL,
  upside_pct          NUMERIC NOT NULL,
  market_cap_cr       NUMERIC NOT NULL,
  revenue_cr          NUMERIC NOT NULL,
  net_profit_cr       NUMERIC NOT NULL,
  revenue_growth_pct  NUMERIC NOT NULL,
  ebitda_margin_pct   NUMERIC NOT NULL,
  roe_pct             NUMERIC NOT NULL,
  roce_pct            NUMERIC NOT NULL,
  fcf_cr              NUMERIC NOT NULL,
  pe                  NUMERIC,          -- nullable → renders "—"
  dividend_yield_pct  NUMERIC NOT NULL,
  debt_equity         NUMERIC NOT NULL,
  short_thesis        TEXT NOT NULL,
  updated_date        DATE NOT NULL,
  author              TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_companies_sector     ON companies(sector);
CREATE INDEX IF NOT EXISTS idx_companies_updated    ON companies(updated_date DESC);

-- One row per generated report section (133 companies × 25 sections).
CREATE TABLE IF NOT EXISTS report_sections (
  company_slug TEXT NOT NULL REFERENCES companies(slug) ON DELETE CASCADE,
  section_key  TEXT NOT NULL,
  sort_order   INTEGER NOT NULL,
  label        TEXT NOT NULL,
  content      JSONB NOT NULL DEFAULT '{}',
  PRIMARY KEY (company_slug, section_key)
);

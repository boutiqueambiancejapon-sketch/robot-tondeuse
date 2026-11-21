-- Owner dashboard (/dashboard): analytics schema, ported from 10minlanguages.com (itself adapted from Toutou Gourmet).
-- Idempotent. Apply: sudo -n -u postgres psql -d qrt -v ON_ERROR_STOP=1 -f db/analytics.sql
--
-- One-time setup (run as postgres, already done on 2026-11-21):
--   CREATE ROLE qrt NOLOGIN;            -- owns the database and every table
--   GRANT qrt TO sites;                 -- sites: the site process user (site@.service, peer auth), already a login role
--   CREATE DATABASE qrt OWNER qrt;
--   REVOKE CONNECT ON DATABASE qrt FROM PUBLIC; GRANT CONNECT ON DATABASE qrt TO qrt;
-- DATABASE_URL=postgresql:///qrt?host=/var/run/postgresql
--
-- Privacy: no cookie, no human IP or User-Agent stored. Humans get a visitor hash salted per day
-- (the salt is deleted after 2 days). Bot IP + UA are kept to spot fake bots.

CREATE SCHEMA IF NOT EXISTS analytics AUTHORIZATION qrt;

-- Visitor actions sent by the site (components/AffiliateClickBeacon.tsx, components/quiz → POST /api/e).
-- name: affiliate_click | quiz_result (browser, /api/e) · tool_use (server, /api/m) · newsletter_signup (server, /api/inscription)
CREATE TABLE IF NOT EXISTS analytics.events (
  id       bigserial PRIMARY KEY,
  ts       timestamptz NOT NULL DEFAULT now(),
  name     text NOT NULL,
  page     text NOT NULL,
  props    jsonb NOT NULL DEFAULT '{}'::jsonb,
  ref_host text,
  device   text,
  visitor  text
);
CREATE INDEX IF NOT EXISTS events_ts_idx ON analytics.events (ts);
CREATE INDEX IF NOT EXISTS events_name_ts_idx ON analytics.events (name, ts);

-- Requests read from Caddy's access log (scripts/ingest-caddy-logs.mjs).
-- kind: human | ai_training | ai_search | ai_user | search | seo | bot
CREATE TABLE IF NOT EXISTS analytics.hits (
  id          bigserial PRIMARY KEY,
  ts          timestamptz NOT NULL,
  host        text NOT NULL,
  method      text NOT NULL,
  path        text NOT NULL,
  status      integer NOT NULL,
  bytes       integer,
  duration_ms integer,
  kind        text NOT NULL,
  bot         text,
  operator    text,
  device      text,
  ref_host    text,
  ref_ai      text,
  visitor     text,
  ip          inet,
  ua          text
);
CREATE INDEX IF NOT EXISTS hits_ts_idx ON analytics.hits (ts);
CREATE INDEX IF NOT EXISTS hits_kind_ts_idx ON analytics.hits (kind, ts);
-- Source of a human page view (live feed): previous path on the site (path only, from the Referer
-- header) and the landing URL's utm_source (or ?ref=) and utm_medium. No other query string is kept.
ALTER TABLE analytics.hits ADD COLUMN IF NOT EXISTS ref_path text;
ALTER TABLE analytics.hits ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE analytics.hits ADD COLUMN IF NOT EXISTS utm_medium text;
CREATE INDEX IF NOT EXISTS hits_bot_ts_idx ON analytics.hits (bot, ts) WHERE bot IS NOT NULL;

-- Read position of each source (journald cursor).
CREATE TABLE IF NOT EXISTS analytics.ingest_state (
  source     text PRIMARY KEY,
  cursor     text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Daily salt for the human visitor hash. Rows older than 2 days are deleted by the ingester:
-- after that, a hash can no longer be linked to an address.
CREATE TABLE IF NOT EXISTS analytics.visitor_salt (
  day  date PRIMARY KEY,
  salt text NOT NULL
);

-- Owner's current addresses (set when he opens the dashboard), so his own visits are not counted.
-- Salted SHA-256 per row, never the address (IPv6: the /64). Valid 12 h, extended while active.
CREATE TABLE IF NOT EXISTS analytics.ignored_ips (
  hash       text PRIMARY KEY,
  salt       text NOT NULL,
  expires_at timestamptz NOT NULL
);

ALTER TABLE analytics.events OWNER TO qrt;
ALTER TABLE analytics.hits OWNER TO qrt;
ALTER TABLE analytics.ingest_state OWNER TO qrt;
ALTER TABLE analytics.visitor_salt OWNER TO qrt;
ALTER TABLE analytics.ignored_ips OWNER TO qrt;

-- 2026-11-21 (dashboard parity with 10minlanguages.com): country code (ISO 3166-1 alpha-2) read from the address in a
-- local DB-IP Country Lite file (CC BY 4.0, /var/lib/qrt-geo, copied from /var/lib/toutou-geo by
-- qrt-ingest.service). For people the address is read, then forgotten: only the country is kept.
ALTER TABLE analytics.hits ADD COLUMN IF NOT EXISTS country char(2);
ALTER TABLE analytics.events ADD COLUMN IF NOT EXISTS country char(2);
CREATE INDEX IF NOT EXISTS hits_visitor_ts_idx ON analytics.hits (visitor, ts) WHERE visitor IS NOT NULL;

-- 2026-11-21: SEO dashboard (ported from Toutou Gourmet's db/analytics.sql). Search Console per day and device
-- (DESKTOP, MOBILE, TABLET), collected every night by scripts/seo/collect-gsc.ts (last 10 days rewritten), caught up
-- since 2026-09-23 (first day with data). Anchors (#section) merged with their page.
CREATE TABLE IF NOT EXISTS analytics.gsc_site_daily (day date NOT NULL, device text NOT NULL, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL, PRIMARY KEY (day, device));
CREATE TABLE IF NOT EXISTS analytics.gsc_page_daily (day date NOT NULL, page text NOT NULL, device text NOT NULL, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL, PRIMARY KEY (day, page, device));
CREATE INDEX IF NOT EXISTS gsc_page_daily_page_idx ON analytics.gsc_page_daily (page, day);
CREATE TABLE IF NOT EXISTS analytics.gsc_qp_daily (day date NOT NULL, query text NOT NULL, page text NOT NULL, device text NOT NULL, clicks integer NOT NULL, impressions integer NOT NULL, position real NOT NULL, PRIMARY KEY (day, query, page, device));
CREATE INDEX IF NOT EXISTS gsc_qp_daily_query_idx ON analytics.gsc_qp_daily (query, day);
CREATE INDEX IF NOT EXISTS gsc_qp_daily_page_idx ON analytics.gsc_qp_daily (page, day);

-- Google URL Inspection (scripts/seo/inspect.ts, at most 2,000 addresses a night): index state and reason.
CREATE TABLE IF NOT EXISTS analytics.url_inspection (
  path text PRIMARY KEY, checked_at timestamptz NOT NULL, verdict text, coverage text, indexing_state text, page_fetch text,
  robots text, last_crawl timestamptz, google_canonical text, user_canonical text, error text
);

-- Nightly audit of the sitemap pages (scripts/seo/audit.ts): tags and internal links (graph).
CREATE TABLE IF NOT EXISTS analytics.page_audit (
  path text PRIMARY KEY, checked_at timestamptz NOT NULL, status integer NOT NULL, title text, description text,
  canonical text, h1 text, noindex boolean NOT NULL DEFAULT false, in_sitemap boolean NOT NULL DEFAULT true, links_out integer NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS analytics.page_links (src text NOT NULL, dst text NOT NULL, PRIMARY KEY (src, dst));
CREATE INDEX IF NOT EXISTS page_links_dst_idx ON analytics.page_links (dst);
CREATE TABLE IF NOT EXISTS analytics.link_status (path text PRIMARY KEY, status integer NOT NULL, checked_at timestamptz NOT NULL);

-- Notes on the charts: by hand (Dashboard › Contenu & notes) or by the jobs (source = auto/journal, unique ref).
CREATE TABLE IF NOT EXISTS analytics.seo_notes (
  id bigserial PRIMARY KEY, day date NOT NULL, kind text NOT NULL, text text NOT NULL, source text NOT NULL DEFAULT 'manuel',
  ref text UNIQUE, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS seo_notes_day_idx ON analytics.seo_notes (day);

-- "Fait" on the 5 actions of the day: the action's key (stable from one day to the next), silent for 30 days.
CREATE TABLE IF NOT EXISTS analytics.seo_actions_done (key text PRIMARY KEY, title text NOT NULL, done_at timestamptz NOT NULL DEFAULT now());

-- Real sales copied from the control centre (commissions table, project 10minlanguages) every hour (deploy/revenue-sync.sh).
CREATE TABLE IF NOT EXISTS analytics.revenue_sales (
  project text NOT NULL, day date NOT NULL, program text NOT NULL, amount real NOT NULL, sales integer NOT NULL, status text NOT NULL,
  PRIMARY KEY (project, day, program)
);

ALTER TABLE analytics.gsc_site_daily OWNER TO tenmin;
ALTER TABLE analytics.gsc_page_daily OWNER TO tenmin;
ALTER TABLE analytics.gsc_qp_daily OWNER TO tenmin;
ALTER TABLE analytics.url_inspection OWNER TO tenmin;
ALTER TABLE analytics.page_audit OWNER TO tenmin;
ALTER TABLE analytics.page_links OWNER TO tenmin;
ALTER TABLE analytics.link_status OWNER TO tenmin;
ALTER TABLE analytics.seo_notes OWNER TO tenmin;
ALTER TABLE analytics.seo_actions_done OWNER TO tenmin;
ALTER TABLE analytics.revenue_sales OWNER TO tenmin;

-- The nightly jobs (tenmin-seo-collect, tenmin-revenue-sync) run as the owner's account `administrator`: it reads the
-- stable git clone (automatic notes) and the control centre's database, which the site user can't. Narrow rights:
-- connect, write the SEO tables, read the logs and the fiche index. No access to accounts, newsletter or login data.
GRANT CONNECT ON DATABASE tenmin TO administrator;
GRANT USAGE ON SCHEMA analytics, seo TO administrator;
GRANT SELECT, INSERT, UPDATE, DELETE ON analytics.gsc_site_daily, analytics.gsc_page_daily, analytics.gsc_qp_daily,
  analytics.url_inspection, analytics.page_audit, analytics.page_links, analytics.link_status, analytics.seo_notes,
  analytics.revenue_sales TO administrator;
GRANT USAGE ON SEQUENCE analytics.seo_notes_id_seq TO administrator;
GRANT SELECT ON analytics.hits, seo.page_index TO administrator;

-- 2026-11-21: scraper filter (scripts/ingest-caddy-logs.mjs). kind 'scraper' for "people" page views with no
-- Accept-Language, from a headless browser or a Chrome older than 100, or more than 30 page views in one hour for one
-- visitor hash; out of every people count (queries use kind = 'human'). History reclassified once (--reclass-history).

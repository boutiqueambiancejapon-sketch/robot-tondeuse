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

-- Owner login for /dashboard (lib/server/login), ported from 10minlanguages.com (passkey or TOTP).
-- Idempotent. Apply: sudo -n -u postgres psql -d qrt -v ON_ERROR_STOP=1 -f db/dashboard-login.sql
-- Reset (lost phone): node scripts/dashboard-login-reset.mjs (deletes factors and sessions).

CREATE SCHEMA IF NOT EXISTS dashboard AUTHORIZATION qrt;

-- Cookie value is random; only its SHA-256 is stored. stage: second_factor | enroll | full
CREATE TABLE IF NOT EXISTS dashboard.session (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash      text NOT NULL UNIQUE,
  stage           text NOT NULL CHECK (stage IN ('second_factor', 'enroll', 'full')),
  password_fp     text NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now(),
  last_seen_at    timestamptz NOT NULL DEFAULT now(),
  expires_at      timestamptz NOT NULL,
  factor_at       timestamptz,
  factor_failures integer NOT NULL DEFAULT 0,
  challenge       text,
  challenge_at    timestamptz,
  device_label    text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS session_expires_idx ON dashboard.session (expires_at);

CREATE TABLE IF NOT EXISTS dashboard.passkey (
  credential_id text PRIMARY KEY,
  public_key    text NOT NULL,
  counter       bigint NOT NULL DEFAULT 0,
  transports    jsonb NOT NULL DEFAULT '[]'::jsonb,
  label         text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_used_at  timestamptz
);

-- Single row. Secret encrypted with a key derived from DASHBOARD_AUTH_SECRET (AES-256-GCM).
CREATE TABLE IF NOT EXISTS dashboard.totp (
  id           smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  secret_enc   text NOT NULL,
  confirmed_at timestamptz,
  last_counter bigint NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Passkey challenges for the direct Face ID login (no session yet).
CREATE TABLE IF NOT EXISTS dashboard.challenge (
  challenge  text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Login journal and rate limit. ip_hash: HMAC of the address, never the address.
CREATE TABLE IF NOT EXISTS dashboard.login_event (
  id           bigserial PRIMARY KEY,
  at           timestamptz NOT NULL DEFAULT now(),
  kind         text NOT NULL,
  outcome      text NOT NULL,
  ip_hash      text NOT NULL DEFAULT '',
  device_label text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS login_event_ip_idx ON dashboard.login_event (ip_hash, at);
CREATE INDEX IF NOT EXISTS login_event_at_idx ON dashboard.login_event (at);

ALTER TABLE dashboard.session OWNER TO qrt;
ALTER TABLE dashboard.passkey OWNER TO qrt;
ALTER TABLE dashboard.totp OWNER TO qrt;
ALTER TABLE dashboard.challenge OWNER TO qrt;
ALTER TABLE dashboard.login_event OWNER TO qrt;

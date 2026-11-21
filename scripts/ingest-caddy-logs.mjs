#!/usr/bin/env node
// Owner dashboard: reads Caddy's access log (JSON, in journald) and stores it in analytics.hits.
// Adapted from Toutou Gourmet. Run every minute by deploy/tenmin-ingest.timer; resumes from the
// journald cursor saved in analytics.ingest_state (first run: last 7 days).
// Humans: pages only (no static files, no /api, no /dashboard), no IP or User-Agent, a visitor
// hash salted per day (analytics.visitor_salt, salt deleted after 2 days). Bots: every request,
// with IP and User-Agent (to spot fake bots). Everyone: country code (local DB-IP file), the human
// address is read for it, then forgotten.
// Usage: DATABASE_URL=postgresql:///qrt?host=/var/run/postgresql INGEST_HOSTS=10minlanguages.com node scripts/ingest-caddy-logs.mjs [--dry]

import { createHash, randomBytes } from 'node:crypto'
import { spawn } from 'node:child_process'
import readline from 'node:readline'
import pg from 'pg'
import { aiReferrer, classifyUa, deviceOf } from './lib/bots.mjs'
import { countryOf } from './lib/geo.mjs'
import { buildStaticList, findFingerprint, isStaticIgnored, visitorKey } from './lib/analytics-ignore.mjs'

const DRY = process.argv.includes('--dry')
const HOSTS = (process.env.INGEST_HOSTS || '').split(',').map((h) => h.trim().toLowerCase()).filter(Boolean)
const SOURCE = 'caddy-journal'
const BATCH = 500
const RETENTION_DAYS = 180
const STATIC = /^\/(_next\/|images\/|fonts\/|favicon|icons?\/|apple-touch|manifest|robots\.txt$|sitemap|opengraph-image|twitter-image)|\.(js|css|map|png|jpe?g|webp|avif|gif|svg|ico|woff2?|txt|xml|json)$/i
const PRIVATE = /^\/(dashboard|api)(\/|$)/
// The last 20 s of the journal wait for the next run, so the owner's address can be recorded first.
const SETTLE_DELAY = '-20s'

if (!HOSTS.length) { console.error('[ingest] INGEST_HOSTS missing'); process.exit(1) }
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql:///qrt?host=/var/run/postgresql', max: 2 })

const STATIC_IGNORED = buildStaticList()
let ownerRows = []
const ownerSeen = new Map()
const salts = new Map()

function isOwnerIp(ip) {
  const key = visitorKey(ip)
  if (!key) return false
  if (!ownerSeen.has(key)) ownerSeen.set(key, findFingerprint(ownerRows, ip) !== null)
  return ownerSeen.get(key)
}

async function loadOwnerRows() {
  if (!DRY) await pool.query('DELETE FROM analytics.ignored_ips WHERE expires_at <= now()')
  ownerRows = (await pool.query('SELECT salt, hash FROM analytics.ignored_ips WHERE expires_at > now()')).rows
}

/** Salt of a UTC day, created on first use. Kept 2 days, then deleted (hashes become unlinkable). */
async function saltOf(day) {
  if (salts.has(day)) return salts.get(day)
  const fresh = randomBytes(32).toString('hex')
  const { rows } = await pool.query(
    `INSERT INTO analytics.visitor_salt (day, salt) VALUES ($1, $2)
     ON CONFLICT (day) DO UPDATE SET day = EXCLUDED.day RETURNING salt`,
    [day, fresh],
  )
  salts.set(day, rows[0].salt)
  return rows[0].salt
}

function header(h, name) {
  const v = h?.[name] ?? h?.[name.toLowerCase()]
  return Array.isArray(v) ? v[0] : v
}

function hostOf(url) {
  if (!url) return null
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return null }
}

/** One Caddy log line → one analytics.hits row (visitor still to hash), or null. */
function toHit(entry) {
  const req = entry.request
  if (!req || !String(entry.logger || '').startsWith('http.log.access')) return null
  const host = String(req.host || '').toLowerCase().split(':')[0]
  if (!HOSTS.includes(host)) return null
  const clientIp = req.client_ip || req.remote_ip || null
  if (isStaticIgnored(clientIp, STATIC_IGNORED)) return null
  const uri = req.uri || '/'
  const path = uri.split('?')[0].slice(0, 300)
  const ua = header(req.headers, 'User-Agent') || ''
  const { kind, bot, operator } = classifyUa(ua)
  if (kind === 'human') {
    if (STATIC.test(path) || PRIVATE.test(path) || req.method !== 'GET') return null
    // Next.js prefetches (menu links loaded in the background) are not visits.
    const prefetch = header(req.headers, 'RSC') || header(req.headers, 'Next-Router-Prefetch') ||
      /prefetch/i.test(header(req.headers, 'Sec-Purpose') || header(req.headers, 'Purpose') || '') || /[?&]_rsc=/.test(uri)
    if (prefetch || isOwnerIp(clientIp)) return null
  }
  const refHost = hostOf(header(req.headers, 'Referer'))
  return {
    ts: new Date(entry.ts * 1000).toISOString(),
    host: host.slice(0, 100),
    method: (req.method || '').slice(0, 10),
    path,
    status: entry.status ?? 0,
    bytes: entry.size ?? null,
    duration_ms: entry.duration != null ? Math.round(entry.duration * 1000) : null,
    kind, bot, operator,
    device: kind === 'human' ? deviceOf(ua) : null,
    ref_host: refHost && refHost !== host.replace(/^www\./, '') ? refHost.slice(0, 100) : null,
    ref_ai: kind === 'human' ? aiReferrer(refHost, uri) : null,
    visitor: kind === 'human' ? { key: visitorKey(clientIp), ua } : null,
    ip: kind === 'human' ? null : clientIp,
    ua: kind === 'human' ? null : ua.slice(0, 300),
    country: countryOf(clientIp),
  }
}

async function hashVisitor(hit) {
  if (!hit.visitor) return null
  const salt = DRY ? 'dry' : await saltOf(hit.ts.slice(0, 10))
  return createHash('sha256').update(`${salt}|${hit.visitor.key}|${hit.visitor.ua}`).digest('hex').slice(0, 16)
}

const COLS = ['ts', 'host', 'method', 'path', 'status', 'bytes', 'duration_ms', 'kind', 'bot', 'operator', 'device', 'ref_host', 'ref_ai', 'visitor', 'ip', 'ua', 'country']

async function flush(rows, cursor) {
  for (const r of rows) r.visitor = await hashVisitor(r)
  if (DRY) { for (const r of rows.slice(0, 5)) console.log(r); return }
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    if (rows.length) {
      const values = []
      const tuples = rows.map((_, i) => `(${COLS.map((__, j) => `$${i * COLS.length + j + 1}`).join(',')})`)
      for (const r of rows) for (const c of COLS) values.push(r[c])
      await client.query(`INSERT INTO analytics.hits (${COLS.join(',')}) VALUES ${tuples.join(',')}`, values)
    }
    if (cursor) {
      await client.query(
        `INSERT INTO analytics.ingest_state (source, cursor, updated_at) VALUES ($1, $2, now())
         ON CONFLICT (source) DO UPDATE SET cursor = EXCLUDED.cursor, updated_at = now()`,
        [SOURCE, cursor],
      )
    }
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

async function main() {
  const { rows } = await pool.query('SELECT cursor FROM analytics.ingest_state WHERE source = $1', [SOURCE])
  const cursor = rows[0]?.cursor
  await loadOwnerRows()
  const args = ['-u', 'caddy', '-o', 'json', '--no-pager', '--until', SETTLE_DELAY, ...(cursor ? ['--after-cursor', cursor] : ['--since', '-7d'])]
  const jc = spawn('journalctl', args, { stdio: ['ignore', 'pipe', 'inherit'] })
  const rl = readline.createInterface({ input: jc.stdout })

  let batch = []
  let lastCursor = null
  let seen = 0
  let kept = 0
  for await (const line of rl) {
    let rec
    try { rec = JSON.parse(line) } catch { continue }
    lastCursor = rec.__CURSOR || lastCursor
    seen++
    const msg = typeof rec.MESSAGE === 'string' ? rec.MESSAGE : ''
    if (!msg.startsWith('{')) continue
    let entry
    try { entry = JSON.parse(msg) } catch { continue }
    const hit = toHit(entry)
    if (hit) { batch.push(hit); kept++ }
    if (batch.length >= BATCH) { await flush(batch, lastCursor); batch = [] }
  }
  await flush(batch, lastCursor)
  const code = await new Promise((res) => jc.on('close', res))
  if (code !== 0 && seen === 0) throw new Error(`journalctl failed (code ${code}): journal read permission?`)

  if (!DRY) {
    await pool.query(`DELETE FROM analytics.hits WHERE ts < now() - interval '${RETENTION_DAYS} days'`)
    await pool.query(`DELETE FROM analytics.events WHERE ts < now() - interval '400 days'`)
    await pool.query(`DELETE FROM analytics.visitor_salt WHERE day < (now() AT TIME ZONE 'UTC')::date - 1`)
    // Learner accounts (db/accounts.sql, /privacy): unused for 24 months → deleted with their progress; dead links and sessions.
    await pool.query(`DELETE FROM account.users WHERE last_login_at < now() - interval '24 months'`)
    await pool.query('DELETE FROM account.login_token WHERE expires_at < now()')
    await pool.query('DELETE FROM account.session WHERE expires_at < now()')
  }
  console.log(`[ingest] ${seen} lines read, ${kept} kept${DRY ? ' (dry run, nothing written)' : ''}`)
}

main().catch((err) => { console.error('[ingest]', err.message); process.exitCode = 1 }).finally(() => pool.end())

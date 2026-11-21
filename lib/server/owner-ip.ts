import { getPool } from '@/lib/server/db'
import { findFingerprint, IGNORED_IP_TTL_HOURS, newFingerprint, visitorKey } from '@/scripts/lib/analytics-ignore.mjs'

// The owner's own visits are not counted: when he opens the dashboard, a salted hash of his current
// address goes to analytics.ignored_ips (12 h, extended while active). The ingester and /api/e
// skip it. Never the address itself. Best effort: measurement never slows or breaks the dashboard.

const RENEW_MS = 10 * 60_000
const recent = new Map<string, number>()

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
}

export async function markOwnerIp(ip: string): Promise<void> {
  const key = visitorKey(ip)
  const pool = getPool()
  if (!key || !pool || Date.now() - (recent.get(key) ?? 0) < RENEW_MS) return
  recent.set(key, Date.now())
  try {
    const { rows } = await pool.query<{ salt: string; hash: string }>('SELECT salt, hash FROM analytics.ignored_ips WHERE expires_at > now()')
    const found = findFingerprint(rows, ip)
    const row = found ?? newFingerprint(ip)
    if (!row) return
    await pool.query(
      `INSERT INTO analytics.ignored_ips (hash, salt, expires_at) VALUES ($1, $2, now() + make_interval(hours => $3))
       ON CONFLICT (hash) DO UPDATE SET expires_at = EXCLUDED.expires_at`,
      [row.hash, row.salt, IGNORED_IP_TTL_HOURS],
    )
  } catch (err) {
    console.error('[owner-ip]', err instanceof Error ? err.message : err)
  }
}

/** True if this address belongs to the owner right now (used by /api/e). */
export async function isOwnerIp(ip: string): Promise<boolean> {
  const pool = getPool()
  if (!pool || !visitorKey(ip)) return false
  try {
    const { rows } = await pool.query<{ salt: string; hash: string }>('SELECT salt, hash FROM analytics.ignored_ips WHERE expires_at > now()')
    return findFingerprint(rows, ip) !== null
  } catch {
    return false
  }
}

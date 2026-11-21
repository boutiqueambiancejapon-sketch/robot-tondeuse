import 'server-only'
import { getPool } from '@/lib/server/db'
import { clientIp, isOwnerIp } from '@/lib/server/owner-ip'
import { deviceOf, isBotUa, visitorHash } from '@/lib/server/visitor'
import { countryOf } from '@/scripts/lib/geo.mjs'

// Server-side first-party event (kit requests and confirmations), same table and rules as /api/e:
// no cookie, no address or email stored, robots and the owner skipped. Never throws.

export async function recordEvent(headers: Headers, name: string, page: string, props: Record<string, string>): Promise<void> {
  const pool = getPool()
  const ua = headers.get('user-agent') ?? ''
  if (!pool || isBotUa(ua)) return
  const ip = clientIp(headers)
  try {
    if (await isOwnerIp(ip)) return
    await pool.query('INSERT INTO analytics.events (name, page, props, device, visitor, country) VALUES ($1, $2, $3, $4, $5, $6)', [
      name,
      page.slice(0, 300),
      JSON.stringify(props),
      deviceOf(ua),
      await visitorHash(pool, ip, ua),
      countryOf(ip),
    ])
  } catch (err) {
    console.error('[events] insert failed', err instanceof Error ? err.message : err)
  }
}

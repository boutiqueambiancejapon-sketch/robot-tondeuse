import { NextResponse, type NextRequest } from 'next/server'
import { getPool } from '@/lib/server/db'
import { clientIp, isOwnerIp } from '@/lib/server/owner-ip'
import { deviceOf, isBotUa, visitorHash } from '@/lib/server/visitor'
import { countryOf } from '@/scripts/lib/geo.mjs'
import { SESSION_COOKIE } from '@/lib/dashboard/policy'
import { BROWSER_EVENTS } from '@/lib/dashboard/events'

// First-party events for the owner dashboard (page views come from Caddy's log). No cookie set,
// no address stored (only the country read from it). Always answers 204: measurement must never break the page.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// newsletter_signup and tool_use are recorded by the server (/api/inscription, /api/m), never accepted from here.
const EVENTS = new Set<string>(BROWSER_EVENTS)
const MAX_BODY = 2_000
const MAX_PROPS = 8
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 30

/** Simple per-address limit, in memory only (the address is never written). */
const hitsByIp = new Map<string, { n: number; until: number }>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  if (hitsByIp.size > 5_000) hitsByIp.clear()
  const entry = hitsByIp.get(ip)
  if (!entry || entry.until < now) {
    hitsByIp.set(ip, { n: 1, until: now + WINDOW_MS })
    return false
  }
  entry.n += 1
  return entry.n > MAX_PER_WINDOW
}

function cleanProps(raw: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {}
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return out
  for (const [key, value] of Object.entries(raw).slice(0, MAX_PROPS)) {
    if (key.length > 40) continue
    if (typeof value === 'string') out[key] = value.slice(0, 80)
    else if (typeof value === 'number' && Number.isFinite(value)) out[key] = value
    else if (typeof value === 'boolean') out[key] = value
  }
  return out
}

function hostOf(url: unknown): string | null {
  if (typeof url !== 'string' || !url) return null
  try {
    return new URL(url).hostname.replace(/^www\./, '').slice(0, 100)
  } catch {
    return null
  }
}

/** Path of the previous page when it is on the site (never an outside address or a query string). */
function ownPathOf(url: unknown, host: string | null): string | null {
  if (typeof url !== 'string' || !url || !host) return null
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, '') === host ? u.pathname.slice(0, 120) : null
  } catch {
    return null
  }
}

const done = () => new NextResponse(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })

export async function POST(req: NextRequest) {
  const pool = getPool()
  if (!pool) return done()
  const ua = req.headers.get('user-agent') ?? ''
  if (isBotUa(ua)) return done()
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host && hostOf(origin) !== host.replace(/^www\./, '').split(':')[0]) return done()
  // The owner (dashboard cookie or his current address) is not counted.
  if (req.cookies.get(SESSION_COOKIE)?.value) return done()
  const ip = clientIp(req.headers)
  if (rateLimited(ip)) return done()

  const raw = await req.text()
  if (raw.length > MAX_BODY) return done()
  let body: { n?: unknown; p?: unknown; r?: unknown; props?: unknown }
  try {
    body = JSON.parse(raw) as typeof body
  } catch {
    return done()
  }
  if (typeof body.n !== 'string' || !EVENTS.has(body.n) || typeof body.p !== 'string' || !body.p.startsWith('/')) return done()
  try {
    if (await isOwnerIp(ip)) return done()
    const props = cleanProps(body.props)
    delete props.from
    const from = ownPathOf(body.r, host ? (host.replace(/^www\./, '').split(':')[0] ?? null) : null)
    if (from) props.from = from
    await pool.query(
      'INSERT INTO analytics.events (name, page, props, ref_host, device, visitor, country) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [body.n, body.p.slice(0, 300), JSON.stringify(props), hostOf(body.r), deviceOf(ua), await visitorHash(pool, ip, ua), countryOf(ip)],
    )
  } catch (err) {
    console.error('[api/e] insert failed', err instanceof Error ? err.message : err)
  }
  return done()
}

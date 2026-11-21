import { createHash, randomBytes } from 'node:crypto'
import type { Pool } from 'pg'
import { visitorKey } from '@/scripts/lib/analytics-ignore.mjs'

// Same visitor hash as scripts/ingest-caddy-logs.mjs: daily salt from analytics.visitor_salt (deleted
// after 2 days), address (IPv6: its /64) and browser. No cookie; the address is never written.

const BOT_UA = /bot|crawl|spider|slurp|headless|python|curl|wget|go-http|httpclient|scrapy|java\/|okhttp|axios|node-fetch|uptime|monitor|toutou-/i

export function isBotUa(ua: string): boolean {
  return !ua || BOT_UA.test(ua)
}

export function deviceOf(ua: string): string {
  if (/ipad|tablet/i.test(ua)) return 'tablet'
  if (/mobi|iphone|android/i.test(ua)) return 'mobile'
  return 'desktop'
}

export async function visitorHash(pool: Pool, ip: string, ua: string, now = new Date()): Promise<string | null> {
  const key = visitorKey(ip)
  if (!key) return null
  const { rows } = await pool.query<{ salt: string }>(
    `INSERT INTO analytics.visitor_salt (day, salt) VALUES ($1, $2)
     ON CONFLICT (day) DO UPDATE SET day = EXCLUDED.day RETURNING salt`,
    [now.toISOString().slice(0, 10), randomBytes(32).toString('hex')],
  )
  const salt = rows[0]?.salt
  return salt ? createHash('sha256').update(`${salt}|${key}|${ua}`).digest('hex').slice(0, 16) : null
}

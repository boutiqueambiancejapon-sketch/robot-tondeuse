import 'server-only'
import { requirePool } from '@/lib/server/db'

// Security screen data: open sessions and the login journal (30 latest lines). The address is
// only a keyed hash: its first characters tell two addresses apart without revealing them.

export interface SessionRow {
  id: string
  stage: string
  deviceLabel: string
  createdAt: Date
  lastSeenAt: Date
}

export interface EventRow {
  id: string
  at: Date
  kind: string
  outcome: string
  ip: string
  deviceLabel: string
}

export async function readSecurity(): Promise<{ sessions: SessionRow[]; events: EventRow[] }> {
  const pool = requirePool()
  const [sessions, events] = await Promise.all([
    pool.query<SessionRow>(
      `SELECT id, stage, device_label AS "deviceLabel", created_at AS "createdAt", last_seen_at AS "lastSeenAt"
         FROM dashboard.session WHERE expires_at > now() ORDER BY last_seen_at DESC`,
    ),
    pool.query<EventRow>(
      `SELECT id::text, at, kind, outcome, left(ip_hash, 6) AS ip, device_label AS "deviceLabel" FROM dashboard.login_event ORDER BY at DESC LIMIT 30`,
    ),
  ])
  return { sessions: sessions.rows, events: events.rows }
}

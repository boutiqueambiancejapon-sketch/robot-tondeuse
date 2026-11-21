import 'server-only'
import { requirePool } from '@/lib/server/db'
import { LIMIT_WINDOW_MS, MAX_GLOBAL_FAILURES, MAX_IP_FAILURES } from '@/lib/dashboard/policy'

// Limits and journal in the database: a restart resets nothing. Each try is first written as a
// failure, under a lock (parallel requests cannot slip through), then corrected on success.
// Per address: 5 failures in 15 min. Global: 30 password failures in 15 min (Face ID stays open).

const LOCK_KEY = 1_010_420
const JOURNAL_DAYS = 90
const INSERT_EVENT = 'INSERT INTO dashboard.login_event (kind, outcome, ip_hash, device_label) VALUES ($1, $2, $3, $4) RETURNING id'

export type AttemptKind = 'password' | 'passkey' | 'totp'

export interface Requester {
  ipHash: string
  label: string
}

/** Attempt id, or null when refused up front (address or service blocked). */
export async function beginAttempt(kind: AttemptKind, who: Requester): Promise<number | null> {
  const client = await requirePool().connect()
  try {
    await client.query('BEGIN')
    await client.query('SELECT pg_advisory_xact_lock($1)', [LOCK_KEY])
    const { rows } = await client.query<{ ip: number; global: number }>(
      `SELECT count(*) FILTER (WHERE ip_hash = $1)::int AS ip,
              count(*) FILTER (WHERE kind = 'password')::int AS global
         FROM dashboard.login_event WHERE outcome = 'failure' AND at > $2`,
      [who.ipHash, new Date(Date.now() - LIMIT_WINDOW_MS)],
    )
    const counts = rows[0] ?? { ip: 0, global: 0 }
    if (counts.ip >= MAX_IP_FAILURES || (kind === 'password' && counts.global >= MAX_GLOBAL_FAILURES)) {
      await client.query('COMMIT')
      return null
    }
    const inserted = await client.query<{ id: string }>(INSERT_EVENT, [kind, 'failure', who.ipHash, who.label])
    await client.query('DELETE FROM dashboard.login_event WHERE at < now() - make_interval(days => $1)', [JOURNAL_DAYS])
    await client.query('COMMIT')
    return Number(inserted.rows[0]?.id ?? 0)
  } catch (err) {
    await client.query('ROLLBACK').catch(() => undefined)
    throw err
  } finally {
    client.release()
  }
}

export async function attemptSucceeded(id: number): Promise<void> {
  await requirePool().query(`UPDATE dashboard.login_event SET outcome = 'success' WHERE id = $1`, [id])
}

/** Event without a limit: logout, factor added. */
export async function logEvent(kind: string, outcome: string, who: Requester): Promise<void> {
  await requirePool().query(INSERT_EVENT, [kind, outcome, who.ipHash, who.label])
}

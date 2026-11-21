import { requirePool } from '@/lib/server/db'
import { ABSOLUTE_MS, CHALLENGE_MS, sessionIsLive, stageLifetimeMs, TOUCH_EVERY_MS, type SessionStage } from '@/lib/dashboard/policy'
import { newToken, passwordFingerprint, tokenHash } from './secrets'

// Owner sessions: random cookie, hash in the database, revoked at once by deleting the row.
// Passing a factor changes the cookie value. (No 'server-only' import: proxy.ts uses this file.)

export interface DashboardSession {
  id: string
  stage: SessionStage
  passwordFp: string
  createdAt: Date
  lastSeenAt: Date
  expiresAt: Date
  factorAt: Date | null
  factorFailures: number
  deviceLabel: string
}

const COLUMNS = `id, stage, password_fp AS "passwordFp", created_at AS "createdAt", last_seen_at AS "lastSeenAt",
  expires_at AS "expiresAt", factor_at AS "factorAt", factor_failures AS "factorFailures", device_label AS "deviceLabel"`

/** Live session for this cookie, or null. touch: counts as activity (at most one write a minute). */
export async function readSession(token: string | undefined, touch = false, now = new Date()): Promise<DashboardSession | null> {
  const fp = passwordFingerprint()
  if (!token || token.length > 128 || !fp) return null
  const pool = requirePool()
  const { rows } = await pool.query<DashboardSession>(`SELECT ${COLUMNS} FROM dashboard.session WHERE token_hash = $1`, [tokenHash(token)])
  const session = rows[0]
  if (!session) return null
  if (!sessionIsLive(session, fp, now)) {
    await pool.query('DELETE FROM dashboard.session WHERE id = $1', [session.id])
    return null
  }
  if (touch && now.getTime() - session.lastSeenAt.getTime() >= TOUCH_EVERY_MS) {
    await pool.query('UPDATE dashboard.session SET last_seen_at = $2 WHERE id = $1', [session.id, now])
  }
  return session
}

export async function createSession(stage: SessionStage, label: string, now = new Date(), factorAt: Date | null = null): Promise<string> {
  const fp = passwordFingerprint()
  if (!fp) throw new Error('Password missing')
  const token = newToken()
  const pool = requirePool()
  await pool.query(
    `INSERT INTO dashboard.session (token_hash, stage, password_fp, created_at, last_seen_at, expires_at, device_label, factor_at)
     VALUES ($1, $2, $3, $4, $4, $5, $6, $7)`,
    [tokenHash(token), stage, fp, now, new Date(now.getTime() + stageLifetimeMs(stage)), label, factorAt],
  )
  await pool.query('DELETE FROM dashboard.session WHERE expires_at < $1', [now])
  return token
}

/** Second factor passed: new cookie value, 12 h from now. */
export async function elevateSession(id: string, now = new Date()): Promise<string> {
  const token = newToken()
  await requirePool().query(
    `UPDATE dashboard.session SET token_hash = $2, stage = 'full', factor_at = $3, last_seen_at = $3, expires_at = $4,
       factor_failures = 0, challenge = NULL, challenge_at = NULL WHERE id = $1`,
    [id, tokenHash(token), now, new Date(now.getTime() + ABSOLUTE_MS)],
  )
  return token
}

export async function deleteSession(id: string): Promise<void> {
  await requirePool().query('DELETE FROM dashboard.session WHERE id = $1', [id])
}

export async function countFactorFailure(id: string): Promise<number> {
  const { rows } = await requirePool().query<{ n: number }>(
    'UPDATE dashboard.session SET factor_failures = factor_failures + 1 WHERE id = $1 RETURNING factor_failures AS n',
    [id],
  )
  return rows[0]?.n ?? 0
}

export async function saveChallenge(id: string, challenge: string, now = new Date()): Promise<void> {
  await requirePool().query('UPDATE dashboard.session SET challenge = $2, challenge_at = $3 WHERE id = $1', [id, challenge, now])
}

/** Reads and clears the challenge in one statement: single use, under 5 minutes. */
export async function takeChallenge(id: string, now = new Date()): Promise<string | null> {
  const { rows } = await requirePool().query<{ challenge: string | null; challengeAt: Date | null }>(
    `WITH old AS (SELECT id, challenge, challenge_at FROM dashboard.session WHERE id = $1 FOR UPDATE)
     UPDATE dashboard.session s SET challenge = NULL, challenge_at = NULL FROM old WHERE s.id = old.id
     RETURNING old.challenge AS challenge, old.challenge_at AS "challengeAt"`,
    [id],
  )
  const row = rows[0]
  if (!row?.challenge || !row.challengeAt || now.getTime() - row.challengeAt.getTime() > CHALLENGE_MS) return null
  return row.challenge
}

const MAX_DIRECT_CHALLENGES = 200

/** Challenge of a direct Face ID login. A burst pushes out the oldest: the table never fills up. */
export async function saveDirectChallenge(challenge: string): Promise<void> {
  const pool = requirePool()
  await pool.query('INSERT INTO dashboard.challenge (challenge) VALUES ($1)', [challenge])
  await pool.query(
    `DELETE FROM dashboard.challenge WHERE created_at < now() - make_interval(secs => $1)
       OR challenge NOT IN (SELECT challenge FROM dashboard.challenge ORDER BY created_at DESC LIMIT $2)`,
    [CHALLENGE_MS / 1000, MAX_DIRECT_CHALLENGES],
  )
}

export async function takeDirectChallenge(challenge: string): Promise<boolean> {
  const { rowCount } = await requirePool().query(
    'DELETE FROM dashboard.challenge WHERE challenge = $1 AND created_at >= now() - make_interval(secs => $2)',
    [challenge, CHALLENGE_MS / 1000],
  )
  return rowCount === 1
}

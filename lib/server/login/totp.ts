import 'server-only'
import { Secret, TOTP } from 'otpauth'
import { requirePool } from '@/lib/server/db'
import { decryptSecret, encryptSecret } from './secrets'

// 6-digit code (RFC 6238, SHA-1, 30 s) with the otpauth library: settings every app reads,
// iPhone Passwords included. One period of drift accepted each way; a used code is refused.

const PERIOD = 30

function totpOf(base32: string): TOTP {
  return new TOTP({ issuer: 'Quel Robot Tondeuse', label: 'Tableau de bord', algorithm: 'SHA1', digits: 6, period: PERIOD, secret: Secret.fromBase32(base32) })
}

/** Enrolment in progress: the secret opens nothing until a first code confirms it. */
export async function startTotpEnrollment(): Promise<{ uri: string; secret: string } | null> {
  const secret = new Secret({ size: 20 }).base32
  const { rowCount } = await requirePool().query(
    `INSERT INTO dashboard.totp (id, secret_enc) VALUES (1, $1)
     ON CONFLICT (id) DO UPDATE SET secret_enc = EXCLUDED.secret_enc, created_at = now() WHERE dashboard.totp.confirmed_at IS NULL`,
    [encryptSecret(secret)],
  )
  return rowCount === 1 ? { uri: totpOf(secret).toString(), secret } : null
}

function matchingCounter(base32: string, code: string, timestamp = Date.now()): number | null {
  if (!/^\d{6}$/.test(code)) return null
  const delta = totpOf(base32).validate({ token: code, timestamp, window: 1 })
  return delta === null ? null : Math.floor(timestamp / 1000 / PERIOD) + delta
}

async function readRow(): Promise<{ secret: string; confirmed: boolean } | null> {
  const { rows } = await requirePool().query<{ secret_enc: string; confirmed_at: Date | null }>('SELECT secret_enc, confirmed_at FROM dashboard.totp WHERE id = 1')
  const row = rows[0]
  const secret = row ? decryptSecret(row.secret_enc) : null
  return row && secret ? { secret, confirmed: row.confirmed_at !== null } : null
}

/** First right code: the secret becomes a factor. */
export async function confirmTotp(code: string): Promise<boolean> {
  const row = await readRow()
  if (!row || row.confirmed) return false
  const counter = matchingCounter(row.secret, code)
  if (counter === null) return false
  const { rowCount } = await requirePool().query('UPDATE dashboard.totp SET confirmed_at = now(), last_counter = $1 WHERE id = 1 AND confirmed_at IS NULL', [counter])
  return rowCount === 1
}

/** Login: right code, from a period newer than the last accepted one (atomic write). */
export async function verifyTotp(code: string): Promise<boolean> {
  const row = await readRow()
  if (!row?.confirmed) return false
  const counter = matchingCounter(row.secret, code)
  if (counter === null) return false
  const { rowCount } = await requirePool().query('UPDATE dashboard.totp SET last_counter = $1 WHERE id = 1 AND confirmed_at IS NOT NULL AND last_counter < $1', [counter])
  return rowCount === 1
}

import 'server-only'
import { requirePool } from '@/lib/server/db'

// What is enrolled: passkeys (Face ID) and the TOTP secret.

export interface StoredPasskey {
  credentialId: string
  publicKey: string
  counter: number
  transports: string[]
  label: string
  createdAt: Date
  lastUsedAt: Date | null
}

export async function listPasskeys(): Promise<StoredPasskey[]> {
  const { rows } = await requirePool().query<StoredPasskey>(
    `SELECT credential_id AS "credentialId", public_key AS "publicKey", counter, transports, label,
            created_at AS "createdAt", last_used_at AS "lastUsedAt"
       FROM dashboard.passkey ORDER BY created_at`,
  )
  // pg returns bigint as a string.
  return rows.map((r) => ({ ...r, counter: Number(r.counter) }))
}

export async function factorsSummary(): Promise<{ passkeys: number; totp: boolean }> {
  const { rows } = await requirePool().query<{ passkeys: number; totp: number }>(
    `SELECT (SELECT count(*)::int FROM dashboard.passkey) AS passkeys,
            (SELECT count(*)::int FROM dashboard.totp WHERE confirmed_at IS NOT NULL) AS totp`,
  )
  const r = rows[0]
  return { passkeys: r?.passkeys ?? 0, totp: (r?.totp ?? 0) > 0 }
}

export async function hasFactor(): Promise<boolean> {
  const f = await factorsSummary()
  return f.passkeys > 0 || f.totp
}

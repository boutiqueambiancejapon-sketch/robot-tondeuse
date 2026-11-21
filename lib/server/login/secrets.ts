import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes, timingSafeEqual } from 'node:crypto'

// Keys derived from DASHBOARD_AUTH_SECRET (HKDF), one per use. Secrets live only in
// /srv/sites/robot-tondeuse/shared/.env. Changing DASHBOARD_AUTH_SECRET invalidates the TOTP
// secret; changing DASHBOARD_PASSWORD closes every session.

const MIN_SECRET_LENGTH = 32
const MIN_PASSWORD_LENGTH = 20

type KeyUse = 'ip' | 'password' | 'totp'

export function authSecret(): string | null {
  const secret = process.env.DASHBOARD_AUTH_SECRET
  return secret && secret.length >= MIN_SECRET_LENGTH ? secret : null
}

function ownerPassword(): string | null {
  const password = process.env.DASHBOARD_PASSWORD
  return password && password.length >= MIN_PASSWORD_LENGTH ? password : null
}

/** The dashboard exists only with a strong password, the auth secret and a database. */
export function loginConfigured(): boolean {
  return ownerPassword() !== null && authSecret() !== null && Boolean(process.env.DATABASE_URL)
}

function key(use: KeyUse): Buffer {
  const secret = authSecret()
  if (!secret) throw new Error('DASHBOARD_AUTH_SECRET missing')
  return Buffer.from(hkdfSync('sha256', secret, 'qrt-dashboard', use, 32))
}

function keyed(use: KeyUse, value: string): string {
  return createHmac('sha256', key(use)).update(value).digest('base64url')
}

export const ipHash = (ip: string): string => keyed('ip', ip)

/** Fingerprint of the current password, stored in each session. */
export function passwordFingerprint(): string | null {
  const password = ownerPassword()
  return password && authSecret() ? keyed('password', password) : null
}

/** Constant-time check (fixed-length digests). A phone keyboard may add a trailing space: ignored. */
export function passwordMatches(input: string): boolean {
  const expected = ownerPassword()
  const a = createHash('sha256').update(input.trim()).digest()
  const b = createHash('sha256').update(expected ?? randomBytes(16).toString('hex')).digest()
  return timingSafeEqual(a, b) && expected !== null
}

/** Random cookie value. Only its hash goes to the database: the database alone opens nothing. */
export function newToken(): string {
  return randomBytes(32).toString('base64url')
}

export function tokenHash(token: string): string {
  return createHash('sha256').update(token).digest('base64url')
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key('totp'), iv)
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return [iv, cipher.getAuthTag(), data].map((part) => part.toString('base64url')).join('.')
}

export function decryptSecret(sealed: string): string | null {
  try {
    const [iv, tag, data] = sealed.split('.').map((part) => Buffer.from(part, 'base64url'))
    if (!iv || !tag || !data) return null
    const decipher = createDecipheriv('aes-256-gcm', key('totp'), iv)
    decipher.setAuthTag(tag)
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
  } catch {
    return null
  }
}

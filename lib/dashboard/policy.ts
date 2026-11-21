// Owner login rules for /dashboard, with no database or network (safe to import client-side).
// Adapted from Toutou Gourmet: password, then a second factor (passkey or 6-digit code).

const MINUTE = 60_000
const HOUR = 60 * MINUTE

export const SESSION_COOKIE = '__Host-qrt_dashboard'

export const ABSOLUTE_MS = 12 * HOUR
export const IDLE_MS = 2 * HOUR
/** Password accepted, second factor expected. */
export const PENDING_MS = 10 * MINUTE
/** Password accepted, no factor enrolled yet: long enough to set one up. */
export const ENROLL_MS = 30 * MINUTE
export const TOUCH_EVERY_MS = MINUTE
/** Adding a factor from the Security page needs a recent second factor. */
export const RECENT_FACTOR_MS = 15 * MINUTE
export const CHALLENGE_MS = 5 * MINUTE

export const LIMIT_WINDOW_MS = 15 * MINUTE
export const MAX_IP_FAILURES = 5
export const MAX_GLOBAL_FAILURES = 30
/** Second-factor tries on one session before the password is asked again. */
export const MAX_SESSION_FACTOR_FAILURES = 5

export type SessionStage = 'second_factor' | 'enroll' | 'full'

export const ROOT = '/dashboard'
export const LOGIN_PATH = `${ROOT}/connexion`
export const VERIFY_PATH = `${LOGIN_PATH}/verification`
export const ENROLL_PATH = `${LOGIN_PATH}/enrolement`
export const SECURITY_PATH = `${ROOT}/securite`
export const API_PATH = `${LOGIN_PATH}/api`

export interface SessionClock {
  passwordFp: string
  lastSeenAt: Date
  expiresAt: Date
}

/** Still valid: not expired (absolute or idle) and not older than the current password. */
export function sessionIsLive(session: SessionClock, currentPasswordFp: string, now: Date): boolean {
  if (session.passwordFp !== currentPasswordFp) return false
  if (session.expiresAt.getTime() <= now.getTime()) return false
  return now.getTime() - session.lastSeenAt.getTime() < IDLE_MS
}

export function stageLifetimeMs(stage: SessionStage): number {
  if (stage === 'full') return ABSOLUTE_MS
  return stage === 'enroll' ? ENROLL_MS : PENDING_MS
}

export function stageHref(stage: SessionStage, next: unknown = ROOT): string {
  if (stage === 'full') return safeNext(next)
  return stage === 'enroll' ? ENROLL_PATH : VERIFY_PATH
}

export function factorIsRecent(factorAt: Date | null, now: Date): boolean {
  return factorAt !== null && now.getTime() - factorAt.getTime() < RECENT_FACTOR_MS
}

/** Where to go after login: a dashboard path only, never another site. */
export function safeNext(value: unknown): string {
  if (typeof value !== 'string' || value.length > 300) return ROOT
  if (!/^\/dashboard(?:[/?#]|$)/.test(value)) return ROOT
  if (value.includes('\\') || value.includes('//') || /[\r\n\t]/.test(value)) return ROOT
  return value.startsWith(LOGIN_PATH) ? ROOT : value
}

export function isPublicPath(pathname: string): boolean {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return path === LOGIN_PATH || path.startsWith(`${LOGIN_PATH}/`)
}

/** Simple device label for the journal: system and browser, nothing more. */
export function deviceLabel(userAgent: string | null): string {
  const ua = userAgent ?? ''
  const system =
    (/iPhone/.test(ua) && 'iPhone') ||
    (/iPad/.test(ua) && 'iPad') ||
    (/Android/.test(ua) && 'Android') ||
    (/Mac OS X|Macintosh/.test(ua) && 'Mac') ||
    (/Windows/.test(ua) && 'Windows') ||
    (/Linux/.test(ua) && 'Linux') ||
    'Appareil inconnu'
  const browser =
    (/Edg(A|iOS)?\//.test(ua) && 'Edge') ||
    (/(FxiOS|Firefox)\//.test(ua) && 'Firefox') ||
    (/(CriOS|Chrome)\//.test(ua) && 'Chrome') ||
    (/Safari\//.test(ua) && 'Safari') ||
    ''
  return browser ? `${system} · ${browser}` : system
}

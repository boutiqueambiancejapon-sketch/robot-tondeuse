import type { Requester } from './attempts'
import type { DashboardSession } from './sessions'

// A login action gets the request already read and returns a result without HTTP.

export interface FlowContext {
  who: Requester
  session: DashboardSession | null
  input: Record<string, unknown>
}

export interface FlowResult {
  status: number
  body: Record<string, unknown>
  setSession?: string
  clearSession?: boolean
}

export const ok = (body: Record<string, unknown> = {}): FlowResult => ({ status: 200, body: { ok: true, ...body } })
export const refused = (error: string, status = 400): FlowResult => ({ status, body: { ok: false, error } })

/** Same answer for a wrong password, code or key. */
export const NEUTRAL = (): FlowResult => refused('invalid', 401)
export const BLOCKED = (): FlowResult => refused('blocked', 429)
export const NO_SESSION = (): FlowResult => refused('session', 401)

export function text(input: Record<string, unknown>, key: string, max = 512): string {
  const value = input[key]
  return typeof value === 'string' && value.length <= max ? value : ''
}

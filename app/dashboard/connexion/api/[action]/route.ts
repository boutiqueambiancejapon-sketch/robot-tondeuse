import { cookies, headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { ABSOLUTE_MS, deviceLabel, SESSION_COOKIE } from '@/lib/dashboard/policy'
import { enrollPasskeyOptions, enrollPasskeyVerify, enrollTotpConfirm, enrollTotpStart } from '@/lib/server/login/flow-enroll'
import { directOptionsStep, directVerifyStep, logoutStep, passkeyOptionsStep, passkeyVerifyStep, passwordStep, totpStep } from '@/lib/server/login/flow-login'
import { closeSessionStep, logoutAllStep } from '@/lib/server/login/flow-sessions'
import type { FlowContext, FlowResult } from '@/lib/server/login/flow-types'
import { clientIp } from '@/lib/server/owner-ip'
import { ipHash, loginConfigured } from '@/lib/server/login/secrets'
import { readSession } from '@/lib/server/login/sessions'

// Every login action goes through here. Each one checks the session stage itself (flow-*.ts);
// on top of that, POST requires an Origin from the same host.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const NO_STORE = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow' }
const MAX_BODY = 16_384

const ACTIONS: Record<string, (ctx: FlowContext) => Promise<FlowResult>> = {
  'mot-de-passe': passwordStep,
  code: totpStep,
  'cle-options': passkeyOptionsStep,
  'cle-verifier': passkeyVerifyStep,
  'cle-directe-options': directOptionsStep,
  'cle-directe': directVerifyStep,
  'enrol-cle-options': enrollPasskeyOptions,
  'enrol-cle-verifier': enrollPasskeyVerify,
  'enrol-code-debut': enrollTotpStart,
  'enrol-code-confirmer': enrollTotpConfirm,
  deconnexion: logoutStep,
  'session-fermer': closeSessionStep,
  'deconnexion-partout': logoutAllStep,
}

const baseCookie = { httpOnly: true, secure: true, sameSite: 'strict' as const, path: '/' }

function respond(result: FlowResult): NextResponse {
  const response = NextResponse.json(result.body, { status: result.status, headers: NO_STORE })
  if (result.setSession) response.cookies.set(SESSION_COOKIE, result.setSession, { ...baseCookie, maxAge: ABSOLUTE_MS / 1000 })
  if (result.clearSession) response.cookies.set(SESSION_COOKIE, '', { ...baseCookie, maxAge: 0 })
  return response
}

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status, headers: NO_STORE })

function sameHost(h: Headers): boolean {
  const origin = h.get('origin')
  const host = h.get('x-forwarded-host') ?? h.get('host')
  try {
    return Boolean(origin && host && new URL(origin).host === host)
  } catch {
    return false
  }
}

function parseInput(raw: string): Record<string, unknown> | null {
  if (raw.length > MAX_BODY) return null
  try {
    const value: unknown = JSON.parse(raw || '{}')
    return typeof value === 'object' && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params
  const handler = Object.hasOwn(ACTIONS, action) ? ACTIONS[action] : undefined
  if (!handler || !loginConfigured()) return new NextResponse(null, { status: 404, headers: NO_STORE })
  const h = await headers()
  if (!sameHost(h)) return fail('origin', 403)
  const input = parseInput(await request.text())
  if (!input) return fail('input', 400)
  try {
    const session = await readSession((await cookies()).get(SESSION_COOKIE)?.value)
    const who = { ipHash: ipHash(clientIp(h)), label: deviceLabel(h.get('user-agent')) }
    return respond(await handler({ who, session, input }))
  } catch (err) {
    console.error('[dashboard-login]', err instanceof Error ? err.message : err)
    return fail('unavailable', 503)
  }
}

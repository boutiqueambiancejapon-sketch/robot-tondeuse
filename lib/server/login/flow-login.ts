import 'server-only'
import type { AuthenticationResponseJSON } from '@simplewebauthn/server'
import { ENROLL_PATH, LOGIN_PATH, MAX_SESSION_FACTOR_FAILURES, stageHref, VERIFY_PATH, type SessionStage } from '@/lib/dashboard/policy'
import { attemptSucceeded, beginAttempt, logEvent, type AttemptKind } from './attempts'
import { hasFactor } from './factors'
import { BLOCKED, NEUTRAL, NO_SESSION, ok, text, type FlowContext, type FlowResult } from './flow-types'
import { passwordMatches } from './secrets'
import { countFactorFailure, createSession, deleteSession, elevateSession, saveChallenge, saveDirectChallenge, takeChallenge, takeDirectChallenge } from './sessions'
import { verifyTotp } from './totp'
import { authenticationOptions, challengeOf, checkAuthentication, directAuthenticationOptions } from './webauthn'

// Password, then a second factor. A right password never opens the dashboard once a factor exists:
// it creates a waiting session that only reaches the next screen. Before the first factor is
// enrolled, the strong password opens the enrolment screen only (ENROLL_MS).

export async function passwordStep(ctx: FlowContext): Promise<FlowResult> {
  const attempt = await beginAttempt('password', ctx.who)
  if (attempt === null) return BLOCKED()
  if (!passwordMatches(text(ctx.input, 'password', 200))) return NEUTRAL()
  await attemptSucceeded(attempt)
  const stage: SessionStage = (await hasFactor()) ? 'second_factor' : 'enroll'
  const token = await createSession(stage, ctx.who.label)
  return { ...ok({ next: stage === 'enroll' ? ENROLL_PATH : VERIFY_PATH }), setSession: token }
}

export async function openFullSession(ctx: FlowContext, sessionId: string, extra: Record<string, unknown> = {}): Promise<FlowResult> {
  const token = await elevateSession(sessionId)
  return { ...ok({ next: stageHref('full', ctx.input.next), ...extra }), setSession: token }
}

async function factorStep(ctx: FlowContext, kind: AttemptKind, check: () => Promise<boolean>): Promise<FlowResult> {
  const session = ctx.session
  if (session?.stage !== 'second_factor') return NO_SESSION()
  const attempt = await beginAttempt(kind, ctx.who)
  if (attempt === null) return BLOCKED()
  if (await check()) {
    await attemptSucceeded(attempt)
    return openFullSession(ctx, session.id)
  }
  if ((await countFactorFailure(session.id)) < MAX_SESSION_FACTOR_FAILURES) return NEUTRAL()
  await deleteSession(session.id)
  return { status: 401, body: { ok: false, error: 'invalid', next: LOGIN_PATH }, clearSession: true }
}

export const totpStep = (ctx: FlowContext): Promise<FlowResult> => factorStep(ctx, 'totp', () => verifyTotp(text(ctx.input, 'code', 16).replace(/\s/g, '')))

export async function passkeyOptionsStep(ctx: FlowContext): Promise<FlowResult> {
  if (ctx.session?.stage !== 'second_factor') return NO_SESSION()
  const options = await authenticationOptions()
  await saveChallenge(ctx.session.id, options.challenge)
  return ok({ options })
}

function responseOf(input: Record<string, unknown>): AuthenticationResponseJSON | null {
  const r = input.response
  return typeof r === 'object' && r !== null && 'response' in r && 'id' in r ? (r as AuthenticationResponseJSON) : null
}

export const passkeyVerifyStep = (ctx: FlowContext): Promise<FlowResult> =>
  factorStep(ctx, 'passkey', async () => {
    const challenge = ctx.session ? await takeChallenge(ctx.session.id) : null
    const response = responseOf(ctx.input)
    return Boolean(challenge && response && (await checkAuthentication(response, challenge)))
  })

// Direct Face ID login: the key is worth two proofs, the device and the face (user verification
// required). The 6-digit code stays behind the password.
export async function directOptionsStep(): Promise<FlowResult> {
  if (!(await hasFactor())) return NEUTRAL()
  const options = await directAuthenticationOptions()
  await saveDirectChallenge(options.challenge)
  return ok({ options })
}

export async function directVerifyStep(ctx: FlowContext): Promise<FlowResult> {
  const attempt = await beginAttempt('passkey', ctx.who)
  if (attempt === null) return BLOCKED()
  const response = responseOf(ctx.input)
  const challenge = response ? challengeOf(response) : null
  if (!response || !challenge || !(await takeDirectChallenge(challenge)) || !(await checkAuthentication(response, challenge))) return NEUTRAL()
  await attemptSucceeded(attempt)
  const now = new Date()
  const token = await createSession('full', ctx.who.label, now, now)
  return { ...ok({ next: stageHref('full', ctx.input.next) }), setSession: token }
}

export async function logoutStep(ctx: FlowContext): Promise<FlowResult> {
  if (ctx.session) {
    await deleteSession(ctx.session.id)
    await logEvent('logout', 'success', ctx.who)
  }
  return { ...ok({ next: LOGIN_PATH }), clearSession: true }
}

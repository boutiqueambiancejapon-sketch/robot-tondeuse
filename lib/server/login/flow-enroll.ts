import 'server-only'
import type { RegistrationResponseJSON } from '@simplewebauthn/server'
import { factorIsRecent, MAX_SESSION_FACTOR_FAILURES } from '@/lib/dashboard/policy'
import { OG } from '@/lib/og/tokens'
import { logEvent } from './attempts'
import { hasFactor } from './factors'
import { openFullSession } from './flow-login'
import { NEUTRAL, NO_SESSION, ok, refused, text, type FlowContext, type FlowResult } from './flow-types'
import { qrDataUri } from './qr'
import { countFactorFailure, deleteSession, saveChallenge, takeChallenge } from './sessions'
import { confirmTotp, startTotpEnrollment } from './totp'
import { registrationOptions, saveRegistration } from './webauthn'

// Adding a factor. Enrolment screen: limited session, while no factor exists. Security page:
// full session, second factor passed less than 15 minutes ago.

/** null if the session may add a factor, else the refusal. */
async function changeDenied(ctx: FlowContext): Promise<FlowResult | null> {
  const session = ctx.session
  if (!session) return NO_SESSION()
  if (session.stage === 'full') return factorIsRecent(session.factorAt, new Date()) ? null : refused('reauth', 403)
  if (session.stage !== 'enroll') return NO_SESSION()
  if (!(await hasFactor())) return null
  // A factor appeared meanwhile: this enrolment session is worth nothing any more.
  await deleteSession(session.id)
  return { ...NO_SESSION(), clearSession: true }
}

async function factorAdded(ctx: FlowContext): Promise<FlowResult> {
  await logEvent('enroll', 'success', ctx.who)
  return ctx.session?.stage === 'enroll' ? openFullSession(ctx, ctx.session.id) : ok()
}

export async function enrollPasskeyOptions(ctx: FlowContext): Promise<FlowResult> {
  const denied = await changeDenied(ctx)
  if (denied || !ctx.session) return denied ?? NO_SESSION()
  const options = await registrationOptions()
  await saveChallenge(ctx.session.id, options.challenge)
  return ok({ options })
}

export async function enrollPasskeyVerify(ctx: FlowContext): Promise<FlowResult> {
  const denied = await changeDenied(ctx)
  if (denied || !ctx.session) return denied ?? NO_SESSION()
  const challenge = await takeChallenge(ctx.session.id)
  const response = ctx.input.response
  if (!challenge || typeof response !== 'object' || response === null) return NEUTRAL()
  return (await saveRegistration(response as RegistrationResponseJSON, challenge, ctx.who.label)) ? factorAdded(ctx) : NEUTRAL()
}

export async function enrollTotpStart(ctx: FlowContext): Promise<FlowResult> {
  const denied = await changeDenied(ctx)
  if (denied) return denied
  const enrollment = await startTotpEnrollment()
  if (!enrollment) return refused('exists', 409)
  return ok({ uri: enrollment.uri, secret: enrollment.secret, qr: qrDataUri(enrollment.uri, OG.ink, OG.white) })
}

export async function enrollTotpConfirm(ctx: FlowContext): Promise<FlowResult> {
  const denied = await changeDenied(ctx)
  if (denied) return denied
  if (await confirmTotp(text(ctx.input, 'code', 16).replace(/\s/g, ''))) return factorAdded(ctx)
  const session = ctx.session
  if (session && (await countFactorFailure(session.id)) >= MAX_SESSION_FACTOR_FAILURES) {
    await deleteSession(session.id)
    return { ...NEUTRAL(), clearSession: true }
  }
  return NEUTRAL()
}

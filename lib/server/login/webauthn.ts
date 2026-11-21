import 'server-only'
import { generateAuthenticationOptions, generateRegistrationOptions, verifyAuthenticationResponse, verifyRegistrationResponse } from '@simplewebauthn/server'
import type { AuthenticationResponseJSON, AuthenticatorTransport, RegistrationResponseJSON } from '@simplewebauthn/server'
import { requirePool } from '@/lib/server/db'
import { listPasskeys } from './factors'

// Passkeys (Face ID) with SimpleWebAuthn. RP ID fixed to quel-robot-tondeuse.com. User verification
// required (Face ID or the iPhone passcode).

const RP_ID = 'quel-robot-tondeuse.com'
const ORIGIN = `https://${RP_ID}`
const USER_ID = new TextEncoder().encode('qrt-dashboard-owner')

export async function registrationOptions() {
  const existing = await listPasskeys()
  return generateRegistrationOptions({
    rpName: 'Quel Robot Tondeuse',
    rpID: RP_ID,
    userID: USER_ID,
    userName: 'Tableau de bord',
    userDisplayName: 'Tableau de bord Quel Robot Tondeuse',
    attestationType: 'none',
    excludeCredentials: existing.map((p) => ({ id: p.credentialId, transports: p.transports as AuthenticatorTransport[] })),
    authenticatorSelection: { residentKey: 'required', userVerification: 'required' },
    preferredAuthenticatorType: 'localDevice',
  })
}

/** True if the key is verified and saved. Any unreadable answer is a refusal. */
export async function saveRegistration(response: RegistrationResponseJSON, challenge: string, label: string): Promise<boolean> {
  try {
    const result = await verifyRegistrationResponse({ response, expectedChallenge: challenge, expectedOrigin: ORIGIN, expectedRPID: RP_ID, requireUserVerification: true })
    if (!result.verified) return false
    const { credential } = result.registrationInfo
    await requirePool().query(
      'INSERT INTO dashboard.passkey (credential_id, public_key, counter, transports, label) VALUES ($1, $2, $3, $4::jsonb, $5)',
      [credential.id, Buffer.from(credential.publicKey).toString('base64url'), credential.counter, JSON.stringify(credential.transports ?? []), label],
    )
    return true
  } catch (err) {
    console.error('[dashboard-login] registration refused', err instanceof Error ? err.message : err)
    return false
  }
}

export async function authenticationOptions() {
  const keys = await listPasskeys()
  return generateAuthenticationOptions({
    rpID: RP_ID,
    userVerification: 'required',
    allowCredentials: keys.map((p) => ({ id: p.credentialId, transports: p.transports as AuthenticatorTransport[] })),
  })
}

/** Direct login: no key listed, a visitor learns nothing. The iPhone offers its own. */
export function directAuthenticationOptions() {
  return generateAuthenticationOptions({ rpID: RP_ID, userVerification: 'required', allowCredentials: [] })
}

/** Challenge announced by the browser, to match against the ones the server issued. */
export function challengeOf(response: AuthenticationResponseJSON): string | null {
  try {
    const data: unknown = JSON.parse(Buffer.from(response.response.clientDataJSON, 'base64url').toString('utf8'))
    const value = typeof data === 'object' && data !== null && 'challenge' in data ? data.challenge : null
    return typeof value === 'string' && value.length <= 128 ? value : null
  } catch {
    return null
  }
}

export async function checkAuthentication(response: AuthenticationResponseJSON, challenge: string): Promise<boolean> {
  const stored = (await listPasskeys()).find((p) => p.credentialId === response.id)
  if (!stored) return false
  try {
    const result = await verifyAuthenticationResponse({
      response,
      expectedChallenge: challenge,
      expectedOrigin: ORIGIN,
      expectedRPID: RP_ID,
      requireUserVerification: true,
      credential: {
        id: stored.credentialId,
        publicKey: new Uint8Array(Buffer.from(stored.publicKey, 'base64url')),
        counter: stored.counter,
        transports: stored.transports as AuthenticatorTransport[],
      },
    })
    if (!result.verified) return false
    await requirePool().query('UPDATE dashboard.passkey SET counter = $2, last_used_at = now() WHERE credential_id = $1', [stored.credentialId, result.authenticationInfo.newCounter])
    return true
  } catch (err) {
    console.error('[dashboard-login] passkey refused', err instanceof Error ? err.message : err)
    return false
  }
}

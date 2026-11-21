'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/browser'
import { API_PATH } from './policy'

// Browser side of the login: calls to /dashboard/connexion/api and Face ID. Neutral messages:
// nothing says whether the password, the code or the key was wrong.

export interface LoginReply {
  ok: boolean
  error?: string
  next?: string
  options?: unknown
  uri?: string
  secret?: string
  qr?: string
}

export async function callLogin(action: string, body: Record<string, unknown> = {}): Promise<LoginReply> {
  try {
    const res = await fetch(`${API_PATH}/${action}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store',
      body: JSON.stringify(body),
    })
    return (await res.json()) as LoginReply
  } catch {
    return { ok: false, error: 'unavailable' }
  }
}

const ERRORS: Record<string, string> = {
  invalid: 'Connexion impossible. Vérifie ta saisie.',
  blocked: 'Trop d’essais. Réessaie dans 15 minutes.',
  session: 'Session expirée. Reconnecte-toi.',
  reauth: 'Par sécurité, reconnecte-toi avant ce changement.',
  exists: 'Une application de codes est déjà enregistrée.',
  unavailable: 'Service indisponible. Réessaie dans une minute.',
}

export function errorText(error: string | undefined): string {
  return ERRORS[error ?? ''] ?? ERRORS.invalid ?? ''
}

export const PASSKEY_CANCELLED = 'Face ID annulé ou indisponible sur cet appareil.'

type PasskeyAction = 'cle-directe-options' | 'cle-options' | 'enrol-cle-options'

interface Prepared {
  reply: LoginReply
  browser: typeof import('@simplewebauthn/browser') | null
  at: number
}

const FRESH_MS = 4 * 60_000

async function prepare(action: PasskeyAction): Promise<Prepared> {
  try {
    const [reply, browser] = await Promise.all([callLogin(action), import('@simplewebauthn/browser')])
    return { reply, browser, at: Date.now() }
  } catch {
    return { reply: { ok: false, error: 'unavailable' }, browser: null, at: Date.now() }
  }
}

/**
 * Safari cancels Face ID if too much time passes between the tap and the call: the library and
 * the challenge are ready as soon as the screen shows. refresh() after the server used one.
 */
export function usePreparedPasskey(action: PasskeyAction, enabled = true) {
  const ready = useRef<Promise<Prepared> | null>(null)
  useEffect(() => {
    if (enabled && !ready.current) ready.current = prepare(action)
  }, [action, enabled])
  const refresh = useCallback(() => {
    ready.current = prepare(action)
  }, [action])
  const take = useCallback(async (): Promise<Prepared> => {
    const current = ready.current ? await ready.current : null
    if (current && Date.now() - current.at < FRESH_MS) return current
    const fresh = prepare(action)
    ready.current = fresh
    return fresh
  }, [action])
  return { take, refresh }
}

/** null: the system sheet was cancelled. */
export async function addPasskey(ready: Prepared): Promise<LoginReply | null> {
  if (!ready.reply.ok || !ready.browser) return ready.reply
  try {
    const response = await ready.browser.startRegistration({ optionsJSON: ready.reply.options as PublicKeyCredentialCreationOptionsJSON })
    return await callLogin('enrol-cle-verifier', { response })
  } catch {
    return null
  }
}

export async function signInWithPasskey(ready: Prepared, next: string, verify: 'cle-directe' | 'cle-verifier'): Promise<LoginReply | null> {
  if (!ready.reply.ok || !ready.browser) return ready.reply
  try {
    const response = await ready.browser.startAuthentication({ optionsJSON: ready.reply.options as PublicKeyCredentialRequestOptionsJSON })
    return await callLogin(verify, { response, next })
  } catch {
    return null
  }
}

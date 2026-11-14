/**
 * Inscription à « La lettre du jardin » (lot 2, étape G3) via l'API Brevo (contacts).
 * Compte Brevo partagé avec Toutou Gourmet, liste séparée « Quel Robot Tondeuse ».
 * La clé vient de l'environnement du serveur (BREVO_API_KEY), jamais du code ni du dépôt.
 * Le numéro de liste est fixé ici (il n'est pas secret) : copier par erreur les réglages de
 * Toutou ne peut pas inscrire un lecteur sur la liste de Toutou.
 * Aucun e-mail n'est envoyé d'ici : le contact est seulement ajouté à la liste.
 */

export const BREVO_LIST_ID_QRT = 6

const API = 'https://api.brevo.com/v3'
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i

export function isNewsletterConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY)
}

export function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length <= 254 && EMAIL.test(email)
}

export type SubscribeResult = 'ok' | 'invalid' | 'off' | 'error'

export async function subscribe(email: string, source: string): Promise<SubscribeResult> {
  if (!isValidEmail(email)) return 'invalid'
  const key = process.env.BREVO_API_KEY
  if (!key) return 'off'
  const body = {
    email,
    attributes: { SOURCE: `qrt:${source}`.slice(0, 80), OPT_IN: true },
    listIds: [BREVO_LIST_ID_QRT],
    updateEnabled: true,
  }
  try {
    const res = await fetch(`${API}/contacts`, {
      method: 'POST',
      headers: { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    if (res.ok) return 'ok'
    console.error(`[brevo] status=${res.status}`)
    return 'error'
  } catch (err) {
    console.error('[brevo] fetch failed', err instanceof Error ? err.message : err)
    return 'error'
  }
}

/**
 * POST /api/inscription — inscription à « La lettre du jardin » (lot 2, G3).
 * Corps JSON : { email, consentement: true, source, website (champ piège, doit rester vide) }.
 * 200 inscrit · 400 e-mail invalide ou consentement absent · 503 Brevo non réglé · 502 erreur Brevo.
 * Aucun cookie. L'adresse n'est ni stockée ni journalisée par le site.
 */
import { NextResponse } from 'next/server'
import { subscribe } from '@/lib/newsletter/brevo'

export const dynamic = 'force-dynamic'

const HEADERS = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' }
const SOURCE = /^[a-z0-9-]{1,60}$/

function reply(status: number, statut: string) {
  return NextResponse.json({ statut }, { status, headers: HEADERS })
}

export async function POST(request: Request) {
  let data: Record<string, unknown>
  try {
    data = (await request.json()) as Record<string, unknown>
  } catch {
    return reply(400, 'invalide')
  }
  // Champ piège rempli : un robot. On répond comme si tout allait bien, sans rien envoyer.
  if (typeof data.website === 'string' && data.website.length > 0) return reply(200, 'ok')
  if (data.consentement !== true) return reply(400, 'consentement')
  const source = typeof data.source === 'string' && SOURCE.test(data.source) ? data.source : 'site'
  const result = await subscribe(String(data.email ?? '').trim(), source)
  if (result === 'ok') return reply(200, 'ok')
  if (result === 'invalid') return reply(400, 'invalide')
  if (result === 'off') return reply(503, 'ferme')
  return reply(502, 'erreur')
}

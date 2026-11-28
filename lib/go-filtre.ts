/**
 * Filtre des liens partenaires /go/ (décision du propriétaire, 28/11/2026, modèle Toutou Gourmet).
 * Avant de renvoyer chez le marchand : préchargement → 204 ; robot déclaré, navigateur sans langue → 403 ;
 * rafale d'une même adresse (plus de 8 clics en 10 minutes, ou plus de 3 vers le même lien) → 429.
 * La personne reste chez nous, le marchand ne reçoit rien. Les refus restent dans les journaux du serveur.
 * Compteur en mémoire du serveur : il repart de zéro à chaque redémarrage, c'est voulu (aucune base).
 */
import { NextResponse } from 'next/server'

const BOT = /bot|crawl|spider|slurp|curl|wget|python|httpclient|okhttp|go-http|java\/|headless|phantom|puppeteer|playwright|selenium|preview|facebookexternalhit|scrapy|axios|node-fetch|libwww|semrush|ahrefs|mj12|petal|bytespider|gptbot|claude|perplexity|ccbot/i
const WINDOW = 10 * 60_000
const MAX_PAR_ADRESSE = 8
const MAX_PAR_LIEN = 3
const hits = new Map<string, number[]>()

export const GO_HEADERS = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' }

function refuse(status: 403 | 429): NextResponse {
  const body =
    '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="robots" content="noindex"><title>Lien partenaire</title>' +
    '<body style="font:16px system-ui;max-width:520px;margin:15vh auto;padding:0 20px"><h1 style="font-size:20px">Lien momentanément indisponible</h1>' +
    '<p>Trop de clics en peu de temps depuis cette connexion. Réessayez dans quelques minutes, ou <a href="/">revenez au site</a>.</p></body></html>'
  return new NextResponse(body, { status, headers: { ...GO_HEADERS, 'Content-Type': 'text/html; charset=utf-8' } })
}

/** Réponse de refus, ou null si le clic peut partir chez le marchand. `lien` identifie le lien cliqué. */
export function filtreClic(req: Request, lien: string, now = Date.now()): NextResponse | null {
  const h = req.headers
  if (/prefetch|prerender/i.test(h.get('sec-purpose') ?? h.get('purpose') ?? '') || h.get('next-router-prefetch')) {
    return new NextResponse(null, { status: 204, headers: GO_HEADERS })
  }
  const ua = h.get('user-agent') ?? ''
  if (!ua || BOT.test(ua) || !h.get('accept-language')) return refuse(403)
  const ip = (h.get('x-forwarded-for') ?? '').split(',')[0].trim() || h.get('x-real-ip') || 'inconnu'
  const mine = (hits.get(ip) ?? []).filter((x) => now - x < WINDOW)
  const same = (hits.get(`${ip}|${lien}`) ?? []).filter((x) => now - x < WINDOW)
  if (mine.length >= MAX_PAR_ADRESSE || same.length >= MAX_PAR_LIEN) return refuse(429)
  hits.set(ip, [...mine, now])
  hits.set(`${ip}|${lien}`, [...same, now])
  if (hits.size > 20_000) for (const [k, v] of hits) if (now - (v[v.length - 1] ?? 0) > WINDOW) hits.delete(k)
  return null
}

/** Pour les tests uniquement. */
export function _resetFiltre(): void {
  hits.clear()
}

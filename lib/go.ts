/**
 * Liens partenaires protégés (décision du propriétaire, 28/11/2026) : aucun lien affilié en clair dans les pages.
 * Chaque bouton partenaire pointe vers /go/<jeton> sur notre domaine ; la route app/go/[robot]/route.ts filtre
 * les robots et les rafales de clics (lib/go-filtre.ts) avant de renvoyer chez le marchand. Les attaques de clics
 * de concurrents font chuter l'EPC. Seuls les domaines partenaires passent : pas de redirection ouverte.
 * Fonctions pures, sans secret, utilisables aussi dans les composants client (btoa existe partout).
 * Modèle : Toutou Gourmet (~/Toutou/lib/go.ts).
 */
const PARTNERS = /^(www\.)?(awin1\.com|amazon\.fr|amzn\.to|amzn\.eu)$/i

export function isPartner(url: string): boolean {
  try {
    const u = new URL(url)
    return (u.protocol === 'https:' || u.protocol === 'http:') && PARTNERS.test(u.hostname)
  } catch {
    return false
  }
}

function b64url(s: string): string {
  let bin = ''
  for (const b of new TextEncoder().encode(s)) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function unb64url(t: string): string | null {
  try {
    const bin = atob(t.replace(/-/g, '+').replace(/_/g, '/'))
    return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
  } catch {
    return null
  }
}

/** Lien affiché dans la page : /go/<jeton> pour un partenaire, l'adresse telle quelle sinon. */
export function toGo(url: string | null | undefined): string {
  if (!url) return ''
  return isPartner(url) ? `/go/${b64url(url)}` : url
}

const TOKEN = /^[A-Za-z0-9_-]{16,2000}$/

/** Adresse du marchand derrière un jeton, ou null si le jeton est invalide ou hors des partenaires. */
export function fromGo(token: string): string | null {
  if (!TOKEN.test(token)) return null
  const url = unb64url(token)
  return url && isPartner(url) ? url : null
}

/** Adresse du marchand derrière un lien /go/<jeton> de la page (relatif ou absolu), sinon null. */
export function goTarget(href: string): string | null {
  const m = /\/go\/([A-Za-z0-9_-]{16,2000})\/?(?:[?#]|$)/.exec(href)
  return m ? fromGo(m[1]) : null
}

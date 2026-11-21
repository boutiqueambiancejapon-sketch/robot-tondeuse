/**
 * Événement côté navigateur pour le tableau de bord du propriétaire (POST /api/e). Aucun cookie, aucun
 * identifiant. Noms acceptés : lib/dashboard/events.ts (BROWSER_EVENTS). Jamais d'adresse e-mail ni de texte libre.
 */

// Après une navigation sans rechargement, document.referrer garde le site d'origine (Google…) : on
// envoie à la place la page précédente du site (notée par notePath, components/AffiliateClickBeacon).
let current: string | null = null
let previous: string | null = null

export function notePath(path: string): void {
  if (path === current) return
  if (current) previous = current
  current = path
}

/** Repères de campagne de la page (utm_source ou ?ref=, utm_medium), rien d'autre de l'adresse. */
function campaign(): Record<string, string> {
  const q = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  const source = q.get('utm_source') ?? q.get('ref')
  const medium = q.get('utm_medium')
  if (source) out.utm_source = source.slice(0, 60)
  if (medium) out.utm_medium = medium.slice(0, 30)
  return out
}

export function track(name: string, props: Record<string, string | number | boolean | undefined>): void {
  try {
    notePath(window.location.pathname)
    const referrer = previous ? window.location.origin + previous : document.referrer
    const body = JSON.stringify({ n: name, p: window.location.pathname, r: referrer, props: { ...props, ...campaign() } })
    if (!navigator.sendBeacon?.('/api/e', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/e', { method: 'POST', body, keepalive: true, cache: 'no-store', credentials: 'omit' }).catch(() => {})
    }
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

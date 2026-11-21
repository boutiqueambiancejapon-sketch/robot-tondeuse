/**
 * Événement côté navigateur pour le tableau de bord du propriétaire (POST /api/e). Aucun cookie, aucun
 * identifiant. Noms acceptés : lib/dashboard/events.ts (BROWSER_EVENTS). Jamais d'adresse e-mail ni de texte libre.
 */
export function track(name: string, props: Record<string, string | number | boolean | undefined>): void {
  const body = JSON.stringify({ n: name, p: window.location.pathname, r: document.referrer, props })
  try {
    if (!navigator.sendBeacon?.('/api/e', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/e', { method: 'POST', body, keepalive: true, cache: 'no-store', credentials: 'omit' }).catch(() => {})
    }
  } catch {
    // La mesure ne doit jamais casser la page.
  }
}

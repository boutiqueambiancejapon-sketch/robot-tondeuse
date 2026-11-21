/**
 * Client-side first-party event for the owner dashboard (POST /api/e). No cookie, no ID.
 * Allowed names are listed in app/api/e/route.ts. Never send an email address or free text.
 */
export function track(name: string, props: Record<string, string | number | boolean | undefined>): void {
  const body = JSON.stringify({ n: name, p: window.location.pathname, r: document.referrer, props })
  try {
    if (!navigator.sendBeacon?.('/api/e', new Blob([body], { type: 'application/json' }))) {
      void fetch('/api/e', { method: 'POST', body, keepalive: true, cache: 'no-store' })
    }
  } catch {
    // Measurement must never break the page.
  }
}

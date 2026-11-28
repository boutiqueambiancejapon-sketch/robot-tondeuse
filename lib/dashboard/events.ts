import { goTarget } from '@/lib/go'
// Names of the first-party events (analytics.events) and the merchants of an affiliate click.
// Browser: affiliate_click, quiz_result, web_vital (POST /api/e). Server: tool_use (/api/m/<outil>),
// newsletter_signup (/api/inscription, contact accepted by Brevo).

export const CLICK_EVENT = 'affiliate_click'
export const QUIZ_EVENT = 'quiz_result'
export const TOOL_EVENT = 'tool_use'
export const SIGNUP_EVENT = 'newsletter_signup'
export const VITAL_EVENT = 'web_vital'

/** Accepted from the browser by /api/e. The others are recorded by the server only. */
export const BROWSER_EVENTS = [CLICK_EVENT, QUIZ_EVENT, VITAL_EVENT] as const

export const MERCHANTS = ['amazon', 'cdiscount', 'fnac', 'autre'] as const
export type Merchant = (typeof MERCHANTS)[number]

export const MERCHANT_LABELS: Record<string, string> = { amazon: 'Amazon', cdiscount: 'Cdiscount (Awin)', fnac: 'Fnac (Awin)', autre: 'Autre marchand' }

export const TOOL_LABELS: Record<string, string> = {
  'quiz-termine': 'Quiz terminé',
  'surface-mesuree': 'Surface mesurée sur la carte',
  'calcul-rentabilite': 'Calcul de rentabilité',
  'calendrier-gazon': 'Calendrier du gazon',
}

const AWIN_MID: Record<string, Merchant> = { '6948': 'cdiscount', '12665': 'fnac' }

/** Merchant of an outgoing link, or null when the link is not a partner link. */
export function merchantOf(href: string, base = 'https://quel-robot-tondeuse.com'): Merchant | null {
  // Lien protégé /go/<jeton> (lib/go.ts) : la mesure lit l'adresse du marchand cachée derrière.
  const cache = goTarget(href)
  if (cache) return merchantOf(cache, base)
  let url: URL
  try {
    url = new URL(href, base)
  } catch {
    return null
  }
  const host = url.hostname.replace(/^www\./, '')
  if (/^\/go\/[^/]+\/amazon\/?$/.test(url.pathname) && host === new URL(base).hostname) return 'amazon'
  if (/(^|\.)amazon\.[a-z.]+$|^amzn\.(to|eu)$/.test(host)) return 'amazon'
  if (/(^|\.)awin1\.com$/.test(host)) return AWIN_MID[url.searchParams.get('awinmid') ?? url.searchParams.get('m') ?? ''] ?? 'autre'
  if (/(^|\.)cdiscount\.com$/.test(host)) return 'cdiscount'
  if (/(^|\.)fnac\.com$/.test(host)) return 'fnac'
  return null
}

/** Robot of a /go/<asin>/amazon link, read from the link itself. */
export function robotOfHref(href: string): string | null {
  const m = /^\/go\/([^/]+)\/amazon/.exec(href)
  return m?.[1] ?? null
}

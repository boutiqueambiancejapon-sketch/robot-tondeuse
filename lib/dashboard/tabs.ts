import type { Pose } from '@/lib/mascotte'
import { periodQuery, type PeriodKey } from './period'

// Dashboard tabs: path, label, mascot pose (one per page, components/v2/Mascotte). Each tab answers
// one question, as on 10minlanguages.com's dashboard. The chosen period follows from tab to tab (?periode=).

export const TABS = [
  { slug: '', label: 'Accueil', pose: 'jardinier' },
  { slug: 'trafic', label: 'Trafic', pose: 'loupe' },
  { slug: 'robots', label: 'Robots IA', pose: 'top' },
  { slug: 'conversions', label: 'Conversions', pose: 'fete' },
  { slug: 'crm', label: 'Contacts', pose: 'side' },
  { slug: 'emails', label: 'E-mails', pose: 'printemps' },
  { slug: 'contenu', label: 'Contenu', pose: 'lecture' },
  { slug: 'serveur', label: 'Serveur', pose: 'outils' },
] as const satisfies readonly { slug: string; label: string; pose: Pose }[]

export type TabSlug = (typeof TABS)[number]['slug'] | 'securite'

export const SECURITY_POSE: Pose = 'balance'

export const DASHBOARD_ROOT = '/dashboard'

export function tabHref(slug: TabSlug, period?: PeriodKey, sub = ''): string {
  const path = slug ? `${DASHBOARD_ROOT}/${slug}${sub}` : DASHBOARD_ROOT
  return `${path}${period ? periodQuery(period) : ''}`
}

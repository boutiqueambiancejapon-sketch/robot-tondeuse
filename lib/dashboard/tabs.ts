import { periodQuery, type PeriodKey } from './period'

// Tools of the dashboard (screens with their own period selector, framed by components/dashboard/DashboardShell).
// The steering tabs, the menu and each screen's mascot pose live in lib/seo-dash/nav.ts (SEO dashboard, 2026-11-21).

export const TABS = [
  { slug: 'conversions', label: 'Conversions' },
  { slug: 'crm', label: 'Contacts' },
  { slug: 'emails', label: 'E-mails' },
  { slug: 'serveur', label: 'Serveur' },
] as const

export type TabSlug = (typeof TABS)[number]['slug'] | 'securite'

export const DASHBOARD_ROOT = '/dashboard'

export function tabHref(slug: TabSlug, period?: PeriodKey, sub = ''): string {
  const path = slug ? `${DASHBOARD_ROOT}/${slug}${sub}` : DASHBOARD_ROOT
  return `${path}${period ? periodQuery(period) : ''}`
}

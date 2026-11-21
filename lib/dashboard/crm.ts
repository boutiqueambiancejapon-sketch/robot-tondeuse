import type { Contact } from '@/lib/server/dashboard/crm'

// CRM maths, no database and no display: filters, search, summary. The owner's own and test
// addresses (@quel-robot-tondeuse.com, @toutou-gourmet.com) are left out.

export const FILTERS = [
  { key: 'tous', label: 'Tous' },
  { key: 'liste', label: 'Abonnés' },
  { key: 'desinscrits', label: 'Désinscrits' },
] as const

export type ContactFilter = (typeof FILTERS)[number]['key']

export function parseFilter(v: string | string[] | undefined): ContactFilter {
  const raw = Array.isArray(v) ? v[0] : v
  return FILTERS.find((f) => f.key === raw)?.key ?? 'tous'
}

export const isOwn = (c: Contact): boolean => /@(quel-robot-tondeuse|toutou-gourmet)\.com$/i.test(c.email)
const onList = (c: Contact) => !c.list.unsubscribed

export function filterContacts(rows: Contact[], filter: ContactFilter, query: string): Contact[] {
  const q = query.trim().toLowerCase()
  return rows.filter((c) => {
    if (q && !c.email.includes(q)) return false
    if (filter === 'liste') return onList(c)
    if (filter === 'desinscrits') return c.list.unsubscribed
    return true
  })
}

export function statusOf(c: Contact): { label: string; tone: 'ok' | 'bad' | '' } {
  return c.list.unsubscribed ? { label: 'Désinscrit', tone: 'bad' } : { label: 'Abonné', tone: 'ok' }
}

export interface CrmSummary {
  total: number
  added: number
  subscribed: number
  watch: { label: string; value: number }[]
  sources: { label: string; value: number }[]
}

const DAY = 86_400_000

export function summarize(rows: Contact[], days: number, now = Date.now()): CrmSummary {
  const since = new Date(now - days * DAY)
  const sources = new Map<string, number>()
  for (const c of rows) {
    const key = c.list.source ?? 'inconnue'
    sources.set(key, (sources.get(key) ?? 0) + 1)
  }
  return {
    total: rows.length,
    added: rows.filter((c) => c.since >= since).length,
    subscribed: rows.filter(onList).length,
    watch: [
      { label: 'Désinscrits de la lettre', value: rows.filter((c) => c.list.unsubscribed).length },
      { label: 'Inscrits ces 30 jours', value: rows.filter((c) => c.since.getTime() >= now - 30 * DAY).length },
      { label: 'Aussi sur une autre liste Brevo', value: rows.filter((c) => c.list.otherLists > 0).length },
    ],
    sources: [...sources.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
  }
}

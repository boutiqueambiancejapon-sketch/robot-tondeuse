import type { Contact } from '@/lib/server/dashboard/crm'

// CRM maths, no database and no display: filters, search, summary. The owner's own and test
// addresses (@10minlanguages.com) are left out.

export const FILTERS = [
  { key: 'tous', label: 'Tous' },
  { key: 'liste', label: 'Sur la liste' },
  { key: 'comptes', label: 'Avec un compte' },
  { key: 'desinscrits', label: 'Désinscrits' },
] as const

export type ContactFilter = (typeof FILTERS)[number]['key']

export function parseFilter(v: string | string[] | undefined): ContactFilter {
  const raw = Array.isArray(v) ? v[0] : v
  return FILTERS.find((f) => f.key === raw)?.key ?? 'tous'
}

export const isOwn = (c: Contact): boolean => /@10minlanguages\.com$/i.test(c.email)
const onList = (c: Contact) => c.list !== null && !c.list.unsubscribed

export function filterContacts(rows: Contact[], filter: ContactFilter, query: string): Contact[] {
  const q = query.trim().toLowerCase()
  return rows.filter((c) => {
    if (q && !c.email.includes(q)) return false
    if (filter === 'liste') return onList(c)
    if (filter === 'comptes') return c.account !== null
    if (filter === 'desinscrits') return c.list?.unsubscribed === true
    return true
  })
}

export function statusOf(c: Contact): { label: string; tone: 'ok' | 'bad' | '' } {
  if (c.list?.unsubscribed) return { label: 'Désinscrit', tone: 'bad' }
  if (onList(c) && c.account) return { label: 'Liste + compte', tone: 'ok' }
  if (c.account) return { label: 'Compte', tone: 'ok' }
  return { label: 'Liste', tone: '' }
}

export interface CrmSummary {
  total: number
  added: number
  funnel: { label: string; value: number }[]
  watch: { label: string; value: number }[]
  sources: { label: string; value: number }[]
}

const DAY = 86_400_000

export function summarize(rows: Contact[], days: number, now = Date.now()): CrmSummary {
  const since = new Date(now - days * DAY)
  const active = (c: Contact) => c.account !== null && now - c.account.lastLoginAt.getTime() <= 30 * DAY && c.account.lastLoginAt.getTime() - c.account.createdAt.getTime() >= DAY
  const sources = new Map<string, number>()
  for (const c of rows) {
    const key = c.list?.source ?? (c.account ? 'compte (sans liste)' : 'inconnue')
    sources.set(key, (sources.get(key) ?? 0) + 1)
  }
  return {
    total: rows.length,
    added: rows.filter((c) => c.since >= since).length,
    funnel: [
      { label: 'Contacts', value: rows.length },
      { label: 'Sur la liste (abonnés)', value: rows.filter(onList).length },
      { label: 'Avec un compte', value: rows.filter((c) => c.account).length },
      { label: 'Exercice du jour commencé', value: rows.filter((c) => (c.account?.daily.length ?? 0) > 0).length },
      { label: 'Revenus ces 30 jours', value: rows.filter(active).length },
    ],
    watch: [
      { label: 'Désinscrits de la liste', value: rows.filter((c) => c.list?.unsubscribed).length },
      { label: 'Comptes pas sur la liste', value: rows.filter((c) => c.account && !c.list).length },
      { label: 'Comptes sans profil rempli', value: rows.filter((c) => c.account && !c.account.lang).length },
      { label: 'Mots dans les carnets', value: rows.reduce((s, c) => s + (c.account?.notebook ?? 0), 0) },
    ],
    sources: [...sources.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
  }
}

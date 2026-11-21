import 'server-only'
import { createHmac, hkdfSync } from 'node:crypto'
import type { Pool } from 'pg'
import { BREVO_LIST_ID } from '@/lib/server/newsletter/brevo'

// Contacts (CRM): readers on Brevo list 7 and learner accounts, merged by address, newest first.
// Read at display time, nothing copied into our database. URLs carry a keyed hash of the address,
// never the address itself. Adapted from Toutou's CRM.

export interface Contact {
  hash: string
  email: string
  /** On list 7: date added, unsubscribed (blacklisted) or not, source attribute. */
  list: { at: Date | null; unsubscribed: boolean; source: string | null } | null
  account: { id: number; createdAt: Date; lastLoginAt: Date; lang: string | null; level: string | null; goal: string | null; minutes: number | null; budget: string | null; notebook: number; daily: string[] } | null
  since: Date
}

export interface Contacts {
  ok: boolean
  /** Brevo answered (false: the list is missing from the result). */
  listRead: boolean
  rows: Contact[]
}

function hashKey(): Buffer {
  const secret = process.env.DASHBOARD_AUTH_SECRET ?? ''
  return Buffer.from(hkdfSync('sha256', secret, 'qrt-dashboard', 'contact', 32))
}

export const contactHash = (email: string): string => createHmac('sha256', hashKey()).update(email.trim().toLowerCase()).digest('hex').slice(0, 24)

interface BrevoContact { email?: string; createdAt?: string; emailBlacklisted?: boolean; listUnsubscribed?: number[]; attributes?: Record<string, unknown> }

async function listContacts(): Promise<BrevoContact[] | null> {
  const key = process.env.BREVO_API_KEY
  if (!key) return null
  const out: BrevoContact[] = []
  try {
    for (let offset = 0; offset < 5000; offset += 500) {
      const res = await fetch(`https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}/contacts?limit=500&offset=${offset}&sort=desc`, { headers: { 'api-key': key, accept: 'application/json' }, cache: 'no-store' })
      if (!res.ok) return null
      const page = ((await res.json()) as { contacts?: BrevoContact[] }).contacts ?? []
      out.push(...page)
      if (page.length < 500) break
    }
    return out
  } catch {
    return null
  }
}

interface AccountRow { id: number; email: string; created_at: Date; last_login_at: Date; lang: string | null; level: string | null; goal: string | null; minutes: number | null; tutor_budget: string | null; notebook: number; daily: string[] }

export async function loadContacts(pool: Pool | null): Promise<Contacts> {
  const [brevo, accounts] = await Promise.all([
    listContacts(),
    pool
      ? pool
          .query<AccountRow>(
            `SELECT u.id::int, u.email, u.created_at, u.last_login_at, u.lang, u.level, u.goal, u.minutes, u.tutor_budget,
                    (SELECT count(*)::int FROM account.notebook n WHERE n.user_id = u.id) AS notebook,
                    coalesce((SELECT array_agg(d.lang ORDER BY d.lang) FROM account.daily_state d WHERE d.user_id = u.id), '{}') AS daily
               FROM account.users u`,
          )
          .then((r) => r.rows)
          .catch(() => null)
      : Promise.resolve(null),
  ])
  const byEmail = new Map<string, Contact>()
  for (const c of brevo ?? []) {
    if (!c.email) continue
    const email = c.email.toLowerCase()
    const at = c.createdAt ? new Date(c.createdAt) : null
    const source = typeof c.attributes?.SOURCE === 'string' ? c.attributes.SOURCE.replace(/^10min:/, '') : null
    byEmail.set(email, { hash: contactHash(email), email, list: { at, unsubscribed: Boolean(c.emailBlacklisted || c.listUnsubscribed?.includes(BREVO_LIST_ID)), source }, account: null, since: at ?? new Date(0) })
  }
  for (const a of accounts ?? []) {
    const email = a.email.toLowerCase()
    const prev = byEmail.get(email)
    const account = { id: a.id, createdAt: a.created_at, lastLoginAt: a.last_login_at, lang: a.lang, level: a.level, goal: a.goal, minutes: a.minutes, budget: a.tutor_budget, notebook: a.notebook, daily: a.daily }
    byEmail.set(email, { hash: contactHash(email), email, list: prev?.list ?? null, account, since: prev && prev.since < a.created_at ? prev.since : a.created_at })
  }
  const rows = [...byEmail.values()].sort((x, y) => y.since.getTime() - x.since.getTime())
  return { ok: accounts !== null && brevo !== null, listRead: brevo !== null, rows }
}

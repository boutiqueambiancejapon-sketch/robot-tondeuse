import 'server-only'
import { createHmac, hkdfSync } from 'node:crypto'
import { BREVO_LIST_ID_QRT } from '@/lib/newsletter/brevo'

// Contacts (CRM): readers of « La lettre du jardin » (Brevo list 6, shared Brevo account with Toutou
// Gourmet, separate list), newest first. Read at display time, nothing copied into our database.
// URLs carry a keyed hash of the address, never the address itself. Ported from 10minlanguages.com.

export interface Contact {
  hash: string
  email: string
  /** Date added to Brevo, unsubscribed (blacklisted or off list 6) or not, form it came from. */
  list: { at: Date | null; modified: Date | null; unsubscribed: boolean; source: string | null; otherLists: number }
  since: Date
}

export interface Contacts {
  ok: boolean
  rows: Contact[]
}

function hashKey(): Buffer {
  const secret = process.env.DASHBOARD_AUTH_SECRET ?? ''
  return Buffer.from(hkdfSync('sha256', secret, 'qrt-dashboard', 'contact', 32))
}

export const contactHash = (email: string): string => createHmac('sha256', hashKey()).update(email.trim().toLowerCase()).digest('hex').slice(0, 24)

interface BrevoContact { email?: string; createdAt?: string; modifiedAt?: string; emailBlacklisted?: boolean; listIds?: number[]; listUnsubscribed?: number[]; attributes?: Record<string, unknown> }

async function listContacts(): Promise<BrevoContact[] | null> {
  const key = process.env.BREVO_API_KEY
  if (!key) return null
  const out: BrevoContact[] = []
  try {
    for (let offset = 0; offset < 5000; offset += 500) {
      const res = await fetch(`https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID_QRT}/contacts?limit=500&offset=${offset}&sort=desc`, { headers: { 'api-key': key, accept: 'application/json' }, cache: 'no-store' })
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

export async function loadContacts(): Promise<Contacts> {
  const brevo = await listContacts()
  const rows: Contact[] = []
  for (const c of brevo ?? []) {
    if (!c.email) continue
    const email = c.email.toLowerCase()
    const at = c.createdAt ? new Date(c.createdAt) : null
    // SOURCE is one attribute per contact on the shared Brevo account: another site can overwrite it.
    const raw = typeof c.attributes?.SOURCE === 'string' ? c.attributes.SOURCE : null
    const source = raw === null ? null : raw.startsWith('qrt:') ? raw.slice(4) : 'autre site du compte Brevo'
    const unsubscribed = Boolean(c.emailBlacklisted || c.listUnsubscribed?.includes(BREVO_LIST_ID_QRT))
    const otherLists = (c.listIds ?? []).filter((id) => id !== BREVO_LIST_ID_QRT).length
    rows.push({ hash: contactHash(email), email, list: { at, modified: c.modifiedAt ? new Date(c.modifiedAt) : null, unsubscribed, source, otherLists }, since: at ?? new Date(0) })
  }
  rows.sort((x, y) => y.since.getTime() - x.since.getTime())
  return { ok: brevo !== null, rows }
}

import Link from 'next/link'
import { statusOf } from '@/lib/dashboard/crm'
import { shortDay } from '@/lib/dashboard/format'
import type { Contact } from '@/lib/server/dashboard/crm'
import { Empty } from '../Card'

// One line per contact: address, status, where they came from, when. A tap opens the contact.

export function ContactList({ rows, query }: { rows: Contact[]; query: string }) {
  if (rows.length === 0) return <Empty>{query ? `Aucun contact ne contient « ${query} ».` : 'Aucun contact pour ce filtre.'}</Empty>
  return (
    <ul className="rows">
      {rows.map((c) => {
        const s = statusOf(c)
        return (
          <li key={c.hash}>
            <Link href={`/dashboard/crm/contacts/${c.hash}`} className="row-link">
              <span className="row-top">
                <span>{c.email}</span>
                <span className={`tag${s.tone ? ` tag--${s.tone}` : ''}`}>{s.label}</span>
              </span>
              <span className="row-sub">
                {[c.list?.source ? `venu par ${c.list.source}` : null, c.account?.lang ? `apprend : ${c.account.lang}` : null, `connu depuis le ${shortDay(c.since)}`].filter(Boolean).join(' · ')}
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

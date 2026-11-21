import Link from 'next/link'
import { filterContacts, isOwn, parseFilter } from '@/lib/dashboard/crm'
import { parsePage, readSearch } from '@/lib/dashboard/crm-search'
import { openTab, type TabPageProps } from '@/lib/dashboard/tab-page'
import { getPool } from '@/lib/server/db'
import { loadContacts } from '@/lib/server/dashboard/crm'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ContactList } from '@/components/dashboard/crm/ContactList'
import { ContactToolbar, filterHref } from '@/components/dashboard/crm/ContactToolbar'
import { CrmNav } from '@/components/dashboard/crm/CrmNav'
import { clearContactSearch, searchContacts } from './actions'

// Every contact: list and accounts in one list, newest first, 50 per page.

export const dynamic = 'force-dynamic'

const SIZE = 50

type Props = TabPageProps & { searchParams: Promise<{ periode?: string | string[]; filtre?: string | string[]; page?: string | string[] }> }

export default async function ContactsPage(props: Props) {
  await openTab(props)
  const sp = await props.searchParams
  const filter = parseFilter(sp.filtre)
  const page = parsePage(sp.page)
  const query = await readSearch()
  const res = await loadContacts(getPool())
  const all = res.rows.filter((c) => !isOwn(c))
  const hits = filterContacts(all, filter, query)
  const notice = res.ok ? null : 'La liste Brevo ou les comptes ne sont pas lisibles en entier pour le moment : des contacts peuvent manquer.'
  return (
    <DashboardShell current="crm" sub="/contacts" title="Tous les contacts" intro="Les plus récents d’abord. Les adresses @10minlanguages.com (les tiennes et les tests) sont retirées." notice={notice}>
      <CrmNav current="/contacts" />
      <ContactToolbar filter={filter} query={query} search={searchContacts} clear={clearContactSearch} />
      <p className="tiny muted">
        {hits.length} {hits.length > 1 ? 'contacts' : 'contact'} sur {all.length}.
      </p>
      <section className="card" aria-label="Contacts">
        <ContactList rows={hits.slice((page - 1) * SIZE, page * SIZE)} query={query} />
      </section>
      {hits.length > SIZE && (
        <nav aria-label="Pages de contacts" className="pager">
          {page > 1 ? <Link href={filterHref(filter, page - 1)} className="pill-btn">Précédents</Link> : <span />}
          {page * SIZE < hits.length && <Link href={filterHref(filter, page + 1)} className="pill-btn">Suivants</Link>}
        </nav>
      )}
    </DashboardShell>
  )
}

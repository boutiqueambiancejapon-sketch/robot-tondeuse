import Link from 'next/link'
import { FILTERS, type ContactFilter } from '@/lib/dashboard/crm'

// Search (server action, the address never goes in the URL) and filter chips.

interface Props {
  filter: ContactFilter
  query: string
  search: (form: FormData) => Promise<void>
  clear: () => Promise<void>
}

export const filterHref = (filter: ContactFilter, page = 1): string => {
  const params = new URLSearchParams()
  if (filter !== 'tous') params.set('filtre', filter)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/dashboard/crm/contacts${qs ? `?${qs}` : ''}`
}

export function ContactToolbar({ filter, query, search, clear }: Props) {
  return (
    <div className="stack">
      <form action={search} role="search" className="search">
        <label className="contents">
          <span className="sr-only">Adresse e-mail ou morceau d’adresse</span>
          <input name="q" type="search" defaultValue={query} placeholder="Adresse ou morceau d’adresse" className="input" autoComplete="off" />
        </label>
        <button type="submit" className="btn btn--ink btn--s">Chercher</button>
      </form>
      {query && (
        <form action={clear}>
          <button type="submit" className="pill-btn">Effacer « {query} »</button>
        </form>
      )}
      <nav aria-label="Filtrer les contacts" className="chips">
        <ul>
          {FILTERS.map((f) => (
            <li key={f.key}>
              <Link href={filterHref(f.key)} className="chip" aria-current={f.key === filter ? 'true' : undefined}>
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

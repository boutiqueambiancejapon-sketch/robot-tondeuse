import { n, pct } from '@/lib/dashboard/format'
import type { EntryRow, PageCounts, TypeRow } from '@/lib/dashboard/traffic'
import { Empty } from '../Card'

// Three rankings of the "Pages et parcours" view. Titles of posts replace their path when known.

const SHOWN = 15
const name = (path: string, titles: Map<string, string>) => titles.get(path) ?? path

function Rows({ items }: { items: { key: string; main: string; value: string; sub: string; title?: string }[] }) {
  return (
    <ul className="rows">
      {items.map((i) => (
        <li key={i.key} title={i.title}>
          <span className="row-top">
            <span>{i.main}</span>
            <span>{i.value}</span>
          </span>
          <span className="row-sub">{i.sub}</span>
        </li>
      ))}
    </ul>
  )
}

export function TopPages({ rows, titles }: { rows: PageCounts[]; titles: Map<string, string> }) {
  const list = rows.filter((r) => r.views > 0).slice(0, SHOWN)
  if (list.length === 0) return <Empty>Aucune page vue sur la période.</Empty>
  return (
    <Rows
      items={list.map((r) => ({
        key: r.page,
        title: r.page,
        main: name(r.page, titles),
        value: n(r.views),
        sub: [`${n(r.visitors)} visiteurs`, r.clicks ? `${n(r.clicks)} clics Preply (${pct(r.clicks, r.views)})` : null, r.leads ? `${n(r.leads)} e-mails ou comptes` : null].filter(Boolean).join(' · '),
      }))}
    />
  )
}

export function EntryPages({ rows, titles }: { rows: EntryRow[]; titles: Map<string, string> }) {
  if (rows.length === 0) return <Empty>Aucune session sur la période.</Empty>
  return <Rows items={rows.slice(0, SHOWN).map((r) => ({ key: r.page, title: r.page, main: name(r.page, titles), value: `${n(r.sessions)} sessions`, sub: `rebond ${pct(r.bounce, 1)}` }))} />
}

export function PageTypes({ rows }: { rows: TypeRow[] }) {
  if (rows.length === 0) return <Empty>Aucune page vue sur la période.</Empty>
  return <Rows items={rows.map((r) => ({ key: r.type, main: r.label, value: n(r.views), sub: `${n(r.clicks)} clics Preply · ${n(r.leads)} e-mails ou comptes` }))} />
}

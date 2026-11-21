import { n, pct } from '@/lib/dashboard/format'
import type { PageClicks } from '@/lib/server/dashboard/conversions'
import { Empty } from '../Card'

export function ClicksByPage({ rows, titles }: { rows: PageClicks[]; titles: Map<string, string> }) {
  if (rows.length === 0) return <Empty>Aucun clic sur cette période.</Empty>
  return (
    <ul className="rows">
      {rows.map((r) => (
        <li key={r.page} title={r.page}>
          <span className="row-top">
            <span>{titles.get(r.page) ?? r.page}</span>
            <span>{n(r.clicks)}</span>
          </span>
          <span className="row-sub">
            {n(r.views)} vues · taux {pct(r.clicks, r.views)}
          </span>
        </li>
      ))}
    </ul>
  )
}

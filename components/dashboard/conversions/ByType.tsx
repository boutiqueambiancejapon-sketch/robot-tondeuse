import { n, pct } from '@/lib/dashboard/format'
import type { TypeRow } from '@/lib/dashboard/traffic'
import { Empty } from '../Card'

// Conversions per page type: one line per type, readable on an iPhone, clicks on the right and
// the detail underneath. Adapted from Toutou's "Par type de page".

export function ByType({ rows }: { rows: TypeRow[] }) {
  if (rows.length === 0) return <Empty>Aucune page vue ni aucune conversion sur la période.</Empty>
  return (
    <ul className="rows">
      {rows.map((r) => (
        <li key={r.type}>
          <span className="row-top">
            <span>{r.label}</span>
            <span>{r.clicks > 0 ? `${n(r.clicks)} clic${r.clicks > 1 ? 's' : ''}` : 'Aucun clic'}</span>
          </span>
          <span className="row-sub">
            {[`${n(r.views)} vues`, r.clicks ? `taux ${pct(r.clicks, r.views)}` : null, r.leads ? `${n(r.leads)} inscriptions à la lettre` : null].filter(Boolean).join(' · ')}
          </span>
        </li>
      ))}
    </ul>
  )
}

import type { Row } from '@/lib/server/dashboard/safe'
import { n, pct } from '@/lib/dashboard/format'
import { Empty } from './Card'

interface Props {
  rows: Row[]
  /** Unit of the optional second figure (e.g. "visiteurs"). */
  extraLabel?: string
  /** Shows each row's share of this total. */
  total?: number
  format?: (label: string) => string
  empty?: string
}

/** Label, value and a thin proportional bar. The list itself is the data table (no colour coding). */
export function BarList({ rows, extraLabel, total, format, empty = 'Rien sur cette période.' }: Props) {
  if (rows.length === 0) return <Empty>{empty}</Empty>
  const max = Math.max(...rows.map((r) => r.value), 1)
  return (
    <ul className="bars">
      {rows.map((r) => {
        const label = format ? format(r.label) : r.label
        return (
          <li key={r.label} className="bar-row">
            <span className="bar-label" title={label}>
              {label}
            </span>
            <span className="bar-value">
              {n(r.value)}
              {total !== undefined && <small> · {pct(r.value, total)}</small>}
              {extraLabel && r.extra !== undefined && <small> · {n(r.extra)} {extraLabel}</small>}
            </span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ width: `${Math.max((r.value / max) * 100, 2)}%` }} />
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/** First five rows, the rest one tap away: stays readable on a phone. */
export function TopList({ rows, empty, format }: { rows: Row[]; empty: string; format?: (label: string) => string }) {
  return (
    <>
      <BarList rows={rows.slice(0, 5)} empty={empty} format={format} />
      {rows.length > 5 && (
        <details className="more">
          <summary>Voir les {Math.min(rows.length, 30) - 5} suivants</summary>
          <BarList rows={rows.slice(5, 30)} empty="" format={format} />
        </details>
      )}
    </>
  )
}

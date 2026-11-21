import { bucketLabel } from '@/lib/dashboard/buckets'
import { n, pct } from '@/lib/dashboard/format'
import { ROBOT_KINDS } from '@/lib/dashboard/robots'
import { Empty } from '../Card'

// Charts of the AI robots tab, rendered on the server. One series and one tint for the hour and
// the sparklines; details on hover and in text for screen readers.

/** Share of each visit type: segmented bar, legend and figures in words below. */
export function KindShare({ rows }: { rows: { key: string; value: number; fill: string }[] }) {
  const total = rows.reduce((sum, r) => sum + r.value, 0)
  if (total === 0) return <Empty>Aucune visite de robot IA sur la période.</Empty>
  return (
    <figure className="chart">
      <div className="segbar" aria-hidden="true">
        {rows.filter((r) => r.value > 0).map((r) => (
          <span key={r.key} className={r.fill} style={{ width: `${(r.value / total) * 100}%` }} />
        ))}
      </div>
      <ul className="rows">
        {ROBOT_KINDS.map((k) => {
          const row = rows.find((r) => r.key === k.key)
          return (
            <li key={k.key}>
              <span className="row-top">
                <span>
                  <span className={`sw ${row?.fill ?? ''}`} aria-hidden="true" /> {k.label}
                </span>
                <span>
                  {n(row?.value ?? 0)} <small className="muted">{pct(row?.value ?? 0, total)}</small>
                </span>
              </span>
              <span className="row-sub">{k.hint}</span>
            </li>
          )
        })}
      </ul>
    </figure>
  )
}

/** Visits by hour of day, Brussels time. */
export function HourBars({ hours }: { hours: number[] }) {
  const max = Math.max(...hours, 0)
  if (max === 0) return <Empty>Aucune visite de robot IA sur la période.</Empty>
  const peak = hours.indexOf(max)
  return (
    <figure className="chart">
      <div className="cols cols--s" aria-hidden="true">
        {hours.map((v, h) => (
          <span key={h} className={`col${v === 0 ? ' col--zero' : ''}`} title={`${h} h : ${n(v)}`}>
            <span style={{ height: `${Math.max((v / max) * 100, 3)}%` }} />
          </span>
        ))}
      </div>
      <div className="axis" aria-hidden="true">
        <span>0 h</span>
        <span>6 h</span>
        <span>12 h</span>
        <span>18 h</span>
        <span>23 h</span>
      </div>
      <figcaption className="small muted">
        Pic à {peak} h, avec {n(max)} visites.
        <span className="sr-only"> Détail : {hours.map((v, h) => `${h} h ${v}`).join(', ')}.</span>
      </figcaption>
    </figure>
  )
}

export function Spark({ values, buckets, hourly }: { values: number[]; buckets: string[]; hourly: boolean }) {
  const max = Math.max(...values, 1)
  return (
    <span className="cols cols--xs" aria-hidden="true">
      {values.map((v, i) => (
        <span key={buckets[i] ?? i} className={`col${v === 0 ? ' col--zero' : ''}`} title={`${buckets[i] ? bucketLabel(buckets[i], hourly) : ''} : ${n(v)}`}>
          <span style={{ height: `${Math.max((v / max) * 100, 6)}%` }} />
        </span>
      ))}
    </span>
  )
}

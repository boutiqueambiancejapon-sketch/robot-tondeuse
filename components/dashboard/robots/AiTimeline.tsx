import { bucketLabel } from '@/lib/dashboard/buckets'
import { n } from '@/lib/dashboard/format'
import type { BucketRow } from '@/lib/server/dashboard/robots'
import { Empty } from '../Card'

// Stacked columns per AI visit type, rendered on the server. Validated palette (dataviz
// validate_palette.js, light): red, blue, green, always in this order. Legend + data table:
// identity never rests on colour alone.

export const AI_SERIES = [
  { key: 'training', label: 'Entraînement', fill: 'f1' },
  { key: 'search', label: 'Moteur IA', fill: 'f2' },
  { key: 'user', label: 'Lecture en direct', fill: 'f3' },
] as const

export function AiTimeline({ rows, hourly }: { rows: BucketRow[]; hourly: boolean }) {
  const totals = rows.map((r) => r.training + r.search + r.user)
  const max = Math.max(...totals, 0)
  if (max === 0) return <Empty>Aucune visite de robot IA sur la période.</Empty>
  return (
    <figure className="chart">
      <ul className="legend" aria-label="Légende">
        {AI_SERIES.map((s) => (
          <li key={s.key}>
            <span className={`sw ${s.fill}`} aria-hidden="true" />
            {s.label}
          </li>
        ))}
      </ul>
      <div className="cols" aria-hidden="true">
        {rows.map((r, i) => (
          <span key={r.bucket} className={`col${totals[i] === 0 ? ' col--zero' : ''}`} title={`${bucketLabel(r.bucket, hourly)} : ${n(totals[i] ?? 0)} (entraînement ${r.training}, moteur ${r.search}, direct ${r.user})`}>
            {totals[i] === 0 ? <span style={{ height: '3%' }} /> : AI_SERIES.map((s) => (r[s.key] > 0 ? <span key={s.key} className={s.fill} style={{ height: `${(r[s.key] / max) * 100}%` }} /> : null))}
          </span>
        ))}
      </div>
      <figcaption className="axis">
        <span>{bucketLabel(rows[0]?.bucket ?? '', hourly)}</span>
        <span>max {n(max)}</span>
        <span>{bucketLabel(rows[rows.length - 1]?.bucket ?? '', hourly)}</span>
      </figcaption>
      <details className="more">
        <summary>Voir les chiffres</summary>
        <table className="tbl">
          <thead>
            <tr>
              <th>{hourly ? 'Heure' : 'Jour'}</th>
              {AI_SERIES.map((s) => (
                <th key={s.key} className="n">{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.bucket}>
                <td>{bucketLabel(r.bucket, hourly)}</td>
                {AI_SERIES.map((s) => (
                  <td key={s.key} className="n">{n(r[s.key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}

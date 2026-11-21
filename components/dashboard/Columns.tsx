import { bucketLabel } from '@/lib/dashboard/buckets'
import { n } from '@/lib/dashboard/format'
import { Empty } from './Card'

// One-series column chart, rendered on the server: value on hover (title) and in a text summary
// for screen readers, "Voir les chiffres" table underneath. The last bucket (in progress) is red.

interface Props {
  buckets: { bucket: string; n: number }[]
  hourly: boolean
  /** "Visiteurs par jour": names the series (no legend for one series). */
  label: string
  size?: 's' | 'xs'
  table?: boolean
  empty?: string
}

export function Columns({ buckets, hourly, label, size, table = false, empty }: Props) {
  if (buckets.length === 0) return null
  const max = Math.max(1, ...buckets.map((b) => b.n))
  const total = buckets.reduce((s, b) => s + b.n, 0)
  if (total === 0 && empty) return <Empty>{empty}</Empty>
  const first = buckets[0]?.bucket ?? ''
  const last = buckets[buckets.length - 1]?.bucket ?? ''
  return (
    <figure className="chart">
      <div className={`cols${size ? ` cols--${size}` : ''}`} aria-hidden="true">
        {buckets.map((b, i) => (
          <span key={b.bucket} className={`col${b.n === 0 ? ' col--zero' : i === buckets.length - 1 ? ' col--now' : ''}`} title={`${bucketLabel(b.bucket, hourly)} : ${n(b.n)}`}>
            <span style={{ height: `${Math.max((b.n / max) * 100, 3)}%` }} />
          </span>
        ))}
      </div>
      <figcaption className="axis">
        <span aria-hidden="true">{bucketLabel(first, hourly)}</span>
        {size !== 'xs' && <span aria-hidden="true">max {n(max)}</span>}
        <span aria-hidden="true">{bucketLabel(last, hourly)}</span>
        <span className="sr-only">{`${label} : ${buckets.map((b) => `${bucketLabel(b.bucket, hourly)} ${b.n}`).join(', ')}.`}</span>
      </figcaption>
      {table && (
        <details className="more">
          <summary>Voir les chiffres</summary>
          <table className="tbl">
            <tbody>
              {buckets.map((b) => (
                <tr key={b.bucket}>
                  <td>{bucketLabel(b.bucket, hourly)}</td>
                  <td className="n">{n(b.n)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      )}
    </figure>
  )
}

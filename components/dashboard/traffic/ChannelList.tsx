import { n, pct } from '@/lib/dashboard/format'
import type { ChannelRow } from '@/lib/dashboard/traffic'
import { Empty } from '../Card'

/** Sessions per channel, with the share that clicked through to a merchant. */
export function ChannelList({ rows }: { rows: ChannelRow[] }) {
  if (rows.length === 0) return <Empty>Aucune session sur la période.</Empty>
  const max = Math.max(1, ...rows.map((r) => r.sessions))
  return (
    <ul className="bars">
      {rows.map((r) => (
        <li key={r.channel} className="bar-row">
          <span className="bar-label">{r.label}</span>
          <span className="bar-value">
            {n(r.sessions)} <small>· {pct(r.clickRate, 1)} clics</small>
          </span>
          <span className="bar-track" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${Math.max((r.sessions / max) * 100, 2)}%` }} />
          </span>
        </li>
      ))}
    </ul>
  )
}

import Link from 'next/link'
import { n } from '@/lib/dashboard/format'
import { periodQuery, TZ, type PeriodKey } from '@/lib/dashboard/period'
import { ROBOT_KINDS, robotHref, type CoverageRow, type RobotFilter } from '@/lib/dashboard/robots'
import type { RobotLine } from '@/lib/server/dashboard/robots'
import { Empty } from '../Card'
import { Spark } from './RobotCharts'

// One line per operator: volume, trend, robots behind it, last visit. A tap filters the whole tab.

const dateFmt = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: TZ })
const kindShort = (key: string): string => ROBOT_KINDS.find((k) => k.key === key)?.short ?? key

interface Props {
  robots: RobotLine[]
  buckets: string[]
  hourly: boolean
  period: PeriodKey
  filter: RobotFilter
}

export function RobotList({ robots, buckets, hourly, period, filter }: Props) {
  if (robots.length === 0) return <Empty>Aucun robot IA pour ce filtre.</Empty>
  return (
    <ol className="rows">
      {robots.map((r) => (
        <li key={r.operator}>
          <Link href={robotHref('/dashboard/robots', periodQuery(period), { ...filter, robot: r.operator })} scroll={false} className="row-link">
            <span className="row-top">
              <strong>{r.operator}</strong>
              <span>{n(r.visits)}</span>
            </span>
            <Spark values={r.spark} buckets={buckets} hourly={hourly} />
            <span className="row-sub">{[...r.bots].sort((a, b) => b.visits - a.visits).map((b) => `${b.bot} (${kindShort(b.kind)}) ${n(b.visits)}`).join(' · ')}</span>
            <span className="row-sub">Dernière visite : {dateFmt.format(r.lastSeen)}</span>
          </Link>
        </li>
      ))}
    </ol>
  )
}

export function CoverageList({ rows }: { rows: CoverageRow[] }) {
  if (rows.length === 0) return <Empty>Aucune page à classer.</Empty>
  return (
    <ul className="bars">
      {rows.map((r) => (
        <li key={r.label} className="bar-row">
          <span className="bar-label">{r.label}</span>
          <span className="bar-value">
            {n(r.read)} / {n(r.total)}
          </span>
          <span className="bar-track" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${Math.max((r.read / r.total) * 100, r.read ? 2 : 0)}%` }} />
          </span>
        </li>
      ))}
    </ul>
  )
}

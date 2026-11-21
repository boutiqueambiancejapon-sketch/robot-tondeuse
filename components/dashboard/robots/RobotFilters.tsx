import Link from 'next/link'
import { periodQuery, type PeriodKey } from '@/lib/dashboard/period'
import { ROBOT_KINDS, robotHref, type RobotFilter } from '@/lib/dashboard/robots'

// Robot filters in the URL, one row per dimension, scrolling sideways on a phone.

function ChipRow({ label, items }: { label: string; items: { key: string; text: string; href: string; active: boolean }[] }) {
  return (
    <nav aria-label={label} className="chips">
      <ul>
        {items.map((i) => (
          <li key={i.key}>
            <Link href={i.href} scroll={false} aria-current={i.active ? 'true' : undefined} className="chip">
              {i.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function RobotFilters({ period, filter, operators }: { period: PeriodKey; filter: RobotFilter; operators: string[] }) {
  const href = (next: RobotFilter) => robotHref('/dashboard/robots', periodQuery(period), next)
  return (
    <div className="stack">
      <ChipRow
        label="Filtrer par robot"
        items={[{ key: 'tous', text: 'Tous les robots', href: href({ ...filter, robot: null }), active: filter.robot === null }, ...operators.map((o) => ({ key: o, text: o, href: href({ ...filter, robot: o }), active: filter.robot === o }))]}
      />
      <ChipRow
        label="Filtrer par type de visite"
        items={[{ key: 'tous', text: 'Toutes les visites', href: href({ ...filter, kind: null }), active: filter.kind === null }, ...ROBOT_KINDS.map((k) => ({ key: k.key, text: k.label, href: href({ ...filter, kind: k.key }), active: filter.kind === k.key }))]}
      />
    </div>
  )
}

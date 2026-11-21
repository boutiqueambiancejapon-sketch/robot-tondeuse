import Link from 'next/link'
import type { PeriodKey } from '@/lib/dashboard/period'
import { tabHref, type TabSlug } from '@/lib/dashboard/tabs'

// Sub-pages of a tab, scrolling sideways on a phone, each link on one line.

interface Props {
  tab: TabSlug
  label: string
  views: readonly { sub: string; label: string }[]
  period?: PeriodKey
  current: string
}

export function SubNav({ tab, label, views, period, current }: Props) {
  return (
    <nav aria-label={label} className="subnav">
      <ul>
        {views.map((v) => (
          <li key={v.sub}>
            <Link href={tabHref(tab, period, v.sub)} aria-current={v.sub === current ? 'page' : undefined}>
              {v.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

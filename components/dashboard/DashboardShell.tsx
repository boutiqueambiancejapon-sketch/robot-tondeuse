import Link from 'next/link'
import type { ReactNode } from 'react'
import { periodQuery, PERIODS, type PeriodKey } from '@/lib/dashboard/period'
import { tabHref, type TabSlug } from '@/lib/dashboard/tabs'
import { SeoShell } from '@/components/seo-dash/shell/SeoShell'

// Frame of the tools (Conversions, Contacts, E-mails, Serveur, Sécurité): same menu as the SEO
// dashboard (components/seo-dash/shell), their own period selector (?periode=) when they have one.

interface Props {
  current: TabSlug
  title: string
  intro: string
  /** Shows the period selector when set. */
  period?: PeriodKey
  /** Sub-page of the tab ("/suites"), kept by the period selector. */
  sub?: string
  /** Other URL parameters kept by the period selector (filters). */
  keep?: Record<string, string | null>
  /** Red line under the title (a read failed). */
  notice?: string | null
  children: ReactNode
}

function periodHref(current: TabSlug, sub: string, key: PeriodKey, keep: Record<string, string | null>): string {
  const params = new URLSearchParams(periodQuery(key).replace(/^\?/, ''))
  for (const [k, v] of Object.entries(keep)) if (v) params.set(k, v)
  const qs = params.toString()
  return `${tabHref(current, undefined, sub)}${qs ? `?${qs}` : ''}`
}

export function DashboardShell({ current, title, intro, period, sub = '', keep = {}, notice, children }: Props) {
  return (
    <SeoShell current={current} title={title} sub={intro} legacy>
      <div className="stack">
        {period && (
          <nav className="periods" aria-label="Période">
            {(Object.keys(PERIODS) as PeriodKey[]).map((k) => (
              <Link key={k} href={periodHref(current, sub, k, keep)} className="period" aria-current={k === period ? 'true' : undefined} scroll={false}>
                {PERIODS[k].label}
              </Link>
            ))}
          </nav>
        )}
        {notice && <p className="alert">{notice}</p>}
        {children}
      </div>
    </SeoShell>
  )
}

import Link from 'next/link'
import type { ReactNode } from 'react'
import { periodQuery, PERIODS, type PeriodKey } from '@/lib/dashboard/period'
import { SECURITY_POSE, TABS, tabHref, type TabSlug } from '@/lib/dashboard/tabs'
import { Mascotte } from '@/components/v2/Mascotte'

interface Props {
  current: TabSlug
  title: string
  intro: string
  /** Shows the period selector when set. */
  period?: PeriodKey
  /** Sub-page of the tab ("/direct"), kept by the period selector. */
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

/** Header, tabs, title with the page's mascot, optional period selector. */
export function DashboardShell({ current, title, intro, period, sub = '', keep = {}, notice, children }: Props) {
  const tab = TABS.find((t) => t.slug === current)
  const pose = tab?.pose ?? SECURITY_POSE
  return (
    <>
      <header className="hd">
        <div className="wrap">
          <div className="hd-in">
            <Link href="/dashboard" className="logo">
              <Mascotte pose="side" size={34} />Tableau de bord
            </Link>
            <Link href="/dashboard/securite" className="hd-link" aria-current={current === 'securite' ? 'page' : undefined}>
              Sécurité
            </Link>
          </div>
          <nav className="tabs" aria-label="Onglets">
            {TABS.map((t) => (
              <Link key={t.slug} href={tabHref(t.slug, period)} className="tab" aria-current={t.slug === current ? 'page' : undefined}>
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap main stack" id="main-content">
        <div className="ttl">
          <h1>{title}</h1>
          <Mascotte pose={pose} size={76} className="masc" priority />
          <p className="muted small">{intro}</p>
        </div>
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
      </main>
    </>
  )
}

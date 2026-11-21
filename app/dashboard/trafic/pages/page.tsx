import Link from 'next/link'
import { openTab, one, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { tabHref } from '@/lib/dashboard/tabs'
import { entriesOf, funnelOf, typesOf } from '@/lib/dashboard/traffic'
import { safeRead } from '@/lib/server/dashboard/safe'
import { getPageCounts, getSessions } from '@/lib/server/dashboard/sessions'
import { EMPTY_TRAFFIC, getTraffic } from '@/lib/server/dashboard/traffic'
import { pageTitles } from '@/lib/server/dashboard/titles'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { Funnel } from '@/components/dashboard/traffic/Funnel'
import { EntryPages, PageTypes, TopPages } from '@/components/dashboard/traffic/PageRows'
import { TrafficNav } from '@/components/dashboard/traffic/TrafficNav'

// Traffic, pages and paths: three rankings to choose from, the path from an article, missing pages.

export const dynamic = 'force-dynamic'

const LISTS = [
  { key: 'vues', label: 'Les plus vues' },
  { key: 'entrees', label: 'D’entrée' },
  { key: 'types', label: 'Par type' },
] as const

type Props = TabPageProps & { searchParams: Promise<{ periode?: string | string[]; liste?: string | string[] }> }

export default async function TrafficPages(props: Props) {
  const period = await openTab(props)
  const raw = one((await props.searchParams).liste)
  const list = raw === 'entrees' || raw === 'types' ? raw : 'vues'
  const [sessions, pages, traffic] = await Promise.all([
    safeRead('sessions', [], (pool) => getSessions(pool, period)),
    safeRead('pages', [], (pool) => getPageCounts(pool, period)),
    safeRead('traffic', EMPTY_TRAFFIC, (pool) => getTraffic(pool, period)),
  ])
  const titles = pageTitles()
  const base = tabHref('trafic', period.key, '/pages')
  const sep = base.includes('?') ? '&' : '?'
  return (
    <DashboardShell current="trafic" sub="/pages" keep={{ liste: list === 'vues' ? null : list }} title="Pages et parcours" intro={`Ce qui est lu sur ${period.long}, et ce que font ceux qui arrivent par un article.`} period={period.key} notice={sessions.ok && pages.ok && traffic.ok ? null : READ_FAILED}>
      <TrafficNav period={period.key} current="/pages" />
      <div className="grid grid--2">
        <section className="card" aria-label="Classement des pages">
          <nav className="seg" aria-label="Classement">
            {LISTS.map((l) => (
              <Link key={l.key} href={l.key === 'vues' ? base : `${base}${sep}liste=${l.key}`} aria-current={l.key === list ? 'true' : undefined} scroll={false}>
                {l.label}
              </Link>
            ))}
          </nav>
          {list === 'vues' && <TopPages rows={pages.value} titles={titles} />}
          {list === 'entrees' && <EntryPages rows={entriesOf(sessions.value)} titles={titles} />}
          {list === 'types' && <PageTypes rows={typesOf(pages.value)} />}
        </section>
        <Card title="Du lecteur au clic" note="sessions">
          <Funnel steps={funnelOf(sessions.value)} empty="Aucune session arrivée par un article sur la période." />
          <p className="tiny muted">Sessions arrivées par un article, puis ce que ces mêmes sessions ont fait. Chaque étape se compte à part.</p>
        </Card>
        <Card title="Pages introuvables (404)" note="vues par Google ou depuis un lien">
          <BarList rows={traffic.value.notFound} empty="Aucune page introuvable : tout va bien." />
        </Card>
      </div>
    </DashboardShell>
  )
}

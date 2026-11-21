import Link from 'next/link'
import { ago, when } from '@/lib/dashboard/format'
import { insightOf } from '@/lib/dashboard/insight'
import { openTab, type TabPageProps } from '@/lib/dashboard/tab-page'
import { tabHref } from '@/lib/dashboard/tabs'
import { typesOf } from '@/lib/dashboard/traffic'
import { EMPTY_SUMMARY, getIngestAt, getSummary, ingestStale } from '@/lib/server/dashboard/home'
import { safeRead } from '@/lib/server/dashboard/safe'
import { EMPTY_TOTALS, getEventBuckets, getPageCounts, getSessionCounts, getTotals } from '@/lib/server/dashboard/sessions'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { HomeKpis } from '@/components/dashboard/home/HomeKpis'
import { SummaryTable } from '@/components/dashboard/home/SummaryTable'

// Home: is everything fine, is it growing, what to remember. Details live in the tabs.

export const dynamic = 'force-dynamic'

export default async function DashboardHome(props: TabPageProps) {
  const period = await openTab(props)
  const [summary, ingest, totals, sessions, clicks, pages] = await Promise.all([
    safeRead('summary', EMPTY_SUMMARY, getSummary),
    safeRead('ingest', null, getIngestAt),
    safeRead('totals', EMPTY_TOTALS, (pool) => getTotals(pool, period)),
    safeRead('sessions', { current: 0, previous: 0 }, (pool) => getSessionCounts(pool, period)),
    safeRead('clicks', [], (pool) => getEventBuckets(pool, period, 'preply_click')),
    safeRead('pages', [], (pool) => getPageCounts(pool, period)),
  ])
  const alerts: { text: string; href: string }[] = []
  if (!summary.ok || !totals.ok) alerts.push({ text: 'Lecture de la base impossible : les chiffres ci-dessous restent à zéro.', href: tabHref('serveur') })
  if (ingest.ok && ingestStale(ingest.value)) alerts.push({ text: `Les visites ne sont plus relevées${ingest.value ? ` depuis ${ago(ingest.value)}` : ''} (tâche tenmin-ingest).`, href: tabHref('serveur') })
  return (
    <DashboardShell current="" title="Bonjour Mathias" intro={`Mis à jour le ${when(new Date())}, heure de Bruxelles.`} period={period.key}>
      {alerts.length > 0 ? (
        alerts.map((a) => (
          <Link key={a.text} href={a.href} className="alert" role="alert">
            {a.text} <span className="lnk">Voir le détail</span>
          </Link>
        ))
      ) : (
        <p className="okline">Tout tourne : site en ligne, visites relevées {ingest.value ? ago(ingest.value) : ''}.</p>
      )}
      <HomeKpis totals={totals.value} sessions={sessions.value} clicks={clicks.value} period={period} insight={pages.ok ? insightOf(typesOf(pages.value)) : 'Pas de tendance à donner : la base n’a pas répondu.'} />
      <Card title="En bref" note="aujourd’hui · 7 j · 30 j">
        <SummaryTable summary={summary.value} />
        <p className="tiny muted">Visiteurs : comptés une fois par jour, sans cookie. Robots IA : pages lues par ChatGPT, Claude, Perplexity…</p>
      </Card>
    </DashboardShell>
  )
}

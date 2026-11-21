import { CLICK_EVENT } from '@/lib/dashboard/events'
import { bucketUnit } from '@/lib/dashboard/period'
import { insightOf } from '@/lib/dashboard/insight'
import { openTab, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { goalFunnelOf, typesOf } from '@/lib/dashboard/traffic'
import { EMPTY_CONVERSIONS, getConversions } from '@/lib/server/dashboard/conversions'
import { safeRead } from '@/lib/server/dashboard/safe'
import { EMPTY_TOTALS, getEventBuckets, getPageCounts, getSessions, getTotals } from '@/lib/server/dashboard/sessions'
import { pageTitles } from '@/lib/server/dashboard/titles'
import { Card } from '@/components/dashboard/Card'
import { Columns } from '@/components/dashboard/Columns'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { DeltaTile, Tiles } from '@/components/dashboard/Tiles'
import { ConversionLists } from '@/components/dashboard/conversions/ConversionLists'
import { Funnel } from '@/components/dashboard/traffic/Funnel'

// Conversions: partner clicks (the income), quiz, letter sign-ups, PDF guides, promo pages. Compared
// with the period before, then per merchant, page, place, robot, and the funnel of every session.

export const dynamic = 'force-dynamic'

export default async function ConversionsPage(props: TabPageProps) {
  const period = await openTab(props)
  const [c, totals, clicks, pages, sessions] = await Promise.all([
    safeRead('conversions', EMPTY_CONVERSIONS, (pool) => getConversions(pool, period)),
    safeRead('totals', EMPTY_TOTALS, (pool) => getTotals(pool, period)),
    safeRead('clicks', [], (pool) => getEventBuckets(pool, period, CLICK_EVENT)),
    safeRead('pages', [], (pool) => getPageCounts(pool, period)),
    safeRead('sessions', [], (pool) => getSessions(pool, period)),
  ])
  const ok = c.ok && totals.ok && clicks.ok && pages.ok && sessions.ok
  const t = totals.value
  return (
    <DashboardShell current="conversions" title="Conversions" intro={`Clics vers Amazon, Cdiscount et Fnac, quiz, inscriptions à la lettre, guides PDF et pages promos sur ${period.long}. Les ventes se lisent chez Amazon Partenaires et Awin.`} period={period.key} notice={ok ? null : READ_FAILED}>
      <Tiles>
        <DeltaTile label="Clics vers les marchands" pair={t.clicks} period={period} hero>
          <Columns buckets={clicks.value} hourly={period.bucket === 'hour'} label={`Clics vers les marchands ${bucketUnit(period)}`} size="s" empty="Aucun clic vers un marchand sur la période." />
        </DeltaTile>
        <DeltaTile label="Résultats de quiz" pair={t.quiz} period={period} />
        <DeltaTile label="Inscrits à la lettre" pair={t.signups} period={period} />
        <DeltaTile label="Guides PDF ouverts" pair={t.pdf} period={period} />
        <DeltaTile label="Pages promos lues" pair={t.promo} period={period} />
        <DeltaTile label="Pages vues" pair={t.views} period={period} />
      </Tiles>
      <p className="callout">
        <strong>À retenir : </strong>
        {insightOf(typesOf(pages.value))}
      </p>
      <div className="grid grid--2">
        <Card title="Du visiteur au clic" note="sessions">
          <Funnel steps={goalFunnelOf(sessions.value)} empty="Aucune session sur la période." />
          <p className="tiny muted">Chaque étape se compte à part : un clic n’exige pas le quiz. Seules les actions liées à une visite du même jour entrent ici.</p>
        </Card>
        <ConversionLists data={c.value} types={typesOf(pages.value)} titles={pageTitles()} />
      </div>
    </DashboardShell>
  )
}

import { bucketUnit } from '@/lib/dashboard/period'
import { insightOf } from '@/lib/dashboard/insight'
import { openTab, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { goalFunnelOf, typesOf } from '@/lib/dashboard/traffic'
import { EMPTY_CONVERSIONS, getConversions } from '@/lib/server/dashboard/conversions'
import { EMPTY_INTENT_FUNNEL, getIntentFunnel } from '@/lib/server/dashboard/funnel-intent'
import { safeRead } from '@/lib/server/dashboard/safe'
import { EMPTY_TOTALS, getEventBuckets, getPageCounts, getSessions, getTotals } from '@/lib/server/dashboard/sessions'
import { pageTitles } from '@/lib/server/dashboard/titles'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { Columns } from '@/components/dashboard/Columns'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { DeltaTile, Tiles } from '@/components/dashboard/Tiles'
import { ByType } from '@/components/dashboard/conversions/ByType'
import { ClicksByPage } from '@/components/dashboard/conversions/ClicksByPage'
import { IntentFunnel } from '@/components/dashboard/conversions/IntentFunnel'
import { Funnel } from '@/components/dashboard/traffic/Funnel'

// Conversions: Preply clicks (the income), free kits, list sign-ups, accounts. Compared with the
// period before, per page type, per page, link and place, plus the funnel of every session.

export const dynamic = 'force-dynamic'

export default async function ConversionsPage(props: TabPageProps) {
  const period = await openTab(props)
  const [c, totals, clicks, pages, sessions, byIntent] = await Promise.all([
    safeRead('conversions', EMPTY_CONVERSIONS, (pool) => getConversions(pool, period)),
    safeRead('totals', EMPTY_TOTALS, (pool) => getTotals(pool, period)),
    safeRead('clicks', [], (pool) => getEventBuckets(pool, period, 'preply_click')),
    safeRead('pages', [], (pool) => getPageCounts(pool, period)),
    safeRead('sessions', [], (pool) => getSessions(pool, period)),
    safeRead('intent', EMPTY_INTENT_FUNNEL, (pool) => getIntentFunnel(pool, period)),
  ])
  const ok = c.ok && totals.ok && clicks.ok && pages.ok && sessions.ok && byIntent.ok
  const types = typesOf(pages.value)
  const t = totals.value
  return (
    <DashboardShell current="conversions" title="Conversions" intro={`Clics vers Preply (seul partenaire), kits, inscriptions et comptes sur ${period.long}. Les ventes se lisent dans Impact.`} period={period.key} notice={ok ? null : READ_FAILED}>
      <Tiles>
        <DeltaTile label="Clics vers Preply" pair={t.clicks} period={period} hero>
          <Columns buckets={clicks.value} hourly={period.bucket === 'hour'} label={`Clics vers Preply ${bucketUnit(period)}`} size="s" empty="Aucun clic vers Preply sur la période." />
        </DeltaTile>
        <DeltaTile label="Kits demandés" pair={t.kits} period={period} />
        <DeltaTile label="Inscrits à la liste" pair={t.signups} period={period} />
        <DeltaTile label="Comptes créés" pair={t.accounts} period={period} />
        <DeltaTile label="Pages vues" pair={t.views} period={period} />
      </Tiles>
      <p className="callout">
        <strong>À retenir : </strong>
        {insightOf(types)}
      </p>
      <Card title="Entonnoir par intention" note="pages info · pages commerciales">
        <IntentFunnel steps={byIntent.value.steps} />
        <p className="tiny muted">
          Pages info : compte gratuit et exercice du jour d’abord, Preply en une ligne. Pages commerciales : Preply d’abord. Un encart compte une seule fois par page vue. Les pourcentages se lisent par rapport à la ligne indiquée (vus / pages vues, clics / vus, comptes / clics).
        </p>
      </Card>
      <div className="grid grid--2">
        <Card title="Comptes créés par emplacement" note="source du lien de connexion">
          <BarList rows={byIntent.value.accountsByPlace} empty="Aucun compte créé depuis un encart sur cette période." />
        </Card>
        <Card title="Clics compte / exercice par emplacement">
          <BarList rows={byIntent.value.clicksByPlace} empty="Aucun clic sur un encart compte sur cette période." />
        </Card>
        <Card title="Du visiteur au clic" note="sessions">
          <Funnel steps={goalFunnelOf(sessions.value)} empty="Aucune session sur la période." />
          <p className="tiny muted">Chaque étape se compte à part : un clic n’exige pas d’outil. Seules les actions liées à une visite du même jour entrent ici.</p>
        </Card>
        <Card title="Par type de page" note="clics · vues · inscriptions">
          <ByType rows={types} />
        </Card>
        <Card title="Clics Preply par page">
          <ClicksByPage rows={c.value.byPage} titles={pageTitles()} />
        </Card>
        <Card title="Où se trouve le lien cliqué">
          <BarList rows={c.value.byPlace} empty="Aucun clic sur cette période." />
        </Card>
        <Card title="Quel lien est cliqué">
          <BarList rows={c.value.byLink} empty="Aucun clic sur cette période." />
        </Card>
        <Card title="Kits gratuits" note="demandés · confirmés">
          <BarList rows={c.value.kits} empty="Aucune demande de kit sur cette période." />
        </Card>
        <Card title="Inscriptions à la liste" note="par page">
          <BarList rows={c.value.signups} empty="Aucune inscription confirmée sur cette période." />
        </Card>
        <Card title="Outils utilisés" note="calculateur, quiz méthode">
          <BarList rows={c.value.tools} empty="Aucun résultat d’outil sur cette période." />
        </Card>
      </div>
    </DashboardShell>
  )
}

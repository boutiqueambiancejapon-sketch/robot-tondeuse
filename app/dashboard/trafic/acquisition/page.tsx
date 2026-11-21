import { openTab, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { channelsOf, countBy, enginesOf, sitesOf } from '@/lib/dashboard/traffic'
import { EMPTY_GEO, getGeo } from '@/lib/server/dashboard/geo'
import { getAcquisitionExtras, EMPTY_EXTRAS } from '@/lib/server/dashboard/acquisition'
import { safeRead } from '@/lib/server/dashboard/safe'
import { getSessions } from '@/lib/server/dashboard/sessions'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { ChannelList } from '@/components/dashboard/traffic/ChannelList'
import { GeoPanels } from '@/components/dashboard/traffic/GeoPanels'
import { TrafficNav } from '@/components/dashboard/traffic/TrafficNav'

// Traffic, acquisition: channels, AI assistants, search engines, sites, devices and countries.

export const dynamic = 'force-dynamic'

const DEVICES: Record<string, string> = { mobile: 'Téléphone', tablet: 'Tablette', desktop: 'Ordinateur' }

export default async function TrafficAcquisition(props: TabPageProps) {
  const period = await openTab(props)
  const [sessions, geo, extras] = await Promise.all([
    safeRead('sessions', [], (pool) => getSessions(pool, period)),
    safeRead('geo', EMPTY_GEO, (pool) => getGeo(pool, period)),
    safeRead('acquisition', EMPTY_EXTRAS, (pool) => getAcquisitionExtras(pool, period)),
  ])
  const rows = sessions.value
  const total = rows.filter((r) => r.current).length
  return (
    <DashboardShell current="trafic" sub="/acquisition" title="Acquisition" intro={`D’où viennent les sessions de ${period.long}.`} period={period.key} notice={sessions.ok && geo.ok && extras.ok ? null : READ_FAILED}>
      <TrafficNav period={period.key} current="/acquisition" />
      <div className="grid grid--2">
        <Card title="Par canal" note="sessions · part qui clique">
          <ChannelList rows={channelsOf(rows)} />
          <p className="tiny muted">« Accès direct » réunit aussi les applications qui masquent leur origine, dont une partie des e-mails.</p>
        </Card>
        <Card title="Envoyés par un assistant IA" note="sessions">
          <BarList rows={countBy(rows, (r) => r.ai)} empty="Aucune visite venue de ChatGPT, Perplexity, Claude, Gemini… sur la période." />
          <p className="tiny muted">Par le site d’origine ou le repère utm_source que ChatGPT ajoute aux liens.</p>
        </Card>
        <Card title="Moteurs de recherche" note="sessions">
          <BarList rows={enginesOf(rows)} empty="Aucune visite venue d’un moteur sur la période." />
        </Card>
        <Card title="Sites qui t’envoient du monde" note="sessions">
          <BarList rows={sitesOf(rows).slice(0, 15)} empty="Aucun site sur la période." />
        </Card>
        <Card title="Appareils" note="sessions">
          <BarList rows={countBy(rows, (r) => r.device)} total={total} format={(d) => DEVICES[d] ?? d} empty="Aucune session sur la période." />
        </Card>
        <Card title="Pages d’arrivée depuis une IA" note="pages vues">
          <BarList rows={extras.value.aiLandings} empty="Aucune page ouverte depuis une IA sur la période." />
        </Card>
        <GeoPanels data={geo.value} />
      </div>
    </DashboardShell>
  )
}

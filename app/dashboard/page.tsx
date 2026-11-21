import { lastLabel, prevPeriodLabel } from '@/lib/seo-dash/filters'
import { dayLabel, todayLong } from '@/lib/seo-dash/format'
import { hrefOf, pageHref, queryHref } from '@/lib/seo-dash/nav'
import { anomalies, type Anomaly } from '@/lib/seo-dash/server/anomalies'
import { googleCore } from '@/lib/seo-dash/server/google'
import { chartNotes } from '@/lib/seo-dash/server/notes'
import { openSeoPage, type SeoPageProps } from '@/lib/seo-dash/server/page'
import { logRanges } from '@/lib/seo-dash/server/range'
import { siteKpis } from '@/lib/seo-dash/server/site'
import { readBlock } from '@/lib/seo-dash/server/sql'
import { todayActions } from '@/lib/seo-dash/server/today'
import { gscState, type GscState } from '@/lib/seo-dash/server/gsc-state'
import { ago } from '@/lib/dashboard/format'
import { getIngestAt, ingestStale } from '@/lib/server/dashboard/home'
import { GoogleDelay } from '@/components/seo-dash/ui/GoogleDelay'
import { SeoShell } from '@/components/seo-dash/shell/SeoShell'
import { TodayTiles } from '@/components/seo-dash/blocks/TodayTiles'
import { TodayActions } from '@/components/seo-dash/blocks/TodayActions'
import { AnomalyList } from '@/components/seo-dash/blocks/AnomalyList'
import { ClicksCard } from '@/components/seo-dash/blocks/GoogleCharts'
import { GscPending } from '@/components/seo-dash/blocks/GscPending'

// SEO dashboard, Aujourd'hui (ported from Toutou): everything that needs a decision, nothing else. Private page
// (proxy.ts + session checked again), never cached or indexed.

export const dynamic = 'force-dynamic'

export default async function TodayPage(props: SeoPageProps) {
  const { filters: f, query } = await openSeoPage(props)
  const links = { page: (p: string) => pageHref(p, query), query: (q: string) => queryHref(q, query), google: hrefOf('google', query), exploration: hrefOf('exploration', query), technique: hrefOf('technique', query) }
  const [gsc, site, actions, anoms, ingest, state] = await Promise.all([
    readBlock('aujourdhui google', null, (pool) => googleCore(pool, f)),
    readBlock('aujourdhui site', null, (pool) => siteKpis(pool, f, logRanges(f))),
    readBlock('actions', [], (pool) => todayActions(pool, f, links)),
    readBlock('anomalies', [] as Anomaly[], (pool) => anomalies(pool, f, links)),
    readBlock('relevé des journaux', null, (pool) => getIngestAt(pool)),
    readBlock<GscState>('search console', { ready: true }, (pool) => gscState(pool)),
  ])
  const ready = state.value.ready
  const notes = gsc.value ? (await readBlock('notes', [], (pool) => chartNotes(pool, gsc.value!.ranges.cur))).value : []
  const items: Anomaly[] = [
    ...(!ingest.ok ? [{ status: 'crit' as const, text: 'Lecture de la base impossible : les chiffres restent à zéro.', meta: 'en cours', href: hrefOf('serveur'), hrefLabel: 'Serveur' }] : []),
    ...(ingest.ok && ingestStale(ingest.value)
      ? [{ status: 'crit' as const, text: `Les visites ne sont plus relevées${ingest.value ? ` depuis ${ago(ingest.value)}` : ''} (tâche qrt-ingest).`, meta: 'en cours', href: hrefOf('serveur'), hrefLabel: 'Serveur' }]
      : []),
    ...anoms.value,
  ]
  const g = gsc.value
  return (
    <SeoShell current="" title="Aujourd’hui" sub={`${todayLong()} · tout ce qui demande une décision, rien d’autre`} filters={f} path={hrefOf('')} fresh={g && ready ? `Google : données jusqu’au ${dayLabel(g.ranges.last)}` : undefined}>
      <GoogleDelay filters={f} last={g?.ranges.last} />
      {g && site.value ? <TodayTiles gsc={{ ...g, prev: g.ranges.partial ? null : g.prev }} site={site.value} gscReady={ready} /> : <p className="sd-note warn">Lecture des chiffres impossible pour l’instant.</p>}
      <div className="sd-grid sd-g3 sd-gap">
        <div className="sd-span2">
          <TodayActions actions={actions.value} />
        </div>
        <AnomalyList items={items} />
      </div>
      <GscPending state={state.value} compact />
      {g && ready ? (
        <div className="sd-gap">
          <ClicksCard daily={g.daily} prevDaily={g.prevDaily} notes={notes} curLabel={lastLabel(f.period)} prevLabel={f.compare === 'annee' ? 'l’an dernier' : prevPeriodLabel(f.period)} week={false} dayHref={hrefOf('google', query)} weekHref={hrefOf('google', query)} detailHref={hrefOf('google', query)} />
        </div>
      ) : null}
    </SeoShell>
  )
}

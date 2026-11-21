import { deltaShort, type Pair } from '@/lib/dashboard/compare'
import { n } from '@/lib/dashboard/format'
import { bucketUnit, type Period } from '@/lib/dashboard/period'
import { coverageOf, splitPaths, type ArticlePath, type RobotFilter } from '@/lib/dashboard/robots'
import type { RobotsData } from '@/lib/server/dashboard/robots'
import { BarList, TopList } from '../BarList'
import { Card } from '../Card'
import { TextTile, Tiles } from '../Tiles'
import { AI_SERIES, AiTimeline } from './AiTimeline'
import { HourBars, KindShare } from './RobotCharts'
import { RobotFilters } from './RobotFilters'
import { CoverageList, RobotList } from './RobotList'
import { UnreadPages } from './UnreadPages'

// AI robots (scripts/lib/bots.mjs): coverage of the pages, filters by robot and visit type,
// charts, then pages and real errors. Adapted from Toutou.

const evolution = (p: Pair) => `${deltaShort(p)} sur la période d’avant`
const KIND_OF = { training: 'ai_training', search: 'ai_search', user: 'ai_user' } as const

interface Props {
  data: RobotsData
  period: Period
  filter: RobotFilter
  pages: ArticlePath[]
  titles: Map<string, string>
}

export function AiSection({ data, period, filter, pages, titles }: Props) {
  const coverage = coverageOf(pages, data.readPaths)
  const readCount = coverage.reduce((sum, r) => sum + r.read, 0)
  const read = new Set(data.readPaths.map((p) => p.replace(/\/$/, '') || '/'))
  const unread = pages.filter((a) => !read.has(a.path))
  const { articles, others } = splitPaths(data.paths, titles)
  const named = (rows: RobotsData['paths']) => rows.map((r) => ({ ...r, label: titles.get(r.label.replace(/\/$/, '')) ?? r.label }))
  const hourly = period.bucket === 'hour'
  const totals = data.timeline.reduce((t, r) => ({ training: t.training + r.training, search: t.search + r.search, user: t.user + r.user }), { training: 0, search: 0, user: 0 })
  const share = AI_SERIES.map((s) => ({ key: KIND_OF[s.key], value: totals[s.key], fill: s.fill }))
  return (
    <>
      <Tiles>
        <TextTile label="Pages déjà lues" value={`${n(readCount)} / ${n(pages.length)}`} note="Depuis le début de la mesure" />
        <TextTile label="Visites de robots" value={n(data.visits.current)} note={evolution(data.visits)} />
        <TextTile label="Lectures en direct" value={n(data.direct.current)} note={evolution(data.direct)} />
        <TextTile label="Pages lues" value={n(data.pages)} note={`${n(data.errors)} erreurs réelles`} />
      </Tiles>
      <RobotFilters period={period.key} filter={filter} operators={data.operators} />
      <div className="grid grid--2">
        <Card title={`Visites ${bucketUnit(period)}`}>
          <AiTimeline rows={data.timeline} hourly={hourly} />
        </Card>
        <Card title="Pourquoi ils viennent">
          <KindShare rows={share} />
        </Card>
        <Card title="À quelle heure" note="heure de Bruxelles">
          <HourBars hours={data.hours} />
        </Card>
        <Card title="Robot par robot" note="toucher filtre la page">
          <RobotList robots={data.robots} buckets={data.timeline.map((r) => r.bucket)} hourly={hourly} period={period.key} filter={filter} />
        </Card>
        <Card title="Visiteurs envoyés par une IA" note="ignore les filtres">
          <BarList rows={data.referrals} empty="Aucun visiteur venu d’une IA sur la période." />
        </Card>
        <Card title="Ouverts pour répondre à quelqu’un" note="lecture en direct">
          <TopList rows={named(data.directPaths)} empty="Aucune lecture en direct sur la période." />
        </Card>
        <Card title="Articles les plus lus">
          <TopList rows={articles} empty="Aucun article lu pour ce filtre." />
        </Card>
        <Card title="Lus par type de page" note="depuis le début">
          <CoverageList rows={coverage} />
        </Card>
        <Card title="Ce que lisent les robots" note="pages lues par type">
          <TopList rows={data.types} empty="Aucune page lue pour ce filtre." />
        </Card>
        <Card title="Pages hors articles">
          <TopList rows={others} empty="Aucune page hors articles pour ce filtre." />
        </Card>
        <Card title="Vraies erreurs" note={`${n(data.technicalErrors)} techniques mises de côté`}>
          <TopList rows={data.errorPaths} empty="Aucune erreur réelle servie à un robot sur la période." />
          <p className="tiny muted">Une 404 ici est une page citée qui n’existe plus. Mises de côté : fichiers techniques, /api et tableau de bord.</p>
        </Card>
        <Card title="Moteurs et autres robots" note="hors IA, ignore les filtres">
          <TopList rows={data.others} empty="Aucun autre robot sur la période." />
        </Card>
        <UnreadPages pages={unread} total={pages.length} />
      </div>
    </>
  )
}

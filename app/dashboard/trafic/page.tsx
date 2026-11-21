import { bucketUnit } from '@/lib/dashboard/period'
import { openTab, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { overviewOf } from '@/lib/dashboard/traffic'
import { safeRead } from '@/lib/server/dashboard/safe'
import { EMPTY_TOTALS, getSessions, getTotals, getVisitorBuckets } from '@/lib/server/dashboard/sessions'
import { Card } from '@/components/dashboard/Card'
import { Columns } from '@/components/dashboard/Columns'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { Earnings, TRAFFIC_LIMITS, TrafficTiles } from '@/components/dashboard/traffic/TrafficOverview'
import { TrafficNav } from '@/components/dashboard/traffic/TrafficNav'

// Traffic tab, overview: who comes, compared with the period before.

export const dynamic = 'force-dynamic'

export default async function TrafficTab(props: TabPageProps) {
  const period = await openTab(props)
  const [sessions, totals, buckets] = await Promise.all([
    safeRead('sessions', [], (pool) => getSessions(pool, period)),
    safeRead('totals', EMPTY_TOTALS, (pool) => getTotals(pool, period)),
    safeRead('visitor buckets', [], (pool) => getVisitorBuckets(pool, period)),
  ])
  const overview = overviewOf(sessions.value)
  return (
    <DashboardShell current="trafic" title="Trafic" intro={`Qui vient sur le site, d’où, et ce qu’ils font, sur ${period.long}. Chaque écart compare ${period.previous}.`} period={period.key} notice={sessions.ok && totals.ok && buckets.ok ? null : READ_FAILED}>
      <TrafficNav period={period.key} current="" />
      <TrafficTiles overview={overview} totals={totals.value} period={period} />
      <div className="grid grid--2">
        <Card title={`Visiteurs ${bucketUnit(period)}`}>
          <Columns buckets={buckets.value} hourly={period.bucket === 'hour'} label={`Visiteurs ${bucketUnit(period)}`} table />
        </Card>
        <Earnings totals={totals.value} overview={overview} />
      </div>
      <p className="tiny muted">{TRAFFIC_LIMITS}</p>
    </DashboardShell>
  )
}

import { parseRobotFilter } from '@/lib/dashboard/robots'
import { openTab, READ_FAILED, type TabPageProps } from '@/lib/dashboard/tab-page'
import { EMPTY_ROBOTS, getRobots } from '@/lib/server/dashboard/robots'
import { safeRead } from '@/lib/server/dashboard/safe'
import { sitePages } from '@/lib/server/dashboard/site-pages'
import { pageTitles } from '@/lib/server/dashboard/titles'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { AiSection } from '@/components/dashboard/robots/AiSection'

// AI robots tab: coverage, filters by robot and visit type, charts, pages read, visitors sent by
// an AI, real errors and pages never read.

export const dynamic = 'force-dynamic'

type Props = TabPageProps & { searchParams: Promise<{ periode?: string | string[]; robot?: string | string[]; visite?: string | string[] }> }

export default async function RobotsTab(props: Props) {
  const period = await openTab(props)
  const sp = await props.searchParams
  const filter = parseRobotFilter(sp.robot, sp.visite)
  const robots = await safeRead('robots', EMPTY_ROBOTS, (pool) => getRobots(pool, period, filter))
  return (
    <DashboardShell current="robots" title="Robots IA" intro={`Quels robots d’IA lisent le site, quelles pages, et pourquoi, sur ${period.long}.`} period={period.key} keep={{ robot: filter.robot, visite: filter.kind }} notice={robots.ok ? null : READ_FAILED}>
      <AiSection data={robots.value} period={period} filter={filter} pages={sitePages()} titles={pageTitles()} />
    </DashboardShell>
  )
}

import { openTab, type TabPageProps } from '@/lib/dashboard/tab-page'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { LiveSection } from '@/components/dashboard/live/LiveSection'
import { TrafficNav } from '@/components/dashboard/traffic/TrafficNav'

// Traffic, live: the only view that polls the server, every 10 s.

export const dynamic = 'force-dynamic'

export default async function TrafficLive(props: TabPageProps) {
  const period = await openTab(props)
  return (
    <DashboardShell current="trafic" sub="/direct" title="En direct" intro="Rafraîchi toutes les 10 secondes. Pages vues lues dans le journal du serveur chaque minute, actions envoyées par le site à l’instant.">
      <TrafficNav period={period.key} current="/direct" />
      <LiveSection />
    </DashboardShell>
  )
}

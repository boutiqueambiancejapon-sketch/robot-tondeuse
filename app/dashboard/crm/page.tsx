import { isOwn, summarize } from '@/lib/dashboard/crm'
import { n } from '@/lib/dashboard/format'
import { openTab, type TabPageProps } from '@/lib/dashboard/tab-page'
import { loadContacts } from '@/lib/server/dashboard/crm'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { TextTile, Tiles } from '@/components/dashboard/Tiles'
import { CrmNav } from '@/components/dashboard/crm/CrmNav'

// Contacts (CRM), where they stand: readers of the letter, what deserves a look, which form they used.

export const dynamic = 'force-dynamic'

const DAYS: Record<string, number> = { '24h': 1, '7j': 7, '30j': 30, '90j': 90 }

export default async function CrmTab(props: TabPageProps) {
  const period = await openTab(props)
  const res = await loadContacts()
  const rows = res.rows.filter((c) => !isOwn(c))
  const data = summarize(rows, DAYS[period.key] ?? 7)
  return (
    <DashboardShell current="crm" title="Contacts" intro="Les lecteurs de « La lettre du jardin » (Brevo, liste 6), lus chez Brevo à l’ouverture de la page." period={period.key} notice={res.ok ? null : 'La liste Brevo n’est pas lisible pour le moment.'}>
      <CrmNav period={period.key} current="" />
      <Tiles>
        <TextTile label="Contacts" value={n(data.total)} />
        <TextTile label="Abonnés" value={n(data.subscribed)} />
        <TextTile label={`Nouveaux sur ${period.long}`} value={`+${n(data.added)}`} />
      </Tiles>
      <div className="grid grid--2">
        <Card title="À regarder">
          <ul className="rows">
            {data.watch.map((w) => (
              <li key={w.label} className="row-top">
                <span>{w.label}</span>
                <span>{n(w.value)}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="D’où viennent les contacts" note="formulaire d’inscription">
          <BarList rows={data.sources.slice(0, 10)} total={data.total} empty="Aucun contact pour le moment." />
        </Card>
      </div>
    </DashboardShell>
  )
}

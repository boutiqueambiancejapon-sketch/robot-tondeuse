import { isOwn, summarize } from '@/lib/dashboard/crm'
import { n } from '@/lib/dashboard/format'
import { openTab, type TabPageProps } from '@/lib/dashboard/tab-page'
import { getPool } from '@/lib/server/db'
import { loadContacts } from '@/lib/server/dashboard/crm'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { TextTile, Tiles } from '@/components/dashboard/Tiles'
import { CrmNav } from '@/components/dashboard/crm/CrmNav'
import { Funnel } from '@/components/dashboard/traffic/Funnel'

// Contacts (CRM), where they stand: from the list to an account that comes back, what deserves a
// look, where contacts come from.

export const dynamic = 'force-dynamic'

const DAYS: Record<string, number> = { '24h': 1, '7j': 7, '30j': 30, '90j': 90 }

export default async function CrmTab(props: TabPageProps) {
  const period = await openTab(props)
  const res = await loadContacts(getPool())
  const rows = res.rows.filter((c) => !isOwn(c))
  const data = summarize(rows, DAYS[period.key] ?? 7)
  const notice = res.ok ? null : res.listRead ? 'Les comptes ne sont pas lisibles pour le moment.' : 'La liste Brevo n’est pas lisible pour le moment : seuls les comptes sont comptés.'
  return (
    <DashboardShell current="crm" title="Contacts" intro="Abonnés à la liste « 10 Min Languages » (Brevo, liste 7) et comptes gratuits, réunis par adresse." period={period.key} notice={notice}>
      <CrmNav period={period.key} current="" />
      <Tiles>
        <TextTile label="Contacts" value={n(data.total)} />
        <TextTile label={`Nouveaux sur ${period.long}`} value={`+${n(data.added)}`} />
      </Tiles>
      <div className="grid grid--2">
        <Card title="De la liste au compte actif">
          <Funnel steps={data.funnel} empty="Aucun contact pour le moment." />
          <p className="tiny muted">« Revenus » : comptes reconnectés ces 30 jours, au moins un jour après leur création. Un abonné sans compte n’est pas reconnu sur le site.</p>
        </Card>
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
        <Card title="D’où viennent les contacts" note="kit demandé ou compte">
          <BarList rows={data.sources.slice(0, 10)} total={data.total} empty="Aucun contact pour le moment." />
        </Card>
      </div>
    </DashboardShell>
  )
}

import { notFound } from 'next/navigation'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { calendarDay, n, pct } from '@/lib/dashboard/format'
import { getBrevo } from '@/lib/server/dashboard/brevo'
import { Card, Empty } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

export const dynamic = 'force-dynamic'

const STATUS: Record<string, string> = { sent: 'Envoyée', draft: 'Brouillon', queued: 'En attente', scheduled: 'Programmée', suspended: 'Suspendue', archive: 'Archivée' }

export default async function EmailsPage() {
  if (!(await dashboardAllowed())) notFound()
  const b = await getBrevo()
  return (
    <DashboardShell current="emails" title="E-mails" intro="« La lettre du jardin » chez Brevo (liste 6) et ses campagnes. Chiffres relus toutes les 5 minutes.">
      {!b.configured && <p className="alert">Clé Brevo absente du serveur.</p>}
      {b.domain && !b.domain.authenticated && (
        <p className="alert">Domaine quel-robot-tondeuse.com pas encore authentifié chez Brevo : à faire avant la première campagne.</p>
      )}
      {b.domain?.authenticated && <p className="okline">Domaine quel-robot-tondeuse.com authentifié chez Brevo.</p>}
      <Card title="Inscrits" note="la lettre n’envoie aucun e-mail automatique">
        {b.list ? (
          <dl className="facts">
            <dt>Abonnés à la liste</dt>
            <dd className="num">{n(b.list.subscribers)}</dd>
            <dt>Contacts dans la liste</dt>
            <dd className="num">{n(b.list.total)}</dd>
          </dl>
        ) : (
          <Empty>Liste illisible pour l’instant.</Empty>
        )}
      </Card>
      <Card title="Dernières campagnes" note="ouvertures · clics">
        {b.campaigns.length === 0 ? (
          <Empty>Aucune campagne envoyée à cette liste pour l’instant.</Empty>
        ) : (
          <div className="tbl-w">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Campagne</th>
                  <th className="n">Reçus</th>
                  <th className="n">Ouv.</th>
                  <th className="n">Clics</th>
                </tr>
              </thead>
              <tbody>
                {b.campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.subject || c.name}
                      <span className="tiny muted"> · {STATUS[c.status] ?? c.status}{c.sentDate ? `, ${calendarDay(c.sentDate.slice(0, 10))}` : ''}</span>
                    </td>
                    <td className="n">{n(c.delivered)}</td>
                    <td className="n">{pct(c.opens, c.delivered)}</td>
                    <td className="n">{pct(c.clicks, c.delivered)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </DashboardShell>
  )
}

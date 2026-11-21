import { notFound } from 'next/navigation'
import { dashboardSession } from '@/lib/dashboard/guard'
import { ago, when } from '@/lib/dashboard/format'
import { factorIsRecent } from '@/lib/dashboard/policy'
import { factorsSummary, listPasskeys } from '@/lib/server/login/factors'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { EnrollFlow } from '@/components/dashboard/login/EnrollFlow'
import { SecurityJournal } from '@/components/dashboard/login/SecurityJournal'
import { SecuritySessions } from '@/components/dashboard/login/SecuritySessions'
import { sessionStageLabel } from '@/lib/dashboard/login-labels'
import { readSecurity } from '@/lib/server/login/security-data'

export const dynamic = 'force-dynamic'

export default async function SecurityPage() {
  const session = await dashboardSession()
  if (!session) notFound()
  const [keys, factors, security] = await Promise.all([listPasskeys(), factorsSummary(), readSecurity()])
  const canAdd = factorIsRecent(session.factorAt, new Date())
  return (
    <DashboardShell current="securite" title="Sécurité" intro={`Connecté depuis ${session.deviceLabel || 'cet appareil'}, session ouverte ${ago(session.createdAt)}.`}>
      <Card title="Accès enregistrés">
        <dl className="facts">
          {keys.map((k) => (
            <div key={k.credentialId} className="contents">
              <dt>Face ID · {k.label}</dt>
              <dd className="small">{k.lastUsedAt ? `utilisé ${ago(k.lastUsedAt)}` : `ajouté le ${when(k.createdAt)}`}</dd>
            </div>
          ))}
          <dt>Code à 6 chiffres</dt>
          <dd className="small">{factors.totp ? 'activé' : 'non activé'}</dd>
        </dl>
      </Card>
      <Card title="Ajouter un accès">
        {canAdd ? <EnrollFlow mode="security" hasTotp={factors.totp} /> : <p className="small muted">Par sécurité, déconnecte-toi puis reconnecte-toi : l’ajout est possible pendant 15 minutes après la connexion.</p>}
      </Card>
      <SecuritySessions
        sessions={security.sessions.map((s) => ({ id: s.id, label: s.deviceLabel || 'Appareil inconnu', meta: `${sessionStageLabel(s.stage)}, vue ${ago(s.lastSeenAt)}`, current: s.id === session.id }))}
      />
      <SecurityJournal events={security.events} />
    </DashboardShell>
  )
}

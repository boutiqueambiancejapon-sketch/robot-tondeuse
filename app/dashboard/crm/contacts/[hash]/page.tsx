import Link from 'next/link'
import { notFound } from 'next/navigation'
import { statusOf } from '@/lib/dashboard/crm'
import { ago, when } from '@/lib/dashboard/format'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { getPool } from '@/lib/server/db'
import { loadContacts } from '@/lib/server/dashboard/crm'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

// One contact: list status and source (Brevo), account and profile. The URL carries a keyed hash only.

export const dynamic = 'force-dynamic'

const dash = (v: string | number | null | undefined) => (v === null || v === undefined || v === '' ? '–' : String(v))

export default async function ContactPage({ params }: { params: Promise<{ hash: string }> }) {
  if (!(await dashboardAllowed())) notFound()
  const { hash } = await params
  if (!/^[0-9a-f]{24}$/.test(hash)) notFound()
  const c = (await loadContacts(getPool())).rows.find((r) => r.hash === hash)
  if (!c) notFound()
  const s = statusOf(c)
  const a = c.account
  return (
    <DashboardShell current="crm" sub="/contacts" title="Fiche d’un contact" intro={c.email}>
      <Link href="/dashboard/crm/contacts" className="lnk small">Retour aux contacts</Link>
      <div className="grid grid--2">
        <Card title="Liste « 10 Min Languages »" note={s.label}>
          <dl className="facts">
            <dt>Sur la liste</dt>
            <dd>{c.list ? (c.list.unsubscribed ? 'Désinscrit' : 'Oui') : 'Non'}</dd>
            <dt>Contact Brevo créé</dt>
            <dd>{c.list?.at ? when(c.list.at) : '–'}</dd>
            <dt>Venu par</dt>
            <dd>{dash(c.list?.source)}</dd>
          </dl>
          <p className="tiny muted">Les campagnes partent depuis Brevo : leurs ouvertures se lisent dans l’onglet E-mails, pas par personne.</p>
        </Card>
        <Card title="Compte">
          {a ? (
            <dl className="facts">
              <dt>Créé</dt>
              <dd>{when(a.createdAt)}</dd>
              <dt>Dernière connexion</dt>
              <dd>{ago(a.lastLoginAt)}</dd>
              <dt>Langue</dt>
              <dd>{dash(a.lang)}</dd>
              <dt>Niveau</dt>
              <dd>{dash(a.level)}</dd>
              <dt>Objectif</dt>
              <dd>{dash(a.goal)}</dd>
              <dt>Minutes par jour</dt>
              <dd>{dash(a.minutes)}</dd>
              <dt>Budget cours payants</dt>
              <dd>{dash(a.budget)}</dd>
              <dt>Exercice du jour</dt>
              <dd>{a.daily.length ? a.daily.join(', ') : '–'}</dd>
              <dt>Mots dans le carnet</dt>
              <dd>{a.notebook}</dd>
            </dl>
          ) : (
            <p className="small muted">Pas de compte sur le site.</p>
          )}
        </Card>
      </div>
    </DashboardShell>
  )
}

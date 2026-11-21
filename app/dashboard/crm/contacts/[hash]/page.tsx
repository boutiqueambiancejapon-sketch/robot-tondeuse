import Link from 'next/link'
import { notFound } from 'next/navigation'
import { statusOf } from '@/lib/dashboard/crm'
import { when } from '@/lib/dashboard/format'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { loadContacts } from '@/lib/server/dashboard/crm'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

// One contact: list status and source (Brevo). The URL carries a keyed hash only.

export const dynamic = 'force-dynamic'

export default async function ContactPage({ params }: { params: Promise<{ hash: string }> }) {
  if (!(await dashboardAllowed())) notFound()
  const { hash } = await params
  if (!/^[0-9a-f]{24}$/.test(hash)) notFound()
  const c = (await loadContacts()).rows.find((r) => r.hash === hash)
  if (!c) notFound()
  const s = statusOf(c)
  return (
    <DashboardShell current="crm" sub="/contacts" title="Fiche d’un contact" intro={c.email}>
      <Link href="/dashboard/crm/contacts" className="lnk small">Retour aux contacts</Link>
      <Card title="« La lettre du jardin »" note={s.label}>
        <dl className="facts">
          <dt>Abonné</dt>
          <dd>{c.list.unsubscribed ? 'Désinscrit' : 'Oui'}</dd>
          <dt>Contact Brevo créé</dt>
          <dd>{c.list.at ? when(c.list.at) : '–'}</dd>
          <dt>Dernière modification</dt>
          <dd>{c.list.modified ? when(c.list.modified) : '–'}</dd>
          <dt>Inscrit depuis</dt>
          <dd>{c.list.source ?? '–'}</dd>
          <dt>Autres listes Brevo</dt>
          <dd>{c.list.otherLists > 0 ? `${c.list.otherLists} (compte Brevo partagé avec Toutou Gourmet)` : 'Aucune'}</dd>
        </dl>
        <p className="tiny muted">Les campagnes partent depuis Brevo : leurs ouvertures se lisent dans l’onglet E-mails, pas par personne.</p>
      </Card>
    </DashboardShell>
  )
}

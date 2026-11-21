import { TZ } from '@/lib/dashboard/period'
import { eventKindLabel, eventOutcomeLabel } from '@/lib/dashboard/login-labels'
import type { EventRow } from '@/lib/server/login/security-data'
import { Card, Empty } from '../Card'

// Login journal: 30 latest lines. The 6 characters of the keyed hash tell addresses apart without revealing them.

const when = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short', timeZone: TZ })

export function SecurityJournal({ events }: { events: EventRow[] }) {
  return (
    <Card title="Journal des connexions" note="30 dernières lignes">
      {events.length === 0 ? (
        <Empty>Aucune connexion enregistrée.</Empty>
      ) : (
        <ul className="rows">
          {events.map((e) => (
            <li key={e.id} className="small">
              <strong>{eventKindLabel(e.kind)}</strong> : <span className={e.outcome === 'success' ? '' : 'hot'}>{eventOutcomeLabel(e.outcome)}</span>
              <span className="row-sub">
                {when.format(e.at)}
                {e.deviceLabel ? ` · ${e.deviceLabel}` : ''}
                {e.ip ? ` · adresse ${e.ip}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

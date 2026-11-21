import { n, pct } from '@/lib/dashboard/format'
import type { TransacStats } from '@/lib/server/dashboard/brevo'
import { Card, Empty } from '../Card'

/** Transactional emails per kind (Brevo tag), 30 days: sent, delivered, opened, clicked, problems. */
export function TransacList({ rows }: { rows: TransacStats[] | null }) {
  return (
    <Card title="E-mails automatiques" note="30 derniers jours, Brevo">
      {rows === null ? (
        <Empty>Statistiques Brevo illisibles pour l’instant.</Empty>
      ) : (
        <ul className="rows">
          {rows.map((r) => {
            const problems = r.bounces + r.blocked + r.spam
            return (
              <li key={r.tag}>
                <span className="row-top">
                  <span>{r.label}</span>
                  <span>{n(r.requests)} envoyés</span>
                </span>
                <span className="row-sub">
                  {n(r.delivered)} reçus · ouverts {pct(r.opens, r.delivered)} · cliqués {pct(r.clicks, r.delivered)}
                  {problems > 0 ? ` · ${n(problems)} en échec (rebonds, bloqués, spam)` : ''}
                </span>
              </li>
            )
          })}
        </ul>
      )}
      <p className="tiny muted">Ouvertures sous-estimées : beaucoup de messageries bloquent le pixel de suivi, ou l’ouvrent toutes seules (Apple).</p>
    </Card>
  )
}

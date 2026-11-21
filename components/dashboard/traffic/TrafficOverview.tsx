import { n, pct } from '@/lib/dashboard/format'
import type { Period } from '@/lib/dashboard/period'
import { durationLabel, type Overview } from '@/lib/dashboard/traffic'
import type { TrafficTotals } from '@/lib/server/dashboard/sessions'
import { Card } from '../Card'
import { DeltaTile, TextTile, Tiles } from '../Tiles'

// Traffic overview: figures against the previous period, then what the visits bring.

const whole = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 0 })
const dec = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

function bounceNote({ current, previous }: Overview['bounce']): { text: string; tone?: 'up' | 'down' } {
  if (current === null || previous === null) return { text: 'Sans comparaison' }
  const points = Math.round((current - previous) * 100)
  if (points === 0) return { text: '=' }
  // A bounce going up is bad news: colours are reversed.
  return points > 0 ? { text: `+${points} pts`, tone: 'down' } : { text: `−${-points} pts`, tone: 'up' }
}

export function TrafficTiles({ overview, totals, period }: { overview: Overview; totals: TrafficTotals; period: Period }) {
  const bounce = bounceNote(overview.bounce)
  return (
    <Tiles five>
      <DeltaTile label="Visiteurs" pair={overview.visitors} period={period} />
      <DeltaTile label="Sessions" pair={overview.sessions} period={period} />
      <DeltaTile label="Pages vues" pair={totals.views} period={period} />
      <TextTile label="Rebond" value={overview.bounce.current === null ? '–' : whole.format(overview.bounce.current)} note={bounce.text} tone={bounce.tone} />
      <TextTile
        label="Durée d’une session"
        value={overview.seconds === null ? '–' : durationLabel(overview.seconds)}
        note={overview.pagesPerSession === null ? 'Estimation basse' : `${dec.format(overview.pagesPerSession)} pages par session`}
      />
    </Tiles>
  )
}

export function Earnings({ totals, overview }: { totals: TrafficTotals; overview: Overview }) {
  const lines = [
    { label: 'Clics vers Preply', value: totals.clicks.current, rate: overview.rates.clicks },
    { label: 'Kits demandés', value: totals.kits.current, rate: overview.rates.kits },
    { label: 'Inscrits à la liste', value: totals.signups.current, rate: overview.rates.signups },
    { label: 'Outils et exercices', value: totals.tools.current + totals.daily.current, rate: overview.rates.tools },
  ]
  return (
    <Card title="Ce que ça rapporte" note="nombre · part des sessions">
      <ul className="rows">
        {lines.map((l) => (
          <li key={l.label} className="row-top">
            <span>{l.label}</span>
            <span>
              {n(l.value)} <small className="muted">{pct(l.rate, 1)}</small>
            </span>
          </li>
        ))}
      </ul>
      <p className="tiny muted">La part compte les sessions où l’action a eu lieu au moins une fois.</p>
    </Card>
  )
}

export const TRAFFIC_LIMITS =
  'Visites lues dans le journal du serveur, sans cookie. Quelqu’un qui revient un autre jour compte comme un nouveau visiteur (le code visiteur change chaque jour). La durée s’arrête à la dernière page ou action : le temps passé sur la dernière page n’est pas compté. Mesure depuis le 19 novembre 2026, pays depuis le 21.'

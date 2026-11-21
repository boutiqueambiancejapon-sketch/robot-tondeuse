import type { Period } from '@/lib/dashboard/period'
import type { Bucket, TrafficTotals } from '@/lib/server/dashboard/sessions'
import type { Pair } from '@/lib/dashboard/compare'
import { Columns } from '../Columns'
import { DeltaTile, Tiles } from '../Tiles'

// "Ça progresse ?": the big tile (Preply clicks, the income) carries the chart per day or hour,
// then a few figures, each compared with the period before. Adapted from Toutou.

interface Props {
  totals: TrafficTotals
  sessions: Pair
  clicks: Bucket[]
  period: Period
  insight: string
}

export function HomeKpis({ totals, sessions, clicks, period, insight }: Props) {
  return (
    <section className="stack" aria-labelledby="progression">
      <div>
        <h2 id="progression">Ça progresse ?</h2>
        <p className="small muted">Sur {period.long}, chaque écart par rapport {period.previous}.</p>
      </div>
      <Tiles>
        <DeltaTile label="Revenus possibles : clics vers Preply" pair={totals.clicks} period={period} hero>
          <Columns buckets={clicks} hourly={period.bucket === 'hour'} label="Clics vers Preply" size="s" empty="Aucun clic vers Preply sur la période." />
        </DeltaTile>
        <DeltaTile label="Visiteurs" pair={totals.visitors} period={period} />
        <DeltaTile label="Sessions" pair={sessions} period={period} />
        <DeltaTile label="Kits demandés" pair={totals.kits} period={period} />
        <DeltaTile label="Inscrits à la liste" pair={totals.signups} period={period} />
        <DeltaTile label="Comptes créés" pair={totals.accounts} period={period} />
        <DeltaTile label="Exercices du jour" pair={totals.daily} period={period} />
        <DeltaTile label="Outils utilisés" pair={totals.tools} period={period} />
        <DeltaTile label="Pages lues par une IA" pair={totals.ai} period={period} />
      </Tiles>
      <p className="callout">
        <strong>À retenir sur {period.long} : </strong>
        {insight}
      </p>
    </section>
  )
}

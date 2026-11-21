import { countryName } from '@/lib/dashboard/country'
import { TZ } from '@/lib/dashboard/period'
import type { LiveData, LiveEvent, LiveRow } from '@/lib/server/dashboard/live'
import { Empty } from '../Card'

// Display pieces of the "En direct" view (no hooks: rendered inside the client island).

const LABELS: Record<string, string> = {
  pageview: 'Page vue',
  affiliate_click: 'Clic vers un marchand',
  quiz_result: 'Résultat du quiz',
  tool_use: 'Outil utilisé',
  newsletter_signup: 'Inscription à la lettre',
}
const KIND: Record<string, string> = { ai_training: 'entraînement', ai_search: 'moteur IA', ai_user: 'lecture en direct' }
const DEVICE: Record<string, string> = { mobile: 'téléphone', tablet: 'tablette', desktop: 'ordinateur' }
const time = new Intl.DateTimeFormat('fr-FR', { timeStyle: 'medium', timeZone: TZ })

export function MinuteBars({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(1, ...values)
  return (
    <figure className="chart">
      <div className="cols cols--s" role="img" aria-label={`${label} par minute sur les 30 dernières minutes : ${values.join(', ')}`}>
        {values.map((v, i) => (
          <span key={i} className={`col${v ? '' : ' col--zero'}`} title={`il y a ${29 - i} min : ${v}`}>
            <span style={{ height: `${Math.max(4, (v / max) * 100)}%` }} />
          </span>
        ))}
      </div>
      <figcaption className="axis">
        <span>il y a 30 min</span>
        <span>maintenant</span>
      </figcaption>
    </figure>
  )
}

export function MiniList({ rows, empty, format }: { rows: LiveRow[]; empty: string; format?: (label: string) => string }) {
  if (!rows.length) return <Empty>{empty}</Empty>
  return (
    <ul className="rows">
      {rows.map((r) => (
        <li key={r.label} className="row-top">
          <span>{format ? format(r.label) : r.label}</span>
          <span>{r.value}</span>
        </li>
      ))}
    </ul>
  )
}

export function Feed({ items }: { items: LiveEvent[] }) {
  if (!items.length) return <Empty>Aucune activité pour l’instant.</Empty>
  return (
    <ol className="rows feed">
      {items.map((e, i) => (
        <li key={`${e.ts}-${i}`}>
          <time dateTime={e.ts}>{time.format(new Date(e.ts))}</time>
          <span className="small">
            <span className={e.name === 'pageview' ? '' : 'hot'}>{LABELS[e.name] ?? e.name}</span>
            {e.detail && <span> · {e.detail}</span>}
            <span className="row-sub">
              {e.page}
              {e.ref ? ` · depuis ${e.ref}` : ''}
              {e.device ? ` · ${DEVICE[e.device] ?? e.device}` : ''}
              {e.country ? ` · ${countryName(e.country)}` : ''}
            </span>
          </span>
        </li>
      ))}
    </ol>
  )
}

export function Bots({ items }: { items: LiveData['bots'] }) {
  if (!items.length) return <Empty>Aucun robot d’IA sur les 30 dernières minutes.</Empty>
  return (
    <ol className="rows feed">
      {items.map((b, i) => (
        <li key={`${b.ts}-${i}`}>
          <time dateTime={b.ts}>{time.format(new Date(b.ts))}</time>
          <span className="small">
            <strong>{b.label}</strong> <span className="muted">({KIND[b.kind] ?? b.kind})</span>
            <span className="row-sub">{b.path}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

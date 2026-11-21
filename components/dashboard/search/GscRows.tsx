import { n } from '@/lib/dashboard/format'
import type { GscRow } from '@/lib/server/dashboard/search-console'
import { Card, Empty } from '../Card'

// Search Console list: query or page, clicks on the right, impressions, click rate and position below.

const pct = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 })
const short = (url: string) => url.replace(/^https:\/\/(www\.)?10minlanguages\.com/, '') || '/'
const pos = (p: number) => p.toFixed(1).replace('.', ',')

export function GscRows({ title, intro, rows, page = false }: { title: string; intro?: string; rows: GscRow[]; page?: boolean }) {
  return (
    <Card title={title}>
      {intro && <p className="tiny muted">{intro}</p>}
      {rows.length === 0 ? (
        <Empty>Rien pour l’instant.</Empty>
      ) : (
        <ul className="rows">
          {rows.map((l) => (
            <li key={l.keys.join('|')}>
              <span className="row-top">
                <span>{page ? short(l.keys[0] ?? '') : l.keys[0]}</span>
                <span>{n(l.clicks)} clic{l.clicks > 1 ? 's' : ''}</span>
              </span>
              <span className="row-sub">
                {n(l.impressions)} affichages · {pct.format(l.ctr)} · position {pos(l.position)}
                {l.keys[1] ? ` · ${short(l.keys[1])}` : ''}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

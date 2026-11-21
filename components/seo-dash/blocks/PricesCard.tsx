import type { ContentData } from '@/lib/server/dashboard/content'
import { dayLabel, n0 } from '@/lib/seo-dash/format'
import { Card } from '../ui/Card'

// SEO dashboard, Contenu & notes (QRT): the robot sheets (content/produits) and the weekly Cdiscount / Fnac price
// reading (qrt-offres.timer, Monday night, then a deploy), kept from the former Contenu tab.

interface Props {
  content: Pick<ContentData, 'products' | 'prices'>
  lastRun: Date | null
  nextRun: Date | null
  ok: boolean
}

const iso = (d: Date) => d.toISOString().slice(0, 10)

export function PricesCard({ content, lastRun, nextRun, ok }: Props) {
  const { products, prices } = content
  return (
    <Card title="Fiches robot et relevé des prix" desc="Relevé automatique Cdiscount et Fnac chaque lundi, mis en ligne ensuite">
      <p className="sd-kv">
        <span>
          Fiches robot <b>{n0(products)}</b>
        </span>
        <span>
          Prix relevés <b>{n0(prices.offers)}</b> sur {n0(prices.robots)} robots
        </span>
        <span>
          Dernier prix daté <b>{prices.latest ? dayLabel(prices.latest) : '–'}</b>
        </span>
      </p>
      <p className="sd-small sd-muted">
        Dernier relevé : {lastRun ? dayLabel(iso(lastRun)) : '–'}
        {ok ? '' : ' (en échec, voir Serveur)'} · prochain : {nextRun ? dayLabel(iso(nextRun)) : 'chaque lundi'}
      </p>
    </Card>
  )
}

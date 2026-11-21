import { amazonHref } from '@/lib/utils/affiliate'
import { offresRelevees } from '@/lib/offres-releves'
import { formatDate, formatPrix } from '@/lib/offres-format'

type Props = { name: string; amazonUrl: string; amazonPrice?: string }

/**
 * Lignes de prix d'un robot : Amazon (prix indicatif) puis Cdiscount et Fnac quand le robot est dans leurs flux
 * (prix relevé et daté). Le prix le plus bas est en vert. Sans état : utilisable côté serveur comme côté client.
 */
export function PriceRows({ name, amazonUrl, amazonPrice }: Props) {
  const autres = offresRelevees(name)
  const bas = autres.length ? Math.min(...autres.map((o) => o.prix ?? Infinity)) : Infinity
  const rows = [
    { marchand: 'Amazon', url: amazonHref(amazonUrl, name), prix: amazonPrice ? `${amazonPrice}` : 'Voir le prix', note: 'prix indicatif', best: false },
    ...autres.map((o) => ({
      marchand: o.marchand,
      url: o.url,
      prix: o.prix ? formatPrix(o.prix) : 'Voir le prix',
      note: o.date ? `relevé le ${formatDate(o.date)}` : '',
      best: o.prix === bas,
    })),
  ]
  return (
    <ul className="prices" aria-label={`Prix de ${name}`} data-place="lignes-prix" data-robot={name}>
      {rows.map((r) => (
        <li key={r.marchand} className={r.best ? 'best' : undefined}>
          <a href={r.url} rel="sponsored nofollow noopener" target="_blank">
            <span className="m">
              {r.marchand}
              {r.note ? <small>{r.note}</small> : null}
            </span>
            <b className="num">{r.prix}</b>
            <span className="go" aria-hidden="true">Voir</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

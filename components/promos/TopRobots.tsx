import Image from 'next/image'
import { PriceRows } from '@/components/blog/PriceRows'
import type { PromoRobot } from '@/lib/promos'

/**
 * Les robots les plus haut de gamme d'une marque, avec le prix chez chaque marchand.
 * Prix Amazon indicatif, Cdiscount et Fnac relevés et datés quand le robot est dans leurs flux. Aucun prix barré.
 */
export function TopRobots({ robots }: { robots: PromoRobot[] }) {
  return (
    <div className="stack">
      {robots.map((r) => (
        <article key={r.slug} className="card stack">
          <div className="top-robot">
            {r.image ? <Image src={r.image} alt="" width={152} height={116} sizes="76px" /> : null}
            <div>
              <h3>{r.name}</h3>
              <p className="dated">Prix indicatif de la fiche : {r.prix}</p>
            </div>
          </div>
          <PriceRows name={r.name} amazonUrl={r.amazonUrl ?? ''} />
        </article>
      ))}
    </div>
  )
}

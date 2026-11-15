import Link from 'next/link'
import { niche } from '@/niche.config'
import { FOOTER_V2 } from '@/lib/menu-v2'
import { Mascotte } from './Mascotte'

/** Pied de page V2 : liens utiles et rappel de la méthode. */
export function Footer() {
  return (
    <div className="v2" style={{ display: 'contents' }}>
      <footer className="foot">
        <div className="wrap">
          <p className="foot-top">
            <Mascotte pose="side" size={54} />
            {niche.siteName}
          </p>
          <ul>
            {FOOTER_V2.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <p>
            Nous n’essayons pas les robots. Nos avis comparent les fiches des fabricants et des sources lues. Les liens vers les
            marchands sont des liens partenaires.
          </p>
        </div>
      </footer>
    </div>
  )
}

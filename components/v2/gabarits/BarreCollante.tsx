'use client'
/**
 * BarreCollante — seul élément collé en bas de l'écran (design V2, règle 7) : produit ou n° 1, note et prix daté, un bouton.
 * Elle apparaît après 400 px de défilement, sans animation si prefers-reduced-motion (style .buybar).
 */
import { useEffect, useState } from 'react'
import { affiliateHref } from '@/lib/utils/affiliate'
import type { OffreGabarit } from './BoutonMarchand'

type Props = { titre: string; detail: string; offre: OffreGabarit; libelle?: string; place?: string }

export function BarreCollante({ titre, detail, offre, libelle = 'Voir l’offre', place = 'barre-collante' }: Props) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const suivre = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', suivre, { passive: true })
    suivre()
    return () => window.removeEventListener('scroll', suivre)
  }, [])
  return (
    <div className={visible ? 'buybar show' : 'buybar'} role="complementary" aria-label="Offre partenaire" inert={!visible} data-place={place}>
      <div className="buybar-t">
        <b>{titre}</b>
        <span>{detail}</span>
      </div>
      <a className="btn g-btn" href={affiliateHref(offre.url)} rel="sponsored nofollow noopener" target="_blank">
        {libelle}
      </a>
    </div>
  )
}

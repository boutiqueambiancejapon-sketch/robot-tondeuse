'use client'

/**
 * StickyCTA — la barre d'achat de l'article (.buybar), seul élément collé en bas de l'écran.
 * Elle apparaît après 400 px de défilement et reprend le premier lien `stickyCta` de l'article.
 * 'use client' isolé : la page article reste un Server Component.
 */

import { useState, useEffect } from 'react'
import { merchantLink, wording, type StickyCTAItem } from './sticky-wording'

type Props = {
  items?: StickyCTAItem[]
  /** Phrase d'accroche de l'article, affichée quand le lien n'a pas de nom de produit. */
  message?: string
}

export function StickyCTA({ items, message }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const item = items?.[0]
  if (!item?.url) return null

  const { title, button } = wording(item.label, message)
  const { href, rel } = merchantLink(item.url)

  return (
    <div className={visible ? 'buybar show' : 'buybar'} role="complementary" aria-label="Offre partenaire" inert={!visible}>
      <div className="buybar-t">
        <b>{title}</b>
        <span>Lien partenaire · prix à vérifier</span>
      </div>
      <a className="btn" href={href} rel={rel} target="_blank">
        {button}
      </a>
    </div>
  )
}

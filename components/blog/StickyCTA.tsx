'use client'

/**
 * StickyCTA — barre CTA flottante dual-button (Atelier Vert).
 *
 * Pattern CRO : deux CTAs distincts dans la même pill forest-deep —
 *   • Gauche  : transparent, pastille verte pulsante, "Pas sûr ? Lancer le quiz"
 *   • Droite  : copper bg, "Sûr de votre choix ?" + "Meilleur prix →"
 *
 * Apparait après scroll > 400px. Mobile : empile en colonne sous 640px.
 * 'use client' isolé — la page article reste Server Component.
 *
 * Backward compat : accepte l'ancienne prop `items` (premier item devient le
 * buy CTA) — pas besoin de toucher aux pages tant qu'on migre pas.
 */

import { useState, useEffect } from 'react'
import { addAffiliateTag } from '@/lib/utils/affiliate'

export type StickyCTAItem = {
  label: string
  url: string
}

type Props = {
  /** Lien "Sûr de votre choix ?" (Amazon en général). */
  buyUrl?: string
  /** Label du bouton acheter. Default : "Meilleur prix →" */
  buyLabel?: string
  /** Lien quiz. Default : "/quiz" */
  quizUrl?: string
  /** Message contextuel optionnel au-dessus de la pill. */
  message?: string
  /** Legacy : { label, url }[] — premier item utilisé comme buyUrl. */
  items?: StickyCTAItem[]
}

export function StickyCTA({
  buyUrl,
  buyLabel = 'Meilleur prix →',
  quizUrl = '/quiz',
  message,
  items,
}: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Legacy compat : items[0] devient le buy CTA si buyUrl absent
  const finalBuyUrl = buyUrl ?? items?.[0]?.url
  const finalBuyLabel = buyUrl ? buyLabel : (items?.[0]?.label ?? buyLabel)

  if (!finalBuyUrl) return null

  const isAmazon = finalBuyUrl.includes('amazon.fr') || finalBuyUrl.includes('amzn.to')
  const buyHref = isAmazon ? addAffiliateTag(finalBuyUrl) : finalBuyUrl

  return (
    <div
      role="complementary"
      aria-label="Offre produit"
      style={{
        position: 'fixed',
        bottom: 'var(--space-4)',
        left: '50%',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(calc(100% + 120px))',
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 39,
        width: '94%',
        maxWidth: '620px',
      }}
      className="sticky-cta-wrap"
    >
      {message && (
        <p
          style={{
            margin: '0 0 var(--space-2)',
            textAlign: 'center',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          {message}
        </p>
      )}

      <div className="sticky-cta-pill">
        {/* Quiz CTA — transparent gauche */}
        <a
          href={quizUrl}
          className="sticky-cta-quiz"
          aria-label="Lancer le quiz"
        >
          <span className="sticky-cta-dot" aria-hidden="true">
            <span className="sticky-cta-dot-pulse" />
            <span className="sticky-cta-dot-core" />
          </span>
          <span className="sticky-cta-text">
            <span className="sticky-cta-title">Pas sûr ?</span>
            <span className="sticky-cta-sub">Lancer le quiz · 2 min</span>
          </span>
        </a>

        {/* Buy CTA — copper droite */}
        <a
          href={buyHref}
          rel={isAmazon ? 'nofollow sponsored noopener' : 'noopener'}
          target="_blank"
          className="sticky-cta-buy"
          aria-label={finalBuyLabel}
        >
          <span className="sticky-cta-text">
            <span className="sticky-cta-title">Sûr de votre choix ?</span>
            <span className="sticky-cta-sub">{finalBuyLabel}</span>
          </span>
          <span className="sticky-cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  )
}

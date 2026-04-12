'use client'

/**
 * SeasonCarousel — calendrier du jardinier en carousel horizontal.
 * Embla-carousel-react avec snap + dragFree. 6 mois (Avril → Septembre)
 * chacun avec un conseil d'entretien robot tondeuse.
 * Client Component (embla nécessite les hooks).
 * Casse le rythme vertical de la home entre FeaturedTools et RecentArticles.
 */

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'

type Month = {
  num: string
  name: string
  title: string
  body: string
  accent: string
}

const MONTHS: Month[] = [
  {
    num: '04',
    name: 'Avril',
    title: 'Premier passage',
    body: "Démarrage de saison. On installe le câble périmétrique, on règle la hauteur à 4 cm et on lance un premier cycle de reconnaissance.",
    accent: 'var(--accent-1)',
  },
  {
    num: '05',
    name: 'Mai',
    title: 'Croissance folle',
    body: "Pic de pousse. Programme journalier indispensable. Vérifier que les trajectoires couvrent tout le jardin, même les zones ombragées.",
    accent: 'var(--accent-3)',
  },
  {
    num: '06',
    name: 'Juin',
    title: 'Canicule et sécheresse',
    body: "Remonter la hauteur à 5-6 cm pour protéger les racines. Éviter la tonte entre 11h et 16h — le robot chauffe et la pelouse souffre.",
    accent: 'var(--accent-2)',
  },
  {
    num: '07',
    name: 'Juillet',
    title: 'Entretien des lames',
    body: "Changement de lames tous les deux mois maximum. Vérifier les capteurs de choc et les contacts de la station de charge.",
    accent: 'var(--accent-4)',
  },
  {
    num: '08',
    name: 'Août',
    title: 'Pluie et boue',
    body: "Capteur de pluie obligatoire. Attention aux zones détrempées qui font patiner les roues. Nettoyer le dessous hebdomadairement.",
    accent: 'var(--accent-5)',
  },
  {
    num: '09',
    name: 'Septembre',
    title: 'Dernière tonte',
    body: "Hauteur finale à 4 cm avant l'hiver. Nettoyage complet, démontage du câble si nécessaire, stockage au sec et batterie à 60 %.",
    accent: 'var(--accent-3)',
  },
]

export function SeasonCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps',
  })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    if (!emblaApi) return
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)
    // rAF ensures the initial state sync runs outside the effect body
    const raf = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(raf)
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <section
      aria-label="Calendrier du jardinier"
      style={{
        position: 'relative',
        padding: 'clamp(var(--space-16), 10vw, var(--space-24)) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-surface-2)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-10)',
        }}
      >
        <div className="rule-vertical" style={{ maxWidth: '640px' }}>
          <div
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--accent-2)',
              marginBottom: 'var(--space-3)',
            }}
          >
            · Saison par saison
          </div>
          <h2
            style={{
              fontFamily: 'var(--next-font-display), Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            Calendrier du{' '}
            <span
              style={{
                fontStyle: 'italic',
                color: 'var(--accent-2)',
              }}
            >
              jardinier
            </span>
          </h2>
          <p
            style={{
              marginTop: 'var(--space-4)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '540px',
            }}
          >
            Six mois, six réglages. Les vrais gestes à faire sur votre robot tondeuse entre le réveil d&rsquo;avril et la dernière tonte de septembre.
          </p>
        </div>

        {/* Prev / Next controls */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Mois précédent"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              cursor: canPrev ? 'pointer' : 'not-allowed',
              opacity: canPrev ? 1 : 0.35,
              transition: 'opacity 200ms, transform 200ms',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Mois suivant"
            style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              cursor: canNext ? 'pointer' : 'not-allowed',
              opacity: canNext ? 1 : 0.35,
              transition: 'opacity 200ms, transform 200ms',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Embla viewport */}
      <div ref={emblaRef} style={{ overflow: 'hidden', paddingLeft: 'max(var(--space-6), calc((100vw - 1320px) / 2 + var(--space-6)))' }}>
        <div style={{ display: 'flex', gap: 'var(--space-5)', paddingRight: 'var(--space-6)' }}>
          {MONTHS.map((month) => (
            <article
              key={month.num}
              style={{
                flex: '0 0 clamp(280px, 26vw, 360px)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              className="card-lift"
            >
              {/* Accent glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-80px',
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, color-mix(in srgb, ${month.accent} 25%, transparent) 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                }}
              />
              {/* Month number watermark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  right: '-10px',
                  fontFamily: 'var(--next-font-display), Georgia, serif',
                  fontSize: '13rem',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  lineHeight: 0.8,
                  color: `color-mix(in srgb, ${month.accent} 7%, transparent)`,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {month.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--next-font-mono), monospace',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: month.accent,
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {month.num} — {month.name}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--next-font-display), Georgia, serif',
                    fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-4)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {month.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {month.body}
                </p>
              </div>

              {/* Footer pill */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  marginTop: 'var(--space-6)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: month.accent,
                  }}
                />
                Conseil du mois
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

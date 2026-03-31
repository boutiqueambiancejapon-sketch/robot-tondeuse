/**
 * HeroVisual — colonne droite du héro.
 * Navigation catégories avec indicateurs de terrain (lignes organiques).
 * Chaque catégorie a une barre latérale accent + sous-texte.
 * DA "Terrain & Nature" — cartes terreuses avec bordure gauche.
 * Server Component.
 */
import Link from 'next/link'
import { niche, categoryAccent } from '@/niche.config'

export function HeroVisual() {
  const families = niche.categories.map((cat, i) => ({
    label: cat.label,
    sub: cat.description ?? `Comparatif · Guide · ${niche.dealWord}`,
    href: `/comparer/${cat.slug}`,
    accent: categoryAccent(i),
    index: String(i + 1).padStart(2, '0'),
  }))

  if (families.length === 0) return null

  return (
    <nav
      aria-label={`Catégories de ${niche.entities}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      {families.map(({ label, sub, href, accent, index }) => (
        <Link
          key={index}
          href={href}
          style={{ textDecoration: 'none', display: 'block' }}
          className="hero-family-item"
        >
          <div
            style={{
              padding: 'var(--space-3) 0',
              display: 'grid',
              gridTemplateColumns: '28px 1fr auto',
              gap: 'var(--space-4)',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              transition: 'border-color 200ms ease',
            }}
          >
            {/* Index */}
            <span
              style={{
                fontFamily: 'var(--next-font-mono, monospace)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {index}
            </span>

            {/* Label + sub */}
            <div>
              <p
                className="hero-family-label"
                style={{
                  fontFamily: 'var(--next-font-display), system-ui, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: '0 0 2px',
                  lineHeight: 1.2,
                  transition: 'color 150ms ease',
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  margin: 0,
                  letterSpacing: '0.02em',
                }}
              >
                {sub}
              </p>
            </div>

            {/* Arrow */}
            <span
              className="hero-family-arrow"
              style={{
                fontSize: '16px',
                color: accent,
                opacity: 0,
                transition: 'opacity 150ms ease, transform 150ms ease',
                transform: 'translateX(-6px)',
              }}
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      ))}
    </nav>
  )
}

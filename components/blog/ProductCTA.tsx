/**
 * ProductCTA — carte produit affilié inline, style éditorial magazine.
 * Usage MDX :
 *   <ProductCTA name="Produit X" price="999 €" url="https://..." badge="Recommandé" hook="Description courte." />
 *   <ProductCTA name="Produit X" price="999 €" url="https://..." image="/images/produits/x.webp" badge="Recommandé" hook="Description courte." />
 * Server Component.
 */

import Image from 'next/image'
import { AffiliateLink } from '@/components/ui/AffiliateLink'

type ProductCTAProps = {
  name: string
  price: string
  url: string
  image?: string
  badge?: string
  hook?: string
}

export function ProductCTA({ name, price, url, image, badge, hook }: ProductCTAProps) {
  return (
    <div
      style={{
        margin: 'var(--space-10) 0',
        background: 'var(--cream)',
        border: '1px solid var(--border)',
        borderTop: '3px solid var(--copper)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: 'var(--space-8) var(--space-6)',
          display: image ? 'grid' : 'flex',
          gridTemplateColumns: image ? 'minmax(100px, 160px) 1fr' : undefined,
          gap: image ? 'var(--space-6)' : 'var(--space-3)',
          flexDirection: image ? undefined : 'column',
          alignItems: image ? 'center' : 'center',
          textAlign: image ? 'left' : 'center',
        }}
      >
        {/* Image produit */}
        {image && (
          <div style={{ flexShrink: 0 }}>
            <Image
              src={image}
              alt={name}
              width={160}
              height={160}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: 'var(--radius-md)',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* Contenu */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            alignItems: image ? 'flex-start' : 'center',
          }}
        >
          {/* Badge catégorie */}
          {badge && (
            <span
              style={{
                fontFamily: 'var(--next-font-mono), monospace',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--copper)',
                background: 'var(--copper-pale)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                alignSelf: image ? 'flex-start' : 'center',
              }}
            >
              {badge}
            </span>
          )}

          {/* Nom produit — serif display */}
          <span
            style={{
              fontFamily: 'var(--next-font-display), Georgia, serif',
              fontSize: image ? 'clamp(20px, 2.8vw, 26px)' : 'clamp(22px, 3vw, 30px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}
          >
            {name}
          </span>

          {/* Hook / description */}
          {hook && (
            <p
              style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '400px',
              }}
            >
              {hook}
            </p>
          )}

          {/* Prix — copper mono */}
          <span
            style={{
              fontFamily: 'var(--next-font-mono), monospace',
              fontSize: image ? 'clamp(24px, 4vw, 32px)' : 'clamp(32px, 6vw, 46px)',
              fontWeight: 600,
              color: 'var(--copper)',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {price}
          </span>

          {/* CTA pill */}
          <AffiliateLink
            href={url}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              background: 'var(--forest-deep)',
              color: 'var(--ivory)',
              fontWeight: 500,
              fontSize: '14px',
              padding: 'var(--space-3) var(--space-8)',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
              marginTop: 'var(--space-1)',
              boxShadow: '0 2px 0 0 #0a150e, 0 6px 16px rgba(20, 36, 26, 0.25)',
            }}
          >
            Voir le prix →
          </AffiliateLink>
        </div>
      </div>
    </div>
  )
}

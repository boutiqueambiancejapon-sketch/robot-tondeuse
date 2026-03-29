/**
 * /choisir/[produit] — "Quel [produit] choisir en {year} ?"
 * Structure : hero + quiz interactif + contenu éditorial + FAQ + auteur.
 * Server Component — QuizEngine isolé en 'use client'.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { ChoisirEditorial } from '@/components/choisir/ChoisirEditorial'
import { currentYear } from '@/lib/utils/year'
import { COMPARATEURS, PRODUIT_SLUGS } from '@/lib/comparateur'
import { getChoisirContent } from '@/lib/choisir-content'
import { niche } from '@/niche.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

type Params = Promise<{ produit: string }>

export function generateStaticParams() {
  return PRODUIT_SLUGS.map((produit) => ({ produit }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) return {}
  const year = currentYear()

  return {
    title: `Quel ${data.label} choisir en ${year} ? Guide complet + quiz | ${niche.siteName}`,
    description: `Quel ${data.label} ${niche.entityVerb} en ${year} ? Quiz en 4 questions, comparatif par profil, prix et verdict honnête. Guide mis à jour.`,
    alternates: {
      canonical: `${SITE_URL}/choisir/${produit}`,
    },
    openGraph: {
      title: `Quel ${data.label} choisir en ${year} ?`,
      description: `Quiz en 4 questions, comparatif par profil et verdict honnête pour choisir son ${data.label} en ${year}.`,
      url: `${SITE_URL}/choisir/${produit}`,
      siteName: niche.siteName,
      type: 'article',
    },
  }
}

const HERO_CONFIG: Record<string, { accentRgba: string }> = {
  mammotion: { accentRgba: 'rgba(22,163,74,0.14)' },
  husqvarna: { accentRgba: 'rgba(255,106,0,0.14)' },
  gardena:   { accentRgba: 'rgba(8,145,178,0.14)' },
  worx:      { accentRgba: 'rgba(217,119,6,0.14)' },
  bosch:     { accentRgba: 'rgba(124,58,237,0.14)' },
}

const HeroIcon = () => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="48" height="48" aria-hidden="true" style={{ color: 'var(--accent-1)' }}>
    <rect x="12" y="16" width="24" height="16" rx="8" />
    <circle cx="18" cy="36" r="3" />
    <circle cx="30" cy="36" r="3" />
    <path d="M8 24h4M36 24h4" />
    <path d="M20 10v6M28 10v6" />
  </svg>
)

const PUBLISHED_DATES: Record<string, string> = {
  mammotion: '2026-03-29',
  husqvarna: '2026-03-29',
  gardena: '2026-03-29',
  worx: '2026-03-29',
  bosch: '2026-03-29',
}

export default async function ChoisirPage({ params }: { params: Params }) {
  const { produit } = await params
  const data = COMPARATEURS[produit]
  if (!data) notFound()

  const year = currentYear()
  const hero = HERO_CONFIG[produit] ?? { accentRgba: 'rgba(22,163,74,0.14)' }
  const editorial = getChoisirContent(produit, year)

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: `Choisir son ${data.label}`, item: `${SITE_URL}/choisir/${produit}` },
    ],
  }

  return (
    <main id="main-content">
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 0%, ${hero.accentRgba} 0%, transparent 72%)`,
          padding: 'var(--space-16) var(--space-6) var(--space-12)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div
            aria-hidden="true"
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}
          >
            <HeroIcon />
          </div>
          <h1
            style={{
              fontFamily: 'var(--next-font-display), system-ui, sans-serif',
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)',
              textWrap: 'balance',
            }}
          >
            Quel {data.label} choisir en {year}&nbsp;?
          </h1>
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '520px',
              margin: '0 auto',
            }}
          >
            {data.description}
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section
        aria-labelledby="quiz-titre"
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: 'var(--space-8) var(--space-6) var(--space-4)',
        }}
      >
        <h2
          id="quiz-titre"
          style={{
            fontFamily: 'var(--next-font-display), system-ui, sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          Trouve ton modèle en 4 questions
        </h2>
        <div
          style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(var(--glass-blur))',
            WebkitBackdropFilter: 'blur(var(--glass-blur))',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8)',
          }}
        >
          <QuizEngine defaultProduit={produit} />
        </div>
      </section>

      {/* Editorial content (if available for this product) */}
      {editorial && (
        <ChoisirEditorial
          content={editorial}
          produit={produit}
          publishedAt={PUBLISHED_DATES[produit] ?? '2026-03-24'}
        />
      )}
    </main>
  )
}

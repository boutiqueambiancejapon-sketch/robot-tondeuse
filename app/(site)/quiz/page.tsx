/**
 * /quiz — une question par écran, le robot avance sur la barre (design V2).
 * Server Component — QuizEngine 'use client' isolé pour l'interactivité.
 */

import type { Metadata } from 'next'
import { currentYear } from '@/lib/utils/year'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { quizMerchantLinks } from '@/components/quiz/merchant-links'
import { PageTitle } from '@/components/v2/PageTitle'
import { niche } from '@/niche.config'
import { getPageContent } from '@/lib/cms-pages'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

export function generateMetadata(): Metadata {
  const year = currentYear()
  const question = niche.quiz.question || `Quel ${niche.entity} choisir ${year} ?`
  return {
    title: `${question} Quiz | ${niche.siteName}`,
    description:
      `4 questions pour trouver le ${niche.entity} fait pour votre jardin. Résultat immédiat.`,
    alternates: { canonical: `${SITE_URL}/quiz` },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: question,
      description: `Quiz en 4 questions pour trouver votre ${niche.entity}. Résultat immédiat.`,
      url: `${SITE_URL}/quiz`,
      siteName: niche.siteName,
      type: 'website',
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Quiz', item: `${SITE_URL}/quiz` },
  ],
}

export default function QuizPage() {
  const quizContent = getPageContent('quiz')
  const steps = quizContent?.steps as { id: string; question: string; options: { label: string; value: string; emoji?: string }[] }[] | undefined
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="v2">
        <div className="wrap quiz-page">
          <PageTitle
            title={niche.quiz.question || `Quel ${niche.entity} est fait pour vous ?`}
            crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Quiz' }]}
            meta="4 questions · 2 minutes"
          />
          <QuizEngine steps={steps} merchantLinks={quizMerchantLinks()} />
        </div>
      </main>
    </>
  )
}

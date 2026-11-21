/**
 * /robot-piscine/[slug] — articles de la rubrique « Robots de piscine »
 * (content/articles/robot-piscine/<adresse>.mdx). Même gabarit V2 que les autres articles
 * (components/blog/ArticleView.tsx), avec la carte « Notre choix » et le tableau des prix
 * sur les guides d'achat et les comparatifs. Server Component · ISR 86400s.
 */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPiscineArticle, getPiscineArticles, getPiscineSlugs } from '@/lib/piscine'
import { PISCINE_DOSSIER, PISCINE_LABEL } from '@/lib/utils/piscine'
import { niche } from '@/niche.config'
import { extractToc } from '@/lib/toc'
import { ArticleView } from '@/components/blog/ArticleView'
import { produitsCites } from '@/lib/produits-cites'
import { compileArticle } from '@/components/blog/compile-article'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const RUBRIQUE_URL = `${SITE_URL}/${PISCINE_DOSSIER}`

export const revalidate = 86400

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return getPiscineSlugs().map((slug) => ({ slug }))
}

const absolute = (url: string) => (url.startsWith('/') ? `${SITE_URL}${url}` : url)

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const data = getPiscineArticle(slug)
  if (!data) return {}
  const { meta } = data
  const url = `${RUBRIQUE_URL}/${slug}`
  return {
    title: { absolute: `${meta.title} | ${niche.siteName}` },
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: niche.siteName,
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      ...(niche.author.name ? { authors: [niche.author.name] } : {}),
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description },
  }
}

export default async function PiscineArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const data = getPiscineArticle(slug)
  if (!data) notFound()

  const { meta, content } = data
  const { body, end } = await compileArticle(content, meta)
  // Lectures suivantes : les autres articles de la rubrique seulement.
  const related = getPiscineArticles().filter((a) => a.slug !== slug).slice(0, 3)
  const url = `${RUBRIQUE_URL}/${slug}`

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: PISCINE_LABEL, item: RUBRIQUE_URL },
        { '@type': 'ListItem', position: 3, name: meta.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt ?? meta.publishedAt,
      url,
      ...(meta.featureImage ? { image: [absolute(meta.featureImage)] } : {}),
      author: {
        '@type': 'Person',
        name: niche.author.name || 'Auteur',
        ...(niche.author.title ? { jobTitle: niche.author.title } : {}),
        ...(niche.author.slug ? { url: `${SITE_URL}/auteurs/${niche.author.slug}` } : {}),
      },
      publisher: { '@type': 'Organization', name: niche.siteName, url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    ...(meta.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: meta.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        ]
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ArticleView
        produits={produitsCites(content)}
        slug={slug}
        meta={meta}
        catLabel={PISCINE_LABEL}
        toc={extractToc(content)}
        related={related}
        after={end}
      >
        {body}
      </ArticleView>
    </>
  )
}

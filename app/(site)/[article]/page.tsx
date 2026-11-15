/**
 * /[article] — articles standalone (content/articles/[slug].mdx).
 * Gabarit V2 : components/blog/ArticleView.tsx (une colonne de lecture).
 * Server Component · ISR 86400s.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { getRelatedArticles, CATEGORY_LABELS } from '@/lib/blog'
import { getStandaloneArticle, getAllStandaloneSlugs } from '@/lib/articles'
import { niche } from '@/niche.config'
import { extractToc } from '@/lib/toc'
import { ArticleView } from '@/components/blog/ArticleView'
import { mdxComponents } from '@/components/blog/mdx-components'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

type Params = Promise<{ article: string }>

export function generateStaticParams() {
  return getAllStandaloneSlugs().map((article) => ({ article }))
}

/** Normalise une URL d'image en URL absolue à partir de SITE_URL. */
function absolutizeImageUrl(url: string): string {
  return url.startsWith('/') ? `${SITE_URL}${url}` : url
}

/** Extrait toutes les URLs d'images référencées dans le corps MDX (markdown ![alt](src) + composant <ArticleImage src="...">). */
function extractBodyImageUrls(content: string): string[] {
  const urls = new Set<string>()
  // Syntaxe markdown : ![alt](src) — capture src, ignore les éventuelles parenthèses imbriquées simples.
  const mdRegex = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  let m: RegExpExecArray | null
  while ((m = mdRegex.exec(content)) !== null) urls.add(m[1])
  // Composant <ArticleImage src="..." /> ou <img src="..." />
  const compRegex = /<(?:ArticleImage|img)[^>]*\ssrc=["']([^"']+)["']/g
  while ((m = compRegex.exec(content)) !== null) urls.add(m[1])
  return Array.from(urls)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { article: slug } = await params
  const data = getStandaloneArticle(slug)
  if (!data) return {}

  const { meta } = data
  const url = `${SITE_URL}/${slug}`

  return {
    title: `${meta.title} | ${niche.siteName}`,
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
      // Image : app/(site)/[article]/opengraph-image.tsx (reprise par twitter:image)
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  }
}

export default async function StandaloneArticlePage({ params }: { params: Params }) {
  const { article: slug } = await params
  const data = getStandaloneArticle(slug)
  if (!data) notFound()

  const { meta, content } = data
  const toc = extractToc(content)
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkAmazonAffiliate] } },
    components: mdxComponents,
  })

  const catLabel = CATEGORY_LABELS[meta.categorie] ?? meta.categorie
  const related = getRelatedArticles(meta.categorie, slug, 3)

  // Schema.org Article : featureImage + images du corps (Google recommande ≥1 image, idéalement plusieurs ratios).
  const bodyImagesForSchema = extractBodyImageUrls(content)
  const articleImages = Array.from(
    new Set(
      [meta.featureImage, ...bodyImagesForSchema]
        .filter((u): u is string => Boolean(u))
        .map(absolutizeImageUrl),
    ),
  )

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: catLabel, item: `${SITE_URL}/blog/${meta.categorie}` },
        { '@type': 'ListItem', position: 3, name: meta.title, item: `${SITE_URL}/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt ?? meta.publishedAt,
      url: `${SITE_URL}/${slug}`,
      ...(articleImages.length ? { image: articleImages } : {}),
      author: {
        '@type': 'Person',
        name: niche.author.name || 'Auteur',
        ...(niche.author.title ? { jobTitle: niche.author.title } : {}),
        ...(niche.author.slug ? { url: `${SITE_URL}/auteurs/${niche.author.slug}` } : {}),
      },
      publisher: { '@type': 'Organization', name: niche.siteName, url: SITE_URL },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/${slug}` },
    },
    ...(meta.faq?.length
      ? [{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: meta.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }]
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ArticleView slug={slug} meta={meta} catLabel={catLabel} toc={toc} related={related}>
        {mdxContent}
      </ArticleView>
    </>
  )
}

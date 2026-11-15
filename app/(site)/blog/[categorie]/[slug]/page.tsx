/**
 * /blog/[categorie]/[slug] — article MDX.
 * Gabarit V2 : components/blog/ArticleView.tsx (une colonne de lecture).
 * Server Component · ISR 86400s.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { getAllArticles, getArticleRaw, articleExists, getRelatedArticles } from '@/lib/blog'
import { currentYear } from '@/lib/utils/year'
import { niche } from '@/niche.config'
import { extractToc } from '@/lib/toc'
import { ArticleView } from '@/components/blog/ArticleView'
import { mdxComponents } from '@/components/blog/mdx-components'
import { ToolCTA } from '@/components/blog/ToolCTA'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

type Params = Promise<{ categorie: string; slug: string }>

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(({ categorie, slug }) => ({ categorie, slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { categorie, slug } = await params
  if (!articleExists(categorie, slug)) return {}

  const { meta } = getArticleRaw(categorie, slug)
  const year = currentYear()

  return {
    title: `${meta.title} ${year} | ${niche.siteName}`,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${categorie}/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/blog/${categorie}/${slug}`,
      siteName: niche.siteName,
      type: 'article',
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt ?? meta.publishedAt,
      ...(niche.author.name ? { authors: [niche.author.name] } : {}),
      ...(meta.featureImage ? {
        images: [{
          url: meta.featureImage.startsWith('/') ? `${SITE_URL}${meta.featureImage}` : meta.featureImage,
        }],
      } : {}),
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  niche.categories.map((c) => [c.slug, c.label])
)

export default async function ArticlePage({ params }: { params: Params }) {
  const { categorie, slug } = await params
  if (!articleExists(categorie, slug)) notFound()

  const { meta, content } = getArticleRaw(categorie, slug)
  const toc = extractToc(content)
  const { content: mdxContent } = await compileMDX({
    source: content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, remarkAmazonAffiliate] } },
    components: mdxComponents,
  })
  const related = getRelatedArticles(categorie, slug, 3)

  const catLabel = CATEGORY_LABELS[categorie] ?? categorie

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: catLabel,
          item: `${SITE_URL}/blog/${categorie}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: meta.title,
          item: `${SITE_URL}/blog/${categorie}/${slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.title,
      description: meta.description,
      datePublished: meta.publishedAt,
      dateModified: meta.updatedAt ?? meta.publishedAt,
      url: `${SITE_URL}/blog/${categorie}/${slug}`,
      author: {
        '@type': 'Person',
        name: niche.author.name || 'Auteur',
        ...(niche.author.title ? { jobTitle: niche.author.title } : {}),
        ...(niche.author.slug ? { url: `${SITE_URL}/auteurs/${niche.author.slug}` } : {}),
        ...(niche.author.bio ? { description: niche.author.bio } : {}),
      },
      publisher: {
        '@type': 'Organization',
        name: niche.siteName,
        url: SITE_URL,
      },
    },
    ...(meta.faq && meta.faq.length > 0
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
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ArticleView
        slug={slug}
        meta={meta}
        catLabel={catLabel}
        toc={toc}
        related={related}
        after={<ToolCTA categorie={categorie} />}
      >
        {mdxContent}
      </ArticleView>
    </>
  )
}

/**
 * /[article] — articles standalone (content/articles/[slug].mdx).
 * Layout 2 colonnes : contenu + sidebar (TOC, CTA, related).
 * Server Component · ISR 86400s.
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { getRelatedArticles, articleHref, CATEGORY_LABELS } from '@/lib/blog'
import { AISummarize } from '@/components/blog/AISummarize'
import { getCTAsForCategory } from '@/lib/article-ctas'
import { getStandaloneArticle, getAllStandaloneSlugs } from '@/lib/articles'
import { niche } from '@/niche.config'
import { extractToc } from '@/lib/toc'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
import { Tip } from '@/components/blog/Tip'
import { Warning } from '@/components/blog/Warning'
import { Verdict } from '@/components/blog/Verdict'
import { ProConTable } from '@/components/blog/ProConTable'
import { PullQuote } from '@/components/blog/PullQuote'
import { StatCard, StatRow } from '@/components/blog/StatCard'
import { CompareBar, CompareBarGroup } from '@/components/blog/CompareBar'
import { ProductCTA } from '@/components/blog/ProductCTA'
import { ArticleImage } from '@/components/blog/ArticleImage'
import { AutoProductCTAs } from '@/components/blog/AutoProductCTAs'
import { ProductCarousel } from '@/components/blog/ProductCarousel'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { FaqAccordion } from '@/components/blog/FaqAccordion'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { StickyCTA } from '@/components/blog/StickyCTA'
import { ArticleSidebar } from '@/components/blog/ArticleSidebar'
import { HubArtwork } from '@/components/blog/HubArtwork'
import type { ReactNode } from 'react'

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

  const { meta, content } = data
  const url = `${SITE_URL}/${slug}`

  // Assemble toutes les images de l'article : featureImage en tête, puis images du corps.
  const bodyImages = extractBodyImageUrls(content)
  const allImageUrls = Array.from(
    new Set(
      [meta.featureImage, ...bodyImages]
        .filter((u): u is string => Boolean(u))
        .map(absolutizeImageUrl),
    ),
  )

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
      ...(allImageUrls.length ? { images: allImageUrls.map((u) => ({ url: u })) } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      ...(allImageUrls.length ? { images: allImageUrls } : {}),
    },
  }
}

/** Generates a URL-safe slug matching the TOC extraction. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Recursively extracts text from React children. */
function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) return extractText((node as { props: { children?: ReactNode } }).props.children)
  return ''
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
    components: {
      Tip, Warning, Verdict, ProConTable, PullQuote, StatCard, StatRow, CompareBar, CompareBarGroup, ProductCTA, ArticleImage, ProductCarousel,
      h2: ({ children }: { children: ReactNode }) => {
        const id = slugify(extractText(children))
        return <h2 id={id}>{children}</h2>
      },
      table: ({ children }: { children: ReactNode }) => (
        <div className="table-scroll-wrap"><table>{children}</table></div>
      ),
    },
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

      <ReadingProgress />
      <main id="main-content">
        <article>
          {/* Header — bande forest-deep avec image en fade + infos en surimpression */}
          <div className="article-hero-band" style={{ position: 'relative', overflow: 'hidden', background: 'var(--forest-deep)', color: 'var(--ivory)', minHeight: 360 }}>
            {/* Backdrop : featureImage si fournie, sinon HubArtwork (pool d'images) */}
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
              {meta.featureImage ? (
                <Image
                  src={meta.featureImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  style={{ objectFit: 'cover', opacity: 0.55 }}
                />
              ) : (
                <div style={{ position: 'absolute', inset: 0, opacity: 0.65 }}>
                  <HubArtwork slug={slug} variant="hero" />
                </div>
              )}
            </div>
            {/* Fade gradient pour lisibilité du texte */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(26,46,31,0.35) 0%, rgba(26,46,31,0.85) 100%)',
                pointerEvents: 'none',
              }}
            />

            <header style={{ position: 'relative', maxWidth: '1120px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-12)' }}>
              <nav aria-label="Fil d'Ariane" style={{ marginBottom: 'var(--space-6)' }}>
                <ol style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', fontSize: '13px', color: 'var(--sage-light)', flexWrap: 'wrap' }}>
                  <li><Link href="/" style={{ color: 'var(--sage-light)', textDecoration: 'none', opacity: 0.85 }}>Accueil</Link></li>
                  <li aria-hidden="true" style={{ opacity: 0.5 }}>›</li>
                  <li><Link href="/blog" style={{ color: 'var(--sage-light)', textDecoration: 'none', opacity: 0.85 }}>Blog</Link></li>
                  <li aria-hidden="true" style={{ opacity: 0.5 }}>›</li>
                  <li><Link href={`/blog/${meta.categorie}`} style={{ color: 'var(--sage-light)', textDecoration: 'none', opacity: 0.85 }}>{catLabel}</Link></li>
                </ol>
              </nav>

              <span style={{ display: 'inline-block', fontFamily: 'var(--next-font-mono), monospace', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--copper-bright)', background: 'rgba(184, 98, 61, 0.15)', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-5)', backdropFilter: 'blur(4px)' }}>
                {catLabel}
              </span>

              <h1 style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--ivory)', lineHeight: 1.1, marginBottom: 'var(--space-6)', textWrap: 'balance', maxWidth: '900px' }}>
                {meta.title}
              </h1>

              <div style={{ color: 'var(--ivory)', opacity: 0.92 }}>
                <AuthorByline authorSlug={niche.author.slug || 'auteur'} authorName={niche.author.name} publishedAt={meta.publishedAt} updatedAt={meta.updatedAt} readingTimeMin={meta.readingTimeMin} />
              </div>
            </header>
          </div>

          {/* ── Body : content + sidebar ── */}
          <div className="article-layout">
            {/* Main content column */}
            <div className="article-content">
              {meta.aiSummary && meta.aiSummary.length > 0 && (
                <AISummarize
                  points={meta.aiSummary}
                  articleTitle={meta.title}
                  articleUrl={`${SITE_URL}/${slug}`}
                />
              )}

              <div className="prose-article">{mdxContent}</div>
              <AutoProductCTAs ctas={getCTAsForCategory(meta.categorie)} />

              {/* FAQ */}
              {meta.faq && meta.faq.length > 0 && (
                <section aria-labelledby="faq-titre" style={{ marginTop: 'var(--space-12)' }}>
                  <h2 id="faq-titre" style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-6)' }}>
                    Questions fréquentes
                  </h2>
                  <FaqAccordion items={meta.faq} />
                </section>
              )}

              {/* Related — mobile only (desktop shows in sidebar) */}
              {related.length > 0 && (
                <section aria-labelledby="related-titre" className="article-related-mobile" style={{ marginTop: 'var(--space-12)' }}>
                  <h2 id="related-titre" style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 'clamp(20px, 2.5vw, 24px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
                    Continuer votre lecture
                  </h2>
                  <ul role="list" style={{ display: 'flex', flexDirection: 'column', gap: 0, listStyle: 'none', borderTop: '1px solid var(--border)' }}>
                    {related.map((a, i) => (
                      <li key={a.slug} style={{ borderBottom: '1px solid var(--border)' }}>
                        <Link href={articleHref(a)} className="related-link" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)', padding: 'var(--space-4) 0' }}>
                          <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: '12px', color: 'var(--text-muted)', flexShrink: 0, minWidth: '24px' }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{ fontFamily: 'var(--next-font-primary), system-ui, sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                              {a.title}
                            </span>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                              {CATEGORY_LABELS[a.categorie] ?? a.categorie} · {a.readingTimeMin} min
                            </span>
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '14px', flexShrink: 0 }} aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* AuthorCard */}
              <div style={{ marginTop: 'var(--space-10)' }}>
                <AuthorCard authorSlug={niche.author.slug || 'auteur'} bio={niche.author.bio || ''} variant="inline" />
              </div>
            </div>

            {/* Sidebar — desktop only */}
            <ArticleSidebar
              toc={toc}
              stickyCta={meta.stickyCta}
              stickyCtaMessage={meta.stickyCtaMessage}
              related={related}
              affiliateTag={niche.affiliateTag}
            />
          </div>
        </article>
      </main>

      {/* Sticky CTA — mobile only */}
      {meta.stickyCta && meta.stickyCta.length > 0 && (
        <StickyCTA
          items={meta.stickyCta}
          message={meta.stickyCtaMessage}
        />
      )}
    </>
  )
}

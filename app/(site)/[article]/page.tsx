/**
 * /[article] — articles standalone (content/articles/[slug].mdx).
 * Gabarit V2 : components/blog/ArticleView.tsx (une colonne de lecture).
 * Server Component · ISR 86400s.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getRelatedArticles, CATEGORY_LABELS } from '@/lib/blog'
import { getStandaloneArticle, getAllStandaloneSlugs } from '@/lib/articles'
import { niche } from '@/niche.config'
import { extractToc } from '@/lib/toc'
import { ArticleView } from '@/components/blog/ArticleView'
import { produitsCites } from '@/lib/produits-cites'
import { compileArticle } from '@/components/blog/compile-article'
import { CATALOGUE, robotsDeLaFiche } from '@/lib/radar-fiche'
import { RadarFiche } from '@/components/v2/radar/RadarFiche'
import { ficheNote } from '@/lib/fiche-note'
import { jsonLdProduit } from '@/lib/jsonld-produit'
import { NoteFiche } from '@/components/v2/note/NoteFiche'
import { getProduct } from '@/lib/products'
import { siteActif } from '@/niches'
import { estClassement, metaClassement, PageClassement, slugsClassement } from './classement-modele'
import { estAvisBase, metaAvisBase, PageAvisBase, slugsAvisBase } from './avis-base'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400

type Params = Promise<{ article: string }>

export function generateStaticParams() {
  // + catégories des fiches du gabarit commun (/<categorie>/<produit>) ; aucune sur QRT (siteActif.fiches = null).
  const categories = [...new Set((siteActif.fiches?.catalogue ?? []).map((p) => p.categorie))]
  // + classements du gabarit commun (/meilleur-<categorie>) ; aucun sur QRT.
  // + avis des robots de la base sans avis MDX (/avis-<id>, lots de data/avis-lots.json).
  return [...getAllStandaloneSlugs(), ...categories, ...slugsClassement(), ...slugsAvisBase()].map((article) => ({ article }))
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
  if (estClassement(slug)) return metaClassement(slug)
  if (estAvisBase(slug)) return metaAvisBase(slug)
  const data = getStandaloneArticle(slug)
  if (!data) return {}

  const { meta } = data
  const url = `${SITE_URL}/${slug}`

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
  if (estClassement(slug)) return <PageClassement slug={slug} />
  if (estAvisBase(slug)) return <PageAvisBase slug={slug} />
  const data = getStandaloneArticle(slug)
  if (!data) notFound()

  const { meta, content } = data
  const toc = extractToc(content)
  const { body, end } = await compileArticle(content, meta)

  const robots = robotsDeLaFiche(meta.base)
  // Note sur 10 et données Product : toutes les fiches reliées à la base (accord du propriétaire, 28/11/2026).
  const fiche = robots[0] ? ficheNote(robots[0], CATALOGUE) : null
  const imageProduit = fiche ? getProduct(fiche.robot.id)?.image : undefined
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
    ...(fiche
      ? jsonLdProduit(fiche, {
          url: `${SITE_URL}/${slug}`,
          titre: meta.title,
          description: meta.description,
          publie: meta.publishedAt,
          modifie: meta.updatedAt ?? meta.publishedAt,
          image: imageProduit ? absolutizeImageUrl(imageProduit) : articleImages[0],
          site: { nom: niche.siteName, url: SITE_URL },
        })
      : []),
  ]

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ArticleView produits={produitsCites(content)} slug={slug} meta={meta} catLabel={catLabel} toc={toc} related={related} after={end} radar={robots.length ? <RadarFiche robots={robots} /> : null} note={fiche ? <NoteFiche fiche={fiche} /> : null}>
        {body}
      </ArticleView>
    </>
  )
}

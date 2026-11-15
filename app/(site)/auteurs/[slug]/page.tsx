/**
 * Page auteur — ISR 86400s (revalidate 1 jour).
 * JSON-LD Person schema.
 * Design V2 : titre de page, carte auteur, biographie, derniers articles en lignes.
 * Params asynchrones : await params (Next.js 15+).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { niche } from '@/niche.config'
import { DEFAULT_OG_IMAGES } from '@/lib/og/default'
import Link from 'next/link'
import { getAllArticles } from '@/lib/blog'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { PageTitle } from '@/components/v2/PageTitle'

const ARTICLES_SHOWN = 10

export const revalidate = 86400

/* ------------------------------------------------------------------ */
/* Données statiques depuis niche.config                               */
/* ------------------------------------------------------------------ */

type AuthorData = {
  slug: string
  name: string
  role: string
  bio: string
  longBio: string[]
  url: string
}

function getAuthors(): Record<string, AuthorData> {
  if (!niche.author.slug) return {}
  return {
    [niche.author.slug]: {
      slug: niche.author.slug,
      name: niche.author.name,
      role: niche.author.title,
      bio: niche.author.bio,
      longBio: [niche.author.bio],
      url: `https://${niche.domain}/auteurs/${niche.author.slug}`,
    },
  }
}

/* ------------------------------------------------------------------ */
/* generateStaticParams                                                 */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return Object.keys(getAuthors()).map((slug) => ({ slug }))
}

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthors()[slug]
  if (!author) return {}

  return {
    title: `${author.name} — ${author.role} | ${niche.siteName}`,
    description: author.bio,
    alternates: { canonical: author.url },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title: `${author.name} — ${author.role}`,
      description: author.bio,
      url: author.url,
      siteName: niche.siteName,
      type: 'profile',
    },
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default async function AuthorPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const author = getAuthors()[slug]
  if (!author) notFound()

  /* JSON-LD Person */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: author.url,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      name: niche.siteName,
      url: `https://${niche.domain}`,
    },
  }

  const articles = getAllArticles().filter((a) => a.authorSlug === author.slug)

  return (
    <main id="main-content" className="v2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap lst">
        <PageTitle
          title={author.name}
          pose="lecture"
          meta={author.role}
          crumbs={[{ href: '/', label: 'Accueil' }, { label: author.name }]}
        />

        <AuthorCard
          authorSlug={author.slug}
          authorName={author.name}
          bio={author.bio}
          variant="full"
        />

        <section className="groupe prose">
          <h2>Pourquoi ce site ?</h2>
          {author.longBio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </section>

        {articles.length > 0 ? (
          <section className="groupe" aria-labelledby="articles-auteur">
            <h2 className="h-md" id="articles-auteur">
              Ses derniers articles
            </h2>
            <ul className="posts">
              {articles.slice(0, ARTICLES_SHOWN).map((article) => (
                <li key={`${article.categorie}/${article.slug}`}>
                  <ArticleCard article={article} as="h3" />
                </li>
              ))}
            </ul>
            {articles.length > ARTICLES_SHOWN ? (
              <p className="lst-more">
                <Link className="lnk" href="/blog">
                  Tous les articles
                </Link>
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  )
}

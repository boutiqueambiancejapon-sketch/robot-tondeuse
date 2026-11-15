/**
 * ArticleView — gabarit V2 d'un article : titre, « En bref », couverture, sommaire, corps,
 * questions fréquentes, articles liés, auteur, barre d'achat. Server Component.
 * Modèles : docs/maquette-v2/guide.html, avis-robot.html, duel.html, classement.html.
 */
import type { ReactNode } from 'react'
import Image from 'next/image'
import { niche } from '@/niche.config'
import type { ArticleMeta } from '@/lib/blog'
import type { TocItem } from '@/lib/toc'
import type { PageType } from '@/lib/utils/page-type'
import { getCTAsForCategory } from '@/lib/article-ctas'
import { PageTitle } from '@/components/v2/PageTitle'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { poseArticle } from './article-pose'
import { EnBref } from './EnBref'
import { HubArtwork } from './HubArtwork'
import { AutoProductCTAs } from './AutoProductCTAs'
import { ArticleEnd } from './ArticleEnd'
import { ArticleBuyRows } from './ArticleBuyRows'
import { StickyCTA } from './StickyCTA'
import type { StickyCTAItem } from './sticky-wording'

export type ArticleViewMeta = {
  title: string
  categorie: string
  pageType: PageType
  publishedAt: string
  updatedAt?: string
  readingTimeMin?: number
  featureImage?: string
  aiSummary?: string[]
  faq?: { q: string; a: string }[]
  stickyCta?: StickyCTAItem[]
  stickyCtaMessage?: string
}

type Props = {
  slug: string
  meta: ArticleViewMeta
  catLabel: string
  toc: TocItem[]
  related: ArticleMeta[]
  /** Corps de l'article compilé (MDX). */
  children: ReactNode
  /** Bloc placé après le corps (tuile vers un outil, par exemple). */
  after?: ReactNode
}

export function ArticleView({ slug, meta, catLabel, toc, related, children, after }: Props) {
  const authorSlug = niche.author.slug || 'auteur'
  const authorName = niche.author.name || 'Auteur'
  const buyFirst = meta.pageType === 'guide-achat' || meta.pageType === 'comparatif'

  return (
    <main id="main-content" className="v2">
      <article className="wrap art">
        <PageTitle
          title={meta.title}
          pose={poseArticle(meta.pageType, slug)}
          crumbs={[
            { href: '/', label: 'Accueil' },
            { href: '/blog', label: 'Blog' },
            { href: `/blog/${meta.categorie}`, label: catLabel },
          ]}
        />
        <AuthorByline
          authorSlug={authorSlug}
          authorName={authorName}
          publishedAt={meta.publishedAt}
          updatedAt={meta.updatedAt}
          readingTimeMin={meta.readingTimeMin}
        />

        {/* Avis, classements et comparatifs : le bouton marchand est dans le premier écran. */}
        {buyFirst && meta.stickyCta?.length ? <ArticleBuyRows items={meta.stickyCta} message={meta.stickyCtaMessage} /> : null}

        {meta.aiSummary?.length ? <EnBref points={meta.aiSummary} /> : null}

        {meta.featureImage ? (
          <figure className="cover">
            <Image src={meta.featureImage} alt="" width={800} height={500} priority sizes="(min-width: 760px) 720px, 100vw" />
          </figure>
        ) : (
          <figure className="cover cover--pool">
            <HubArtwork slug={slug} variant="hero" />
          </figure>
        )}

        {toc.length > 1 ? (
          <nav className="toc" aria-label="Sommaire">
            {toc.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.text}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="prose">{children}</div>
        <AutoProductCTAs ctas={getCTAsForCategory(meta.categorie)} />
        {after}

        <ArticleEnd faq={meta.faq} related={related} authorSlug={authorSlug} authorName={authorName} />
      </article>

      {/* Seul élément collé en bas de l'écran. Dans <main> : les styles V2 ne valent que sous .v2. */}
      {meta.stickyCta?.length ? <StickyCTA items={meta.stickyCta} message={meta.stickyCtaMessage} /> : null}
    </main>
  )
}

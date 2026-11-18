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
import { showsBuyBar, type PageType } from '@/lib/utils/page-type'
import { PageTitle } from '@/components/v2/PageTitle'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { poseArticle } from './article-pose'
import { EnBref } from './EnBref'
import { HubArtwork } from './HubArtwork'
import { ArticleEnd } from './ArticleEnd'
import { ArticleBuyRows } from './ArticleBuyRows'
import { NotreChoix } from './NotreChoix'
import { PrixCompares } from './PrixCompares'
import type { ProduitCite } from '@/lib/produits-cites'
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
  /** Encart de fin d'article, choisi selon le type de page (lib/utils/encarts.ts). */
  after?: ReactNode
  /** Robots cités dans l'article (encarts ProductCTA), pour la carte « Notre choix » et le tableau des prix. */
  produits?: ProduitCite[]
}

export function ArticleView({ slug, meta, catLabel, toc, related, children, after, produits = [] }: Props) {
  const authorSlug = niche.author.slug || 'auteur'
  const authorName = niche.author.name || 'Auteur'
  // Ligne d'achat du haut et barre du bas : seulement sur les guides d'achat et les comparatifs (D8).
  const buyLinks = showsBuyBar(meta.pageType) && meta.stickyCta?.length ? meta.stickyCta : null
  // Carte « Notre choix » (premier robot cité) et tableau des prix : pages d'achat et comparatifs seulement.
  const vend = showsBuyBar(meta.pageType) && produits.length > 0

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
        {vend ? null : buyLinks ? <ArticleBuyRows items={buyLinks} message={meta.stickyCtaMessage} /> : null}

        {meta.aiSummary?.length ? <EnBref points={meta.aiSummary} /> : null}

        {vend ? <NotreChoix produit={produits[0]} /> : null}

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
        {vend ? <PrixCompares produits={produits} /> : null}
        {after}

        <ArticleEnd faq={meta.faq} related={related} authorSlug={authorSlug} authorName={authorName} />
      </article>

      {/* Seul élément collé en bas de l'écran. Dans <main> : les styles V2 ne valent que sous .v2. */}
      {buyLinks ? <StickyCTA items={buyLinks} message={meta.stickyCtaMessage} /> : null}
    </main>
  )
}

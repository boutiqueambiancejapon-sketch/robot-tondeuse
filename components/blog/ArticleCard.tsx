/**
 * ArticleCard — une ligne d'article du design V2 (classe .post) : image carrée, titre, temps de lecture.
 * Toujours une image : featureImage si fournie, sinon une image du site choisie d'après le slug.
 * Server Component.
 */
import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/blog'
import { articleHref } from '@/lib/blog'
import { rubriqueLabel } from '@/components/v2/listes/rubriques'
import { hubImage } from './HubArtwork'

/** Article d'une rubrique à dossier (piscine) sans image : la mascotte de la rubrique, jamais une photo de robot tondeuse. */
const imageParDefaut = (article: ArticleMeta) =>
  article.dossier ? `/images/mascotte/robot-piscine.webp` : hubImage(article.slug)

type Props = {
  article: ArticleMeta
  /** Premier article d'une liste : image plus grande et description sur grand écran. */
  featured?: boolean
  showCategory?: boolean
  /** Gardé pour les anciens appels, sans effet. */
  index?: number
  /** Niveau du titre : h2 sous le H1 d'une page de liste, h3 sous un titre de section. */
  as?: 'h2' | 'h3'
}

export function ArticleCard({ article, featured = false, showCategory = true, as: Title = 'h2' }: Props) {
  const info = `${article.readingTimeMin} min de lecture`
  return (
    <Link className={featured ? 'post post--lead' : 'post'} href={articleHref(article)}>
      <Image
        src={article.featureImage || imageParDefaut(article)}
        alt=""
        width={featured ? 400 : 192}
        height={featured ? 400 : 192}
        sizes={featured ? '(min-width: 860px) 200px, 96px' : '96px'}
      />
      <div>
        <Title>{article.title}</Title>
        {featured && article.description ? <p className="post-desc">{article.description}</p> : null}
        <p>{showCategory ? `${rubriqueLabel(article.categorie)} · ${info}` : info}</p>
      </div>
    </Link>
  )
}

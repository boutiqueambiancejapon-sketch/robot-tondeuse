/** Fin d'article : questions fréquentes, articles liés en lignes, carte auteur. Server Component. */
import Link from 'next/link'
import Image from 'next/image'
import { niche } from '@/niche.config'
import { articleHref, type ArticleMeta } from '@/lib/blog'
import { rubriqueLabel } from '@/components/v2/listes/rubriques'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { FaqAccordion } from './FaqAccordion'

type Props = {
  faq?: { q: string; a: string }[]
  related: ArticleMeta[]
  authorSlug: string
  authorName: string
}

export function ArticleEnd({ faq, related, authorSlug, authorName }: Props) {
  // Vignettes seulement si chaque article lié a une image : sinon des lignes de texte, toutes alignées.
  const thumbs = related.every((a) => Boolean(a.featureImage))

  return (
    <>
      {faq?.length ? (
        <section className="art-sec" aria-labelledby="faq-titre">
          <h2 id="faq-titre" className="h-md">
            Questions fréquentes
          </h2>
          <FaqAccordion items={faq} />
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="art-sec" aria-labelledby="related-titre">
          <h2 id="related-titre" className="h-md">
            Continuer votre lecture
          </h2>
          <div className="stack">
            {related.map((a) => (
              <Link key={`${a.categorie}/${a.slug}`} href={articleHref(a)} className={thumbs ? 'post' : 'post post--txt'}>
                {thumbs && a.featureImage ? <Image src={a.featureImage} alt="" width={96} height={96} /> : null}
                <div>
                  <h3>{a.title}</h3>
                  <p>
                    {rubriqueLabel(a.categorie)} · {a.readingTimeMin} min
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="art-sec" aria-label="Auteur">
        <AuthorCard authorSlug={authorSlug} authorName={authorName} bio={niche.author.bio || ''} variant="inline" />
      </section>
    </>
  )
}

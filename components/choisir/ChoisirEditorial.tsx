/**
 * ChoisirEditorial — Server Component
 * Contenu éditorial de /choisir/[produit] en classes V2 : en bref, sections, FAQ, auteur.
 */

import Link from 'next/link'
import { AuthorByline } from '@/components/ui/AuthorByline'
import { AuthorCard } from '@/components/ui/AuthorCard'
import { AffiliateLink } from '@/components/ui/AffiliateLink'
import { COMPARATEURS } from '@/lib/comparateur'
import { niche } from '@/niche.config'
import type { ChoisirProductContent, ChoisirTable } from '@/lib/choisir-content'
import { ChoisirFaq } from './ChoisirFaq'

type Props = {
  content: ChoisirProductContent
  produit: string
  publishedAt: string
}

const LIEN_PAR_DEFAUT = 'https://amzn.to/4c4vSyD'

/** Lien Amazon du modèle nommé dans la première colonne ; à défaut, le lien générique déjà utilisé avant la V2. */
function findAmazonUrl(produit: string, modeleName: string): string {
  const name = modeleName.toLowerCase()
  const modele = COMPARATEURS[produit]?.modeles.find((m) => {
    const nom = m.nom.toLowerCase()
    return name.includes(nom) || nom.includes(name)
  })
  return modele?.amazonUrl || LIEN_PAR_DEFAUT
}

function GammeTable({ table, produit }: { table: ChoisirTable; produit: string }) {
  return (
    <div className="tbl-wrap">
      <div className="tbl-scroll">
        <table className="tbl tbl--fit">
          <thead>
            <tr>
              {table.headers.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
              <th scope="col">Chez le marchand</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, ci) => (
                  <td key={ci}>{cell}</td>
                ))}
                <td>
                  <AffiliateLink href={findAmazonUrl(produit, row[0])} className="lnk">
                    Voir le prix sur Amazon
                  </AffiliateLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ChoisirEditorial({ content, produit, publishedAt }: Props) {
  return (
    <article className="prose">
      <AuthorByline
        authorSlug={niche.author.slug}
        authorName={niche.author.name}
        publishedAt={publishedAt}
        readingTimeMin={5}
      />

      <div className="tldr">
        <ul aria-label="En bref">
          {content.tldr.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {content.sections.map((section) => (
        <section key={section.id} id={section.id} className="prose">
          <h2>{section.title}</h2>
          <p>{section.intro}</p>

          {section.table ? <GammeTable table={section.table} produit={produit} /> : null}

          {section.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {section.tip ? (
            <aside role="note" className="note-box">
              {section.tip}
            </aside>
          ) : null}

          {section.internalLink ? (
            <p>
              <Link href={section.internalLink.href} className="lnk">
                {section.internalLink.text}
              </Link>
            </p>
          ) : null}
        </section>
      ))}

      <ChoisirFaq faq={content.faq} />

      <AuthorCard
        authorSlug={niche.author.slug}
        authorName={niche.author.name}
        bio={niche.author.bio}
        variant="inline"
      />
    </article>
  )
}

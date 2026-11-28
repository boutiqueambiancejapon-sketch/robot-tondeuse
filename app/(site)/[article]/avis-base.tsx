/**
 * Pages « Avis <modèle> » servies depuis la base sous /avis-<id> (lib/avis-base.ts, lots de data/avis-lots.json).
 * Seulement les robots publiés dans un lot et sans avis MDX ; une fiche trop maigre reste en noindex.
 */
import type { Metadata } from 'next'
import { AvisBase, type DonneesAvis } from '@/components/v2/avis-base/AvisBase'
import { caracteristiques, dateModif, descriptionAvis, indexable, lotDe, titreAvis, type RobotBase } from '@/lib/avis-base'
import { BASE, hrefRobot, robotDe } from '@/lib/server/avis-base'
import { forcesLimites, mauvaisChoix, questions } from '@/lib/avis-base-texte'
import { ficheNote } from '@/lib/fiche-note'
import { jsonLdProduit } from '@/lib/jsonld-produit'
import { concurrentsParDefaut } from '@/lib/radar'
import { produitGabarit } from '@/lib/server/photos-produits'
import { niche } from '@/niche.config'

export { estAvisBase, slugsAvisBase } from '@/lib/server/avis-base'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export function metaAvisBase(slug: string): Metadata {
  const r = robotDe(slug)
  if (!r) return {}
  const titre = titreAvis(r)
  return {
    title: { absolute: titre },
    description: descriptionAvis(r),
    alternates: { canonical: `${SITE_URL}/${slug}` },
    ...(indexable(r, BASE).ok ? {} : { robots: { index: false, follow: true } }),
    openGraph: { title: titre, description: descriptionAvis(r), url: `${SITE_URL}/${slug}`, siteName: niche.siteName, type: 'article' },
  }
}

function donnees(r: RobotBase): DonneesAvis {
  const publie = lotDe(r.id)?.publie_le ?? r.prix_lu_le ?? ''
  const fiche = ficheNote(r, BASE)
  const rivaux = concurrentsParDefaut(r, BASE, 3) as RobotBase[]
  const amazon = r.asin ? `https://www.amazon.fr/dp/${r.asin}` : `https://www.amazon.fr/s?k=${encodeURIComponent(fiche.nom)}`
  const offres = [{ marchand: 'Amazon', url: amazon }, ...fiche.offres.map((o) => ({ marchand: o.marchand, url: o.url, prix: o.prix, date: o.date }))]
  const { forces, limites } = forcesLimites(r, BASE)
  return {
    robot: r,
    titre: titreAvis(r),
    publie,
    modifie: dateModif(r, publie),
    photo: produitGabarit(r),
    fiche,
    offres,
    specs: caracteristiques(r),
    forces,
    limites,
    mauvais: mauvaisChoix(r),
    alternatives: rivaux.map((x) => {
      const ecart = x.prix_eur && r.prix_eur ? x.prix_eur - r.prix_eur : null
      const nf = new Intl.NumberFormat('fr-FR')
      return {
        produit: produitGabarit(x, hrefRobot(x.id)),
        gain: ecart !== null && ecart < 0 ? `${nf.format(-ecart)} € moins cher (prix public)` : undefined,
        perte: ecart !== null && ecart > 0 ? `${nf.format(ecart)} € plus cher (prix public)` : undefined,
      }
    }),
    faq: questions(r, rivaux.slice(0, 2)),
  }
}

export function PageAvisBase({ slug }: { slug: string }) {
  const r = robotDe(slug)
  if (!r) return null
  const d = donnees(r)
  const url = `${SITE_URL}/${slug}`
  const auteur = { nom: niche.author.name, url: `${SITE_URL}/auteurs/${niche.author.slug}` }
  const image = d.photo.photo ? (d.photo.photo.src.startsWith('/') ? `${SITE_URL}${d.photo.photo.src}` : d.photo.photo.src) : undefined
  const jsonLd = [
    ...jsonLdProduit(d.fiche, { url, titre: d.titre, description: descriptionAvis(r), publie: d.publie, modifie: d.modifie, image, site: { nom: niche.siteName, url: SITE_URL }, auteur }),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Marques', item: `${SITE_URL}/marques` },
        { '@type': 'ListItem', position: 3, name: d.titre, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: d.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ]
  return (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <AvisBase d={d} />
    </>
  )
}

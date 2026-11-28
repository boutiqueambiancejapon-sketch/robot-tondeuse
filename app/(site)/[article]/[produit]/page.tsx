/**
 * /<categorie>/<produit> — fiche produit du gabarit commun, lue dans le dossier du site actif (niches/<site>/).
 * Quel Robot Tondeuse n'a pas encore de fiches à ce format (ses fiches sont les avis MDX) : aucune adresse servie.
 * Server Component · ISR 86400 s.
 */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FicheProduit } from '@/components/v2/gabarits/FicheProduit'
import { adresseFiche, donneesFiche, jsonLdFiche, nomProduit } from '@/lib/modele/fiche'
import { siteActif } from '@/niches'
import { niche } from '@/niche.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export const revalidate = 86400
export const dynamicParams = false

type Params = Promise<{ article: string; produit: string }>

const catalogue = siteActif.fiches?.catalogue ?? []

export function generateStaticParams() {
  // Toutes les fiches du site actif, avec leur catégorie (aucune sur QRT).
  return catalogue.map((p) => ({ article: p.categorie, produit: p.id }))
}

function trouver(categorie: string, id: string) {
  return catalogue.find((p) => p.categorie === categorie && p.id === id) ?? null
}

const description = (nom: string) => `${nom} : note sur 10 calculée sur les caractéristiques publiées, prix daté, alternatives.`

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { article, produit } = await params
  const p = trouver(article, produit)
  if (!p) return {}
  const nom = nomProduit(p)
  return {
    title: { absolute: `${nom} : avis et caractéristiques | ${niche.siteName}` },
    description: description(nom),
    alternates: { canonical: `${SITE_URL}${adresseFiche(p)}` },
  }
}

export default async function FicheProduitPage({ params }: { params: Params }) {
  const { article, produit } = await params
  const fiches = siteActif.fiches
  const p = fiches ? trouver(article, produit) : null
  if (!fiches || !p) notFound()
  const d = donneesFiche(p, fiches)
  const categorie = niche.categories.find((c) => c.slug === p.categorie)?.label ?? p.categorie
  const jsonLd = jsonLdFiche(d, { url: `${SITE_URL}${adresseFiche(p)}`, description: description(nomProduit(p)), site: { nom: niche.siteName, url: SITE_URL } })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FicheProduit d={d} crumbs={[{ href: '/', label: 'Accueil' }, { label: categorie }, { label: p.marque }]} />
    </>
  )
}

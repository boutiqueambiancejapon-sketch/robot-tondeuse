/**
 * Classement du gabarit commun servi sous /meilleur-<categorie> (lib/modele/classement.ts), pour les sites dont le dossier
 * porte des fiches (niches/<site>/). Quel Robot Tondeuse n'en a pas : ses classements restent ses articles MDX, aucune adresse ne change.
 */
import type { Metadata } from 'next'
import { Classement } from '@/components/v2/gabarits/Classement'
import { adresseClassement, categorieDuClassement, donneesClassement, jsonLdClassement } from '@/lib/modele/classement'
import { siteActif } from '@/niches'
import { niche } from '@/niche.config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
const ANNEE = new Date().getFullYear()

/** Adresses de classement du site actif (sans le « / »). */
export function slugsClassement(): string[] {
  const cats = [...new Set((siteActif.fiches?.catalogue ?? []).map((p) => p.categorie))]
  return cats.map((c) => adresseClassement(c).slice(1))
}

export const estClassement = (slug: string) => categorieDuClassement(slug, siteActif.fiches) !== null

function libelles(categorie: string) {
  const label = niche.categories.find((c) => c.slug === categorie)?.label ?? categorie
  return { label, titre: `Meilleur ${niche.entity} ${ANNEE} : le classement` }
}

export function metaClassement(slug: string): Metadata {
  const cat = categorieDuClassement(slug, siteActif.fiches)
  if (!cat) return {}
  const { titre } = libelles(cat)
  return {
    title: { absolute: `${titre} | ${niche.siteName}` },
    description: `${titre} : podium, top 10 et note sur 10 calculée sur les caractéristiques publiées, prix datés.`,
    alternates: { canonical: `${SITE_URL}/${slug}` },
  }
}

export function PageClassement({ slug }: { slug: string }) {
  const f = siteActif.fiches
  const cat = categorieDuClassement(slug, f)
  if (!f || !cat) return null
  const { label, titre } = libelles(cat)
  const d = donneesClassement(f, cat)
  const jsonLd = jsonLdClassement(d, { url: `${SITE_URL}/${slug}`, titre, site: SITE_URL })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Classement d={d} titre={titre} libelle={niche.entities} crumbs={[{ href: '/', label: 'Accueil' }, { label }, { label: 'Meilleurs' }]} />
    </>
  )
}

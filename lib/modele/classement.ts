/**
 * lib/modele/classement.ts — tout ce que le gabarit CLASSEMENT affiche (« meilleur … »), calculé depuis le dossier du site.
 * Maquette validée : ~/drafts/qrt-gabarits/maquette-validee.html (onglet Classement) ; règles : tasks/gabarits-affiliation.md § 4.
 * Ordre = note sur 10 du barème public. Le podium ne retient que des produits notés avec un prix daté. Rien n'est inventé.
 */
import type { MarchePodium, OffreGabarit, ProduitGabarit } from '@/components/v2/gabarits'
import { mediane } from '@/lib/gabarits'
import type { FichesSite, ProduitCatalogue } from '@/niches/types'
import { nomProduit, offresProduit, versGabarit } from './fiche'
import { noterProduit } from './note'

/** Adresse du classement d'une catégorie : /meilleur-<categorie> (l'année va dans le titre, jamais dans l'adresse). */
export const adresseClassement = (categorie: string) => `/meilleur-${categorie}`

/** Catégorie d'une adresse de classement, si le site actif en sert une ; sinon null. */
export function categorieDuClassement(slug: string, f: FichesSite | null): string | null {
  if (!f || !slug.startsWith('meilleur-')) return null
  const cat = slug.slice('meilleur-'.length)
  return f.catalogue.some((p) => p.categorie === cat) ? cat : null
}

export type Candidat<T> = { item: T; note: number; prix: number | null }
export type Marche<T> = { label: string; item: T }

/**
 * Podium de la maquette : meilleur choix (meilleure note), meilleur prix (mieux noté sous le prix médian),
 * haut de gamme (mieux noté parmi le quart le plus cher). Candidats déjà triés par note ; seuls les prix datés comptent.
 * Une marche sans candidat est retirée plutôt que remplie par un produit qui ne lui correspond pas.
 */
export function choisirPodium<T>(tries: Candidat<T>[]): Marche<T>[] {
  const avecPrix = tries.filter((c) => c.prix !== null)
  if (!avecPrix.length) return []
  const prix = avecPrix.map((c) => c.prix as number).sort((a, b) => a - b)
  const med = mediane(prix) as number
  const cher = prix[Math.floor(0.75 * (prix.length - 1))]
  const [premier] = avecPrix
  const pris = new Set<Candidat<T>>([premier])
  const marches: Marche<T>[] = [{ label: 'Meilleur choix', item: premier.item }]
  const prendre = (label: string, test: (c: Candidat<T>) => boolean) => {
    const c = avecPrix.find((x) => !pris.has(x) && test(x))
    if (!c) return
    pris.add(c)
    marches.push({ label, item: c.item })
  }
  prendre('Meilleur prix', (c) => (c.prix as number) < med)
  prendre('Haut de gamme', (c) => (c.prix as number) >= cher)
  return marches
}

export type LigneClassement = { rang: number; produit: ProduitGabarit; pourQui?: string }

export type DonneesClassement = {
  categorie: string
  /** Nombre de produits de la catégorie, notés ou non. */
  analyses: number
  lignes: LigneClassement[]
  podium: MarchePodium[]
  /** N° 1 et sa première offre, pour la barre collante. */
  premier: { produit: ProduitGabarit; offre: OffreGabarit } | null
  exemple: boolean
}

export function donneesClassement(f: FichesSite, categorie: string, combien = 10): DonneesClassement {
  const unites = Object.fromEntries(f.caracteristiques.map((c) => [c.id, c.unite]))
  const produits = f.catalogue.filter((p) => p.categorie === categorie)
  const notes = produits
    .map((p) => ({ p, note: noterProduit(p, f.bareme, unites).note }))
    .filter((x): x is { p: ProduitCatalogue; note: number } => x.note !== null)
    .sort((a, b) => b.note - a.note || nomProduit(a.p).localeCompare(nomProduit(b.p), 'fr'))

  const candidats: Candidat<ProduitCatalogue>[] = notes.map(({ p, note }) => ({ item: p, note, prix: p.prix_eur && p.prix_lu_le ? p.prix_eur : null }))
  const noteDe = new Map(notes.map(({ p, note }) => [p.id, note]))
  const gabarit = (p: ProduitCatalogue) => versGabarit(p, f, noteDe.get(p.id) ?? null)

  const podium: MarchePodium[] = choisirPodium(candidats).map(({ label, item }) => ({
    label,
    produit: gabarit(item),
    pourQui: item.pourQui,
    offre: offresProduit(item)[0] ?? null,
  }))
  const tete = podium[0]
  return {
    categorie,
    analyses: produits.length,
    lignes: notes.slice(0, combien).map(({ p }, i) => ({ rang: i + 1, produit: gabarit(p), pourQui: p.pourQui })),
    podium,
    premier: tete?.offre ? { produit: tete.produit, offre: tete.offre } : null,
    exemple: produits.some((p) => p.exemple),
  }
}

/** Données structurées : liste ordonnée des produits classés (ItemList), chaque élément vers sa fiche. */
export function jsonLdClassement(d: DonneesClassement, page: { url: string; titre: string; site: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.titre,
    url: page.url,
    numberOfItems: d.lignes.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: d.lignes.map((l) => ({
      '@type': 'ListItem',
      position: l.rang,
      name: l.produit.nom,
      ...(l.produit.href ? { url: `${page.site}${l.produit.href}` } : {}),
    })),
  }
}

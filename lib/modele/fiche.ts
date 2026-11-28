/**
 * lib/modele/fiche.ts — tout ce que le gabarit FICHE PRODUIT affiche, calculé depuis le dossier du site
 * (niches/<site>/catalogue.json, bareme.ts, caracteristiques.ts). Maquette : ~/drafts/qrt-gabarits/maquette-validee.html.
 * Rien n'est inventé : point fort et point faible viennent du barème, l'alternative d'un prix daté plus bas.
 */
import type { Alternative, LigneEssentiel, OffreGabarit, ProduitGabarit } from '@/components/v2/gabarits'
import { euros } from '@/lib/gabarits'
import { lendemain } from '@/lib/jsonld-produit'
import { noteFr } from '@/lib/note-objective'
import type { FichesSite, ProduitCatalogue } from '@/niches/types'
import { noterProduit, rangProduit, type NoteProduit } from './note'

export const nomProduit = (p: ProduitCatalogue) => `${p.marque} ${p.modele}`
export const adresseFiche = (p: ProduitCatalogue) => `/${p.categorie}/${p.id}`

export type DonneesFiche = {
  produit: ProduitCatalogue
  gabarit: ProduitGabarit
  note: NoteProduit
  rang: { rang: number; notes: number } | null
  offres: OffreGabarit[]
  essentiel: LigneEssentiel[]
  specs: { label: string; valeur: string }[]
  alternatives: Alternative[]
}

const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

function unites(f: FichesSite): Record<string, string | undefined> {
  return Object.fromEntries(f.caracteristiques.map((c) => [c.id, c.unite]))
}

function valeur(p: ProduitCatalogue, id: string, unite?: string): string | null {
  const v = p.caracteristiques[id]
  if (v === null || v === undefined || v === '') return null
  return typeof v === 'number' ? `${nf.format(v)}${unite ? ` ${unite}` : ''}` : v
}

export function versGabarit(p: ProduitCatalogue, f: FichesSite, note: number | null): ProduitGabarit {
  const meta = f.caracteristiques
    .slice(0, 2)
    .map((c) => valeur(p, c.id, c.unite))
    .filter(Boolean)
    .join(' · ')
  return { id: p.id, nom: nomProduit(p), href: adresseFiche(p), marque: p.marque, meta, note, prix: p.prix_eur, prixDate: p.prix_lu_le }
}

/** Offres affichées : Amazon (fiche par ASIN, sinon recherche du nom), puis le lien marchand s'il existe. */
export function offresProduit(p: ProduitCatalogue): OffreGabarit[] {
  const amazon = p.asin ? `https://www.amazon.fr/dp/${p.asin}` : `https://www.amazon.fr/s?k=${encodeURIComponent(nomProduit(p))}`
  const prixAmazon = p.prix_source === 'Amazon' ? { prix: p.prix_eur, date: p.prix_lu_le } : {}
  const liste: OffreGabarit[] = [{ marchand: 'Amazon', url: amazon, ...prixAmazon }]
  if (p.lienMarchand) liste.push({ marchand: p.lienMarchand.marchand, url: p.lienMarchand.url })
  return liste
}

export function donneesFiche(p: ProduitCatalogue, f: FichesSite): DonneesFiche {
  const u = unites(f)
  const notes = new Map(f.catalogue.map((x) => [x.id, noterProduit(x, f.bareme, u).note]))
  const note = noterProduit(p, f.bareme, u)
  const connus = note.criteres.filter((c) => c.points !== null)
  const fort = connus.find((c) => c.points === c.max)
  const faible = [...connus].sort((a, b) => (a.points as number) / a.max - (b.points as number) / b.max)[0]
  const memeCategorie = f.catalogue.filter((x) => x.id !== p.id && x.categorie === p.categorie)
  const moinsCher = memeCategorie
    .filter((x) => x.prix_eur && x.prix_lu_le && p.prix_eur && x.prix_eur < p.prix_eur && notes.get(x.id) !== null)
    .sort((a, b) => (notes.get(b.id) as number) - (notes.get(a.id) as number))[0]

  const essentiel: LigneEssentiel[] = []
  if (p.pourQui) essentiel.push({ type: 'pour', texte: p.pourQui })
  if (fort) essentiel.push({ type: 'fort', texte: `${fort.titre} : ${fort.texte} (${fort.points}/${fort.max}).` })
  if (faible && faible !== fort && (faible.points as number) < faible.max)
    essentiel.push({ type: 'faible', texte: `${faible.titre} : ${faible.texte} (${faible.points}/${faible.max}).` })
  if (moinsCher)
    essentiel.push({ type: 'info', texte: `Moins cher : ${nomProduit(moinsCher)}, ${euros(moinsCher.prix_eur as number)}, noté ${noteFr(notes.get(moinsCher.id) as number)}/10.` })

  const alternatives: Alternative[] = memeCategorie
    .sort((a, b) => Math.abs((notes.get(a.id) ?? 0) - (note.note ?? 0)) - Math.abs((notes.get(b.id) ?? 0) - (note.note ?? 0)))
    .slice(0, 3)
    .map((x) => {
      const ecart = x.prix_eur && p.prix_eur ? x.prix_eur - p.prix_eur : null
      return {
        produit: versGabarit(x, f, notes.get(x.id) ?? null),
        gain: ecart !== null && ecart < 0 ? `${euros(-ecart)} de moins` : undefined,
        perte: ecart !== null && ecart > 0 ? `${euros(ecart)} de plus` : undefined,
      }
    })

  return {
    produit: p,
    gabarit: versGabarit(p, f, note.note),
    note,
    rang: rangProduit(p.id, notes),
    offres: offresProduit(p),
    essentiel,
    specs: f.caracteristiques.map((c) => ({ label: c.label, valeur: valeur(p, c.id, c.unite) ?? 'non publié' })),
    alternatives,
  }
}

/** Données structurées Product : note sur dossier (pas d'avis client), offre seulement avec un prix daté. */
export function jsonLdFiche(d: DonneesFiche, page: { url: string; description: string; site: { nom: string; url: string } }) {
  const p = d.produit
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${page.url}#produit`,
    name: nomProduit(p),
    brand: { '@type': 'Brand', name: p.marque },
    model: p.modele,
    description: page.description,
    additionalProperty: d.specs.filter((s) => s.valeur !== 'non publié').map((s) => ({ '@type': 'PropertyValue', name: s.label, value: s.valeur })),
    ...(p.prix_eur && p.prix_lu_le
      ? { offers: { '@type': 'Offer', price: p.prix_eur, priceCurrency: 'EUR', url: page.url, priceValidUntil: lendemain(p.prix_lu_le) } }
      : {}),
    ...(d.note.note !== null
      ? {
          review: {
            '@type': 'Review',
            name: `Note de ${nomProduit(p)} sur 10`,
            reviewBody: `Note calculée sur les caractéristiques publiées, sans essai. Confiance ${d.note.confiance} %.`,
            author: { '@type': 'Organization', name: page.site.nom, url: page.site.url },
            reviewRating: { '@type': 'Rating', ratingValue: d.note.note, bestRating: 10, worstRating: 0 },
          },
        }
      : {}),
  }
}

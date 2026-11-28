/**
 * lib/jsonld-produit.ts — données structurées d'une fiche robot (tasks/collections-v1.md § 3 ter).
 * Product + additionalProperty (une PropertyValue par caractéristique publiée) + offres datées
 * + Review éditoriale du site, et WebPage avec speakable. Jamais d'aggregateRating : le site n'a pas
 * d'avis clients. Une valeur absente de la base n'est pas écrite (aucun champ vide ni deviné).
 */
import type { FicheNote } from './fiche-note'
import type { RobotCatalogue } from './radar'

type Robot = RobotCatalogue & {
  sans_fil?: boolean
  transmission?: string
  largeur_coupe_cm?: number | null
  hauteur_coupe_mm?: number[] | null
  zones_max?: number | null
  ip?: string | null
  poids_kg?: number | null
}

export type PageFiche = { url: string; titre: string; description: string; publie: string; modifie: string; image?: string; site: { nom: string; url: string } }

const GUIDAGE: Record<string, string> = { rtk: 'GPS RTK', lidar: 'LiDAR', vision: 'caméra', fil: 'câble périphérique' }

const prop = (name: string, value: number | string, unitCode?: string, unitText?: string) => ({
  '@type': 'PropertyValue',
  name,
  value,
  ...(unitCode ? { unitCode } : {}),
  ...(unitText ? { unitText } : {}),
})

/** Une PropertyValue par caractéristique publiée (codes d'unité UN/CEFACT). */
export function proprietes(r: Robot) {
  const p: object[] = []
  if (r.surface_m2) p.push(prop('Surface maximale annoncée', r.surface_m2, 'MTK', 'm²'))
  if (r.pente_pct) p.push(prop('Pente maximale annoncée', r.pente_pct, 'P1', '%'))
  if (r.bruit_db) p.push(prop('Niveau sonore annoncé', r.bruit_db, '2N', 'dB'))
  if (r.autonomie_min) p.push(prop('Autonomie annoncée', r.autonomie_min, 'MIN', 'min'))
  if (r.largeur_coupe_cm) p.push(prop('Largeur de coupe', r.largeur_coupe_cm, 'CMT', 'cm'))
  if (r.hauteur_coupe_mm?.length === 2)
    p.push({ '@type': 'PropertyValue', name: 'Hauteur de coupe', minValue: r.hauteur_coupe_mm[0], maxValue: r.hauteur_coupe_mm[1], unitCode: 'MMT', unitText: 'mm' })
  p.push(prop('Guidage', r.guidage.split('+').map((g) => GUIDAGE[g] ?? g).join(' + ')))
  if (r.sans_fil !== undefined) p.push(prop('Sans câble périphérique', r.sans_fil ? 'oui' : 'non'))
  if (r.transmission) p.push(prop('Roues motrices', r.transmission === '4rm' ? '4 roues motrices' : '2 roues motrices'))
  if (r.connectivite?.length) p.push(prop('Connexion', r.connectivite.map((c) => (c === '4g' ? '4G' : c === 'wifi' ? 'Wi-Fi' : 'Bluetooth')).join(', ')))
  if (r.zones_max) p.push(prop('Zones de tonte', r.zones_max))
  if (r.ip) p.push(prop('Indice de protection', r.ip))
  if (r.poids_kg) p.push(prop('Poids', r.poids_kg, 'KGM', 'kg'))
  return p
}

/** Lendemain du relevé : le prix n'est garanti que le jour où il a été lu. */
export const lendemain = (iso: string) => new Date(Date.parse(`${iso}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10)

function offres(f: FicheNote) {
  const liste = f.offres.map((o) => ({
    '@type': 'Offer',
    price: o.prix,
    priceCurrency: 'EUR',
    priceValidUntil: lendemain(o.date),
    url: o.url,
    seller: { '@type': 'Organization', name: o.marchand },
    ...(o.dispo === null ? {} : { availability: o.dispo ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' }),
  }))
  if (liste.length <= 1) return liste[0]
  const prix = f.offres.map((o) => o.prix)
  return { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: Math.min(...prix), highPrice: Math.max(...prix), offerCount: liste.length, offers: liste }
}

export function jsonLdProduit(f: FicheNote, page: PageFiche) {
  const r = f.robot as Robot
  const id = `${page.url}#produit`
  const o = offres(f)
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': id,
    name: f.nom,
    brand: { '@type': 'Brand', name: r.marque },
    model: r.modele,
    description: page.description,
    ...(page.image ? { image: [page.image] } : {}),
    additionalProperty: proprietes(r),
    ...(o ? { offers: o } : {}),
    ...(f.note.note !== null
      ? {
          review: {
            '@type': 'Review',
            name: `Note de ${f.nom} selon le barème public`,
            reviewBody: `Note calculée sur les caractéristiques publiées par ${r.marque}, sans essai. Confiance ${f.note.confiance} %${f.note.manques.length ? ` (${f.note.manques.join(', ')})` : ''}.`,
            author: { '@type': 'Organization', name: page.site.nom, url: page.site.url },
            publisher: { '@type': 'Organization', name: page.site.nom, url: page.site.url },
            datePublished: page.publie,
            dateModified: page.modifie,
            reviewRating: { '@type': 'Rating', ratingValue: f.note.note, bestRating: 10, worstRating: 0 },
          },
        }
      : {}),
  }
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': page.url,
    url: page.url,
    name: page.titre,
    datePublished: page.publie,
    dateModified: page.modifie,
    about: { '@id': id },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#note-resume', '#essentiel-liste'] },
  }
  return [product, webPage]
}

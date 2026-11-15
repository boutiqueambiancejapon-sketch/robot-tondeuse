/**
 * lib/promos.ts — codes promo et offres Black Friday, marque par marque.
 * Source unique des pages /code-promo et /black-friday-robot-tondeuse.
 *
 * Règles : un code ou une offre n'entre ici qu'après contrôle (code saisi dans un panier, prix comparé
 * au plus bas des 30 jours précédents chez le même marchand). Rien d'inventé : sans donnée, les tableaux
 * restent vides et les pages l'écrivent. `checkedAt` est la date du dernier contrôle fait à la main :
 * elle ne se met jamais à jour toute seule.
 * `note` : une phrase sur les promotions de la marque, seulement si elle figure déjà dans un article du site.
 */
import fs from 'fs'
import path from 'path'
import { getProduct, getPrimaryLink } from '@/lib/products'

export type PromoCode = {
  code: string
  /** Ce que le code fait, tel que constaté dans le panier (ex. « 50 € de moins dès 900 € »). */
  effet: string
  /** Marchand où le code a été saisi. */
  store: string
  /** Date du contrôle, AAAA-MM-JJ. */
  verifiedAt: string
}

export type BlackFridayOffer = {
  /** Slug de la fiche dans content/produits. */
  slug: string
  store: string
  url: string
  /** Prix relevé, en euros. */
  price: number
  /** Plus bas prix des 30 jours précédents chez le même marchand, en euros. */
  lowest30d: number
  /** Date du relevé, AAAA-MM-JJ. */
  checkedAt: string
}

export type PromoNote = { texte: string; href: string; source: string }

export type PromoBrand = {
  slug: string
  label: string
  /** Valeur de `categorie` dans content/produits/*.yaml. */
  categorie: string
  codes: PromoCode[]
  offers: BlackFridayOffer[]
  checkedAt: string
  note?: PromoNote
}

export type PromoRobot = {
  slug: string
  name: string
  /** Prix indicatif de la fiche, sans date de relevé. */
  prix: string
  image?: string
  url: string
  /** « chez Amazon », « sur husqvarna.com ». */
  ou: string
  partenaire: boolean
}

/** Date du dernier contrôle de toutes les marques. */
export const PROMOS_CHECKED_AT = '2026-11-15'

export const BLACK_FRIDAY = { year: 2026, date: '2026-11-27', cyberMonday: '2026-11-30' }

const QUAND_ACHETER: Pick<PromoNote, 'href' | 'source'> = {
  href: '/quand-acheter-robot-tondeuse-meilleur-moment-prix-2026',
  source: 'notre dossier « Quand acheter un robot tondeuse »',
}
const PRIX_BLACK_FRIDAY: Pick<PromoNote, 'href' | 'source'> = {
  href: '/robot-tondeuse-black-friday-2026-prix-a-viser',
  source: 'notre suivi des prix du Black Friday 2026',
}

const marque = (slug: string, label: string, note?: PromoNote, categorie = slug): PromoBrand => ({
  slug, label, categorie, codes: [], offers: [], checkedAt: PROMOS_CHECKED_AT, ...(note ? { note } : {}),
})

export const PROMO_BRANDS: PromoBrand[] = [
  marque('dreame', 'Dreame', {
    texte: 'En 2025, les offres Black Friday de Dreame ont couru jusqu’au 1er décembre. En 2026, le prix le plus bas relevé sur le Dreame A2 3000 date du mois d’août.',
    ...PRIX_BLACK_FRIDAY,
  }),
  marque('husqvarna', 'Husqvarna', {
    texte: 'Husqvarna ne renouvelle pas sa gamme à câble chaque année et vend beaucoup par son réseau de revendeurs. Ses prix baissent moins que ceux des robots sans fil.',
    ...QUAND_ACHETER,
  }),
  marque('worx', 'Worx'),
  marque('gardena', 'Gardena'),
  marque('segway-navimow', 'Segway Navimow', {
    texte: 'Au 13 novembre 2026, la page Black Friday de Navimow proposait seulement de s’inscrire, sans afficher de prix. En 2025, les offres Segway ont couru jusqu’au 1er décembre.',
    ...PRIX_BLACK_FRIDAY,
  }, 'segway'),
  marque('mammotion', 'Mammotion', {
    texte: 'D’après robot-tonte.fr, Mammotion a prévu des baisses sur une sélection de robots à partir du 10 novembre 2026. Nous ne les avons pas contrôlées.',
    ...PRIX_BLACK_FRIDAY,
  }),
  marque('stiga', 'Stiga'),
  marque('bosch', 'Bosch'),
  marque('ecovacs', 'Ecovacs'),
  marque('mova', 'Mova', {
    texte: 'Mova a mené une première vague d’offres du 27 octobre au 12 novembre 2026, aujourd’hui terminée. La marque annonce de nouvelles remises à partir du 16 novembre, sans avoir publié de prix.',
    ...PRIX_BLACK_FRIDAY,
  }),
  marque('einhell', 'Einhell'),
  marque('sunseeker', 'Sunseeker'),
  marque('yard-force', 'Yard Force'),
]

export function getPromoBrand(slug: string): PromoBrand | undefined {
  return PROMO_BRANDS.find((b) => b.slug === slug)
}

const ou = (store: string, url: string): string => {
  if (store.toLowerCase() === 'amazon') return 'chez Amazon'
  try {
    return `sur ${new URL(url).hostname.replace(/^www\./, '')}`
  } catch {
    return 'chez le marchand'
  }
}

/** « 899-1 399 € » → « 899 à 1 399 € », avec des espaces insécables. */
const prixLisible = (prix: string): string => prix.replace(/(\d)\s*-\s*(\d)/g, '$1 à $2').replace(/ /g, ' ')

let robotsParCategorie: Map<string, PromoRobot[]> | null = null

/** Robots d'une marque présents dans content/produits, avec leur prix indicatif et leur lien marchand. */
export function getBrandRobots(brand: PromoBrand): PromoRobot[] {
  if (!robotsParCategorie) {
    robotsParCategorie = new Map()
    const dir = path.join(process.cwd(), 'content/produits')
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort() : []
    for (const file of files) {
      const slug = file.slice(0, -5)
      const product = getProduct(slug)
      const url = product ? getPrimaryLink(product) : ''
      if (!product || !url) continue
      const store = product.links?.find((l) => l.url === url)?.store ?? ''
      const liste = robotsParCategorie.get(product.categorie) ?? []
      liste.push({
        slug,
        name: product.name,
        prix: prixLisible(product.prix),
        ...(product.image ? { image: product.image } : {}),
        url,
        ou: ou(store, url),
        partenaire: store.toLowerCase() === 'amazon',
      })
      robotsParCategorie.set(product.categorie, liste)
    }
  }
  return robotsParCategorie.get(brand.categorie) ?? []
}

/** Marques qui ont au moins une fiche robot : seules celles-ci ont une page Black Friday. */
export function getBlackFridayBrands(): PromoBrand[] {
  return PROMO_BRANDS.filter((b) => getBrandRobots(b).length > 0)
}

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

/** « 2026-11-15 » → « 15 novembre 2026 » (sans fuseau horaire). */
export function dateFr(iso: string): string {
  const [a, m, j] = iso.split('-').map(Number)
  return `${j === 1 ? '1er' : j} ${MOIS[m - 1]} ${a}`
}

/** « 2026-11-15 » → « novembre 2026 ». */
export function moisAnnee(iso: string): string {
  const [a, m] = iso.split('-').map(Number)
  return `${MOIS[m - 1]} ${a}`
}

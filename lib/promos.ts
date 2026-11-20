/**
 * lib/promos.ts — codes promo et offres Black Friday, marque par marque.
 * Source unique des pages /code-promo et /black-friday-robot-tondeuse.
 *
 * Règles : un code ou une offre n'entre ici qu'après contrôle (code saisi dans un panier, prix comparé
 * au plus bas des 30 jours précédents chez le même marchand). Rien d'inventé : sans donnée, les tableaux
 * restent vides et les pages l'écrivent. `checkedAt` est la date du dernier contrôle fait à la main :
 * elle ne se met jamais à jour toute seule.
 * `note` : une phrase sur les promotions de la marque, avec sa source (article du site ou page de la marque).
 * `releves` : prix lus sur la boutique officielle de la marque, à une date donnée. Ce ne sont pas des offres
 * confirmées (pas de plus bas des 30 jours) : la page les affiche datés, sans prix barré ni montant de remise.
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

export type PrixReleve = {
  /** Slug de la fiche dans content/produits. */
  slug: string
  /** Page du produit sur la boutique officielle de la marque. */
  url: string
  /** Prix affiché ce jour-là, en euros. */
  price: number
  /** Prix de référence affiché par la marque le même jour. Non contrôlé : jamais barré, jamais soustrait. */
  reference?: number
  /** Cadeau annoncé par la marque avec ce prix, tel qu'écrit sur sa page. */
  cadeau?: string
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
  releves: PrixReleve[]
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
  /** Lien Amazon de la fiche, s'il existe (sinon recherche Amazon affiliée). */
  amazonUrl?: string
}

/** Date du dernier contrôle de toutes les marques. */
export const PROMOS_CHECKED_AT = '2026-11-20'

export const BLACK_FRIDAY = { year: 2026, date: '2026-11-27', cyberMonday: '2026-11-30' }

const QUAND_ACHETER: Pick<PromoNote, 'href' | 'source'> = {
  href: '/quand-acheter-robot-tondeuse-meilleur-moment-prix-2026',
  source: 'notre dossier « Quand acheter un robot tondeuse »',
}

/** Relevés du 18/11/2026 : boutiques officielles de Dreame, Mammotion, Mova, Navimow et Ecovacs (pages Black Friday et fiches produit). */
const DATE_RELEVES = '2026-11-20'
const releve = (slug: string, url: string, price: number, reference: number, cadeau?: string): PrixReleve => ({
  slug, url, price, reference, checkedAt: DATE_RELEVES, ...(cadeau ? { cadeau } : {}),
})

const marque = (
  slug: string,
  label: string,
  note?: PromoNote,
  categorie = slug,
  suivi: { checkedAt?: string; releves?: PrixReleve[] } = {},
): PromoBrand => ({
  slug, label, categorie, codes: [], offers: [],
  releves: suivi.releves ?? [],
  checkedAt: suivi.checkedAt ?? PROMOS_CHECKED_AT,
  ...(note ? { note } : {}),
})

export const PROMO_BRANDS: PromoBrand[] = [
  marque('dreame', 'Dreame', {
    texte: 'Dreame annonce son Black Friday du 16 au 30 novembre 2026, après des remises ouvertes le 30 octobre.',
    href: 'https://fr.dreametech.com/pages/black-friday',
    source: 'la page Black Friday de Dreame, lue le 20 novembre 2026',
  }, 'dreame', {
    releves: [
      releve('dreame-a1-pro', 'https://fr.dreametech.com/products/robot-tondeuse-dreame-a1-pro', 599, 1099),
      releve('dreame-a2-3000', 'https://fr.dreametech.com/products/a2', 939, 1999),
      releve('dreame-a3-awd-pro-3500', 'https://fr.dreametech.com/products/dreame-robot-tondeuse-a3-awd-pro-3500', 1999, 2599),
    ],
  }),
  marque('husqvarna', 'Husqvarna', {
    texte: 'Husqvarna ne renouvelle pas sa gamme à câble chaque année et vend beaucoup par son réseau de revendeurs. Ses prix baissent moins que ceux des robots sans fil.',
    ...QUAND_ACHETER,
  }),
  marque('worx', 'Worx'),
  marque('gardena', 'Gardena'),
  marque('segway-navimow', 'Segway Navimow', {
    texte: 'Navimow annonce ses offres Black Friday du 10 au 30 novembre 2026. Le 18 novembre, sa boutique indique les i208, i215 et i220 LiDAR en rupture.',
    href: 'https://fr.navimow.com/pages/black-friday',
    source: 'la page Black Friday de Navimow, lue le 20 novembre 2026',
  }, 'segway', {
    releves: [
      releve('segway-navimow-i105e', 'https://fr.navimow.com/products/navimow-i1-robot-lawn-mower', 699, 799),
      releve('segway-navimow-i210-lidar-pro', 'https://fr.navimow.com/products/navimow-i2-lidar-pro-robot-lawn-mower', 1199, 1599),
    ],
  }),
  marque('mammotion', 'Mammotion', {
    texte: 'Mammotion annonce ses offres Black Friday du 10 au 30 novembre 2026.',
    href: 'https://fr.mammotion.com/',
    source: 'la boutique Mammotion, lue le 20 novembre 2026',
  }, 'mammotion', {
    releves: [
      releve('mammotion-luba-mini-2-awd-1000', 'https://fr.mammotion.com/products/robot-tondeuse-luba-mini-2-awd-1000', 1199, 1499),
      releve('mammotion-luba-3-awd-3000', 'https://fr.mammotion.com/products/robot-tondeuse-luba-3-awd', 2149, 2699),
      releve('mammotion-luba-3-awd-5000', 'https://fr.mammotion.com/products/robot-tondeuse-luba-3-awd', 2599, 3199),
    ],
  }),
  marque('stiga', 'Stiga', {
    texte: 'Stiga annonce 10 % sur un premier achat contre une inscription à sa lettre. Nous n’avons pas vérifié si cette remise s’applique à un robot tondeuse.',
    href: 'https://www.stiga.com/fr/',
    source: 'le site de Stiga, lu le 18 novembre 2026',
  }),
  marque('bosch', 'Bosch', {
    texte: 'Bosch publie le code BLACKFRIDAY26 du 13 novembre au 2 décembre 2026, pour une sélection d’outils 18 V. Aucun robot Indego ne figure parmi les outils affichés et nous n’avons pas essayé le code sur un robot.',
    href: 'https://www.bosch-diy.com/fr/fr/blackweekpromo',
    source: 'la page « Semaines Black Friday » de Bosch, lue le 20 novembre 2026',
  }),
  marque('ecovacs', 'Ecovacs', {
    texte: 'Ecovacs annonce son Black Friday du 9 au 30 novembre 2026. Pour le Goat A1600 LiDAR Pro, sa boutique indique elle-même 999 € comme prix le plus bas des 30 derniers jours.',
    href: 'https://www.ecovacs.com/fr/shop/goat-robotic-lawn-mower',
    source: 'la boutique Ecovacs, lue le 20 novembre 2026',
  }, 'ecovacs', {
    releves: [
      releve('ecovacs-goat-a1600-lidar-pro', 'https://www.ecovacs.com/fr/shop/goat-robotic-lawn-mower/goat-a1600-lidar-pro', 799, 1499),
    ],
  }),
  marque('mova', 'Mova', {
    texte: 'Mova annonce ses offres Black Friday du 10 au 30 novembre 2026, après un accès anticipé du 27 octobre au 9 novembre.',
    href: 'https://fr.mova.tech/pages/offre-black-friday',
    source: 'la page Black Friday de Mova, lue le 20 novembre 2026',
  }, 'mova', {
    releves: [
      releve('mova-viax-250', 'https://fr.mova.tech/products/robot-tondeuse-viax-250', 479, 579),
      releve('mova-lidax-ultra-800', 'https://fr.mova.tech/products/robot-tondeuse-lidax-ultra', 699, 949, 'garage offert'),
      releve('mova-lidax-ultra-1200', 'https://fr.mova.tech/products/robot-tondeuse-lidax-ultra', 749, 1099),
    ],
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
        amazonUrl: product.links?.find((l) => l.store.toLowerCase() === 'amazon')?.url,
      })
      robotsParCategorie.set(product.categorie, liste)
    }
  }
  return robotsParCategorie.get(brand.categorie) ?? []
}

/** Prix haut d'une fourchette « 1 599-1 899 € » → 1899 (0 si illisible). */
function prixHaut(prix: string): number {
  const nombres = prix.replace(/[\s\u00a0\u202f]/g, '').match(/\d+/g)
  return nombres ? Math.max(...nombres.map(Number)) : 0
}

/** Les robots les plus haut de gamme d'une marque (prix indicatif le plus élevé d'abord). */
export function getTopRobots(robots: PromoRobot[], n = 3): PromoRobot[] {
  return [...robots].sort((a, b) => prixHaut(b.prix) - prixHaut(a.prix)).slice(0, n)
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

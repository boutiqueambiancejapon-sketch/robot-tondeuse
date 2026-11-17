/**
 * encarts.ts — carte des conversions (lot 1, D5) : au plus un encart au milieu de l'article
 * et un en fin d'article, choisis selon le type de page. Jamais deux fois la même demande.
 * Fonction pure : rien d'affiché ici (voir components/blog/Encart.tsx).
 *
 * | Type de page   | Milieu                         | Fin        |
 * | guide-achat    | marchand                       | quiz       |
 * | comparatif     | marchand                       | quiz       |
 * | gazon          | calendrier                     | quiz       |
 * | reglementation | calendrier                     | —          |
 * | depannage      | — (réservé à D7 : « la pièce ») | calendrier |
 *
 * Encart marchand : seulement si l'auteur n'a posé aucun <ProductCTA> dans le texte
 * (sinon ce serait un doublon) et si l'article a un lien marchand dans son en-tête.
 * Encart de fin : retiré si la dernière partie du texte mène déjà au même endroit.
 */
import type { PageType } from './page-type'

export type EncartKind = 'marchand' | 'quiz' | 'calendrier'
export type Encarts = { milieu: EncartKind | null; fin: EncartKind | null }

/** Adresse de l'encart quand il mène à une page du site. */
export const ENCART_HREF: Record<Exclude<EncartKind, 'marchand'>, string> = {
  quiz: '/quiz',
  calendrier: '/calendrier-du-gazon',
}

/** Un lien marchand est une adresse externe : `/quiz` ou un autre article n'en est pas un. */
export function isMerchantUrl(url: string | undefined): boolean {
  return /^https?:\/\//.test(url ?? '')
}

const CARTE: Record<PageType, Encarts> = {
  'guide-achat': { milieu: 'marchand', fin: 'quiz' },
  comparatif: { milieu: 'marchand', fin: 'quiz' },
  gazon: { milieu: 'calendrier', fin: 'quiz' },
  reglementation: { milieu: 'calendrier', fin: null },
  depannage: { milieu: null, fin: 'calendrier' },
}

export function chooseEncarts(input: {
  pageType: PageType
  /** Corps de l'article (MDX), pour repérer les encarts produit déjà écrits par l'auteur. */
  content: string
  /** L'article a-t-il un lien marchand dans son en-tête (`stickyCta`) ? */
  hasMerchantLink: boolean
}): Encarts {
  const carte = CARTE[input.pageType]
  let { milieu, fin } = carte
  if (milieu === 'marchand' && (/<ProductCTA\b/.test(input.content) || !input.hasMerchantLink)) milieu = null
  if (fin && fin !== 'marchand') {
    const dernierePartie = input.content.split(/^## /m).pop() ?? ''
    if (dernierePartie.includes(`](${ENCART_HREF[fin]}`)) fin = null
  }
  return { milieu, fin }
}

/**
 * Rang (à partir de 0) du H2 avant lequel poser l'encart du milieu, ou -1 si l'article
 * a moins de 3 H2 (trop court pour avoir un milieu).
 */
export function middleH2Index(h2Count: number): number {
  return h2Count < 3 ? -1 : Math.ceil(h2Count / 2)
}

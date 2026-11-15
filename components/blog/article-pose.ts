import type { Pose } from '@/lib/mascotte'
import type { PageType } from '@/lib/utils/page-type'

/** Classement : « meilleur… », « top 5 », « classement ». */
const CLASSEMENT = /^meilleur|-top-\d|classement/

/** Pose de la mascotte à droite du titre, selon le type de page (table de tasks/design-v2.md). */
export function poseArticle(pageType: PageType, slug: string): Pose {
  if (pageType === 'comparatif') return slug.includes('-vs-') ? 'boxe' : 'podium'
  if (pageType === 'depannage') return 'outils'
  if (pageType === 'gazon') return 'jardinier'
  if (pageType === 'guide-achat' && CLASSEMENT.test(slug)) return 'podium'
  return 'lecture'
}

import { CATEGORY_LABELS } from '@/lib/blog'
import type { Pose } from '@/lib/mascotte'

/** Libellés des rubriques qui n'ont pas d'entrée dans niche.config (catégories écrites dans les articles). */
const LIBELLES: Record<string, string> = {
  astuces: 'Astuces',
  comparatif: 'Comparatifs',
  'guide-achat': 'Guides d’achat',
  'guides-achat': 'Guides d’achat',
  'entretien-robot': 'Entretien du robot',
  tuto: 'Tutoriels',
  faq: 'Questions fréquentes',
  general: 'Général',
  'robot-piscine': 'Robots de piscine',
}

export function rubriqueLabel(slug: string): string {
  return CATEGORY_LABELS[slug] ?? LIBELLES[slug] ?? slug
}

/** Mascotte de la rubrique : jardinier pour le gazon, outils pour l'entretien et le dépannage, lecture sinon. */
export function rubriquePose(slug: string): Pose {
  if (/pelouse|gazon/.test(slug)) return 'jardinier'
  if (/entretien|depannage|tuto/.test(slug)) return 'outils'
  return 'lecture'
}

/**
 * piscine.ts — rubrique « Robots de piscine » (adresses /robot-piscine/<page>).
 * Fonctions pures : aucune lecture de fichier. Le chargement est dans lib/piscine.ts.
 * Aucun modèle, prix ni note ici : la rubrique se remplit avec les articles.
 */
import { isPageType, type PageType } from './page-type'

export const PISCINE_DOSSIER = 'robot-piscine'
export const PISCINE_LABEL = 'Robots de piscine'

export const BASSIN_KEYS = ['hors-sol', 'enterree', 'ligne-eau', 'sans-fil'] as const
export type BassinKey = (typeof BASSIN_KEYS)[number]

export type Bassin = { key: BassinKey; label: string; small: string; titre: string; conseil: string }

/** Les quatre entrées de la page de rubrique. Le conseil dit quoi regarder sur la fiche, sans citer de modèle. */
export const BASSINS: Bassin[] = [
  {
    key: 'hors-sol',
    label: 'Hors-sol',
    small: 'fond plat, liner',
    titre: 'Pour une piscine hors-sol',
    conseil:
      'Un robot qui nettoie le fond suffit le plus souvent. Regardez sur la fiche la longueur de bassin annoncée et la mention « compatible liner ».',
  },
  {
    key: 'enterree',
    label: 'Enterrée',
    small: 'fond et parois',
    titre: 'Pour une piscine enterrée',
    conseil:
      'Cherchez un robot annoncé pour le fond et les parois, avec un câble ou une autonomie à la mesure de la longueur du bassin. Vérifiez le revêtement accepté : liner, carrelage, coque ou béton.',
  },
  {
    key: 'ligne-eau',
    label: 'Ligne d’eau',
    small: 'traces de calcaire',
    titre: 'Pour nettoyer la ligne d’eau',
    conseil:
      'Tous les robots qui montent aux parois ne brossent pas la ligne d’eau. La fiche doit l’écrire en toutes lettres.',
  },
  {
    key: 'sans-fil',
    label: 'Sans fil',
    small: 'sur batterie',
    titre: 'Les robots de piscine sans fil',
    conseil:
      'Aucun câble dans l’eau, mais une batterie à recharger hors du bassin entre deux cycles. Comparez l’autonomie annoncée à la taille de votre piscine.',
  },
]

export function isBassinKey(value: unknown): value is BassinKey {
  return typeof value === 'string' && (BASSIN_KEYS as readonly string[]).includes(value)
}

const PAR_ADRESSE: [BassinKey, RegExp][] = [
  ['hors-sol', /hors-sol|tubulaire|autoportante/],
  ['enterree', /enterree|parois/],
  ['ligne-eau', /ligne-d-eau|ligne-eau/],
  ['sans-fil', /sans-fil|batterie/],
]

/**
 * Bassins d'un article : le champ `bassins` de son en-tête s'il existe, sinon les mots de son adresse.
 * Une liste vide veut dire « article général » : il reste affiché quel que soit le bassin choisi.
 */
export function bassinsForArticle(input: { slug: string; bassins?: unknown }): BassinKey[] {
  if (Array.isArray(input.bassins)) return input.bassins.filter(isBassinKey)
  const slug = input.slug.toLowerCase()
  return PAR_ADRESSE.filter(([, motif]) => motif.test(slug)).map(([key]) => key)
}

/** Le lecteur a déjà un robot : panne, entretien, rangement d'hiver. Une page d'accessoire reste une page d'achat. */
const DEPANNAGE = /panne|ne-(demarre|monte|avance|charge|fonctionne)|entretien|entretenir|hivern|nettoyer/

/**
 * Type de page d'un article piscine. `pageType` de l'en-tête d'abord. Sinon : duel ou comparatif,
 * puis entretien et panne, puis guide d'achat (classements, avis de marque, « quel robot… »).
 * Les règles « gazon » et « réglementation » des robots tondeuses ne s'appliquent pas ici.
 */
export function piscinePageType(input: { slug: string; pageType?: unknown }): PageType {
  if (isPageType(input.pageType)) return input.pageType
  const slug = input.slug.toLowerCase()
  if (/-vs-|comparatif|-ou-/.test(slug)) return 'comparatif'
  if (DEPANNAGE.test(slug)) return 'depannage'
  return 'guide-achat'
}

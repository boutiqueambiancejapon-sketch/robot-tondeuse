/**
 * page-type.ts — type de page d'un article (carte des conversions, lot 1).
 * Un type = un objectif principal (voir tasks/plan-v2.md, lot 1).
 * Fonction pure : aucune lecture de fichier, rien d'affiché.
 *
 * Ordre de décision :
 *   1. `pageType` écrit dans l'en-tête de l'article (prioritaire)
 *   2. réglementation → 3. comparatif → 4. guide d'achat (adresse)
 *   5. dépannage → 6. gazon → 7. catégorie → 8. guide d'achat par défaut
 * La catégorie seule ne suffit pas : « astuces » mélange tous les types.
 */

export const PAGE_TYPES = [
  'guide-achat',
  'comparatif',
  'depannage',
  'gazon',
  'reglementation',
] as const

export type PageType = (typeof PAGE_TYPES)[number]

export function isPageType(value: unknown): value is PageType {
  return typeof value === 'string' && (PAGE_TYPES as readonly string[]).includes(value)
}

/** Règles, horaires, bruit, copropriété : le lecteur cherche une réponse. */
const REGLEMENTATION = /reglementation|horaires-tonte|bruit-voisinage|copropriete/

/** A contre B : le lecteur veut trancher. */
const COMPARATIF = /-vs-|comparatif/

/** Le lecteur choisit un robot : classements, « quel robot pour… », gammes, fiches avis. */
const GUIDE_ACHAT =
  /^meilleur-|^quel-robot-tondeuse|^quel(le)?-.+-choisir|-top-\d|guide-achat|^test-.+-avis$/

/** Le lecteur a déjà un robot : panne, pièce à changer, entretien, installation, hivernage. */
const DEPANNAGE =
  /depannage|ne-charge-plus|^cable-peripherique|^lames-|^batterie-robot-tondeuse|entretien-robot|entretenir-son-robot|hivern|nettoyer-robot|^installation-robot|installer-robot-tondeuse|station-de-charge/

/** Le lecteur veut un beau gazon : tonte, saisons, soins. */
const GAZON =
  /gazon|pelouse|scarifier|arros|mousse|feuilles-mortes|tonte|tondre|mulching|hauteur-coupe|taupinieres/

const PAR_CATEGORIE: Record<string, PageType> = {
  comparatif: 'comparatif',
  'entretien-pelouse': 'gazon',
  'entretien-robot': 'depannage',
  tuto: 'depannage',
}

export function getPageType(input: {
  slug: string
  categorie?: string
  pageType?: unknown
}): PageType {
  if (isPageType(input.pageType)) return input.pageType
  const slug = input.slug.toLowerCase()
  const categorie = input.categorie ?? ''

  if (REGLEMENTATION.test(slug)) return 'reglementation'
  if (COMPARATIF.test(slug) || categorie === 'comparatif') return 'comparatif'
  if (GUIDE_ACHAT.test(slug)) return 'guide-achat'
  if (DEPANNAGE.test(slug)) return 'depannage'
  if (GAZON.test(slug)) return 'gazon'
  return PAR_CATEGORIE[categorie] ?? 'guide-achat'
}

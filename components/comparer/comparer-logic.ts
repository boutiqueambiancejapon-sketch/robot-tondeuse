import type { ModeleComparateur } from '@/lib/comparateur'

/** Critères chiffrés où « le meilleur » a un sens. Navigation et connectivité ne se classent pas. */
const SENS: Record<string, 'max' | 'min'> = { surface: 'max', pente: 'max', autonomie: 'max', bruit: 'min' }

const ESPACE = ' '

/** « 1500 m² » → 1500. Une valeur absente ou non chiffrée renvoie null. */
export function nombre(valeur: string | undefined): number | null {
  const m = valeur?.replace(/\s/g, '').match(/^\d+(?:[.,]\d+)?/)
  return m ? parseFloat(m[0].replace(',', '.')) : null
}

/** Typographie française : « 1 500 m² », « 45 % ». */
export function afficher(valeur: string | undefined): string {
  if (!valeur) return '—'
  return valeur
    .replace(/^\d{4,}(?=\s)/, (n) => Number(n).toLocaleString('fr-FR'))
    .replace(/(\d)\s?%/g, `$1${ESPACE}%`)
}

export function euros(n: number): string {
  return `${n.toLocaleString('fr-FR')}${ESPACE}€`
}

/** Index des colonnes à mettre en avant : aucune si une valeur manque ou si tout le monde est à égalité. */
function meilleurs(valeurs: (number | null)[], sens: 'max' | 'min'): Set<number> {
  const nums = valeurs.filter((v): v is number => v !== null)
  if (nums.length !== valeurs.length || nums.length < 2 || nums.every((v) => v === nums[0])) return new Set()
  const cible = sens === 'max' ? Math.max(...nums) : Math.min(...nums)
  return new Set(valeurs.flatMap((v, i) => (v === cible ? [i] : [])))
}

export function meilleursPrix(modeles: ModeleComparateur[]): Set<number> {
  return meilleurs(modeles.map((m) => m.prix), 'min')
}

export function meilleursSpec(modeles: ModeleComparateur[], cle: string): Set<number> {
  const sens = SENS[cle]
  return sens ? meilleurs(modeles.map((m) => nombre(m.specs[cle])), sens) : new Set()
}

export type Verdict = { moinsCher: ModeleComparateur; plusGrand: ModeleComparateur; memeSurface: boolean; ecart: number }

/** Les deux faits de la phrase de verdict : le moins cher, et celui qui couvre la plus grande surface. */
export function verdict(modeles: ModeleComparateur[]): Verdict | null {
  if (modeles.length < 2) return null
  const surface = (m: ModeleComparateur) => nombre(m.specs.surface) ?? 0
  const moinsCher = modeles.reduce((a, b) => (b.prix < a.prix ? b : a))
  const max = Math.max(...modeles.map(surface))
  // À surface égale, le moins cher garde l'avantage.
  const plusGrand = surface(moinsCher) === max ? moinsCher : modeles.reduce((a, b) => (surface(b) > surface(a) ? b : a))
  const memeSurface = modeles.every((m) => surface(m) === max)
  return { moinsCher, plusGrand, memeSurface, ecart: plusGrand.prix - moinsCher.prix }
}

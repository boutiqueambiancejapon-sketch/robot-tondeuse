/**
 * lib/modele/note.ts — note sur 10 d'un produit par le barème public de son site (niches/<site>/bareme.ts).
 * Même règle que lib/note-objective.ts : un critère sans valeur publiée ne compte ni pour ni contre ; sous le seuil
 * de confiance (part des points connus), pas de note. Rien n'est deviné.
 */
import type { CritereNote } from '@/lib/note-objective'
import type { Bareme, CritereBareme, ProduitCatalogue } from '@/niches/types'

export type NoteProduit = { note: number | null; confiance: number; criteres: CritereNote[]; manques: string[] }

const nf = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })

/** Points d'un critère pour une valeur : meilleur palier atteint, 0 si aucun. */
export function pointsCritere(c: CritereBareme, v: number): number {
  const atteints = c.paliers.filter((p) => (c.sens === 'haut' ? v >= p.des : v <= p.des))
  return Math.min(c.max, Math.max(0, ...atteints.map((p) => p.points)))
}

export function noterProduit(p: ProduitCatalogue, bareme: Bareme, unites: Record<string, string | undefined> = {}): NoteProduit {
  const criteres: CritereNote[] = bareme.criteres.map((c) => {
    const brut = p.caracteristiques[c.champ]
    if (typeof brut !== 'number') return { id: c.id, titre: c.titre, points: null, max: c.max, texte: 'valeur non publiée' }
    const u = unites[c.champ] ? ` ${unites[c.champ]}` : ''
    return { id: c.id, titre: c.titre, points: pointsCritere(c, brut), max: c.max, texte: `${nf.format(brut)}${u}` }
  })
  const total = criteres.reduce((a, c) => a + c.max, 0)
  const connus = criteres.filter((c) => c.points !== null)
  const maxConnu = connus.reduce((a, c) => a + c.max, 0)
  const confiance = total ? Math.round((maxConnu / total) * 100) : 0
  const points = connus.reduce((a, c) => a + (c.points as number), 0)
  const note = confiance >= bareme.confianceMin && maxConnu ? Math.round((points / maxConnu) * 100) / 10 : null
  return { note, confiance, criteres, manques: criteres.filter((c) => c.points === null).map((c) => c.titre.toLowerCase()) }
}

/** Rang d'un produit parmi les produits notés du catalogue (1 = meilleure note). */
export function rangProduit(id: string, notes: Map<string, number | null>): { rang: number; notes: number } | null {
  const tries = [...notes].filter((e): e is [string, number] => e[1] !== null).sort((a, b) => b[1] - a[1])
  const i = tries.findIndex(([k]) => k === id)
  return i < 0 ? null : { rang: i + 1, notes: tries.length }
}

/**
 * Prix Cdiscount et Fnac relevés dans les flux Awin (content/offres/offres.json).
 * Sans accès aux fichiers : utilisable dans un composant client.
 */
import offresData from '@/content/offres/offres.json'
import type { Offre } from './offres-format'

export type Releve = { prix: number; url: string; date: string }
const RELEVES = offresData as Record<string, { cdiscount?: Releve; fnac?: Releve }>

/** Même clé que scripts/offres-awin.mjs : minuscules, sans accents ni ponctuation, « + » lu « plus ». */
export const cleNom = (n: string) =>
  n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, ' ').trim()

export function releves(nom: string, slug?: string) {
  return (slug ? RELEVES[slug] : undefined) ?? RELEVES[`nom:${cleNom(nom)}`]
}

/** Seulement les offres Cdiscount et Fnac relevées dans les flux, avec prix et date (pour les encarts d'article). */
export function offresRelevees(nom: string, slug?: string): Offre[] {
  const r = releves(nom, slug)
  const list: Offre[] = []
  if (r?.cdiscount) list.push({ marchand: 'Cdiscount', url: r.cdiscount.url, prix: r.cdiscount.prix, date: r.cdiscount.date })
  if (r?.fnac) list.push({ marchand: 'Fnac', url: r.fnac.url, prix: r.fnac.prix, date: r.fnac.date })
  return list.sort((a, b) => (a.prix ?? 0) - (b.prix ?? 0))
}


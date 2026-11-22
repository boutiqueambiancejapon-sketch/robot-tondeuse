/**
 * lib/notes-fiches.ts — note sur 100 des fiches robots (lot 3, pas 3, 22/11/2026).
 *
 * Une seule source pour les caractéristiques : le comparateur (lib/comparateur.ts), déjà publié sur /comparer.
 * Le prix utilisé est le plus bas prix relevé et daté (Cdiscount ou Fnac, content/offres/offres.json).
 * Pas de prix daté, ou une caractéristique manque → pas de note (aucune note devinée).
 * Sans accès aux fichiers : utilisable dans un composant client.
 */
import { COMPARATEURS } from './comparateur'
import { lireFiche, noter, SEUIL_PROPOSER_MIEUX } from './bareme'
import { cleNom, releves } from './offres-releves'

/** Fiche (content/produits/<slug>.yaml) → modèle du comparateur. Premier lot : seulement les correspondances sûres. */
export const FICHES_NOTEES: Record<string, { nom: string; produit: string; modele: string }> = {
  'mammotion-luba-3-awd-3000': { nom: 'Mammotion Luba 3 AWD 3000', produit: 'mammotion', modele: 'LUBA 3 AWD 3000' },
  'mammotion-luba-mini-2-awd-1000': { nom: 'Mammotion Luba Mini 2 AWD 1000', produit: 'mammotion', modele: 'LUBA Mini 2 AWD 1000' },
  'mammotion-luba-mini-awd-lidar-1500': { nom: 'Mammotion Luba Mini AWD LiDAR 1500', produit: 'mammotion', modele: 'LUBA Mini AWD LiDAR' },
  'mammotion-luba-mini-awd-800': { nom: 'Mammotion Luba Mini AWD 800', produit: 'mammotion', modele: 'LUBA Mini AWD 800' },
  'mammotion-yuka-mini-2-1000': { nom: 'Mammotion Yuka Mini 2 1000', produit: 'mammotion', modele: 'YUKA Mini 2 1000' },
  'mammotion-yuka-mini-2-500': { nom: 'Mammotion Yuka Mini 2 500', produit: 'mammotion', modele: 'YUKA Mini 2 500' },
  'husqvarna-automower-310-mark-ii': { nom: 'Husqvarna Automower 310 Mark II', produit: 'husqvarna', modele: 'Automower 310 Mark II' },
  'husqvarna-automower-aspire-r4': { nom: 'Husqvarna Automower Aspire R4', produit: 'husqvarna', modele: 'Automower Aspire R4' },
  'worx-landroid-vision-cloud-4wd-wr340e': { nom: 'Worx Landroid Vision Cloud 4WD WR340E', produit: 'worx', modele: 'Vision Cloud 4WD WR340E' },
  'bosch-indego-s-plus-500': { nom: 'Bosch Indego S+ 500', produit: 'bosch', modele: 'Indego S+ 500' },
}

export type NoteFiche = {
  note: number
  prix: number
  marchand: 'Cdiscount' | 'Fnac'
  date: string
  url: string
  surface: number
  proposerMieux: boolean
}

const PAR_NOM = Object.fromEntries(Object.entries(FICHES_NOTEES).map(([slug, f]) => [cleNom(f.nom), slug]))

/** Note d'une fiche, par son slug ou son nom ; null si la fiche n'est pas notée. */
export function noteFiche(nom: string, slug?: string): NoteFiche | null {
  const s = slug && FICHES_NOTEES[slug] ? slug : PAR_NOM[cleNom(nom)]
  const f = s ? FICHES_NOTEES[s] : undefined
  if (!s || !f) return null
  return noteSlug(s)
}

function noteSlug(s: string): NoteFiche | null {
  const f = FICHES_NOTEES[s]
  const modele = COMPARATEURS[f.produit]?.modeles.find((m) => m.nom === f.modele)
  if (!modele) return null
  const r = releves(f.nom, s)
  const offres = [
    r?.cdiscount ? { ...r.cdiscount, marchand: 'Cdiscount' as const } : null,
    r?.fnac ? { ...r.fnac, marchand: 'Fnac' as const } : null,
  ].filter((o): o is NonNullable<typeof o> => Boolean(o?.prix && o.date))
  const bas = offres.sort((a, b) => a.prix - b.prix)[0]
  if (!bas) return null
  const c = lireFiche(bas.prix, modele.specs)
  if (!c) return null
  const { note, proposerMieux } = noter(c)
  return { note, prix: bas.prix, marchand: bas.marchand, date: bas.date, url: bas.url, surface: c.surface, proposerMieux }
}

export type Alternative = NoteFiche & { slug: string; nom: string }

/**
 * Règle du barème : sous SEUIL_PROPOSER_MIEUX, montrer jusqu'à 2 robots mieux notés (note ≥ seuil),
 * de surface annoncée la plus proche. À surface égale, la meilleure note d'abord.
 */
export function mieuxNotes(nom: string, slug?: string, combien = 2): Alternative[] {
  const ici = noteFiche(nom, slug)
  if (!ici?.proposerMieux) return []
  const soi = slug && FICHES_NOTEES[slug] ? slug : PAR_NOM[cleNom(nom)]
  return Object.keys(FICHES_NOTEES)
    .filter((s) => s !== soi)
    .map((s) => {
      const n = noteSlug(s)
      return n ? { ...n, slug: s, nom: FICHES_NOTEES[s].nom } : null
    })
    .filter((a): a is Alternative => Boolean(a && a.note >= SEUIL_PROPOSER_MIEUX && a.note > ici.note))
    .sort((a, b) => Math.abs(a.surface - ici.surface) - Math.abs(b.surface - ici.surface) || b.note - a.note)
    .slice(0, combien)
}

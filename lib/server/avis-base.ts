/**
 * lib/server/avis-base.ts — quels robots de la base ont une page « Avis » générée (/avis-<id>) : publiés dans un lot de
 * data/avis-lots.json, sans avis MDX (champ `base`), sans adresse déjà prise. Lit les articles : côté serveur seulement.
 */
import { getAllStandaloneArticles } from '@/lib/articles'
import { dateModif, idsPublies, indexable, lotDe, PREFIXE, slugAvis, type RobotBase } from '@/lib/avis-base'
import { CATALOGUE } from '@/lib/radar-fiche'

export const BASE = CATALOGUE as RobotBase[]

/** Avis MDX existants, par id de la base (champ `base`) : ces robots n'ont pas de page générée. */
function avisMdx(): Map<string, string> {
  const m = new Map<string, string>()
  for (const a of getAllStandaloneArticles()) {
    const ids = a.base === undefined ? [] : Array.isArray(a.base) ? a.base : [a.base]
    for (const id of ids) if (!m.has(id) || /^(avis|test)-/.test(a.slug)) m.set(id, a.slug)
  }
  return m
}

function robotsServis(): RobotBase[] {
  const mdx = avisMdx()
  const slugs = new Set(getAllStandaloneArticles().map((a) => a.slug))
  return idsPublies()
    .filter((id) => !mdx.has(id) && !slugs.has(slugAvis(id)))
    .map((id) => BASE.find((r) => r.id === id))
    .filter((r): r is RobotBase => Boolean(r))
}

export const slugsAvisBase = () => robotsServis().map((r) => slugAvis(r.id))

export const robotDe = (slug: string) => (slug.startsWith(PREFIXE) ? (robotsServis().find((r) => slugAvis(r.id) === slug) ?? null) : null)
export const estAvisBase = (slug: string) => robotDe(slug) !== null

/** Adresses indexables (plan du site et IndexNow), avec leur date de mise à jour. */
export function avisBaseIndexables(): { slug: string; modifie: string }[] {
  return robotsServis()
    .filter((r) => indexable(r, BASE).ok)
    .map((r) => ({ slug: slugAvis(r.id), modifie: dateModif(r, lotDe(r.id)?.publie_le ?? '') }))
}

/** Adresse de la fiche d'un robot sur le site : avis MDX, sinon page de la base, sinon aucune. */
export function hrefRobot(id: string): string | undefined {
  const mdx = avisMdx().get(id)
  if (mdx) return `/${mdx}`
  return slugsAvisBase().includes(slugAvis(id)) ? `/${slugAvis(id)}` : undefined
}


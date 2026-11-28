/**
 * niche.config.ts — réglages du site lu, pour tout le code existant (import { niche } from '@/niche.config').
 * Depuis le 28/11/2026, les valeurs vivent dans niches/<site>/site.ts (un dossier par site) ; le site lu est choisi
 * par NEXT_PUBLIC_SITE (niches/index.ts), Quel Robot Tondeuse par défaut. Pour changer un réglage de QRT :
 * niches/robot-tondeuse/site.ts.
 */
import { siteActif } from '@/niches'
import type { NicheConfig } from '@/niches/types'

export type { NicheConfig } from '@/niches/types'

export const niche: NicheConfig = siteActif.site

// ─── Helpers ────────────────────────────────────────────────────────────

/** Accent CSS variable for a given category index. */
const ACCENT_VARS = ['var(--accent-1)', 'var(--accent-2)', 'var(--accent-3)', 'var(--accent-4)', 'var(--accent-5)']

export function categoryAccent(index: number): string {
  return ACCENT_VARS[index % ACCENT_VARS.length]
}

/** Map category slug → label */
export function categoryLabels(): Record<string, string> {
  const map: Record<string, string> = {}
  for (const cat of niche.categories) map[cat.slug] = cat.label
  return map
}

/** Map category slug → CSS accent variable */
export function categoryAccents(): Record<string, string> {
  const map: Record<string, string> = {}
  niche.categories.forEach((cat, i) => {
    map[cat.slug] = categoryAccent(i)
  })
  return map
}

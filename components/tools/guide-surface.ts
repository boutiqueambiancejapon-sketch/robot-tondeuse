/** Guides d'achat par surface déjà publiés (content/articles), du plus petit jardin au plus grand. */
const PALIERS: [number, string][] = [
  [100, '/quel-robot-tondeuse-pour-100m2-guide-achat-2026'],
  [200, '/quel-robot-tondeuse-pour-200m2-guide-achat-2026'],
  [300, '/quel-robot-tondeuse-pour-300m2-guide-achat-2026'],
  [400, '/quel-robot-tondeuse-pour-400m2-guide-achat-2026'],
  [500, '/quel-robot-tondeuse-pour-500m2-guide-achat-2026'],
  [600, '/quel-robot-tondeuse-pour-600m2-guide-achat-2026'],
  [700, '/quel-robot-tondeuse-pour-700m2-guide-achat-2026'],
  [800, '/quel-robot-tondeuse-pour-800m2-guide-achat-2026'],
  [900, '/quel-robot-tondeuse-pour-900m2-guide-achat-2026'],
  [1000, '/quel-robot-tondeuse-pour-1000m2-grand-terrain'],
  [1200, '/quel-robot-tondeuse-pour-1200m2-guide-achat-2026'],
  [1500, '/quel-robot-tondeuse-pour-1500m2-guide-achat-2026'],
  [2000, '/quel-robot-tondeuse-pour-2000m2-guide-achat'],
  [2500, '/quel-robot-tondeuse-pour-2500m2-guide-achat-2026'],
  [3000, '/quel-robot-tondeuse-pour-3000m2-grand-domaine-2026'],
  [4000, '/quel-robot-tondeuse-pour-4000m2-guide-achat-2026'],
  [5000, '/quel-robot-tondeuse-pour-5000m2-guide-achat-2026'],
  [10000, '/quel-robot-tondeuse-pour-1-hectare-10000m2-guide-achat-2026'],
]

export type GuideSurface = { href: string; label: string }

/** La page de comparatifs adaptée à une surface : le premier guide qui la couvre, sinon tous les comparatifs. */
export function guidePourSurface(m2: number): GuideSurface {
  const palier = m2 > 0 ? PALIERS.find(([max]) => max >= m2) : undefined
  if (!palier) return { href: '/comparatifs', label: 'Voir tous les comparatifs' }
  return { href: palier[1], label: `Voir les robots pour ${m2Fr(palier[0])}` }
}

/** « 1 200 m² », avec les espaces insécables. */
export function m2Fr(m2: number): string {
  return `${Math.round(m2).toLocaleString('fr-FR')} m²`
}

export function eurosFr(n: number): string {
  return `${Math.round(n).toLocaleString('fr-FR')} €`
}

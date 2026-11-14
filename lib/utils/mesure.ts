/**
 * Mesure des outils (lot 0) — sans cookie ni donnée personnelle.
 * Le navigateur appelle POST /api/m/<evenement> ; la ligne apparaît dans les journaux
 * du serveur, où le centre de contrôle la compte. Rien n'est stocké par le site.
 */
export const EVENEMENTS = ['quiz-termine', 'surface-mesuree', 'calcul-rentabilite'] as const
export type Evenement = (typeof EVENEMENTS)[number]

export function isEvenement(value: string): value is Evenement {
  return (EVENEMENTS as readonly string[]).includes(value)
}

/** Signale un événement. Ne bloque jamais l'interface et ignore les erreurs. */
export function signaler(evenement: Evenement): void {
  if (typeof window === 'undefined') return
  try {
    void fetch(`/api/m/${evenement}`, {
      method: 'POST',
      keepalive: true,
      cache: 'no-store',
      credentials: 'omit',
    }).catch(() => {})
  } catch {
    // mesure facultative : on ignore
  }
}

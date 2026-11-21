// Labels of the login journal and session stages (Security screen). Adapted from Toutou.

const KINDS: Record<string, string> = {
  password: 'Mot de passe',
  passkey: 'Face ID',
  totp: 'Code à 6 chiffres',
  enroll: 'Accès ajouté',
  logout: 'Déconnexion',
  'logout-all': 'Déconnexion partout',
  'session-closed': 'Session fermée',
  reset: 'Réinitialisation par le serveur',
}

const OUTCOMES: Record<string, string> = { success: 'réussi', failure: 'refusé', blocked: 'bloqué', cleared: 'refus effacé par le serveur' }
const STAGES: Record<string, string> = { full: 'connectée', second_factor: 'attend le second facteur', enroll: 'attend l’ajout d’un accès' }

export const eventKindLabel = (kind: string): string => KINDS[kind] ?? kind
export const eventOutcomeLabel = (outcome: string): string => OUTCOMES[outcome] ?? outcome
export const sessionStageLabel = (stage: string): string => STAGES[stage] ?? stage

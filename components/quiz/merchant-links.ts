import { COMPARATEURS } from '@/lib/comparateur'

/**
 * Liens marchands connus, par marque et modèle en minuscules (« gardena sileno city 600 »).
 * Calculé côté serveur à partir des données du comparateur, puis passé au quiz :
 * un robot conseillé sans fiche dans ces données n'a pas de bouton marchand.
 */
export function quizMerchantLinks(): Record<string, string> {
  const links: Record<string, string> = {}
  for (const produit of Object.values(COMPARATEURS)) {
    for (const modele of produit.modeles) {
      if (modele.amazonUrl) links[`${produit.id} ${modele.nom}`.toLowerCase()] = modele.amazonUrl
    }
  }
  return links
}

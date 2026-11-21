import type { SearchState } from '@/lib/server/dashboard/search'
import { Card } from '../Card'

/** Read-only Google service account already used by Toutou Gourmet and 10minlanguages.com (an address, not a secret). */
const SERVICE_ACCOUNT = 'toutou-dashboard@toutou-gourmet-514015.iam.gserviceaccount.com'

/** "À connecter": what the owner must do so the dashboard can read Search Console. */
export function Connect({ state, account }: { state: SearchState; account: string | null }) {
  return (
    <Card title="À connecter">
      <ol className="small stack">
        <li>Ouvre search.google.com/search-console, propriété « quel-robot-tondeuse.com » (domaine).</li>
        <li>Paramètres, puis « Utilisateurs et autorisations », puis « Ajouter un utilisateur ».</li>
        <li>
          Adresse : <strong className="secret">{account ?? SERVICE_ACCOUNT}</strong>
        </li>
        <li>Autorisation : « Restreinte » (lecture seule), puis « Ajouter ».</li>
        {state === 'no-key' && (
          <li>Dis à Claude « copie la clé Search Console pour Quel Robot Tondeuse » : la clé du serveur est copiée dans le dossier privé du site, lisible par lui seul.</li>
        )}
        <li>Recharge cette page : les chiffres arrivent dans l’heure.</li>
      </ol>
      <p className="tiny muted">C’est le même compte de service que celui des tableaux de bord de Toutou Gourmet et de 10minlanguages.com. Il ne peut que lire.</p>
    </Card>
  )
}

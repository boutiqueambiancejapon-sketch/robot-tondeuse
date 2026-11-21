import type { SearchState } from '@/lib/server/dashboard/search'
import { Card } from '../Card'

/** "À connecter": what the owner must do so the dashboard can read Search Console. */
export function Connect({ state, account }: { state: SearchState; account: string | null }) {
  return (
    <Card title="À connecter">
      {state === 'no-key' ? (
        <ol className="small stack">
          <li>Dans la Search Console, propriété « 10minlanguages.com » : Paramètres, « Utilisateurs et autorisations », ajouter en « Restreinte » le compte de service du tableau de bord Toutou Gourmet (son adresse est dans la Search Console de toutou-gourmet.com, même écran).</li>
          <li>Sur le serveur, copier sa clé pour ce site (accès à donner à Claude) : /srv/sites/10minlanguages/shared/gsc-key.json, groupe sites, lecture seule.</li>
          <li>Recharger cette page : les chiffres arrivent dans l’heure.</li>
        </ol>
      ) : (
        <ol className="small stack">
          <li>Ouvre search.google.com/search-console, propriété « 10minlanguages.com ».</li>
          <li>Paramètres, puis « Utilisateurs et autorisations », puis « Ajouter un utilisateur ».</li>
          <li>
            Adresse : <strong className="secret">{account}</strong>
          </li>
          <li>Autorisation : « Restreinte » (lecture seule suffit), puis « Ajouter ».</li>
          <li>Recharge cette page : les chiffres arrivent dans l’heure.</li>
        </ol>
      )}
      <p className="tiny muted">C’est le même compte de service que celui du tableau de bord de Toutou Gourmet. Il ne peut que lire.</p>
    </Card>
  )
}

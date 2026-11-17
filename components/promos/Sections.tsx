import Link from 'next/link'
import type { PromoNote } from '@/lib/promos'

const DOSSIER = '/quand-acheter-robot-tondeuse-meilleur-moment-prix-2026'
const SUIVI = '/robot-tondeuse-black-friday-2026-prix-a-viser'

/** « Comment reconnaître un faux coupon ? » : version longue sur la page mère, courte sur une page marque. */
export function FauxCoupons({ marque }: { marque?: string }) {
  if (marque) {
    return (
      <section className="prose" aria-labelledby="faux-coupons">
        <h2 id="faux-coupons">Comment reconnaître un faux code promo {marque} ?</h2>
        <p>
          Un site qui affiche « code promo {marque} -30 % » sans code à copier ne vous donne rien. Son bouton ouvre la boutique et le prix reste le même. Un code valable se saisit dans le panier, et le total baisse avant le paiement.
        </p>
        <p>
          Les autres signes sont décrits dans notre page sur les <Link className="lnk" href="/code-promo#faux-coupons">faux coupons</Link>.
        </p>
      </section>
    )
  }
  return (
    <section className="prose" aria-labelledby="faux-coupons">
      <h2 id="faux-coupons">Comment reconnaître un faux coupon ?</h2>
      <p>
        Tapez « code promo robot tondeuse » dans un moteur de recherche. Les premiers résultats promettent « -30 % » ou « 50 € offerts ». Le bouton « Voir le code » ouvre ensuite la boutique dans un nouvel onglet, et aucun code n’apparaît. Ce clic suffit au site de coupons pour toucher une commission sur votre achat.
      </p>
      <p>Quatre signes reviennent sur ces pages :</p>
      <ul className="puces">
        <li>un pourcentage affiché sans code à copier ;</li>
        <li>un code sans date de contrôle ni conditions (montant minimum, modèles concernés) ;</li>
        <li>un bouton qui demande d’installer une extension ou de créer un compte pour « débloquer » la remise ;</li>
        <li>un code que le panier refuse, ou qui laisse le total inchangé.</li>
      </ul>
      <p>
        Un vrai code se saisit dans le panier, et le total baisse avant le paiement. Faites ce test avant d’entrer votre carte bancaire.
      </p>
    </section>
  )
}

/** « Quand les robots tondeuses sont-ils les moins chers ? » : termes généraux, plus la note de la marque si le site en a une. */
export function QuandBaisse({ marque, note }: { marque?: string; note?: PromoNote }) {
  return (
    <section className="prose" aria-labelledby="quand-baisse">
      <h2 id="quand-baisse">Quand les robots tondeuses {marque ? `${marque} ` : ''}sont-ils les moins chers ?</h2>
      <p>
        Sur les robots tondeuses, les baisses les plus nettes de l’année arrivent entre la fin août et novembre. Les marchands vident d’abord leurs stocks de fin de saison. Viennent ensuite les French Days, le Prime Day d’automne et le Black Friday.
      </p>
      {marque ? null : (
        <p>
          Les robots sans fil baissent plus que les modèles à câble. Leurs gammes sont renouvelées chaque année, et l’annonce des nouveautés début septembre fait descendre le prix de la génération qu’elles remplacent.
        </p>
      )}
      {marque && note ? (
        <p>
          {note.texte} Source :{' '}
          {note.href.startsWith('http') ? (
            <a className="lnk" href={note.href} rel="nofollow noopener" target="_blank">{note.source}</a>
          ) : (
            <Link className="lnk" href={note.href}>{note.source}</Link>
          )}.
        </p>
      ) : null}
      {marque && !note ? <p>Nous n’avons pas d’historique de prix propre à {marque} à publier.</p> : null}
      <p>
        Le Black Friday ne donne pas toujours le prix le plus bas de l’année. Avant d’acheter en novembre, cherchez le plus bas prix déjà vu pour le même modèle et comparez. Notre dossier{' '}
        <Link className="lnk" href={DOSSIER}>Quand acheter un robot tondeuse</Link> donne le calendrier de l’année, et notre{' '}
        <Link className="lnk" href={SUIVI}>suivi du Black Friday 2026</Link> les prix relevés modèle par modèle.
      </p>
    </section>
  )
}

/** « Comment vérifions-nous une baisse de prix ? » : la règle des 30 jours, et ce qui manque encore pour l'appliquer. */
export function RegleBaisse() {
  return (
    <section className="prose" aria-labelledby="regle-baisse">
      <h2 id="regle-baisse">Comment vérifions-nous une baisse de prix ?</h2>
      <p>
        Une baisse compte quand le prix passe sous le plus bas des 30 jours précédents, chez le même marchand. La loi retient la même référence : un marchand qui annonce une réduction doit indiquer son prix le plus bas des 30 jours d’avant.
      </p>
      <p>
        Pour appliquer cette règle, il faut relever les prix chaque jour. Ce relevé n’est pas encore branché sur le site. D’ici là, nous n’annonçons aucune baisse et les prix de cette page restent indicatifs.
      </p>
    </section>
  )
}

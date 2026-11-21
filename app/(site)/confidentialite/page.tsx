/**
 * /confidentialite — Politique de confidentialité.
 * Mise à jour le 14/11/2026 (lot 2, G3) : lettre du jardin (Brevo), comptage sans cookie, journaux.
 * Responsable : Mathias Cetani (donné par le propriétaire le 15/11/2026).
 * E-mail : ne poser bonjour@quel-robot-tondeuse.com que lorsque la réception est confirmée.
 * noindex : page légale, pas de SEO.
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { niche } from '@/niche.config'
import { PageTitle } from '@/components/v2/PageTitle'

export const metadata: Metadata = {
  title: { absolute: `Politique de confidentialité | ${niche.siteName}` },
  description: `Politique de confidentialité du site ${niche.siteName}.`,
  robots: { index: false, follow: false },
}

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section>
      <h2>{titre}</h2>
      {children}
    </section>
  )
}

export default function ConfidentialitePage() {
  return (
    <main id="main-content" className="v2">
      <div className="wrap lst legal">
        <PageTitle
          title="Politique de confidentialité"
          meta="Mise à jour le 14 novembre 2026."
          crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Confidentialité' }]}
        />
        <div className="prose">
          <Bloc titre="Responsable du traitement">
            <p>Nom : Mathias Cetani<br />E-mail : adresse dédiée en cours de création<br />Site : {niche.siteName}, https://{niche.domain}</p>
          </Bloc>

          <Bloc titre="La lettre du jardin">
            <p>
              Si vous vous inscrivez à la lettre du jardin, nous enregistrons votre adresse e-mail, la date
              de l’inscription et la page où vous l’avez faite. Rien d’autre : ni nom, ni adresse postale.
            </p>
            <ul>
              <li>Base légale : votre consentement, donné en cochant la case du formulaire (elle n’est jamais cochée d’avance).</li>
              <li>Usage : vous envoyer la lettre du jardin, au plus une fois par mois, et les e-mails de bienvenue qui suivent l’inscription. L’adresse n’est ni vendue ni prêtée.</li>
              <li>Prestataire : Brevo (Sendinblue SAS, société française), qui stocke la liste et envoie les e-mails. Brevo héberge ces données dans l’Union européenne.</li>
              <li>Désinscription : un lien en bas de chaque e-mail, ou une demande à l’adresse ci-dessus. Votre adresse est alors retirée de la liste.</li>
              <li>Durée : tant que vous restez inscrit. Sans ouverture d’aucun e-mail pendant 3 ans, l’adresse est supprimée.</li>
            </ul>
          </Bloc>

          <Bloc titre="Mesure d’audience, sans cookie">
            <p>
              Le site ne dépose aucun cookie de mesure ni de publicité. Pour savoir quels outils servent, il
              compte de façon anonyme certains gestes : un clic vers un marchand (adresse en <code>/go/</code>),
              un quiz terminé, une surface mesurée, un calcul de rentabilité. Ces gestes laissent une ligne
              dans les journaux techniques du serveur, comme toute visite d’une page.
            </p>
            <p>
              Ces journaux contiennent l’adresse IP, la page demandée, la page d’origine, la date et le type
              de navigateur. Ils servent à la sécurité du site et au comptage des visites. Ils sont effacés
              par la rotation automatique des journaux du serveur et ne sont transmis à personne.
            </p>
          </Bloc>

          <Bloc titre="Liens vers les marchands">
            <p>
              Certains liens mènent vers Amazon ou d’autres marchands, avec un identifiant d’affiliation.
              Une fois sur leur site, c’est leur propre politique de confidentialité et de cookies qui
              s’applique.
            </p>
          </Bloc>

          <Bloc titre="Cookies">
            <p>
              Aucun cookie pour les visiteurs. Seule l’interface d’administration du site utilise un cookie
              de session, réservé à l’équipe éditoriale.
            </p>
          </Bloc>

          <Bloc titre="Vos droits">
            <p>
              Selon le RGPD, vous pouvez demander l’accès à vos données, leur correction, leur suppression
              ou leur portabilité, et vous opposer à leur traitement. Écrivez à l’adresse du responsable
              ci-dessus. Si la réponse ne vous convient pas, vous pouvez saisir la CNIL (France) ou
              l’Autorité de protection des données (Belgique).
            </p>
          </Bloc>
        </div>
      </div>
    </main>
  )
}

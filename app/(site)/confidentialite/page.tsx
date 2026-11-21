/**
 * /confidentialite — Politique de confidentialité.
 * Mise à jour le 14/11/2026 (lot 2, G3) : lettre du jardin (Brevo), comptage sans cookie, journaux.
 * Mise à jour le 21/11/2026 : tableau de bord (base qrt, code visiteur du jour, pays, gestes comptés, durées).
 * Responsable : Mathias Cetani (donné par le propriétaire le 15/11/2026).
 * E-mail : ne poser bonjour@quel-robot-tondeuse.com que lorsque la réception est confirmée.
 * noindex : page légale, pas de SEO.
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { niche } from '@/niche.config'
import { PageTitle } from '@/components/v2/PageTitle'

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${niche.siteName}`,
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
          meta="Mise à jour le 21 novembre 2026."
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
              Le site ne dépose aucun cookie de mesure ni de publicité, et n’utilise aucun outil de mesure
              extérieur. Les visites sont comptées à partir des journaux techniques du serveur, lus chaque
              minute et rangés dans une base de données hébergée sur ce même serveur.
            </p>
            <ul>
              <li>Pour une personne, nous gardons la page vue, l’heure, le site d’où elle vient (son nom seulement), le type d’appareil (téléphone, tablette, ordinateur) et le pays, lu dans l’adresse IP grâce à un fichier installé sur le serveur.</li>
              <li>L’adresse IP et le navigateur ne sont pas gardés. Ils servent à calculer un code de visiteur qui change chaque jour ; la clé de calcul est effacée après deux jours, et le code ne peut plus être relié à personne.</li>
              <li>Pour les robots (moteurs de recherche, assistants d’IA), l’adresse IP et le nom du robot sont gardés, pour repérer les faux robots.</li>
              <li>Le site compte aussi quelques gestes : un clic vers un marchand (le marchand, l’endroit du lien dans la page, le robot concerné), le robot conseillé à la fin du quiz (sans vos réponses), l’usage d’un outil et une inscription à la lettre (le formulaire utilisé, jamais l’adresse e-mail).</li>
              <li>Durée : 180 jours pour les visites, 400 jours pour les gestes. Ces chiffres ne servent qu’au tableau de bord de l’éditeur et ne sont transmis à personne.</li>
            </ul>
            <p>
              Les journaux bruts du serveur, qui contiennent l’adresse IP, servent aussi à la sécurité du
              site. Ils sont effacés par leur rotation automatique.
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
              Aucun cookie pour les visiteurs. L’interface d’administration et le tableau de bord de
              l’éditeur utilisent un cookie de session, réservé à l’équipe éditoriale.
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

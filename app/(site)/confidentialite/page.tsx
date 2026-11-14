/**
 * /confidentialite — Politique de confidentialité.
 * Mise à jour le 14/11/2026 (lot 2, G3) : lettre du jardin (Brevo), comptage sans cookie, journaux.
 * Nom et e-mail du responsable : à fournir par le propriétaire (« [À compléter] » gardé exprès).
 * noindex : page légale, pas de SEO.
 */

import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { niche } from '@/niche.config'

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${niche.siteName}`,
  description: `Politique de confidentialité du site ${niche.siteName}.`,
  robots: { index: false, follow: false },
}

const text = { fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 'var(--space-3)' }
const list = { ...text, paddingLeft: 'var(--space-6)' }

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--space-10)' }}>
      <h2 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
        {titre}
      </h2>
      {children}
    </section>
  )
}

export default function ConfidentialitePage() {
  return (
    <main id="main-content" style={{ maxWidth: '720px', margin: '0 auto', padding: 'var(--space-16) var(--space-6) var(--space-24)' }}>
      <h1 style={{ fontFamily: 'var(--next-font-display), system-ui, sans-serif', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: 'var(--space-4)' }}>
        Politique de confidentialité
      </h1>
      <p style={{ ...text, marginBottom: 'var(--space-10)' }}>Mise à jour le 14 novembre 2026.</p>

      <Bloc titre="Responsable du traitement">
        <p style={text}>Nom : [À compléter]<br />E-mail : [À compléter]<br />Site : {niche.siteName}, https://{niche.domain}</p>
      </Bloc>

      <Bloc titre="La lettre du jardin">
        <p style={text}>
          Si vous vous inscrivez à la lettre du jardin, nous enregistrons votre adresse e-mail, la date
          de l’inscription et la page où vous l’avez faite. Rien d’autre : ni nom, ni adresse postale.
        </p>
        <ul style={list}>
          <li>Base légale : votre consentement, donné en cochant la case du formulaire (elle n’est jamais cochée d’avance).</li>
          <li>Usage : vous envoyer la lettre du jardin, au plus une fois par mois, et les e-mails de bienvenue qui suivent l’inscription. L’adresse n’est ni vendue ni prêtée.</li>
          <li>Prestataire : Brevo (Sendinblue SAS, société française), qui stocke la liste et envoie les e-mails. Brevo héberge ces données dans l’Union européenne.</li>
          <li>Désinscription : un lien en bas de chaque e-mail, ou une demande à l’adresse ci-dessus. Votre adresse est alors retirée de la liste.</li>
          <li>Durée : tant que vous restez inscrit. Sans ouverture d’aucun e-mail pendant 3 ans, l’adresse est supprimée.</li>
        </ul>
      </Bloc>

      <Bloc titre="Mesure d’audience, sans cookie">
        <p style={text}>
          Le site ne dépose aucun cookie de mesure ni de publicité. Pour savoir quels outils servent, il
          compte de façon anonyme certains gestes : un clic vers un marchand (adresse en <code>/go/</code>),
          un quiz terminé, une surface mesurée, un calcul de rentabilité. Ces gestes laissent une ligne
          dans les journaux techniques du serveur, comme toute visite d’une page.
        </p>
        <p style={text}>
          Ces journaux contiennent l’adresse IP, la page demandée, la page d’origine, la date et le type
          de navigateur. Ils servent à la sécurité du site et au comptage des visites. Ils sont effacés
          par la rotation automatique des journaux du serveur et ne sont transmis à personne.
        </p>
      </Bloc>

      <Bloc titre="Liens vers les marchands">
        <p style={text}>
          Certains liens mènent vers Amazon ou d’autres marchands, avec un identifiant d’affiliation.
          Une fois sur leur site, c’est leur propre politique de confidentialité et de cookies qui
          s’applique.
        </p>
      </Bloc>

      <Bloc titre="Cookies">
        <p style={text}>
          Aucun cookie pour les visiteurs. Seule l’interface d’administration du site utilise un cookie
          de session, réservé à l’équipe éditoriale.
        </p>
      </Bloc>

      <Bloc titre="Vos droits">
        <p style={text}>
          Selon le RGPD, vous pouvez demander l’accès à vos données, leur correction, leur suppression
          ou leur portabilité, et vous opposer à leur traitement. Écrivez à l’adresse du responsable
          ci-dessus. Si la réponse ne vous convient pas, vous pouvez saisir la CNIL (France) ou
          l’Autorité de protection des données (Belgique).
        </p>
      </Bloc>
    </main>
  )
}

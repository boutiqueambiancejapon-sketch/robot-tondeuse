/**
 * /mentions-legales — Mentions légales.
 * Template placeholder — le prompt d'init remplace les valeurs.
 * noindex : page légale, pas de SEO.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { niche } from '@/niche.config'
import { PageTitle } from '@/components/v2/PageTitle'

export const metadata: Metadata = {
  title: { absolute: `Mentions légales | ${niche.siteName}` },
  description: `Mentions légales du site ${niche.siteName}.`,
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <main id="main-content" className="v2">
      <div className="wrap lst legal">
        <PageTitle title="Mentions légales" crumbs={[{ href: '/', label: 'Accueil' }, { label: 'Mentions légales' }]} />
        <div className="prose">
          {/* Éditeur du site */}
          <section>
            <h2>Éditeur du site</h2>
            <div>
              <p>Site : {niche.siteName} — https://{niche.domain}</p>
              <p>Titulaire : Mathias Cetani</p>
              <p>Numéro d’entreprise (BCE) et TVA : BE 0683.927.006</p>
              <p>Adresse : Lindestraat 94, 1785 Merchtem, Belgique</p>
              <p>E-mail : bonjour@quel-robot-tondeuse.com</p>
              <p>Responsable de la publication : Mathias Cetani</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2>Hébergeur</h2>
            <div>
              <p>one.com, serveur privé virtuel exploité par Hostnet B.V.</p>
              <p>De Ruyterkade 6, 1013 AA Amsterdam, Pays-Bas</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L&rsquo;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.)
              est la propriété exclusive de {niche.siteName}, sauf mention contraire. Toute reproduction,
              représentation, modification, publication ou adaptation de tout ou partie des éléments du
              site est interdite sans autorisation écrite préalable.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2>Données personnelles</h2>
            <p>
              Les informations relatives à la collecte et au traitement des données personnelles sont
              détaillées dans notre{' '}
              <Link className="lnk" href="/confidentialite">
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          {/* Liens affiliés */}
          <section>
            <h2>Liens affiliés</h2>
            <p>
              Certains liens présents sur {niche.siteName} sont des liens affiliés vers{' '}
              {niche.defaultStore}. Cela signifie que si vous effectuez un achat après avoir cliqué sur
              l&rsquo;un de ces liens, {niche.siteName} peut percevoir une commission, sans aucun
              surcoût pour vous. Ces revenus contribuent au fonctionnement et à l&rsquo;indépendance
              éditoriale du site. Le contenu éditorial n&rsquo;est jamais influencé par les partenariats
              commerciaux.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

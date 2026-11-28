/**
 * Classement — gabarit commun « meilleur … » (maquette validée le 28/11/2026, ~/drafts/qrt-gabarits/maquette-validee.html) :
 * titre et phrase d'ouverture, podium (meilleur choix, meilleur prix, haut de gamme), top 10, méthode en 2 lignes,
 * barre collante du n° 1. Server Component : tout se lit sans JavaScript. Données : lib/modele/classement.ts.
 */
import { PageTitle } from '@/components/v2/PageTitle'
import { euros } from '@/lib/gabarits'
import { noteFr } from '@/lib/note-objective'
import type { DonneesClassement } from '@/lib/modele/classement'
import { BarreCollante } from './BarreCollante'
import { Podium } from './Podium'
import { TableauClassement } from './TableauClassement'

type Props = { d: DonneesClassement; titre: string; libelle: string; crumbs: { href?: string; label: string }[] }

export function Classement({ d, titre, libelle, crumbs }: Props) {
  const n1 = d.premier
  return (
    <main id="main-content" className="v2">
      <article className="wrap art">
        {d.exemple ? (
          <p className="g-note" role="note">
            Classement d&apos;exemple du site modèle : produits et chiffres fictifs, à remplacer.
          </p>
        ) : null}
        <PageTitle title={titre} crumbs={crumbs} />
        <p className="g-lead">
          {d.lignes.length} {libelle} notés sur {d.analyses} analysés, à partir des caractéristiques publiées par les marques. Le podium
          se lit en 10 secondes, le détail est dessous.
        </p>

        <Podium marches={d.podium} place="classement-podium" />
        <TableauClassement lignes={d.lignes} titre={`Le top ${d.lignes.length}`} />

        <section className="g-sec" aria-labelledby="methode">
          <h2 id="methode" className="g-h2">
            Comment on a classé
          </h2>
          <p className="g-meta">
            Note sur 10 calculée avec le barème public du site, sur les seules caractéristiques publiées : une valeur absente ne compte
            ni pour ni contre. Personne n&apos;a payé pour être classé, et aucun produit n&apos;a été essayé.
          </p>
        </section>
      </article>
      {n1 ? (
        <BarreCollante
          titre={`Notre n° 1 : ${n1.produit.nom}`}
          detail={`${n1.produit.note !== null ? `${noteFr(n1.produit.note)}/10` : 'non noté'}${n1.produit.prix && n1.produit.prixDate ? ` · ${euros(n1.produit.prix)}` : ''}`}
          offre={n1.offre}
          place="classement-barre"
        />
      ) : null}
    </main>
  )
}

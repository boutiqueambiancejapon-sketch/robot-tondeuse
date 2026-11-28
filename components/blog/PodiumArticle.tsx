/**
 * PodiumArticle — haut des classements de Quel Robot Tondeuse (« meilleur … », « … top N ») au gabarit commun validé le 28/11/2026 :
 * les 3 premiers robots de l'article, dans l'ordre choisi par l'article, avec son étiquette (badge de l'encart).
 * Note sur 10 : celle de la fiche de la base, sinon rien. Prix : seulement un relevé daté (Cdiscount, Fnac), sinon le bouton Amazon.
 * Remplace la carte « Notre choix » sur ces pages ; le tableau des prix du bas ne change pas.
 */
import { Podium, type MarchePodium } from '@/components/v2/gabarits'
import { etiquetteCarte, slugFiche } from '@/lib/notes-fiches'
import { noteObjective } from '@/lib/note-objective'
import { offresRelevees } from '@/lib/offres-releves'
import { prixBas, type ProduitCite } from '@/lib/produits-cites'
import { CATALOGUE } from '@/lib/radar-fiche'
import { amazonHref } from '@/lib/utils/affiliate'

/** Classements : adresses « meilleur-… » et « …-top-N… ». */
export const estClassementArticle = (slug: string) => /^meilleur-|-top-\d/.test(slug)

const marque = (nom: string) => nom.split(' ')[0]

function marche(p: ProduitCite, i: number): MarchePodium {
  const id = slugFiche(p.name)
  const robot = CATALOGUE.find((r) => r.id === id || `${r.marque} ${r.modele}`.toLowerCase() === p.name.toLowerCase())
  const note = robot ? noteObjective(robot).note : null
  const amazonBas = prixBas(p.price)
  const releve = offresRelevees(p.name).find((o) => o.prix !== undefined && o.date && (amazonBas === undefined || o.prix < amazonBas))
  // Premier robot : jamais « Notre choix » s'il est noté sous le seuil (même règle que la carte NotreChoix).
  const premier = etiquetteCarte(p.name)
  const label = i === 0 ? (premier === 'Notre choix' ? p.badge || premier : premier) : p.badge || `${i + 1}e de l’article`
  return {
    label,
    pourQui: p.hook ? `${p.hook.split('. ')[0].replace(/\.$/, '')}.` : undefined,
    produit: {
      id: robot?.id ?? p.name,
      nom: p.name,
      marque: marque(p.name),
      img: p.image ?? null,
      note,
      prix: releve?.prix ?? null,
      prixDate: releve?.date ?? null,
    },
    offre: releve ? { marchand: releve.marchand, url: releve.url } : { marchand: 'Amazon', url: amazonHref(p.url, p.name) },
  }
}

export function PodiumArticle({ produits }: { produits: ProduitCite[] }) {
  return <Podium marches={produits.slice(0, 3).map(marche)} place="classement-podium" />
}

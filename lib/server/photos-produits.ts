import 'server-only'
/**
 * Photos des produits côté serveur : lit la liste des photos hébergées (public/images/produits) une fois,
 * puis applique la règle de lib/photos-produits.ts avec le dernier relevé Amazon.
 */
import { readdirSync } from 'node:fs'
import path from 'node:path'
import releveAmazon from '@/content/offres/photos-amazon.json'
import type { ProduitGabarit } from '@/components/v2/gabarits/types'
import { noteObjective } from '@/lib/note-objective'
import type { RobotCatalogue } from '@/lib/radar'
import { choisirPhoto, type PhotoProduit, type RelevePhotosAmazon } from '@/lib/photos-produits'

let hebergees: Set<string> | null = null

function photosHebergees(): Set<string> {
  if (!hebergees) {
    try {
      const dossier = path.join(process.cwd(), 'public', 'images', 'produits')
      hebergees = new Set(readdirSync(dossier).filter((f) => f.endsWith('.webp')).map((f) => f.slice(0, -5)))
    } catch {
      hebergees = new Set()
    }
  }
  return hebergees
}

/** Photo d'un produit (voir lib/photos-produits.ts) ; null : la vignette montre l'initiale de la marque. */
export function photoProduit(...cles: (string | undefined)[]): PhotoProduit | null {
  return choisirPhoto(cles.filter((c): c is string => Boolean(c)), photosHebergees(), releveAmazon as RelevePhotosAmazon)
}

/** Robot de la base prêt pour CarteProduit, Podium, Alternatives et le haut de fiche. `href` : adresse de sa fiche. */
export function produitGabarit(r: RobotCatalogue, href?: string, slug?: string): ProduitGabarit {
  return {
    id: r.id,
    nom: `${r.marque} ${r.modele}`,
    marque: r.marque,
    href,
    photo: photoProduit(r.id, slug),
    note: noteObjective(r).note,
    prix: r.prix_eur,
    prixDate: r.prix_lu_le ?? null,
  }
}

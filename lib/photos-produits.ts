/**
 * lib/photos-produits.ts — quelle photo montrer pour un produit (règle du propriétaire, 28/11/2026,
 * tasks/usine-produits.md § Photos) :
 * 1. une photo qu'on a le droit d'héberger, dans public/images/produits/<id>.webp (flux Awin Fnac, kits presse des marques) ;
 * 2. sinon l'adresse de la photo Amazon relevée la nuit avec le prix (scripts/photos-amazon.mjs), servie par Amazon,
 *    jamais téléchargée ni stockée chez nous, et ignorée dès qu'elle a plus de 24 heures ;
 * 3. sinon rien : la vignette affiche l'initiale de la marque.
 * Fonctions pures, sans accès aux fichiers : la liste des photos hébergées est lue par lib/server/photos-produits.ts.
 */

export type PhotoProduit = {
  src: string
  /** site : fichier de public/images ; amazon : adresse servie par Amazon (affichée sans passer par l'optimiseur). */
  origine: 'site' | 'amazon'
  largeur?: number
  hauteur?: number
}

export type PhotoAmazon = { asin: string; image: string; largeur?: number; hauteur?: number }

/** content/offres/photos-amazon.json, réécrit en entier à chaque relevé. */
export type RelevePhotosAmazon = { releve: string | null; produits: Record<string, PhotoAmazon> }

/** Durée maximale de conservation d'une adresse Amazon (règle du Partenariat Amazon). */
export const DUREE_MAX_AMAZON_MS = 24 * 60 * 60 * 1000

/** Seules les adresses d'images des serveurs d'Amazon sont acceptées. */
export const estAdresseAmazon = (url: string) => /^https:\/\/m\.media-amazon\.com\/images\/[^\s"'<>]+$/.test(url)

/** Le relevé Amazon est-il assez récent (moins de 24 heures, et pas daté dans le futur) ? */
export function releveAmazonValide(releve: string | null, maintenant: number = Date.now()): boolean {
  if (!releve) return false
  const t = Date.parse(releve)
  if (!Number.isFinite(t)) return false
  const age = maintenant - t
  return age >= -5 * 60 * 1000 && age <= DUREE_MAX_AMAZON_MS
}

/**
 * Photo d'un produit. `cles` : identifiants possibles du produit, dans l'ordre (id de la base, adresse de la fiche…).
 * `hebergees` : noms (sans extension) des fichiers de public/images/produits.
 */
export function choisirPhoto(
  cles: string[],
  hebergees: ReadonlySet<string>,
  amazon: RelevePhotosAmazon | null,
  maintenant: number = Date.now(),
): PhotoProduit | null {
  const site = cles.find((c) => hebergees.has(c))
  if (site) return { src: `/images/produits/${site}.webp`, origine: 'site' }
  if (!amazon || !releveAmazonValide(amazon.releve, maintenant)) return null
  for (const c of cles) {
    const a = amazon.produits[c]
    if (a && estAdresseAmazon(a.image)) return { src: a.image, origine: 'amazon', largeur: a.largeur, hauteur: a.hauteur }
  }
  return null
}

/** Initiale affichée sans photo : celle de la marque, sinon celle du nom. */
export const initiale = (marque: string | undefined, nom: string) => ((marque || nom).trim().charAt(0) || '?').toUpperCase()

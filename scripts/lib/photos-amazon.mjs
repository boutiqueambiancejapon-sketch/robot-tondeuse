// Lecture d'une réponse getItems de l'API Amazon (Creators) : adresse de la photo principale (grand format) et prix.
// Fonctions pures, testées dans tests/unit/photos-amazon.test.ts. Seule l'adresse est gardée, jamais l'image.

/** Ressources demandées : la photo vient dans la MÊME demande que le prix (aucun appel en plus). */
export const RESSOURCES = ['images.primary.large', 'offersV2.listings.price', 'itemInfo.title']

/** Paquets de 10 ASIN au plus (limite d'une demande getItems). */
export const paquets = (liste, taille = 10) => Array.from({ length: Math.ceil(liste.length / taille) }, (_, i) => liste.slice(i * taille, (i + 1) * taille))

const AMAZON = /^https:\/\/m\.media-amazon\.com\/images\/[^\s"'<>]+$/

/** { asin → { image, largeur, hauteur, prix } } pour les articles d'une réponse ; une adresse hors serveurs Amazon est écartée. */
export function lireReponse(json) {
  const out = {}
  for (const it of json?.itemsResult?.items ?? []) {
    const large = it?.images?.primary?.large
    const prix = it?.offersV2?.listings?.[0]?.price?.money?.amount
    if (!it?.asin || !large?.url || !AMAZON.test(large.url)) continue
    out[it.asin] = {
      image: large.url,
      ...(Number.isFinite(large.width) ? { largeur: large.width } : {}),
      ...(Number.isFinite(large.height) ? { hauteur: large.height } : {}),
      ...(Number.isFinite(prix) && prix > 0 ? { prix } : {}),
    }
  }
  return out
}

/** Fichier content/offres/photos-amazon.json : réécrit en entier, clé = id du produit dans data/robots-tondeuses.json. */
export function construireReleve(robots, parAsin, maintenant = new Date()) {
  const produits = {}
  for (const r of robots) {
    const a = r.asin && parAsin[r.asin]
    if (a) produits[r.id] = { asin: r.asin, ...a }
  }
  return { releve: maintenant.toISOString().slice(0, 16) + 'Z', produits }
}

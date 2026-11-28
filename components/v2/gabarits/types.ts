/** Données d'un produit telles que les gabarits les affichent (déjà calculées côté serveur). */
export type ProduitGabarit = {
  id: string
  nom: string
  /** Adresse de la fiche sur le site ; sans fiche, la carte n'est pas un lien. */
  href?: string
  /** Image dans public/images (jamais une image d'un CDN tiers). */
  img?: string | null
  /** Ligne courte : « 3 000 m² · 80 % ». */
  meta?: string
  note: number | null
  /** Prix public ou relevé, affiché seulement avec sa date. */
  prix?: number | null
  prixDate?: string | null
}

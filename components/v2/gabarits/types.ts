import type { PhotoProduit } from '@/lib/photos-produits'

/** Données d'un produit telles que les gabarits les affichent (déjà calculées côté serveur). */
export type ProduitGabarit = {
  id: string
  nom: string
  /** Adresse de la fiche sur le site ; sans fiche, la carte n'est pas un lien. */
  href?: string
  /** Marque : son initiale remplace la photo quand il n'y en a pas. */
  marque?: string
  /** Photo choisie par lib/server/photos-produits.ts (hébergée, sinon adresse Amazon du jour), ou null. */
  photo?: PhotoProduit | null
  /** Ancienne forme : chemin d'une image de public/images. */
  img?: string | null
  /** Ligne courte : « 3 000 m² · 80 % ». */
  meta?: string
  note: number | null
  /** Prix public ou relevé, affiché seulement avec sa date. */
  prix?: number | null
  prixDate?: string | null
}

/**
 * VignetteProduit — photo du produit, ou l'initiale de la marque sur fond ivoire quand il n'y en a pas.
 * Photo hébergée : next/image optimisé. Photo Amazon : servie telle quelle par Amazon (unoptimized), jamais copiée
 * par notre optimiseur d'images, comme le veut le Partenariat Amazon (lib/photos-produits.ts).
 * prioritaire : photo du haut de fiche, chargée tout de suite (c'est le plus grand élément du premier écran).
 */
import Image from 'next/image'
import { initiale, type PhotoProduit } from '@/lib/photos-produits'

type Props = {
  nom: string
  marque?: string
  photo?: PhotoProduit | null
  /** Ancienne forme : chemin d'une image de public/images. */
  img?: string | null
  format?: 'carre' | 'large'
  sizes?: string
  prioritaire?: boolean
}

export function VignetteProduit({ nom, marque, photo, img, format = 'carre', sizes = '84px', prioritaire = false }: Props) {
  const p = photo ?? (img ? { src: img, origine: 'site' as const } : null)
  return (
    <div className={`g-pic g-pic--${format}${p ? '' : ' g-pic--vide'}`}>
      {p ? (
        <Image
          src={p.src}
          alt={`${nom}, photo du produit`}
          fill
          sizes={sizes}
          unoptimized={p.origine === 'amazon'}
          loading={prioritaire ? 'eager' : 'lazy'}
          fetchPriority={prioritaire ? 'high' : undefined}
        />
      ) : (
        <span aria-hidden="true">{initiale(marque, nom)}</span>
      )}
    </div>
  )
}

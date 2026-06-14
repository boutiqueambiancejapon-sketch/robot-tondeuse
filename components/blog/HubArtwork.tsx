/**
 * HubArtwork — visuel de couverture par hub/article (Atelier Vert).
 * Photo spécifique si dans SLUG_PHOTOS, sinon pool déterministe par slug hash.
 * Server Component — aucun JS.
 */

import Image from 'next/image'

/** Photos spécifiques par slug de hub */
const SLUG_PHOTOS: Record<string, string> = {
  'robot-tondeuse-petit-jardin':     '/images/jardins/jardin-petit-urbain.jpeg',
  'robot-tondeuse-500m2':            '/images/jardins/jardin-500m2-pavillonnaire.jpeg',
  'robot-tondeuse-1000m2':           '/images/jardins/jardin-1000m2-campagne.jpeg',
  'robot-tondeuse-2000m2':           '/images/jardins/jardin-2000m2-estate.jpeg',
  'robot-tondeuse-grande-surface':   '/images/jardins/jardin-grande-surface.jpeg',
  'robot-tondeuse-pente':            '/images/jardins/jardin-terrain-pente.jpeg',
  'robot-tondeuse-terrain-complexe': '/images/jardins/jardin-terrain-complexe.jpeg',
  'robot-tondeuse-multi-zones':      '/images/jardins/jardin-multi-zones.jpeg',
}

/** Pool complet — 16 images disponibles sur le site */
export const IMAGE_POOL = [
  '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg',
  '/images/robots/mammotion-yuka-mini-2-jardin.jpeg',
  '/images/robots/gardena-sileno-minimo-250-jardin.jpeg',
  '/images/robots/segway-navimow-i105e-jardin.jpeg',
  '/images/robots/mammotion-yuka-mini-2-500-jardin.jpeg',
  '/images/robots/worx-landroid-vision-m800-jardin.jpeg',
  '/images/robots/gardena-sileno-life-750-jardin.jpeg',
  '/images/robots/bosch-indego-jardin.jpeg',
  '/images/jardins/jardin-petit-urbain.jpeg',
  '/images/jardins/jardin-500m2-pavillonnaire.jpeg',
  '/images/jardins/jardin-1000m2-campagne.jpeg',
  '/images/jardins/jardin-2000m2-estate.jpeg',
  '/images/jardins/jardin-grande-surface.jpeg',
  '/images/jardins/jardin-terrain-pente.jpeg',
  '/images/jardins/jardin-terrain-complexe.jpeg',
  '/images/jardins/jardin-multi-zones.jpeg',
]

export function hashSlug(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) | 0
  return Math.abs(h)
}

export type HubArtworkProps = {
  slug: string
  variant?: 'hero' | 'card'
  className?: string
}

export function HubArtwork({ slug, variant = 'card', className }: HubArtworkProps) {
  const src = SLUG_PHOTOS[slug] ?? IMAGE_POOL[hashSlug(slug) % IMAGE_POOL.length]

  return (
    <Image
      src={src}
      alt=""
      fill
      sizes={
        variant === 'hero'
          ? '100vw'
          : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      }
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      aria-hidden="true"
      className={className}
    />
  )
}

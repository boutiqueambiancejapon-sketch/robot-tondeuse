/**
 * Image de partage par défaut (app/opengraph-image.tsx) pour les pages qui déclarent
 * leur propre `openGraph` : sans cette ligne, Next.js n'hérite pas de l'image du parent.
 */
export const DEFAULT_OG_IMAGES = [{ url: '/opengraph-image', width: 1200, height: 630, type: 'image/jpeg' }]

import { ImageResponse } from 'next/og'
import { getAllArticles } from '@/lib/blog'
import { loadOgFonts, loadOgPhoto, pngResponseToJpeg } from '@/lib/og/assets'
import { countProducts } from '@/lib/og/data'
import { OG_SIZE, PHOTO, ShareCard } from '@/lib/og/ShareCard'
import { OG_FONTS, OG_THEME, OgFallback, OgLogo } from '@/lib/og/site'
import { ogSafe } from '@/lib/og/text'
import { niche } from '@/niche.config'

// Image de partage par défaut (accueil et pages sans image dédiée).
export const alt = `${niche.siteName} — ${niche.tagline}`
export const size = OG_SIZE
export const contentType = 'image/jpeg'

export default async function OGImage() {
  const guides = getAllArticles().length
  const models = countProducts()
  const [fonts, photo] = await Promise.all([
    loadOgFonts(OG_FONTS),
    loadOgPhoto('/images/robots/mammotion-yuka-mini-2-jardin.jpeg', PHOTO.width, PHOTO.height),
  ])
  const png = new ImageResponse(
    <ShareCard
      theme={OG_THEME}
      pill="Tests · Comparatifs · Outils"
      title={ogSafe('Quel robot tondeuse choisir pour votre jardin ?')}
      hook={{ big: String(guides), small: ['guides et', 'comparatifs'] }}
      meta={models ? `${models} robots en fiche détaillée` : null}
      photo={photo}
      fallback={<OgFallback />}
      logo={<OgLogo />}
    />,
    { ...OG_SIZE, fonts },
  )
  return pngResponseToJpeg(png)
}

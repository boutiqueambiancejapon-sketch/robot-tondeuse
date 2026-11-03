import { ImageResponse } from 'next/og'
import { getAllArticles, getCategories } from '@/lib/blog'
import { loadOgFonts, loadOgPhoto, pngResponseToJpeg } from '@/lib/og/assets'
import { categoryName, isBrand } from '@/lib/og/data'
import { OG_SIZE, PHOTO, ShareCard } from '@/lib/og/ShareCard'
import { OG_FONTS, OG_THEME, OgFallback, OgLogo } from '@/lib/og/site'
import { niche } from '@/niche.config'

// Image de partage d'une rubrique ou d'une marque.
export const size = OG_SIZE
export const contentType = 'image/jpeg'
export const alt = niche.siteName

export function generateStaticParams() {
  return getCategories().map(({ slug }) => ({ categorie: slug }))
}

const BRAND_PHOTOS: Record<string, string> = {
  mammotion: '/images/robots/mammotion-yuka-mini-2-jardin.jpeg',
  husqvarna: '/images/robots/husqvarna-automower-310-mark-ii-jardin.jpeg',
  gardena: '/images/robots/gardena-sileno-minimo-250-jardin.jpeg',
  worx: '/images/robots/worx-landroid-vision-m800-jardin.jpeg',
  bosch: '/images/robots/bosch-indego-jardin.jpeg',
}

export default async function Image({ params }: { params: Promise<{ categorie: string }> }) {
  const { categorie } = await params
  const articles = getAllArticles().filter((a) => a.categorie === categorie)
  const brand = isBrand(categorie)
  const name = categoryName(categorie)
  const cover = BRAND_PHOTOS[categorie] ?? articles.find((a) => a.featureImage)?.featureImage
  const [fonts, photo] = await Promise.all([loadOgFonts(OG_FONTS), loadOgPhoto(cover, PHOTO.width, PHOTO.height)])
  const png = new ImageResponse(
    <ShareCard
      theme={OG_THEME}
      pill={brand ? 'Marque' : 'Rubrique'}
      title={brand ? `Robots tondeuses ${name}` : name}
      hook={articles.length ? { big: String(articles.length), small: [articles.length > 1 ? 'articles' : 'article', 'à lire'] } : null}
      meta={brand ? 'Tests, gammes et comparatifs' : null}
      photo={photo}
      fallback={<OgFallback />}
      logo={<OgLogo />}
    />,
    { ...OG_SIZE, fonts },
  )
  return pngResponseToJpeg(png)
}

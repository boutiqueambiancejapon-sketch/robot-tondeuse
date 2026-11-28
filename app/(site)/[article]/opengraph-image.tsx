import { ImageResponse } from 'next/og'
import { getAllStandaloneSlugs, getStandaloneArticle } from '@/lib/articles'
import { loadOgFonts, loadOgPhoto, pngResponseToJpeg } from '@/lib/og/assets'
import { articleOg } from '@/lib/og/data'
import { OG_SIZE, PHOTO, ShareCard } from '@/lib/og/ShareCard'
import { OG_FONTS, OG_THEME, OgFallback, OgLogo } from '@/lib/og/site'
import { niche } from '@/niche.config'
import { slugsAvisBase } from '@/lib/server/avis-base'
import { CATALOGUE } from '@/lib/radar-fiche'
import { nomRobot } from '@/lib/radar'
import { PREFIXE } from '@/lib/avis-base'

// Miniature de partage par article, générée au build (1200×630, JPEG).
export const size = OG_SIZE
export const contentType = 'image/jpeg'
export const alt = niche.siteName

export function generateStaticParams() {
  return [...getAllStandaloneSlugs(), ...slugsAvisBase()].map((article) => ({ article }))
}

/** Avis d'un robot de la base : nom du robot, sans photo (l'image de partage n'utilise que nos fichiers). */
function avisBase(slug: string) {
  const r = slug.startsWith(PREFIXE) ? CATALOGUE.find((x) => `${PREFIXE}${x.id}` === slug) : undefined
  if (!r) return null
  const nom = nomRobot(r)
  return { pill: 'Avis', title: `Avis ${nom}`, shortTitle: nom, hook: null, meta: null, cover: undefined }
}

export default async function Image({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params
  const data = getStandaloneArticle(article)
  const og = data
    ? articleOg({ ...data.meta, slug: article }, data.content)
    : avisBase(article) ?? { pill: 'Guide', title: niche.siteName, shortTitle: niche.siteName, hook: null, meta: null, cover: undefined }
  const [fonts, photo] = await Promise.all([loadOgFonts(OG_FONTS), loadOgPhoto(og.cover, PHOTO.width, PHOTO.height)])
  const png = new ImageResponse(
    <ShareCard theme={OG_THEME} pill={og.pill} title={og.title} shortTitle={og.shortTitle} hook={og.hook} meta={og.meta} photo={photo} fallback={<OgFallback />} logo={<OgLogo />} />,
    { ...OG_SIZE, fonts },
  )
  return pngResponseToJpeg(png)
}

/**
 * lib/og/assets.ts — ressources des images de partage (next/og).
 * Polices locales en WOFF (next/og ne lit ni le WOFF2 ni Google Fonts) et
 * couvertures recadrées par sharp (le moteur de next/og n'affiche pas le WebP).
 */
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()

type Weight = 400 | 500 | 600 | 700 | 800 | 900
export type OgFontDef = { name: string; file: string; weight: Weight }

export async function loadOgFonts(defs: OgFontDef[]) {
  return Promise.all(
    defs.map(async (d) => ({
      name: d.name,
      data: await readFile(path.join(ROOT, 'assets/og/fonts', d.file)),
      weight: d.weight,
      style: 'normal' as const,
    })),
  )
}

/**
 * Image de `public/` en data URI JPEG, recadrée au format demandé.
 * Renvoie null si le chemin est vide, distant ou introuvable.
 */
export async function loadOgPhoto(publicPath: string | undefined, width: number, height: number): Promise<string | null> {
  if (!publicPath || !publicPath.startsWith('/')) return null
  const file = path.join(ROOT, 'public', decodeURIComponent(publicPath.split('?')[0]))
  try {
    await access(file)
    const jpeg = await sharp(file)
      .resize(Math.round(width * 1.5), Math.round(height * 1.5), { fit: 'cover', position: sharp.strategy.attention })
      .jpeg({ quality: 82 })
      .toBuffer()
    return `data:image/jpeg;base64,${jpeg.toString('base64')}`
  } catch {
    return null
  }
}

/** PNG de next/og → JPEG : 3 à 5 fois plus léger, sous la limite des aperçus WhatsApp. */
export async function pngResponseToJpeg(response: Response): Promise<Response> {
  const png = Buffer.from(await response.arrayBuffer())
  const jpeg = await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
  return new Response(new Uint8Array(jpeg), {
    headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800' },
  })
}

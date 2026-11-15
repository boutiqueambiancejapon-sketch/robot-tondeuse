// Retire le fond magenta des illustrations et les réduit (WebP transparent).
import { createRequire } from 'node:module'
import { readdirSync } from 'node:fs'
const sharp = createRequire('/home/administrator/Toutou/package.json')('sharp')
const R = '/home/administrator/drafts/qrt-v3/raw', O = '/home/administrator/drafts/qrt-v3/img'
for (const f of readdirSync(R).filter((f) => f.endsWith('.png') && !f.includes('-v1'))) {
  const { data, info } = await sharp(`${R}/${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2], k = Math.min(r, b) - g
    if (k <= 24) continue
    const a = Math.max(0, 1 - (k - 24) / 110)
    data[i + 3] = Math.round(a * 255)
    data[i] = Math.min(r, g + 8); data[i + 2] = Math.min(b, g + 8)
  }
  const out = `${O}/${f.replace('.png', '.webp')}`
  const meta = await sharp(data, { raw: info }).trim({ threshold: 1 }).resize({ width: 640, height: 640, fit: 'inside' }).webp({ quality: 88, alphaQuality: 90 }).toFile(out)
  console.log(f, meta.width, meta.height, Math.round(meta.size / 1024) + ' Ko')
}

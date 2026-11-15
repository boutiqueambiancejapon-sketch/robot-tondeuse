// Détoure les photos produit : le blanc relié aux bords devient transparent, le blanc à l'intérieur du robot reste.
import { createRequire } from 'node:module'
import { readdirSync } from 'node:fs'
const sharp = createRequire('/home/administrator/Toutou/package.json')('sharp')
const D = '/home/administrator/drafts/qrt-v3/img'
for (const f of readdirSync(D).filter((f) => f.endsWith('.webp') && !f.startsWith('robot-'))) {
  const { data, info } = await sharp(`${D}/${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H } = info, N = W * H
  const lum = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2])
  const bg = new Uint8Array(N), stack = []
  const push = (i) => { if (!bg[i] && lum(i) >= 251) { bg[i] = 1; stack.push(i) } }
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x) }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1) }
  while (stack.length) {
    const i = stack.pop(), x = i % W, y = (i - x) / W
    if (x > 0) push(i - 1); if (x < W - 1) push(i + 1); if (y > 0) push(i - W); if (y < H - 1) push(i + W)
  }
  for (let i = 0; i < N; i++) {
    if (bg[i]) { data[i * 4 + 3] = 0; continue }
    const x = i % W, y = (i - x) / W
    let near = false
    for (let dy = -2; dy <= 2 && !near; dy++) for (let dx = -2; dx <= 2; dx++) { const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H && bg[yy * W + xx]) { near = true; break } }
    if (near) data[i * 4 + 3] = Math.round(255 * Math.min(1, (255 - lum(i)) / 70))
  }
  const m = await sharp(data, { raw: info }).trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${D}/cut/${f}`)
  console.log(f, m.width, m.height)
}

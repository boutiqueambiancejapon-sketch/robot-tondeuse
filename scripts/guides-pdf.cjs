// Fabrique les PDF à télécharger depuis les pages en ligne (vue impression).
// Usage : PW_DIR=/home/administrator/tools/pw node /chemin/du/site/scripts/guides-pdf.cjs /chemin/du/site [https://quel-robot-tondeuse.com]
// À relancer après chaque changement de la fiche hivernage ou du calendrier, puis enregistrer les PDF (public/guides).
const { createRequire } = require('module')
const { chromium } = createRequire(process.env.PW_DIR ? `${process.env.PW_DIR}/package.json` : __filename)('playwright')
const out = `${process.argv[2]}/public/guides`
const base = process.argv[3] || 'https://quel-robot-tondeuse.com'
const pages = [
  { path: '/fiche-hivernage-robot-tondeuse', file: 'fiche-hivernage-robot-tondeuse.pdf', year: false },
  { path: '/calendrier-du-gazon', file: 'calendrier-du-gazon.pdf', year: true },
]
;(async () => {
  const browser = await chromium.launch()
  for (const p of pages) {
    const page = await browser.newPage({ viewport: { width: 900, height: 1200 } })
    await page.goto(base + p.path, { waitUntil: 'networkidle' })
    if (p.year) await page.getByRole('button', { name: /Toute l.année/ }).click()
    await page.waitForTimeout(800)
    await page.emulateMedia({ media: 'print' })
    await page.pdf({ path: `${out}/${p.file}`, format: 'A4', printBackground: true, margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' } })
    console.log('écrit', p.file)
    await page.close()
  }
  await browser.close()
})()

// Relève les prix Cdiscount et Fnac (flux Awin) des robots listés dans content/offres/correspondances.json
// et écrit content/offres/offres.json. Usage : node scripts/offres-awin.mjs <flux-cdiscount.csv.gz> <flux-fnac.csv.gz>
// Les fichiers de flux sont téléchargés par le serveur (adresses privées dans ~/.config/toutou/awin.env).
import { createReadStream, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { createInterface } from 'node:readline'

const [cdiscountFeed, fnacFeed] = process.argv.slice(2)
const map = JSON.parse(readFileSync('content/offres/correspondances.json', 'utf8'))
import { readdirSync } from 'node:fs'

// Clé commune : nom en minuscules, sans accents ni ponctuation, « + » lu « plus ».
export const cle = (n) => n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, ' ').trim()
const VIDES = new Set(['robot', 'tondeuse', 'de', 'la', 'le', 'pour', 'et', 'a', 'gazon', 'pelouse'])
const PIECES = /\b(lames?|garage|abri|housse|cable|kit|piquets?|pics?|crampons?|protections?|brosses?|roues?|capot|chargeur|station|support|rechange|antenne|connecteurs?|module|lot|batteries?)\b/
const POUR = /\b(pour|compatibles?|convient)\s+(les\s+)?(robots?|tondeuses?|bosch|husqvarna|worx|gardena|dreame|mammotion|segway|automower|landroid|indego)/
// Accessoire : un mot de pièce dans les 3 premiers mots du titre, ou « pour / compatible » suivi d'une marque.
const ACCESSOIRES = { test: (t) => PIECES.test(t.split(' ').slice(0, 3).join(' ')) || POUR.test(t) }

// Noms cités sur le site : fiches produits et encarts <ProductCTA name="…"> des articles.
function nomsDuSite() {
  const noms = new Set()
  for (const f of readdirSync('content/produits').filter((f) => f.endsWith('.yaml'))) {
    const m = /^name:\s*"?(.+?)"?\s*$/m.exec(readFileSync(`content/produits/${f}`, 'utf8'))
    if (m) noms.add(m[1])
  }
  for (const dir of ['content/articles', 'content/articles/robot-piscine'].filter((d) => existsSync(d))) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
      for (const m of readFileSync(`${dir}/${f}`, 'utf8').matchAll(/<ProductCTA[^>]*\bname="([^"]+)"/g)) noms.add(m[1])
    }
  }
  return [...noms]
}

// Correspondance automatique stricte : tous les mots du nom (marque et numéros compris) dans le titre du marchand.
const AUTO = nomsDuSite().map((nom) => {
  const mots = cle(nom).split(' ').filter((w) => w && !VIDES.has(w))
  return { nom, cle: cle(nom), mots, accessoire: PIECES.test(cle(nom)) }
}).filter((n) => n.mots.length >= 2)

const today = new Date().toISOString().slice(0, 10)

// Lecture d'une ligne CSV avec guillemets (le flux Awin met entre guillemets les champs qui contiennent des virgules).
function parseLine(line) {
  const out = []
  let cur = '', q = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (q) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++ } else if (ch === '"') q = false; else cur += ch
    } else if (ch === '"') q = true
    else if (ch === ',') { out.push(cur); cur = '' } else cur += ch
  }
  out.push(cur)
  return out
}

async function scan(file, store) {
  const found = {}
  if (!file || !existsSync(file)) return found
  const wanted = Object.entries(map).filter(([k, v]) => !k.startsWith('_') && v[store]).map(([slug, v]) => [slug, new RegExp(v[store], 'i')])
  const rl = createInterface({ input: createReadStream(file).pipe(createGunzip()), crlfDelay: Infinity })
  let head = null, buffer = ''
  for await (const raw of rl) {
    buffer = buffer ? `${buffer}\n${raw}` : raw
    if ((buffer.match(/"/g) || []).length % 2 === 1) continue // champ sur plusieurs lignes
    const row = parseLine(buffer); buffer = ''
    if (!head) { head = Object.fromEntries(row.map((h, i) => [h, i])); continue }
    const name = row[head.product_name] || ''
    if (/reconditionn|occasion|seconde main/i.test(name)) continue
    const price = parseFloat(row[head.search_price])
    if (!price || price < 15) continue
    const estAccessoire = ACCESSOIRES.test(cle(name))
    for (const [slug, re] of wanted) {
      if (!re.test(name) || estAccessoire || price < 150) continue
      const best = found[slug]
      if (!best || price < best.prix) found[slug] = { prix: price, url: row[head.aw_deep_link], nom: name.slice(0, 140), date: today }
    }
    const titre = ` ${cle(name)} `
    for (const n of AUTO) {
      if (!n.mots.every((w) => titre.includes(` ${w} `))) continue
      if (!n.accessoire && (estAccessoire || price < 150)) continue
      // Pas d'autre numéro de modèle au milieu du nom (« LUBA mini 2 AWD 1500 » n'est pas « LUBA mini AWD 1500 »).
      const t = titre.trim().split(' ')
      const pos = n.mots.map((w) => t.indexOf(w)).filter((i) => i >= 0)
      const entre = t.slice(Math.min(...pos), Math.max(...pos) + 1)
      if (entre.some((w) => /\d/.test(w) && !n.mots.includes(w))) continue
      // Ni variante juste après le nom (« i220 LiDAR Pro » n'est pas « i220 LiDAR »).
      const apres = t[Math.max(...pos) + 1]
      if (['pro', 'plus', 'max', 'ultra', 'mini', 'lite', 'x', 'awd'].includes(apres) && !n.mots.includes(apres)) continue
      const key = `nom:${n.cle}`
      const best = found[key]
      if (!best || price < best.prix) found[key] = { prix: price, url: row[head.aw_deep_link], nom: name.slice(0, 140), date: today }
    }
  }
  return found
}

const cdiscount = await scan(cdiscountFeed, 'cdiscount')
const fnac = await scan(fnacFeed, 'fnac')
const offres = {}
const cles = new Set([...Object.keys(map).filter((k) => !k.startsWith('_')), ...Object.keys(cdiscount), ...Object.keys(fnac)])
for (const slug of [...cles].sort()) {
  const o = {}
  if (cdiscount[slug]) o.cdiscount = cdiscount[slug]
  if (fnac[slug]) o.fnac = fnac[slug]
  if (Object.keys(o).length) offres[slug] = o
}
writeFileSync('content/offres/offres.json', `${JSON.stringify(offres, null, 2)}\n`)
console.log(`offres relevées le ${today} : ${Object.keys(offres).length} robots`, Object.fromEntries(Object.entries(offres).map(([k, v]) => [k, Object.keys(v).join('+')])))

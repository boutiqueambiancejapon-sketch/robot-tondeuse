// Relève les prix Cdiscount et Fnac (flux Awin) des robots listés dans content/offres/correspondances.json
// et écrit content/offres/offres.json. Usage : node scripts/offres-awin.mjs <flux-cdiscount.csv.gz> <flux-fnac.csv.gz>
// Les fichiers de flux sont téléchargés par le serveur (adresses privées dans ~/.config/toutou/awin.env).
import { createReadStream, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createGunzip } from 'node:zlib'
import { createInterface } from 'node:readline'

const [cdiscountFeed, fnacFeed] = process.argv.slice(2)
const map = JSON.parse(readFileSync('content/offres/correspondances.json', 'utf8'))
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
    if (!price || price < 100) continue // pièces et accessoires
    for (const [slug, re] of wanted) {
      if (!re.test(name)) continue
      const best = found[slug]
      if (!best || price < best.prix) found[slug] = { prix: price, url: row[head.aw_deep_link], nom: name.slice(0, 140), date: today }
    }
  }
  return found
}

const cdiscount = await scan(cdiscountFeed, 'cdiscount')
const fnac = await scan(fnacFeed, 'fnac')
const offres = {}
for (const slug of Object.keys(map).filter((k) => !k.startsWith('_'))) {
  const o = {}
  if (cdiscount[slug]) o.cdiscount = cdiscount[slug]
  if (fnac[slug]) o.fnac = fnac[slug]
  if (Object.keys(o).length) offres[slug] = o
}
writeFileSync('content/offres/offres.json', `${JSON.stringify(offres, null, 2)}\n`)
console.log(`offres relevées le ${today} : ${Object.keys(offres).length} robots`, Object.fromEntries(Object.entries(offres).map(([k, v]) => [k, Object.keys(v).join('+')])))

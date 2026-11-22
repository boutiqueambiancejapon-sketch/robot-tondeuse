// Relevé quotidien des prix sur les boutiques officielles, pour les robots de content/offres/releve-quotidien.json.
// Ajoute une ligne par robot et par jour dans content/offres/historique-prix.json (jamais deux fois le même jour).
// Lit seulement les adresses de données publiques des boutiques (gratuit, une requête par page).
// Rien d'inventé : une page qui ne répond pas ou sans prix lisible n'écrit rien et est signalée.
// Usage : npm run releve-prix
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const SOURCES = 'content/offres/releve-quotidien.json'
const HISTORIQUE = 'content/offres/historique-prix.json'
const AGENT = 'Mozilla/5.0 (compatible; QuelRobotTondeuse-releve/1.0)'

// Date du jour à Paris, AAAA-MM-JJ.
const jour = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date())

const lire = async (url) => {
  const r = await fetch(url, { headers: { 'user-agent': AGENT, accept: '*/*' }, signal: AbortSignal.timeout(20000) })
  if (!r.ok) throw new Error(`réponse ${r.status}`)
  return r.text()
}

async function shopify(robot) {
  const p = JSON.parse(await lire(`${robot.page}.js`))
  const variantes = p.variants ?? []
  const v = robot.variante ? variantes.find((x) => x.id === robot.variante) : variantes.length === 1 ? variantes[0] : null
  if (!v) throw new Error(robot.variante ? `variante ${robot.variante} absente` : `${variantes.length} variantes, numéro à préciser`)
  const prix = v.price / 100
  const reference = v.compare_at_price && v.compare_at_price > v.price ? v.compare_at_price / 100 : undefined
  return { prix, reference, dispo: Boolean(v.available) }
}

async function jsonld(robot) {
  const html = await lire(robot.page)
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let d
    try { d = JSON.parse(m[1]) } catch { continue }
    if (d['@type'] !== 'Product') continue
    const o = Array.isArray(d.offers) ? d.offers[0] : d.offers
    if (!o) continue
    return { prix: Number(o.price), dispo: /InStock/i.test(String(o.availability ?? '')) }
  }
  throw new Error('aucune balise Product avec un prix')
}

const { robots } = JSON.parse(readFileSync(SOURCES, 'utf8'))
const historique = existsSync(HISTORIQUE) ? JSON.parse(readFileSync(HISTORIQUE, 'utf8')) : { releves: [] }
const deja = new Set(historique.releves.map((r) => `${r.date}|${r.slug}`))
let ajoutes = 0
const echecs = []

for (const robot of robots) {
  if (deja.has(`${jour}|${robot.slug}`)) { console.log(`= ${robot.slug} : déjà relevé le ${jour}`); continue }
  try {
    const { prix, reference, dispo } = await (robot.type === 'jsonld' ? jsonld(robot) : shopify(robot))
    if (!Number.isFinite(prix) || prix <= 0) throw new Error(`prix illisible (${prix})`)
    historique.releves.push({ date: jour, slug: robot.slug, prix, ...(reference ? { reference } : {}), dispo, page: robot.page })
    ajoutes++
    console.log(`+ ${robot.slug} : ${prix} €${reference ? ` (référence affichée ${reference} €)` : ''}${dispo ? '' : ', en rupture'}`)
  } catch (e) {
    echecs.push(robot.slug)
    console.error(`! ${robot.slug} : ${e.message}`)
  }
}

historique.releves.sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug))
writeFileSync(HISTORIQUE, `${JSON.stringify(historique, null, 2)}\n`)
console.log(`${jour} : ${ajoutes} prix ajoutés, ${echecs.length} échec(s)${echecs.length ? ` : ${echecs.join(', ')}` : ''}.`)
if (echecs.length) process.exitCode = 1

// Relevé de nuit des photos Amazon (règle du propriétaire, 28/11/2026, tasks/usine-produits.md § Photos).
// Pour chaque modèle de data/robots-tondeuses.json qui a un ASIN : une seule demande getItems par paquet de 10,
// qui rapporte le prix ET l'adresse de la photo principale (images.primary.large). Rien n'est téléchargé :
// seule l'adresse est écrite dans content/offres/photos-amazon.json, réécrit en entier à chaque relevé.
// Le site ignore les adresses de plus de 24 heures (lib/photos-produits.ts) : sans relevé, il montre l'initiale de la marque.
// Lancé par deploy/qrt-photos-amazon.sh (clés du coffre chargées par systemd, jamais affichées) :
//   flock -w 600 /run/lock/amazon-api.lock node scripts/photos-amazon.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { RESSOURCES, construireReleve, lireReponse, paquets } from './lib/photos-amazon.mjs'

const BASE = new URL('../data/robots-tondeuses.json', import.meta.url)
const SORTIE = new URL('../content/offres/photos-amazon.json', import.meta.url)
for (const v of ['AMAZON_CREATORS_ID', 'AMAZON_CREATORS_SECRET', 'AMAZON_PARTNER_TAG']) {
  if (!process.env[v]) { console.error(`Variable ${v} absente : rien n'est écrit.`); process.exit(1) }
}

const robots = JSON.parse(readFileSync(BASE, 'utf8')).filter((r) => r.asin)
const asins = [...new Set(robots.map((r) => r.asin))]
const jeton = await fetch('https://api.amazon.co.uk/auth/o2/token', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ grant_type: 'client_credentials', client_id: process.env.AMAZON_CREATORS_ID, client_secret: process.env.AMAZON_CREATORS_SECRET, scope: 'creatorsapi::default' }),
}).then((r) => r.json())
if (!jeton.access_token) { console.error("Jeton Amazon refusé : rien n'est écrit."); process.exit(1) }

const parAsin = {}
let echecs = 0
for (const lot of paquets(asins)) {
  let r
  for (let essai = 0; essai < 4; essai++) {
    r = await fetch('https://creatorsapi.amazon/catalog/v1/getItems', {
      method: 'POST',
      headers: { authorization: `Bearer ${jeton.access_token}`, 'content-type': 'application/json', 'x-marketplace': 'www.amazon.fr' },
      body: JSON.stringify({ itemIds: lot, itemIdType: 'ASIN', marketplace: 'www.amazon.fr', partnerTag: process.env.AMAZON_PARTNER_TAG, resources: RESSOURCES }),
    })
    if (r.status !== 429) break
    await new Promise((s) => setTimeout(s, 20000))
  }
  if (!r.ok) { echecs++; console.error(`Paquet de ${lot.length} ASIN : réponse ${r.status}`); continue }
  Object.assign(parAsin, lireReponse(await r.json().catch(() => ({}))))
  await new Promise((s) => setTimeout(s, 1500))
}

const releve = construireReleve(robots, parAsin)
const n = Object.keys(releve.produits).length
// Tout a échoué : on n'écrit rien (l'ancien fichier expire seul au bout de 24 heures).
if (!n && echecs) { console.error('Aucune réponse exploitable : rien n\'est écrit.'); process.exit(1) }
writeFileSync(SORTIE, JSON.stringify(releve, null, 2) + '\n')
console.log(`${n} photos Amazon sur ${robots.length} modèles avec ASIN (${echecs} paquet(s) en échec).`)

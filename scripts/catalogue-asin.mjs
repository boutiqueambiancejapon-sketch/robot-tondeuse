// ASIN Amazon.fr des modèles de data/robots-tondeuses.json (API Creators) : un résultat est retenu si son titre contient la marque
// et tous les mots distinctifs du modèle ; en cas de doute entre plusieurs fiches, la plus chère (règle du propriétaire, 28/11/2026).
// Lancer (clés du coffre, jamais affichées) :
//   sudo -n bash -c 'set -a; . /srv/toutou/shared/.env; set +a; flock -w 600 /run/lock/amazon-api.lock node scripts/catalogue-asin.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
const F = new URL('../data/robots-tondeuses.json', import.meta.url)
const L = JSON.parse(readFileSync(F, 'utf8'))
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()
const T = await fetch('https://api.amazon.co.uk/auth/o2/token', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ grant_type: 'client_credentials', client_id: process.env.AMAZON_CREATORS_ID, client_secret: process.env.AMAZON_CREATORS_SECRET, scope: 'creatorsapi::default' }) }).then((r) => r.json())
let found = 0
for (const m of L) {
  if (m.asin || m.arrete) continue
  const q = `${m.marque} ${m.modele}`.replace(/Segway /i, '')
  let r
  for (let i = 0; i < 4; i++) { r = await fetch('https://creatorsapi.amazon/catalog/v1/searchItems', { method: 'POST', headers: { authorization: `Bearer ${T.access_token}`, 'content-type': 'application/json', 'x-marketplace': 'www.amazon.fr' }, body: JSON.stringify({ keywords: q, marketplace: 'www.amazon.fr', partnerTag: process.env.AMAZON_PARTNER_TAG, resources: ['itemInfo.title', 'offersV2.listings.price'] }) }); if (r.status !== 429) break; await new Promise((s) => setTimeout(s, 20000)) }
  const items = (await r.json()).searchResult?.items ?? []
  const brand = norm(m.marque).split(' ').pop(), words = norm(m.modele).split(' ').filter((w) => w.length > 1 && !['robot', 'tondeuse'].includes(w))
  // Accessoires écartés (lames, garage, batterie, housse… « compatible avec ») : seulement le robot lui-même, seul ou en kit.
  const BAD = /compatible|\bpour (robot|segway|husqvarna|mammotion|navimow)|^\s*(lot|lames?|batterie|abri|housse|crochet|disque|protection|support|idea mower|zhsdmb|filzada|vhbw|【)|moteur d.entra|rechange|batterie|crochet|housse|support mural|garage s,|garage s \||^\s*segway navimow garage/i
  const ok = items.filter((it) => { const raw = it.itemInfo?.title?.displayValue ?? '', t = ` ${norm(raw)} `; return !BAD.test(raw) && !(/ 2 /.test(` ${norm(m.modele)} `) === false && /\bmini 2\b|\bluba 2\b|\byuka 2\b/.test(t)) && /tondeuse|automower|mower/.test(t) && t.includes(brand) && words.every((w) => t.includes(` ${w} `)) })
  ok.sort((a, b) => (b.offersV2?.listings?.[0]?.price?.money?.amount ?? 0) - (a.offersV2?.listings?.[0]?.price?.money?.amount ?? 0))
  if (ok[0]) { m.asin = ok[0].asin; found++; console.log('ok', m.id, ok[0].asin, (ok[0].itemInfo?.title?.displayValue ?? '').slice(0, 70)) }
  else console.log('--', m.id, items.length ? 'aucun titre exact' : 'aucun résultat')
  await new Promise((s) => setTimeout(s, 2500))
}
writeFileSync(F, JSON.stringify(L, null, 2) + '\n')
console.log(`${found} ASIN trouvés`)

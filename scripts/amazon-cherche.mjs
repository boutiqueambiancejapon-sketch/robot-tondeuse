// Recherche Amazon.fr par l'API Creators : titre, ASIN, prix, disponibilité des 4 premiers résultats de chaque requête.
// Lancer : sudo -n bash -c 'set -a; . /srv/toutou/shared/.env; set +a; node scripts/amazon-cherche.mjs "Dolphin E25" "Beatbot AquaSense 2"'
// Clés : coffre du centre de contrôle (jamais affichées). Débit limité par Amazon : 2,5 s entre deux requêtes, 20 s après un refus.
const T = await fetch('https://api.amazon.co.uk/auth/o2/token', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ grant_type: 'client_credentials', client_id: process.env.AMAZON_CREATORS_ID, client_secret: process.env.AMAZON_CREATORS_SECRET, scope: 'creatorsapi::default' }) }).then((r) => r.json())
for (const k of process.argv.slice(2)) {
  let r
  for (let i = 0; i < 4; i++) { r = await fetch('https://creatorsapi.amazon/catalog/v1/searchItems', { method: 'POST', headers: { authorization: `Bearer ${T.access_token}`, 'content-type': 'application/json', 'x-marketplace': 'www.amazon.fr' }, body: JSON.stringify({ keywords: k, marketplace: 'www.amazon.fr', partnerTag: process.env.AMAZON_PARTNER_TAG, resources: ['itemInfo.title', 'offersV2.listings.price', 'offersV2.listings.availability'] }) }); if (r.status !== 429) break; await new Promise((s) => setTimeout(s, 20000)) }
  const j = await r.json()
  console.log(`\n## ${k}`)
  for (const it of (j.searchResult?.items ?? []).slice(0, 4)) console.log(' -', it.asin, it.itemInfo?.title?.displayValue?.slice(0, 80), '|', it.offersV2?.listings?.[0]?.price?.money?.amount, it.offersV2?.listings?.[0]?.availability?.type)
  await new Promise((s) => setTimeout(s, 2500))
}

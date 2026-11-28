// Contrôle de data/robots-tondeuses.json (base produits des collections, tasks/collections-v1.md § 1 et § 2).
// Lancer : node scripts/catalogue-check.mjs   (sortie 1 si une erreur de format est trouvée)
// Vérifie : format, doublons d'id, champs obligatoires, valeurs autorisées.
// Affiche : modèles par marque, champs vides par marque, collections possibles (≥ 4 modèles, 1 à 3 critères de familles différentes).
import { readFileSync } from 'node:fs'

const FICHIER = new URL('../data/robots-tondeuses.json', import.meta.url)
const OBLIGATOIRES = ['id', 'marque', 'modele', 'surface_m2', 'guidage', 'sources']
const FACULTATIFS = ['pente_pct', 'transmission', 'connectivite', 'bruit_db', 'largeur_coupe_cm', 'hauteur_coupe_mm', 'autonomie_min', 'zones_max', 'ip', 'prix_eur', 'asin', 'awin']
const GUIDAGES = ['fil', 'rtk', 'lidar', 'vision']
const MIN_MODELES = 4

const erreurs = []
let base
try {
  base = JSON.parse(readFileSync(FICHIER, 'utf8'))
} catch (e) {
  console.error('Fichier illisible :', e.message)
  process.exit(1)
}
if (!Array.isArray(base)) {
  console.error('Le fichier doit contenir une liste de modèles.')
  process.exit(1)
}

const vide = (v) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)
const ids = new Set()
for (const [i, r] of base.entries()) {
  const nom = r?.id ?? `#${i}`
  for (const c of OBLIGATOIRES) if (vide(r[c])) erreurs.push(`${nom} : champ obligatoire « ${c} » vide`)
  if (r.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.id)) erreurs.push(`${nom} : id invalide`)
  if (ids.has(r.id)) erreurs.push(`${nom} : id en double`)
  ids.add(r.id)
  if (!vide(r.surface_m2) && !(Number.isInteger(r.surface_m2) && r.surface_m2 > 0)) erreurs.push(`${nom} : surface_m2 doit être un entier positif`)
  if (!vide(r.guidage)) {
    const parts = String(r.guidage).split('+')
    if (parts.some((p) => !GUIDAGES.includes(p))) erreurs.push(`${nom} : guidage « ${r.guidage} » inconnu (${GUIDAGES.join(', ')}, combinés par +)`)
    if (typeof r.sans_fil === 'boolean' && r.sans_fil !== !parts.includes('fil')) erreurs.push(`${nom} : sans_fil contredit le guidage`)
  }
  if (!vide(r.transmission) && !['2rm', '3rm', '4rm'].includes(r.transmission)) erreurs.push(`${nom} : transmission « ${r.transmission} » inconnue`)
  if (!vide(r.connectivite) && (!Array.isArray(r.connectivite) || r.connectivite.some((c) => !['wifi', 'bluetooth', '4g', 'lora'].includes(c)))) erreurs.push(`${nom} : connectivite invalide`)
  for (const c of ['pente_pct', 'bruit_db', 'largeur_coupe_cm', 'autonomie_min', 'zones_max', 'prix_eur']) if (!vide(r[c]) && typeof r[c] !== 'number') erreurs.push(`${nom} : ${c} doit être un nombre`)
  if (!vide(r.hauteur_coupe_mm) && !(Array.isArray(r.hauteur_coupe_mm) && r.hauteur_coupe_mm.length === 2)) erreurs.push(`${nom} : hauteur_coupe_mm doit être [min, max]`)
  if (!vide(r.prix_eur) && vide(r.prix_lu_le)) erreurs.push(`${nom} : prix_eur sans date (prix_lu_le)`)
  if (!vide(r.asin) && !/^B0[A-Z0-9]{8}$/.test(r.asin)) erreurs.push(`${nom} : asin invalide`)
  if (Array.isArray(r.sources)) for (const s of r.sources) if (!/^https:\/\//.test(s?.url ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(s?.lu_le ?? '')) erreurs.push(`${nom} : source sans adresse https ou sans date lu_le (AAAA-MM-JJ)`)
}

// Modèles et champs vides par marque
const parMarque = {}
for (const r of base) {
  const m = (parMarque[r.marque] ??= { n: 0, arretes: 0, vides: {} })
  m.n++
  if (r.arrete) m.arretes++
  for (const c of FACULTATIFS) if (vide(r[c])) m.vides[c] = (m.vides[c] ?? 0) + 1
}
console.log(`${base.length} modèles, ${Object.keys(parMarque).length} marques`)
for (const [marque, m] of Object.entries(parMarque).sort((a, b) => b[1].n - a[1].n)) {
  const v = Object.entries(m.vides).map(([c, n]) => `${c} ${n}`).join(', ')
  console.log(`- ${marque} : ${m.n} modèles${m.arretes ? ` (${m.arretes} arrêtés)` : ''} · vides : ${v || 'aucun'}`)
}

// Collections possibles (familles de tasks/collections-v1.md § 2 ; une valeur par famille au plus)
// Surface « pour X m² » = le robot couvre au moins X m² (sauf « ≤ 500 »). Usage = règles simples, à affiner avec le Dév.
const g = (r, x) => String(r.guidage ?? '').split('+').includes(x)
const familles = {
  surface: [['≤ 500 m²', (r) => r.surface_m2 <= 500], ...[1000, 1500, 2000, 3000, 5000].map((s) => [`${s} m²`, (r) => r.surface_m2 >= s])],
  pente: [35, 45, 70].map((p) => [`pente ≥ ${p} %`, (r) => r.pente_pct >= p]),
  guidage: [['fil', (r) => g(r, 'fil')], ['sans fil', (r) => r.sans_fil === true], ['RTK', (r) => g(r, 'rtk')], ['vision', (r) => g(r, 'vision')], ['LiDAR', (r) => g(r, 'lidar')]],
  awd: [['4 roues motrices', (r) => r.transmission === '4rm']],
  antivol: [['4G', (r) => (r.connectivite ?? []).includes('4g')]],
  silence: [['≤ 58 dB', (r) => typeof r.bruit_db === 'number' && r.bruit_db <= 58]],
  budget: [500, 800, 1000, 1500, 2000].map((b) => [`< ${b} €`, (r) => typeof r.prix_eur === 'number' && r.prix_eur < b]),
  marque: [...new Set(base.map((r) => r.marque))].map((m) => [m, (r) => r.marque === m]),
  usage: [['petit jardin', (r) => r.surface_m2 <= 800], ['grand terrain', (r) => r.surface_m2 >= 3000], ['terrain en pente', (r) => r.pente_pct >= 45], ['multi-zones', (r) => r.zones_max >= 10]],
}
const actifs = base.filter((r) => !r.arrete)
const crit = Object.entries(familles).flatMap(([f, vals]) => vals.map(([nom, test]) => ({ f, nom, ok: new Set(actifs.filter(test).map((r) => r.id)) })))
let total = 0
const parTaille = [0, 0, 0]
const compte = (sel, taille) => {
  let ens = sel[0].ok
  for (const c of sel.slice(1)) ens = new Set([...ens].filter((id) => c.ok.has(id)))
  if (ens.size >= MIN_MODELES) { total++; parTaille[taille - 1]++; trouvees.push({ taille, ens }) }
}
const trouvees = []
for (let i = 0; i < crit.length; i++) {
  compte([crit[i]], 1)
  for (let j = i + 1; j < crit.length; j++) {
    if (crit[j].f === crit[i].f) continue
    compte([crit[i], crit[j]], 2)
    for (let k = j + 1; k < crit.length; k++) {
      if (crit[k].f === crit[i].f || crit[k].f === crit[j].f) continue
      compte([crit[i], crit[j], crit[k]], 3)
    }
  }
}
console.log(`Collections possibles (≥ ${MIN_MODELES} modèles en vente) : ${total} (1 critère ${parTaille[0]}, 2 critères ${parTaille[1]}, 3 critères ${parTaille[2]}), avant le filtre anti-doublon`)

// Anti-doublon (§ 2) : les moins de critères d'abord ; une collection est écartée si elle et une collection gardée ont ≥ 70 % de modèles en commun (rapporté à la plus grande des deux : une sous-sélection nette reste permise).
const gardees = []
for (const c of trouvees.sort((a, b) => a.taille - b.taille || b.ens.size - a.ens.size)) {
  const doublon = gardees.some((g) => [...c.ens].filter((id) => g.has(id)).length / Math.max(c.ens.size, g.size) >= 0.7)
  if (!doublon) gardees.push(c.ens)
}
console.log(`Après le filtre anti-doublon (70 % de modèles en commun) : ${gardees.length} collections`)

if (erreurs.length) {
  console.error(`\n${erreurs.length} erreur(s) :`)
  for (const e of erreurs) console.error('  ' + e)
  process.exit(1)
}
console.log('Format OK')

import type { TypeRow } from './traffic'

// "À retenir" sentence of the home page, from conversions per page type. Low but real thresholds:
// below them, a sentence that says so, never an invented figure. Adapted from Toutou.

const MIN_GOALS = 3
const MIN_VIEWS = 100
const pct = new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 0 })
const nf = new Intl.NumberFormat('fr-FR')

const GOALS = [
  { key: 'clicks', words: 'clics vers Preply' },
  { key: 'leads', words: 'kits, inscriptions et comptes' },
] as const

export function insightOf(rows: TypeRow[]): string {
  const views = rows.reduce((s, r) => s + r.views, 0)
  for (const goal of GOALS) {
    const total = rows.reduce((s, r) => s + r[goal.key], 0)
    const sorted = [...rows].sort((a, b) => b[goal.key] - a[goal.key])
    const best = sorted[0]
    const second = sorted[1]?.[goal.key] ?? 0
    if (total < MIN_GOALS || !best || best[goal.key] < 2 || best[goal.key] === second) continue
    const share = views > 0 && best.views > 0 ? `, pour ${pct.format(best.views / views)} des pages vues` : ''
    return `Le plus de ${goal.words} vient de « ${best.label} » : ${nf.format(best[goal.key])} sur ${nf.format(total)}${share}.`
  }
  const busiest = [...rows].sort((a, b) => b.views - a.views)[0]
  if (views >= MIN_VIEWS && busiest) return `Type de page le plus lu : « ${busiest.label} », ${pct.format(busiest.views / views)} des pages vues. Trop peu de clics et d’inscriptions pour savoir quelles pages rapportent.`
  return 'Trop peu de visites sur la période pour en tirer une tendance.'
}

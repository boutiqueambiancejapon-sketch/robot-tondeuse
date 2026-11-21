// Periods offered by the selector (?periode=24h|7j|30j|90j). interval and bucket go as SQL
// parameters ($n::interval, date_trunc($n, …)), never concatenated. Every figure compares the
// period with the one just before it (same length), as on Toutou's dashboard.

export const PERIODS = {
  '24h': { label: '24 h', long: 'les dernières 24 heures', interval: '24 hours', bucket: 'hour', previous: 'aux 24 heures d’avant' },
  '7j': { label: '7 j', long: 'les 7 derniers jours', interval: '7 days', bucket: 'day', previous: 'aux 7 jours d’avant' },
  '30j': { label: '30 j', long: 'les 30 derniers jours', interval: '30 days', bucket: 'day', previous: 'aux 30 jours d’avant' },
  '90j': { label: '90 j', long: 'les 90 derniers jours', interval: '90 days', bucket: 'week', previous: 'aux 90 jours d’avant' },
} as const

export type PeriodKey = keyof typeof PERIODS
export type Period = (typeof PERIODS)[PeriodKey] & { key: PeriodKey }

export const TZ = 'Europe/Brussels'

export function periodQuery(key: PeriodKey): string {
  return key === '7j' ? '' : `?periode=${key}`
}

export function parsePeriod(value: string | string[] | undefined): Period {
  const raw = Array.isArray(value) ? value[0] : value
  const key: PeriodKey = raw === '24h' || raw === '30j' || raw === '90j' ? raw : '7j'
  return { ...PERIODS[key], key }
}

/** "par heure", "par jour" or "par semaine". */
export function bucketUnit(period: Period): string {
  return period.bucket === 'hour' ? 'par heure' : period.bucket === 'week' ? 'par semaine' : 'par jour'
}

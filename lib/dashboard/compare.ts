// Gap with the previous period, as short text. A percentage when the previous period counts at
// least 20 (enough for a % to mean something), otherwise a plain number. Adapted from Toutou.

export interface Pair {
  current: number
  previous: number
}

export type Trend = 'up' | 'down' | 'flat'

const nf = new Intl.NumberFormat('fr-FR')
const MIN_FOR_PERCENT = 20

export const ZERO_PAIR: Pair = { current: 0, previous: 0 }

export function trendOf({ current, previous }: Pair): Trend {
  if (current === previous) return 'flat'
  return current > previous ? 'up' : 'down'
}

/** "+5", "−2", "+12 %", "=" */
export function deltaShort(pair: Pair): string {
  const diff = pair.current - pair.previous
  if (diff === 0) return '='
  const sign = diff > 0 ? '+' : '−'
  if (pair.previous >= MIN_FOR_PERCENT) {
    const pct = Math.round((Math.abs(diff) / pair.previous) * 100)
    if (pct > 0) return `${sign}${pct} %`
  }
  return `${sign}${nf.format(Math.abs(diff))}`
}

/** Long form, read by screen readers and under the big tile. */
export function deltaLong(pair: Pair, previousLabel: string): string {
  if (pair.current === pair.previous) return `Autant que ${previousLabel.replace(/^aux /, 'les ')}`
  return `${deltaShort(pair)} par rapport ${previousLabel}`
}

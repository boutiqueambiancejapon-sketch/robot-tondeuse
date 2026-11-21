import { TZ } from './period'

const nf = new Intl.NumberFormat('fr-FR')
export const n = (value: number): string => nf.format(value)

const dateLong = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeStyle: 'short', timeZone: TZ })
const dateShort = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: TZ })
const dayOnly = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export const when = (d: Date): string => dateLong.format(d)
export const shortDay = (d: Date): string => dateShort.format(d)
/** "2026-11-20" (a calendar date, no time) → "20 nov. 2026". */
export const calendarDay = (iso: string): string => dayOnly.format(new Date(`${iso}T12:00:00Z`))

export function ago(d: Date, now = Date.now()): string {
  const min = Math.round((now - d.getTime()) / 60_000)
  if (min < 1) return 'à l’instant'
  if (min < 60) return `il y a ${min} min`
  const h = Math.round(min / 60)
  if (h < 48) return `il y a ${h} h`
  return `il y a ${Math.round(h / 24)} jours`
}

export function pct(part: number, total: number): string {
  if (total <= 0) return '–'
  const v = (part / total) * 100
  return `${v < 10 ? v.toFixed(1).replace('.', ',') : Math.round(v)} %`
}

export const gb = (bytes: number): string => `${(bytes / 1024 ** 3).toFixed(1).replace('.', ',')} Go`

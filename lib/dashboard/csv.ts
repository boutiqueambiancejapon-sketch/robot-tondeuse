// Dashboard CSV exports (ported from Toutou): ";" separator and UTF-8 BOM (opens directly in French Excel and in
// Numbers). A text cell starting with = + - @ gets an apostrophe so a spreadsheet never runs it as a formula
// (numbers, negative ones included, are left as they are).

export type CsvValue = string | number | boolean | null

function cell(value: CsvValue): string {
  let s = value === null ? '' : typeof value === 'boolean' ? (value ? 'oui' : 'non') : String(value)
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[";\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(header: string[], rows: CsvValue[][]): string {
  return `﻿${[header, ...rows].map((r) => r.map(cell).join(';')).join('\r\n')}\r\n`
}

const stamp = new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit' })

export function csvFileName(kind: string, now = new Date()): string {
  return `qrt-${kind}-${stamp.format(now)}.csv`
}

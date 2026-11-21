import type { ReactNode } from 'react'
import { deltaLong, deltaShort, trendOf, type Pair } from '@/lib/dashboard/compare'
import { n } from '@/lib/dashboard/format'
import type { Period } from '@/lib/dashboard/period'

// Stat tiles: big figure, gap to the previous period underneath (green up, red down; reversed
// when "down" is the good news, e.g. bounce). The sign is in the text, never colour alone.

export function Tiles({ children, five = false }: { children: ReactNode; five?: boolean }) {
  return <dl className={`tiles${five ? ' tiles--5' : ''}`}>{children}</dl>
}

interface DeltaProps {
  label: string
  pair: Pair
  period: Period
  hero?: boolean
  children?: ReactNode
}

export function DeltaTile({ label, pair, period, hero = false, children }: DeltaProps) {
  const trend = trendOf(pair)
  return (
    <div className={`tile${hero ? ' tile--hero' : ''}`}>
      <dt>{label}</dt>
      <dd className="tile-v">{n(pair.current)}</dd>
      <dd className={`tile-d${trend === 'flat' ? '' : ` ${trend}`}`}>
        {hero ? deltaLong(pair, period.previous) : <><span aria-hidden="true">{deltaShort(pair)}</span><span className="sr-only">{deltaLong(pair, period.previous)}</span></>}
      </dd>
      {children && <dd>{children}</dd>}
    </div>
  )
}

interface TextProps {
  label: string
  value: string
  note?: string
  tone?: 'up' | 'down'
}

export function TextTile({ label, value, note, tone }: TextProps) {
  return (
    <div className="tile">
      <dt>{label}</dt>
      <dd className="tile-v">{value}</dd>
      {note && <dd className={`tile-d${tone ? ` ${tone}` : ''}`}>{note}</dd>}
    </div>
  )
}

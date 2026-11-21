import type { PeriodKey } from '@/lib/dashboard/period'
import { SubNav } from '../SubNav'

const VIEWS = [
  { sub: '', label: 'Vue d’ensemble' },
  { sub: '/direct', label: 'En direct' },
  { sub: '/acquisition', label: 'Acquisition' },
  { sub: '/pages', label: 'Pages et parcours' },
] as const

export type TrafficSub = (typeof VIEWS)[number]['sub']

export function TrafficNav({ period, current }: { period: PeriodKey; current: TrafficSub }) {
  return <SubNav tab="trafic" label="Vues du trafic" views={VIEWS} period={period} current={current} />
}

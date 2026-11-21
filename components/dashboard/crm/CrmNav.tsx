import type { PeriodKey } from '@/lib/dashboard/period'
import { SubNav } from '../SubNav'

const VIEWS = [
  { sub: '', label: 'Où en sont-ils' },
  { sub: '/contacts', label: 'Tous les contacts' },
] as const

export function CrmNav({ period, current }: { period?: PeriodKey; current: (typeof VIEWS)[number]['sub'] }) {
  return <SubNav tab="crm" label="Vues des contacts" views={VIEWS} period={period} current={current} />
}

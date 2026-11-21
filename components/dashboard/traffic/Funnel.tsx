import { n, pct } from '@/lib/dashboard/format'
import type { FunnelStep } from '@/lib/dashboard/traffic'
import { Empty } from '../Card'

/** Each bar is proportional to the first step; label and value stay above the bar. */
export function Funnel({ steps, empty }: { steps: FunnelStep[]; empty: string }) {
  const first = steps[0]?.value ?? 0
  if (first === 0) return <Empty>{empty}</Empty>
  return (
    <ol className="bars">
      {steps.map((s, i) => (
        <li key={s.label} className="bar-row">
          <span className="bar-label">{s.label}</span>
          <span className="bar-value">
            {n(s.value)}
            {i > 0 && <small> · {pct(s.value, first)}</small>}
          </span>
          <span className="bar-track" aria-hidden="true">
            <span className="bar-fill" style={{ width: `${Math.max((s.value / first) * 100, 1)}%` }} />
          </span>
        </li>
      ))}
    </ol>
  )
}

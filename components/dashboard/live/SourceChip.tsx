import type { Source } from '@/lib/dashboard/source'

// Source badge of one line of the "En direct" feed (colour by channel, dashboard.css .src--*).

export function SourceChip({ source }: { source: Source }) {
  const internal = source.channel === 'internal'
  return (
    <span className="src-line">
      <span className={`src src--${source.channel}`}>{source.label}</span>
      {internal && source.from ? <span className="muted"> depuis {source.from}</span> : null}
    </span>
  )
}

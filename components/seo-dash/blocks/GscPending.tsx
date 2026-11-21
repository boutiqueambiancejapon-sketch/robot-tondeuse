import type { GscState } from '@/lib/seo-dash/server/gsc-state'
import { GSC_REASON } from '@/lib/seo-dash/server/gsc-state'
import { Pending } from '../ui/Card'

// SEO dashboard, QRT: what the Google blocks show while Search Console isn't connected yet (no invented figure).

export function GscPending({ state, compact = false }: { state: GscState; compact?: boolean }) {
  if (state.ready) return null
  return (
    <section className={compact ? 'sd-note sd-gap' : 'sd-card sd-gap'}>
      {compact ? null : (
        <h2>
          Search Console <Pending>À connecter</Pending>
        </h2>
      )}
      <p className={compact ? undefined : 'sd-sub'}>
        {compact ? 'Google (Search Console) à connecter : ' : null}
        {GSC_REASON[state.reason]} Les clics, affichages, positions et opportunités s’afficheront ici d’eux-mêmes.
      </p>
    </section>
  )
}

import type { Pool } from 'pg'
import { gscKeyPresent, siteConnected } from '@/lib/server/dashboard/search-console'

// SEO dashboard, QRT: is Search Console connected? The Google figures come from the nightly collector
// (scripts/seo/collect-gsc.ts → analytics.gsc_*). Until the first rows land, the screens say « À connecter » and why;
// the state turns on by itself once the key file exists, the property is shared and the collector has run.

export type GscState = { ready: true } | { ready: false; reason: 'cle' | 'acces' | 'releve' }

let cached: { at: number; state: GscState } | null = null

export async function gscState(pool: Pool): Promise<GscState> {
  if (cached && Date.now() - cached.at < 60_000) return cached.state
  const { rows } = await pool.query<{ any: boolean }>('SELECT EXISTS (SELECT 1 FROM analytics.gsc_site_daily) AS any')
  let state: GscState = { ready: true }
  if (!rows[0]?.any) {
    if (!gscKeyPresent()) state = { ready: false, reason: 'cle' }
    else state = { ready: false, reason: (await siteConnected().catch(() => false)) ? 'releve' : 'acces' }
  }
  cached = { at: Date.now(), state }
  return state
}

export const GSC_REASON: Record<'cle' | 'acces' | 'releve', string> = {
  cle: 'La clé du compte de service Google n’est pas encore sur le serveur (/srv/sites/robot-tondeuse/shared/gsc-key.json).',
  acces: 'La clé est là, mais la propriété Search Console quel-robot-tondeuse.com n’est pas encore partagée avec le compte de service.',
  releve: 'Search Console est connectée : le premier relevé arrive avec la tâche de nuit (qrt-seo-collect).',
}

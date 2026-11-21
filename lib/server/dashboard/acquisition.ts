import 'server-only'
import type { Pool } from 'pg'
import type { Period } from '@/lib/dashboard/period'
import type { Row } from './safe'
import { HUMAN_VIEW } from './sessions'

// Acquisition extras that don't come from sessions: landing pages of visits sent by an AI assistant.

export interface AcquisitionExtras {
  aiLandings: Row[]
}

export const EMPTY_EXTRAS: AcquisitionExtras = { aiLandings: [] }

export async function getAcquisitionExtras(pool: Pool, period: Period): Promise<AcquisitionExtras> {
  const res = await pool.query<Row>(
    `SELECT path AS label, count(*)::int AS value FROM analytics.hits WHERE ${HUMAN_VIEW} AND ref_ai IS NOT NULL AND ts >= now() - $1::interval
      GROUP BY 1 ORDER BY 2 DESC, 1 LIMIT 10`,
    [period.interval],
  )
  return { aiLandings: res.rows }
}

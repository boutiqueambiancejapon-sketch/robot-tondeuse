import 'server-only'
import type { Pool } from 'pg'
import { getPool } from '@/lib/server/db'

// Each block is read on its own: a failing query gives an empty block (and a log line), never a broken page.

export async function safeRead<T>(label: string, fallback: T, read: (pool: Pool) => Promise<T>): Promise<{ value: T; ok: boolean }> {
  const pool = getPool()
  if (!pool) return { value: fallback, ok: false }
  try {
    return { value: await read(pool), ok: true }
  } catch (err) {
    console.error(`[dashboard] ${label}`, err instanceof Error ? err.message : err)
    return { value: fallback, ok: false }
  }
}

export interface Row {
  label: string
  value: number
  extra?: number
}

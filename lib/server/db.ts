import { Pool } from 'pg'

// Local PostgreSQL (database `qrt`, Unix socket, peer auth as the `sites` system user).
// Without DATABASE_URL (local build), getPool() returns null and callers do nothing.

const holder = globalThis as unknown as { qrtPool?: Pool | null }

export function getPool(): Pool | null {
  if (holder.qrtPool !== undefined) return holder.qrtPool
  const url = process.env.DATABASE_URL
  holder.qrtPool = url ? new Pool({ connectionString: url, max: 4, idleTimeoutMillis: 30_000 }) : null
  return holder.qrtPool
}

export function requirePool(): Pool {
  const pool = getPool()
  if (!pool) throw new Error('DATABASE_URL missing')
  return pool
}

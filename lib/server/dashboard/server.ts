import 'server-only'
import { execFile } from 'node:child_process'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

// Server tab: site service, ingestion, weekly price reading and hourly deploy (systemctl show, read-only, no privilege),
// the release being served (its folder name is the commit), disk, memory and load.

const run = promisify(execFile)

export interface UnitState {
  unit: string
  props: Record<string, string>
}

const UNITS: Record<string, string[]> = {
  'site@robot-tondeuse.service': ['ActiveState', 'ActiveEnterTimestamp', 'NRestarts', 'MemoryCurrent'],
  'site-deploy@robot-tondeuse.service': ['Result', 'ExecMainExitTimestamp', 'InactiveEnterTimestamp'],
  'site-deploy@robot-tondeuse.timer': ['ActiveState', 'NextElapseUSecRealtime'],
  'qrt-ingest.service': ['Result', 'ExecMainExitTimestamp', 'InactiveEnterTimestamp'],
  'qrt-ingest.timer': ['ActiveState'],
  'qrt-offres.service': ['Result', 'ExecMainExitTimestamp', 'InactiveEnterTimestamp'],
  'qrt-offres.timer': ['ActiveState', 'NextElapseUSecRealtime'],
}

async function show(unit: string, props: string[]): Promise<UnitState> {
  try {
    const { stdout } = await run('systemctl', ['show', unit, `--property=${props.join(',')}`, '--timestamp=unix'], { timeout: 3000 })
    const out: Record<string, string> = {}
    for (const line of stdout.split('\n')) {
      const i = line.indexOf('=')
      if (i > 0) out[line.slice(0, i)] = line.slice(i + 1)
    }
    return { unit, props: out }
  } catch {
    return { unit, props: {} }
  }
}

export interface Usage {
  used: number
  total: number
}

export interface ServerData {
  units: Record<string, Record<string, string>>
  release: { sha: string; at: Date | null }
  disk: Usage | null
  memory: Usage | null
  load: number | null
  cores: number
}

async function readRelease(): Promise<ServerData['release']> {
  try {
    const dir = await fs.realpath(process.cwd())
    const stat = await fs.stat(dir)
    return { sha: path.basename(dir), at: stat.mtime }
  } catch {
    return { sha: '?', at: null }
  }
}

async function readDisk(): Promise<Usage | null> {
  try {
    const s = await fs.statfs('/')
    const total = s.blocks * s.bsize
    return total > 0 ? { used: total - s.bavail * s.bsize, total } : null
  } catch {
    return null
  }
}

async function readMemory(): Promise<Usage | null> {
  try {
    const text = await fs.readFile('/proc/meminfo', 'utf-8')
    const kb = (key: string) => Number(new RegExp(`^${key}:\\s+(\\d+) kB`, 'm').exec(text)?.[1] ?? 0) * 1024
    const total = kb('MemTotal')
    return total > 0 ? { used: total - kb('MemAvailable'), total } : null
  } catch {
    return null
  }
}

/** systemd state of a few units only (the Content tab reads the price reading's timer). */
export async function getUnits(names: string[]): Promise<Record<string, Record<string, string>>> {
  const states = await Promise.all(names.filter((u) => UNITS[u]).map((u) => show(u, UNITS[u] ?? [])))
  return Object.fromEntries(states.map((s) => [s.unit, s.props]))
}

export async function getServer(): Promise<ServerData> {
  const [states, release, disk, memory] = await Promise.all([
    Promise.all(Object.entries(UNITS).map(([unit, props]) => show(unit, props))),
    readRelease(),
    readDisk(),
    readMemory(),
  ])
  const load = os.loadavg()[2]
  return {
    units: Object.fromEntries(states.map((s) => [s.unit, s.props])),
    release,
    disk,
    memory,
    load: Number.isFinite(load) ? (load ?? null) : null,
    cores: Math.max(os.availableParallelism(), 1),
  }
}

/** systemd "@1795212341" (unix seconds) → Date, or null. */
export function unixDate(value: string | undefined): Date | null {
  const m = /^@(\d+)$/.exec(value ?? '')
  return m?.[1] ? new Date(Number(m[1]) * 1000) : null
}

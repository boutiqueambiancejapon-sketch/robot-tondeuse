'use client'

import { useEffect, useState } from 'react'
import type { LiveData } from '@/lib/server/dashboard/live'

// Polls the live data every 10 s, paused while the tab is hidden. A lost session sends back to login.

const REFRESH_MS = 10_000
const URL_DATA = '/dashboard/trafic/direct/donnees'

export function useLive(): { data: LiveData | null; failed: boolean } {
  const [data, setData] = useState<LiveData | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let timer: number | undefined
    let stopped = false
    const load = async () => {
      if (document.visibilityState === 'visible') {
        try {
          const res = await fetch(URL_DATA, { cache: 'no-store' })
          const json = res.headers.get('content-type')?.includes('application/json')
          if (res.status === 401 || res.redirected || !json) window.location.assign('/dashboard/connexion')
          if (!res.ok || !json) throw new Error(String(res.status))
          const next = (await res.json()) as LiveData
          if (!stopped) {
            setData(next)
            setFailed(false)
          }
        } catch {
          if (!stopped) setFailed(true)
        }
      }
      if (!stopped) timer = window.setTimeout(load, REFRESH_MS)
    }
    void load()
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      window.clearTimeout(timer)
      void load()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      stopped = true
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])
  return { data, failed }
}

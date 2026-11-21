'use client'

import { useEffect } from 'react'
import { track } from '@/lib/track'

// Core Web Vitals of our visitors (LCP, INP, CLS), measured with the browser's observers (same definitions as Google's
// web-vitals library, no extra dependency, ported from Toutou) and sent through /api/e when the page goes to the
// background: one send per page view, nothing before. Read by Dashboard › Technique.

type Entry = PerformanceEntry & { value?: number; hadRecentInput?: boolean; interactionId?: number; duration: number }

function observe(type: string, cb: (list: Entry[]) => void): PerformanceObserver | null {
  try {
    if (!PerformanceObserver.supportedEntryTypes?.includes(type)) return null
    const po = new PerformanceObserver((l) => cb(l.getEntries() as Entry[]))
    po.observe({ type, buffered: true, ...(type === 'event' ? { durationThreshold: 40 } : {}) } as PerformanceObserverInit)
    return po
  } catch {
    return null
  }
}

export function WebVitals() {
  useEffect(() => {
    let lcp = 0
    let cls = 0
    let session = 0
    let first = 0
    let last = 0
    let inp = 0
    let sent = false
    const start = window.location.pathname
    const obs = [
      observe('largest-contentful-paint', (l) => {
        const e = l[l.length - 1]
        if (e) lcp = e.startTime
      }),
      observe('layout-shift', (l) => {
        for (const e of l) {
          if (e.hadRecentInput) continue
          if (session && e.startTime - last < 1000 && e.startTime - first < 5000) session += e.value ?? 0
          else {
            session = e.value ?? 0
            first = e.startTime
          }
          last = e.startTime
          cls = Math.max(cls, session)
        }
      }),
      observe('event', (l) => {
        for (const e of l) if (e.interactionId) inp = Math.max(inp, e.duration)
      }),
    ]
    const send = () => {
      if (sent || document.visibilityState !== 'hidden') return
      sent = true
      // After a client-side navigation, paint and stability belong to the landing page: not sent.
      if (window.location.pathname === start) {
        if (lcp > 0) track('web_vital', { m: 'LCP', v: Math.round(lcp) })
        track('web_vital', { m: 'CLS', v: Math.round(cls * 1000) / 1000 })
      }
      if (inp > 0) track('web_vital', { m: 'INP', v: Math.round(inp) })
      for (const o of obs) o?.disconnect()
    }
    document.addEventListener('visibilitychange', send)
    return () => document.removeEventListener('visibilitychange', send)
  }, [])
  return null
}

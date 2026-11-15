'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Mascotte } from './Mascotte'

type Props = { lines: string[]; eyebrow: string; children: React.ReactNode }

const LINE_MS = 900
const TURN_MS = 240
const PARK_MS = 700

/** Accueil : le robot tond le titre ligne par ligne, puis va se garer sur sa station. */
export function LawnHero({ lines, eyebrow, children }: Props) {
  const lawn = useRef<HTMLElement>(null)
  const bot = useRef<HTMLSpanElement>(null)
  const dock = useRef<HTMLDivElement>(null)
  const raf = useRef(0)

  const run = useCallback(() => {
    const host = lawn.current, robot = bot.current, station = dock.current
    if (!host || !robot || !station) return
    cancelAnimationFrame(raf.current)
    const rowsEl = Array.from(host.querySelectorAll<HTMLElement>('.ln'))
    const box = host.getBoundingClientRect(), W = box.width, bw = robot.offsetWidth, bh = robot.offsetHeight
    const rows = rowsEl.map((el, i) => {
      const r = el.getBoundingClientRect()
      return { el, y: r.top - box.top + r.height / 2 - bh / 2, rtl: i % 2 === 1 }
    })
    const st = station.getBoundingClientRect()
    const park = { x: st.left - box.left + (st.width - bw) / 2, y: st.top - box.top + (st.height - bh) / 2 - 2 }
    const place = (x: number, y: number, deg: number) => { robot.style.transform = `translate(${x}px,${y}px) rotate(${deg}deg)` }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || rows.length === 0) {
      rowsEl.forEach((el) => el.style.setProperty('--p', '1'))
      return place(park.x, park.y, -90)
    }
    rowsEl.forEach((el) => el.style.setProperty('--p', '0'))
    const start = performance.now()
    let lastClip = 0
    const frame = (now: number) => {
      const t = Math.max(0, now - start), seg = Math.floor(t / (LINE_MS + TURN_MS)), k = t - seg * (LINE_MS + TURN_MS)
      if (seg >= rows.length) {
        const last = rows[rows.length - 1]
        const kk = Math.min(1, (t - rows.length * (LINE_MS + TURN_MS)) / PARK_MS), e = 1 - Math.pow(1 - kk, 3)
        const fx = last.rtl ? -bw * 0.3 : W - bw * 0.7
        place(fx + (park.x - fx) * e, last.y + (park.y - last.y) * e, last.rtl ? 180 - 270 * e : -90 * e)
        if (kk < 1) raf.current = requestAnimationFrame(frame)
        return
      }
      const row = rows[seg]
      if (k <= LINE_MS) {
        const p = k / LINE_MS
        const x = row.rtl ? W - bw * 0.7 - p * (W - bw * 0.4) : -bw * 0.3 + p * (W - bw * 0.4)
        row.el.style.setProperty('--p', String(Math.min(1, p * 1.04)))
        place(x, row.y, row.rtl ? 180 : 0)
        if (now - lastClip > 60) { lastClip = now; clippings(host, x + (row.rtl ? bw : 0), row.y + bh / 2) }
      } else {
        row.el.style.setProperty('--p', '1')
        const next = rows[seg + 1]
        if (next) {
          const p = (k - LINE_MS) / TURN_MS
          place(row.rtl ? -bw * 0.3 : W - bw * 0.7, row.y + (next.y - row.y) * p, row.rtl ? 180 - 180 * p : 180 * p)
        }
      }
      raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
  }, [])

  useEffect(() => {
    let width = window.innerWidth
    const onResize = () => { if (window.innerWidth !== width) { width = window.innerWidth; run() } }
    document.fonts.ready.then(run)
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', onResize) }
  }, [run])

  return (
    <section className="lawn" ref={lawn} aria-label={lines.join(' ')}>
      <p className="eyebrow">{eyebrow}</p>
      <button className="replay" type="button" aria-label="Rejouer l’animation" onClick={run}>↻</button>
      <h1 className="lawn-title" aria-label={lines.join(' ')}>
        {lines.map((text) => (
          <span className="ln" aria-hidden="true" key={text}>
            <span className="off">{text}</span>
            <span className="on">{text}</span>
          </span>
        ))}
      </h1>
      <span className="bot" ref={bot} aria-hidden="true"><Mascotte pose="top" size={78} priority /></span>
      <div className="lawn-foot">
        {children}
        <div className="dock" ref={dock} aria-hidden="true" />
      </div>
    </section>
  )
}

/** Deux brins d'herbe qui volent derrière le robot. */
function clippings(host: HTMLElement, x: number, y: number) {
  for (let i = 0; i < 2; i++) {
    const c = document.createElement('i')
    c.className = 'clip'
    host.appendChild(c)
    const a = Math.random() * Math.PI * 2, d = 10 + Math.random() * 26
    const anim = c.animate(
      [
        { transform: `translate(${x}px,${y}px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${x + Math.cos(a) * d}px,${y + Math.sin(a) * d - 14}px) rotate(${Math.random() * 300}deg)`, opacity: 0 },
      ],
      { duration: 500 + Math.random() * 400, easing: 'ease-out' },
    )
    anim.onfinish = () => c.remove()
  }
}

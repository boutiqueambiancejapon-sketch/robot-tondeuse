'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { niche } from '@/niche.config'
import { MENU_V2 } from '@/lib/menu-v2'
import { Mascotte } from './Mascotte'

/** En-tête V2 : logo, bouton Menu, et le petit robot qui tond la barre de lecture. */
export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const fill = useRef<HTMLElement>(null)
  const bot = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (fill.current) fill.current.style.width = `${p * 100}%`
      if (bot.current) bot.current.style.left = `calc(${p} * (100% - 28px))`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  return (
    <div className="v2" style={{ display: 'contents' }}>
      <header className="hd">
        <div className="wrap hd-in">
          <Link className="logo" href="/" aria-label={`${niche.siteName}, accueil`}>
            <Mascotte pose="side" size={36} priority />
            {niche.siteName}
          </Link>
          <button className="burger" type="button" aria-expanded={open} aria-controls="menu-v2" onClick={() => setOpen(true)}>
            <i aria-hidden="true" />
            Menu
          </button>
        </div>
        <div className="mowbar" aria-hidden="true">
          <b ref={fill} />
          <span ref={bot} className="mowbot">
            <Mascotte pose="top" size={28} />
          </span>
        </div>
      </header>
      <nav id="menu-v2" className={`menu${open ? ' open' : ''}`} aria-label="Menu" aria-hidden={!open}>
        <div className="menu-top">
          <span className="logo">{niche.siteName}</span>
          <button className="burger" type="button" onClick={() => setOpen(false)}>
            Fermer
          </button>
        </div>
        {MENU_V2.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}

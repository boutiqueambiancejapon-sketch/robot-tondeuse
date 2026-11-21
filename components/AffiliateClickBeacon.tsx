'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { CLICK_EVENT, merchantOf, robotOfHref } from '@/lib/dashboard/events'
import { notePath, track } from '@/lib/track'

/** Emplacements du lien, du plus large au plus précis (« notre-choix › lignes-prix »), sinon « texte ». */
function placeOf(link: Element): string {
  const places: string[] = []
  let el = link.closest('[data-place]')
  while (el) {
    places.unshift(el.getAttribute('data-place') ?? '')
    el = el.parentElement?.closest('[data-place]') ?? null
  }
  return places.filter(Boolean).join(' › ').slice(0, 80) || 'texte'
}

/**
 * Compte les clics vers Amazon, Cdiscount et Fnac pour le tableau de bord : une balise (page, marchand,
 * emplacement, robot) vers notre /api/e. Aucun cookie. Les liens, leurs cibles et leurs attributs rel
 * ne changent pas : le suivi Amazon et Awin reste celui du marchand.
 */
export function AffiliateClickBeacon() {
  const pathname = usePathname()
  // Page précédente du site, envoyée avec les événements suivants (source dans le fil « En direct »).
  useEffect(() => notePath(pathname), [pathname])
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button > 1) return
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null
      const href = link?.getAttribute('href')
      const merchant = href ? merchantOf(href, window.location.origin) : null
      if (!link || !href || !merchant) return
      const robot = link.closest('[data-robot]')?.getAttribute('data-robot') || robotOfHref(new URL(href, window.location.origin).pathname) || undefined
      track(CLICK_EVENT, { merchant, place: placeOf(link), robot: robot?.slice(0, 80) })
    }
    document.addEventListener('click', onClick, { capture: true })
    document.addEventListener('auxclick', onClick, { capture: true })
    return () => {
      document.removeEventListener('click', onClick, { capture: true })
      document.removeEventListener('auxclick', onClick, { capture: true })
    }
  }, [])
  return null
}

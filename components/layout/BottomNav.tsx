'use client'

/**
 * BottomNav — barre de navigation mobile fixe (4 icônes).
 * Affichée uniquement sous 768px.
 * Le Quiz est l'icône centrale, mise en avant comme driver de conversion.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, GitCompare, Sparkles, BookOpen } from 'lucide-react'
import { BOTTOM_NAV, type BottomNavItem } from '@/lib/menu'

const ICONS: Record<BottomNavItem['icon'], typeof Home> = {
  home: Home,
  compare: GitCompare,
  quiz: Sparkles,
  search: BookOpen,
}

export function BottomNav() {
  const pathname = usePathname()
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <nav
      className="bottom-nav"
      aria-label="Navigation rapide"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 38,
        background: 'var(--paper)',
        borderTop: '1px solid var(--border)',
        boxShadow: '0 -4px 16px rgba(26, 46, 31, 0.06)',
        padding: '8px 12px calc(8px + env(safe-area-inset-bottom))',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {BOTTOM_NAV.map((item) => {
        const Icon = ICONS[item.icon]
        const active = isActive(item.href)
        const isQuiz = item.icon === 'quiz'

        if (isQuiz) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                padding: '6px 14px',
                minWidth: 64,
                background: 'var(--copper)',
                color: 'var(--ivory)',
                borderRadius: 18,
                textDecoration: 'none',
                transform: 'translateY(-10px)',
                boxShadow: '0 6px 16px rgba(184, 98, 61, 0.35)',
                transition: 'background 150ms ease, transform 150ms ease',
              }}
            >
              <Icon size={20} aria-hidden="true" />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.02em' }}>{item.label}</span>
            </Link>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '6px 4px',
              color: active ? 'var(--copper)' : 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 150ms ease',
            }}
          >
            <Icon size={20} aria-hidden="true" />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: '0.02em' }}>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

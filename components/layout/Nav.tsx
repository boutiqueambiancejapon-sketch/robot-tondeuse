'use client'

/**
 * Nav — navigation principale Atelier Vert.
 * Desktop : 5 entrées avec mega-panels (hover/focus-within).
 * Mobile : drawer plein écran avec sections expandables.
 * Configuration menu lue depuis lib/menu.ts.
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { niche } from '@/niche.config'
import { MAIN_MENU, type MenuEntry, type MenuItem } from '@/lib/menu'

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = setTimeout(() => { setOpen(false); setMobileSection(null) })
    return () => clearTimeout(id)
  }, [pathname])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const isEntryActive = (entry: MenuEntry) => {
    if (entry.href && isActive(entry.href)) return true
    return entry.columns?.some((col) => col.items.some((it) => isActive(it.href))) ?? false
  }

  return (
    <>
      <header
        className={scrolled || open ? 'nav-glass-active' : ''}
        style={{
          position: 'sticky', top: 0, zIndex: 1100,
          backgroundColor: (scrolled || open) ? 'rgba(251, 248, 240, 0.96)' : 'transparent',
          backdropFilter: (scrolled || open) ? 'blur(24px) saturate(1.6)' : 'none',
          WebkitBackdropFilter: (scrolled || open) ? 'blur(24px) saturate(1.6)' : 'none',
          borderBottom: (scrolled || open) ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease',
        }}
      >
        <nav aria-label="Navigation principale" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--space-6)', height: '64px', display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Logo />

          {/* Desktop */}
          <ul role="list" style={{ display: 'flex', gap: 'var(--space-2)', listStyle: 'none', margin: 0, padding: 0, marginLeft: 'auto', alignItems: 'center' }} className="nav-desktop">
            {MAIN_MENU.map((entry) => (
              <li key={entry.id} className="mega-trigger">
                <NavTrigger entry={entry} active={isEntryActive(entry)} />
                {entry.columns && <MegaPanel entry={entry} isActive={isActive} />}
              </li>
            ))}
          </ul>

          {/* CTA Quiz desktop — primaire copper */}
          <Link
            href="/quiz"
            className="nav-quiz-cta"
            style={{
              padding: '10px 18px',
              borderRadius: 100,
              background: 'var(--copper)',
              color: 'var(--ivory)',
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 150ms ease, transform 150ms ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--copper-bright)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--copper)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Trouver mon robot →
          </Link>

          {/* Hamburger */}
          <button aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 'var(--space-2)', display: 'flex' }} className="nav-hamburger">
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: '64px 0 0 0',
            backgroundColor: 'var(--paper)',
            borderTop: '1px solid var(--border)',
            padding: 'var(--space-6)',
            display: 'flex', flexDirection: 'column', gap: 'var(--space-1)',
            zIndex: 39, overflowY: 'auto',
          }}
          aria-label="Menu mobile" role="dialog"
        >
          {MAIN_MENU.map((entry) => (
            <MobileSection
              key={entry.id}
              entry={entry}
              isActive={isActive}
              isEntryActive={isEntryActive(entry)}
              isOpen={mobileSection === entry.id}
              onToggle={() => setMobileSection((s) => s === entry.id ? null : entry.id)}
            />
          ))}

          <Link
            href="/quiz"
            style={{
              marginTop: 'var(--space-6)',
              padding: '14px 22px',
              borderRadius: 100,
              background: 'var(--copper)',
              color: 'var(--ivory)',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Trouver mon robot en 2 min →
          </Link>
        </div>
      )}
    </>
  )
}

// ─── Logo ────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${niche.siteName} — accueil`}
      style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}
    >
      <svg width={32} height={32} viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="var(--forest-deep)" strokeWidth="1.5" fill="none" />
        <rect x="11" y="14" width="18" height="13" rx="3" fill="var(--forest-deep)" />
        <circle cx="15" cy="27" r="2.5" fill="var(--copper)" />
        <circle cx="25" cy="27" r="2.5" fill="var(--copper)" />
        <circle cx="20" cy="18" r="1.5" fill="var(--sage-light)" />
        <path d="M14 10 L14 14 M20 8 L20 14 M26 10 L26 14" stroke="var(--copper)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--next-font-display), Georgia, serif', fontSize: 18, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {niche.siteName}
        </span>
        <span style={{ fontFamily: 'var(--next-font-mono), monospace', fontSize: 9, color: 'var(--moss)', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 3 }}>
          Tests · Comparatifs · Outils
        </span>
      </div>
    </Link>
  )
}

// ─── Desktop trigger (link or button) ────────────────────────────────────

function NavTrigger({ entry, active }: { entry: MenuEntry; active: boolean }) {
  const style: React.CSSProperties = {
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? 'var(--copper)' : 'var(--text-primary)',
    padding: '8px 12px',
    borderRadius: 100,
    transition: 'color 150ms ease, background 150ms ease',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: 'inherit',
  }
  const content = (
    <>
      {entry.label}
      {entry.columns && <ChevronDown size={11} aria-hidden="true" style={{ opacity: 0.6 }} />}
    </>
  )
  return entry.href
    ? <Link href={entry.href} style={style}>{content}</Link>
    : <button type="button" style={style} aria-haspopup="true">{content}</button>
}

// ─── Mega panel ──────────────────────────────────────────────────────────

function MegaPanel({ entry, isActive }: { entry: MenuEntry; isActive: (h: string) => boolean }) {
  const cols = entry.columns?.length ?? 1
  return (
    <div
      role="menu"
      className={`mega-panel${entry.cta ? ' has-cta' : ''}`}
      style={{ ['--mega-cols' as string]: cols }}
    >
      {entry.columns?.map((col, i) => (
        <div key={i}>
          <div className="mega-col-title">{col.title}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {col.items.map((it) => <MegaItem key={it.href} item={it} active={isActive(it.href)} />)}
          </div>
        </div>
      ))}
      {entry.cta && (
        <Link href={entry.cta.href} className="mega-cta" role="menuitem">
          <span className="mega-cta-label">{entry.cta.label}</span>
          {entry.cta.description && <span className="mega-cta-desc">{entry.cta.description}</span>}
        </Link>
      )}
    </div>
  )
}

function MegaItem({ item, active }: { item: MenuItem; active: boolean }) {
  return (
    <Link href={item.href} role="menuitem" className={`mega-item${active ? ' mega-item-active' : ''}`}>
      <span>
        {item.label}
        {item.badge && <span className="mega-badge">{item.badge}</span>}
      </span>
      {item.description && <span className="mega-item-desc">{item.description}</span>}
    </Link>
  )
}

// ─── Mobile section ─────────────────────────────────────────────────────

function MobileSection({
  entry, isActive, isEntryActive, isOpen, onToggle,
}: {
  entry: MenuEntry
  isActive: (h: string) => boolean
  isEntryActive: boolean
  isOpen: boolean
  onToggle: () => void
}) {
  if (!entry.columns) {
    return (
      <Link
        href={entry.href!}
        style={{
          fontSize: 22,
          fontFamily: 'var(--next-font-display), Georgia, serif',
          color: isEntryActive ? 'var(--copper)' : 'var(--text-primary)',
          textDecoration: 'none',
          padding: 'var(--space-3) 0',
          display: 'block',
        }}
      >
        {entry.label}
      </Link>
    )
  }
  return (
    <div>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-3) 0', width: '100%',
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontFamily: 'var(--next-font-display), Georgia, serif',
            color: isEntryActive ? 'var(--copper)' : 'var(--text-primary)',
          }}
        >
          {entry.label}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{
            color: 'var(--text-secondary)',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 200ms ease',
          }}
        />
      </button>
      {isOpen && (
        <div style={{ paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--copper)', marginBottom: 'var(--space-3)' }}>
          {entry.columns.map((col, i) => (
            <div key={i} style={{ marginBottom: 'var(--space-3)' }}>
              <div className="mega-col-title" style={{ marginBottom: 'var(--space-2)', padding: 0 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {col.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    style={{
                      fontSize: 15,
                      color: isActive(it.href) ? 'var(--copper)' : 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: 'var(--space-2) 0',
                    }}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          {entry.cta && (
            <Link href={entry.cta.href} className="mega-cta" style={{ marginTop: 'var(--space-2)', display: 'flex' }}>
              <span className="mega-cta-label">{entry.cta.label}</span>
              {entry.cta.description && <span className="mega-cta-desc">{entry.cta.description}</span>}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

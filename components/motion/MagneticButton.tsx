'use client'

/**
 * MagneticButton — effet magnétique au curseur pour CTAs hero.
 * Spring physics via framer-motion. Désactivé si prefers-reduced-motion.
 * Supporte `href` (rendu <a>) ou `onClick` (rendu <button>).
 */

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  strength?: number
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

export function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.3,
  className,
  style,
  ariaLabel,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 200, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  function onMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) * strength
    const dy = (e.clientY - rect.top - rect.height / 2) * strength
    x.set(dx)
    y.set(dy)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    style: { ...style, x: xSpring, y: ySpring, display: 'inline-flex' },
    className,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'aria-label': ariaLabel,
  }

  if (href) {
    return (
      <motion.span {...sharedProps}>
        <Link
          href={href}
          style={{ display: 'inline-flex', textDecoration: 'none', color: 'inherit', alignItems: 'center' }}
        >
          {children}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      {...sharedProps}
    >
      {children}
    </motion.button>
  )
}

'use client'

/**
 * ScrollReveal — apparition + parallax contrôlés par la progression du scroll.
 * Usage : grand visuel, citation, héro secondaire, n'importe quel élément
 * qu'on veut voir "vivre" au scroll.
 */

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  parallax?: number        // intensité du parallax en px (0 = off)
  fade?: boolean           // fade in/out sur la progression
  className?: string
  style?: React.CSSProperties
}

export function ScrollReveal({
  children,
  parallax = 0,
  fade = true,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fade ? [0, 1, 1, 0.35] : [1, 1, 1, 1],
  )

  if (reduce) {
    return (
      <div className={className} style={style} ref={ref}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: parallax ? y : undefined, opacity: fade ? opacity : undefined }}
    >
      {children}
    </motion.div>
  )
}

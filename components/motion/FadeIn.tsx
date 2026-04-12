'use client'

/**
 * FadeIn — apparition douce avec translation verticale + blur.
 * Triggerisé au viewport (IntersectionObserver via framer-motion).
 * Respecte prefers-reduced-motion automatiquement.
 */

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = {
  children: ReactNode
  delay?: number        // en secondes
  duration?: number     // en secondes
  y?: number            // offset vertical initial
  blur?: number         // px de blur initial
  once?: boolean
  as?: 'div' | 'section' | 'article' | 'header' | 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'li'
  className?: string
  style?: React.CSSProperties
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 20,
  blur = 6,
  once = true,
  as = 'div',
  className,
  style,
}: FadeInProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  if (reduce) {
    const Tag = as as keyof React.JSX.IntrinsicElements
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-80px' }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

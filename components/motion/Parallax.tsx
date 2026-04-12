'use client'

/**
 * Parallax — translation verticale proportionnelle au scroll.
 * Pour décor léger (watermark, ornements, badges).
 */

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type ParallaxProps = {
  children: ReactNode
  speed?: number           // -1 à 1. Négatif = descend plus vite
  className?: string
  style?: React.CSSProperties
}

export function Parallax({ children, speed = 0.3, className, style }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`])

  if (reduce) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  )
}

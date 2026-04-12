'use client'

/**
 * RotatingWordsMotion — version framer-motion du mot rotatif.
 * AnimatePresence + mode="wait" pour une transition verticale.
 * Remplace l'ancien RotatingWords (machine d'état manuelle).
 */

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  words: string[]
  interval?: number
  className?: string
  style?: React.CSSProperties
}

export function RotatingWordsMotion({ words, interval = 2800, className, style }: Props) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setInterval(() => setI((c) => (c + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        verticalAlign: 'bottom',
        ...style,
      }}
      aria-live="polite"
      aria-label={words[i]}
    >
      {/* invisible spacer — réserve la largeur du mot le plus long */}
      <span aria-hidden="true" style={{ visibility: 'hidden', display: 'inline-block' }}>
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'inline-flex',
          alignItems: 'baseline',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[i]}
            initial={reduce ? { opacity: 0 } : { y: '100%', opacity: 0, filter: 'blur(6px)' }}
            animate={reduce ? { opacity: 1 } : { y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { y: '-100%', opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}

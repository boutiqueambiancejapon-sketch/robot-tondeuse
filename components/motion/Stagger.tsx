'use client'

/**
 * Stagger / StaggerItem — animation en cascade sur listes/grilles.
 * Combine <Stagger> (parent orchestrateur) avec <StaggerItem> (enfant).
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type StaggerProps = {
  children: ReactNode
  delay?: number
  staggerDelay?: number
  once?: boolean
  as?: 'div' | 'ul' | 'ol' | 'section'
  className?: string
  style?: React.CSSProperties
}

export function Stagger({
  children,
  delay = 0,
  staggerDelay = 0.08,
  once = true,
  as = 'div',
  className,
  style,
}: StaggerProps) {
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

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}

type StaggerItemProps = {
  children: ReactNode
  y?: number
  as?: 'div' | 'li' | 'article' | 'span'
  className?: string
  style?: React.CSSProperties
}

export function StaggerItem({
  children,
  y = 24,
  as = 'div',
  className,
  style,
}: StaggerItemProps) {
  const MotionTag = motion[as]

  const item: Variants = {
    hidden: { opacity: 0, y, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <MotionTag className={className} style={style} variants={item}>
      {children}
    </MotionTag>
  )
}

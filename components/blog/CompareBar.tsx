/**
 * CompareBar — deux produits comparés sur un critère, notes sur 10 fournies par l'article.
 * Server Component, compatible avec compileMDX.
 *
 * Usage MDX :
 *   <CompareBar label="Pente" left="88" right="95" leftName="Robot A" rightName="Robot B" />
 *   Valeurs de 0 à 100 ramenées sur 10 ; les valeurs de 0 à 10 sont acceptées.
 *   Les attributs sont des chaînes (compileMDX ne passe pas d'expressions).
 */

import type { ReactNode } from 'react'

type CompareBarProps = {
  label: string
  left: number | string
  right: number | string
  leftName?: string
  rightName?: string
}

function toTen(v: unknown): number {
  const n = Number(v)
  if (isNaN(n) || n === 0) return 0
  return n > 10 ? Math.round(n) / 10 : n
}

const fr = (n: number) => n.toFixed(1).replace('.', ',')

function Row({ name, score, wins }: { name: string; score: number; wins: boolean }) {
  return (
    <div className={wins ? 'cmp-r on' : 'cmp-r'}>
      <span className="cmp-n">{name}</span>
      <div className="bar">
        <i style={{ width: `${Math.min(score * 10, 100)}%` }} />
      </div>
      <b className="num">
        {fr(score)}
        <small> /10</small>
      </b>
    </div>
  )
}

export function CompareBar({ label, left, right, leftName = 'A', rightName = 'B' }: CompareBarProps) {
  const l = toTen(left)
  const r = toTen(right)
  return (
    <div className="cmp">
      <p className="cmp-l">{label}</p>
      <Row name={leftName} score={l} wins={l > r} />
      <Row name={rightName} score={r} wins={r > l} />
    </div>
  )
}

/** CompareBarGroup — plusieurs critères, puis la moyenne de chaque produit. */
export function CompareBarGroup({ children, leftName, rightName }: {
  children: ReactNode; leftName?: string; rightName?: string
}) {
  const items: { left: number; right: number; lN: string; rN: string }[] = []
  const arr = Array.isArray(children) ? children : [children]

  arr.forEach((child) => {
    if (child && typeof child === 'object' && 'props' in child) {
      const p = (child as { props: CompareBarProps }).props
      if (p.left !== undefined && p.right !== undefined) {
        items.push({ left: toTen(p.left), right: toTen(p.right), lN: p.leftName ?? 'A', rN: p.rightName ?? 'B' })
      }
    }
  })

  const avg = (key: 'left' | 'right') =>
    items.length ? +(items.reduce((s, i) => s + i[key], 0) / items.length).toFixed(1) : 0
  const lAvg = avg('left')
  const rAvg = avg('right')

  return (
    <div className="cmp-g">
      {children}
      {items.length > 1 ? (
        <div className="cmp">
          <p className="cmp-l">Moyenne</p>
          <Row name={leftName ?? items[0].lN} score={lAvg} wins={lAvg > rAvg} />
          <Row name={rightName ?? items[0].rN} score={rAvg} wins={rAvg > lAvg} />
        </div>
      ) : null}
    </div>
  )
}

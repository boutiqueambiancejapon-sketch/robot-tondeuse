/**
 * StatCard — un chiffre de l'article et sa légende, à taille de lecture.
 * Usage MDX : <StatCard value="45 %" label="Pente annoncée" />
 * Plusieurs chiffres côte à côte : les placer dans <StatRow>.
 * Server Component.
 */
import type { ReactNode } from 'react'

type StatCardProps = {
  value: string
  label: string
  /** Ancien réglage de couleur, sans effet depuis le design V2. */
  accent?: string
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <p className="stat">
      <span className="stat-l">{label}</span>
      <b className="stat-v num">{value}</b>
    </p>
  )
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="stats">{children}</div>
}

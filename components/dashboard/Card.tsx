import type { ReactNode } from 'react'

interface Props {
  title: string
  note?: string
  children: ReactNode
}

export function Card({ title, note, children }: Props) {
  return (
    <section className="card">
      <div className="card-hd">
        <h2>{title}</h2>
        {note && <span className="tiny muted">{note}</span>}
      </div>
      {children}
    </section>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>
}

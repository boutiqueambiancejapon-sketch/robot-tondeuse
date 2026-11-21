import type { ReactNode } from 'react'
import { Mascotte } from '@/components/v2/Mascotte'

/** Centered card with the mascot, for the login screens. */
export function LoginFrame({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="login" id="main-content">
      <section className="card">
        <div className="ttl">
          <h1>{title}</h1>
          <Mascotte pose="jardinier" size={76} className="masc" priority />
          <p className="muted small">{intro}</p>
        </div>
        {children}
      </section>
    </main>
  )
}

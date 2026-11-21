'use client'

import { useState } from 'react'
import { callLogin, errorText } from '@/lib/dashboard/login-client'
import { Card } from '../Card'

// Open sessions: close one by one, log out here or everywhere. Adapted from Toutou.

interface Props {
  sessions: { id: string; label: string; meta: string; current: boolean }[]
}

export function SecuritySessions({ sessions }: Props) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function run(action: string, body: Record<string, unknown> = {}) {
    setBusy(true)
    setError('')
    const reply = await callLogin(action, body)
    if (reply.ok) {
      if (reply.next) window.location.assign(reply.next)
      else window.location.reload()
      return
    }
    setError(errorText(reply.error))
    setBusy(false)
  }

  return (
    <Card title="Sessions ouvertes" note="12 h au plus">
      <ul className="rows">
        {sessions.map((s) => (
          <li key={s.id} className="row-top">
            <span>
              <strong>{s.label}</strong>
              <span className="row-sub">{s.meta}</span>
            </span>
            {s.current ? (
              <span className="tag">cet appareil</span>
            ) : (
              <button type="button" className="pill-btn" disabled={busy} onClick={() => run('session-fermer', { id: s.id })}>
                Fermer
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="btn-row">
        <button type="button" className="pill-btn" disabled={busy} onClick={() => run('deconnexion')}>
          Se déconnecter
        </button>
        <button type="button" className="pill-btn" disabled={busy} onClick={() => run('deconnexion-partout')}>
          Déconnecter partout
        </button>
      </div>
      {error && <p className="alert" role="alert">{error}</p>}
    </Card>
  )
}

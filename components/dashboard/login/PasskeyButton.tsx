'use client'

import { useState } from 'react'
import { errorText, PASSKEY_CANCELLED, signInWithPasskey, usePreparedPasskey } from '@/lib/dashboard/login-client'

interface Props {
  next: string
  /** direct: login page, no session yet. Otherwise: second factor after the password. */
  direct: boolean
}

export function PasskeyButton({ next, direct }: Props) {
  const passkey = usePreparedPasskey(direct ? 'cle-directe-options' : 'cle-options')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onClick() {
    setBusy(true)
    setError('')
    const reply = await signInWithPasskey(await passkey.take(), next, direct ? 'cle-directe' : 'cle-verifier')
    if (reply?.ok && reply.next) return window.location.assign(reply.next)
    passkey.refresh()
    setBusy(false)
    setError(reply ? errorText(reply.error) : PASSKEY_CANCELLED)
    if (reply?.next) window.location.assign(reply.next)
  }

  return (
    <div className="stack">
      <button type="button" className="btn btn--yellow" onClick={onClick} disabled={busy}>
        {busy ? 'Un instant…' : 'Entrer avec Face ID'}
      </button>
      {error && <p className="alert" role="alert">{error}</p>}
    </div>
  )
}

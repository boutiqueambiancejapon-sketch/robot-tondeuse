'use client'

import { useState } from 'react'
import { addPasskey, callLogin, errorText, PASSKEY_CANCELLED, usePreparedPasskey, type LoginReply } from '@/lib/dashboard/login-client'
import { TotpSetup } from './TotpSetup'

interface Props {
  /** enroll: first factor, then the dashboard opens. security: add another one. */
  mode: 'enroll' | 'security'
  hasTotp: boolean
}

/** Face ID first (one tap on the iPhone); the 6-digit code as an alternative. */
export function EnrollFlow({ mode, hasTotp }: Props) {
  const passkey = usePreparedPasskey('enrol-cle-options')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [totp, setTotp] = useState<LoginReply | null>(null)

  function finish(reply: LoginReply) {
    if (mode === 'enroll') return window.location.assign(reply.next ?? '/dashboard')
    setDone(true)
    window.location.reload()
  }

  async function onPasskey() {
    setBusy(true)
    setError('')
    const reply = await addPasskey(await passkey.take())
    passkey.refresh()
    setBusy(false)
    if (reply?.ok) return finish(reply)
    setError(reply ? errorText(reply.error) : PASSKEY_CANCELLED)
  }

  async function onTotp() {
    setBusy(true)
    setError('')
    const reply = await callLogin('enrol-code-debut')
    setBusy(false)
    if (reply.ok) return setTotp(reply)
    setError(errorText(reply.error))
  }

  if (done) return <p className="okline">C’est enregistré.</p>
  if (totp) return <TotpSetup setup={totp} onDone={finish} />
  return (
    <div className="stack">
      <button type="button" className="btn btn--yellow" onClick={onPasskey} disabled={busy}>
        {mode === 'enroll' ? 'Activer Face ID' : 'Ajouter Face ID sur cet appareil'}
      </button>
      {!hasTotp && (
        <>
          <p className="or">ou</p>
          <button type="button" className="btn" onClick={onTotp} disabled={busy}>
            Utiliser un code à 6 chiffres
          </button>
        </>
      )}
      {error && <p className="alert" role="alert">{error}</p>}
    </div>
  )
}

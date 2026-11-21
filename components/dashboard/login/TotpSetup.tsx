'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { callLogin, errorText, type LoginReply } from '@/lib/dashboard/login-client'
import { LOGIN_PATH } from '@/lib/dashboard/policy'

interface Props {
  setup: LoginReply
  onDone: (reply: LoginReply) => void
}

/** Add the code to the iPhone (link), or scan the QR from a computer, then type a first code. */
export function TotpSetup({ setup, onDone }: Props) {
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const reply = await callLogin('enrol-code-confirmer', { code })
    setBusy(false)
    if (reply.ok) return onDone(reply)
    setCode('')
    setError(errorText(reply.error))
    if (reply.error === 'session') window.location.assign(LOGIN_PATH)
  }

  return (
    <form className="stack" onSubmit={onSubmit}>
      <p className="small">Sur cet iPhone : touche le bouton, l’app Mots de passe enregistre le code. Depuis un ordinateur : scanne le QR avec l’iPhone.</p>
      {setup.uri && (
        <a className="btn" href={setup.uri}>
          Ajouter à Mots de passe
        </a>
      )}
      {setup.qr && <Image src={setup.qr} alt="QR code du tableau de bord" width={180} height={180} className="qr" unoptimized />}
      {setup.secret && <p className="secret">{setup.secret.replace(/(.{4})/g, '$1 ').trim()}</p>}
      <label className="field">
        Premier code à 6 chiffres
        <input className="input" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={code} onChange={(e) => setCode(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn--ink" disabled={busy || !code}>
        {busy ? 'Un instant…' : 'Valider le code'}
      </button>
      {error && <p className="alert" role="alert">{error}</p>}
    </form>
  )
}

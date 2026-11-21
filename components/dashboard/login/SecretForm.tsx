'use client'

import { useState, type FormEvent } from 'react'
import { callLogin, errorText } from '@/lib/dashboard/login-client'

interface Props {
  /** 'mot-de-passe' (password) or 'code' (6-digit code, second factor). */
  action: 'mot-de-passe' | 'code'
  next: string
}

/** One field, one button: the password, or the 6-digit code. */
export function SecretForm({ action, next }: Props) {
  const [value, setValue] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const isCode = action === 'code'

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    const reply = await callLogin(action, isCode ? { code: value, next } : { password: value, next })
    if (reply.ok && reply.next) return window.location.assign(reply.next)
    setBusy(false)
    setValue('')
    setError(errorText(reply.error))
    if (reply.next) window.location.assign(reply.next)
  }

  return (
    <form className="stack" onSubmit={onSubmit}>
      <label className="field">
        {isCode ? 'Code à 6 chiffres' : 'Mot de passe'}
        <input
          className="input"
          type={isCode ? 'text' : 'password'}
          inputMode={isCode ? 'numeric' : undefined}
          autoComplete={isCode ? 'one-time-code' : 'current-password'}
          maxLength={isCode ? 7 : 200}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="btn btn--ink" disabled={busy || !value}>
        {busy ? 'Un instant…' : 'Continuer'}
      </button>
      {error && <p className="alert" role="alert">{error}</p>}
    </form>
  )
}

'use client'

/**
 * Formulaire « La lettre du jardin » (lot 2, G3). Case de consentement non cochée et obligatoire,
 * lien vers /confidentialite, champ piège « website » caché. Affiché seulement si Brevo est réglé
 * (le parent vérifie isNewsletterConfigured côté serveur).
 */
import { useId, useState, type FormEvent } from 'react'
import Link from 'next/link'

type Statut = 'repos' | 'envoi' | 'ok' | 'invalide' | 'consentement' | 'erreur'

const MESSAGES: Partial<Record<Statut, string>> = {
  invalide: 'Cette adresse e-mail ne semble pas valide.',
  consentement: 'Cochez la case pour confirmer votre inscription.',
  erreur: 'L’inscription n’est pas passée. Réessayez dans quelques minutes.',
}

const input = { minHeight: 48, padding: '0 14px', fontSize: 16, border: '1px solid var(--border-strong)', borderRadius: 12, background: 'var(--ivory)', color: 'var(--text-primary)' }

export function InscriptionLettre({ source }: { source: string }) {
  const id = useId()
  const [email, setEmail] = useState('')
  const [accord, setAccord] = useState(false)
  const [website, setWebsite] = useState('')
  const [statut, setStatut] = useState<Statut>('repos')

  async function envoyer(e: FormEvent) {
    e.preventDefault()
    if (!accord) return setStatut('consentement')
    setStatut('envoi')
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, consentement: true, source, website }),
        credentials: 'omit',
      })
      const data = (await res.json().catch(() => ({}))) as { statut?: string }
      if (res.ok) return setStatut('ok')
      setStatut(data.statut === 'invalide' ? 'invalide' : 'erreur')
    } catch {
      setStatut('erreur')
    }
  }

  if (statut === 'ok') {
    return (
      <p role="status" style={{ color: 'var(--moss)', fontWeight: 500, lineHeight: 1.6 }}>
        C’est noté. Vous recevrez la lettre du jardin dès le premier envoi. Un lien de désinscription figure en bas de chaque e-mail.
      </p>
    )
  }

  return (
    <form onSubmit={envoyer} noValidate style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <label htmlFor={`${id}-email`} style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Votre adresse e-mail</label>
      <input id={`${id}-email`} type="email" required autoComplete="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(e) => setWebsite(e.target.value)} style={{ display: 'none' }} />
      <label htmlFor={`${id}-accord`} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' }}>
        <input id={`${id}-accord`} type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} style={{ width: 20, height: 20, marginTop: 1, flex: '0 0 20px', accentColor: 'var(--moss)' }} />
        <span>
          J’accepte de recevoir la lettre du jardin de Quel Robot Tondeuse, une fois par mois au plus. Je peux me désinscrire à tout moment. Détails dans la{' '}
          <Link href="/confidentialite" style={{ color: 'var(--moss)' }}>politique de confidentialité</Link>.
        </span>
      </label>
      <button type="submit" disabled={statut === 'envoi'} style={{ minHeight: 48, padding: '0 22px', background: 'var(--copper)', color: 'var(--ivory)', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 500, cursor: 'pointer', justifySelf: 'start', opacity: statut === 'envoi' ? 0.6 : 1 }}>
        {statut === 'envoi' ? 'Envoi…' : 'M’inscrire'}
      </button>
      {MESSAGES[statut] && (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--error)' }}>{MESSAGES[statut]}</p>
      )}
    </form>
  )
}

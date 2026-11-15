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

export function InscriptionLettre({ source, bouton = 'M’inscrire à la lettre' }: { source: string; bouton?: string }) {
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
      <p role="status" className="lettre-ok">
        C’est noté. Vous recevrez la lettre du jardin dès le premier envoi. Un lien de désinscription figure en bas de chaque e-mail.
      </p>
    )
  }

  return (
    <form onSubmit={envoyer} noValidate className="stack lettre">
      <div className="field">
        <label htmlFor={`${id}-email`}>Votre adresse e-mail</label>
        <input id={`${id}-email`} className="input" type="email" required autoComplete="email" placeholder="vous@exemple.fr" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden value={website} onChange={(e) => setWebsite(e.target.value)} />
      <label htmlFor={`${id}-accord`} className="check">
        <input id={`${id}-accord`} type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} />
        <span>
          J’accepte de recevoir la lettre du jardin de Quel Robot Tondeuse, une fois par mois au plus. Je peux me désinscrire à tout moment. Détails dans la{' '}
          <Link href="/confidentialite" className="lnk">politique de confidentialité</Link>.
        </span>
      </label>
      <button type="submit" disabled={statut === 'envoi'} className="btn btn--full btn--ink">
        {statut === 'envoi' ? 'Envoi…' : bouton}
      </button>
      {MESSAGES[statut] && (
        <p role="alert" className="lettre-err">{MESSAGES[statut]}</p>
      )}
    </form>
  )
}

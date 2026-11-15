/**
 * AffiliateButton — bouton marchand (.btn). Le lien passe par affiliateHref() (/go/... ou étiquette).
 * Variantes : primary (cuivre) | secondary et ghost (contour).
 * Server Component.
 */

import { ExternalLink } from 'lucide-react'
import { affiliateHref } from '@/lib/utils/affiliate'

type AffiliateButtonProps = {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Ancien réglage de taille, sans effet depuis le design V2. */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AffiliateButton({ href, label, variant = 'primary', className }: AffiliateButtonProps) {
  const classes = ['btn', variant === 'primary' ? '' : 'btn--ivory', className].filter(Boolean).join(' ')
  return (
    <a href={affiliateHref(href)} rel="sponsored nofollow noopener" target="_blank" className={classes}>
      {label}
      <ExternalLink size={14} aria-hidden="true" strokeWidth={2.5} />
    </a>
  )
}

/**
 * AffiliateLink — tout lien Amazon passe par affiliateHref() (/go/... ou étiquette).
 * rel="sponsored nofollow noopener" obligatoire.
 * Server Component.
 */

import { affiliateHref } from '@/lib/utils/affiliate'

type AffiliateLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function AffiliateLink({ href, children, className, style }: AffiliateLinkProps) {
  return (
    <a
      href={affiliateHref(href)}
      rel="sponsored nofollow noopener"
      target="_blank"
      className={className}
      style={style}
    >
      {children}
    </a>
  )
}

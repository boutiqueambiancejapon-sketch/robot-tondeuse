import { niche } from '@/niche.config'

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? niche.affiliateTag
const AMAZON_DOMAINS = /amazon\.(fr|com|co\.uk|de|es|it)/i
const AMAZON_FR = /(^|\.)amazon\.fr$/i
const ASIN = /^[A-Z0-9]{10}$/
const DP_PATH = /\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?]|$)/i

export function addAffiliateTag(href: string): string {
  if (!AMAZON_TAG) return href
  try {
    const url = new URL(href)
    if (AMAZON_DOMAINS.test(url.hostname)) {
      url.searchParams.set('tag', AMAZON_TAG)
      url.searchParams.delete('ref')
      return url.toString()
    }
  } catch {
    // Invalid URL — return as-is
  }
  return href
}

export function isAsin(value: string): boolean {
  return ASIN.test(value)
}

/** Adresse finale (avec l'étiquette affiliée) vers laquelle /go/<asin>/amazon redirige. */
export function amazonProductUrl(asin: string): string {
  return addAffiliateTag(`https://www.amazon.fr/dp/${asin.toUpperCase()}`)
}

/**
 * Lien à mettre dans la page. Une fiche Amazon.fr (/dp/<ASIN>) passe par
 * /go/<ASIN>/amazon : le clic est compté dans les journaux du serveur, sans cookie.
 * Les autres liens Amazon (recherche, autres pays) gardent l'étiquette en direct.
 */
export function affiliateHref(href: string): string {
  try {
    const url = new URL(href)
    if (AMAZON_FR.test(url.hostname)) {
      const asin = url.pathname.match(DP_PATH)?.[1]?.toUpperCase()
      if (asin && isAsin(asin)) return `/go/${asin}/amazon`
    }
  } catch {
    // Pas une URL absolue : on laisse addAffiliateTag décider
  }
  return addAffiliateTag(href)
}

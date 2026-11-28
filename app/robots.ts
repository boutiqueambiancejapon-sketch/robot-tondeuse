import type { MetadataRoute } from 'next'
import { niche } from '@/niche.config'
import { siteActif } from '@/niches'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`

export default function robots(): MetadataRoute.Robots {
  // Site modèle ou de recette : jamais exploré.
  if (!siteActif.indexable) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/go/', '/dashboard'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

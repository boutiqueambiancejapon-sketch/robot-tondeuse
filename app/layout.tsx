import type { Metadata } from 'next'
import { fontDisplay, fontPrimary, fontMono } from '@site-actif/fonts'
import { niche } from '@/niche.config'
import { siteActif } from '@/niches'
import './globals.css'
// Thème du site actif (variables seulement), après les valeurs de base : niches/<site>/theme.css.
import '@site-actif/theme.css'

// Polices du site actif : niches/<site>/fonts.ts (choisi par next.config.ts).

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
  ),
  title: {
    template: `%s | ${niche.siteName}`,
    default: `${niche.tagline} | ${niche.siteName}`,
  },
  description: niche.tagline,
  twitter: { card: 'summary_large_image' },
  robots: {
    index: siteActif.indexable,
    follow: siteActif.indexable,
    googleBot: { index: siteActif.indexable, follow: siteActif.indexable },
  },
  alternates: {
    canonical: '/',
    ...(niche.locales.length > 1 ? {
      languages: Object.fromEntries(
        niche.locales.map((locale) => [locale, `https://${niche.domain}/${locale === niche.defaultLocale ? '' : locale}`])
      ),
    } : {}),
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${fontDisplay.variable} ${fontPrimary.variable} ${fontMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  )
}

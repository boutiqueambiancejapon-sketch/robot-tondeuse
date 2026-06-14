import type { Metadata } from 'next'
import { Schibsted_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { niche } from '@/niche.config'
import './globals.css'

// ── Fonts — Atelier Vert : Schibsted Grotesk (display/headings) + Hanken Grotesk (body) + JetBrains Mono (specs/prix) ──

const fontDisplay = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontPrimary = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--next-font-mono',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://${niche.domain}`
  ),
  title: {
    template: `%s | ${niche.siteName}`,
    default: `${niche.tagline} | ${niche.siteName}`,
  },
  description: niche.tagline,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        <Analytics />
      </body>
    </html>
  )
}

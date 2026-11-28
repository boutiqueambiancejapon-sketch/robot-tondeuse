/**
 * Polices du site modèle (2 familles au plus). Ce sont celles de base du moteur : un nouveau site les change ici
 * (next/font/google, fichiers servis par le site, jamais fonts.googleapis.com). Les 3 variables sont obligatoires.
 */
import { Schibsted_Grotesk, Hanken_Grotesk } from 'next/font/google'

export const fontDisplay = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--next-font-display',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

export const fontPrimary = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--next-font-primary',
  adjustFontFallback: true,
  preload: true,
  display: 'swap',
})

export const fontMono = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--next-font-mono',
  adjustFontFallback: true,
  preload: false,
  display: 'swap',
})

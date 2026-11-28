/**
 * Polices de Quel Robot Tondeuse : Schibsted Grotesk (titres) + Hanken Grotesk (texte), reprises de app/layout.tsx.
 * Lu par le layout sous le nom « @site-actif/fonts » (next.config.ts). 2 familles au plus.
 */
import { Schibsted_Grotesk, Hanken_Grotesk } from 'next/font/google'

export const fontDisplay = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  style: ['normal', 'italic'],
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

// Design V2 (15/11/2026) : plus de police à chasse fixe. Les anciens styles qui la demandent reçoivent la police de texte.
export const fontMono = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--next-font-mono',
  adjustFontFallback: true,
  preload: false,
  display: 'swap',
})

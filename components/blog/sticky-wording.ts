/**
 * Liens marchands écrits dans l'en-tête d'un article (`stickyCta`) : texte affiché et adresse.
 * Fonctions pures, partagées par la ligne d'achat du haut d'article et la barre d'achat.
 */
import { affiliateHref } from '@/lib/utils/affiliate'

export type StickyCTAItem = {
  label: string
  url: string
}

const ENTITIES: Record<string, string> = {
  laquo: '«', raquo: '»', mdash: '—', ndash: '–', hellip: '…', nbsp: ' ', euro: '€', amp: '&',
  ccedil: 'ç', Ccedil: 'Ç', ocirc: 'ô', Ocirc: 'Ô', ecirc: 'ê', Ecirc: 'Ê', acirc: 'â', icirc: 'î',
  ucirc: 'û', eacute: 'é', egrave: 'è', agrave: 'à', ugrave: 'ù',
}

/** Décode les entités HTML écrites dans l'en-tête des articles (&laquo;, &eacute;…). */
export function decodeHtmlEntities(input: string): string {
  return input.replace(/&([a-zA-Z]+);/g, (match, name: string) => ENTITIES[name] ?? match)
}

/** Texte de gauche et libellé du bouton, à partir du libellé écrit dans l'article. */
export function wording(label: string, message?: string): { title: string; button: string } {
  const clean = decodeHtmlEntities(label).trim()
  if (/^voir sur /i.test(clean)) {
    // L'accroche de l'article sert de texte, sauf si elle répète le bouton (« Voir le prix du jour »).
    const hook = message ? decodeHtmlEntities(message).trim() : ''
    return { title: hook && !/^voir /i.test(hook) ? hook : 'Le prix chez le marchand', button: clean }
  }
  // « Voir le Mammotion Yuka Mini 2 » ou « Husqvarna 310 Mark II (1 399 €) » : on garde le nom du robot.
  const title = clean.replace(/^voir (le |la |les |l[’'])?/i, '').replace(/\s*\([^)]*\)\s*$/, '')
  return { title: title || clean, button: 'Voir l’offre' }
}

/** Adresse et attribut rel du lien : un lien Amazon passe par affiliateHref() (/go/... ou étiquette). */
export function merchantLink(url: string): { href: string; rel: string } {
  const isAmazon = url.includes('amazon.fr') || url.includes('amzn.to')
  return isAmazon ? { href: affiliateHref(url), rel: 'nofollow sponsored noopener' } : { href: url, rel: 'noopener' }
}

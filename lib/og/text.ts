/**
 * lib/og/text.ts — mise en forme des textes des images de partage.
 * Les polices embarquées ne couvrent que le latin : tout autre glyphe (emoji, ✦…)
 * pousserait next/og à télécharger une police distante, ce qui casse l'image.
 */

/** Garde le latin, la ponctuation courante et €, ², ³ ; retire le reste. */
export function ogSafe(text: string): string {
  return text
    .replace(/[‘’]/g, '’')
    .replace(/[^\u0020-\u007E\u00A0-\u017F\u2013\u2014\u2019\u201C\u201D\u201E\u2022\u2026\u20AC]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    // Espaces insécables : milliers (1 200), unités (500 €, 300 m²), ponctuation haute française ( ? : ! ;).
    .replace(/(\d) (?=\d{3}\b)/g, '$1\u00A0')
    .replace(/(\d) (?=€|m²|m2\b|min\b|h\b|km\b)/g, '$1\u00A0')
    .replace(/ (?=[?:!;»])/g, '\u00A0')
    .replace(/« /g, '«\u00A0')
}

/** Titre complet sans la parenthèse finale (« (2026) », « (guide 2026) »…). */
export function ogTitle(title: string): string {
  return ogSafe(title).replace(/\s*\([^()]*\)\s*$/, '')
}

/**
 * Titre court pour la vignette : la question jusqu'à « ? », sinon les premiers segments
 * séparés par « : », « — » ou « | » tant qu'ils restent courts (≤ `max` caractères).
 */
export function ogHeadline(title: string, min = 14, max = 40): string {
  const clean = ogTitle(title)
  const q = clean.match(/^(.+?\s?\?)\s+\S/)
  if (q && q[1].length >= min && q[1].length <= 70) return q[1]
  const parts = clean.split(/(?=\s?:\s|\s[—–]\s|\s\|\s)/)
  let head = parts[0]
  for (const part of parts.slice(1)) {
    if (head.length >= min && head.length + part.length > max) break
    head += part
  }
  return head.replace(/\s*[:—–|,]\s*$/, '').trim()
}

/** Chasse approximative d'un caractère, en fraction de la taille de police (graisse forte). */
function charWidth(c: string): number {
  if (c === ' ') return 0.25
  if (/[iljtfrI.,:;'’!|]/.test(c)) return 0.32
  if (/[mwMW]/.test(c)) return 0.86
  if (/[A-Z]/.test(c)) return 0.66
  if (/[0-9]/.test(c)) return 0.58
  if (/[€²?]/.test(c)) return 0.6
  return 0.54
}

function textWidth(text: string, size: number, scale: number, tracking: number): number {
  let w = 0
  for (const c of text) w += charWidth(c) * size * scale + tracking
  return w
}

/** Nombre de lignes après retour à la ligne mot à mot. */
function lineCount(text: string, width: number, size: number, scale: number, tracking: number): number {
  let lines = 1
  let line = ''
  // Coupures possibles après une espace ou un trait d'union, comme dans le moteur de rendu.
  for (const word of text.split(/(?<=-)| +/)) {
    const next = line ? (line.endsWith('-') ? `${line}${word}` : `${line} ${word}`) : word
    if (line && textWidth(next, size, scale, tracking) > width) {
      lines += 1
      line = word
    } else line = next
  }
  return lines
}

/**
 * Taille de police et texte pour tenir sur `maxLines` lignes dans `width` px (estimation prudente).
 * Sous la taille mini, le titre est coupé au dernier mot entier, suivi de « … ».
 */
export function ogFitTitle(
  text: string,
  width: number,
  max: number,
  min: number,
  scale = 1,
  tracking = -1.5,
  maxLines = 2,
): { text: string; size: number } {
  const room = width * 0.93
  for (let size = max; size >= min; size -= 2) {
    if (lineCount(text, room, size, scale, tracking) <= maxLines) return { text, size }
  }
  const words = text.split(' ')
  while (words.length > 1 && lineCount(`${words.join(' ')}…`, room, min, scale, tracking) > maxLines) words.pop()
  return { text: `${words.join(' ').replace(/[\s,;:—–-]+$/, '')}…`, size: min }
}

/** Nombre au format français (espace fine insécable des milliers). */
export function frNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
}

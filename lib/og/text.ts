/**
 * lib/og/text.ts — mise en forme des textes des images de partage.
 * Les polices embarquées ne couvrent que le latin : tout autre glyphe (emoji, ✦…)
 * pousserait next/og à télécharger une police distante, ce qui casse l'image.
 */

/** Garde le latin, la ponctuation courante et €, ², ³ ; retire le reste. */
export function ogSafe(text: string): string {
  return text
    .replace(/[‘’]/g, '’')
    .replace(/[^\u0020-\u007E\u00A0-\u017F\u2013\u2014\u2019\u201C\u201D\u201E\u2026\u20AC]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Titre court pour la vignette : on garde ce qui précède « : », « — » ou « | »,
 * ou la question jusqu'à « ? », quand c'est assez parlant ; sinon le titre entier.
 */
export function ogHeadline(title: string, min = 14): string {
  const clean = ogSafe(title)
  const q = clean.match(/^(.+?\s?\?)\s+\S/)
  if (q && q[1].length >= min) return q[1]
  const m = clean.match(/^(.+?)\s*(?:\s:\s|\s[—–]\s|\s\|\s|\s\(\d{4}\))/)
  const head = m && m[1].length >= min ? m[1] : clean
  return head.replace(/\s*[:—–,]$/, '').trim()
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
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word
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
  const room = width * 0.95
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

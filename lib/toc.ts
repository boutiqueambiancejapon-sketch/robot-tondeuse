/**
 * lib/toc.ts — Extract H2 headings from raw MDX content for table of contents.
 * Server-side only.
 */

export type TocItem = { id: string; text: string }

/** Generates a URL-safe slug from a heading string. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Extracts H2 headings from raw MDX content. */
export function extractToc(mdxContent: string): TocItem[] {
  const lines = mdxContent.split('\n')
  const items: TocItem[] = []

  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      const text = match[1].trim()
      items.push({ id: slugify(text), text })
    }
  }

  return items
}

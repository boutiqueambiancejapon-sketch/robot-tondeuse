/**
 * Composants disponibles dans le corps MDX d'un article, et titres H2 avec ancre (sommaire).
 * Partagé par /[article] et /blog/[categorie]/[slug].
 */
import type { ReactNode } from 'react'
import { Tip } from './Tip'
import { Warning } from './Warning'
import { Verdict } from './Verdict'
import { ProConTable } from './ProConTable'
import { PullQuote } from './PullQuote'
import { StatCard, StatRow } from './StatCard'
import { CompareBar, CompareBarGroup } from './CompareBar'
import { ProductCTA } from './ProductCTA'
import { ArticleImage } from './ArticleImage'
import { ProductCarousel } from './ProductCarousel'

/** Même découpage que lib/toc.ts : l'ancre du H2 correspond au lien du sommaire. */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) return extractText((node as { props: { children?: ReactNode } }).props.children)
  return ''
}

export const mdxComponents = {
  Tip, Warning, Verdict, ProConTable, PullQuote, StatCard, StatRow, CompareBar, CompareBarGroup, ProductCTA, ArticleImage, ProductCarousel,
  h2: ({ children }: { children: ReactNode }) => <h2 id={slugify(extractText(children))}>{children}</h2>,
  table: ({ children }: { children: ReactNode }) => (
    <div className="tbl-wrap">
      <div className="tbl-scroll">
        <table>{children}</table>
      </div>
    </div>
  ),
}

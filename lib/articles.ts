/**
 * lib/articles.ts — loader pour les articles standalone (ex-WordPress).
 * Fichiers MDX dans content/articles/[slug].mdx.
 * URLs servies à la racine : /compatibilite-apple-watch, etc.
 * Server-side uniquement (fs, path).
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getPageType, type PageType } from '@/lib/utils/page-type'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export type StickyCTAData = { label: string; url: string }

export type StandaloneArticleMeta = {
  slug: string
  title: string
  /** Titre court affiché dans la page (H1) ; le `title` reste pour Google. */
  h1?: string
  description: string
  featureImage?: string
  publishedAt: string
  updatedAt?: string
  readingTimeMin: number
  categorie: string
  /** Type de page pour la carte des conversions (lot 1). Rien d'affiché. */
  pageType: PageType
  tags?: string[]
  aiSummary?: string[]
  faq?: { q: string; a: string }[]
  stickyCta?: StickyCTAData[]
  stickyCtaMessage?: string
  draft?: boolean
  /** Id (ou ids d'une même gamme, le principal en premier) de data/robots-tondeuses.json, posé à la main. */
  base?: string | string[]
}

function withPageType(meta: StandaloneArticleMeta): StandaloneArticleMeta {
  return { ...meta, pageType: getPageType(meta) }
}

export function getAllStandaloneArticles(): StandaloneArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8')
      const { data } = matter(raw)
      return withPageType({ slug, ...data } as StandaloneArticleMeta)
    })
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getStandaloneArticle(slug: string): { meta: StandaloneArticleMeta; content: string } | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { meta: withPageType({ slug, ...data } as StandaloneArticleMeta), content }
}

export function getAllStandaloneSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

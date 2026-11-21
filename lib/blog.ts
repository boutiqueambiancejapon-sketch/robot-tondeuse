/**
 * lib/blog.ts — utilitaires serveur pour les articles MDX.
 * Lecture de content/blog/**\/*.mdx ET content/articles/*.mdx.
 * Server-side uniquement (fs, path).
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { categoryLabels, categoryAccents } from '@/niche.config'
import { getPageType, type PageType } from '@/lib/utils/page-type'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

export const CATEGORY_LABELS: Record<string, string> = categoryLabels()
export const CATEGORY_ACCENT: Record<string, string> = categoryAccents()

/** Formatte une date ISO en français. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export type ArticleMeta = {
  slug: string
  categorie: string
  /** Type de page pour la carte des conversions (lot 1). Rien d'affiché. */
  pageType: PageType
  title: string
  /** Titre court affiché dans la page (H1) ; le `title` reste pour Google. */
  h1?: string
  description: string
  publishedAt: string
  updatedAt?: string
  readingTimeMin: number
  featureImage?: string
  aiSummary?: string[]
  tags?: string[]
  faq?: { q: string; a: string }[]
  /** True pour les articles dans content/articles/ (URLs racine). */
  standalone?: boolean
  /** Dossier d'adresse d'une rubrique (« robot-piscine ») : l'article vit sous /<dossier>/<slug>. */
  dossier?: string
  draft?: boolean
  stickyCta?: { label: string; url: string }[]
  stickyCtaMessage?: string
  authorSlug?: string
}

/** Retourne le href correct pour un article (blog ou standalone). */
export function articleHref(article: ArticleMeta): string {
  if (article.dossier) return `/${article.dossier}/${article.slug}`
  if (article.standalone) return `/${article.slug}`
  return `/blog/${article.categorie}/${article.slug}`
}

export type ArticleRaw = {
  meta: ArticleMeta
  content: string
}

export function parseMeta(data: Record<string, unknown>, slug: string, categorie: string, standalone = false): ArticleMeta {
  return {
    slug,
    categorie,
    pageType: getPageType({ slug, categorie, pageType: data.pageType }),
    title: (data.title as string) ?? '',
    h1: typeof data.h1 === 'string' ? data.h1 : undefined,
    description: (data.description as string) ?? '',
    publishedAt: (data.publishedAt as string) ?? '',
    updatedAt: data.updatedAt as string | undefined,
    readingTimeMin: (data.readingTimeMin as number) ?? 5,
    featureImage: data.featureImage as string | undefined,
    aiSummary: data.aiSummary as string[] | undefined,
    tags: data.tags as string[] | undefined,
    faq: data.faq as { q: string; a: string }[] | undefined,
    standalone,
    draft: !!data.draft,
    stickyCta: data.stickyCta as { label: string; url: string }[] | undefined,
    stickyCtaMessage: data.stickyCtaMessage as string | undefined,
    authorSlug: data.authorSlug as string | undefined,
  }
}

export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = []

  // 1. Blog articles (content/blog/[categorie]/[slug].mdx)
  if (fs.existsSync(BLOG_DIR)) {
    const categories = fs
      .readdirSync(BLOG_DIR)
      .filter((f) => fs.statSync(path.join(BLOG_DIR, f)).isDirectory())

    for (const categorie of categories) {
      const files = fs
        .readdirSync(path.join(BLOG_DIR, categorie))
        .filter((f) => f.endsWith('.mdx'))

      for (const file of files) {
        const slug = file.replace(/\.mdx$/, '')
        const raw = fs.readFileSync(path.join(BLOG_DIR, categorie, file), 'utf-8')
        const { data } = matter(raw)
        articles.push(parseMeta(data, slug, categorie, false))
      }
    }
  }

  // 2. Standalone articles (content/articles/[slug].mdx)
  if (fs.existsSync(ARTICLES_DIR)) {
    const files = fs
      .readdirSync(ARTICLES_DIR)
      .filter((f) => f.endsWith('.mdx'))

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8')
      const { data } = matter(raw)
      const categorie = (data.categorie as string) ?? 'general'
      articles.push(parseMeta(data, slug, categorie, true))
    }
  }

  return articles
    .filter((a) => !a.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

/** Retourne les catégories qui ont au moins un article, avec leur nombre. */
export function getCategories(): { slug: string; label: string; count: number }[] {
  const articles = getAllArticles()
  const map: Record<string, number> = {}
  for (const a of articles) map[a.categorie] = (map[a.categorie] ?? 0) + 1
  return Object.entries(map).map(([slug, count]) => ({
    slug, label: CATEGORY_LABELS[slug] ?? slug, count,
  }))
}

export function getArticleRaw(categorie: string, slug: string): ArticleRaw {
  const filePath = path.join(BLOG_DIR, categorie, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    meta: parseMeta(data, slug, categorie, false),
    content,
  }
}

export function articleExists(categorie: string, slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, categorie, `${slug}.mdx`))
}

/**
 * Retourne jusqu'à `limit` articles liés.
 * Priorité : même catégorie → autres catégories.
 * Exclut l'article courant.
 */
export function getRelatedArticles(
  categorie: string,
  currentSlug: string,
  limit = 3
): ArticleMeta[] {
  const all = getAllArticles()
  const sameCat = all.filter(
    (a) => a.categorie === categorie && a.slug !== currentSlug
  )
  const otherCat = all.filter(
    (a) => a.categorie !== categorie
  )
  return [...sameCat, ...otherCat].slice(0, limit)
}

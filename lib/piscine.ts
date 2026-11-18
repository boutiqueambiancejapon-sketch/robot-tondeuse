/**
 * lib/piscine.ts — articles de la rubrique « Robots de piscine ».
 * Fichiers : content/articles/robot-piscine/<adresse>.mdx → page /robot-piscine/<adresse>.
 * Ces articles ne sont pas dans getAllArticles() : ils ne se mêlent pas aux listes des robots tondeuses.
 * Server-side uniquement (fs, path).
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseMeta, type ArticleMeta, type ArticleRaw } from '@/lib/blog'
import { PISCINE_DOSSIER, bassinsForArticle, piscinePageType, type BassinKey } from '@/lib/utils/piscine'

const PISCINE_DIR = path.join(process.cwd(), 'content/articles', PISCINE_DOSSIER)

/** Une adresse d'article : minuscules, chiffres et tirets seulement (pas de chemin). */
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type PiscineArticle = ArticleMeta & { bassins: BassinKey[] }

function toMeta(data: Record<string, unknown>, slug: string): PiscineArticle {
  return {
    ...parseMeta(data, slug, PISCINE_DOSSIER, true),
    pageType: piscinePageType({ slug, pageType: data.pageType }),
    dossier: PISCINE_DOSSIER,
    bassins: bassinsForArticle({ slug, bassins: data.bassins }),
  }
}

export function getPiscineSlugs(): string[] {
  if (!fs.existsSync(PISCINE_DIR)) return []
  return fs
    .readdirSync(PISCINE_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .filter((slug) => SLUG.test(slug))
}

/** Articles publiés de la rubrique, le plus récent en premier. */
export function getPiscineArticles(): PiscineArticle[] {
  return getPiscineSlugs()
    .map((slug) => toMeta(matter(fs.readFileSync(path.join(PISCINE_DIR, `${slug}.mdx`), 'utf-8')).data, slug))
    .filter((a) => !a.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPiscineArticle(slug: string): (ArticleRaw & { meta: PiscineArticle }) | null {
  if (!SLUG.test(slug)) return null
  const filePath = path.join(PISCINE_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  const meta = toMeta(data, slug)
  return meta.draft ? null : { meta, content }
}

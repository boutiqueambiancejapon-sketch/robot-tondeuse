import 'server-only'
import { articleHref, getAllArticles } from '@/lib/blog'

/** Readable name of a page: the article's title, otherwise its path. */
export function pageTitles(): Map<string, string> {
  return new Map(getAllArticles().map((a) => [articleHref(a), a.title]))
}

import 'server-only'
import { getAllPosts } from '@/lib/blog'

/** Readable name of a page: the post's title, otherwise its path. */
export function pageTitles(): Map<string, string> {
  return new Map(getAllPosts().map((p) => [`/blog/${p.slug}`, p.title]))
}

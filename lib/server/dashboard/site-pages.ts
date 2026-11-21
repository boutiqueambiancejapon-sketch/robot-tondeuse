import 'server-only'
import sitemap from '@/app/sitemap'
import type { ArticlePath } from '@/lib/dashboard/robots'
import { pageTitles } from './titles'

/** Every indexable page (the sitemap), with the post's title when it is a post. */
export function sitePages(): ArticlePath[] {
  const titles = pageTitles()
  return sitemap().map((e) => {
    const path = new URL(e.url).pathname.replace(/\/$/, '') || '/'
    return { path, title: titles.get(path) ?? path }
  })
}

import { redirect } from 'next/navigation'
import { openSeoPage, type SeoPageProps } from '@/lib/seo-dash/server/page'
import { hrefOf } from '@/lib/seo-dash/nav'

// Old address (Robots IA), kept for bookmarks: sends to « Exploration » of the SEO dashboard.

export const dynamic = 'force-dynamic'

export default async function Moved(props: SeoPageProps) {
  const { query } = await openSeoPage(props)
  redirect(hrefOf('exploration', query))
}

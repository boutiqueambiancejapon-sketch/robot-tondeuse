/**
 * Compile le corps MDX d'un article et choisit ses deux encarts (milieu et fin).
 * Partagé par /[article] et /blog/[categorie]/[slug].
 */
import type { ReactNode } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { remarkAmazonAffiliate } from '@/lib/plugins/remarkAmazonAffiliate'
import { remarkEncartMilieu } from '@/lib/plugins/remarkEncartMilieu'
import { chooseEncarts, isMerchantUrl } from '@/lib/utils/encarts'
import type { PageType } from '@/lib/utils/page-type'
import { pieceForSlug } from '@/lib/utils/pieces'
import { Encart } from './Encart'
import { mdxComponents } from './mdx-components'
import type { StickyCTAItem } from './sticky-wording'

type Meta = { slug: string; pageType: PageType; stickyCta?: StickyCTAItem[]; stickyCtaMessage?: string; dossier?: string }

export async function compileArticle(content: string, meta: Meta): Promise<{ body: ReactNode; end: ReactNode }> {
  const merchant = meta.stickyCta?.find((item) => isMerchantUrl(item.url))
  // Un article d'une rubrique à dossier (robots de piscine) ne reçoit ni pièce de robot tondeuse ni calendrier du gazon.
  const horsPelouse = Boolean(meta.dossier)
  const piece = horsPelouse ? null : pieceForSlug(meta.slug)
  const encarts = chooseEncarts({ pageType: meta.pageType, content, hasMerchantLink: Boolean(merchant), piece, horsPelouse })
  const { content: body } = await compileMDX({
    source: content,
    options: {
      mdxOptions: { remarkPlugins: [remarkGfm, remarkAmazonAffiliate, ...(encarts.milieu ? [remarkEncartMilieu] : [])] },
    },
    components: {
      ...mdxComponents,
      EncartMilieu: () => <Encart kind={encarts.milieu} merchant={merchant} message={meta.stickyCtaMessage} piece={piece} />,
    },
  })
  return { body, end: <Encart kind={encarts.fin} /> }
}

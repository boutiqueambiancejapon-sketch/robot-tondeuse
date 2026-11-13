import { visit } from 'unist-util-visit'
import type { Node } from 'unist'
import { affiliateHref } from '@/lib/utils/affiliate'

interface LinkNode extends Node {
  type: 'link'
  url: string
  data?: { hProperties?: Record<string, string> }
}

/** Tout lien Amazon d'un article passe par affiliateHref() (/go/... ou étiquette). */
export function remarkAmazonAffiliate() {
  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode) => {
      const next = affiliateHref(node.url)
      if (next === node.url) return
      node.url = next
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, rel: 'sponsored nofollow noopener', target: '_blank' },
      }
    })
  }
}

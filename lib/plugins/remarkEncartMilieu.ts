import type { Node } from 'unist'
import { middleH2Index } from '@/lib/utils/encarts'

type Child = Node & { depth?: number; name?: string | null }
type Root = Node & { children: Child[] }

/**
 * Pose <EncartMilieu /> avant le H2 du milieu de l'article (H2 de premier niveau seulement).
 * Rendu côté serveur : pas de saut de mise en page. Le composant est fourni à la compilation.
 */
export function remarkEncartMilieu() {
  return (tree: Node) => {
    const root = tree as Root
    const h2 = root.children
      .map((node, index) => (node.type === 'heading' && node.depth === 2 ? index : -1))
      .filter((index) => index >= 0)
    const rank = middleH2Index(h2.length)
    if (rank < 0) return
    root.children.splice(h2[rank], 0, {
      type: 'mdxJsxFlowElement',
      name: 'EncartMilieu',
      attributes: [],
      children: [],
    } as Child)
  }
}

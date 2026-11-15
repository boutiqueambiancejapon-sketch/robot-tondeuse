/**
 * ToolCTA — tuile vers un outil du site, choisie selon la catégorie de l'article.
 * Server Component.
 */
import Link from 'next/link'
import { niche } from '@/niche.config'
import { Mascotte } from '@/components/v2/Mascotte'
import type { Pose } from '@/lib/mascotte'

type Tool = { href: string; label: string; description: string; pose: Pose }

const FALLBACK: Tool = {
  href: '/comparer',
  label: 'Comparateur',
  description: `Comparez les ${niche.entities} côte à côte.`,
  pose: 'balance',
}

function toolFor(categorie: string): Tool {
  if (categorie === 'deals') {
    return { href: '/simulateur', label: 'Simulateur', description: `Simulez le coût réel de votre ${niche.entity}.`, pose: 'calcul' }
  }
  const cat = niche.categories.find((c) => c.slug === categorie)
  if (!cat) return FALLBACK
  return {
    href: `/comparer/${cat.slug}`,
    label: `Comparateur ${cat.label}`,
    description: `Comparez les ${cat.label.toLowerCase()} côte à côte.`,
    pose: 'balance',
  }
}

export function ToolCTA({ categorie }: { categorie: string }) {
  const tool = toolFor(categorie)
  return (
    <Link href={tool.href} className="card door door--lime">
      <Mascotte pose={tool.pose} size={104} />
      <h3>{tool.label}</h3>
      <p>{tool.description}</p>
    </Link>
  )
}

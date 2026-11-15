import fs from 'fs'
import path from 'path'
import { getAllArticles, articleHref } from '@/lib/blog'
import { PAR_JARDIN_ITEMS, PAR_BESOIN_ITEMS, COMPARATIFS_ITEMS } from '@/lib/home-hubs'

export type Ligne = { href: string; label: string; text?: string }
export type Groupe = { id: string; title: string; lignes: Ligne[] }

const TOP_HREF = '/meilleur-robot-tondeuse-2026'

/** Phrases reprises de lib/home-hubs.ts, sauf celles qui laissaient croire à un essai ou parlaient en jargon. */
const PHRASES: Record<string, string> = {
  '/robot-tondeuse-pente': 'Les modèles donnés par leur fabricant pour 35 % à 80 % de pente.',
  '/robot-tondeuse-rapport-qualite-prix': 'Le bon équilibre entre le prix et ce que le robot sait faire.',
  '/robot-tondeuse-pas-cher': 'Les modèles sous 600 €, et ce qu’ils savent faire.',
}

const fromHubs = (items: { href: string; label: string; description?: string }[]): Ligne[] =>
  items.map((it) => ({ href: it.href, label: it.label, text: PHRASES[it.href] ?? it.description }))

const euros = (n: number) => `${n.toLocaleString('fr-FR').replace(/\s/g, ' ')} €`

export function countRobots(): number {
  const dir = path.join(process.cwd(), 'content/produits')
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).length : 0
}

/** Les comparatifs regroupés par besoin : surface, budget, technologie, puis les duels « X ou Y ». */
export function getGroupes(): Groupe[] {
  const articles = getAllArticles()

  const budgets: Ligne[] = articles
    .map((a) => ({ a, m: /^meilleur-robot-tondeuse-moins-(\d+)-euros/.exec(a.slug) }))
    .filter((x): x is { a: (typeof articles)[number]; m: RegExpExecArray } => x.m !== null)
    .sort((x, y) => Number(x.m[1]) - Number(y.m[1]))
    .map(({ a, m }) => ({ href: articleHref(a), label: `Moins de ${euros(Number(m[1]))}`, text: `${a.readingTimeMin} min de lecture` }))

  const duels: Ligne[] = articles
    .filter((a) => a.slug.includes('-vs-'))
    .map((a) => ({ href: articleHref(a), label: a.title.split(' : ')[0], text: `${a.readingTimeMin} min de lecture` }))

  return [
    { id: 'surface', title: 'Par surface et par terrain', lignes: fromHubs(PAR_JARDIN_ITEMS) },
    { id: 'budget', title: 'Par budget', lignes: [...fromHubs(COMPARATIFS_ITEMS.filter((it) => it.href !== TOP_HREF)), ...budgets] },
    { id: 'technologie', title: 'Par technologie', lignes: fromHubs(PAR_BESOIN_ITEMS) },
    { id: 'duels', title: 'Un robot ou l’autre', lignes: duels },
  ].filter((g) => g.lignes.length > 0)
}

export { TOP_HREF }

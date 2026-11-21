import { SubNav } from './SubNav'

const VIEWS = [
  { sub: '', label: 'Articles' },
  { sub: '/recherche', label: 'Recherche Google' },
] as const

export function ContentNav({ current }: { current: (typeof VIEWS)[number]['sub'] }) {
  return <SubNav tab="contenu" label="Vues du contenu" views={VIEWS} current={current} />
}

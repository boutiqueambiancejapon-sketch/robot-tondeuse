import { SubNav } from '../SubNav'

const VIEWS = [
  { sub: '', label: 'Vue d’ensemble' },
  { sub: '/suites', label: 'Suites' },
  { sub: '/apercus', label: 'Aperçus' },
] as const

export function EmailsNav({ current }: { current: (typeof VIEWS)[number]['sub'] }) {
  return <SubNav tab="emails" label="Vues des e-mails" views={VIEWS} current={current} />
}

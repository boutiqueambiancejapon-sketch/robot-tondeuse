// Types et mise en forme des offres marchandes, sans accès aux fichiers : utilisable côté client.
export type Marchand = 'Amazon' | 'Cdiscount' | 'Fnac'
export type Offre = { marchand: Marchand; url: string; prix?: number; date?: string }

export function formatPrix(prix: number): string {
  return `${prix.toLocaleString('fr-FR', { minimumFractionDigits: prix % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ /g, ' ')} €`
}

export function formatDate(iso: string): string {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

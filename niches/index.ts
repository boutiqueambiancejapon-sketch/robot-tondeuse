/**
 * niches/index.ts — choix du site lu par le moteur. NEXT_PUBLIC_SITE=<dossier> au moment de la construction
 * (ex. NEXT_PUBLIC_SITE=_modele npm run build) ; sans réglage, Quel Robot Tondeuse.
 * Les polices et le thème du site sont choisis au même endroit par next.config.ts (« @site-actif/… »).
 */
import { modele } from './_modele'
import { robotTondeuse } from './robot-tondeuse'
import type { SiteNiche } from './types'

export const SITES: Record<string, SiteNiche> = { 'robot-tondeuse': robotTondeuse, _modele: modele }

export const SITE_PAR_DEFAUT = 'robot-tondeuse'

export function siteDe(id: string | undefined): SiteNiche {
  const choisi = SITES[id || SITE_PAR_DEFAUT]
  if (!choisi) throw new Error(`NEXT_PUBLIC_SITE inconnu : « ${id} ». Sites : ${Object.keys(SITES).join(', ')}`)
  return choisi
}

export const siteActif: SiteNiche = siteDe(process.env.NEXT_PUBLIC_SITE)

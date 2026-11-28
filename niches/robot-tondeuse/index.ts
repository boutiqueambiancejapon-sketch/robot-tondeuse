/**
 * Quel Robot Tondeuse, premier site du moteur. Ses fiches restent les avis MDX (app/(site)/[article]) :
 * `fiches: null`, le gabarit commun ne sert aucune adresse nouvelle sur ce site.
 */
import type { SiteNiche } from '../types'
import { partenaires } from './partenaires'
import { site } from './site'

export const robotTondeuse: SiteNiche = { id: 'robot-tondeuse', site, indexable: true, partenaires, fiches: null }

/**
 * radar-fiche.ts — relie une fiche robot (avis-…, test-…-avis) à un modèle de data/robots-tondeuses.json
 * et prépare le radar : le robot, ses 2 concurrents par défaut et les notes de tout le catalogue.
 * Correspondance posée à la main dans le champ `base` de la fiche, jamais devinée.
 */
import catalogueJson from '@/data/robots-tondeuses.json'
import { concurrentsParDefaut, serieRadar, type RobotCatalogue, type SerieRadar } from './radar'

export const CATALOGUE = catalogueJson as RobotCatalogue[]

/**
 * Modèles de la base décrits par la fiche, lus dans son champ `base` (id ou liste d'ids de
 * data/robots-tondeuses.json), posé à la main. Le premier est le robot de la fiche ; les suivants,
 * s'il y en a, sont les autres versions de la même gamme et remplacent les concurrents par défaut.
 * Pas de champ, ou id inconnu : pas de radar. Aucune correspondance devinée par le nom ou l'adresse.
 */
export function robotsDeLaFiche(base: string | string[] | undefined, catalogue: RobotCatalogue[] = CATALOGUE): RobotCatalogue[] {
  const ids = base === undefined ? [] : Array.isArray(base) ? base : [base]
  const robots = ids.map((id) => catalogue.find((r) => r.id === id))
  return robots.every((r) => r) ? (robots as RobotCatalogue[]) : []
}

export type DonneesRadar = { principal: SerieRadar; defaut: SerieRadar[]; toutes: SerieRadar[]; total: number }

export function donneesRadar(robot: RobotCatalogue, catalogue: RobotCatalogue[] = CATALOGUE, gamme: RobotCatalogue[] = []): DonneesRadar {
  const toutes = catalogue.map((r) => serieRadar(r, catalogue))
  const parId = (id: string) => toutes.find((s) => s.id === id)!
  return {
    principal: parId(robot.id),
    defaut: (gamme.length ? gamme.slice(0, 2) : concurrentsParDefaut(robot, catalogue)).map((r) => parId(r.id)),
    toutes,
    total: catalogue.length,
  }
}

/**
 * radar-fiche.ts — relie une fiche robot (avis-…, test-…-avis) à un modèle de data/robots-tondeuses.json
 * et prépare le radar : le robot, ses 2 concurrents par défaut et les notes de tout le catalogue.
 * Aucune correspondance sûre = pas de radar.
 */
import catalogueJson from '@/data/robots-tondeuses.json'
import { concurrentsParDefaut, nomRobot, serieRadar, type RobotCatalogue, type SerieRadar } from './radar'

export const CATALOGUE = catalogueJson as RobotCatalogue[]

const normaliser = (s: string) =>
  ` ${s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()} `

/** Modèle de la base décrit par la fiche : par id (adresse), sinon par nom complet unique dans le titre. */
export function robotDeLaFiche(slug: string, titre: string, catalogue: RobotCatalogue[] = CATALOGUE): RobotCatalogue | null {
  if (!/^(avis|test)-/.test(slug)) return null
  const id = slug.replace(/^(avis|test)-/, '').replace(/-avis$/, '')
  const parId = catalogue.find((r) => r.id === id)
  if (parId) return parId
  const t = normaliser(titre)
  const parNom = catalogue.filter((r) => t.includes(normaliser(nomRobot(r))))
  return parNom.length === 1 ? parNom[0] : null
}

export type DonneesRadar = { principal: SerieRadar; defaut: SerieRadar[]; toutes: SerieRadar[]; total: number }

export function donneesRadar(robot: RobotCatalogue, catalogue: RobotCatalogue[] = CATALOGUE): DonneesRadar {
  const toutes = catalogue.map((r) => serieRadar(r, catalogue))
  const parId = (id: string) => toutes.find((s) => s.id === id)!
  return {
    principal: parId(robot.id),
    defaut: concurrentsParDefaut(robot, catalogue).map((r) => parId(r.id)),
    toutes,
    total: catalogue.length,
  }
}

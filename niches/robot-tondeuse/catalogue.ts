/**
 * Catalogue de Quel Robot Tondeuse : data/robots-tondeuses.json (121 robots, sources datées), lu sur place pour ne pas
 * tenir deux copies. Les fiches de QRT restent des avis MDX : il sera converti au format commun (ProduitCatalogue)
 * quand elles passeront au gabarit commun.
 */
import catalogue from '@/data/robots-tondeuses.json'
import type { RobotCatalogue } from '@/lib/radar'

export const robots = catalogue as RobotCatalogue[]

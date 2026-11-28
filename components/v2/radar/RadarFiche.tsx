/** RadarFiche — section radar d'une fiche robot : rendu serveur par défaut (robot + 2 concurrents), choix côté client. */
import type { RobotCatalogue } from '@/lib/radar'
import { donneesRadar } from '@/lib/radar-fiche'
import { Radar } from './Radar'
import { RadarChoix } from './RadarChoix'

export function RadarFiche({ robots }: { robots: RobotCatalogue[] }) {
  const [robot, ...gamme] = robots
  const { principal, defaut, toutes, total } = donneesRadar(robot, undefined, gamme)
  return (
    <section className="radar-sec" aria-labelledby="radar-titre">
      <h2 id="radar-titre" className="h-md">
        {principal.nom} face aux {total} robots de la base
      </h2>
      <RadarChoix principal={principal} defaut={defaut.map((s) => s.id)} toutes={toutes} total={total}>
        <Radar series={[principal, ...defaut]} total={total} />
      </RadarChoix>
    </section>
  )
}

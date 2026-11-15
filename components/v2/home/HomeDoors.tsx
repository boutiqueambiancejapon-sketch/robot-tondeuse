import Link from 'next/link'
import type { Pose } from '@/lib/mascotte'
import { Mascotte } from '../Mascotte'

type Door = { href: string; title: string; text: string; pose: Pose; tone: string }

const DOORS: Door[] = [
  { href: '/quiz', title: 'Le quiz', text: 'Quelques questions sur votre jardin, et un robot conseillé à la fin.', pose: 'loupe', tone: 'door--lime' },
  { href: '/comparer', title: 'Le comparateur', text: 'Deux ou trois robots côte à côte, critère par critère.', pose: 'balance', tone: 'door--copper' },
  { href: '/calculateur-rentabilite-robot-tondeuse', title: 'Robot ou tondeuse ?', text: 'Le coût de chacun sur plusieurs années, selon votre surface.', pose: 'calcul', tone: 'door--ink' },
]

export function HomeDoors() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-hd">
          <h2 className="h-lg">Par où commencer</h2>
        </div>
        <div className="stack cols" style={{ ['--n' as string]: 3 }}>
          {DOORS.map((d) => (
            <Link className={`door ${d.tone}`} href={d.href} key={d.href}>
              <Mascotte pose={d.pose} size={104} />
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { LawnHero } from '@/components/v2/LawnHero'
import { HomePicks } from '@/components/v2/home/HomePicks'
import { HomeDoors } from '@/components/v2/home/HomeDoors'
import { HomeMethod, HomeSeason, HomeGuides } from '@/components/v2/home/HomeMore'

// La saison affichée suit le calendrier : la page est reconstruite une fois par jour.
export const revalidate = 86400

const SURFACES = [
  { label: 'Moins de 300 m²', hint: 'cour, petit jardin' },
  { label: '300 à 800 m²', hint: 'jardin de pavillon' },
  { label: '800 à 2 000 m²', hint: 'grand jardin' },
  { label: 'Plus de 2 000 m²', hint: 'terrain, verger' },
]

function countRobots(): number {
  const dir = path.join(process.cwd(), 'content/produits')
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).length : 0
}

export default function HomePage() {
  const count = countRobots()
  return (
    <main id="main-content" className="v2">
      <LawnHero lines={['Quel robot', 'pour votre', 'pelouse ?']} eyebrow={`${count} robots tondeuses comparés`}>
        <p>Comparatifs, avis et guides pour choisir un robot tondeuse selon votre jardin, sans essai inventé.</p>
      </LawnHero>

      <div className="card quick">
        <h2>Quelle surface fait votre pelouse ?</h2>
        <div className="quick-opts">
          {SURFACES.map((s) => (
            <Link className="opt" href="/quiz" key={s.label}>
              {s.label}
              <small>{s.hint}</small>
            </Link>
          ))}
        </div>
        <p className="dated" style={{ marginTop: 12 }}>
          Le quiz vous conseille un robot, sans inscription ·{' '}
          <Link className="lnk" href="/superficie">
            Mesurer ma pelouse
          </Link>
        </p>
      </div>

      <HomePicks />
      <HomeDoors />
      <HomeMethod count={count} />
      <HomeSeason />
      <HomeGuides />
    </main>
  )
}

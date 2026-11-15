import Image from 'next/image'
import Link from 'next/link'
import { getAllArticles, articleHref } from '@/lib/blog'
import type { Pose } from '@/lib/mascotte'
import { Mascotte } from '../Mascotte'

const SEASONS: { pose: Pose; title: string; text: string }[] = [
  { pose: 'hiver', title: 'En hiver, le robot reste au sec', text: 'Nettoyé, chargé à moitié et rangé hors gel. La pelouse, elle, se repose.' },
  { pose: 'printemps', title: 'Au printemps, le robot ressort', text: 'Lames neuves, première tonte haute, puis le rythme de croisière.' },
  { pose: 'ete', title: 'En été, on tond plus haut', text: 'L’herbe haute garde le sol frais. En canicule, le robot fait la pause.' },
  { pose: 'automne', title: 'En automne, on prépare l’hiver', text: 'Dernières tontes, feuilles ramassées, et bientôt le rangement.' },
]

const seasonOf = (month: number) => SEASONS[month <= 1 || month >= 10 ? 0 : month <= 4 ? 1 : month <= 7 ? 2 : 3]

export function HomeMethod({ count }: { count: number }) {
  return (
    <section className="sec sec--dark">
      <div className="wrap stack-lg">
        <div className="ttl" style={{ margin: 0 }}>
          <h2 className="h-lg">Nous n’essayons pas les robots.</h2>
          <Mascotte pose="lecture" size={104} className="masc" />
        </div>
        <p className="lede" style={{ color: '#dfe9da' }}>
          Personne ne peut essayer {count} robots sur le même terrain. Nous lisons les fiches des fabricants, les notices et les retours
          publiés, puis nous comparons les modèles sur les mêmes critères.
        </p>
      </div>
    </section>
  )
}

export function HomeSeason() {
  const season = seasonOf(new Date().getMonth())
  return (
    <section className="sec">
      <div className="wrap stack-lg">
        <div className="season">
          <Mascotte pose={season.pose} size={112} />
          <div className="stack">
            <h2 className="h-md">{season.title}</h2>
            <p className="small muted">{season.text}</p>
            <Link className="lnk" href="/calendrier-du-gazon">
              Ouvrir le calendrier du gazon
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomeGuides() {
  const guides = getAllArticles()
    .filter((a) => !a.draft && a.featureImage)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 4)
  if (guides.length === 0) return null

  return (
    <section className="sec sec--cream">
      <div className="wrap">
        <div className="sec-hd">
          <h2 className="h-lg">Les derniers guides</h2>
        </div>
        <div className="stack">
          {guides.map((a) => (
            <Link className="post" href={articleHref(a)} key={a.slug}>
              <Image src={a.featureImage ?? ''} alt="" width={192} height={192} sizes="96px" />
              <div>
                <h3>{a.title}</h3>
                <p>{a.readingTimeMin} min de lecture</p>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: 16 }}>
          <Link className="btn btn--ivory btn--full" href="/blog">
            Tous les guides
          </Link>
        </p>
      </div>
    </section>
  )
}

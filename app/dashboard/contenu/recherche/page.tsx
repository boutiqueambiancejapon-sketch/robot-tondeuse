import Link from 'next/link'
import { notFound } from 'next/navigation'
import { calendarDay, n } from '@/lib/dashboard/format'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { one } from '@/lib/dashboard/tab-page'
import { getSearch } from '@/lib/server/dashboard/search'
import { Card } from '@/components/dashboard/Card'
import { Columns } from '@/components/dashboard/Columns'
import { ContentNav } from '@/components/dashboard/ContentNav'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { TextTile, Tiles } from '@/components/dashboard/Tiles'
import { Connect } from '@/components/dashboard/search/Connect'
import { GscRows } from '@/components/dashboard/search/GscRows'

// Google search (Search Console), sub-page of the Content tab.

export const dynamic = 'force-dynamic'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  if (!(await dashboardAllowed())) notFound()
  const r = await getSearch((one((await searchParams).q) ?? '').slice(0, 100))
  return (
    <DashboardShell current="contenu" sub="/recherche" title="Recherche Google" intro={`Ce que les gens tapent dans Google avant d’arriver sur le site, du ${calendarDay(r.start)} au ${calendarDay(r.end)} (Google publie avec deux jours de retard).`} notice={r.state === 'error' ? 'La Search Console n’a pas répondu. Les chiffres reviendront au prochain chargement.' : null}>
      <ContentNav current="/recherche" />
      {r.state === 'not-connected' || r.state === 'no-key' ? (
        <Connect state={r.state} account={r.account} />
      ) : (
        <>
          <form method="get" role="search" className="search">
            <label className="contents">
              <span className="sr-only">Mot-clé ou adresse</span>
              <input name="q" defaultValue={r.q} placeholder="Mot-clé ou bout d’adresse : husqvarna, /choisir…" className="input" />
            </label>
            <button type="submit" className="btn btn--ink btn--s">Chercher</button>
          </form>
          {r.q && <Link href="/dashboard/contenu/recherche" className="lnk small">Effacer la recherche</Link>}
          <Tiles>
            <TextTile label="Clics depuis Google" value={n(r.clicks)} />
            <TextTile label="Affichages" value={n(r.impressions)} />
            <TextTile label="Position moyenne" value={r.position === null ? '–' : r.position.toFixed(1).replace('.', ',')} />
          </Tiles>
          <Card title="Clics depuis Google par jour">
            <Columns buckets={r.days.map((d) => ({ bucket: `${d.bucket}T00:00`, n: d.n }))} hourly={false} label="Clics depuis Google par jour" table empty="Aucun clic depuis Google sur ces 28 jours." />
          </Card>
          <div className="grid grid--2">
            {r.q && <GscRows title={`Recherches qui contiennent « ${r.q} »`} intro="Chaque recherche avec la page que Google montre, triées par affichages (100 au plus)." rows={r.results} />}
            <GscRows title="Presque en première page" intro="Position 8 à 20, vues au moins 20 fois : un article renforcé ou mieux relié peut les faire monter." rows={r.nearly} />
            <GscRows title="Bien placées mais peu cliquées" intro="En première page, plus de 50 affichages, moins de 2 % de clics : le titre ou la description donne peu envie." rows={r.lowCtr} />
            <GscRows title="Questions longues (assistants d’IA)" intro="Recherches de 8 mots ou plus, souvent préparées par ChatGPT ou le mode IA de Google, avec la page montrée." rows={r.long} />
            <GscRows title="Recherches qui amènent le plus de clics" rows={r.queries} />
            <GscRows title="Pages qui reçoivent le plus de clics" rows={r.pages} page />
          </div>
        </>
      )}
    </DashboardShell>
  )
}

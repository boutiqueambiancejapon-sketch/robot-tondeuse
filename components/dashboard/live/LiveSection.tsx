'use client'

import { countryName } from '@/lib/dashboard/country'
import { ago } from '@/lib/dashboard/format'
import { Card } from '../Card'
import { Bots, Feed, MiniList, MinuteBars } from './LiveParts'
import { useLive } from './useLive'

// "En direct": active visitors, page views per minute, open pages, countries, latest hits and
// actions, recent AI robots. Data: /dashboard/trafic/direct/donnees (protected like the page).

function Big({ value }: { value: number | null }) {
  return (
    <p className="live-n">
      <span className="pulse" aria-hidden="true" />
      {value ?? '…'}
    </p>
  )
}

export function LiveSection() {
  const { data, failed } = useLive()
  return (
    <>
      {failed && <p role="status" className="alert">Connexion perdue, nouvel essai dans 10 secondes.</p>}
      {data?.ingestAt && <p className="tiny muted">Journal du serveur lu {ago(new Date(data.ingestAt))}.</p>}
      <div className="grid grid--2">
        <Card title="Visiteurs en ce moment" note="5 dernières minutes">
          <Big value={data ? data.visitors5 : null} />
          {data && <MinuteBars values={data.visitorsPerMinute} label="Visiteurs" />}
          <p className="tiny muted">Une personne qui ouvre 5 pages compte pour 1.</p>
        </Card>
        <Card title="Pages vues" note="5 dernières minutes">
          <Big value={data ? data.views5 : null} />
          {data && <MinuteBars values={data.perMinute} label="Pages vues" />}
        </Card>
        <Card title="Pages ouvertes en ce moment" note="5 min">
          {data && <MiniList rows={data.pages} empty="Personne sur le site ces 5 dernières minutes." />}
          {data && data.refs.length > 0 && (
            <>
              <h3 className="small">Arrivés depuis (30 min)</h3>
              <MiniList rows={data.refs} empty="" />
            </>
          )}
        </Card>
        <Card title="Pays en ce moment" note="visiteurs, 5 min">
          {data && <MiniList rows={data.countries} format={countryName} empty="Personne sur le site ces 5 dernières minutes." />}
        </Card>
        <Card title="Fil d’activité" note="25 dernières lignes">
          {data && <Feed items={data.feed} />}
        </Card>
        <Card title="Robots d’IA récents" note="30 min">
          {data && <Bots items={data.bots} />}
        </Card>
      </div>
    </>
  )
}

import { countryName } from '@/lib/dashboard/country'
import type { GeoData } from '@/lib/server/dashboard/geo'
import { BarList } from '../BarList'
import { Card } from '../Card'

// Countries read from the address at the time of the visit (local DB-IP file), then the address is forgotten.

export function GeoPanels({ data }: { data: GeoData }) {
  return (
    <>
      <Card title="Visiteurs par pays" note="depuis le 21 nov.">
        <BarList rows={data.visitors} total={data.visitorsTotal} format={countryName} empty="Aucun visiteur avec un pays relevé sur la période." />
      </Card>
      <Card title="Clics Preply par pays">
        <BarList rows={data.clicks} format={countryName} empty="Aucun clic avec un pays relevé sur la période." />
      </Card>
      <Card title="Kits, inscriptions et comptes par pays">
        <BarList rows={data.leads} format={countryName} empty="Aucune inscription avec un pays relevé sur la période." />
      </Card>
    </>
  )
}

import type { RevenueData } from '@/lib/seo-dash/server/revenue'
import { SITE, valueKnown } from '@/lib/seo-dash/config'
import { eur, n0, n1, pct0 } from '@/lib/seo-dash/format'
import { PageLink } from '../ui/Cells'
import { Card, Empty } from '../ui/Card'
import { BarList } from '../ui/BarList'

// SEO dashboard, Revenus: clicks per group (QRT: the merchant, Amazon direct, Cdiscount and Fnac through Awin), then per page
// (visits → clicks → customers → euros; "€ ?" while the value of a click is unknown).

export function ByPartner({ brands, csv }: { brands: RevenueData['brands']; csv: string }) {
  return (
    <Card title={SITE.partner.groupPlural} desc={`Clics ${SITE.partner.names.join(', ')}${valueKnown() ? '' : ' · valeur d’un clic inconnue : € ?'}`} csv={csv}>
      <BarList items={brands.map((b) => ({ key: b.brand, label: b.brand, value: b.clicks, text: `${n0(b.clicks)} · ${b.revenue === null ? '?' : eur(b.revenue)}` }))} />
    </Card>
  )
}

export function ByPage({ pages, query, csv }: { pages: RevenueData['pages']; query: string; csv: string }) {
  return (
    <Card title="Par page : visites → clics → clients → euros" desc="Une ligne par page, triée par clics vers les marchands" csv={csv}>
      {pages.length ? (
        <div className="sd-tw">
          <table>
            <thead>
              <tr>
                <th>Page</th>
                <th className="num">Visites</th>
                <th className="num">Clics</th>
                <th className="num">Taux</th>
                <th className="num">Clients est.</th>
                <th className="num">Revenu est.</th>
                <th className="sd-hide-m">Emplacements</th>
              </tr>
            </thead>
            <tbody>
              {pages.slice(0, 15).map((p) => (
                <tr key={p.page}>
                  <td className="u">
                    <PageLink path={p.page} query={query} />
                  </td>
                  <td className="num">{n0(p.visits)}</td>
                  <td className="num">{n0(p.clicks)}</td>
                  <td className="num">{p.visits ? pct0(p.clicks / p.visits) : '—'}</td>
                  <td className="num">{!valueKnown() ? '?' : p.clients ? n1(p.clients) : '—'}</td>
                  <td className="num">{!valueKnown() ? '€ ?' : p.revenue ? eur(p.revenue) : '—'}</td>
                  <td className="sd-hide-m">
                    <span className="sd-tags">
                      {p.brands.slice(0, 3).map((b) => (
                        <span key={b.brand} className="sd-tag">{`${b.brand} ${b.n}`}</span>
                      ))}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty>Aucun clic vers un marchand sur la période.</Empty>
      )}
    </Card>
  )
}

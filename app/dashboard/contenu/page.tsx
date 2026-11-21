import Link from 'next/link'
import { notFound } from 'next/navigation'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { ago, calendarDay, n } from '@/lib/dashboard/format'
import { getPool } from '@/lib/server/db'
import { getContent } from '@/lib/server/dashboard/content'
import { getUnits, unixDate } from '@/lib/server/dashboard/server'
import { Card } from '@/components/dashboard/Card'
import { ContentNav } from '@/components/dashboard/ContentNav'
import { DashboardShell } from '@/components/dashboard/DashboardShell'
import { TextTile, Tiles } from '@/components/dashboard/Tiles'

// Content tab: articles (newest first) with their 30-day views, robot sheets, last price reading.

export const dynamic = 'force-dynamic'

const SITE = 'https://quel-robot-tondeuse.com'

export default async function ContentPage() {
  if (!(await dashboardAllowed())) notFound()
  const [c, units] = await Promise.all([getContent(getPool()), getUnits(['qrt-offres.service', 'qrt-offres.timer'])])
  const run = units['qrt-offres.service'] ?? {}
  const lastRun = unixDate(run.ExecMainExitTimestamp || run.InactiveEnterTimestamp)
  const nextRun = unixDate(units['qrt-offres.timer']?.NextElapseUSecRealtime)
  return (
    <DashboardShell current="contenu" title="Contenu" intro="Les articles, du plus récent au plus ancien, avec leurs vues sur 30 jours, les fiches robot et le relevé des prix.">
      <ContentNav current="" />
      <p className="okline">
        {n(c.total)} articles en ligne · {n(c.last7)} publiés cette semaine · {n(c.last30)} en 30 jours.
      </p>
      <Tiles>
        <TextTile label="Fiches robot" value={n(c.products)} note="content/produits" />
        <TextTile label="Prix relevés (Cdiscount, Fnac)" value={n(c.prices.offers)} note={`${n(c.prices.robots)} robots`} />
        <TextTile label="Dernier prix daté" value={c.prices.latest ? calendarDay(c.prices.latest) : '–'} note="dans la version en ligne" />
        <TextTile label="Relevé automatique" value={lastRun ? ago(lastRun) : '–'} note={nextRun ? `prochain : ${calendarDay(nextRun.toISOString().slice(0, 10))}` : run.Result === 'success' ? 'OK' : 'chaque semaine'} />
      </Tiles>
      <Card title="Articles" note="publié · vues · lus par IA, 30 j">
        <div className="tbl-w">
          <table className="tbl">
            <thead>
              <tr>
                <th>Article</th>
                <th className="n">Publié</th>
                <th className="n">Vues</th>
                <th className="n">IA</th>
              </tr>
            </thead>
            <tbody>
              {c.posts.map((p) => (
                <tr key={p.href}>
                  <td>
                    <Link href={`${SITE}${p.href}`} target="_blank">
                      {p.title}
                    </Link>
                    {p.updated !== p.date && <span className="tiny muted"> · mis à jour {calendarDay(p.updated)}</span>}
                  </td>
                  <td className="n">{calendarDay(p.date)}</td>
                  <td className="n">{n(p.views30)}</td>
                  <td className="n">{n(p.ai30)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardShell>
  )
}

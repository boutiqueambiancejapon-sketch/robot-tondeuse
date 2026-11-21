import Link from 'next/link'
import { notFound } from 'next/navigation'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { calendarDay, n } from '@/lib/dashboard/format'
import { getPool } from '@/lib/server/db'
import { getContent } from '@/lib/server/dashboard/content'
import { Card } from '@/components/dashboard/Card'
import { ContentNav } from '@/components/dashboard/ContentNav'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  if (!(await dashboardAllowed())) notFound()
  const c = await getContent(getPool())
  return (
    <DashboardShell current="contenu" title="Contenu" intro="Les articles du blog, du plus récent au plus ancien, avec leurs vues sur 30 jours.">
      <ContentNav current="" />
      <p className="okline">
        {n(c.total)} articles en ligne · {n(c.last7)} publiés cette semaine · {n(c.last30)} en 30 jours.
      </p>
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
                <tr key={p.slug}>
                  <td>
                    <Link href={`https://10minlanguages.com/blog/${p.slug}`} target="_blank">
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

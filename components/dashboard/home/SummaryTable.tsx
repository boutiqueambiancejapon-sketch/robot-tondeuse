import { n } from '@/lib/dashboard/format'
import type { Metric, Summary } from '@/lib/server/dashboard/home'

const LINES: { key: Metric; label: string }[] = [
  { key: 'visitors', label: 'Visiteurs' },
  { key: 'views', label: 'Pages vues' },
  { key: 'clicks', label: 'Clics Preply' },
  { key: 'signups', label: 'Inscrits' },
  { key: 'ai', label: 'Robots IA' },
]

/** Five figures for today, 7 days and 30 days. */
export function SummaryTable({ summary }: { summary: Summary }) {
  return (
    <table className="sum">
      <thead>
        <tr>
          <th scope="col">
            <span className="sr-only">Chiffre</span>
          </th>
          <th scope="col">Aujourd’hui</th>
          <th scope="col">7 j</th>
          <th scope="col">30 j</th>
        </tr>
      </thead>
      <tbody>
        {LINES.map((l) => (
          <tr key={l.key}>
            <th scope="row">{l.label}</th>
            <td className="today">{n(summary[l.key].today)}</td>
            <td>{n(summary[l.key].d7)}</td>
            <td>{n(summary[l.key].d30)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

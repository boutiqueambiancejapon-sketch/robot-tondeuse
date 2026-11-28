/** RadarTableau — les valeurs du radar en tableau repliable (une colonne par robot), lisible et citable. */
import { AXES, type SerieRadar } from '@/lib/radar'

const fmt = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

export function RadarTableau({ series }: { series: SerieRadar[] }) {
  return (
    <details className="acc radar__tab">
      <summary>Les valeurs du graphe</summary>
      <div className="tbl-wrap">
        <div className="tbl-scroll">
          <table className="tbl tbl--fit">
            <thead>
              <tr>
                <th scope="col">Critère</th>
                {series.map((s) => (
                  <th key={s.id} scope="col">
                    {s.nom}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AXES.map((a) => (
                <tr key={a.cle}>
                  <th scope="row">{a.label}</th>
                  {series.map((s) => (
                    <td key={s.id}>
                      {s.notes[a.cle] === null ? (
                        'non publié'
                      ) : (
                        <>
                          <b>{fmt(s.notes[a.cle]!)}/10</b>
                          <small>{s.valeurs[a.cle]}</small>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>
  )
}

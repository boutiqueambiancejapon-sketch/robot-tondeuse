import type { TypeRow } from '@/lib/dashboard/traffic'
import type { ConversionData } from '@/lib/server/dashboard/conversions'
import { BarList } from '../BarList'
import { Card } from '../Card'
import { ByType } from './ByType'
import { ClicksByPage } from './ClicksByPage'

// The detail cards of the Conversions tab (modular: a redesign can replace this block alone).

interface Props {
  data: ConversionData
  types: TypeRow[]
  titles: Map<string, string>
}

export function ConversionLists({ data, types, titles }: Props) {
  return (
    <>
      <Card title="Par marchand" note="clics">
        <BarList rows={data.byMerchant} total={data.total} empty="Aucun clic sur cette période." />
        <p className="tiny muted">Amazon : liens directs et liens /go/. Cdiscount et Fnac : liens Awin.</p>
      </Card>
      <Card title="Par type de page" note="clics · vues · inscriptions">
        <ByType rows={types} />
      </Card>
      <Card title="Clics marchands par page">
        <ClicksByPage rows={data.byPage} titles={titles} />
      </Card>
      <Card title="Où se trouve le lien cliqué" note="emplacement dans la page">
        <BarList rows={data.byPlace} empty="Aucun clic sur cette période." />
      </Card>
      <Card title="Quel robot est cliqué">
        <BarList rows={data.byRobot} empty="Aucun clic sur cette période." />
      </Card>
      <Card title="Redirections Amazon /go/" note="journal du serveur, par référence">
        <BarList rows={data.redirects} empty="Aucune redirection /go/ sur cette période." />
        <p className="tiny muted">Contrôle indépendant des clics : chaque passage par /go/&lt;référence&gt;/amazon, robots exclus.</p>
      </Card>
      <Card title="Résultats du quiz" note="robot conseillé">
        <BarList rows={data.quiz} empty="Aucun quiz terminé sur cette période." />
      </Card>
      <Card title="Outils utilisés" note="quiz, carte, rentabilité, calendrier">
        <BarList rows={data.tools} empty="Aucun outil utilisé sur cette période." />
      </Card>
      <Card title="Inscriptions à la lettre" note="par formulaire">
        <BarList rows={data.signups} empty="Aucune inscription sur cette période." />
      </Card>
      <Card title="Guides PDF ouverts" note="visiteurs par fichier">
        <BarList rows={data.pdf} empty="Aucun guide PDF ouvert sur cette période." />
      </Card>
      <Card title="Pages promos et Black Friday" note="pages vues">
        <BarList rows={data.promo} empty="Aucune page promo lue sur cette période." />
      </Card>
    </>
  )
}

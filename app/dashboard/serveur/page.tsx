import { notFound } from 'next/navigation'
import { dashboardAllowed } from '@/lib/dashboard/guard'
import { ago, gb, n, pct, when } from '@/lib/dashboard/format'
import { getServer, unixDate } from '@/lib/server/dashboard/server'
import { EMPTY_RESPONSES, getResponses } from '@/lib/server/dashboard/responses'
import { safeRead } from '@/lib/server/dashboard/safe'
import { BarList } from '@/components/dashboard/BarList'
import { Card } from '@/components/dashboard/Card'
import { DashboardShell } from '@/components/dashboard/DashboardShell'

export const dynamic = 'force-dynamic'

const REPO = 'https://github.com/boutiqueambiancejapon-sketch/10minlanguages/commit/'

function Status({ good, children }: { good: boolean; children: string }) {
  return <span className={`tag ${good ? 'tag--ok' : 'tag--bad'}`}>{children}</span>
}

export default async function ServerPage() {
  if (!(await dashboardAllowed())) notFound()
  const [s, r] = await Promise.all([getServer(), safeRead('responses', EMPTY_RESPONSES, getResponses)])
  const ms = (v: number | null) => (v === null ? '–' : `${n(Math.round(v))} ms`)
  const site = s.units['site@10minlanguages.service'] ?? {}
  const deploy = s.units['site-deploy@10minlanguages.service'] ?? {}
  const deployTimer = s.units['site-deploy@10minlanguages.timer'] ?? {}
  const ingest = s.units['tenmin-ingest.service'] ?? {}
  const started = unixDate(site.ActiveEnterTimestamp)
  const lastDeployRun = unixDate(deploy.ExecMainExitTimestamp || deploy.InactiveEnterTimestamp)
  const nextDeploy = unixDate(deployTimer.NextElapseUSecRealtime)
  const lastIngest = unixDate(ingest.ExecMainExitTimestamp || ingest.InactiveEnterTimestamp)
  const memory = Number(site.MemoryCurrent)
  return (
    <DashboardShell current="serveur" title="Serveur" intro="L’état du site sur le serveur, lu à l’ouverture de la page.">
      <Card title="Le site">
        <dl className="facts">
          <dt>Service</dt>
          <dd><Status good={site.ActiveState === 'active'}>{site.ActiveState === 'active' ? 'En ligne' : site.ActiveState || 'inconnu'}</Status></dd>
          <dt>Démarré</dt>
          <dd>{started ? ago(started) : '–'}</dd>
          <dt>Redémarrages imprévus</dt>
          <dd className="num">{site.NRestarts ?? '–'}</dd>
          <dt>Mémoire du site</dt>
          <dd className="num">{Number.isFinite(memory) && memory > 0 ? `${n(Math.round(memory / 1024 ** 2))} Mo` : '–'}</dd>
        </dl>
      </Card>
      <Card title="Mises en ligne" note="contrôle toutes les heures">
        <dl className="facts">
          <dt>Version servie</dt>
          <dd><a className="lnk" href={`${REPO}${s.release.sha}`} target="_blank" rel="noopener">{s.release.sha.slice(0, 7)}</a></dd>
          <dt>Mise en ligne</dt>
          <dd>{s.release.at ? when(s.release.at) : '–'}</dd>
          <dt>Dernier contrôle</dt>
          <dd>{lastDeployRun ? ago(lastDeployRun) : '–'} {deploy.Result && <Status good={deploy.Result === 'success'}>{deploy.Result === 'success' ? 'OK' : 'Échec'}</Status>}</dd>
          <dt>Prochain contrôle</dt>
          <dd>{nextDeploy ? when(nextDeploy) : '–'}</dd>
          <dt>Relevé des visites</dt>
          <dd>{lastIngest ? ago(lastIngest) : '–'} {ingest.Result && <Status good={ingest.Result === 'success'}>{ingest.Result === 'success' ? 'OK' : 'Échec'}</Status>}</dd>
        </dl>
      </Card>
      <Card title="Réponses du site" note="24 dernières heures">
        <dl className="facts">
          <dt>Requêtes (visiteurs et robots)</dt>
          <dd className="num">{n(r.value.requests)}</dd>
          <dt>Erreurs du serveur (5xx)</dt>
          <dd><Status good={r.value.errors5xx === 0}>{n(r.value.errors5xx)}</Status></dd>
          <dt>Temps de réponse médian (pages)</dt>
          <dd className="num">{ms(r.value.median)}</dd>
          <dt>Temps de réponse, 95 %</dt>
          <dd className="num">{ms(r.value.p95)}</dd>
        </dl>
        <h3 className="small">Pages les plus lentes (ms, moyenne)</h3>
        <BarList rows={r.value.slow} empty="Pas assez de visites sur 24 heures." />
      </Card>
      <Card title="La machine" note="partagée avec les autres sites">
        <dl className="facts">
          <dt>Disque utilisé</dt>
          <dd>{s.disk ? `${pct(s.disk.used, s.disk.total)} de ${gb(s.disk.total)}` : '–'}</dd>
          <dt>Mémoire utilisée</dt>
          <dd>{s.memory ? `${pct(s.memory.used, s.memory.total)} de ${gb(s.memory.total)}` : '–'}</dd>
          <dt>Charge (15 min)</dt>
          <dd>{s.load !== null ? pct(s.load, s.cores) : '–'}</dd>
        </dl>
      </Card>
    </DashboardShell>
  )
}

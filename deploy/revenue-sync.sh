#!/usr/bin/env bash
# Copies Quel Robot Tondeuse's real sales (control centre, commissions table, project robot-tondeuse) into
# analytics.revenue_sales of the qrt database, for Dashboard › Revenus. Account administrator: the only one that
# reads the control centre's database. Run every hour by qrt-revenue-sync.timer; safe to re-run (rewritten).
# Installed: sudo install -m 755 deploy/revenue-sync.sh /usr/local/sbin/qrt-revenue-sync
set -euo pipefail
DB=${CONTROLE_DB:-/var/lib/controle/controle.db}
PROJECT=${PROJECT:-robot-tondeuse}
CSV=$(sqlite3 -readonly -csv "file:$DB?mode=ro" \
  "SELECT project, day, program, sum(amount), sum(sales), min(status) FROM commissions WHERE project = '$PROJECT' GROUP BY project, day, program")
if [[ -z "$CSV" ]]; then
  # No sale recorded yet: the table is emptied for the project, nothing to copy.
  psql -v ON_ERROR_STOP=1 -q -d qrt -c "DELETE FROM analytics.revenue_sales WHERE project = '$PROJECT'"
else
  psql -v ON_ERROR_STOP=1 -q -d qrt <<SQL
BEGIN;
DELETE FROM analytics.revenue_sales WHERE project = '$PROJECT';
\copy analytics.revenue_sales (project, day, program, amount, sales, status) FROM STDIN WITH (FORMAT csv)
$CSV
\.
COMMIT;
SQL
fi
echo "sales copied: $(printf '%s\n' "$CSV" | grep -c . || true) rows"

#!/usr/bin/env node
// Lost phone: deletes every dashboard factor (Face ID keys, 6-digit code) and every session. The
// password (DASHBOARD_PASSWORD in the shared .env) then opens the enrolment screen again.
// Run on the server: sudo -n -u sites env DATABASE_URL='postgresql:///qrt?host=/var/run/postgresql' \
//   node /srv/sites/robot-tondeuse/current/scripts/dashboard-login-reset.mjs --yes
import pg from 'pg'

if (!process.argv.includes('--yes')) {
  console.log('Deletes all dashboard login factors and sessions. Re-run with --yes to confirm.')
  process.exit(0)
}
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL || 'postgresql:///qrt?host=/var/run/postgresql', max: 1 })
try {
  for (const table of ['passkey', 'totp', 'session', 'challenge']) {
    const { rowCount } = await pool.query(`DELETE FROM dashboard.${table}`)
    console.log(`dashboard.${table}: ${rowCount} deleted`)
  }
} finally {
  await pool.end()
}

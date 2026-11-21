// SEO dashboard (ported from Toutou via 10minlanguages): automatic notes from the git history of the live branch
// (stable clone ~/sites-src/robot-tondeuse, fetched by deploy-site.sh): site features and SEO fixes (« technique »
// dot), new articles, content passes, promo checks and the weekly price reading (qrt-offres) in the journal, deploys
// of the day. Unique key: a note is never written twice.
//   node --import ./scripts/lib/ts-register.mjs scripts/seo/notes-auto.ts [--jours=120]
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import pg from 'pg'

const REPO = process.env.DEPLOY_REPO || '/home/administrator/sites-src/robot-tondeuse'
const RELEASES = process.env.RELEASES_DIR || '/srv/sites/robot-tondeuse/releases'
const BRANCH = process.env.DEPLOY_BRANCH || 'claude/setup-nextjs-apple-guide-En4gb'
const jours = Number(process.argv.find((a) => a.startsWith('--jours='))?.split('=')[1] ?? 120)
// Dashboard or tooling changes: they don't touch the public site.
const INTERNAL = /^(feat|fix|perf|refactor)\((dashboard|safeguard|deploy|scripts|ci|deps|test|analytics|tracking|ops|sites|db|data|dns|email|emails|lint|build|team|lot\d+)\)/
// Features that change what Google sees (dot on the charts); the others stay in the journal.
const VISIBLE = /^(seo|nav|menu|layout|design|home|articles|article|og|black-friday|promos|products|tools|piscine|scoring|bareme|cro|conversion)$/
// Content passes worth a line in the journal (cover images are left out: no change for Google).
const CONTENT = /^content\((?!images\))([a-z0-9-]+)\): (.+)$/

interface Note {
  ref: string
  day: string
  kind: 'tech' | 'maj' | 'pub'
  text: string
  source: 'auto' | 'journal'
}

function fromGit(): Note[] {
  const out = execFileSync('git', ['-C', REPO, 'log', `origin/${BRANCH}`, `--since=${jours}.days`, '--no-merges', '--date=short', '--format=%h|%ad|%s'], { encoding: 'utf8' })
  const notes: Note[] = []
  for (const line of out.split('\n')) {
    const [sha, day, ...rest] = line.split('|')
    const subject = rest.join('|')
    if (!sha || !subject || INTERNAL.test(subject)) continue
    if (!day) continue
    const seo = /^content\(seo\): (.+)$/.exec(subject)
    if (seo) {
      notes.push({ ref: `git:${sha}`, day, kind: 'maj', text: `SEO : ${seo[1] ?? ''}`, source: 'auto' })
      continue
    }
    // Weekly Cdiscount / Fnac price reading (qrt-offres.timer, Monday night): journal only.
    if (/^chore\(offres\):/.test(subject)) {
      notes.push({ ref: `git:${sha}`, day, kind: 'maj', text: 'Prix Cdiscount et Fnac relevés (relevé de la semaine)', source: 'journal' })
      continue
    }
    const fixSeo = /^fix\((seo|og)\): (.+)$/.exec(subject)
    if (fixSeo) {
      notes.push({ ref: `git:${sha}`, day, kind: 'tech', text: `Correctif SEO : ${fixSeo[2] ?? ''}`, source: 'auto' })
      continue
    }
    // New articles (night job site-articles and by hand): content(blog): add <slug>; the other content passes.
    const content = CONTENT.exec(subject)
    if (content) {
      const what = content[1] === 'blog' ? 'Articles' : content[1] === 'promos' ? 'Promos' : 'Contenu'
      notes.push({ ref: `git:${sha}`, day, kind: 'maj', text: `${what} : ${content[2] ?? ''}`, source: 'journal' })
      continue
    }
    const feat = /^feat(?:\(([^)]+)\))?!?: (.+)$/.exec(subject)
    if (feat) notes.push({ ref: `git:${sha}`, day, kind: 'tech', text: `Nouveauté en ligne : ${feat[2] ?? ''}`, source: VISIBLE.test(feat[1] ?? '') && !/\(WIP\)/i.test(subject) ? 'auto' : 'journal' })
  }
  return notes
}

function fromReleases(): Note[] {
  const perDay = new Map<string, number>()
  try {
    for (const name of readdirSync(RELEASES)) {
      const day = new Date(statSync(`${RELEASES}/${name}`).mtimeMs).toISOString().slice(0, 10)
      perDay.set(day, (perDay.get(day) ?? 0) + 1)
    }
  } catch {
    return []
  }
  return [...perDay].map(([day, n]) => ({ ref: `deploys:${day}`, day, kind: 'tech' as const, text: `${n} mise${n > 1 ? 's' : ''} en ligne du site`, source: 'journal' as const }))
}

async function main(): Promise<void> {
  const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 1 })
  const notes = [...fromGit(), ...fromReleases()]
  let added = 0
  for (const n of notes) {
    const r = await db.query(
      `INSERT INTO analytics.seo_notes (day, kind, text, source, ref) VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (ref) DO UPDATE SET text = EXCLUDED.text, source = EXCLUDED.source WHERE analytics.seo_notes.source <> 'manuel'`,
      [n.day, n.kind, n.text.slice(0, 200), n.source, n.ref],
    )
    added += r.rowCount ?? 0
  }
  await db.end()
  console.log(`Notes automatiques : ${notes.length} lues, ${added} écrites ou mises à jour`)
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})

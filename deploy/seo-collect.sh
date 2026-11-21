#!/usr/bin/env bash
# Nightly collectors of the SEO dashboard (tenmin-seo-collect.timer, 04:30 Brussels: after the fiches job of 02:40).
# Each step is independent: a failure is logged and the next one still runs. Ported from Toutou's deploy/seo-collect.sh.
set -uo pipefail
cd /srv/sites/10minlanguages/current
RUN=(node --import ./scripts/lib/ts-register.mjs)
step() {
  echo "--- $1"
  shift
  "$@" || echo "failed: $?"
}
step "Search Console, last 10 days (scripts/seo/collect-gsc.ts)" "${RUN[@]}" scripts/seo/collect-gsc.ts
step "automatic notes (scripts/seo/notes-auto.ts)" "${RUN[@]}" scripts/seo/notes-auto.ts
step "page audit and internal links (scripts/seo/audit.ts)" "${RUN[@]}" scripts/seo/audit.ts
step "URL inspection, 2,000 at most (scripts/seo/inspect.ts)" "${RUN[@]}" scripts/seo/inspect.ts
echo "--- end"

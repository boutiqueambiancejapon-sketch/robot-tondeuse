#!/usr/bin/env bash
# Nightly collectors of the SEO dashboard (qrt-seo-collect.timer, 02:05 Brussels: after the night article job of
# 23:37 UTC, before the other sites' fiches and SEO jobs). Each step is independent: a failure is logged and the next
# one still runs. Ported from 10minlanguages' deploy/seo-collect.sh. Search Console steps do nothing until connected.
set -uo pipefail
cd /srv/sites/robot-tondeuse/current
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

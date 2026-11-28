#!/usr/bin/env bash
# Relevé de nuit des adresses de photos Amazon pour Quel Robot Tondeuse (propriétaire, 28/11/2026).
# Met à jour content/offres/photos-amazon.json dans une copie de travail à part, puis l'envoie sur la branche en ligne
# (la mise à jour automatique du site le publie dans l'heure). Les clés Amazon viennent de l'EnvironmentFile du service.
set -euo pipefail
REPO=/home/administrator/sites-src/robot-tondeuse
WORK=/home/administrator/sites-work-photos-amazon
BRANCH=claude/setup-nextjs-apple-guide-En4gb
[[ -e "$WORK/.git" ]] || git -C "$REPO" worktree add -q --detach "$WORK"
cd "$WORK"
git fetch -q origin "$BRANCH"
git checkout -q -B photos-amazon "origin/$BRANCH"
flock -w 600 /run/lock/amazon-api.lock node scripts/photos-amazon.mjs
if git diff --quiet -- content/offres/photos-amazon.json; then echo "Photos inchangées."; exit 0; fi
git add content/offres/photos-amazon.json
git commit -qm "chore(photos): Amazon image URLs refreshed with prices (nightly, kept 24 h at most)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
for i in 1 2 3; do
  if git push -q origin "HEAD:$BRANCH"; then echo "Photos envoyées."; exit 0; fi
  git fetch -q origin "$BRANCH" && git rebase -q "origin/$BRANCH"
done
echo "Envoi impossible après 3 essais." >&2; exit 1

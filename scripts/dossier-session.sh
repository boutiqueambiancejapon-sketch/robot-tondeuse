#!/usr/bin/env bash
# Un dossier de travail par session (git worktree), pour ne jamais mélanger
# deux travaux dans le dossier commun du projet. Règle : tasks/equipe.md.
#
#   scripts/dossier-session.sh <branche>         crée ~/.cache/qrt-wt/<nom>
#   scripts/dossier-session.sh --fin <branche>   retire le dossier (la branche reste)
set -euo pipefail

EN_LIGNE="claude/setup-nextjs-apple-guide-En4gb"
RACINE="${QRT_WT_RACINE:-$HOME/.cache/qrt-wt}"

usage() { echo "usage : $0 <branche> | --fin <branche>" >&2; exit 1; }

# Dossier commun du projet, même si le script est lancé depuis un autre dossier de travail.
commun="$(cd "$(dirname "$0")/.." && cd "$(git rev-parse --git-common-dir)/.." && pwd)"

fin=0
if [ "${1:-}" = "--fin" ]; then fin=1; shift; fi
branche="${1:-}"
[ -n "$branche" ] || usage
dossier="$RACINE/${branche//\//-}"

if [ "$fin" = 1 ]; then
  # Refuse de retirer un dossier qui a des fichiers modifiés ou non enregistrés.
  git -C "$commun" worktree remove "$dossier"
  echo "Dossier retiré : $dossier (branche $branche gardée)"
  exit 0
fi

if [ -e "$dossier" ]; then
  echo "Existe déjà : $dossier" >&2
  exit 1
fi

mkdir -p "$RACINE"
git -C "$commun" fetch -q origin "$EN_LIGNE"
git -C "$commun" worktree add -q -b "$branche" "$dossier" "origin/$EN_LIGNE"
# Copie par liens durs : rapide, presque aucune place disque.
cp -al "$commun/node_modules" "$dossier/node_modules"
echo "$dossier"

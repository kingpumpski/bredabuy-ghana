#!/usr/bin/env bash

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROMPTS="$ROOT/.codespace-prompts"

echo "============================================================"
echo " BREDABUY GHANA — ARCHITECTURE RECONCILIATION"
echo "============================================================"

echo
echo "Prompt files:"
find "$PROMPTS" -maxdepth 1 -type f -name '*.md' | sort

echo
echo "IMPORTANT:"
echo "These files are agent instructions."
echo "The coding agent should execute them sequentially."
echo
echo "Do not automatically commit changes."
echo

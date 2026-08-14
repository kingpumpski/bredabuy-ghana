#!/usr/bin/env bash
set -u

BASE="origin/ai-upgrade-development"
RECON="origin/agent/phase-2-reconciliation"
SEARCH="origin/agent/phase-2-search-reconciliation"
FOLLOWUP="origin/agent/phase-2-followup"

echo "============================================================"
echo "BREDA BUY GHANA — PHASE 2 INTEGRATION ANALYSIS"
echo "============================================================"

echo
echo "=== CURRENT STATE ==="
echo "Branch: $(git branch --show-current)"
echo "HEAD:   $(git rev-parse HEAD)"
echo "Base:   $(git rev-parse "$BASE")"

echo
echo "============================================================"
echo "CORE RECONCILIATION COMMITS"
echo "============================================================"

for commit in \
  229daa7 \
  42b7a1a \
  2903aaa \
  a4c8f0f \
  9e28a48 \
  a24ce37c
do
  echo
  echo "------------------------------------------------------------"
  git show --stat --oneline --decorate "$commit"
  echo
  git show --format= --name-status "$commit"
done

echo
echo "============================================================"
echo "SEARCH / CART COMMITS"
echo "============================================================"

for commit in \
  24636c1 \
  9f72656 \
  38d409c \
  7fe4cbe \
  790df94 \
  4461f4d \
  f31a786 \
  94f1ff3 \
  6860157
do
  echo
  echo "------------------------------------------------------------"
  git show --stat --oneline --decorate "$commit"
  echo
  git show --format= --name-status "$commit"
done

echo
echo "============================================================"
echo "FOLLOW-UP COMMITS"
echo "============================================================"

git log --oneline "$BASE..$FOLLOWUP"

echo
echo "============================================================"
echo "FILE OVERLAP MATRIX"
echo "============================================================"

FILES="
src/app/router/routes.tsx
src/app/guards/ProtectedRoute.tsx
src/app/guards/PublicRoute.tsx
src/app/guards/AdminRoute.tsx
src/app/guards/SellerRoute.tsx
src/components/layout/StorefrontSearch.tsx
src/context/CartContext.tsx
.env
.env.example
.gitignore
"

for file in $FILES; do

  echo
  echo "------------------------------------------------------------"
  echo "FILE: $file"
  echo "------------------------------------------------------------"

  for branch in \
    "$BASE" \
    "$RECON" \
    "$SEARCH" \
    "$FOLLOWUP"
  do

    if git cat-file -e "$branch:$file" 2>/dev/null; then
      HASH=$(git show "$branch:$file" | sha256sum | awk '{print $1}')
      echo "$branch"
      echo "  SHA256: $HASH"
    else
      echo "$branch"
      echo "  MISSING"
    fi

  done

done

echo
echo "============================================================"
echo "UNIQUE SEARCH/CART FILES"
echo "============================================================"

git diff --name-only "$BASE..$SEARCH" \
  | grep -E \
  'features/(search|cart)|features/products/hooks/useProducts' \
  | sort -u

echo
echo "============================================================"
echo "SECURITY FILES"
echo "============================================================"

git diff --name-only "$BASE..$RECON" \
  | grep -E '^(\.env|\.gitignore|.*env)' \
  | sort -u

echo
echo "============================================================"
echo "INTEGRATION RULE"
echo "============================================================"

cat <<'RULES'

DO NOT MERGE ANY SOURCE BRANCH.

DO NOT CHERRY-PICK OVERLAPPING ROUTER/GUARD/SEARCH FILES
WITHOUT INSPECTING THE PATCH FIRST.

The integration order should generally be:

1. Security/environment changes
2. Canonical search service architecture
3. Canonical cart service architecture
4. Route reconciliation
5. Protected route reconciliation
6. Search UI reconciliation
7. Follow-up fixes

However, the actual order MUST be determined from the patches.

Do not modify source files during this analysis.

Do not commit.

Do not push.

RULES

echo
echo "============================================================"
echo "ANALYSIS COMPLETE"
echo "============================================================"
echo
echo "The output above is the integration map."
echo
echo "NO SOURCE FILES WERE MODIFIED."
echo "NO COMMITS WERE CREATED."
echo "NO PUSH WAS PERFORMED."

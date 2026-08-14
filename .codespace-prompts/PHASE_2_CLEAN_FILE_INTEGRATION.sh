#!/usr/bin/env bash
set -euo pipefail

echo "============================================================"
echo "BREDA BUY GHANA — PHASE 2 CLEAN FILE INTEGRATION"
echo "============================================================"

BASE="origin/ai-upgrade-development"
RECON="origin/agent/phase-2-reconciliation"
SEARCH="origin/agent/phase-2-search-reconciliation"
FOLLOWUP="origin/agent/phase-2-followup"

echo
echo "=== REFRESH REMOTES ==="
git fetch origin --prune

for ref in "$BASE" "$RECON" "$SEARCH" "$FOLLOWUP"; do
  git rev-parse --verify "$ref" >/dev/null
  echo "✓ $ref"
done

echo
echo "=== VERIFY CURRENT BRANCH ==="
CURRENT="$(git branch --show-current)"
echo "Branch: $CURRENT"

if [ "$CURRENT" != "phase-2-integrated-clean" ]; then
  echo "ERROR: This script must run on phase-2-integrated-clean."
  exit 1
fi

echo
echo "=== VERIFY BASE ==="
HEAD="$(git rev-parse HEAD)"
BASE_SHA="$(git rev-parse "$BASE")"

echo "HEAD:      $HEAD"
echo "BASE:      $BASE_SHA"

if [ "$HEAD" != "$BASE_SHA" ]; then
  echo "ERROR: HEAD is not the clean remote baseline."
  echo "Resetting would be destructive, so stopping."
  exit 1
fi

echo
echo "=== PRESERVE UNTRACKED DEVELOPMENT DOCUMENTATION ==="

git status --short

echo
echo "=== INTEGRATING SECURITY BASELINE ==="

git checkout "$RECON" -- \
  .env.example \
  .gitignore

if git ls-files --error-unmatch .env >/dev/null 2>&1; then
  git rm .env
fi

echo "✓ Security/environment reconciliation staged"

echo
echo "=== INTEGRATING CANONICAL ROUTING ==="

git checkout "$RECON" -- \
  src/app/router/routes.tsx \
  src/app/guards/ProtectedRoute.tsx \
  src/components/layout/StorefrontSearch.tsx

echo "✓ Canonical router"
echo "✓ Protected route"
echo "✓ Storefront search UI"

echo
echo "=== INTEGRATING CANONICAL SEARCH/CART ARCHITECTURE ==="

git checkout "$SEARCH" -- \
  src/features/search/types/search.types.ts \
  src/features/search/services/search.service.ts \
  src/features/search/index.ts \
  src/features/cart/services/cart.service.ts \
  src/features/cart/services/index.ts \
  src/features/cart/index.ts \
  src/features/products/hooks/useProducts.ts \
  src/context/CartContext.tsx

echo "✓ Search domain types"
echo "✓ Search service"
echo "✓ Search feature barrel"
echo "✓ Cart service"
echo "✓ Cart service barrel"
echo "✓ Cart feature barrel"
echo "✓ Product query reconciliation"
echo "✓ Cart context reconciliation"

echo
echo "=== INTEGRATING FOLLOW-UP AUTH GUARDS ==="

git checkout "$FOLLOWUP" -- \
  src/app/guards/AdminRoute.tsx \
  src/app/guards/PublicRoute.tsx \
  src/app/guards/SellerRoute.tsx

echo "✓ Admin route guard"
echo "✓ Public route guard"
echo "✓ Seller route guard"

echo
echo "============================================================"
echo "INTEGRATION COMPLETE — NO COMMIT CREATED"
echo "============================================================"

echo
echo "=== WORKING TREE ==="
git status --short

echo
echo "=== CHANGED FILES ==="
git diff --name-only

echo
echo "=== STAGED FILES ==="
git diff --cached --name-only

echo
echo "=== VALIDATING TYPESCRIPT ==="
npx tsc --noEmit

echo
echo "=== VALIDATING LINT ==="
npm run lint

echo
echo "=== VALIDATING PRODUCTION BUILD ==="
npm run build

echo
echo "============================================================"
echo "PHASE 2 CLEAN INTEGRATION VALIDATION COMPLETE"
echo "============================================================"

echo
echo "IMPORTANT:"
echo "No merge was performed."
echo "No cherry-pick was performed."
echo "No agent branch was merged."
echo "No commit was created."
echo "No push was performed."

echo
echo "Review the resulting diff before committing."

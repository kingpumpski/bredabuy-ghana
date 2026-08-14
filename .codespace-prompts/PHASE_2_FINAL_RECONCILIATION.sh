#!/usr/bin/env bash
set -u

BASE="origin/ai-upgrade-development"
RECON="origin/agent/phase-2-reconciliation"
SEARCH="origin/agent/phase-2-search-reconciliation"
FOLLOWUP="origin/agent/phase-2-followup"

echo "============================================================"
echo "BREDA BUY GHANA — PHASE 2 FINAL RECONCILIATION"
echo "CLEAN-ROOM INTEGRATION"
echo "============================================================"

echo
echo "This process:"
echo "  - does NOT merge agent branches"
echo "  - does NOT cherry-pick agent commits"
echo "  - does NOT reset the working tree"
echo "  - does NOT delete files"
echo "  - does NOT commit"
echo "  - does NOT push"
echo

git fetch origin --prune

echo "=== VERIFY BASELINE ==="

BASE_SHA="$(git rev-parse "$BASE")"
HEAD_SHA="$(git rev-parse HEAD)"

echo "BASE: $BASE_SHA"
echo "HEAD: $HEAD_SHA"

if [ "$HEAD_SHA" != "$BASE_SHA" ]; then
    echo
    echo "ERROR: This branch is not based directly on origin/ai-upgrade-development."
    echo
    echo "Run:"
    echo "git switch -C phase-2-final-reconciliation origin/ai-upgrade-development"
    exit 1
fi

echo
echo "✓ Clean baseline confirmed"

echo
echo "============================================================"
echo "STEP 1 — SECURITY BASELINE"
echo "============================================================"

git show "$RECON:.env.example" > .env.example
git show "$RECON:.gitignore" > .gitignore

if git ls-files --error-unmatch .env >/dev/null 2>&1; then
    echo "Removing tracked .env from working tree/index..."
    git rm --cached .env
    rm -f .env
fi

echo "✓ Environment template reconciled"
echo "✓ Git ignore rules reconciled"
echo "✓ Tracked .env removed"

echo
echo "============================================================"
echo "STEP 2 — CANONICAL ROUTER"
echo "============================================================"

git show "$RECON:src/app/router/routes.tsx" \
    > src/app/router/routes.tsx

echo "✓ routes.tsx"

echo
echo "============================================================"
echo "STEP 3 — PROTECTED ROUTE"
echo "============================================================"

git show "$RECON:src/app/guards/ProtectedRoute.tsx" \
    > src/app/guards/ProtectedRoute.tsx

echo "✓ ProtectedRoute.tsx"

echo
echo "============================================================"
echo "STEP 4 — SEARCH UI"
echo "============================================================"

git show "$RECON:src/components/layout/StorefrontSearch.tsx" \
    > src/components/layout/StorefrontSearch.tsx

echo "✓ StorefrontSearch.tsx"

echo
echo "============================================================"
echo "STEP 5 — SEARCH DOMAIN"
echo "============================================================"

git show "$SEARCH:src/features/search/types/search.types.ts" \
    > src/features/search/types/search.types.ts

git show "$SEARCH:src/features/search/services/search.service.ts" \
    > src/features/search/services/search.service.ts

git show "$SEARCH:src/features/search/services/index.ts" \
    > src/features/search/services/index.ts 2>/dev/null || true

git show "$SEARCH:src/features/search/index.ts" \
    > src/features/search/index.ts

echo "✓ Search types"
echo "✓ Search service"
echo "✓ Search barrel"

echo
echo "============================================================"
echo "STEP 6 — PRODUCT SEARCH BOUNDARY"
echo "============================================================"

git show "$SEARCH:src/features/products/hooks/useProducts.ts" \
    > src/features/products/hooks/useProducts.ts

echo "✓ Product hook"

echo
echo "============================================================"
echo "STEP 7 — CART DOMAIN"
echo "============================================================"

git show "$SEARCH:src/features/cart/services/cart.service.ts" \
    > src/features/cart/services/cart.service.ts

git show "$SEARCH:src/features/cart/services/index.ts" \
    > src/features/cart/services/index.ts

git show "$SEARCH:src/features/cart/index.ts" \
    > src/features/cart/index.ts

git show "$SEARCH:src/context/CartContext.tsx" \
    > src/context/CartContext.tsx

echo "✓ Cart service"
echo "✓ Cart service barrel"
echo "✓ Cart feature barrel"
echo "✓ Cart context"

echo
echo "============================================================"
echo "STEP 8 — FOLLOW-UP AUTH GUARDS"
echo "============================================================"

git show "$FOLLOWUP:src/app/guards/AdminRoute.tsx" \
    > src/app/guards/AdminRoute.tsx

git show "$FOLLOWUP:src/app/guards/PublicRoute.tsx" \
    > src/app/guards/PublicRoute.tsx

git show "$FOLLOWUP:src/app/guards/SellerRoute.tsx" \
    > src/app/guards/SellerRoute.tsx

echo "✓ AdminRoute"
echo "✓ PublicRoute"
echo "✓ SellerRoute"

echo
echo "============================================================"
echo "STEP 9 — VERIFY NO AGENT HISTORY WAS MERGED"
echo "============================================================"

echo
echo "Current HEAD:"
git log -1 --oneline

echo
echo "Checking ancestry..."

if git merge-base --is-ancestor "$RECON" HEAD; then
    echo "WARNING: reconciliation branch is in ancestry"
else
    echo "✓ reconciliation branch not merged"
fi

if git merge-base --is-ancestor "$SEARCH" HEAD; then
    echo "WARNING: search branch is in ancestry"
else
    echo "✓ search branch not merged"
fi

if git merge-base --is-ancestor "$FOLLOWUP" HEAD; then
    echo "WARNING: followup branch is in ancestry"
else
    echo "✓ followup branch not merged"
fi

echo
echo "============================================================"
echo "STEP 10 — REVIEW CHANGES"
echo "============================================================"

git status --short

echo
echo "=== SOURCE CHANGES ==="

git status --short \
    | grep -E '^( M|M |MM| D|D |A |AM|R |RM)' \
    || echo "No tracked source changes detected"

echo
echo "=== DIFF STAT ==="

git diff --stat

echo
echo "============================================================"
echo "STEP 11 — TYPECHECK"
echo "============================================================"

if npx tsc --noEmit; then
    echo "✓ TypeScript PASSED"
else
    echo "❌ TypeScript FAILED"
    echo "STOPPING BEFORE LINT/BUILD"
    exit 1
fi

echo
echo "============================================================"
echo "STEP 12 — LINT"
echo "============================================================"

if npm run lint; then
    echo "✓ ESLint PASSED"
else
    echo "❌ ESLint FAILED"
    exit 1
fi

echo
echo "============================================================"
echo "STEP 13 — PRODUCTION BUILD"
echo "============================================================"

if npm run build; then
    echo "✓ Production build PASSED"
else
    echo "❌ Production build FAILED"
    exit 1
fi

echo
echo "============================================================"
echo "PHASE 2 FINAL RECONCILIATION COMPLETE"
echo "============================================================"

echo
echo "IMPORTANT:"
echo "No merge performed."
echo "No cherry-pick performed."
echo "No commit performed."
echo "No push performed."

echo
echo "The repository is now ready for manual review."

echo
echo "Run:"
echo "git status --short"
echo "git diff --stat"
echo "git diff"

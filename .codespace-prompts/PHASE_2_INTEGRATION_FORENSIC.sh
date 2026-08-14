#!/usr/bin/env bash
set -u

echo "============================================================"
echo "BREDA BUY GHANA — PHASE 2 CLEAN INTEGRATION"
echo "============================================================"

BASE="origin/ai-upgrade-development"
RECON="origin/agent/phase-2-reconciliation"
SEARCH="origin/agent/phase-2-search-reconciliation"
FOLLOWUP="origin/agent/phase-2-followup"

echo
echo "=== SAFETY RULES ==="
echo "No push."
echo "No merge of stacked agent branches."
echo "No automatic deletion of source files."
echo "No force operations."
echo

git fetch origin --prune

echo "=== VERIFY REMOTES ==="

for ref in "$BASE" "$RECON" "$SEARCH" "$FOLLOWUP"; do
  if git rev-parse --verify "$ref" >/dev/null 2>&1; then
    echo "FOUND: $ref"
  else
    echo "MISSING: $ref"
    exit 1
  fi
done

echo
echo "=== CURRENT WORKING TREE ==="
git status --short

echo
echo "=== CREATE CLEAN INTEGRATION BRANCH ==="

CURRENT_BRANCH="$(git branch --show-current)"

if [ -n "$(git status --porcelain)" ]; then
  echo
  echo "WARNING: working tree contains uncommitted files."
  echo "The integration branch will NOT be created automatically."
  echo
  echo "Review:"
  git status --short
  exit 1
fi

git switch -c phase-2-integrated-clean "$BASE"

echo
echo "Integration branch:"
git branch --show-current

echo
echo "============================================================"
echo "PHASE 2 CHANGE ANALYSIS"
echo "============================================================"

echo
echo "=== CORE RECONCILIATION COMMITS ==="

git log --oneline "$BASE..$RECON"

echo
echo "=== SEARCH/CART COMMITS ==="

git log --oneline "$BASE..$SEARCH"

echo
echo "=== FOLLOW-UP COMMITS ==="

git log --oneline "$BASE..$FOLLOWUP"

echo
echo "============================================================"
echo "IMPORTANT"
echo "============================================================"
echo
echo "The following files overlap across branches:"
echo
echo "  src/app/router/routes.tsx"
echo "  src/app/guards/ProtectedRoute.tsx"
echo "  src/app/guards/AdminRoute.tsx"
echo "  src/app/guards/PublicRoute.tsx"
echo "  src/app/guards/SellerRoute.tsx"
echo "  src/components/layout/StorefrontSearch.tsx"
echo "  .env"
echo "  .env.example"
echo "  .gitignore"
echo
echo "These files MUST NOT be blindly merged."
echo
echo "============================================================"
echo "SELECTIVE INTEGRATION"
echo "============================================================"

echo
echo "The integration agent must now inspect each commit and"
echo "select only non-duplicating functional changes."

cat <<'INSTRUCTIONS'

YOU ARE NOW THE INTEGRATION AGENT.

Your objective is to reconcile Phase 2 changes into this clean branch.

SOURCE BRANCHES:

1. origin/agent/phase-2-reconciliation
2. origin/agent/phase-2-search-reconciliation
3. origin/agent/phase-2-followup

BASE:

origin/ai-upgrade-development

CRITICAL:

DO NOT merge the source branches.

DO NOT use:

git merge origin/agent/phase-2-reconciliation
git merge origin/agent/phase-2-search-reconciliation
git merge origin/agent/phase-2-followup

Instead inspect commits individually.

============================================================
CORE RECONCILIATION
============================================================

Review these core commits:

229daa7
42b7a1a
2903aaa
a4c8f0f
9e28a48
a24ce37c

Determine the functional changes introduced by each.

Prioritize:

- canonical storefront routes
- improved storefront search feedback
- environment security
- protected route return location

Do not duplicate changes already present in the target tree.

============================================================
SEARCH/CART RECONCILIATION
============================================================

Review:

24636c1
9f72656
38d409c
7fe4cbe
790df94
4461f4d
f31a786
94f1ff3
6860157

These represent the search/cart service architecture.

Determine whether each change is still required.

Prioritize:

- canonical search types
- canonical search service
- catalogue queries through search service
- canonical cart domain service
- cart calculations through service
- canonical cart service export
- search feature barrel
- cart service barrel

Do NOT create duplicate services.

============================================================
OVERLAPPING FILES
============================================================

For:

routes.tsx
ProtectedRoute.tsx
PublicRoute.tsx
AdminRoute.tsx
SellerRoute.tsx
StorefrontSearch.tsx
CartContext.tsx

DO NOT blindly cherry-pick commits.

Instead:

1. Inspect BASE version.
2. Inspect RECON version.
3. Inspect SEARCH version.
4. Inspect FOLLOWUP version.
5. Determine the final intended behavior.
6. Apply only the correct reconciled implementation.
7. Preserve functionality from all valid changes.

If necessary, manually reconcile the file.

============================================================
ENVIRONMENT SECURITY
============================================================

The final repository must NOT track:

.env

Never copy secret values into:

.env.example

The example file may contain variable names only.

Verify .gitignore protects local environment files.

Do not print secret values.

============================================================
FOLLOW-UP BRANCH
============================================================

Treat:

origin/agent/phase-2-followup

as a source of candidate fixes only.

Do not merge it wholesale.

Inspect its differences against BASE.

Only apply changes that are:

- genuinely new
- functionally necessary
- not already present
- compatible with the integrated architecture

============================================================
DOCUMENTATION
============================================================

Do not blindly copy duplicated reconciliation documents.

Preserve the authoritative documents:

docs/reconciliation/ARCHITECTURE_AUDIT.md
docs/reconciliation/PHASE_2_VALIDATION.md
docs/reconciliation/PHASE_3_PLAN.md

If duplicates exist, compare their contents before keeping them.

Do not delete documentation automatically.

============================================================
VALIDATION
============================================================

After integration:

npm run lint

npx tsc --noEmit

npm run build

All TypeScript errors must be fixed.

Do not suppress errors.

Warnings may remain if they are pre-existing and non-functional, but document them.

============================================================
SEARCH VALIDATION
============================================================

Verify:

SearchInput
  ↓
debounced query
  ↓
search hook/service
  ↓
search service
  ↓
data source
  ↓
results

Verify:

- no duplicate search requests
- loading state
- empty state
- error state
- stable results
- keyboard behavior
- mobile behavior
- search button interaction
- no stale output

============================================================
CART VALIDATION
============================================================

Verify:

Product
 ↓
Cart
 ↓
Cart Service
 ↓
Checkout

Ensure cart totals, quantities and item operations are not duplicated across unrelated layers.

============================================================
ROUTING VALIDATION
============================================================

Verify:

PUBLIC
CUSTOMER
SELLER
LOGISTICS
ADMIN

Ensure:

- no duplicate paths
- no broken imports
- no unreachable routes
- protected routes preserve return location
- role guards remain functional
- 404 route works

============================================================
SECURITY VALIDATION
============================================================

Search tracked files for:

service_role
SUPABASE_SERVICE_ROLE
PRIVATE_KEY
SECRET_KEY
STRIPE_SECRET
PAYSTACK_SECRET
FLUTTERWAVE_SECRET

Do not print secret values.

Only report whether suspicious values were found.

============================================================
COMMIT POLICY
============================================================

DO NOT:

git push

DO NOT merge into ai-upgrade-development.

You MAY create commits on:

phase-2-integrated-clean

only if the implementation and validation are complete.

However, preferably leave the branch uncommitted for developer review unless a commit is required to preserve the integration.

============================================================
FINAL REPORT
============================================================

Create:

docs/reconciliation/PHASE_2_INTEGRATION_VALIDATION.md

Include:

# Phase 2 Integration Validation

## 1. Integration Strategy

## 2. Core Reconciliation Changes

## 3. Search Reconciliation Changes

## 4. Cart Reconciliation Changes

## 5. Follow-up Changes

## 6. Overlapping Files Reconciled

## 7. Routes

## 8. Providers

## 9. Search

## 10. Cart

## 11. Security

## 12. Performance

## 13. TypeScript Validation

## 14. ESLint Validation

## 15. Production Build Validation

## 16. Remaining Issues

## 17. Files Changed

## 18. Recommended Phase 3 Starting Point

FINAL RESPONSE:

State clearly:

PHASE 2 INTEGRATION COMPLETE

or

PHASE 2 INTEGRATION BLOCKED

Do not proceed to Phase 3 automatically.

INSTRUCTIONS

echo
echo "============================================================"
echo "CLEAN INTEGRATION BRANCH READY"
echo "============================================================"

echo
echo "Branch:"
git branch --show-current

echo
echo "Base:"
git merge-base HEAD "$BASE"

echo
echo "Working tree:"
git status --short

echo
echo "IMPORTANT:"
echo "The integration agent must now perform selective reconciliation."
echo "Do not merge the three Phase 2 branches wholesale."
echo


#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  BREDA BUY GHANA — PHASE 3"
echo "  Production Reconciliation & Stabilization"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo
echo "PHASE 3 PRE-FLIGHT"
echo

test -f docs/reconciliation/ARCHITECTURE_AUDIT.md \
  || { echo "❌ ARCHITECTURE_AUDIT.md missing"; exit 1; }

test -f docs/reconciliation/PHASE_2_VALIDATION.md \
  || { echo "❌ PHASE_2_VALIDATION.md missing"; exit 1; }

test -f docs/reconciliation/PHASE_3_PLAN.md \
  || { echo "❌ PHASE_3_PLAN.md missing"; exit 1; }

echo "✓ Phase 1 audit found"
echo "✓ Phase 2 validation found"
echo "✓ Phase 3 plan found"

echo
echo "Repository:"
pwd

echo
echo "Branch:"
git branch --show-current

echo
echo "HEAD:"
git log -1 --oneline

echo
echo "Working tree:"
git status --short

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PHASE 3 AGENT INSTRUCTIONS"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cat <<'AGENT_INSTRUCTIONS'

You are the senior implementation engineer for the BredaBuy Ghana
repository.

You are operating inside GitHub Codespaces.

Your task is to execute PHASE 3 ONLY.

The authoritative documents are:

docs/reconciliation/ARCHITECTURE_AUDIT.md
docs/reconciliation/PHASE_2_VALIDATION.md
docs/reconciliation/PHASE_3_PLAN.md

READ ALL THREE DOCUMENTS COMPLETELY BEFORE MODIFYING SOURCE CODE.

============================================================
CRITICAL SAFETY RULES
============================================================

Do NOT:

- reset the repository
- checkout another branch
- delete working application functionality
- rewrite the application from scratch
- introduce duplicate implementations
- introduce unnecessary dependencies
- expose secrets
- modify environment secrets
- commit changes
- push changes
- run git add
- run git commit
- run git push

The developer will review and commit the changes manually.

Preserve all currently working functionality.

============================================================
STEP 1 — ESTABLISH CURRENT BASELINE
============================================================

Inspect:

src/main.*
src/App.*
src/app/
src/features/
src/components/
src/context/
src/providers/
src/hooks/
src/services/
src/store/
src/lib/
src/types/
src/utils/

Also inspect:

package.json
tsconfig.*
vite.config.*
eslint configuration
Tailwind configuration

Determine what Phase 2 actually changed.

Do not assume the Phase 2 report is perfect.

Verify the current repository state against the source code.

============================================================
STEP 2 — ARCHITECTURE RECONCILIATION
============================================================

Maintain a clean dependency direction:

main
↓
App
↓
providers
↓
router
↓
layouts
↓
pages
↓
feature hooks
↓
feature services
↓
API/data layer

Prevent:

services → UI
services → router
services → pages
pages → low-level API
duplicate state ownership

Only refactor when there is a demonstrated architectural problem.

============================================================
STEP 3 — PROVIDERS
============================================================

Verify the complete provider hierarchy.

Check for:

- hooks outside providers
- duplicate providers
- incorrect provider ordering
- unnecessary providers
- provider initialization failures
- authentication availability before protected routes
- cart availability
- query/data availability
- theme availability

Repair only genuine problems.

============================================================
STEP 4 — ROUTING
============================================================

Establish one canonical router.

Verify:

PUBLIC
CUSTOMER
SELLER
LOGISTICS
ADMIN

Check:

- duplicate paths
- broken imports
- unreachable routes
- incorrect route components
- missing guards
- incorrect role checks
- fallback handling
- lazy loading

Do not create duplicate routing systems.

============================================================
STEP 5 — PAGE RECONCILIATION
============================================================

Inspect all routes and navigation.

Find:

- missing pages
- placeholder pages
- disconnected pages
- pages with incorrect services
- pages with broken navigation

Implement only pages whose business purpose is supported by the existing
architecture.

Every implemented page must include appropriate:

- loading state
- error state
- empty state
- navigation
- responsive layout

============================================================
STEP 6 — SERVICE/DATA FLOW
============================================================

Establish:

Page
↓
Feature Hook
↓
Feature Service
↓
API/Data Layer

Inspect:

products
search
cart
checkout
orders
payments
wallet
sellers
logistics
admin
notifications

Remove or reconcile duplicate service implementations only when their
functional equivalence has been verified.

Do not remove working functionality.

============================================================
STEP 7 — SEARCH
============================================================

There must be ONE canonical search implementation.

Expected flow:

SearchInput
↓
debounced query
↓
search hook
↓
search service
↓
data/API source
↓
results

Fix genuine problems involving:

- search button animation
- stale results
- duplicate requests
- missing debounce
- unstable result positioning
- incorrect output
- loading state
- empty state
- error state
- keyboard interaction
- mobile interaction

Do not create a second search implementation.

Use request cancellation or stale-result protection where appropriate.

============================================================
STEP 8 — CART
============================================================

Ensure one authoritative cart state.

Verify:

- add item
- remove item
- quantity changes
- totals
- persistence
- product → cart navigation
- cart → checkout navigation
- empty cart
- unavailable products

Prevent duplicate cart state between contexts/stores.

============================================================
STEP 9 — CHECKOUT
============================================================

Verify:

Cart
↓
Checkout
↓
Payment
↓
Verification
↓
Order
↓
Confirmation

Prevent:

- duplicate submission
- accidental double payment
- premature cart clearing
- invalid order creation
- stale checkout data

============================================================
STEP 10 — PAYMENTS
============================================================

Payment must remain service-controlled.

Never expose:

- private payment keys
- service-role credentials
- backend credentials

Do not make the frontend authoritative for payment verification.

Ensure payment status is validated before final order confirmation.

============================================================
STEP 11 — WALLET
============================================================

Wallet balance must never be directly mutated by UI components.

Use:

UI
↓
Wallet Hook
↓
Wallet Service
↓
Authoritative Backend/Data Layer

Verify transaction history and balance consistency.

============================================================
STEP 12 — ORDERS & LOGISTICS
============================================================

Verify:

Order
↓
Shipment
↓
Logistics
↓
Tracking
↓
Delivery

Ensure order and shipment state are not duplicated unnecessarily.

Ensure customer order history reflects authoritative order state.

============================================================
STEP 13 — PERFORMANCE
============================================================

Optimize verified bottlenecks only.

Prioritize:

- route-level lazy loading
- duplicate request elimination
- sensible query caching
- stable query keys
- unnecessary context updates
- large lists
- expensive render calculations
- startup work
- image loading
- bundle size

Do not add memoization everywhere.

Do not add libraries unless necessary.

============================================================
STEP 14 — UI CONSISTENCY
============================================================

Use existing shared components.

Prefer:

components/ui/
components/layout/
components/shared/

Avoid creating duplicate:

- buttons
- cards
- dialogs
- headers
- navigation
- tables
- status components

Preserve BredaBuy Ghana's identity:

Forest Green
Gold
Kente Red
Cream
Charcoal

Ensure responsive and accessible interfaces.

============================================================
STEP 15 — SECURITY
============================================================

Inspect frontend source for:

- secrets
- service-role keys
- private API keys
- insecure authorization
- unsafe HTML
- weak validation
- exposed administrative operations

Never print secret values.

If a secret is discovered, report its file/location without exposing the
value.

============================================================
STEP 16 — VALIDATION
============================================================

After each logical group run:

npx tsc --noEmit
npm run lint
npm run build

Do not suppress errors.

Existing ESLint warnings may remain if they are non-critical, but evaluate
whether they are caused by Phase 3 changes.

Do not leave TypeScript errors.

Production build must pass.

============================================================
STEP 17 — FINAL REVIEW
============================================================

Before finishing inspect:

git status --short
git diff --stat
git diff --name-only

Ensure no unexpected files were modified.

Do NOT stage or commit anything.

============================================================
STEP 18 — CREATE VALIDATION REPORT
============================================================

Create:

docs/reconciliation/PHASE_3_VALIDATION.md

Include:

# Phase 3 Validation

## Executive Summary

## Architecture Changes

## Provider Changes

## Route Changes

## Feature Changes

## Service/Data Changes

## Search Changes

## Cart/Checkout Changes

## Payment Changes

## Wallet Changes

## Order/Logistics Changes

## Performance Changes

## UI/UX Changes

## Security Changes

## Placeholder Reconciliation

## Validation Results

## Files Changed

## Remaining Issues

## Recommended Phase 4

The report must distinguish between:

- completed
- partially completed
- not implemented
- blocked
- intentionally retained

Do not claim a feature works unless it was actually verified.

============================================================
STOP CONDITION
============================================================

PHASE 3 MUST STOP HERE.

Do not start Phase 4.

Do not commit.

Do not push.

At the end print:

PHASE 3 COMPLETE — WAITING FOR DEVELOPER REVIEW

AGENT_INSTRUCTIONS

echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "PHASE 3 INSTRUCTIONS READY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "The Codespaces agent should now execute the instructions above."
echo
echo "IMPORTANT:"
echo "This script does not commit or push changes."
echo "Review the working tree after Phase 3."

#!/usr/bin/env bash

# ==============================================================================
# BREDABUY GHANA
# PHASE 2 — ARCHITECTURE RECONCILIATION EXECUTOR
# ==============================================================================

set -u

PROJECT_ROOT="/workspaces/bredabuy-ghana"
AUDIT_FILE="$PROJECT_ROOT/docs/reconciliation/ARCHITECTURE_AUDIT.md"
REPORT_FILE="$PROJECT_ROOT/docs/reconciliation/PHASE_2_VALIDATION.md"

GOLD='\033[38;5;220m'
FOREST='\033[38;5;22m'
FOREST_LIGHT='\033[38;5;29m'
KENTE_RED='\033[38;5;160m'
CREAM='\033[38;5;230m'
WHITE='\033[1;37m'
MUTED='\033[38;5;245m'
GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[1;36m'
MAGENTA='\033[1;35m'
NC='\033[0m'

cd "$PROJECT_ROOT" || {
    echo -e "${RED}✗ Cannot access $PROJECT_ROOT${NC}"
    exit 1
}

separator() {
    echo -e "${GOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

header() {
    echo
    separator
    echo -e "${GOLD}  BREDABUY GHANA — PHASE 2${NC}"
    echo -e "${WHITE}  Architecture Reconciliation${NC}"
    separator
    echo
}

fail() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

run_check() {
    local label="$1"
    shift

    echo -e "${CYAN}▶ $label${NC}"

    if "$@"; then
        echo -e "${GREEN}✓ $label passed${NC}"
        return 0
    else
        echo -e "${RED}✗ $label failed${NC}"
        return 1
    fi
}

# ==============================================================================
# PRE-FLIGHT
# ==============================================================================

header

echo -e "${WHITE}PHASE 2 PRE-FLIGHT${NC}"
echo

if [ ! -f "$AUDIT_FILE" ]; then
    fail "Phase 1 audit not found: $AUDIT_FILE"
fi

echo -e "${GREEN}✓ Phase 1 architecture audit found${NC}"

echo
echo -e "${GOLD}Repository:${NC} $PROJECT_ROOT"
echo -e "${GOLD}Branch:${NC} $(git branch --show-current)"
echo -e "${GOLD}HEAD:${NC} $(git log -1 --oneline)"

echo

# ==============================================================================
# PROTECT AGAINST UNEXPECTED WORKING TREE CHANGES
# ==============================================================================

echo -e "${WHITE}CURRENT WORKING TREE${NC}"
git status --short

echo

# ==============================================================================
# READ PHASE 1 AUDIT
# ==============================================================================

echo -e "${WHITE}PHASE 1 AUDIT SUMMARY${NC}"
echo

grep -E '^## |^### ' "$AUDIT_FILE" || true

echo

# ==============================================================================
# PHASE 2 INSTRUCTIONS FOR THE CODESPACES AGENT
# ==============================================================================

cat <<'PROMPT'

================================================================================
PHASE 2 — ARCHITECTURE RECONCILIATION
================================================================================

You are now the implementation agent for the BredaBuy Ghana repository.

The Phase 1 architecture audit is available at:

docs/reconciliation/ARCHITECTURE_AUDIT.md

You MUST read the complete audit before modifying source code.

OBJECTIVE
---------

Reconcile the existing application with the recommended architecture from
Phase 1 while preserving working functionality.

IMPORTANT:

Do NOT blindly rewrite the application.

Do NOT create duplicate implementations.

Do NOT replace working services merely to make the folder structure look clean.

Use the Phase 1 audit as the source of truth.

================================================================================
PHASE 2.1 — ARCHITECTURE BASELINE
================================================================================

Read:

docs/reconciliation/ARCHITECTURE_AUDIT.md
docs/reconciliation/REPOSITORY_STATE.md

Determine:

1. Current application entry point
2. Provider hierarchy
3. Router implementation
4. Feature boundaries
5. Service boundaries
6. State-management strategy
7. API/data-fetching strategy
8. Shared UI architecture

Before changing anything, identify the minimum changes required.

================================================================================
PHASE 2.2 — APPLICATION SHELL
================================================================================

Reconcile:

src/main.*
src/App.*
src/app/providers/
src/app/router/
src/app/layouts/

The application shell should have a clear dependency direction:

main
  ↓
App
  ↓
global providers
  ↓
router
  ↓
layouts
  ↓
feature pages
  ↓
feature hooks
  ↓
services/API

Do not allow:

services → components
services → pages
services → router
hooks → UI implementation
pages → direct low-level API calls

Preserve existing working provider functionality.

================================================================================
PHASE 2.3 — PROVIDER RECONCILIATION
================================================================================

Audit and repair provider nesting.

Ensure:

AuthProvider
  ↓
Query/Data Provider
  ↓
Application State Providers
  ↓
Router
  ↓
Protected Layouts
  ↓
Pages

Use the actual providers discovered in the repository.

Do NOT invent providers that are unnecessary.

Ensure no hook is executed outside its required provider.

================================================================================
PHASE 2.4 — ROUTER RECONCILIATION
================================================================================

Build one canonical route architecture.

Separate routes logically into:

PUBLIC
CUSTOMER
SELLER
LOGISTICS
ADMIN

Ensure:

- no duplicate paths
- no broken imports
- no unreachable routes
- no placeholder routes
- proper authentication guards
- proper role/permission guards
- proper 404 handling
- lazy loading for suitable feature pages

Do not create duplicate routers.

================================================================================
PHASE 2.5 — FEATURE ARCHITECTURE
================================================================================

Where appropriate, organize features as:

src/features/<feature>/

with:

pages/
components/
hooks/
services/
types/
schemas/

Only create directories that correspond to real business domains.

Prioritize:

auth
account
products
search
cart
checkout
orders
payments
wallet
sellers
logistics
notifications
admin

Do not move files merely for cosmetic reasons.

If moving a file is necessary:

1. update imports
2. update routes
3. update tests
4. verify references
5. run TypeScript
6. run lint
7. run build

================================================================================
PHASE 2.6 — SERVICE/DATA BOUNDARIES
================================================================================

Establish a canonical data flow:

Page
 ↓
Feature Hook
 ↓
Feature Service
 ↓
API/Data Layer
 ↓
Backend/Supabase/API

Pages must not directly perform low-level API operations when an existing
service abstraction exists.

Remove duplicate service implementations only after confirming they are
functionally equivalent.

Do not delete business functionality.

================================================================================
PHASE 2.7 — SEARCH RECONCILIATION
================================================================================

Create one canonical search flow.

Search should have:

SearchInput
 ↓
debounced query
 ↓
search hook
 ↓
search service
 ↓
API/data source
 ↓
SearchResults

Requirements:

- debounce input
- avoid duplicate requests
- preserve query state
- loading state
- empty state
- error state
- keyboard navigation where appropriate
- mobile-friendly results
- stable result positioning
- proper button animation
- no animation that blocks interaction
- no stale search output

Do not introduce a second search implementation.

================================================================================
PHASE 2.8 — CART/CHECKOUT/ORDER FLOW
================================================================================

Verify the complete flow:

Product
 ↓
Cart
 ↓
Checkout
 ↓
Payment
 ↓
Order
 ↓
Shipment
 ↓
Delivery
 ↓
Order History

Ensure each stage communicates through established services.

Do not duplicate order state between unrelated contexts/stores.

Prevent duplicate checkout submissions.

================================================================================
PHASE 2.9 — PAYMENT/WALLET SAFETY
================================================================================

Payment flow:

Checkout
 ↓
Payment Service
 ↓
Payment Provider
 ↓
Payment Verification
 ↓
Order Confirmation

Wallet operations must go through wallet services.

Never directly mutate wallet balance from UI components.

Never expose:

service-role keys
private API keys
payment secrets
backend credentials

in frontend source.

================================================================================
PHASE 2.10 — UI ARCHITECTURE
================================================================================

Use the existing design system.

Prefer:

components/ui/
components/layout/
components/shared/

Features should compose shared components rather than creating duplicate
buttons, cards, headers, tables, dialogs and status indicators.

Preserve BredaBuy Ghana identity:

Forest Green
Gold
Kente Red
Cream
Charcoal

Modernize only where needed.

Ensure:

- responsive layouts
- consistent spacing
- clear hierarchy
- accessible controls
- keyboard focus
- loading states
- empty states
- error states
- mobile usability

================================================================================
PHASE 2.11 — PERFORMANCE
================================================================================

Optimize only verified bottlenecks.

Prioritize:

- route-level lazy loading
- code splitting
- duplicate request elimination
- sensible caching
- stable query keys
- avoiding unnecessary context updates
- memoization only where beneficial
- optimized list rendering
- image loading optimization
- minimizing startup work

Do NOT add memoization everywhere.

Do NOT introduce unnecessary dependencies.

================================================================================
PHASE 2.12 — MISSING PAGE RECONCILIATION
================================================================================

Use the Phase 1 route inventory.

For every referenced but missing page:

1. determine its business purpose
2. identify its service dependencies
3. identify its access requirements
4. implement it inside the correct feature
5. connect it to the canonical router
6. provide loading/error/empty states
7. verify navigation to and from the page

Do NOT create pages that are not supported by the application's architecture.

================================================================================
PHASE 2.13 — VALIDATION AFTER EACH LOGICAL CHANGE
================================================================================

After each major reconciliation:

npm run lint
npx tsc --noEmit
npm run build

Fix errors before continuing.

Do not suppress TypeScript or ESLint errors simply to make the build pass.

================================================================================
PHASE 2.14 — DO NOT COMMIT
================================================================================

Do NOT execute:

git add
git commit
git push

The developer will review the changes first.

================================================================================
PHASE 2.15 — FINAL PHASE 2 VALIDATION
================================================================================

At the end verify:

1. Application starts
2. Public pages load
3. Authentication flow works
4. Customer routes work
5. Seller routes work
6. Admin routes work
7. Product catalogue works
8. Search works
9. Cart works
10. Checkout works
11. Payment flow is protected
12. Wallet remains service-controlled
13. Orders remain consistent
14. Logistics remains connected
15. No duplicate providers
16. No duplicate routers
17. No duplicate services
18. No broken imports
19. No genuine placeholders
20. No frontend secrets
21. TypeScript passes
22. ESLint passes
23. Production build passes

================================================================================
STOP CONDITION
================================================================================

When Phase 2 implementation and validation are complete:

Create:

docs/reconciliation/PHASE_2_VALIDATION.md

The report must contain:

# Phase 2 Reconciliation Validation

## Architecture Changes
## Provider Changes
## Route Changes
## Feature Changes
## Service/Data Changes
## Search Changes
## Performance Changes
## UI Changes
## Security Changes
## Missing Pages Implemented
## Remaining Issues
## Validation Results
## Files Changed
## Recommended Phase 3

Do NOT proceed to Phase 3.

================================================================================
END PHASE 2
================================================================================

PROMPT

# ==============================================================================
# RUN BASELINE VALIDATION
# ==============================================================================

echo
echo -e "${WHITE}BASELINE VALIDATION${NC}"
separator

BASELINE_FAILED=0

if ! npx tsc --noEmit; then
    echo -e "${RED}✗ TypeScript baseline currently fails${NC}"
    BASELINE_FAILED=1
else
    echo -e "${GREEN}✓ TypeScript baseline passes${NC}"
fi

if ! npm run lint; then
    echo -e "${RED}✗ ESLint baseline currently fails${NC}"
    BASELINE_FAILED=1
else
    echo -e "${GREEN}✓ ESLint baseline passes${NC}"
fi

if ! npm run build; then
    echo -e "${RED}✗ Production build baseline currently fails${NC}"
    BASELINE_FAILED=1
else
    echo -e "${GREEN}✓ Production build baseline passes${NC}"
fi

# ==============================================================================
# CREATE VALIDATION REPORT SCAFFOLD
# ==============================================================================

cat > "$REPORT_FILE" <<EOF
# Phase 2 Reconciliation Validation

## Status

Phase 2 reconciliation executor initialized.

## Phase 1 Audit

- Audit: \`docs/reconciliation/ARCHITECTURE_AUDIT.md\`
- Repository state: \`docs/reconciliation/REPOSITORY_STATE.md\`

## Baseline Validation

- TypeScript baseline: $(if [ "$BASELINE_FAILED" -eq 0 ]; then echo "PASS"; else echo "FAIL — existing baseline issues must be reconciled"; fi)
- ESLint baseline: see execution output
- Production build baseline: see execution output

## Important

This file is a validation scaffold. The Codespaces agent must update it
after implementing Phase 2.

## Commit Policy

No commit or push should be performed automatically.
EOF

# ==============================================================================
# FINAL STATUS
# ==============================================================================

echo
separator

if [ "$BASELINE_FAILED" -eq 0 ]; then
    echo -e "${GREEN}✓ Phase 2 pre-flight completed successfully.${NC}"
else
    echo -e "${YELLOW}⚠ Baseline validation contains existing issues.${NC}"
    echo -e "${YELLOW}  The agent must reconcile them rather than hiding them.${NC}"
fi

echo
echo -e "${GOLD}Phase 1 audit:${NC}"
echo "  $AUDIT_FILE"

echo
echo -e "${GOLD}Phase 2 validation:${NC}"
echo "  $REPORT_FILE"

echo
echo -e "${GOLD}Next action:${NC}"
echo -e "${CYAN}Use the Phase 2 instructions above with the Codespaces agent.${NC}"

echo
echo -e "${YELLOW}IMPORTANT:${NC}"
echo "This script does not commit or push changes."
echo "Review the working tree before committing."

exit 0

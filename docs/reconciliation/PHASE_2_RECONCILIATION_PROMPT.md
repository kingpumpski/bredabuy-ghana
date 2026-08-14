# BREDA BUY GHANA — PHASE 2
# ARCHITECTURE RECONCILIATION & FOUNDATION STABILIZATION

You are the senior software architect and implementation engineer for the
BredaBuy Ghana repository.

PHASE 1 has already been completed.

The authoritative audit is:

docs/reconciliation/ARCHITECTURE_AUDIT.md

Your task is to perform PHASE 2 ONLY.

============================================================
CRITICAL IMPLEMENTATION RULES
============================================================

Use the Phase 1 audit as the primary source of truth.

DO NOT perform a wholesale rewrite.

DO NOT delete working functionality merely because it does not perfectly
match the proposed architecture.

DO NOT create duplicate implementations.

DO NOT introduce mock services where real services already exist.

DO NOT replace working business logic with demonstration code.

DO NOT modify database schemas unless the Phase 1 audit explicitly
identifies a database issue that is required for the current application
to function.

DO NOT change payment-provider logic unless required to fix a verified
application problem.

DO NOT expose secrets.

Preserve existing functionality wherever it is working.

The target architecture is feature-oriented, but migration must be
incremental.

============================================================
TARGET ARCHITECTURE
============================================================

Prefer:

src/
├── app/
│   ├── config/
│   ├── providers/
│   ├── router/
│   └── layouts/
│
├── features/
│   ├── auth/
│   ├── account/
│   ├── products/
│   ├── search/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── payments/
│   ├── wallet/
│   ├── sellers/
│   ├── logistics/
│   ├── notifications/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── services/
│   ├── api/
│   └── integrations/
│
├── hooks/
├── lib/
├── store/
├── types/
└── utils/

However:

DO NOT force files into this structure simply for appearance.

Only migrate a module when doing so improves maintainability and does not
break imports, routing, state, or runtime behavior.

============================================================
PHASE 2 OBJECTIVES
============================================================

Resolve the architecture problems identified in:

docs/reconciliation/ARCHITECTURE_AUDIT.md

Focus on:

1. Application foundation
2. Provider hierarchy
3. Routing architecture
4. Service/data boundaries
5. State management
6. Feature boundaries
7. Shared UI boundaries
8. Authentication flow
9. Search architecture
10. Performance foundations

Do not proceed to major feature expansion yet.

============================================================
STEP 1 — READ THE AUDIT
============================================================

Read:

docs/reconciliation/ARCHITECTURE_AUDIT.md

Extract:

- architecture conflicts
- duplicate implementations
- broken providers
- broken routes
- missing pages
- service/data problems
- search problems
- performance problems
- security problems
- recommended architecture
- migration order

Before making changes, determine which findings are:

CRITICAL
HIGH
MEDIUM
LOW

Prioritize:

CRITICAL → HIGH → MEDIUM → LOW

Do not blindly implement recommendations that contradict the actual
repository.

============================================================
STEP 2 — CREATE RECONCILIATION PLAN
============================================================

Create:

docs/reconciliation/PHASE_2_RECONCILIATION_PLAN.md

Document:

1. Problems being fixed
2. Files affected
3. Files intentionally preserved
4. Files being consolidated
5. Providers being changed
6. Routes being changed
7. Services being consolidated
8. State management changes
9. Risks
10. Validation strategy

Do not begin large refactors until the plan is documented.

============================================================
STEP 3 — STABILIZE APPLICATION ENTRY
============================================================

Inspect:

src/main.*
src/App.*
src/app/providers/
src/app/config/
src/app/layouts/

Establish a clean application startup flow:

main
→ App
→ AppProviders
→ Router
→ Layout
→ Feature Page

Ensure:

- providers initialize in a deterministic order
- authentication is available before protected routing
- global error handling is mounted
- router initialization does not depend on unavailable contexts
- application startup does not contain unnecessary asynchronous work
- duplicate providers are removed or consolidated
- provider names are consistent

IMPORTANT:

Do not create a provider merely because the architecture diagram contains
one.

Only create providers required by actual application behavior.

============================================================
STEP 4 — FIX PROVIDER HIERARCHY
============================================================

Inspect every context/provider.

Examples:

- Auth
- Cart
- Wishlist
- Wallet
- Orders
- Notifications
- Theme
- Query/Data fetching

For every provider determine:

- owner
- dependencies
- consumers
- initialization requirements

Establish a logical hierarchy.

Expected general pattern:

App
└── Error Boundary
    └── Global Configuration
        └── Query/Data Provider
            └── Authentication
                └── Domain Providers
                    └── Router
                        └── Layouts
                            └── Pages

Adjust this pattern when repository requirements dictate otherwise.

Fix:

- hooks used outside providers
- providers mounted more than once
- circular provider dependencies
- provider initialization crashes
- unnecessary provider nesting
- duplicated context state

Do not duplicate state between context and store without a clear reason.

============================================================
STEP 5 — RECONCILE ROUTING
============================================================

Inspect the complete router.

Create a single authoritative route architecture.

Separate routes conceptually into:

PUBLIC
AUTHENTICATED CUSTOMER
SELLER
LOGISTICS
ADMIN

Ensure:

- route definitions have one source of truth
- lazy loading is used where beneficial
- route guards are centralized
- duplicate paths are removed
- broken imports are corrected
- missing components are identified
- fallback/404 handling exists
- unauthorized users cannot access protected pages
- authenticated users do not unnecessarily reload application state
- route transitions do not recreate global providers

Do not duplicate route definitions in multiple files.

If multiple router files exist, consolidate carefully.

============================================================
STEP 6 — ESTABLISH FEATURE BOUNDARIES
============================================================

For each domain:

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

determine:

- page ownership
- hooks
- services
- types
- state
- components

A feature should own its domain behavior.

Prefer:

features/products/
    pages/
    components/
    hooks/
    services/
    types/

rather than scattering product-specific logic throughout unrelated folders.

Do not move files unnecessarily.

When a legacy location is already stable, document the migration rather
than breaking it.

============================================================
STEP 7 — RECONCILE SERVICE LAYER
============================================================

Establish:

UI
→ feature hook
→ feature/service boundary
→ shared API client
→ backend/data source

Pages should not directly contain API implementation.

Services must not import UI components.

Do not allow:

page
→ fetch()
→ database/API implementation

when an existing service abstraction is available.

Consolidate duplicate:

- API clients
- product services
- order services
- cart services
- payment services
- wallet services
- seller services
- search services

Do not delete a duplicate until its consumers have been migrated.

After migration, remove only confirmed dead implementations.

============================================================
STEP 8 — DATA FETCHING AND CACHE
============================================================

Inspect the existing data-fetching approach.

If TanStack Query or another established data layer already exists,
preserve and standardize it.

Ensure:

- stable query keys
- appropriate stale times
- controlled refetching
- loading states
- empty states
- error states
- retry behavior
- mutation invalidation
- no duplicate requests

Avoid global state for server data when the repository already has a
server-state solution.

Do not introduce another data-fetching library.

============================================================
STEP 9 — STATE MANAGEMENT RECONCILIATION
============================================================

Determine what belongs in:

- local component state
- feature state
- global client state
- server/cache state

Avoid duplicating the same data in:

Context + Zustand/store + React Query + component state

Choose one authoritative owner for each state category.

Preserve existing state libraries unless the audit proves they are causing
a significant architectural problem.

============================================================
STEP 10 — SEARCH FOUNDATION
============================================================

Fix the architecture behind search.

Search should follow:

SearchInput
→ search state
→ debounce
→ search service
→ API/data source
→ normalized results
→ result presentation

Ensure:

- input remains responsive
- debounce prevents unnecessary requests
- search button does not trigger duplicate requests
- Enter key works
- button click works
- loading state is visible
- empty results are handled
- errors are handled
- stale results do not overwrite newer results
- mobile search works
- result container is positioned correctly

Do not redesign the search UI yet.

This phase establishes correct behavior.

============================================================
STEP 11 — FIX SEARCH ANIMATION/OUTPUT BUGS
============================================================

Investigate the reported search problems.

Determine whether animation/output problems originate from:

- CSS transitions
- conditional rendering
- stale state
- asynchronous requests
- duplicate state
- incorrect event handling
- race conditions
- incorrect positioning
- overflow/z-index
- component remounting

Fix the root cause.

Do not hide the problem with arbitrary delays.

Do not use setTimeout as a substitute for proper state management.

============================================================
STEP 12 — AUTHENTICATION FOUNDATION
============================================================

Ensure:

Auth initialization
→ session restoration
→ user state
→ authorization
→ protected routes

works reliably.

Check:

- refresh
- initial load
- logout
- session expiration
- protected routes
- unauthorized access
- authenticated navigation

Do not redesign authentication credentials or backend authentication
unless required by a verified defect.

============================================================
STEP 13 — ERROR HANDLING
============================================================

Establish consistent handling for:

- network errors
- API errors
- authentication errors
- authorization errors
- validation errors
- unexpected runtime errors

Use shared mechanisms where appropriate.

Pages should display meaningful states rather than silently failing.

============================================================
STEP 14 — PERFORMANCE FOUNDATION
============================================================

Implement only evidence-based improvements.

Focus on:

- route-level lazy loading
- feature-level code splitting
- preventing unnecessary provider rerenders
- stable callbacks where necessary
- query caching
- avoiding duplicate requests
- reducing unnecessary startup work
- efficient list rendering
- removing confirmed dead code
- reducing unnecessary imports

Do NOT blindly add:

React.memo
useMemo
useCallback

unless there is a real performance reason.

============================================================
STEP 15 — SHARED UI FOUNDATION
============================================================

Consolidate shared components.

Use:

src/components/ui/
src/components/layout/
src/components/shared/

for genuinely reusable components.

Avoid creating:

ButtonV2
CardV2
HeaderNew
PageHeader2
SearchBarNew

when an existing component can be enhanced.

Establish consistent:

- page container
- page header
- breadcrumbs
- buttons
- cards
- badges
- data tables
- loading states
- empty states
- error states
- dialogs
- forms

Do not perform the full visual redesign yet.

============================================================
STEP 16 — SECURITY FOUNDATION
============================================================

Fix verified security issues from the audit.

Ensure:

- no secrets in src/
- no service-role credentials in frontend
- environment variables are used correctly
- protected routes enforce authorization
- admin functionality is protected
- seller data is isolated
- unsafe HTML rendering is avoided
- sensitive data is not unnecessarily persisted in localStorage

Never print secret values.

============================================================
STEP 17 — REMOVE CONFIRMED DUPLICATES
============================================================

After migration, identify dead duplicates.

Only remove a duplicate when:

1. Consumers have been migrated
2. No route references it
3. No imports reference it
4. No tests reference it
5. No runtime path requires it

Do not remove uncertain files.

Record removals in:

docs/reconciliation/PHASE_2_RECONCILIATION_PLAN.md

============================================================
STEP 18 — VALIDATE AFTER EACH MAJOR CHANGE
============================================================

Run:

npx tsc --noEmit
npm run lint
npm run build

After every major architectural modification.

If a validation fails:

STOP.

Diagnose the failure.

Fix it before continuing.

Do not continue stacking broken changes.

============================================================
STEP 19 — RUNTIME VERIFICATION
============================================================

Start the development server using the repository's existing command.

Inspect:

- application startup
- home page
- authentication
- customer routes
- product routes
- search
- cart
- checkout
- protected routes

Do not assume build success means runtime success.

Check browser console/runtime errors if available.

============================================================
STEP 20 — UPDATE RECONCILIATION DOCUMENTATION
============================================================

Update:

docs/reconciliation/PHASE_2_RECONCILIATION_PLAN.md

with:

- completed changes
- preserved architecture
- consolidated files
- provider changes
- routing changes
- service changes
- search fixes
- performance improvements
- security improvements
- remaining issues

Create:

docs/reconciliation/PHASE_2_VALIDATION.md

Include:

- TypeScript result
- ESLint result
- Build result
- Runtime result
- Search result
- Routing result
- Provider result
- Authentication result
- Performance observations
- Remaining known issues

============================================================
FINAL QUALITY GATE
============================================================

Run:

npx tsc --noEmit
npm run lint
npm run build
git diff --check
git status --short

Then inspect:

git diff --stat

Check that no unintended files were modified.

============================================================
IMPORTANT
============================================================

DO NOT commit.

DO NOT push.

DO NOT create a pull request.

DO NOT automatically continue to Phase 3.

Stop after Phase 2 is complete.

============================================================
FINAL RESPONSE
============================================================

Report:

1. Architecture reconciled
2. Providers fixed
3. Routes fixed
4. Services consolidated
5. State management reconciled
6. Search fixed
7. Performance improvements
8. Security improvements
9. Files created
10. Files moved
11. Files removed
12. Remaining issues
13. TypeScript result
14. ESLint result
15. Build result
16. Runtime result

Then state exactly:

"PHASE 2 COMPLETE — WAITING FOR PHASE 3."

Do not continue automatically.

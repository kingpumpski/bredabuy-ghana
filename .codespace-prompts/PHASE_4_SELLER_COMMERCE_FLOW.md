# ============================================================
# BREDA BUY GHANA
# PHASE 4 — SELLER COMMERCE FLOW
# ARCHITECTURE-FIRST IMPLEMENTATION PROMPT
# ============================================================

Repository:
  /workspaces/bredabuy-ghana

GitHub:
  https://github.com/kingpumpski/bredabuy-ghana

Working branch:
  ai-upgrade-development

Current architectural baseline:
  Phase 1 foundation stabilization completed.
  Phase 2 architecture reconciliation completed.
  Phase 3 customer commerce flow completed/under reconciliation.
  Phase 4 is now seller commerce integration.

============================================================
OBJECTIVE
============================================================

Build and reconcile the Seller Commerce subsystem without
breaking the existing application architecture.

IMPORTANT:

DO NOT blindly create pages, hooks, services, routes or
components merely because they appear in this prompt.

The existing repository is the source of truth.

Before creating anything:

1. Inspect the existing implementation.
2. Reuse existing services.
3. Reuse existing hooks.
4. Reuse existing types.
5. Reuse existing UI components.
6. Reuse existing layouts.
7. Reuse existing router architecture.
8. Extend existing modules instead of duplicating them.
9. Only create missing abstractions when the repository
   genuinely requires them.
10. Do not replace working architecture with simplified
    placeholder implementations.

============================================================
NON-NEGOTIABLE ARCHITECTURAL RULES
============================================================

1. Do NOT change the router architecture unless required.

The current router is:

  src/app/router/routes.tsx

Do NOT assume:

  src/app/router/index.tsx

2. Seller routes are already protected through:

  src/app/guards/SellerRoute.tsx

and:

  src/app/layouts/SellerLayout.tsx

Do not create a second seller authorization system.

3. Preserve route-level lazy loading.

4. Preserve feature-based architecture:

  src/features/sellers
  src/features/products
  src/features/orders
  src/features/inventory
  src/features/logistics
  src/features/payments
  src/features/returns
  src/features/account
  etc.

5. Do not introduce duplicated services.

6. Do not create fake APIs or hard-coded seller data.

7. Do not create placeholder business logic that looks
   production-ready.

8. Do not assume service method names.

9. Do not assume hook names.

10. Do not assume database schema.

11. Do not modify Supabase/database/RLS architecture during
    this phase unless an existing seller capability cannot
    function without a required database correction.

If a database change is genuinely required:

  document it first,
  isolate it,
  and do not silently invent schema.

============================================================
PHASE 4 DEVELOPMENT ORDER
============================================================

PHASE 4A — REPOSITORY DISCOVERY
--------------------------------

Inspect:

  src/features/sellers
  src/features/products
  src/features/orders
  src/features/inventory
  src/features/logistics
  src/features/payments
  src/features/returns
  src/features/account
  src/features/auth
  src/services
  src/app/router/routes.tsx
  src/app/guards
  src/app/layouts

Also inspect:

  package.json
  tsconfig.json
  vite.config.*
  eslint configuration
  existing tests
  existing service patterns
  existing TanStack Query patterns

Produce:

  docs/reconciliation/PHASE_4_SELLER_ARCHITECTURE_AUDIT.md

The audit must identify:

- Existing seller pages
- Existing seller hooks
- Existing seller services
- Existing seller types
- Existing seller routes
- Existing authorization mechanisms
- Existing product ownership mechanisms
- Existing order ownership mechanisms
- Existing inventory ownership mechanisms
- Existing fulfilment mechanisms
- Existing payout mechanisms
- Existing returns mechanisms
- Existing seller settings
- Missing capabilities
- Duplicate implementations
- Broken imports
- Architectural inconsistencies
- Unsafe assumptions

DO NOT implement features during this audit step.

============================================================
PHASE 4B — TYPE AND SERVICE RECONCILIATION
============================================================

After the audit:

1. Establish the canonical seller domain types.

2. Identify canonical services.

3. Identify canonical query keys.

4. Identify canonical mutation patterns.

5. Identify ownership boundaries.

6. Identify seller/user relationships.

7. Identify seller/product relationships.

8. Identify seller/order relationships.

9. Identify seller/inventory relationships.

10. Identify seller/fulfilment relationships.

11. Identify seller/payout relationships.

Do not create duplicate services if an existing service
already performs the required operation.

============================================================
PHASE 4C — SELLER PRODUCT MANAGEMENT
============================================================

Implement/reconcile:

  /seller
  /seller/products
  /seller/products/new
  /seller/products/:id/edit

Required capabilities:

- View seller-owned products
- Search/filter seller products
- Create product
- Edit product
- Product status
- SKU
- Pricing
- Stock linkage
- Product images
- Categories
- Variants where supported
- Validation
- Loading states
- Error states
- Empty states
- Mutation feedback
- Query invalidation

CRITICAL:

A seller must NEVER be able to edit a product belonging
to another seller.

Ownership must be enforced at the data/service layer,
not merely hidden in the UI.

============================================================
PHASE 4D — SELLER INVENTORY
============================================================

Reconcile:

  /seller/inventory

Capabilities:

- Inventory visibility
- SKU visibility
- Available quantity
- Reserved quantity where supported
- Low-stock indication
- Out-of-stock indication
- Product filtering
- Variant-level inventory where supported
- Inventory refresh/invalidation

Do not invent an inventory API.

Use the existing inventory architecture.

============================================================
PHASE 4E — SELLER ORDERS
============================================================

Reconcile:

  /seller/orders
  /seller/orders/:id

Capabilities:

- Seller-owned orders only
- Search
- Filtering
- Status
- Order reference
- Customer summary where authorized
- Order items
- Quantities
- Pricing
- Delivery information where authorized
- Order totals
- Processing workflow
- Status transitions
- Error handling
- Loading states

CRITICAL:

Never expose another seller's order data.

If the platform uses marketplace/multi-seller orders,
respect seller-level order-item ownership.

Do not assume that order ownership is equivalent to
customer ownership.

============================================================
PHASE 4F — SELLER FULFILMENT
============================================================

Reconcile:

  /seller/fulfilment

Integrate with the existing logistics architecture.

Capabilities:

- Orders awaiting fulfilment
- Fulfilment status
- Shipment creation where supported
- Courier information
- Tracking number
- Shipment status
- Delivery progression
- Error handling

Do not create a second logistics subsystem.

============================================================
PHASE 4G — SELLER RETURNS
============================================================

Reconcile:

  /seller/returns

Capabilities:

- View seller-relevant return requests
- Return status
- Return reason
- Order reference
- Return items
- Approve/reject where authorized
- Receive returned items where supported
- Refund coordination where supported

Respect the existing customer return flow from Phase 3.

Do not duplicate return state machines.

============================================================
PHASE 4H — SELLER PAYOUTS
============================================================

Reconcile:

  /seller/payouts

Capabilities:

- Available balance where supported
- Pending payouts
- Completed payouts
- Failed payouts
- Payout references
- Amounts
- Dates
- Payment method
- Reconciliation status where supported

IMPORTANT:

Do not invent financial calculations.

Use the existing payment/order data model.

If seller commission/platform fees are not yet implemented,
document them as a Phase 7 dependency rather than fabricating
financial logic in Phase 4.

============================================================
PHASE 4I — SELLER SETTINGS
============================================================

Reconcile:

  /seller/settings

Capabilities:

- Store profile
- Store name
- Store description
- Contact information
- Seller preferences
- Business information where supported

Use controlled forms and the project's existing form/
validation conventions.

Do not use uncontrolled inputs with fake save buttons.

Every save operation must either:

1. call a real existing service, or
2. remain clearly identified as a missing capability.

============================================================
PHASE 4J — SELLER ANALYTICS
============================================================

Review the existing:

  /seller/analytics

Do not create fake revenue/analytics calculations.

Identify what data already exists.

Implement only analytics that can be derived reliably from
existing canonical data.

Document unavailable metrics for a later analytics phase.

============================================================
PHASE 4K — SELLER CUSTOMERS
============================================================

Review:

  /seller/customers

Ensure sellers can only access customers associated with
their legitimate transactions where the architecture permits.

Do not expose global customer information.

Respect privacy and authorization boundaries.

============================================================
PHASE 4L — PROMOTIONS / COUPONS / REVIEWS
============================================================

Review:

  /seller/promotions
  /seller/coupons
  /seller/reviews

Do not implement independent marketing/review systems.

Determine whether these modules already have canonical
services.

If they do:

  integrate them.

If they do not:

  create an architecture note and defer unsupported
  capabilities to the appropriate later phase.

============================================================
PHASE 4M — ROUTER RECONCILIATION
============================================================

Use:

  src/app/router/routes.tsx

Preserve:

  SellerRoute
  SellerLayout
  lazy route loading
  RouteErrorPage

Required seller routes should include only routes whose
pages actually exist and are functional.

Potential routes:

  /seller
  /seller/products
  /seller/products/new
  /seller/products/:id/edit
  /seller/orders
  /seller/orders/:id
  /seller/fulfilment
  /seller/returns
  /seller/inventory
  /seller/customers
  /seller/analytics
  /seller/payouts
  /seller/promotions
  /seller/coupons
  /seller/reviews
  /seller/settings

Do not add routes to non-existent implementations.

============================================================
PHASE 4N — AUTHORIZATION
============================================================

Verify:

  SellerRoute

and all seller services.

Authorization must exist at multiple layers where
appropriate:

UI
  ↓
Route guard
  ↓
Service/query
  ↓
Backend/database/RLS

Do not rely solely on the React route guard.

Test:

- unauthenticated user
- normal customer
- seller
- admin
- seller attempting another seller's resource

============================================================
PHASE 4O — QUALITY GATE
============================================================

Run:

  npx tsc --noEmit
  npm run lint
  npm run build
  git diff --check

If tests exist:

  npm test

or the project's actual test command.

IMPORTANT:

Do not hide errors with:

  || true

Do not pipe validation output through:

  head

or:

  tail

when doing the actual validation.

Do not claim success when a command failed.

If a check fails:

1. Capture the actual error.
2. Identify the root cause.
3. Fix the root cause.
4. Re-run the failed check.
5. Continue only when the check passes.

============================================================
PHASE 4P — BROWSER / RUNTIME VALIDATION
============================================================

Start the application using the project's actual dev
command.

Verify:

  /
  /shop
  /products
  /products/:id
  /cart
  /checkout

Then verify:

  /seller
  /seller/products
  /seller/products/new
  /seller/orders
  /seller/inventory
  /seller/fulfilment
  /seller/returns
  /seller/payouts
  /seller/settings

Check for:

- White screens
- Lazy-loading failures
- Route errors
- React crashes
- Context errors
- Query errors
- Authorization failures
- Missing imports
- Console errors
- Broken navigation

============================================================
PHASE 4Q — FINAL RECONCILIATION REPORT
============================================================

Create:

  docs/reconciliation/PHASE_4_SELLER_VALIDATION.md

Include:

1. What already existed.
2. What was reused.
3. What was changed.
4. What was newly created.
5. Routes verified.
6. Services verified.
7. Authorization verified.
8. TypeScript result.
9. Lint result.
10. Build result.
11. Runtime result.
12. Known limitations.
13. Deferred capabilities.
14. Phase 5 dependencies.

============================================================
GIT SAFETY
============================================================

DO NOT:

  git reset --hard
  git clean -fd
  git checkout -- .
  delete unrelated work
  overwrite existing files unnecessarily

There are currently reconciliation artifacts and other
uncommitted work.

Preserve them.

Before modifying an existing file:

  inspect it first.

Before replacing architecture:

  document why.

DO NOT COMMIT AUTOMATICALLY.

At the end show:

  git status --short
  git diff --stat
  git diff --check

Then STOP.

============================================================
DEFINITION OF DONE
============================================================

Phase 4 is complete only when:

[ ] Seller architecture audited
[ ] Existing seller functionality reconciled
[ ] Seller product flow verified
[ ] Seller product creation verified
[ ] Seller product editing verified
[ ] Seller inventory verified
[ ] Seller order flow verified
[ ] Seller order details verified
[ ] Seller fulfilment verified
[ ] Seller returns verified
[ ] Seller payouts verified
[ ] Seller settings verified
[ ] Seller authorization verified
[ ] Seller data isolation verified
[ ] Router reconciled
[ ] No duplicate services introduced
[ ] No fake APIs introduced
[ ] TypeScript passes
[ ] Lint passes
[ ] Build passes
[ ] Git diff check passes
[ ] Runtime navigation verified
[ ] Phase 4 validation document created

============================================================
IMPORTANT EXECUTION RULE
============================================================

DO NOT IMPLEMENT EVERYTHING IN ONE BLIND SCRIPT.

Execute in controlled stages:

  AUDIT
    ↓
  RECONCILE TYPES/SERVICES
    ↓
  PRODUCT MANAGEMENT
    ↓
  INVENTORY
    ↓
  ORDERS
    ↓
  FULFILMENT
    ↓
  RETURNS
    ↓
  PAYOUTS
    ↓
  SETTINGS
    ↓
  AUTHORIZATION
    ↓
  ROUTER
    ↓
  QUALITY GATE
    ↓
  RUNTIME VALIDATION
    ↓
  FINAL REPORT

After each major stage:

  inspect
  implement
  type-check
  review diff

Do not proceed past a failed architectural or type check.

============================================================
FINAL INSTRUCTION
============================================================

Execute Phase 4 now.

Start with the architecture audit.

Do not assume missing code is actually missing until the
repository has been inspected.

Do not generate placeholder implementations.

Do not create duplicate architecture.

Do not commit.

At completion, provide a concise implementation report
and the exact remaining blockers, if any.

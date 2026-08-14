# BREDA BUY GHANA — PHASE 4 SELLER COMMERCE IMPLEMENTATION

Repository:
`/workspaces/bredabuy-ghana`

GitHub:
`https://github.com/kingpumpski/bredabuy-ghana`

Branch:
`ai-upgrade-development`

Codespace:
`https://cautious-meme-g5qpg9grjx9f9gqj.github.dev/`

Public application:
`https://cautious-meme-g5qpg9grjx9f9gqj-8080.app.github.dev/`

---

## OBJECTIVE

Implement and stabilize the complete BredaBuy seller commerce flow.

The intended seller flow is:

Seller Dashboard
→ Products
→ Create/Edit Product
→ Inventory
→ Orders
→ Order Details
→ Fulfilment
→ Logistics
→ Returns
→ Customers
→ Reviews
→ Promotions/Coupons
→ Analytics
→ Payouts
→ Settings

The existing repository is the source of truth.

DO NOT rewrite the application.

DO NOT introduce a new architecture.

DO NOT introduce another state-management library.

DO NOT replace working services with mock services.

DO NOT fabricate production API responses.

DO NOT create duplicate services, stores, hooks or types.

Preserve existing functionality.

Use the existing architecture:

src/app
src/features
src/components
src/services
src/shared
src/data

---

# STEP 1 — INSPECT BEFORE MODIFYING

Inspect the complete existing seller implementation.

Required areas:

src/features/sellers
src/features/products
src/features/cart
src/features/orders
src/features/logistics
src/features/account
src/services
src/app/router
src/app/guards
src/app/layouts

Identify:

- existing seller services
- existing product services
- existing inventory services
- existing order services
- existing fulfilment services
- existing logistics services
- existing return services
- existing payout services
- existing query hooks
- existing Zustand stores
- existing shared types
- existing Supabase/API integrations

Reuse existing abstractions wherever possible.

Do not create a second implementation of an existing domain.

---

# STEP 2 — SELLER AUTHORIZATION

The existing SellerRoute is authoritative.

Every seller route must remain protected by:

SellerRoute

and rendered through:

SellerLayout

Verify that:

- unauthenticated users cannot access seller pages
- ordinary customers cannot access seller pages
- seller users can access seller pages
- seller authorization is preserved during navigation
- authentication refresh does not expose protected content
- seller pages cannot expose admin-only operations

Do not weaken SellerRoute.

Do not bypass authorization inside individual pages.

If permission checks already exist, reuse them.

---

# STEP 3 — SELLER DASHBOARD

Make SellerDashboard functional using existing data/services.

It should expose useful seller-level information such as:

- sales
- orders
- pending orders
- fulfilment workload
- inventory alerts
- returns
- payouts
- performance metrics

Do not fabricate values.

If backend data is unavailable, show a truthful empty/unavailable state rather than fake production metrics.

Use:

- loading states
- skeletons where appropriate
- empty states
- error states
- retry controls where appropriate

---

# STEP 4 — SELLER PRODUCTS

Verify and complete:

/seller/products

/seller/products/new

/seller/products/:id/edit

Use the existing product domain.

Ensure:

- seller sees only products belonging to the seller
- product listing supports loading/error/empty states
- product creation uses existing product service
- product editing uses existing product service
- validation is preserved
- duplicate submissions are prevented
- successful creation returns to the appropriate seller workflow
- successful editing refreshes the relevant product data
- no admin product functionality leaks into seller pages

Do not create a second product service.

---

# STEP 5 — SELLER INVENTORY

Verify:

/seller/inventory

Inventory must use the existing inventory/domain services if available.

Support appropriate existing capabilities such as:

- stock visibility
- stock status
- low-stock indicators
- product/variant relationship
- inventory filtering
- inventory pagination
- inventory refresh

Do not fabricate inventory quantities.

If inventory APIs are unavailable, isolate the limitation behind the appropriate existing/domain abstraction and provide an honest UI state.

---

# STEP 6 — SELLER ORDERS

Verify:

/seller/orders

and:

/seller/orders/:id

If the order-detail route does not currently exist, add it using the canonical seller route.

Seller order access must be seller-scoped.

Ensure:

- seller sees only orders containing their products
- order details preserve the order identifier
- order status is displayed correctly
- customer information shown to seller is appropriate
- order totals are accurate
- order items are accurate
- loading/error/empty states exist
- pagination is preserved where appropriate

Never expose unrelated customer or administrator data.

---

# STEP 7 — SELLER FULFILMENT

Verify:

/seller/fulfilment

The seller must be able to work with orders that require seller fulfilment using the existing order/logistics abstractions.

Where supported by the backend:

- identify fulfilment-ready orders
- update fulfilment status
- preserve order identifiers
- avoid duplicate fulfilment submissions
- show success/error states
- refresh relevant queries after mutations

Do not invent backend fulfilment endpoints.

---

# STEP 8 — SELLER LOGISTICS

Seller logistics must integrate with the existing logistics domain.

Do not create a duplicate logistics service.

Seller should be able to access appropriate logistics information connected to seller orders.

Preserve:

- shipment identifiers
- tracking identifiers
- order identifiers
- delivery status
- exception state

If logistics data is unavailable, clearly communicate that state.

---

# STEP 9 — SELLER RETURNS

Verify:

/seller/returns

Seller returns must remain connected to the original order.

Ensure:

- seller can view relevant return requests
- return request identifiers are preserved
- order identifiers are preserved
- status is visible
- appropriate seller actions use existing services
- customer return data is not unnecessarily exposed
- no fake return records are introduced

---

# STEP 10 — SELLER CUSTOMERS

Verify:

/seller/customers

Seller customer information must be limited to customers associated with the seller's legitimate transactions.

Do not expose the complete customer database.

Reuse existing customer/order services.

Provide:

- loading state
- empty state
- error state
- pagination where appropriate

---

# STEP 11 — SELLER REVIEWS

Verify:

/seller/reviews

Reviews must relate only to the seller's products.

Do not expose unrelated seller reviews.

Use existing review services if available.

Do not fabricate reviews.

---

# STEP 12 — SELLER PROMOTIONS AND COUPONS

Verify:

/seller/promotions

/seller/coupons

Reuse existing promotion/coupon abstractions.

Seller-created promotions/coupons must remain seller-scoped.

Prevent:

- duplicate submissions
- invalid dates
- invalid discounts
- negative values
- unauthorized access to other sellers' promotions

If the backend does not support an operation, do not simulate success.

---

# STEP 13 — SELLER ANALYTICS

Verify:

/seller/analytics

Use existing reporting/query infrastructure.

Where actual data exists, expose useful metrics.

Potential metrics:

- revenue
- orders
- units sold
- average order value
- product performance
- return rate
- fulfilment performance

Do not fabricate analytics.

Heavy charts must remain lazy-loaded where appropriate.

---

# STEP 14 — SELLER PAYOUTS

Verify:

/seller/payouts

Payout information must be seller-scoped.

Use existing finance/payment abstractions.

Display truthful states for:

- pending payouts
- completed payouts
- failed payouts
- settlement information

Do not fabricate payout records or balances.

---

# STEP 15 — SELLER SETTINGS

Verify:

/seller/settings

Reuse existing account/auth/profile abstractions where appropriate.

Do not create a second user/profile service.

Seller settings must not grant administrative privileges.

---

# STEP 16 — ROUTER VALIDATION

The canonical seller routes are:

/seller
/seller/products
/seller/products/new
/seller/products/:id/edit
/seller/inventory
/seller/orders
/seller/orders/:id
/seller/fulfilment
/seller/returns
/seller/customers
/seller/reviews
/seller/promotions
/seller/coupons
/seller/analytics
/seller/payouts
/seller/settings

Maintain route-level lazy loading.

Do not create duplicate semantic routes.

Use feature pages as route targets.

---

# STEP 17 — QUERY/CACHE CORRECTNESS

Use existing TanStack Query infrastructure.

Ensure query keys contain appropriate seller/domain identifiers.

Avoid:

- unstable query keys
- unnecessary refetching
- duplicated queries
- stale seller data after mutations
- cross-seller cache leakage

Invalidate or update affected queries after successful mutations.

Do not introduce another data-fetching library.

---

# STEP 18 — PERFORMANCE

Preserve route-level lazy loading.

Ensure heavy seller modules are not unnecessarily included in the initial public bundle.

Avoid rendering unnecessarily large datasets.

Use pagination where the existing backend supports it.

Use existing caching.

Do not add libraries unless absolutely necessary.

---

# STEP 19 — UI/UX

Preserve BredaBuy's existing visual identity:

Forest Green
Gold
Cream
Kente Red
Charcoal

Use the existing component system.

Improve seller pages with:

- consistent spacing
- responsive layouts
- accessible controls
- clear hierarchy
- subtle borders
- restrained shadows
- skeleton loading
- empty states
- error states
- accessible focus states
- mobile responsiveness

Do not redesign the entire application.

Do not introduce a competing component library.

---

# STEP 20 — REMOVE GENUINE SELLER STUBS

Search:

PagePlaceholder
Coming Soon
Under Construction
Not implemented
TODO
FIXME
stub

Only replace genuine user-facing seller stubs.

Do not blindly remove TODO comments that are legitimate internal notes.

Do not delete working functionality.

---

# STEP 21 — QUALITY GATE

Run all commands separately:

npx tsc --noEmit

npm run lint

npm run build

git diff --check

If a command fails:

STOP.

Inspect the actual failure.

Fix the underlying problem.

Then rerun the failed check.

Do not claim success without the command actually passing.

---

# STEP 22 — FINAL ROUTE CHECK

Verify the seller route definitions:

grep -n "path: \"/seller" src/app/router/routes.tsx

Verify SellerRoute:

sed -n '1,240p' src/app/guards/SellerRoute.tsx

Verify placeholders:

grep -RniE \
"PagePlaceholder|Coming Soon|Under Construction|Not implemented" \
src/features/sellers \
--include="*.tsx" \
--include="*.ts"

---

# STEP 23 — REVIEW CHANGES

Run:

git status --short

git diff --stat

git diff --check

Review the actual changed files.

Do not commit unrelated files.

Do not commit secrets.

Do not restore .env credentials into source control.

---

# IMPORTANT IMPLEMENTATION RULE

ACTUALLY MODIFY THE CODE.

Do not merely print this prompt.

Do not merely describe what should be done.

Do not create documentation instead of implementing functionality.

Do not create fake APIs.

Do not stop after inspection.

Complete as much of Phase 4 as the existing architecture and backend genuinely support.

If a required backend capability does not exist:

1. preserve the UI architecture;
2. use an appropriate domain abstraction if one is genuinely required;
3. clearly expose the limitation;
4. do not fabricate successful production operations.

---

# COMPLETION REPORT

At the end report:

1. Files changed
2. Seller routes added/fixed
3. Seller pages completed
4. Existing services reused
5. New domain abstractions created, if any
6. Authorization fixes
7. Query/cache fixes
8. UI improvements
9. Performance improvements
10. TypeScript result
11. ESLint result
12. Build result
13. Remaining backend limitations

Do not commit automatically unless explicitly instructed.

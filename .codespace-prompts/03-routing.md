# PHASE 3 — ROUTING RECONCILIATION

Inspect the entire routing system before modifying it.

Create:

docs/reconciliation/ROUTE_MATRIX.md

Map:

PUBLIC
- /
- products
- product details
- categories
- brands
- deals
- cart

AUTHENTICATED CUSTOMER
- account
- profile
- security
- addresses
- orders
- wishlist
- reviews
- notifications
- support
- wallet
- checkout
- payment status/recovery

SELLER
- seller dashboard
- products
- inventory
- orders
- fulfilment
- returns
- promotions
- analytics
- payouts
- settings

ADMIN
- admin dashboard
- users
- customers
- sellers
- products
- categories
- brands
- inventory
- orders
- payments
- refunds
- logistics
- returns
- reports
- marketing
- CMS
- settings

LOGISTICS
- shipments
- carriers
- exceptions
- returns

Only retain routes that correspond to actual implemented pages.

Requirements:

1. One canonical route registry.
2. No duplicate routes.
3. No orphan pages.
4. No broken lazy imports.
5. No route importing business logic.
6. Route guards must be centralized.
7. Public/customer/seller/admin access must be separated.
8. Unauthorized access must redirect safely.
9. Not-found route must exist.
10. Route-level lazy loading should be used where appropriate.
11. Do not introduce a second routing architecture.

Fix all discovered route issues.

Validate TypeScript, lint and build.

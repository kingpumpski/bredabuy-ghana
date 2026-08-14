# PHASE 21 — FINAL QUALITY GATE

This phase is a RELEASE BLOCKER.

Run:

npx tsc --noEmit
npm run lint
npm run build

If tests exist, run them.

Also inspect:

git diff --check
git status --short
git diff --stat

Perform final searches for:

- PagePlaceholder
- Coming Soon
- Under Construction
- TODO
- FIXME
- console.log
- `any`
- service_role
- private keys
- payment secrets

Do not treat legitimate TODO comments as user-facing defects, but document
remaining engineering TODOs.

Verify:

ARCHITECTURE
- one application bootstrap
- coherent provider tree
- canonical router
- canonical services
- canonical state

CUSTOMER
- catalogue
- search
- product
- cart
- checkout
- payment
- orders
- tracking
- account

SELLER
- seller isolation
- products
- inventory
- orders
- fulfilment
- returns
- payouts

ADMIN
- authorization
- users
- sellers
- products
- orders
- payments
- refunds
- logistics
- reports

SECURITY
- no frontend secrets
- no authorization bypass
- no wallet mutation from UI
- no duplicate payments

UX
- responsive
- accessible
- loading states
- empty states
- error states
- search works
- search animation terminates

PERFORMANCE
- lazy routes
- no obvious duplicate requests
- sensible caching
- no obvious unnecessary rerender loops

If ANY critical item fails:

DO NOT declare the project ready.

Create:

docs/reconciliation/FINAL_QUALITY_GATE.md

containing:

- passed checks
- failed checks
- remaining issues
- recommended next actions

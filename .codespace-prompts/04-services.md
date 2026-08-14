# PHASE 4 — SERVICE AND DATA LAYER RECONCILIATION

Inspect all services and data access patterns.

Identify duplicate implementations of:

- products
- categories
- brands
- cart
- checkout
- orders
- payments
- wallet
- users
- sellers
- inventory
- logistics
- notifications
- support

Create:

docs/reconciliation/SERVICE_MATRIX.md

For every service record:

- purpose
- source
- consumers
- API/database dependency
- duplicate candidates
- error handling
- cache behavior

Then reconcile.

Rules:

1. Keep one canonical service per domain operation.
2. UI components must not contain database/business logic.
3. Hooks should orchestrate service calls.
4. Services should normalize API errors.
5. Services should expose typed results.
6. Do not duplicate Supabase/API calls across pages.
7. Do not introduce a second HTTP client without justification.
8. Preserve existing backend contracts.
9. Do not change database schema unless required by an identified defect.
10. Payment and wallet mutations must remain service-controlled.

Validate after changes.

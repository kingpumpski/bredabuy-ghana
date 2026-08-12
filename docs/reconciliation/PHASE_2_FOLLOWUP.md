# Phase 2 Follow-up

This branch extends the Phase 2 architecture reconciliation with consistent authentication restoration handling across public, seller, and admin route guards.

## Changes

- Seller routes now wait while authentication is initializing or refreshing.
- Admin routes now wait while authentication is initializing or refreshing.
- Public routes now treat authentication refresh consistently with initialization.
- Seller/admin redirects preserve the requested pathname, query string, and hash.
- No new provider, router, API client, or business-domain implementation was introduced.

## Validation

Run locally in Codespaces:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Do not merge until these commands pass and the primary customer/seller/admin flows have been smoke-tested.
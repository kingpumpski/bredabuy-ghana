# BredaBuy Ghana — Phase 3 Plan

## Objective
Complete the remaining reconciliation after Phase 2 without introducing duplicate architecture or destabilizing working functionality.

## Order
1. Reconcile payment/order/wallet boundaries.
2. Harden checkout submission and payment verification.
3. Reconcile order → shipment → delivery lifecycle.
4. Reconcile seller fulfilment and logistics communication.
5. Complete canonical search UX and result-state handling.
6. Reconcile public/customer/seller/admin navigation and remove placeholder-only flows.
7. Replace hardcoded account data with established data/service boundaries where backend support exists; explicitly document remaining mock-backed areas.
8. Harden authentication/token handling and route permissions.
9. Apply verified performance improvements: lazy routes, duplicate-request elimination, query/cache stability, and render/startup improvements.
10. Perform complete route-flow and production validation.

## Architectural Rules
- Preserve existing `src/app`, `src/features`, `src/services`, `src/store`, and shared UI architecture unless evidence requires change.
- One canonical implementation per business capability.
- Pages consume feature hooks/services, not low-level APIs.
- Services must not depend on pages, components, or router implementation.
- Do not create duplicate contexts/providers/stores for the same responsibility.
- Payment and wallet state remain service-controlled.
- Do not expose secrets in frontend code.
- Do not commit or push during implementation.

## Validation
After each logical change:
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`

At completion create/update `docs/reconciliation/PHASE_3_VALIDATION.md` with changes, validation results, remaining issues, and files changed.

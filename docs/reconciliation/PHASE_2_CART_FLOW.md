# Phase 2 Cart Flow Reconciliation

## Scope

This increment reconciles the cart domain without replacing the existing Zustand store or legacy compatibility context.

## Canonical responsibilities

- `features/cart/store/cart.store.ts` remains the single source of truth for cart state and persistence.
- `features/cart/services/cart.service.ts` owns cart-domain calculations and validation.
- `context/CartContext.tsx` remains a compatibility adapter for existing consumers and no longer owns independent cart calculations.
- Checkout continues to consume cart-derived order data through the existing checkout service.

## Flow

```text
Product / Product Variant
        ↓
CartContext compatibility adapter
        ↓
CartStore (single persisted cart state)
        ↓
CartService (validation / totals)
        ↓
CheckoutService
        ↓
Inventory reservation
        ↓
Order + seller fulfilment records
        ↓
Payment / shipment lifecycle
```

## Existing lifecycle controls retained

The existing checkout service already validates stock before reservation, creates the order around the controlled reservation flow, rolls the order back when reservation fails, and creates seller fulfilment records. The order service also enforces controlled status transitions and payment-confirmation rules. Those boundaries are intentionally preserved rather than duplicated.

## Deliberate non-changes

- No second cart store was introduced.
- No existing cart state was migrated or discarded.
- Payment and order services were not rewritten because their lifecycle controls are already established.
- Production persistence remains a backend concern; the current browser persistence is retained for the existing development architecture.

## Validation required in Codespaces

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Then smoke-test add-to-cart, variant selection, quantity updates, remove, clear, cart persistence, checkout navigation, and stock validation.

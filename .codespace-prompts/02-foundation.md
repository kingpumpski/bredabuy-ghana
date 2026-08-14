# PHASE 2 — APPLICATION FOUNDATION RECONCILIATION

Using ARCHITECTURE_AUDIT.md, reconcile the application foundation.

Focus only on:

- src/main.tsx
- src/App.tsx
- app configuration
- providers
- global styles
- router bootstrap
- error boundaries
- query/cache provider
- authentication provider
- cart provider
- theme provider
- notification/toast provider

Requirements:

1. There must be one coherent application bootstrap.
2. Provider nesting must be deterministic.
3. Auth-dependent providers must receive required auth context.
4. Cart hooks must never execute outside CartProvider.
5. Query hooks must never execute outside QueryClientProvider.
6. Theme components must not crash during initialization.
7. Remove duplicate providers.
8. Remove dead providers.
9. Preserve existing state behavior.
10. Fix circular provider dependencies.
11. Ensure App renders reliably.
12. Ensure errors do not result in a blank screen.

Do not implement new business features.

Validate:

npx tsc --noEmit
npm run lint
npm run build

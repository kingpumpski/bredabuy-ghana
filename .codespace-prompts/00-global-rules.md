# BredaBuy Global Development Rules

You are working inside the existing BredaBuy Ghana repository.

Your responsibility is to RECONCILE and STABILIZE the current application,
not to blindly rebuild it.

## Architecture principles

Preserve this logical architecture unless repository evidence proves a
different existing structure is more appropriate:

src/
  app/
    config/
    providers/
    router/
  components/
    ui/
    layout/
    shared/
  features/
    auth/
    account/
    products/
    cart/
    checkout/
    orders/
    payments/
    wallet/
    sellers/
    logistics/
    admin/
    notifications/
    support/
  hooks/
  lib/
  services/
  store/
  types/
  pages/

Do not create a directory merely because it appears in this document.
First inspect the repository.

## Rules

1. Inspect before editing.
2. Reuse existing components.
3. Reuse existing hooks.
4. Reuse existing services.
5. Reuse existing types.
6. Reuse existing providers.
7. Reuse existing state management.
8. Do not create duplicate implementations.
9. Do not move large parts of the application unless necessary.
10. Do not replace working business logic simply to make architecture look cleaner.
11. Keep routing centralized.
12. Keep page components focused on presentation/orchestration.
13. Keep business logic inside services/hooks/domain modules.
14. Keep authentication and authorization centralized.
15. Do not access payment providers directly from UI components.
16. Do not mutate wallet balances directly from UI.
17. Do not expose seller data across seller boundaries.
18. Do not expose admin functionality to ordinary users.
19. Never hardcode secrets.
20. Never use `any` merely to suppress TypeScript errors.
21. Do not create fake/mock production data unless explicitly required.
22. Do not leave user-facing "Coming Soon", "Placeholder", or empty pages.
23. Every async page must support loading, empty, error and success states.
24. Search must have deterministic input, loading, result and empty states.
25. Optimize for mobile, tablet and desktop.
26. Optimize rendering and network requests.
27. Preserve accessibility.
28. Preserve existing Ghana-specific requirements.
29. Keep changes incremental.
30. Validate after every architectural phase.

## Required validation

After modifications:

npx tsc --noEmit
npm run lint
npm run build

If tests exist, also run the relevant test command.

Never claim a feature works unless the implementation actually exists.

# PHASE 5 — STATE AND TYPE RECONCILIATION

Inspect:

- Zustand/store files
- React contexts
- React Query/TanStack Query
- localStorage/sessionStorage
- URL state
- form state
- domain types

Establish clear ownership:

SERVER STATE
=> TanStack Query/service layer where already adopted

CLIENT UI STATE
=> local component state

GLOBAL CLIENT STATE
=> existing canonical store/context only where justified

AUTH STATE
=> existing authentication provider

CART STATE
=> existing canonical cart implementation

WALLET
=> server/service state; UI must never directly mutate balance

Requirements:

- remove duplicate state sources
- prevent stale derived values
- prevent unnecessary global state
- fix inconsistent types
- replace unsafe `any`
- preserve public APIs where possible
- avoid unnecessary rerenders

Create:

docs/reconciliation/STATE_MATRIX.md

Validate.

# BREDA BUY GHANA — PHASE 1 ARCHITECTURE RECONCILIATION AUDIT

You are acting as the senior software architect for the BredaBuy Ghana repository.

Your task is to perform PHASE 1 ONLY.

## CRITICAL RULE

This is a READ-ONLY audit.

DO NOT modify:

- src/
- package.json
- package-lock.json
- vite.config.*
- tsconfig.*
- tailwind configuration
- environment files
- routing files
- providers
- services
- components
- pages
- database configuration
- authentication configuration

Do not automatically fix anything.

The ONLY file you are allowed to create or modify is:

docs/reconciliation/ARCHITECTURE_AUDIT.md

If that file already exists, replace/update it with the new audit.

---

# 1. INSPECT THE ENTIRE REPOSITORY

Inspect the repository thoroughly.

Start with:

- package.json
- tsconfig.json
- vite.config.*
- eslint configuration
- Tailwind configuration
- src/main.*
- src/App.*
- src/app/
- src/components/
- src/features/
- src/pages/
- src/services/
- src/hooks/
- src/context/
- src/providers/
- src/store/
- src/lib/
- src/types/
- src/utils/

Also inspect:

- authentication
- routing
- providers
- state management
- API/service boundaries
- data fetching
- search
- cart
- checkout
- payments
- wallet
- orders
- products
- sellers
- logistics
- administration
- customer account

Do not assume that the directory structure represents the intended architecture.
Verify how the application actually works.

---

# 2. DETERMINE THE CURRENT ARCHITECTURE

Document the actual architecture currently implemented.

Identify:

## Application shell

- entry point
- App component
- providers
- error boundaries
- global state
- routing

## Feature architecture

Identify actual feature modules.

Examples:

- account
- auth
- products
- search
- cart
- checkout
- orders
- payments
- wallet
- sellers
- logistics
- admin
- notifications

Only report modules that actually exist.

---

# 3. IDENTIFY ARCHITECTURE CONFLICTS

Look for:

- pages mixed with features
- duplicate service layers
- duplicated hooks
- duplicated contexts
- multiple state-management approaches
- multiple API clients
- components containing business logic
- services importing UI components
- pages directly manipulating data that should go through services
- duplicated types
- inconsistent naming conventions
- inconsistent folder structures
- old architecture mixed with newer architecture

For every conflict explain:

1. File/location
2. What conflicts
3. Why it is problematic
4. Recommended architecture

---

# 4. IDENTIFY DUPLICATE IMPLEMENTATIONS

Search for duplicate implementations of:

- authentication
- cart
- wishlist
- search
- products
- orders
- payments
- wallet
- notifications
- seller data
- admin data

Look for:

- duplicate hooks
- duplicate services
- duplicate contexts
- duplicate components
- duplicate pages
- duplicate API functions
- duplicate types

Do NOT delete anything.

Report the duplicates only.

---

# 5. AUDIT PROVIDERS

Inspect all providers.

Determine:

- which providers exist
- provider nesting order
- dependencies between providers
- whether providers are actually mounted
- whether hooks are called outside their providers
- whether there are duplicate providers
- whether authentication is available before protected routes
- whether cart/wallet/order providers are correctly available
- whether provider initialization can crash the application

Pay particular attention to:

- "must be used within Provider"
- undefined context
- provider initialization errors
- provider ordering problems

---

# 6. AUDIT ROUTING

Inspect the complete routing implementation.

Determine:

- public routes
- authenticated routes
- customer routes
- seller routes
- admin routes
- logistics routes
- payment routes
- fallback routes
- 404 handling
- route guards
- lazy loading
- duplicate routes
- unreachable routes
- missing routes
- broken imports
- route/component mismatches

Create a route inventory.

Use:

| Route | Component | Access | Status | Problem |
|---|---|---|---|---|

Do not modify routing yet.

---

# 7. IDENTIFY MISSING PAGES

Compare the current architecture against:

- routes
- navigation
- services
- hooks
- components
- feature directories

Identify pages that are referenced but missing.

Also identify pages that exist but are:

- placeholders
- Coming Soon
- empty
- minimally implemented
- disconnected from services

Do not create the pages yet.

---

# 8. AUDIT SERVICE AND DATA FLOW

Trace:

UI
→ page
→ feature
→ hook
→ service
→ API/data source

Identify broken boundaries.

Check for:

- direct API calls from pages
- duplicated API clients
- hardcoded mock data
- local fake data replacing real services
- inconsistent error handling
- missing loading states
- missing empty states
- missing retry states
- incorrect cache handling
- stale data
- duplicated requests

Pay special attention to:

- Products
- Search
- Cart
- Checkout
- Orders
- Payments
- Wallet
- Seller
- Logistics
- Admin

---

# 9. AUDIT SEARCH

Investigate search deeply.

Determine:

- search input component
- search state
- debounce implementation
- search service
- search API
- result rendering
- loading state
- empty state
- error state
- keyboard interaction
- animation
- result positioning
- mobile behavior
- duplicate searches
- unnecessary requests

Identify why the search button/input animation or output may behave incorrectly.

Do not fix it yet.

Document probable root causes.

---

# 10. PERFORMANCE AUDIT

Inspect for:

- unnecessary re-renders
- oversized components
- missing lazy loading
- unnecessary context updates
- duplicate API requests
- expensive calculations during render
- inappropriate/missing memoization
- oversized dependencies
- unnecessary imports
- large initial bundles
- images without optimization
- inefficient lists
- unnecessary state
- synchronous startup work

Do not prematurely optimize.

Only identify real or likely bottlenecks.

---

# 11. SECURITY AUDIT

Check for:

- frontend secrets
- hardcoded credentials
- service-role keys
- insecure environment handling
- missing authorization
- missing route guards
- insecure local storage usage
- unsafe HTML rendering
- weak input validation
- exposed administrative functionality

Do not expose secret values.

If a secret is found, report only:

"Potential secret detected in [file]."

Never print the secret.

---

# 12. DESIGN/UI ARCHITECTURE AUDIT

Inspect:

- design system
- Tailwind usage
- shadcn/Radix usage
- shared components
- page layouts
- typography
- spacing
- responsive behavior
- loading states
- empty states
- error states
- accessibility

Identify:

- duplicated components
- inconsistent buttons
- inconsistent cards
- inconsistent headers
- inconsistent page layouts
- inconsistent colors
- inconsistent spacing
- inconsistent responsive behavior

Do not redesign anything yet.

---

# 13. RECOMMEND THE TARGET ARCHITECTURE

Based on the actual repository, recommend a clean architecture.

Prefer this structure where appropriate:

src/
├── app/
│   ├── config/
│   ├── providers/
│   ├── router/
│   └── layouts/
│
├── features/
│   ├── auth/
│   ├── account/
│   ├── products/
│   ├── search/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── payments/
│   ├── wallet/
│   ├── sellers/
│   ├── logistics/
│   ├── notifications/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── services/
│   ├── api/
│   └── integrations/
│
├── hooks/
├── lib/
├── store/
├── types/
└── utils/

DO NOT force this structure blindly.

If the repository has a better established pattern, document why it should be retained.

---

# 14. CREATE ARCHITECTURE AUDIT

Create:

docs/reconciliation/ARCHITECTURE_AUDIT.md

The document must contain:

# BredaBuy Ghana Architecture Audit

## 1. Executive Summary

## 2. Current Architecture

## 3. Architecture Conflicts

## 4. Duplicate Implementations

## 5. Provider Audit

## 6. Route Audit

## 7. Missing Pages

## 8. Service/Data Flow Audit

## 9. Search Audit

## 10. Performance Audit

## 11. Security Audit

## 12. UI/Design Architecture Audit

## 13. Broken Features

## 14. Recommended Target Architecture

## 15. Recommended Route Architecture

## 16. Recommended Page-to-Service Flow

## 17. Recommended Provider Hierarchy

## 18. Recommended Migration Order

## 19. Risks

## 20. Phase 2 Implementation Plan

---

# 15. DO NOT IMPLEMENT PHASE 2

Stop after completing the audit.

Do NOT:

- refactor
- delete files
- create pages
- rewrite routes
- modify providers
- modify services
- modify UI
- optimize code
- change package dependencies

The purpose of this phase is to establish a reliable implementation baseline.

---

# FINAL RESPONSE

After completing the audit, provide a concise summary containing:

1. Current architecture
2. Architecture conflicts
3. Duplicate implementations
4. Broken providers
5. Broken routes
6. Missing pages
7. Service/data problems
8. Search problems
9. Performance problems
10. Security problems
11. Recommended target architecture
12. Recommended Phase 2 implementation order

Then state:

"PHASE 1 COMPLETE — WAITING FOR PHASE 2."

Do not continue automatically.

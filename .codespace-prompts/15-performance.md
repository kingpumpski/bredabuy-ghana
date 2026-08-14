# PHASE 15 — PERFORMANCE OPTIMIZATION

Perform a measured performance optimization pass.

Investigate:

- unnecessary rerenders
- oversized components
- unnecessary global state
- duplicate API calls
- missing query caching
- unstable query keys
- repeated computations
- unnecessary effects
- large imports
- icon imports
- route bundle size
- image loading
- table rendering
- search requests

Implement only improvements supported by evidence.

Use:

- route-level lazy loading
- component memoization only where useful
- stable callbacks only where useful
- query caching
- request deduplication
- pagination
- debouncing where appropriate
- image lazy loading
- responsive image sizing
- virtualized lists only when data size justifies it

Do NOT optimize blindly.

Do not replace working libraries merely for theoretical gains.

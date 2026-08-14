# PHASE 7 — SEARCH SYSTEM REPAIR

Investigate the existing search implementation.

Fix:

- search button animation
- button loading state
- input handling
- Enter-key submission
- duplicate requests
- stale results
- race conditions
- empty results
- loading results
- error results
- result rendering
- navigation to product details
- mobile search behavior

The search interaction must follow:

idle
→ submitting
→ results OR empty OR error

Requirements:

1. Disable duplicate submissions.
2. Preserve the user's query.
3. Cancel or ignore stale requests where appropriate.
4. Do not animate indefinitely.
5. Search button must return to idle after completion.
6. Results must actually correspond to the submitted query.
7. Empty results must not appear as an application error.
8. Search URL state should be shareable where appropriate.
9. Do not make every keystroke trigger a network request unless existing UX
   intentionally requires it.
10. Use existing catalogue/product service.

Fix visual output problems as well as logic problems.

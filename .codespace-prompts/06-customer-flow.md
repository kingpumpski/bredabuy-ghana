# PHASE 6 — CUSTOMER JOURNEY RECONCILIATION

Implement and reconcile the complete customer journey:

Home
→ Catalogue
→ Search
→ Product Details
→ Cart
→ Checkout
→ Payment
→ Confirmation
→ Order Details
→ Tracking

Account journey:

Account
→ Profile
→ Addresses
→ Orders
→ Wishlist
→ Reviews
→ Notifications
→ Support
→ Wallet

Requirements:

- navigation must preserve intended context
- product selection must flow into cart
- cart must flow into checkout
- checkout must create/use the correct transaction
- payment must not duplicate on refresh
- successful payment must resolve to order state
- order must expose shipment state
- account pages must use authenticated user context
- loading/error/empty states must be consistent

Do not invent APIs.

If a service is missing, document the missing contract rather than creating
fake data.

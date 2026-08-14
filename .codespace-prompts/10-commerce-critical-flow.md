# PHASE 10 — CHECKOUT / PAYMENT / WALLET CRITICAL FLOW

Treat this as a high-risk module.

Reconcile:

Cart
→ Address
→ Delivery
→ Payment
→ Review
→ Transaction
→ Confirmation
→ Order

Payment methods should reflect actual supported providers.

Potential methods include:

- BredaBuy Wallet
- Mobile Money
- Visa
- Mastercard
- Bank Transfer
- Cash on Delivery

Only expose methods that the backend/service layer actually supports.

Rules:

1. No provider secret keys in frontend.
2. No direct wallet balance mutation.
3. No duplicate payment creation.
4. Preserve transaction reference.
5. Refresh must not create another transaction.
6. Payment status must be server-derived.
7. Order totals must have one canonical source.
8. Currency must consistently use GHS/GH₵ representation.
9. Failed payments must provide recovery.
10. Successful payment must transition the order correctly.

Implement:

/payment/status/:id
/payment/recovery/:id

only if the underlying transaction service supports them.

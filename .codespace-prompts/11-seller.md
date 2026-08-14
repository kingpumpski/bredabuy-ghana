# PHASE 11 — SELLER PORTAL RECONCILIATION

Reconcile:

/seller
/seller/products
/seller/products/new
/seller/products/:id/edit
/seller/inventory
/seller/orders
/seller/orders/:id
/seller/fulfilment
/seller/returns
/seller/customers
/seller/reviews
/seller/promotions
/seller/coupons
/seller/analytics
/seller/payouts
/seller/settings

Requirements:

- seller identity comes from authenticated session
- every query is seller-scoped
- no seller can inspect another seller's data
- inventory changes use canonical services
- order status changes follow valid lifecycle
- fulfilment uses logistics service
- payout data is read-only from the appropriate service
- admin functionality must not leak into seller UI

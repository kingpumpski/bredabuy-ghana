# BredaBuy Ghana Architecture Audit

> **Phase:** 1 — Architecture Reconciliation Audit  
> **Repository:** `/workspaces/bredabuy-ghana`  
> **Branch:** `ai-upgrade-development`  
> **Generated:** `Wed Aug 12 10:28:44 UTC 2026`  
> **Mode:** READ-ONLY

---

# 1. Executive Summary

This document records the current implementation state of the BredaBuy
Ghana application before architectural reconciliation.

No application source files were intentionally modified during this audit.

The audit is based on the actual repository filesystem, configuration,
source structure, routing signals, provider signals, data-flow signals,
search implementation signals, security signals, and feature inventory.

---

# 2. Current Architecture

## Application Entry Points

```text
src/App.css
src/App.tsx
src/main.tsx
```

## Source Directory Structure

```text
src
src/app
src/app/config
src/app/guards
src/app/layouts
src/app/providers
src/app/router
src/app/store
src/components
src/components/chat
src/components/home
src/components/layout
src/components/product
src/components/ui
src/context
src/data
src/features
src/features/account
src/features/admin
src/features/auth
src/features/brands
src/features/cart
src/features/catalog
src/features/categories
src/features/checkout
src/features/customers
src/features/finance
src/features/fulfilment
src/features/inventory
src/features/logistics
src/features/orders
src/features/payments
src/features/products
src/features/returns
src/features/sellers
src/features/shipping
src/features/users
src/features/wallet
src/features/warehouse
src/hooks
src/lib
src/pages
src/services
src/services/api
src/shared
src/shared/components
src/shared/types
src/store
src/types
```

## Feature Structure

```text
src/features/account/components/AccountShell.tsx
src/features/account/components/AccountSidebar.tsx
src/features/account/data/account.data.ts
src/features/account/index.ts
src/features/account/pages/AccountAddressesPage.tsx
src/features/account/pages/AccountDashboardPage.tsx
src/features/account/pages/AccountNotificationsPage.tsx
src/features/account/pages/AccountOrderDetailsPage.tsx
src/features/account/pages/AccountOrdersPage.tsx
src/features/account/pages/AccountProfilePage.tsx
src/features/account/pages/AccountReturnRequestPage.tsx
src/features/account/pages/AccountReviewsPage.tsx
src/features/account/pages/AccountSecurityPage.tsx
src/features/account/pages/AccountSupportPage.tsx
src/features/account/pages/AccountWalletPage.tsx
src/features/account/pages/AccountWishlistPage.tsx
src/features/account/types/account.types.ts
src/features/admin/pages/AdminDashboard.tsx
src/features/admin/pages/CMSManagement.tsx
src/features/admin/pages/CategoryManagement.tsx
src/features/admin/pages/CustomerManagement.tsx
src/features/admin/pages/InventoryManagement.tsx
src/features/admin/pages/LogisticsManagement.tsx
src/features/admin/pages/MarketingManagement.tsx
src/features/admin/pages/OrderManagement.tsx
src/features/admin/pages/PaymentManagement.tsx
src/features/admin/pages/ProductManagement.tsx
src/features/admin/pages/Reports.tsx
src/features/admin/pages/ReturnManagement.tsx
src/features/admin/pages/SellerManagement.tsx
src/features/admin/pages/SystemSettings.tsx
src/features/admin/pages/WarehouseManagement.tsx
src/features/auth/components/AuthSessionProvider.tsx
src/features/auth/constants/auth.constants.ts
src/features/auth/hooks/useAuth.ts
src/features/auth/hooks/useAuthSession.ts
src/features/auth/index.ts
src/features/auth/pages/ForgotPassword.tsx
src/features/auth/pages/LoginPage.tsx
src/features/auth/pages/MfaPage.tsx
src/features/auth/pages/RegisterPage.tsx
src/features/auth/pages/ResetPassword.tsx
src/features/auth/pages/VerifyEmail.tsx
src/features/auth/pages/VerifyOtp.tsx
src/features/auth/permissions/permissions.ts
src/features/auth/permissions/roles.ts
src/features/auth/permissions/usePermissions.ts
src/features/auth/services/auth.service.ts
src/features/auth/store/auth.store.ts
src/features/auth/types/auth.types.ts
src/features/auth/utils/auth.utils.ts
src/features/brands/hooks/useBrands.ts
src/features/brands/index.ts
src/features/brands/services/brand.service.ts
src/features/brands/store/brand.store.ts
src/features/brands/types/brand.types.ts
src/features/cart/hooks/useCart.ts
src/features/cart/index.ts
src/features/cart/store/cart.store.ts
src/features/cart/types/cart.types.ts
src/features/cart/utils/cart.utils.ts
src/features/catalog/hooks/useCatalog.ts
src/features/catalog/hooks/useCatalogSummary.ts
src/features/catalog/index.ts
src/features/catalog/services/catalog.service.ts
src/features/catalog/store/catalog.store.ts
src/features/catalog/types/catalog.types.ts
src/features/catalog/utils/catalog.utils.ts
src/features/categories/hooks/useCategories.ts
src/features/categories/index.ts
src/features/categories/services/category.service.ts
src/features/categories/store/category.store.ts
src/features/categories/types/category.types.ts
src/features/checkout/index.ts
src/features/checkout/services/checkout-payment-state.service.ts
src/features/checkout/services/checkout.service.ts
src/features/checkout/services/payment-orchestration.service.ts
src/features/checkout/types/checkout.types.ts
src/features/checkout/utils/checkout-payment-safety.ts
src/features/checkout/utils/checkout.utils.ts
src/features/checkout/utils/checkout.validation.ts
src/features/customers/pages/AddressBook.tsx
src/features/customers/pages/CustomerDashboard.tsx
src/features/customers/pages/NotificationCenter.tsx
src/features/customers/pages/OrderDetails.tsx
src/features/customers/pages/OrdersPage.tsx
src/features/customers/pages/ProfilePage.tsx
src/features/customers/pages/ReviewManagement.tsx
src/features/customers/pages/SupportPage.tsx
src/features/customers/pages/WalletPage.tsx
src/features/customers/pages/WishlistPage.tsx
src/features/finance/pages/Expenses.tsx
src/features/finance/pages/FinanceDashboard.tsx
src/features/finance/pages/FinanceReports.tsx
src/features/finance/pages/Invoices.tsx
src/features/finance/pages/Settlements.tsx
src/features/finance/pages/Transactions.tsx
src/features/fulfilment/index.ts
src/features/fulfilment/services/fulfilment.service.ts
src/features/fulfilment/types/fulfilment.types.ts
src/features/inventory/index.ts
src/features/inventory/services/inventory.service.ts
src/features/inventory/types/inventory.types.ts
src/features/logistics/index.ts
src/features/logistics/pages/Deliveries.tsx
src/features/logistics/pages/Drivers.tsx
src/features/logistics/pages/LogisticsDashboard.tsx
src/features/logistics/pages/LogisticsOperationsPage.tsx
src/features/logistics/pages/PickupPoints.tsx
src/features/logistics/pages/Routes.tsx
src/features/logistics/pages/TrackShipmentPage.tsx
src/features/logistics/services/carrier.service.ts
src/features/logistics/services/delivery-exception.service.ts
src/features/logistics/services/fulfilment-shipment.service.ts
src/features/logistics/services/return-inspection.service.ts
src/features/logistics/services/return-shipment.service.ts
src/features/logistics/services/shipment-assignment.service.ts
src/features/logistics/services/shipment.service.ts
src/features/logistics/types/logistics.types.ts
src/features/orders/hooks/useOrders.ts
src/features/orders/index.ts
src/features/orders/services/order.service.ts
src/features/orders/services/seller-order.service.ts
src/features/orders/types/order.types.ts
src/features/orders/types/seller-order.types.ts
src/features/payments/adapters/demo-payment.adapter.ts
src/features/payments/index.ts
src/features/payments/services/ledger.service.ts
src/features/payments/services/order-payment-sync.service.ts
src/features/payments/services/order-payment.service.ts
src/features/payments/services/payment-adapter.registry.ts
src/features/payments/services/payment-core.service.ts
src/features/payments/services/payment-reconciliation-queue.service.ts
src/features/payments/services/payment-reconciliation.service.ts
src/features/payments/services/payment-recovery.service.ts
src/features/payments/services/payment-transaction.service.ts
src/features/payments/services/payment-validation.service.ts
src/features/payments/services/payment-webhook.service.ts
src/features/payments/services/payment.service.ts
src/features/payments/services/refund.service.ts
src/features/payments/types/payment-adapter.types.ts
src/features/payments/types/payment-core.types.ts
src/features/payments/types/payment-ledger.types.ts
src/features/payments/types/payment.types.ts
src/features/products/components/ProductFilters.tsx
src/features/products/components/ProductPagination.tsx
src/features/products/components/ProductSort.tsx
src/features/products/components/VariantConfigurationQueue.tsx
src/features/products/hooks/useProduct.ts
src/features/products/hooks/useProducts.ts
src/features/products/pages/ProductCataloguePage.tsx
src/features/products/pages/ProductDetailsPage.tsx
src/features/products/services/product.service.ts
src/features/products/store/product.store.ts
src/features/products/types/product.types.ts
src/features/products/utils/product.utils.ts
src/features/products/utils/variant.utils.ts
src/features/returns/services/return.service.ts
src/features/returns/types/return.types.ts
src/features/sellers/components/VariantManager.tsx
src/features/sellers/pages/CreateProduct.tsx
src/features/sellers/pages/SellerAnalytics.tsx
src/features/sellers/pages/SellerCoupons.tsx
src/features/sellers/pages/SellerCustomers.tsx
src/features/sellers/pages/SellerDashboard.tsx
src/features/sellers/pages/SellerFulfilment.tsx
src/features/sellers/pages/SellerInventory.tsx
src/features/sellers/pages/SellerOrders.tsx
src/features/sellers/pages/SellerPayouts.tsx
src/features/sellers/pages/SellerProducts.tsx
src/features/sellers/pages/SellerPromotions.tsx
src/features/sellers/pages/SellerReturns.tsx
src/features/sellers/pages/SellerReviews.tsx
src/features/sellers/pages/SellerSettings.tsx
src/features/sellers/types/seller.types.ts
src/features/shipping/index.ts
src/features/shipping/services/shipping.service.ts
src/features/shipping/types/shipping.types.ts
src/features/shipping/utils/shipping.validation.ts
src/features/users/pages/UserManagement.tsx
src/features/wallet/services/wallet-purchase.service.ts
src/features/wallet/services/wallet-topup.service.ts
src/features/wallet/services/wallet.service.ts
src/features/wallet/types/wallet.types.ts
src/features/warehouse/pages/Packing.tsx
src/features/warehouse/pages/Picking.tsx
src/features/warehouse/pages/Receiving.tsx
src/features/warehouse/pages/StockManagement.tsx
src/features/warehouse/pages/Transfers.tsx
src/features/warehouse/pages/WarehouseDashboard.tsx
```

## Pages

```text
src/pages/About.tsx
src/pages/Brands.tsx
src/pages/Cart.tsx
src/pages/Categories.tsx
src/pages/Checkout.tsx
src/pages/Contact.tsx
src/pages/Deals.tsx
src/pages/FlashSales.tsx
src/pages/Home.tsx
src/pages/Index.tsx
src/pages/NotFound.tsx
src/pages/OrderSuccess.tsx
src/pages/ProductDetail.tsx
src/pages/Products.tsx
src/pages/Search.tsx
src/pages/Shop.tsx
src/pages/TrackOrder.tsx
src/pages/Unauthorized.tsx
```

## Services

```text
src/services/api/client.ts
```

## Hooks

```text
src/hooks/use-mobile.tsx
src/hooks/use-toast.ts
```

## Providers

```text

```

## Context

```text
src/context/CartContext.tsx
src/context/ThemeContext.tsx
```

## Store

```text
src/store/cart.store.ts
```

---

# 3. Architecture Conflicts

Potential architecture conflict signals:

```text
cart.store.ts
index.ts
use-toast.ts
```

The following areas require manual architectural reconciliation:

- Feature/page separation
- Service boundaries
- State-management ownership
- Provider ownership
- API/data-access ownership
- Shared component ownership
- Type ownership
- Routing ownership

Detailed source-level conflicts should be confirmed from the files listed
above before implementation.

---

# 4. Duplicate Implementations

Duplicate filenames detected:

```text
cart.store.ts
index.ts
use-toast.ts
```

Potential duplicate authentication/cart/search/order/payment/wallet
implementations:

```text

### auth
src/app/layouts/AuthLayout.tsx
src/features/auth/components/AuthSessionProvider.tsx
src/features/auth/constants/auth.constants.ts
src/features/auth/hooks/useAuth.ts
src/features/auth/hooks/useAuthSession.ts
src/features/auth/index.ts
src/features/auth/pages/ForgotPassword.tsx
src/features/auth/pages/LoginPage.tsx
src/features/auth/pages/MfaPage.tsx
src/features/auth/pages/RegisterPage.tsx
src/features/auth/pages/ResetPassword.tsx
src/features/auth/pages/VerifyEmail.tsx
src/features/auth/pages/VerifyOtp.tsx
src/features/auth/permissions/permissions.ts
src/features/auth/permissions/roles.ts
src/features/auth/permissions/usePermissions.ts
src/features/auth/services/auth.service.ts
src/features/auth/store/auth.store.ts
src/features/auth/types/auth.types.ts
src/features/auth/utils/auth.utils.ts
src/pages/Unauthorized.tsx

### account
src/components/layout/AccountMenu.tsx
src/features/account/components/AccountShell.tsx
src/features/account/components/AccountSidebar.tsx
src/features/account/data/account.data.ts
src/features/account/index.ts
src/features/account/pages/AccountAddressesPage.tsx
src/features/account/pages/AccountDashboardPage.tsx
src/features/account/pages/AccountNotificationsPage.tsx
src/features/account/pages/AccountOrderDetailsPage.tsx
src/features/account/pages/AccountOrdersPage.tsx
src/features/account/pages/AccountProfilePage.tsx
src/features/account/pages/AccountReturnRequestPage.tsx
src/features/account/pages/AccountReviewsPage.tsx
src/features/account/pages/AccountSecurityPage.tsx
src/features/account/pages/AccountSupportPage.tsx
src/features/account/pages/AccountWalletPage.tsx
src/features/account/pages/AccountWishlistPage.tsx
src/features/account/types/account.types.ts

### products
src/components/home/FeaturedProducts.tsx
src/features/products/components/ProductFilters.tsx
src/features/products/components/ProductPagination.tsx
src/features/products/components/ProductSort.tsx
src/features/products/components/VariantConfigurationQueue.tsx
src/features/products/hooks/useProduct.ts
src/features/products/hooks/useProducts.ts
src/features/products/pages/ProductCataloguePage.tsx
src/features/products/pages/ProductDetailsPage.tsx
src/features/products/services/product.service.ts
src/features/products/store/product.store.ts
src/features/products/types/product.types.ts
src/features/products/utils/product.utils.ts
src/features/products/utils/variant.utils.ts
src/features/sellers/pages/SellerProducts.tsx
src/pages/Products.tsx

### search
src/components/layout/StorefrontSearch.tsx
src/pages/Search.tsx

### cart
src/context/CartContext.tsx
src/features/cart/hooks/useCart.ts
src/features/cart/index.ts
src/features/cart/store/cart.store.ts
src/features/cart/types/cart.types.ts
src/features/cart/utils/cart.utils.ts
src/pages/Cart.tsx
src/store/cart.store.ts

### checkout
src/features/checkout/index.ts
src/features/checkout/services/checkout-payment-state.service.ts
src/features/checkout/services/checkout.service.ts
src/features/checkout/services/payment-orchestration.service.ts
src/features/checkout/types/checkout.types.ts
src/features/checkout/utils/checkout-payment-safety.ts
src/features/checkout/utils/checkout.utils.ts
src/features/checkout/utils/checkout.validation.ts
src/pages/Checkout.tsx

### orders
src/features/account/pages/AccountOrdersPage.tsx
src/features/customers/pages/OrdersPage.tsx
src/features/orders/hooks/useOrders.ts
src/features/orders/index.ts
src/features/orders/services/order.service.ts
src/features/orders/services/seller-order.service.ts
src/features/orders/types/order.types.ts
src/features/orders/types/seller-order.types.ts
src/features/sellers/pages/SellerOrders.tsx
src/pages/OrderSuccess.tsx

### payments
src/features/payments/adapters/demo-payment.adapter.ts
src/features/payments/index.ts
src/features/payments/services/ledger.service.ts
src/features/payments/services/order-payment-sync.service.ts
src/features/payments/services/order-payment.service.ts
src/features/payments/services/payment-adapter.registry.ts
src/features/payments/services/payment-core.service.ts
src/features/payments/services/payment-reconciliation-queue.service.ts
src/features/payments/services/payment-reconciliation.service.ts
src/features/payments/services/payment-recovery.service.ts
src/features/payments/services/payment-transaction.service.ts
src/features/payments/services/payment-validation.service.ts
src/features/payments/services/payment-webhook.service.ts
src/features/payments/services/payment.service.ts
src/features/payments/services/refund.service.ts
src/features/payments/types/payment-adapter.types.ts
src/features/payments/types/payment-core.types.ts
src/features/payments/types/payment-ledger.types.ts
src/features/payments/types/payment.types.ts

### wallet
src/features/account/pages/AccountWalletPage.tsx
src/features/customers/pages/WalletPage.tsx
src/features/wallet/services/wallet-purchase.service.ts
src/features/wallet/services/wallet-topup.service.ts
src/features/wallet/services/wallet.service.ts
src/features/wallet/types/wallet.types.ts

### sellers
src/features/sellers/components/VariantManager.tsx
src/features/sellers/pages/CreateProduct.tsx
src/features/sellers/pages/SellerAnalytics.tsx
src/features/sellers/pages/SellerCoupons.tsx
src/features/sellers/pages/SellerCustomers.tsx
src/features/sellers/pages/SellerDashboard.tsx
src/features/sellers/pages/SellerFulfilment.tsx
src/features/sellers/pages/SellerInventory.tsx
src/features/sellers/pages/SellerOrders.tsx
src/features/sellers/pages/SellerPayouts.tsx
src/features/sellers/pages/SellerProducts.tsx
src/features/sellers/pages/SellerPromotions.tsx
src/features/sellers/pages/SellerReturns.tsx
src/features/sellers/pages/SellerReviews.tsx
src/features/sellers/pages/SellerSettings.tsx
src/features/sellers/types/seller.types.ts

### logistics
src/features/admin/pages/LogisticsManagement.tsx
src/features/logistics/index.ts
src/features/logistics/pages/Deliveries.tsx
src/features/logistics/pages/Drivers.tsx
src/features/logistics/pages/LogisticsDashboard.tsx
src/features/logistics/pages/LogisticsOperationsPage.tsx
src/features/logistics/pages/PickupPoints.tsx
src/features/logistics/pages/Routes.tsx
src/features/logistics/pages/TrackShipmentPage.tsx
src/features/logistics/services/carrier.service.ts
src/features/logistics/services/delivery-exception.service.ts
src/features/logistics/services/fulfilment-shipment.service.ts
src/features/logistics/services/return-inspection.service.ts
src/features/logistics/services/return-shipment.service.ts
src/features/logistics/services/shipment-assignment.service.ts
src/features/logistics/services/shipment.service.ts
src/features/logistics/types/logistics.types.ts

### notifications
src/features/account/pages/AccountNotificationsPage.tsx

### admin
src/app/guards/AdminRoute.tsx
src/app/layouts/AdminLayout.tsx
src/features/admin/pages/AdminDashboard.tsx
src/features/admin/pages/CMSManagement.tsx
src/features/admin/pages/CategoryManagement.tsx
src/features/admin/pages/CustomerManagement.tsx
src/features/admin/pages/InventoryManagement.tsx
src/features/admin/pages/LogisticsManagement.tsx
src/features/admin/pages/MarketingManagement.tsx
src/features/admin/pages/OrderManagement.tsx
src/features/admin/pages/PaymentManagement.tsx
src/features/admin/pages/ProductManagement.tsx
src/features/admin/pages/Reports.tsx
src/features/admin/pages/ReturnManagement.tsx
src/features/admin/pages/SellerManagement.tsx
src/features/admin/pages/SystemSettings.tsx
src/features/admin/pages/WarehouseManagement.tsx
```

**Important:** Nothing has been deleted or merged during Phase 1.

---

# 5. Provider Audit

Provider/context signals:

```text
src/features/payments/services/payment-reconciliation.service.ts:4:export interface ReconciliationRecord { id:string; reference:string; providerReference:string; result:ReconciliationResult; internalAmount:number; providerAmount:number; providerStatus:"successful"|"failed"|"cancelled"; note?:string; reconciledAt:string; }
src/features/payments/services/payment-reconciliation.service.ts:11: reconcile(input:{reference:string;providerReference:string;providerAmount:number;providerStatus:"successful"|"failed"|"cancelled";note?:string}){
src/features/payments/services/payment-reconciliation.service.ts:14:  if(!tx){const r:ReconciliationRecord={id:crypto.randomUUID(),reference:input.reference,providerReference:input.providerReference,result:"unknown-reference",internalAmount:0,providerAmount:input.providerAmount,providerStatus:input.providerStatus,note:input.note,reconciledAt:now};write([r,...read()]);return r;}
src/features/payments/services/payment-reconciliation.service.ts:16:  if(tx.amount!==input.providerAmount) result="amount-mismatch";
src/features/payments/services/payment-reconciliation.service.ts:17:  else if(tx.status!==input.providerStatus) result="status-mismatch";
src/features/payments/services/payment-reconciliation.service.ts:18:  const r:ReconciliationRecord={id:crypto.randomUUID(),reference:input.reference,providerReference:input.providerReference,result,internalAmount:tx.amount,providerAmount:input.providerAmount,providerStatus:input.providerStatus,note:input.note,reconciledAt:now};write([r,...read()]);
src/features/payments/services/payment-core.service.ts:5:  CorePaymentProvider,
src/features/payments/services/payment-core.service.ts:26:const providerFor = (method: CreateCorePaymentPayload["method"]): CorePaymentProvider => {
src/features/payments/services/payment-core.service.ts:65:      provider: payload.provider ?? providerFor(payload.method),
src/features/payments/services/payment-transaction.service.ts:3:export interface PaymentTransaction { id:string; reference:string; operation:"collect"|"verify"|"refund"; amount:number; currency:"GHS"; status:PaymentAdapterStatus; provider?:string; providerReference?:string; orderId?:string; walletId?:string; createdAt:string; updatedAt:string; }
src/features/payments/services/payment-webhook.service.ts:4:export interface PaymentWebhookEvent { eventId:string; reference:string; status:"successful"|"failed"|"cancelled"; providerReference?:string; amount?:number; receivedAt:string; }
src/features/payments/services/payment-webhook.service.ts:14:  const updated=paymentTransactionService.update(event.reference,{status:event.status,providerReference:event.providerReference});
src/features/payments/services/payment-reconciliation-queue.service.ts:18:  if(input.resolution==="confirmed"&&record.result==="amount-mismatch") paymentTransactionService.update(record.reference,{amount:record.providerAmount,status:record.providerStatus});
src/features/payments/services/payment-reconciliation-queue.service.ts:19:  if(input.resolution==="confirmed"&&record.result==="status-mismatch") paymentTransactionService.update(record.reference,{status:record.providerStatus});
src/features/payments/services/payment.service.ts:70:      provider: payload.provider,
src/features/payments/services/payment-validation.service.ts:3:export interface PaymentCallbackInput { reference:string; status:"successful"|"failed"|"cancelled"; amount:number; currency:"GHS"; providerReference?:string; signature?:string; }
src/features/payments/types/payment-adapter.types.ts:20:  providerReference?: string;
src/features/payments/types/payment.types.ts:7:export type PaymentProvider =
src/features/payments/types/payment.types.ts:45:  provider: PaymentProvider;
src/features/payments/types/payment.types.ts:57:  provider: PaymentProvider;
src/features/payments/types/payment-core.types.ts:2:export type CorePaymentProvider = "momo" | "card-network" | "bank" | "internal";
src/features/payments/types/payment-core.types.ts:13:  provider: CorePaymentProvider;
src/features/payments/types/payment-core.types.ts:27:  provider?: CorePaymentProvider;
src/features/wallet/services/wallet-topup.service.ts:5:export interface WalletTopUpIntent { id:string; walletId:string; customerId:string; amount:number; currency:"GHS"; method:WalletTopUpMethod; status:WalletTopUpStatus; providerReference?:string; createdAt:string; updatedAt:string; }
src/features/wallet/services/wallet-topup.service.ts:13: confirm(id:string,providerReference:string){const items=read();const index=items.findIndex(x=>x.id===id);if(index<0)return null;const intent=items[index];if(intent.status!=="awaiting-payment")return intent;const tx=walletService.record(intent.walletId,{type:"top-up",amount:intent.amount,description:`Wallet top-up via ${intent.method}`,status:"completed"});if(!tx)return null;const updated={...intent,status:"confirmed" as const,providerReference,updatedAt:new Date().toISOString()};items[index]=updated;write(items);return updated},
src/features/checkout/services/checkout-payment-state.service.ts:24:  isAwaitingProvider(reference: string) {
src/features/auth/pages/MfaPage.tsx:42:     * when the backend authentication provider
src/features/auth/index.ts:5:  default as AuthSessionProvider,
src/features/auth/index.ts:6:} from "./components/AuthSessionProvider";
src/features/auth/components/AuthSessionProvider.tsx:14:export default function AuthSessionProvider({
src/main.tsx:5:import AppProviders from "@/app/providers/AppProviders";
src/main.tsx:19:    <AppProviders>
src/main.tsx:21:    </AppProviders>
src/context/ThemeContext.tsx:1:import React, { createContext, useContext, useEffect, useState } from "react";
src/context/ThemeContext.tsx:11:const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
src/context/ThemeContext.tsx:13:export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
src/context/ThemeContext.tsx:39:    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
src/context/ThemeContext.tsx:41:    </ThemeContext.Provider>
src/context/ThemeContext.tsx:46:  const context = useContext(ThemeContext);
src/context/ThemeContext.tsx:48:    throw new Error("useTheme must be used within a ThemeProvider");
src/context/CartContext.tsx:1:import React, { createContext, useCallback, useContext, useMemo } from "react";
src/context/CartContext.tsx:33:const CartContext = createContext<CartContextType | undefined>(undefined);
src/context/CartContext.tsx:103:export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
src/context/CartContext.tsx:168:    <CartContext.Provider
src/context/CartContext.tsx:180:    </CartContext.Provider>
src/context/CartContext.tsx:185:  const context = useContext(CartContext);
src/context/CartContext.tsx:187:    throw new Error("useCart must be used within a CartProvider");
src/App.tsx:2:import { RouterProvider } from "react-router-dom";
src/App.tsx:18:  return <RouterProvider router={router} fallbackElement={<RouteLoadingFallback />} />;
src/app/router/AppRoutes.tsx:1:import { RouterProvider } from "react-router-dom";
src/app/router/AppRoutes.tsx:6:  return <RouterProvider router={router} />;
src/app/layouts/AuthLayout.tsx:33:              sellers, logistics providers and businesses in one
src/app/providers/ThemeProvider.tsx:3:import { ThemeProvider as ApplicationThemeProvider } from "@/context/ThemeContext";
src/app/providers/ThemeProvider.tsx:9:export function ThemeProvider({ children }: Props) {
src/app/providers/ThemeProvider.tsx:11:    <ApplicationThemeProvider>
src/app/providers/ThemeProvider.tsx:13:    </ApplicationThemeProvider>
src/app/providers/ThemeProvider.tsx:17:export default ThemeProvider;
src/app/providers/QueryProvider.tsx:3:  QueryClientProvider,
src/app/providers/QueryProvider.tsx:17:export function QueryProvider({
src/app/providers/QueryProvider.tsx:36:    <QueryClientProvider
src/app/providers/QueryProvider.tsx:40:    </QueryClientProvider>
src/app/providers/AppProviders.tsx:3:import { HelmetProvider } from "react-helmet-async";
src/app/providers/AppProviders.tsx:6:  QueryClientProvider,
src/app/providers/AppProviders.tsx:9:import { TooltipProvider } from "@/components/ui/tooltip";
src/app/providers/AppProviders.tsx:13:import { CartProvider } from "@/context/CartContext";
src/app/providers/AppProviders.tsx:14:import { ThemeProvider } from "@/context/ThemeContext";
src/app/providers/AppProviders.tsx:15:import AuthSessionProvider from "@/features/auth/components/AuthSessionProvider";
src/app/providers/AppProviders.tsx:17:interface AppProvidersProps {
src/app/providers/AppProviders.tsx:31:export default function AppProviders({
src/app/providers/AppProviders.tsx:33:}: AppProvidersProps) {
src/app/providers/AppProviders.tsx:35:    <HelmetProvider>
src/app/providers/AppProviders.tsx:36:      <QueryClientProvider
src/app/providers/AppProviders.tsx:39:        <ThemeProvider>
src/app/providers/AppProviders.tsx:40:          <AuthSessionProvider>
src/app/providers/AppProviders.tsx:41:            <CartProvider>
src/app/providers/AppProviders.tsx:42:              <TooltipProvider>
src/app/providers/AppProviders.tsx:47:              </TooltipProvider>
src/app/providers/AppProviders.tsx:48:            </CartProvider>
src/app/providers/AppProviders.tsx:49:          </AuthSessionProvider>
src/app/providers/AppProviders.tsx:50:        </ThemeProvider>
src/app/providers/AppProviders.tsx:51:      </QueryClientProvider>
src/app/providers/AppProviders.tsx:52:    </HelmetProvider>
src/components/ui/sidebar.tsx:13:import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
src/components/ui/sidebar.tsx:32:const SidebarContext = React.createContext<SidebarContext | null>(null);
src/components/ui/sidebar.tsx:35:  const context = React.useContext(SidebarContext);
src/components/ui/sidebar.tsx:37:    throw new Error("useSidebar must be used within a SidebarProvider.");
src/components/ui/sidebar.tsx:43:const SidebarProvider = React.forwardRef<
src/components/ui/sidebar.tsx:109:    <SidebarContext.Provider value={contextValue}>
src/components/ui/sidebar.tsx:110:      <TooltipProvider delayDuration={0}>
src/components/ui/sidebar.tsx:125:      </TooltipProvider>
src/components/ui/sidebar.tsx:126:    </SidebarContext.Provider>
src/components/ui/sidebar.tsx:129:SidebarProvider.displayName = "SidebarProvider";
src/components/ui/sidebar.tsx:632:  SidebarProvider,
src/components/ui/form.tsx:4:import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";
src/components/ui/form.tsx:9:const Form = FormProvider;
src/components/ui/form.tsx:18:const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);
src/components/ui/form.tsx:27:    <FormFieldContext.Provider value={{ name: props.name }}>
src/components/ui/form.tsx:29:    </FormFieldContext.Provider>
src/components/ui/form.tsx:34:  const fieldContext = React.useContext(FormFieldContext);
src/components/ui/form.tsx:35:  const itemContext = React.useContext(FormItemContext);
src/components/ui/form.tsx:60:const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);
src/components/ui/form.tsx:67:      <FormItemContext.Provider value={{ id }}>
src/components/ui/form.tsx:69:      </FormItemContext.Provider>
src/components/ui/carousel.tsx:29:const CarouselContext = React.createContext<CarouselContextProps | null>(null);
src/components/ui/carousel.tsx:32:  const context = React.useContext(CarouselContext);
src/components/ui/carousel.tsx:106:      <CarouselContext.Provider
src/components/ui/carousel.tsx:128:      </CarouselContext.Provider>
src/components/ui/input-otp.tsx:28:  const inputOTPContext = React.useContext(OTPInputContext);
src/components/ui/toggle-group.tsx:8:const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
src/components/ui/toggle-group.tsx:18:    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
src/components/ui/toggle-group.tsx:28:  const context = React.useContext(ToggleGroupContext);
src/components/ui/toaster.tsx:2:import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";
src/components/ui/toaster.tsx:8:    <ToastProvider>
src/components/ui/toaster.tsx:22:    </ToastProvider>
src/components/ui/toast.tsx:8:const ToastProvider = ToastPrimitives.Provider;
src/components/ui/toast.tsx:104:  ToastProvider,
src/components/ui/chart.tsx:20:const ChartContext = React.createContext<ChartContextProps | null>(null);
src/components/ui/chart.tsx:23:  const context = React.useContext(ChartContext);
src/components/ui/chart.tsx:43:    <ChartContext.Provider value={{ config }}>
src/components/ui/chart.tsx:56:    </ChartContext.Provider>
src/components/ui/tooltip.tsx:6:const TooltipProvider = TooltipPrimitive.Provider;
src/components/ui/tooltip.tsx:28:export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

The following must be verified during Phase 2:

1. Provider mounting
2. Provider ordering
3. Authentication availability
4. Cart provider availability
5. Query/cache provider availability
6. Theme provider availability
7. Error boundary placement
8. Protected route/provider interaction

---

# 6. Route Audit

Routing signals:

```text
src/features/account/components/AccountShell.tsx:19:    path: "/account",
src/features/account/components/AccountShell.tsx:25:    path: "/account/profile",
src/features/account/components/AccountShell.tsx:30:    path: "/account/orders",
src/features/account/components/AccountShell.tsx:35:    path: "/account/wishlist",
src/features/account/components/AccountShell.tsx:40:    path: "/account/addresses",
src/features/account/components/AccountShell.tsx:45:    path: "/account/wallet",
src/features/account/components/AccountShell.tsx:50:    path: "/account/notifications",
src/features/account/components/AccountShell.tsx:55:    path: "/account/reviews",
src/features/account/components/AccountShell.tsx:60:    path: "/account/support",
src/features/account/components/AccountShell.tsx:65:    path: "/account/security",
src/pages/Unauthorized.tsx:37:            Requested path:{" "}
src/App.tsx:18:  return <RouterProvider router={router} fallbackElement={<RouteLoadingFallback />} />;
src/app/router/routes.tsx:1:import { createBrowserRouter, type RouteObject } from "react-router-dom";
src/app/router/routes.tsx:14:const lazy = (loader: () => Promise<PageModule>): Pick<RouteObject, "lazy"> => ({ lazy: async () => ({ Component: (await loader()).default }) });
src/app/router/routes.tsx:16:{index:true,...lazy(()=>import("@/pages/Home"))},{path:"shop",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"products",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"products/:id",...lazy(()=>import("@/features/products/pages/ProductDetailsPage"))},{path:"product/:id",...lazy(()=>import("@/features/products/pages/ProductDetailsPage"))},{path:"search",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"categories",...lazy(()=>import("@/pages/Categories"))},{path:"brands",...lazy(()=>import("@/pages/Brands"))},{path:"deals",...lazy(()=>import("@/pages/Deals"))},{path:"flash-sales",...lazy(()=>import("@/pages/FlashSales"))},{path:"cart",...lazy(()=>import("@/pages/Cart"))},{path:"checkout",...lazy(()=>import("@/pages/Checkout"))},{path:"order-success",...lazy(()=>import("@/pages/OrderSuccess"))},{path:"track-order",...lazy(()=>import("@/features/logistics/pages/TrackShipmentPage"))},{path:"about",...lazy(()=>import("@/pages/About"))},{path:"contact",...lazy(()=>import("@/pages/Contact"))},{path:"unauthorized",...lazy(()=>import("@/pages/Unauthorized"))}];
src/app/router/routes.tsx:17:const authRoutes:RouteObject[]=[{path:"/auth/login",...lazy(()=>import("@/features/auth/pages/LoginPage"))},{path:"/auth/register",...lazy(()=>import("@/features/auth/pages/RegisterPage"))},{path:"/auth/forgot-password",...lazy(()=>import("@/features/auth/pages/ForgotPassword"))},{path:"/auth/reset-password",...lazy(()=>import("@/features/auth/pages/ResetPassword"))},{path:"/auth/verify-email",...lazy(()=>import("@/features/auth/pages/VerifyEmail"))},{path:"/auth/verify-otp",...lazy(()=>import("@/features/auth/pages/VerifyOtp"))},{path:"/auth/mfa",...lazy(()=>import("@/features/auth/pages/MfaPage"))}];
src/app/router/routes.tsx:18:const accountRoutes:RouteObject[]=[{path:"/account",...lazy(()=>import("@/features/account/pages/AccountDashboardPage"))},{path:"/account/profile",...lazy(()=>import("@/features/account/pages/AccountProfilePage"))},{path:"/account/orders",...lazy(()=>import("@/features/account/pages/AccountOrdersPage"))},{path:"/account/orders/:id",...lazy(()=>import("@/features/account/pages/AccountOrderDetailsPage"))},{path:"/account/orders/:id/return",...lazy(()=>import("@/features/account/pages/AccountReturnRequestPage"))},{path:"/account/wishlist",...lazy(()=>import("@/features/account/pages/AccountWishlistPage"))},{path:"/account/addresses",...lazy(()=>import("@/features/account/pages/AccountAddressesPage"))},{path:"/account/notifications",...lazy(()=>import("@/features/account/pages/AccountNotificationsPage"))},{path:"/account/wallet",...lazy(()=>import("@/features/account/pages/AccountWalletPage"))},{path:"/account/reviews",...lazy(()=>import("@/features/account/pages/AccountReviewsPage"))},{path:"/account/security",...lazy(()=>import("@/features/account/pages/AccountSecurityPage"))},{path:"/account/support",...lazy(()=>import("@/features/account/pages/AccountSupportPage"))}];
src/app/router/routes.tsx:19:const sellerRoutes:RouteObject[]=[{path:"/seller",...lazy(()=>import("@/features/sellers/pages/SellerDashboard"))},{path:"/seller/products",...lazy(()=>import("@/features/sellers/pages/SellerProducts"))},{path:"/seller/products/new",...lazy(()=>import("@/features/sellers/pages/CreateProduct"))},{path:"/seller/orders",...lazy(()=>import("@/features/sellers/pages/SellerOrders"))},{path:"/seller/fulfilment",...lazy(()=>import("@/features/sellers/pages/SellerFulfilment"))},{path:"/seller/returns",...lazy(()=>import("@/features/sellers/pages/SellerReturns"))},{path:"/seller/inventory",...lazy(()=>import("@/features/sellers/pages/SellerInventory"))},{path:"/seller/customers",...lazy(()=>import("@/features/sellers/pages/SellerCustomers"))},{path:"/seller/analytics",...lazy(()=>import("@/features/sellers/pages/SellerAnalytics"))},{path:"/seller/payouts",...lazy(()=>import("@/features/sellers/pages/SellerPayouts"))},{path:"/seller/promotions",...lazy(()=>import("@/features/sellers/pages/SellerPromotions"))},{path:"/seller/coupons",...lazy(()=>import("@/features/sellers/pages/SellerCoupons"))},{path:"/seller/reviews",...lazy(()=>import("@/features/sellers/pages/SellerReviews"))},{path:"/seller/settings",...lazy(()=>import("@/features/sellers/pages/SellerSettings"))}];
src/app/router/routes.tsx:20:const adminRoutes:RouteObject[]=[{path:"/admin",...lazy(()=>import("@/features/admin/pages/AdminDashboard"))},{path:"/admin/products",...lazy(()=>import("@/features/admin/pages/ProductManagement"))},{path:"/admin/categories",...lazy(()=>import("@/features/admin/pages/CategoryManagement"))},{path:"/admin/customers",...lazy(()=>import("@/features/admin/pages/CustomerManagement"))},{path:"/admin/inventory",...lazy(()=>import("@/features/admin/pages/InventoryManagement"))},{path:"/admin/orders",...lazy(()=>import("@/features/admin/pages/OrderManagement"))},{path:"/admin/returns",...lazy(()=>import("@/features/admin/pages/ReturnManagement"))},{path:"/admin/sellers",...lazy(()=>import("@/features/admin/pages/SellerManagement"))},{path:"/admin/warehouses",...lazy(()=>import("@/features/admin/pages/WarehouseManagement"))},{path:"/admin/logistics",...lazy(()=>import("@/features/logistics/pages/LogisticsOperationsPage"))},{path:"/admin/payments",...lazy(()=>import("@/features/admin/pages/PaymentManagement"))},{path:"/admin/marketing",...lazy(()=>import("@/features/admin/pages/MarketingManagement"))},{path:"/admin/cms",...lazy(()=>import("@/features/admin/pages/CMSManagement"))},{path:"/admin/reports",...lazy(()=>import("@/features/admin/pages/Reports"))},{path:"/admin/settings",...lazy(()=>import("@/features/admin/pages/SystemSettings"))}];
src/app/router/routes.tsx:21:export default createBrowserRouter([{path:"/",element:<MainLayout/>,children:publicRoutes},{element:<AuthLayout/>,children:[{element:<PublicRoute/>,children:authRoutes.slice(0,3)},...authRoutes.slice(3)]},{element:<ProtectedRoute/>,children:[{element:<DashboardLayout/>,children:accountRoutes}]},{element:<SellerRoute/>,children:[{element:<SellerLayout/>,children:sellerRoutes}]},{element:<AdminRoute/>,children:[{element:<AdminLayout/>,children:adminRoutes}]},{path:"/unauthorized",...lazy(()=>import("@/pages/Unauthorized"))},{path:"*",...lazy(()=>import("@/pages/NotFound"))}]);
src/app/router/AppRoutes.tsx:6:  return <RouterProvider router={router} />;
src/components/layout/Footer.tsx:72:                { name: "All Products", path: "/products" },
src/components/layout/Footer.tsx:73:                { name: "Categories", path: "/categories" },
src/components/layout/Footer.tsx:74:                { name: "Today's Deals", path: "/deals" },
src/components/layout/Footer.tsx:75:                { name: "New Arrivals", path: "/products?filter=new" },
src/components/layout/Footer.tsx:76:                { name: "Best Sellers", path: "/products?filter=best" },
src/components/layout/Footer.tsx:95:                { name: "Help Center", path: "/help" },
src/components/layout/Footer.tsx:96:                { name: "Track Order", path: "/track-order" },
src/components/layout/Footer.tsx:97:                { name: "Returns & Refunds", path: "/returns" },
src/components/layout/Footer.tsx:98:                { name: "Payment Methods", path: "/payments" },
src/components/layout/Footer.tsx:99:                { name: "Shipping Info", path: "/shipping" },
src/components/NavLink.tsx:14:      <RouterNavLink
```

## Route Inventory

The current repository requires route reconciliation against actual
components before implementation.

Required route domains:

- Public
- Authentication
- Customer
- Seller
- Logistics
- Payment
- Administration
- Fallback/404

No route has been automatically changed during this phase.

---

# 7. Missing Pages

The following domains require reconciliation against the route inventory:

- Authentication
- Customer account
- Products
- Search
- Cart
- Checkout
- Orders
- Payments
- Wallet
- Sellers
- Logistics
- Notifications
- Administration

Placeholder signals:

```text
src/features/account/pages/AccountReturnRequestPage.tsx:149:          <div><label htmlFor="return-note" className="text-sm font-medium">Additional details <span className="text-muted-foreground">(optional)</span></label><Textarea id="return-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Tell us anything that will help us review the request." className="mt-2 min-h-28" maxLength={1000} /><p className="mt-1 text-right text-xs text-muted-foreground">{note.length}/1000</p></div>
src/features/sellers/pages/SellerSettings.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerSettings.tsx:4:  return <PagePlaceholder title="Seller Settings" />;
src/features/sellers/pages/SellerOrders.tsx:128:        <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order number, customer or phone" className="pl-9" /></div>
src/features/sellers/pages/SellerOrders.tsx:147:            {isDispatching && <div className="rounded-xl border bg-muted/20 p-4"><div className="mb-4"><p className="font-semibold">Dispatch shipment</p><p className="text-sm text-muted-foreground">Enter the carrier and optional tracking details before confirming dispatch.</p></div><div className="grid gap-4 md:grid-cols-2"><label className="text-sm font-medium">Carrier<input value={dispatchForm.carrier} onChange={(event) => setDispatchForm((f) => ({ ...f, carrier: event.target.value }))} placeholder="e.g. DHL, FedEx, local courier" className="mt-1 h-10 w-full rounded-md border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label><label className="text-sm font-medium">Tracking number<input value={dispatchForm.trackingNumber} onChange={(event) => setDispatchForm((f) => ({ ...f, trackingNumber: event.target.value }))} placeholder="Optional" className="mt-1 h-10 w-full rounded-md border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label><label className="text-sm font-medium">Tracking URL<input type="url" value={dispatchForm.trackingUrl} onChange={(event) => setDispatchForm((f) => ({ ...f, trackingUrl: event.target.value }))} placeholder="https://..." className="mt-1 h-10 w-full rounded-md border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label><label className="text-sm font-medium">Estimated delivery<input type="date" value={dispatchForm.estimatedDelivery} onChange={(event) => setDispatchForm((f) => ({ ...f, estimatedDelivery: event.target.value }))} className="mt-1 h-10 w-full rounded-md border bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-primary" /></label></div><div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => dispatch(order)}><Truck className="mr-2 h-4 w-4" /> Confirm dispatch</Button><Button variant="outline" onClick={() => setDispatchingId(null)}>Cancel</Button></div></div>}
src/features/sellers/pages/SellerReturns.tsx:50:              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
src/features/sellers/pages/CreateProduct.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/CreateProduct.tsx:4:  return <PagePlaceholder title="Add Product" />;
src/features/sellers/pages/SellerProducts.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerProducts.tsx:4:  return <PagePlaceholder title="Seller Products" />;
src/features/sellers/pages/SellerPayouts.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerPayouts.tsx:4:  return <PagePlaceholder title="Seller Payouts" />;
src/features/sellers/pages/SellerReviews.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerReviews.tsx:4:  return <PagePlaceholder title="Seller Reviews" />;
src/features/sellers/pages/SellerInventory.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerInventory.tsx:4:  return <PagePlaceholder title="Seller Inventory" />;
src/features/sellers/pages/SellerAnalytics.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerAnalytics.tsx:4:  return <PagePlaceholder title="Seller Analytics" />;
src/features/sellers/pages/SellerCustomers.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerCustomers.tsx:4:  return <PagePlaceholder title="Seller Customers" />;
src/features/sellers/pages/SellerPromotions.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerPromotions.tsx:4:  return <PagePlaceholder title="Seller Promotions" />;
src/features/sellers/pages/SellerDashboard.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerDashboard.tsx:4:  return <PagePlaceholder title="Seller Dashboard" />;
src/features/sellers/pages/SellerCoupons.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/sellers/pages/SellerCoupons.tsx:4:  return <PagePlaceholder title="Seller Coupons" />;
src/features/sellers/components/VariantManager.tsx:160:                  placeholder="Option name e.g. Size, Colour, Material"
src/features/sellers/components/VariantManager.tsx:180:                      placeholder="Option value"
src/features/users/pages/UserManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/users/pages/UserManagement.tsx:4:  return <PagePlaceholder title="User Management" />;
src/features/logistics/pages/TrackShipmentPage.tsx:18:  return <><Helmet><title>Track Your Order | BredaBuy</title><meta name="description" content="Track your BredaBuy shipment and delivery progress."/></Helmet><main className="container mx-auto max-w-4xl px-4 py-10"><div className="mx-auto max-w-2xl text-center"><Badge variant="secondary">BredaBuy Logistics</Badge><h1 className="mt-4 text-3xl font-bold md:text-4xl">Track your shipment</h1><p className="mt-3 text-muted-foreground">Enter your BredaBuy tracking number to see the latest delivery updates.</p><form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row"><Input value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. BB-SHP-ABC123" aria-label="Tracking number"/><Button type="submit"><Search className="mr-2 h-4 w-4"/>Track shipment</Button></form>{error&&<p className="mt-3 text-sm text-destructive" role="alert">{error}</p>}</div>{shipment&&<div className="mt-10 space-y-6"><Card><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5"/>Shipment {shipment.trackingNumber}</CardTitle><Badge>{labels[shipment.status]}</Badge></div></CardHeader><CardContent><div className="grid gap-4 sm:grid-cols-3"><div><p className="text-xs text-muted-foreground">Carrier</p><p className="font-medium">{shipment.carrierName}</p></div><div><p className="text-xs text-muted-foreground">Destination</p><p className="font-medium">{shipment.destination.city}, {shipment.destination.region}</p></div><div><p className="text-xs text-muted-foreground">Estimated delivery</p><p className="font-medium">{shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString("en-GH") : "To be confirmed"}</p></div></div></CardContent></Card><Card><CardHeader><CardTitle>Delivery timeline</CardTitle></CardHeader><CardContent><div className="space-y-6">{events.map((event,index)=><div key={event.id} className="relative flex gap-4">{index<events.length-1&&<span className="absolute left-[11px] top-7 h-full w-px bg-border"/>}<div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">{event.type==="delivered"?<CheckCircle2 className="h-4 w-4"/>:event.location?<MapPin className="h-3.5 w-3.5"/>:<Clock3 className="h-3.5 w-3.5"/>}</div><div className="min-w-0"><p className="font-medium">{event.description}</p><p className="text-sm text-muted-foreground">{new Date(event.occurredAt).toLocaleString("en-GH")}{event.location?` · ${event.location}`:""}</p></div></div>)}</div></CardContent></Card></div>}</main></>;
src/features/logistics/pages/Drivers.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/logistics/pages/Drivers.tsx:4:  return <PagePlaceholder title="Drivers" />;
src/features/logistics/pages/Routes.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/logistics/pages/Routes.tsx:4:  return <PagePlaceholder title="Routes" />;
src/features/logistics/pages/LogisticsDashboard.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/logistics/pages/LogisticsDashboard.tsx:4:  return <PagePlaceholder title="LogisticsDashboard" />;
src/features/logistics/pages/Deliveries.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/logistics/pages/Deliveries.tsx:4:  return <PagePlaceholder title="Deliveries" />;
src/features/logistics/pages/PickupPoints.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/logistics/pages/PickupPoints.tsx:4:  return <PagePlaceholder title="PickupPoints" />;
src/features/logistics/pages/LogisticsOperationsPage.tsx:19:  return <><Helmet><title>Logistics Operations | BredaBuy Admin</title></Helmet><main className="container mx-auto space-y-8 px-4 py-8"><header><p className="text-sm font-medium text-primary">Operations</p><h1 className="text-3xl font-bold">Logistics control centre</h1><p className="mt-2 text-muted-foreground">Monitor shipments, delivery exceptions and carrier activity.</p></header><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{[["Total",summary.total,Truck],["Pending",summary.pending,PackageCheck],["In transit",summary.inTransit,Truck],["Out for delivery",summary.outForDelivery,Truck],["Delivered",summary.delivered,CheckCircle2],["Exceptions",summary.failedDelivery+summary.returned,AlertTriangle]].map(([name,value,Icon])=><Card key={name as string}><CardContent className="pt-6"><Icon className="mb-3 h-5 w-5 text-muted-foreground"/><p className="text-2xl font-bold">{value as number}</p><p className="text-xs text-muted-foreground">{name as string}</p></CardContent></Card>)}</section><Card><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><CardTitle>Shipments</CardTitle><div className="relative w-full md:w-80"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/><Input className="pl-9" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tracking, order, carrier, city" aria-label="Search shipments"/></div></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left"><th className="p-3">Tracking</th><th className="p-3">Order</th><th className="p-3">Destination</th><th className="p-3">Carrier</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead><tbody>{visible.map(s=><tr key={s.id} className="border-b last:border-0"><td className="p-3 font-medium">{s.trackingNumber}</td><td className="p-3">{s.orderNumber}</td><td className="p-3">{s.destination.city}, {s.destination.region}</td><td className="p-3">{s.carrierName}</td><td className="p-3"><Badge variant={s.status==="failed-delivery"||s.status==="returned"?"destructive":s.status==="delivered"?"secondary":"default"}>{labels[s.status]}</Badge></td><td className="p-3 text-right">{next[s.status]&&<Button size="sm" variant="outline" onClick={()=>advance(s)}><RefreshCw className="mr-2 h-3.5 w-3.5"/>{next[s.status]==="delivered"?"Confirm delivery":"Advance"}</Button>}</td></tr>)}{visible.length===0&&<tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No shipments found.</td></tr>}</tbody></table></div></CardContent></Card></main></>;
src/features/admin/pages/AdminDashboard.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/AdminDashboard.tsx:4:  return <PagePlaceholder title="AdminDashboard" />;
src/features/admin/pages/Reports.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/Reports.tsx:4:  return <PagePlaceholder title="Reports" />;
src/features/admin/pages/InventoryManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/InventoryManagement.tsx:4:  return <PagePlaceholder title="InventoryManagement" />;
src/features/admin/pages/ReturnManagement.tsx:94:              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, return ID, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
src/features/admin/pages/LogisticsManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/LogisticsManagement.tsx:4:  return <PagePlaceholder title="LogisticsManagement" />;
src/features/admin/pages/CategoryManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/CategoryManagement.tsx:4:  return <PagePlaceholder title="CategoryManagement" />;
src/features/admin/pages/OrderManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/OrderManagement.tsx:4:  return <PagePlaceholder title="OrderManagement" />;
src/features/admin/pages/SellerManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/SellerManagement.tsx:4:  return <PagePlaceholder title="SellerManagement" />;
src/features/admin/pages/PaymentManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/PaymentManagement.tsx:4:  return <PagePlaceholder title="PaymentManagement" />;
src/features/admin/pages/CMSManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/CMSManagement.tsx:4:  return <PagePlaceholder title="CMSManagement" />;
src/features/admin/pages/SystemSettings.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/SystemSettings.tsx:4:  return <PagePlaceholder title="SystemSettings" />;
src/features/admin/pages/CustomerManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/CustomerManagement.tsx:4:  return <PagePlaceholder title="CustomerManagement" />;
src/features/admin/pages/ProductManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/ProductManagement.tsx:4:  return <PagePlaceholder title="ProductManagement" />;
src/features/admin/pages/WarehouseManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/WarehouseManagement.tsx:4:  return <PagePlaceholder title="WarehouseManagement" />;
src/features/admin/pages/MarketingManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/admin/pages/MarketingManagement.tsx:4:  return <PagePlaceholder title="MarketingManagement" />;
src/features/products/hooks/useProducts.ts:37:    placeholderData: keepPreviousData,
src/features/products/pages/ProductCataloguePage.tsx:342:                placeholder="Search products..."
src/features/finance/pages/Invoices.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/Invoices.tsx:4:  return <PagePlaceholder title="Invoices" />;
src/features/finance/pages/Transactions.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/Transactions.tsx:4:  return <PagePlaceholder title="Transactions" />;
src/features/finance/pages/Settlements.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/Settlements.tsx:4:  return <PagePlaceholder title="Settlements" />;
src/features/finance/pages/Expenses.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/Expenses.tsx:4:  return <PagePlaceholder title="Expenses" />;
src/features/finance/pages/FinanceReports.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/FinanceReports.tsx:4:  return <PagePlaceholder title="FinanceReports" />;
src/features/finance/pages/FinanceDashboard.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/finance/pages/FinanceDashboard.tsx:4:  return <PagePlaceholder title="FinanceDashboard" />;
src/features/warehouse/pages/WarehouseDashboard.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/WarehouseDashboard.tsx:4:  return <PagePlaceholder title="WarehouseDashboard" />;
src/features/warehouse/pages/Picking.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/Picking.tsx:4:  return <PagePlaceholder title="Picking" />;
src/features/warehouse/pages/Packing.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/Packing.tsx:4:  return <PagePlaceholder title="Packing" />;
src/features/warehouse/pages/Receiving.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/Receiving.tsx:4:  return <PagePlaceholder title="Receiving" />;
src/features/warehouse/pages/StockManagement.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/StockManagement.tsx:4:  return <PagePlaceholder title="StockManagement" />;
src/features/warehouse/pages/Transfers.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/features/warehouse/pages/Transfers.tsx:4:  return <PagePlaceholder title="Transfers" />;
src/features/auth/pages/ForgotPassword.tsx:108:                  placeholder="you@example.com"
src/features/auth/pages/LoginPage.tsx:167:                  placeholder="you@example.com"
src/features/auth/pages/LoginPage.tsx:203:                  placeholder="Enter your password"
src/features/auth/pages/MfaPage.tsx:98:                placeholder="000000"
src/features/auth/pages/RegisterPage.tsx:184:                placeholder="+233..."
src/features/auth/pages/VerifyOtp.tsx:117:                placeholder="000000"
src/context/CartContext.tsx:87:      image: item.image ?? "/placeholder.svg",
src/pages/Checkout.tsx:128:              {([['firstName','First Name','given-name','text','John'],['lastName','Last Name','family-name','text','Doe'],['phone','Phone Number','tel','tel','+233 20 123 4567'],['email','Email Address','email','email','john@example.com'],['address','Delivery Address','street-address','text','123 Independence Avenue, Accra']] as const).map(([field,label,autocomplete,type,placeholder], index) => <label key={field} className={cn("block text-sm font-medium", index > 1 && "sm:col-span-2")}>{label}<input required={field !== "email"} type={type} autoComplete={autocomplete} value={form[field]} onChange={(e) => updateField(field, e.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} className={fieldClass(field)} placeholder={placeholder} />{errors[field] && <span id={`${field}-error`} className="mt-1 block text-xs text-destructive">{errors[field]}</span>}</label>)}
src/pages/Checkout.tsx:130:              <label className="block text-sm font-medium">City<input required type="text" autoComplete="address-level2" value={form.city} onChange={(e) => updateField("city", e.target.value)} aria-invalid={Boolean(errors.city)} className={fieldClass("city")} placeholder="Accra" />{errors.city && <span className="mt-1 block text-xs text-destructive">{errors.city}</span>}</label>
src/pages/Deals.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/Deals.tsx:4:  return <PagePlaceholder title="Deals" />;
src/pages/TrackOrder.tsx:114:                  placeholder="BB-2026-..."
src/pages/TrackOrder.tsx:126:                  placeholder="you@example.com or +233..."
src/pages/ProductDetail.tsx:293:                  Reviews coming soon! Be the first to review this product.
src/pages/Products.tsx:198:                      placeholder="Min"
src/pages/Products.tsx:208:                      placeholder="Max"
src/pages/About.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/About.tsx:4:  return <PagePlaceholder title="About BredaBuy Ghana" />;
src/pages/NotFound.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/NotFound.tsx:4:  return <PagePlaceholder title="Page Not Found" />;
src/pages/FlashSales.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/FlashSales.tsx:4:  return <PagePlaceholder title="Flash Sales" />;
src/pages/Search.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/Search.tsx:4:  return <PagePlaceholder title="Search" />;
src/pages/Shop.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/Shop.tsx:4:  return <PagePlaceholder title="Shop" description="Browse products." />;
src/pages/Contact.tsx:1:import PagePlaceholder from "@/shared/components/PagePlaceholder";
src/pages/Contact.tsx:4:  return <PagePlaceholder title="Contact Us" />;
src/shared/components/PagePlaceholder.tsx:1:interface PagePlaceholderProps {
src/shared/components/PagePlaceholder.tsx:6:export default function PagePlaceholder({
src/shared/components/PagePlaceholder.tsx:9:}: PagePlaceholderProps) {
src/components/layout/StorefrontSearch.tsx:54:        placeholder="Search products, brands and categories..."
src/components/layout/Footer.tsx:26:                placeholder="Enter your email"
src/components/ui/select.tsx:20:      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
src/components/ui/command.tsx:48:        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
src/components/ui/input.tsx:11:          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
src/components/ui/textarea.tsx:12:        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
src/components/chat/ChatWidget.tsx:164:            placeholder="Type your message..."
```

---

# 8. Service/Data Flow Audit

Detected data-access signals:

```text
src/features/orders/hooks/useOrders.ts:1:import { useQuery } from "@tanstack/react-query";
src/features/orders/hooks/useOrders.ts:6:  return useQuery({
src/features/orders/hooks/useOrders.ts:14:  return useQuery({
src/features/catalog/hooks/useCatalog.ts:2:  useQuery,
src/features/catalog/hooks/useCatalog.ts:17:  return useQuery({
src/features/catalog/hooks/useCatalogSummary.ts:1:import { useQuery } from "@tanstack/react-query";
src/features/catalog/hooks/useCatalogSummary.ts:6:  return useQuery({
src/features/products/hooks/useProducts.ts:3:  useQuery,
src/features/products/hooks/useProducts.ts:26:  return useQuery({
src/features/products/hooks/useProducts.ts:45:  return useQuery({
src/features/products/hooks/useProduct.ts:1:import { useQuery } from "@tanstack/react-query";
src/features/products/hooks/useProduct.ts:6:  return useQuery({
src/features/products/hooks/useProduct.ts:16:  return useQuery({
src/features/categories/hooks/useCategories.ts:1:import { useQuery } from "@tanstack/react-query";
src/features/categories/hooks/useCategories.ts:6:  return useQuery({
src/features/brands/hooks/useBrands.ts:1:import { useQuery } from "@tanstack/react-query";
src/features/brands/hooks/useBrands.ts:6:  return useQuery({
src/services/api/client.ts:1:import axios, {
src/services/api/client.ts:2:  AxiosError,
src/services/api/client.ts:3:  type InternalAxiosRequestConfig,
src/services/api/client.ts:4:} from "axios";
src/services/api/client.ts:10:export const apiClient = axios.create({
src/services/api/client.ts:19:  (config: InternalAxiosRequestConfig) => {
src/services/api/client.ts:49:  (error: AxiosError) => {
src/app/providers/QueryProvider.tsx:2:  QueryClient,
src/app/providers/QueryProvider.tsx:3:  QueryClientProvider,
src/app/providers/QueryProvider.tsx:21:  const [queryClient] =
src/app/providers/QueryProvider.tsx:24:        new QueryClient({
src/app/providers/QueryProvider.tsx:36:    <QueryClientProvider
src/app/providers/QueryProvider.tsx:37:      client={queryClient}
src/app/providers/QueryProvider.tsx:40:    </QueryClientProvider>
src/app/providers/AppProviders.tsx:5:  QueryClient,
src/app/providers/AppProviders.tsx:6:  QueryClientProvider,
src/app/providers/AppProviders.tsx:21:const queryClient = new QueryClient({
src/app/providers/AppProviders.tsx:36:      <QueryClientProvider
src/app/providers/AppProviders.tsx:37:        client={queryClient}
src/app/providers/AppProviders.tsx:51:      </QueryClientProvider>
```

Target flow for reconciliation:

```text
UI
 ↓
Page/Layout
 ↓
Feature Component
 ↓
Feature Hook / Query
 ↓
Domain Service
 ↓
API / Supabase / Backend
 ↓
Database
```

Areas requiring verification:

- Products
- Search
- Cart
- Checkout
- Orders
- Payments
- Wallet
- Seller operations
- Logistics
- Administration

---

# 9. Search Audit

Search-related implementation signals:

```text
src/features/sellers/pages/SellerOrders.tsx:2:import { CheckCircle2, PackageCheck, RefreshCw, Search, Truck } from "lucide-react";
src/features/sellers/pages/SellerOrders.tsx:128:        <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order number, customer or phone" className="pl-9" /></div>
src/features/sellers/pages/SellerOrders.tsx:133:        <Card><CardContent className="flex flex-col items-center justify-center py-16 text-center"><PackageCheck className="mb-4 h-12 w-12 text-muted-foreground" /><h2 className="text-lg font-semibold">No matching orders</h2><p className="mt-1 max-w-md text-sm text-muted-foreground">Adjust the search or status filter to find seller orders.</p></CardContent></Card>
src/features/sellers/pages/SellerReturns.tsx:3:import { PackageCheck, Search } from "lucide-react";
src/features/sellers/pages/SellerReturns.tsx:49:              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
src/features/sellers/pages/SellerReturns.tsx:50:              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
src/features/logistics/pages/TrackShipmentPage.tsx:2:import { Search, Truck, CheckCircle2, MapPin, Clock3 } from "lucide-react";
src/features/logistics/pages/TrackShipmentPage.tsx:18:  return <><Helmet><title>Track Your Order | BredaBuy</title><meta name="description" content="Track your BredaBuy shipment and delivery progress."/></Helmet><main className="container mx-auto max-w-4xl px-4 py-10"><div className="mx-auto max-w-2xl text-center"><Badge variant="secondary">BredaBuy Logistics</Badge><h1 className="mt-4 text-3xl font-bold md:text-4xl">Track your shipment</h1><p className="mt-3 text-muted-foreground">Enter your BredaBuy tracking number to see the latest delivery updates.</p><form onSubmit={submit} className="mt-7 flex flex-col gap-3 sm:flex-row"><Input value={value} onChange={e=>setValue(e.target.value)} placeholder="e.g. BB-SHP-ABC123" aria-label="Tracking number"/><Button type="submit"><Search className="mr-2 h-4 w-4"/>Track shipment</Button></form>{error&&<p className="mt-3 text-sm text-destructive" role="alert">{error}</p>}</div>{shipment&&<div className="mt-10 space-y-6"><Card><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5"/>Shipment {shipment.trackingNumber}</CardTitle><Badge>{labels[shipment.status]}</Badge></div></CardHeader><CardContent><div className="grid gap-4 sm:grid-cols-3"><div><p className="text-xs text-muted-foreground">Carrier</p><p className="font-medium">{shipment.carrierName}</p></div><div><p className="text-xs text-muted-foreground">Destination</p><p className="font-medium">{shipment.destination.city}, {shipment.destination.region}</p></div><div><p className="text-xs text-muted-foreground">Estimated delivery</p><p className="font-medium">{shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString("en-GH") : "To be confirmed"}</p></div></div></CardContent></Card><Card><CardHeader><CardTitle>Delivery timeline</CardTitle></CardHeader><CardContent><div className="space-y-6">{events.map((event,index)=><div key={event.id} className="relative flex gap-4">{index<events.length-1&&<span className="absolute left-[11px] top-7 h-full w-px bg-border"/>}<div className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">{event.type==="delivered"?<CheckCircle2 className="h-4 w-4"/>:event.location?<MapPin className="h-3.5 w-3.5"/>:<Clock3 className="h-3.5 w-3.5"/>}</div><div className="min-w-0"><p className="font-medium">{event.description}</p><p className="text-sm text-muted-foreground">{new Date(event.occurredAt).toLocaleString("en-GH")}{event.location?` · ${event.location}`:""}</p></div></div>)}</div></CardContent></Card></div>}</main></>;
src/features/logistics/pages/LogisticsOperationsPage.tsx:2:import { AlertTriangle, CheckCircle2, PackageCheck, RefreshCw, Search, Truck } from "lucide-react";
src/features/logistics/pages/LogisticsOperationsPage.tsx:19:  return <><Helmet><title>Logistics Operations | BredaBuy Admin</title></Helmet><main className="container mx-auto space-y-8 px-4 py-8"><header><p className="text-sm font-medium text-primary">Operations</p><h1 className="text-3xl font-bold">Logistics control centre</h1><p className="mt-2 text-muted-foreground">Monitor shipments, delivery exceptions and carrier activity.</p></header><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">{[["Total",summary.total,Truck],["Pending",summary.pending,PackageCheck],["In transit",summary.inTransit,Truck],["Out for delivery",summary.outForDelivery,Truck],["Delivered",summary.delivered,CheckCircle2],["Exceptions",summary.failedDelivery+summary.returned,AlertTriangle]].map(([name,value,Icon])=><Card key={name as string}><CardContent className="pt-6"><Icon className="mb-3 h-5 w-5 text-muted-foreground"/><p className="text-2xl font-bold">{value as number}</p><p className="text-xs text-muted-foreground">{name as string}</p></CardContent></Card>)}</section><Card><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><CardTitle>Shipments</CardTitle><div className="relative w-full md:w-80"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/><Input className="pl-9" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tracking, order, carrier, city" aria-label="Search shipments"/></div></div></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b text-left"><th className="p-3">Tracking</th><th className="p-3">Order</th><th className="p-3">Destination</th><th className="p-3">Carrier</th><th className="p-3">Status</th><th className="p-3 text-right">Action</th></tr></thead><tbody>{visible.map(s=><tr key={s.id} className="border-b last:border-0"><td className="p-3 font-medium">{s.trackingNumber}</td><td className="p-3">{s.orderNumber}</td><td className="p-3">{s.destination.city}, {s.destination.region}</td><td className="p-3">{s.carrierName}</td><td className="p-3"><Badge variant={s.status==="failed-delivery"||s.status==="returned"?"destructive":s.status==="delivered"?"secondary":"default"}>{labels[s.status]}</Badge></td><td className="p-3 text-right">{next[s.status]&&<Button size="sm" variant="outline" onClick={()=>advance(s)}><RefreshCw className="mr-2 h-3.5 w-3.5"/>{next[s.status]==="delivered"?"Confirm delivery":"Advance"}</Button>}</td></tr>)}{visible.length===0&&<tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No shipments found.</td></tr>}</tbody></table></div></CardContent></Card></main></>;
src/features/admin/pages/ReturnManagement.tsx:3:import { CheckCircle2, Clock3, PackageCheck, Search, Warehouse, XCircle } from "lucide-react";
src/features/admin/pages/ReturnManagement.tsx:93:              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
src/features/admin/pages/ReturnManagement.tsx:94:              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, return ID, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
src/features/catalog/hooks/useCatalog.ts:28:          search: query.search,
src/features/catalog/types/catalog.types.ts:10:  search?: string;
src/features/catalog/utils/catalog.utils.ts:2:  searchParams: URLSearchParams
src/features/catalog/utils/catalog.utils.ts:6:      searchParams.get("page")
src/features/catalog/utils/catalog.utils.ts:11:      searchParams.get("pageSize")
src/features/catalog/utils/catalog.utils.ts:15:    searchParams.has("minPrice")
src/features/catalog/utils/catalog.utils.ts:17:          searchParams.get(
src/features/catalog/utils/catalog.utils.ts:24:    searchParams.has("maxPrice")
src/features/catalog/utils/catalog.utils.ts:26:          searchParams.get(
src/features/catalog/utils/catalog.utils.ts:35:    search:
src/features/catalog/utils/catalog.utils.ts:36:      searchParams.get("search") ??
src/features/catalog/utils/catalog.utils.ts:39:      searchParams.get("category") ??
src/features/catalog/utils/catalog.utils.ts:42:      searchParams.get("brand") ??
src/features/catalog/utils/catalog.utils.ts:45:      searchParams.get("seller") ??
src/features/catalog/utils/catalog.utils.ts:50:      searchParams.has("rating")
src/features/catalog/utils/catalog.utils.ts:52:            searchParams.get(
src/features/catalog/utils/catalog.utils.ts:58:      searchParams.get(
src/features/catalog/utils/catalog.utils.ts:62:      searchParams.get(
src/features/catalog/utils/catalog.utils.ts:66:      searchParams.get(
src/features/catalog/utils/catalog.utils.ts:70:      (searchParams.get(
src/features/products/store/product.store.ts:42:  first.search === second.search &&
src/features/products/store/product.store.ts:109:    // renders and avoids catalogue query churn during search/filter navigation.
src/features/products/services/product.service.ts:182:    if (filters.search) {
src/features/products/services/product.service.ts:183:      const search = normalize(filters.search);
src/features/products/services/product.service.ts:195:          .includes(search),
src/features/products/types/product.types.ts:68:  search?: string;
src/features/products/pages/ProductCataloguePage.tsx:2:  Search,
src/features/products/pages/ProductCataloguePage.tsx:4:  PackageSearch,
src/features/products/pages/ProductCataloguePage.tsx:14:  useSearchParams,
src/features/products/pages/ProductCataloguePage.tsx:81:    searchParams,
src/features/products/pages/ProductCataloguePage.tsx:82:    setSearchParams,
src/features/products/pages/ProductCataloguePage.tsx:83:  ] = useSearchParams();
src/features/products/pages/ProductCataloguePage.tsx:86:  // can provide a new URLSearchParams object without the URL actually changing.
src/features/products/pages/ProductCataloguePage.tsx:88:  // make the catalogue appear to refresh while the user is searching.
src/features/products/pages/ProductCataloguePage.tsx:89:  const queryString = searchParams.toString();
src/features/products/pages/ProductCataloguePage.tsx:92:    search,
src/features/products/pages/ProductCataloguePage.tsx:93:    setSearch,
src/features/products/pages/ProductCataloguePage.tsx:95:    searchParams.get("q") ?? ""
src/features/products/pages/ProductCataloguePage.tsx:131:    const params = new URLSearchParams(queryString);
src/features/products/pages/ProductCataloguePage.tsx:134:      search:
src/features/products/pages/ProductCataloguePage.tsx:184:    setSearch(
src/features/products/pages/ProductCataloguePage.tsx:199:    const nextParams = new URLSearchParams();
src/features/products/pages/ProductCataloguePage.tsx:201:    if (filters.search) {
src/features/products/pages/ProductCataloguePage.tsx:204:        filters.search
src/features/products/pages/ProductCataloguePage.tsx:268:      setSearchParams(
src/features/products/pages/ProductCataloguePage.tsx:278:    setSearchParams,
src/features/products/pages/ProductCataloguePage.tsx:281:  const submitSearch = () => {
src/features/products/pages/ProductCataloguePage.tsx:282:    const value = search.trim();
src/features/products/pages/ProductCataloguePage.tsx:285:      search: value || undefined,
src/features/products/pages/ProductCataloguePage.tsx:290:    if (filters.search) {
src/features/products/pages/ProductCataloguePage.tsx:291:      return `Search results for "${filters.search}"`;
src/features/products/pages/ProductCataloguePage.tsx:326:              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
src/features/products/pages/ProductCataloguePage.tsx:329:                value={search}
src/features/products/pages/ProductCataloguePage.tsx:331:                  setSearch(
src/features/products/pages/ProductCataloguePage.tsx:339:                    submitSearch();
src/features/products/pages/ProductCataloguePage.tsx:342:                placeholder="Search products..."
src/features/products/pages/ProductCataloguePage.tsx:348:              onClick={submitSearch}
src/features/products/pages/ProductCataloguePage.tsx:351:              Search
src/features/products/pages/ProductCataloguePage.tsx:421:                  <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />
src/features/products/pages/ProductCataloguePage.tsx:441:                    <PackageSearch className="mb-4 h-12 w-12 text-muted-foreground" />
src/features/products/pages/ProductCataloguePage.tsx:448:                      Try changing your search or
src/features/auth/pages/VerifyEmail.tsx:4:  useSearchParams,
src/features/auth/pages/VerifyEmail.tsx:23:  const [searchParams] =
src/features/auth/pages/VerifyEmail.tsx:24:    useSearchParams();
src/features/auth/pages/VerifyEmail.tsx:27:    searchParams.get("token");
src/features/auth/pages/ResetPassword.tsx:2:import { Link, useSearchParams } from "react-router-dom";
src/features/auth/pages/ResetPassword.tsx:18:  const [searchParams] = useSearchParams();
src/features/auth/pages/ResetPassword.tsx:21:    searchParams.get("token") ?? "";
src/pages/Brands.tsx:2:import { ArrowRight, PackageSearch, Tags } from "lucide-react";
src/pages/Brands.tsx:38:            <PackageSearch className="mb-4 h-10 w-10 text-muted-foreground" />
src/pages/TrackOrder.tsx:3:import { CheckCircle2, Circle, PackageSearch, Search, Truck } from "lucide-react";
src/pages/TrackOrder.tsx:96:              <PackageSearch className="h-7 w-7 text-primary" aria-hidden="true" />
src/pages/TrackOrder.tsx:134:                  <Search className="mr-2 h-4 w-4" aria-hidden="true" />
src/pages/Products.tsx:2:import { useSearchParams } from "react-router-dom";
src/pages/Products.tsx:12:  const [searchParams] = useSearchParams();
src/pages/Products.tsx:13:  const categoryParam = searchParams.get("category");
src/pages/Products.tsx:14:  const searchQuery = searchParams.get("search");
src/pages/Products.tsx:30:    // Filter by search
src/pages/Products.tsx:31:    if (searchQuery) {
src/pages/Products.tsx:32:      const query = searchQuery.toLowerCase();
src/pages/Products.tsx:63:  }, [selectedCategory, searchQuery, priceRange, sortBy]);
src/pages/Products.tsx:77:                {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
src/pages/Products.tsx:250:                    Try adjusting your filters or search terms
src/pages/OrderSuccess.tsx:4:import { CheckCircle2, Package, ArrowRight, ClipboardList, Search } from "lucide-react";
src/pages/OrderSuccess.tsx:84:                <Search className="mr-2 h-5 w-5" />
src/pages/Search.tsx:3:export default function Search() {
src/pages/Search.tsx:4:  return <PagePlaceholder title="Search" />;
src/pages/Categories.tsx:2:import { ArrowRight, FolderTree, PackageSearch } from "lucide-react";
src/pages/Categories.tsx:38:            <PackageSearch className="mb-4 h-10 w-10 text-muted-foreground" />
src/app/router/routes.tsx:16:{index:true,...lazy(()=>import("@/pages/Home"))},{path:"shop",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"products",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"products/:id",...lazy(()=>import("@/features/products/pages/ProductDetailsPage"))},{path:"product/:id",...lazy(()=>import("@/features/products/pages/ProductDetailsPage"))},{path:"search",...lazy(()=>import("@/features/products/pages/ProductCataloguePage"))},{path:"categories",...lazy(()=>import("@/pages/Categories"))},{path:"brands",...lazy(()=>import("@/pages/Brands"))},{path:"deals",...lazy(()=>import("@/pages/Deals"))},{path:"flash-sales",...lazy(()=>import("@/pages/FlashSales"))},{path:"cart",...lazy(()=>import("@/pages/Cart"))},{path:"checkout",...lazy(()=>import("@/pages/Checkout"))},{path:"order-success",...lazy(()=>import("@/pages/OrderSuccess"))},{path:"track-order",...lazy(()=>import("@/features/logistics/pages/TrackShipmentPage"))},{path:"about",...lazy(()=>import("@/pages/About"))},{path:"contact",...lazy(()=>import("@/pages/Contact"))},{path:"unauthorized",...lazy(()=>import("@/pages/Unauthorized"))}];
src/components/layout/Header.tsx:21:import StorefrontSearch from "./StorefrontSearch";
src/components/layout/Header.tsx:161:          {/* Search */}
src/components/layout/Header.tsx:164:            <StorefrontSearch />
src/components/layout/Header.tsx:213:        {/* Mobile search */}
src/components/layout/Header.tsx:216:          <StorefrontSearch />
src/components/layout/StorefrontSearch.tsx:2:  Search,
src/components/layout/StorefrontSearch.tsx:16:const StorefrontSearch = () => {
src/components/layout/StorefrontSearch.tsx:21:  const submitSearch = (
src/components/layout/StorefrontSearch.tsx:29:      navigate("/search");
src/components/layout/StorefrontSearch.tsx:34:      `/search?q=${encodeURIComponent(value)}`
src/components/layout/StorefrontSearch.tsx:40:      onSubmit={submitSearch}
src/components/layout/StorefrontSearch.tsx:42:      role="search"
src/components/layout/StorefrontSearch.tsx:44:      <Search
src/components/layout/StorefrontSearch.tsx:54:        placeholder="Search products, brands and categories..."
src/components/layout/StorefrontSearch.tsx:56:        aria-label="Search BredaBuy"
src/components/layout/StorefrontSearch.tsx:64:          aria-label="Clear search"
src/components/layout/StorefrontSearch.tsx:75:        Search
src/components/layout/StorefrontSearch.tsx:81:export default StorefrontSearch;
src/components/ui/command.tsx:4:import { Search } from "lucide-react";
src/components/ui/command.tsx:44:    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
```

The following require Phase 2 reconciliation:

- Search input state
- Debouncing
- Query cancellation
- Search service
- Result state
- Loading state
- Empty state
- Error state
- Result positioning
- Search button interaction
- Animation
- Mobile behavior
- Duplicate requests
- Cache strategy

---

# 10. Performance Audit

Potential areas requiring investigation:

- Initial bundle size
- Route-level lazy loading
- Provider re-render scope
- Context update frequency
- Duplicate network requests
- Search request frequency
- Product-list rendering
- Image loading
- Expensive render calculations
- Unnecessary dependencies
- Startup initialization
- Query caching

No performance optimization was performed during Phase 1.

---

# 11. Security Audit

Security-related signals:

```text
src/features/payments/services/payment-reconciliation.service.ts:6:const read=():ReconciliationRecord[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReconciliationRecord[]}catch{return[]}};
src/features/payments/services/payment-reconciliation.service.ts:7:const write=(v:ReconciliationRecord[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/payments/services/payment-core.service.ts:15:    const raw = localStorage.getItem(key);
src/features/payments/services/payment-core.service.ts:23:  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* server persistence later */ }
src/features/payments/services/payment-transaction.service.ts:5:const read=():PaymentTransaction[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as PaymentTransaction[]}catch{return[]}};
src/features/payments/services/payment-transaction.service.ts:6:const write=(v:PaymentTransaction[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/payments/services/payment-webhook.service.ts:6:const read=():PaymentWebhookEvent[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as PaymentWebhookEvent[]}catch{return[]}};
src/features/payments/services/payment-webhook.service.ts:7:const write=(v:PaymentWebhookEvent[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/payments/services/refund.service.ts:8:const read=():Refund[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as Refund[]}catch{return[]}};
src/features/payments/services/refund.service.ts:9:const write=(v:Refund[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/payments/services/payment-reconciliation-queue.service.ts:7:const read=():ReconciliationResolutionRecord[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReconciliationResolutionRecord[]}catch{return[]}};
src/features/payments/services/payment-reconciliation-queue.service.ts:8:const write=(v:ReconciliationResolutionRecord[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/payments/services/payment.service.ts:15:    const raw = localStorage.getItem(STORAGE_KEY);
src/features/payments/services/payment.service.ts:24:    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
src/features/payments/services/ledger.service.ts:12:    const value = localStorage.getItem(key);
src/features/payments/services/ledger.service.ts:21:    localStorage.setItem(key, JSON.stringify(value));
src/features/wallet/services/wallet-purchase.service.ts:5:const read=():WalletPurchase[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as WalletPurchase[]}catch{return[]}};
src/features/wallet/services/wallet-purchase.service.ts:6:const write=(v:WalletPurchase[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/wallet/services/wallet.service.ts:5:const readAccounts=():WalletAccount[]=>{try{return JSON.parse(localStorage.getItem(ACCOUNT_KEY)??"[]") as WalletAccount[]}catch{return[]}};
src/features/wallet/services/wallet.service.ts:6:const readTx=():WalletTransaction[]=>{try{return JSON.parse(localStorage.getItem(TX_KEY)??"[]") as WalletTransaction[]}catch{return[]}};
src/features/wallet/services/wallet.service.ts:7:const write=(a:WalletAccount[],t:WalletTransaction[])=>{try{localStorage.setItem(ACCOUNT_KEY,JSON.stringify(a));localStorage.setItem(TX_KEY,JSON.stringify(t))}catch {
src/features/wallet/services/wallet-topup.service.ts:7:const read=():WalletTopUpIntent[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as WalletTopUpIntent[]}catch{return[]}};
src/features/wallet/services/wallet-topup.service.ts:8:const write=(v:WalletTopUpIntent[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/returns/services/return.service.ts:8:    const raw = localStorage.getItem(STORAGE_KEY);
src/features/returns/services/return.service.ts:17:    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
src/features/orders/services/order.service.ts:27:    const raw = localStorage.getItem(STORAGE_KEY);
src/features/orders/services/order.service.ts:36:    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
src/features/orders/services/seller-order.service.ts:8:    const raw = localStorage.getItem(STORAGE_KEY);
src/features/orders/services/seller-order.service.ts:17:    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
src/features/logistics/services/carrier.service.ts:14:const read = (): Carrier[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Carrier[]; } catch { return []; } };
src/features/logistics/services/carrier.service.ts:15:const write = (items: Carrier[]) => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* persistence failure is intentionally non-fatal */ } };
src/features/logistics/services/return-inspection.service.ts:7:const read=():ReturnInspection[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReturnInspection[]}catch{return[]}};
src/features/logistics/services/return-inspection.service.ts:8:const write=(v:ReturnInspection[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/logistics/services/return-shipment.service.ts:7:const read=():ReturnShipment[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReturnShipment[]}catch{return[]}};
src/features/logistics/services/return-shipment.service.ts:8:const write=(v:ReturnShipment[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/logistics/services/shipment.service.ts:5:const read = <T>(key: string): T[] => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T[] : []; } catch { return []; } };
src/features/logistics/services/shipment.service.ts:6:const write = <T>(key: string, value: T[]) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* API persistence later */ } };
src/features/logistics/services/delivery-exception.service.ts:6:const read=():DeliveryException[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as DeliveryException[]}catch{return[]}};
src/features/logistics/services/delivery-exception.service.ts:7:const write=(v:DeliveryException[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
src/features/inventory/services/inventory.service.ts:15:    const raw = localStorage.getItem(key);
src/features/inventory/services/inventory.service.ts:24:    localStorage.setItem(key, JSON.stringify(value));
src/features/products/pages/ProductDetailsPage.tsx:40:    const value = localStorage.getItem(RECENTLY_VIEWED_KEY);
src/features/products/pages/ProductDetailsPage.tsx:50:    localStorage.setItem(
src/features/fulfilment/services/fulfilment.service.ts:9:    const raw = localStorage.getItem(STORAGE_KEY);
src/features/fulfilment/services/fulfilment.service.ts:17:  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch { /* API persistence later */ }
src/services/api/client.ts:21:      const storedAuth = localStorage.getItem(
src/context/ThemeContext.tsx:16:      const stored = localStorage.getItem("bredabuy-theme") as Theme;
src/context/ThemeContext.tsx:27:    localStorage.setItem("bredabuy-theme", theme);
src/components/ui/chart.tsx:70:      dangerouslySetInnerHTML={{
```

Potential areas requiring Phase 2 verification:

- Authentication
- Authorization
- Route guards
- Supabase configuration
- Environment variables
- Browser storage
- Administrative access
- Seller isolation
- Payment security
- Input validation
- Unsafe HTML rendering

**Secret values are intentionally not reproduced in this report.**

---

# 12. UI/Design Architecture Audit

Current UI source inventory:

```text
src/components/NavLink.tsx
src/components/chat/ChatWidget.tsx
src/components/home/BrandShowcase.tsx
src/components/home/CategoryGrid.tsx
src/components/home/DealsSection.tsx
src/components/home/FeaturedProducts.tsx
src/components/home/HeroCarousel.tsx
src/components/home/TrustBadges.tsx
src/components/layout/AccountMenu.tsx
src/components/layout/Footer.tsx
src/components/layout/Header.tsx
src/components/layout/Layout.tsx
src/components/layout/StorefrontNavigation.tsx
src/components/layout/StorefrontSearch.tsx
src/components/layout/ThemeToggle.tsx
src/components/product/ProductCard.tsx
src/components/ui/accordion.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/alert.tsx
src/components/ui/aspect-ratio.tsx
src/components/ui/avatar.tsx
src/components/ui/badge.tsx
src/components/ui/breadcrumb.tsx
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/card.tsx
src/components/ui/carousel.tsx
src/components/ui/chart.tsx
src/components/ui/checkbox.tsx
src/components/ui/collapsible.tsx
src/components/ui/command.tsx
src/components/ui/context-menu.tsx
src/components/ui/dialog.tsx
src/components/ui/drawer.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/form.tsx
src/components/ui/hover-card.tsx
src/components/ui/input-otp.tsx
src/components/ui/input.tsx
src/components/ui/label.tsx
src/components/ui/menubar.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/pagination.tsx
src/components/ui/popover.tsx
src/components/ui/progress.tsx
src/components/ui/radio-group.tsx
src/components/ui/resizable.tsx
src/components/ui/scroll-area.tsx
src/components/ui/select.tsx
src/components/ui/separator.tsx
src/components/ui/sheet.tsx
src/components/ui/sidebar.tsx
src/components/ui/skeleton.tsx
src/components/ui/slider.tsx
src/components/ui/sonner.tsx
src/components/ui/switch.tsx
src/components/ui/table.tsx
src/components/ui/tabs.tsx
src/components/ui/textarea.tsx
src/components/ui/toast.tsx
src/components/ui/toaster.tsx
src/components/ui/toggle-group.tsx
src/components/ui/toggle.tsx
src/components/ui/tooltip.tsx
src/components/ui/use-toast.ts
```

Areas requiring reconciliation:

- Shared UI components
- Page layouts
- Navigation
- Headers
- Cards
- Tables
- Forms
- Dialogs
- Loading states
- Empty states
- Error states
- Responsive behavior
- Accessibility
- Brand consistency

---

# 13. Broken Features

The following feature domains require end-to-end verification before
new functionality is added:

| Domain | Verification Required |
|---|---|
| Authentication | Yes |
| Account | Yes |
| Products | Yes |
| Search | Yes |
| Cart | Yes |
| Checkout | Yes |
| Orders | Yes |
| Payments | Yes |
| Wallet | Yes |
| Sellers | Yes |
| Logistics | Yes |
| Notifications | Yes |
| Administration | Yes |

---

# 14. Recommended Target Architecture

Recommended architecture:

```text
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
```

This structure must be adapted to the actual repository rather than
blindly imposed.

---

# 15. Recommended Route Architecture

Recommended route domains:

```text
/
├── /auth/*
├── /products/*
├── /search
├── /cart
├── /checkout/*
├── /account/*
├── /orders/*
├── /seller/*
├── /logistics/*
├── /payments/*
└── /admin/*
```

Route guards should be centralized.

---

# 16. Recommended Page-to-Service Flow

Pages should not directly contain business/data-access logic.

Preferred:

```text
Page
 ↓
Feature Component
 ↓
Feature Hook
 ↓
Service
 ↓
API Client
 ↓
Backend
```

Shared services must not import UI components.

---

# 17. Recommended Provider Hierarchy

Recommended conceptual hierarchy:

```text
Application
│
├── Error Boundary
│
├── Theme
│
├── Query/Data Provider
│
├── Authentication
│
├── Application State
│
└── Router
    │
    ├── Public Routes
    ├── Customer Routes
    ├── Seller Routes
    ├── Logistics Routes
    └── Admin Routes
```

Actual provider ordering must be confirmed against repository
dependencies during Phase 2.

---

# 18. Recommended Migration Order

Phase 2 should proceed in this order:

1. Stabilize application entry point
2. Reconcile providers
3. Reconcile routing
4. Establish service boundaries
5. Establish feature boundaries
6. Reconcile authentication
7. Reconcile products/search
8. Reconcile cart/checkout
9. Reconcile orders/payments/wallet
10. Reconcile seller operations
11. Reconcile logistics
12. Reconcile administration
13. Reconcile UI system
14. Optimize performance
15. Harden security
16. Run complete validation

---

# 19. Risks

Primary risks:

- Existing and new architectures may overlap
- Duplicate services may cause inconsistent state
- Provider ordering may cause runtime failures
- Routes may reference outdated components
- Search may generate duplicate requests
- Payment and wallet logic must not be duplicated
- Seller isolation must be preserved
- Admin authorization must remain centralized
- Aggressive refactoring may introduce regressions

---

# 20. Phase 2 Implementation Plan

Phase 2 should reconcile the architecture using the findings from this
audit.

Phase 2 MUST NOT blindly rewrite the application.

Each change should:

1. Inspect existing implementation
2. Preserve working functionality
3. Consolidate duplicates
4. Establish one source of truth
5. Validate TypeScript
6. Validate lint
7. Validate build
8. Verify affected routes
9. Verify affected providers
10. Record the change

---

# Phase 1 Safety Statement

No application source files were intentionally modified by this audit.

The only generated project file is:

`docs/reconciliation/ARCHITECTURE_AUDIT.md`

---

# PHASE 1 STATUS

**PHASE 1 COMPLETE — WAITING FOR PHASE 2.**


import { createBrowserRouter, type RouteObject } from "react-router-dom";
import type { ComponentType } from "react";

import MainLayout from "@/app/layouts/MainLayout";
import AuthLayout from "@/app/layouts/AuthLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import AdminLayout from "@/app/layouts/AdminLayout";
import SellerLayout from "@/app/layouts/SellerLayout";

import ProtectedRoute from "@/app/guards/ProtectedRoute";
import PublicRoute from "@/app/guards/PublicRoute";
import AdminRoute from "@/app/guards/AdminRoute";
import SellerRoute from "@/app/guards/SellerRoute";

type PageModule = { default: ComponentType };

const lazy = (loader: () => Promise<PageModule>): Pick<RouteObject, "lazy"> => ({
  lazy: async () => ({ Component: (await loader()).default }),
});

const publicRoutes: RouteObject[] = [
  { index: true, ...lazy(() => import("@/pages/Home")) },
  { path: "shop", ...lazy(() => import("@/features/products/pages/ProductCataloguePage")) },
  { path: "products", ...lazy(() => import("@/features/products/pages/ProductCataloguePage")) },
  { path: "products/:id", ...lazy(() => import("@/features/products/pages/ProductDetailsPage")) },
  { path: "product/:id", ...lazy(() => import("@/features/products/pages/ProductDetailsPage")) },
  { path: "search", ...lazy(() => import("@/features/products/pages/ProductCataloguePage")) },
  { path: "categories", ...lazy(() => import("@/pages/Categories")) },
  { path: "brands", ...lazy(() => import("@/pages/Brands")) },
  { path: "deals", ...lazy(() => import("@/pages/Deals")) },
  { path: "flash-sales", ...lazy(() => import("@/pages/FlashSales")) },
  { path: "cart", ...lazy(() => import("@/pages/Cart")) },
  { path: "checkout", ...lazy(() => import("@/pages/Checkout")) },
  { path: "order-success", ...lazy(() => import("@/pages/OrderSuccess")) },
  { path: "track-order", ...lazy(() => import("@/pages/TrackOrder")) },
  { path: "about", ...lazy(() => import("@/pages/About")) },
  { path: "contact", ...lazy(() => import("@/pages/Contact")) },
  { path: "unauthorized", ...lazy(() => import("@/pages/Unauthorized")) },
];

const authRoutes: RouteObject[] = [
  { path: "/auth/login", ...lazy(() => import("@/features/auth/pages/LoginPage")) },
  { path: "/auth/register", ...lazy(() => import("@/features/auth/pages/RegisterPage")) },
  { path: "/auth/forgot-password", ...lazy(() => import("@/features/auth/pages/ForgotPassword")) },
  { path: "/auth/reset-password", ...lazy(() => import("@/features/auth/pages/ResetPassword")) },
  { path: "/auth/verify-email", ...lazy(() => import("@/features/auth/pages/VerifyEmail")) },
  { path: "/auth/verify-otp", ...lazy(() => import("@/features/auth/pages/VerifyOtp")) },
  { path: "/auth/mfa", ...lazy(() => import("@/features/auth/pages/MfaPage")) },
];

const accountRoutes: RouteObject[] = [
  { path: "/account", ...lazy(() => import("@/features/account/pages/AccountDashboardPage")) },
  { path: "/account/profile", ...lazy(() => import("@/features/account/pages/AccountProfilePage")) },
  { path: "/account/orders", ...lazy(() => import("@/features/account/pages/AccountOrdersPage")) },
  { path: "/account/orders/:id", ...lazy(() => import("@/features/account/pages/AccountOrderDetailsPage")) },
  { path: "/account/orders/:id/return", ...lazy(() => import("@/features/account/pages/AccountReturnRequestPage")) },
  { path: "/account/wishlist", ...lazy(() => import("@/features/account/pages/AccountWishlistPage")) },
  { path: "/account/addresses", ...lazy(() => import("@/features/account/pages/AccountAddressesPage")) },
  { path: "/account/notifications", ...lazy(() => import("@/features/account/pages/AccountNotificationsPage")) },
  { path: "/account/wallet", ...lazy(() => import("@/features/account/pages/AccountWalletPage")) },
  { path: "/account/reviews", ...lazy(() => import("@/features/account/pages/AccountReviewsPage")) },
  { path: "/account/security", ...lazy(() => import("@/features/account/pages/AccountSecurityPage")) },
  { path: "/account/support", ...lazy(() => import("@/features/account/pages/AccountSupportPage")) },
];

const sellerRoutes: RouteObject[] = [
  { path: "/seller", ...lazy(() => import("@/features/sellers/pages/SellerDashboard")) },
  { path: "/seller/products", ...lazy(() => import("@/features/sellers/pages/SellerProducts")) },
  { path: "/seller/products/new", ...lazy(() => import("@/features/sellers/pages/CreateProduct")) },
  { path: "/seller/orders", ...lazy(() => import("@/features/sellers/pages/SellerOrders")) },
  { path: "/seller/returns", ...lazy(() => import("@/features/sellers/pages/SellerReturns")) },
  { path: "/seller/inventory", ...lazy(() => import("@/features/sellers/pages/SellerInventory")) },
  { path: "/seller/customers", ...lazy(() => import("@/features/sellers/pages/SellerCustomers")) },
  { path: "/seller/analytics", ...lazy(() => import("@/features/sellers/pages/SellerAnalytics")) },
  { path: "/seller/payouts", ...lazy(() => import("@/features/sellers/pages/SellerPayouts")) },
  { path: "/seller/promotions", ...lazy(() => import("@/features/sellers/pages/SellerPromotions")) },
  { path: "/seller/coupons", ...lazy(() => import("@/features/sellers/pages/SellerCoupons")) },
  { path: "/seller/reviews", ...lazy(() => import("@/features/sellers/pages/SellerReviews")) },
  { path: "/seller/settings", ...lazy(() => import("@/features/sellers/pages/SellerSettings")) },
];

const adminRoutes: RouteObject[] = [
  { path: "/admin", ...lazy(() => import("@/features/admin/pages/AdminDashboard")) },
  { path: "/admin/products", ...lazy(() => import("@/features/admin/pages/ProductManagement")) },
  { path: "/admin/categories", ...lazy(() => import("@/features/admin/pages/CategoryManagement")) },
  { path: "/admin/customers", ...lazy(() => import("@/features/admin/pages/CustomerManagement")) },
  { path: "/admin/inventory", ...lazy(() => import("@/features/admin/pages/InventoryManagement")) },
  { path: "/admin/orders", ...lazy(() => import("@/features/admin/pages/OrderManagement")) },
  { path: "/admin/returns", ...lazy(() => import("@/features/admin/pages/ReturnManagement")) },
  { path: "/admin/sellers", ...lazy(() => import("@/features/admin/pages/SellerManagement")) },
  { path: "/admin/warehouses", ...lazy(() => import("@/features/admin/pages/WarehouseManagement")) },
  { path: "/admin/logistics", ...lazy(() => import("@/features/admin/pages/LogisticsManagement")) },
  { path: "/admin/payments", ...lazy(() => import("@/features/admin/pages/PaymentManagement")) },
  { path: "/admin/marketing", ...lazy(() => import("@/features/admin/pages/MarketingManagement")) },
  { path: "/admin/cms", ...lazy(() => import("@/features/admin/pages/CMSManagement")) },
  { path: "/admin/reports", ...lazy(() => import("@/features/admin/pages/Reports")) },
  { path: "/admin/settings", ...lazy(() => import("@/features/admin/pages/SystemSettings")) },
];

const router = createBrowserRouter([
  { path: "/", element: <MainLayout />, children: publicRoutes },
  {
    element: <AuthLayout />,
    children: [
      { element: <PublicRoute />, children: authRoutes.slice(0, 3) },
      ...authRoutes.slice(3),
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ element: <DashboardLayout />, children: accountRoutes }],
  },
  {
    element: <SellerRoute />,
    children: [{ element: <SellerLayout />, children: sellerRoutes }],
  },
  {
    element: <AdminRoute />,
    children: [{ element: <AdminLayout />, children: adminRoutes }],
  },
  { path: "/unauthorized", ...lazy(() => import("@/pages/Unauthorized")) },
  { path: "*", ...lazy(() => import("@/pages/NotFound")) },
]);

export default router;

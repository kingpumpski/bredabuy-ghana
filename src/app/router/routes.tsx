import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "@/app/layouts/MainLayout";
import AuthLayout from "@/app/layouts/AuthLayout";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import AdminLayout from "@/app/layouts/AdminLayout";
import SellerLayout from "@/app/layouts/SellerLayout";

import ProtectedRoute from "@/app/guards/ProtectedRoute";
import PublicRoute from "@/app/guards/PublicRoute";
import AdminRoute from "@/app/guards/AdminRoute";
import SellerRoute from "@/app/guards/SellerRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Brands from "@/pages/Brands";
import Categories from "@/pages/Categories";
import Contact from "@/pages/Contact";
import Deals from "@/pages/Deals";
import FlashSales from "@/pages/FlashSales";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderSuccess from "@/pages/OrderSuccess";
import NotFound from "@/pages/NotFound";

import ProductCataloguePage from "@/features/products/pages/ProductCataloguePage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";

import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import VerifyOtp from "@/features/auth/pages/VerifyOtp";
import MfaPage from "@/features/auth/pages/MfaPage";

import CustomerDashboard from "@/features/customers/pages/CustomerDashboard";
import ProfilePage from "@/features/customers/pages/ProfilePage";
import OrdersPage from "@/features/customers/pages/OrdersPage";
import OrderDetails from "@/features/customers/pages/OrderDetails";
import WishlistPage from "@/features/customers/pages/WishlistPage";
import AddressBook from "@/features/customers/pages/AddressBook";
import NotificationCenter from "@/features/customers/pages/NotificationCenter";
import WalletPage from "@/features/customers/pages/WalletPage";
import ReviewManagement from "@/features/customers/pages/ReviewManagement";
import SupportPage from "@/features/customers/pages/SupportPage";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import ProductManagement from "@/features/admin/pages/ProductManagement";
import CategoryManagement from "@/features/admin/pages/CategoryManagement";
import CustomerManagement from "@/features/admin/pages/CustomerManagement";
import InventoryManagement from "@/features/admin/pages/InventoryManagement";
import OrderManagement from "@/features/admin/pages/OrderManagement";
import SellerManagement from "@/features/admin/pages/SellerManagement";
import WarehouseManagement from "@/features/admin/pages/WarehouseManagement";
import LogisticsManagement from "@/features/admin/pages/LogisticsManagement";
import PaymentManagement from "@/features/admin/pages/PaymentManagement";
import MarketingManagement from "@/features/admin/pages/MarketingManagement";
import CMSManagement from "@/features/admin/pages/CMSManagement";
import Reports from "@/features/admin/pages/Reports";
import SystemSettings from "@/features/admin/pages/SystemSettings";

import SellerDashboard from "@/features/sellers/pages/SellerDashboard";
import SellerProducts from "@/features/sellers/pages/SellerProducts";
import CreateProduct from "@/features/sellers/pages/CreateProduct";
import SellerOrders from "@/features/sellers/pages/SellerOrders";
import SellerInventory from "@/features/sellers/pages/SellerInventory";
import SellerCustomers from "@/features/sellers/pages/SellerCustomers";
import SellerAnalytics from "@/features/sellers/pages/SellerAnalytics";
import SellerPayouts from "@/features/sellers/pages/SellerPayouts";
import SellerPromotions from "@/features/sellers/pages/SellerPromotions";
import SellerCoupons from "@/features/sellers/pages/SellerCoupons";
import SellerReviews from "@/features/sellers/pages/SellerReviews";
import SellerSettings from "@/features/sellers/pages/SellerSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <ProductCataloguePage />,
      },
      {
        path: "products",
        element: <ProductCataloguePage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "search",
        element: <ProductCataloguePage />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "flash-sales",
        element: <FlashSales />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
          {
            path: "/auth/forgot-password",
            element: <ForgotPassword />,
          },
        ],
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/auth/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/auth/mfa",
        element: <MfaPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/account",
            element: <CustomerDashboard />,
          },
          {
            path: "/account/profile",
            element: <ProfilePage />,
          },
          {
            path: "/account/orders",
            element: <OrdersPage />,
          },
          {
            path: "/account/orders/:id",
            element: <OrderDetails />,
          },
          {
            path: "/account/wishlist",
            element: <WishlistPage />,
          },
          {
            path: "/account/addresses",
            element: <AddressBook />,
          },
          {
            path: "/account/notifications",
            element: <NotificationCenter />,
          },
          {
            path: "/account/wallet",
            element: <WalletPage />,
          },
          {
            path: "/account/reviews",
            element: <ReviewManagement />,
          },
          {
            path: "/account/support",
            element: <SupportPage />,
          },
        ],
      },
    ],
  },

  {
    element: <SellerRoute />,
    children: [
      {
        element: <SellerLayout />,
        children: [
          {
            path: "/seller",
            element: <SellerDashboard />,
          },
          {
            path: "/seller/products",
            element: <SellerProducts />,
          },
          {
            path: "/seller/products/new",
            element: <CreateProduct />,
          },
          {
            path: "/seller/orders",
            element: <SellerOrders />,
          },
          {
            path: "/seller/inventory",
            element: <SellerInventory />,
          },
          {
            path: "/seller/customers",
            element: <SellerCustomers />,
          },
          {
            path: "/seller/analytics",
            element: <SellerAnalytics />,
          },
          {
            path: "/seller/payouts",
            element: <SellerPayouts />,
          },
          {
            path: "/seller/promotions",
            element: <SellerPromotions />,
          },
          {
            path: "/seller/coupons",
            element: <SellerCoupons />,
          },
          {
            path: "/seller/reviews",
            element: <SellerReviews />,
          },
          {
            path: "/seller/settings",
            element: <SellerSettings />,
          },
        ],
      },
    ],
  },

  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/products",
            element: <ProductManagement />,
          },
          {
            path: "/admin/categories",
            element: <CategoryManagement />,
          },
          {
            path: "/admin/customers",
            element: <CustomerManagement />,
          },
          {
            path: "/admin/inventory",
            element: <InventoryManagement />,
          },
          {
            path: "/admin/orders",
            element: <OrderManagement />,
          },
          {
            path: "/admin/sellers",
            element: <SellerManagement />,
          },
          {
            path: "/admin/warehouses",
            element: <WarehouseManagement />,
          },
          {
            path: "/admin/logistics",
            element: <LogisticsManagement />,
          },
          {
            path: "/admin/payments",
            element: <PaymentManagement />,
          },
          {
            path: "/admin/marketing",
            element: <MarketingManagement />,
          },
          {
            path: "/admin/cms",
            element: <CMSManagement />,
          },
          {
            path: "/admin/reports",
            element: <Reports />,
          },
          {
            path: "/admin/settings",
            element: <SystemSettings />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

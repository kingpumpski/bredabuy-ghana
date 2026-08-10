import {
  createBrowserRouter,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

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
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyEmail from "@/features/auth/pages/VerifyEmail";
import VerifyOtp from "@/features/auth/pages/VerifyOtp";
import MfaPage from "@/features/auth/pages/MfaPage";
import NotFound from "@/pages/NotFound";

import ProductCataloguePage from "@/features/products/pages/ProductCataloguePage";
import ProductDetailsPage from "@/features/products/pages/ProductDetailsPage";

export const router =
  createBrowserRouter([
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
          element:
            <ProductCataloguePage />,
        },

        {
          path: "products",
          element:
            <ProductCataloguePage />,
        },

        {
          path: "products/:id",
          element:
            <ProductDetailsPage />,
        },

        {
          path: "product/:id",
          element:
            <ProductDetailsPage />,
        },

        {
          path: "search",
          element:
            <ProductCataloguePage />,
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
          element:
            <OrderSuccess />,
        },

        {
          path: "login",
          element: <LoginPage />,
        },

        {
          path: "register",
          element: <RegisterPage />,
        },

        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },

        {
          path: "reset-password",
          element: <ResetPassword />,
        },

        {
          path: "verify-email",
          element: <VerifyEmail />,
        },

        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },

        {
          path: "mfa",
          element: <MfaPage />,
        },

        {
          path: "about",
          element: <About />,
        },

        {
          path: "contact",
          element: <Contact />,
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

export default router;

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  isSellerRole,
} from "@/features/auth/utils/auth.utils";

export default function SellerRoute() {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  if (!isSellerRole(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}

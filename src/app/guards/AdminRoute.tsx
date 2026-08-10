import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  isAdminRole,
} from "@/features/auth/utils/auth.utils";

export default function AdminRoute() {
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

  if (!isAdminRole(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <Outlet />;
}

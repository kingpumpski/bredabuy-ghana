import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  getDefaultRouteForRole,
} from "@/features/auth/utils/auth.utils";

export default function PublicRoute() {
  const user = useAuthStore(
    (state) => state.user
  );

  const isAuthenticated =
    useAuthStore(
      (state) => state.isAuthenticated
    );

  const status =
    useAuthStore(
      (state) => state.status
    );

  if (
    status === "initializing"
  ) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Restoring your session...
      </div>
    );
  }

  if (
    isAuthenticated &&
    user
  ) {
    return (
      <Navigate
        to={getDefaultRouteForRole(user.role)}
        replace
      />
    );
  }

  return <Outlet />;
}

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { isAdminRole } from "@/features/auth/utils/auth.utils";

export default function AdminRoute() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  if (status === "initializing" || status === "refreshing") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-3 text-lg font-semibold">Restoring your session...</div>
          <p className="text-sm text-muted-foreground">Please wait.</p>
        </div>
      </div>
    );
  }

  const from = `${location.pathname}${location.search}${location.hash}`;

  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from }} />;
  }

  if (!isAdminRole(user.role)) {
    return <Navigate to="/unauthorized" replace state={{ from }} />;
  }

  return <Outlet />;
}

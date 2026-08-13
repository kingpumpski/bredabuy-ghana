import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
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

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{
          from: `${location.pathname}${location.search}${location.hash}`,
        }}
      />
    );
  }

  return <Outlet />;
}

import type { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  roleHasAllPermissions,
} from "@/features/auth/permissions/roles";

import type {
  Permission,
} from "@/features/auth/permissions/permissions";

interface Props {
  permissions: Permission[];
  requireAll?: boolean;
  children?: ReactNode;
}

export default function RequirePermission({
  permissions,
  requireAll = true,
  children,
}: Props) {
  const role = useAuthStore(
    (state) => state.user?.role
  );

  const authorized = requireAll
    ? roleHasAllPermissions(
        role,
        permissions
      )
    : permissions.some((permission) =>
        roleHasAllPermissions(
          role,
          [permission]
        )
      );

  if (!authorized) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return <>{children}</>;
}

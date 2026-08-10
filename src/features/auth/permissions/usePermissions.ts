import { useMemo } from "react";

import { useAuthStore } from "../store/auth.store";

import {
  roleHasAllPermissions,
  roleHasAnyPermission,
} from "./roles";

import type { Permission } from "./permissions";

export function usePermissions() {
  const role = useAuthStore(
    (state) => state.user?.role
  );

  const can = useMemo(
    () => (permission: Permission) =>
      roleHasAnyPermission(role, [permission]),
    [role]
  );

  const canAny = useMemo(
    () => (permissions: Permission[]) =>
      roleHasAnyPermission(role, permissions),
    [role]
  );

  const canAll = useMemo(
    () => (permissions: Permission[]) =>
      roleHasAllPermissions(role, permissions),
    [role]
  );

  return {
    role,
    can,
    canAny,
    canAll,
  };
}

export default usePermissions;

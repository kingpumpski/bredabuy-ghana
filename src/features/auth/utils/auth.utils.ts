import type { UserRole } from "../types/auth.types";

export const hasRole = (
  role: UserRole | undefined,
  allowedRoles: UserRole[]
) => {
  if (!role) {
    return false;
  }

  return allowedRoles.includes(role);
};

export const isAdminRole = (
  role: UserRole | undefined
) => {
  return role === "administrator" || role === "super_admin";
};

export const isSellerRole = (
  role: UserRole | undefined
) => {
  return role === "seller" || role === "vendor";
};

export const isStaffRole = (
  role: UserRole | undefined
) => {
  return [
    "administrator",
    "super_admin",
    "warehouse_staff",
    "finance_officer",
    "customer_service",
  ].includes(role ?? "");
};

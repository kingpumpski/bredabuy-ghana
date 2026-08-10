import type { UserRole } from "../types/auth.types";

export const isAdminRole = (role?: UserRole | null) =>
  role === "administrator" ||
  role === "super_admin";

export const isSellerRole = (role?: UserRole | null) =>
  role === "seller" ||
  role === "vendor";

export const isStaffRole = (role?: UserRole | null) =>
  role === "administrator" ||
  role === "super_admin" ||
  role === "warehouse_staff" ||
  role === "finance_officer" ||
  role === "customer_service";

export const isCustomerRole = (role?: UserRole | null) =>
  role === "customer";

export const getDefaultRouteForRole = (
  role?: UserRole | null
) => {
  if (!role) {
    return "/auth/login";
  }

  if (role === "super_admin" || role === "administrator") {
    return "/admin";
  }

  if (role === "seller" || role === "vendor") {
    return "/seller";
  }

  if (role === "warehouse_staff") {
    return "/warehouse";
  }

  if (role === "finance_officer") {
    return "/finance";
  }

  if (role === "customer_service") {
    return "/support";
  }

  if (role === "rider") {
    return "/logistics";
  }

  return "/account";
};

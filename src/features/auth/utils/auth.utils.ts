import type { AuthUser, UserRole } from "../types/auth.types";

export const ADMIN_ROLES: UserRole[] = [
  "administrator",
  "super_admin",
];

export const SELLER_ROLES: UserRole[] = [
  "seller",
  "vendor",
];

export const CUSTOMER_ROLES: UserRole[] = [
  "customer",
];

export const OPERATIONS_ROLES: UserRole[] = [
  "rider",
  "warehouse_staff",
  "finance_officer",
  "customer_service",
];

export const isAdminRole = (role?: UserRole | null): boolean =>
  Boolean(role && ADMIN_ROLES.includes(role));

export const isSellerRole = (role?: UserRole | null): boolean =>
  Boolean(role && SELLER_ROLES.includes(role));

export const isCustomerRole = (role?: UserRole | null): boolean =>
  Boolean(role && CUSTOMER_ROLES.includes(role));

export const isOperationsRole = (
  role?: UserRole | null
): boolean =>
  Boolean(role && OPERATIONS_ROLES.includes(role));

export const hasAnyRole = (
  user: AuthUser | null | undefined,
  roles: UserRole[]
): boolean => {
  if (!user) return false;

  return roles.includes(user.role);
};

export const canAccessAdmin = (
  user: AuthUser | null | undefined
): boolean => isAdminRole(user?.role);

export const canAccessSeller = (
  user: AuthUser | null | undefined
): boolean => isSellerRole(user?.role);

export const canAccessCustomerAccount = (
  user: AuthUser | null | undefined
): boolean =>
  Boolean(user) &&
  !isAdminRole(user?.role) &&
  !isSellerRole(user?.role);

export const getDefaultRouteForRole = (
  role?: UserRole | null
): string => {
  if (!role) return "/";

  if (isAdminRole(role)) {
    return "/admin";
  }

  if (isSellerRole(role)) {
    return "/seller";
  }

  return "/account";
};

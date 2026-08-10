export type UserRole =
  | "customer"
  | "seller"
  | "vendor"
  | "rider"
  | "administrator"
  | "super_admin"
  | "warehouse_staff"
  | "finance_officer"
  | "customer_service";

export interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  mfaEnabled: boolean;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface VerifyOtpPayload {
  identifier: string;
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  session?: AuthSession;
}

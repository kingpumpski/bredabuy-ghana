export const AUTH_STORAGE_KEY = "bredabuy-auth";

export const AUTH_ROUTES = {
  login: "/auth/login",
  register: "/auth/register",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  verifyEmail: "/auth/verify-email",
  verifyOtp: "/auth/verify-otp",
  mfa: "/auth/mfa",
  account: "/account",
  seller: "/seller",
  admin: "/admin",
} as const;

export const SESSION_REFRESH_BUFFER_MS = 60_000;

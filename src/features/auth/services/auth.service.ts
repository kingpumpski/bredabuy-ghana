import apiClient from "@/services/api/client";

import type {
  AuthResponse,
  ForgotPasswordPayload,
  LoginCredentials,
  RegisterPayload,
  ResetPasswordPayload,
  VerifyOtpPayload,
} from "../types/auth.types";

export const authService = {
  async login(
    payload: LoginCredentials
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/login",
        payload
      );

    return response.data;
  },

  async register(
    payload: RegisterPayload
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/register",
        payload
      );

    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post(
      "/auth/logout"
    );
  },

  async refresh(): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/refresh"
      );

    return response.data;
  },

  async forgotPassword(
    payload: ForgotPasswordPayload
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/forgot-password",
        payload
      );

    return response.data;
  },

  async resetPassword(
    payload: ResetPasswordPayload
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/reset-password",
        payload
      );

    return response.data;
  },

  async verifyOtp(
    payload: VerifyOtpPayload
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/verify-otp",
        payload
      );

    return response.data;
  },

  async verifyEmail(
    token: string
  ): Promise<AuthResponse> {
    const response =
      await apiClient.post<AuthResponse>(
        "/auth/verify-email",
        { token }
      );

    return response.data;
  },

  async me(): Promise<AuthResponse> {
    const response =
      await apiClient.get<AuthResponse>(
        "/auth/me"
      );

    return response.data;
  },
};

export default authService;

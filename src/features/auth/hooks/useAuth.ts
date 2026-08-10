import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import authService from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

import {
  getDefaultRouteForRole,
} from "../utils/auth.utils";

import type {
  LoginCredentials,
  RegisterPayload,
} from "../types/auth.types";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user
  );

  const session = useAuthStore(
    (state) => state.session
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const status = useAuthStore(
    (state) => state.status
  );

  const setSession = useAuthStore(
    (state) => state.setSession
  );

  const clearSession = useAuthStore(
    (state) => state.clearSession
  );

  const setStatus = useAuthStore(
    (state) => state.setStatus
  );

  const setError = useAuthStore(
    (state) => state.setError
  );

  const login = useCallback(
    async (
      credentials: LoginCredentials
    ) => {
      try {
        setStatus("initializing");
        setError(null);

        const response =
          await authService.login(credentials);

        if (
          response.success &&
          response.session
        ) {
          setSession(response.session);

          const requestedPath =
            location.state?.from;

          const fallback =
            getDefaultRouteForRole(
              response.session.user.role
            );

          navigate(
            requestedPath || fallback,
            { replace: true }
          );
        }

        return response;
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to sign in."
        );

        throw error;
      }
    },
    [
      location.state,
      navigate,
      setError,
      setSession,
      setStatus,
    ]
  );

  const register = useCallback(
    async (
      payload: RegisterPayload
    ) => {
      setError(null);

      return authService.register(payload);
    },
    [setError]
  );

  const logout = useCallback(
    async () => {
      try {
        setStatus("refreshing");
        await authService.logout();
      } finally {
        clearSession();
        navigate("/auth/login", {
          replace: true,
        });
      }
    },
    [
      clearSession,
      navigate,
      setStatus,
    ]
  );

  return {
    user,
    session,
    status,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

export default useAuth;

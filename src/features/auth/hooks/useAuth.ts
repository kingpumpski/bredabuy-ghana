import {
  useCallback,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuthStore,
} from "../store/auth.store";

import authService from "../services/auth.service";

import type {
  LoginCredentials,
  RegisterPayload,
} from "../types/auth.types";

export const useAuth = () => {
  const navigate =
    useNavigate();

  const user =
    useAuthStore(
      (state) => state.user
    );

  const session =
    useAuthStore(
      (state) => state.session
    );

  const isAuthenticated =
    useAuthStore(
      (state) =>
        state.isAuthenticated
    );

  const setSession =
    useAuthStore(
      (state) => state.setSession
    );

  const clearSession =
    useAuthStore(
      (state) =>
        state.clearSession
    );

  const login = useCallback(
    async (
      credentials: LoginCredentials
    ) => {
      const response =
        await authService.login(
          credentials
        );

      if (
        response.success &&
        response.session
      ) {
        setSession(
          response.session
        );

        navigate(
          credentials.rememberMe
            ? "/account"
            : "/account"
        );
      }

      return response;
    },
    [navigate, setSession]
  );

  const register = useCallback(
    async (
      payload: RegisterPayload
    ) => {
      return authService.register(
        payload
      );
    },
    []
  );

  const logout = useCallback(
    async () => {
      try {
        await authService.logout();
      } finally {
        clearSession();
        navigate("/login");
      }
    },
    [clearSession, navigate]
  );

  return {
    user,
    session,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

export default useAuth;

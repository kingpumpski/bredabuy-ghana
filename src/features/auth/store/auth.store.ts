import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

import type {
  AuthSession,
  AuthUser,
} from "../types/auth.types";

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setSession: (
    session: AuthSession
  ) => void;

  setUser: (
    user: AuthUser | null
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  clearSession: () => void;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,

        setSession: (session) =>
          set({
            session,
            user: session.user,
            isAuthenticated: true,
          }),

        setUser: (user) =>
          set({
            user,
            isAuthenticated:
              Boolean(user),
          }),

        setLoading: (isLoading) =>
          set({
            isLoading,
          }),

        clearSession: () =>
          set({
            user: null,
            session: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "bredabuy-auth",
        partialize: (state) => ({
          user: state.user,
          session: state.session,
          isAuthenticated:
            state.isAuthenticated,
        }),
      }
    )
  );

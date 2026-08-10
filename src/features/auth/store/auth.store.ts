import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  AuthSession,
  AuthState,
  AuthStatus,
  AuthUser,
} from "../types/auth.types";

interface AuthStore extends AuthState {
  setSession: (session: AuthSession) => void;
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStatus) => void;
  setError: (error: string | null) => void;
  setInitializing: (value: boolean) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      status: "idle",
      error: null,
      isAuthenticated: false,

      setSession: (session) =>
        set({
          session,
          user: session.user,
          status: "authenticated",
          error: null,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
          status: user ? "authenticated" : "unauthenticated",
        }),

      setStatus: (status) =>
        set({
          status,
        }),

      setError: (error) =>
        set({
          error,
          status: error ? "error" : "idle",
        }),

      setInitializing: (value) =>
        set({
          status: value ? "initializing" : "idle",
        }),

      clearSession: () =>
        set({
          user: null,
          session: null,
          status: "unauthenticated",
          error: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "bredabuy-auth",
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

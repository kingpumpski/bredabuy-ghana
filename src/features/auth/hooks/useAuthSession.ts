import { useCallback, useEffect, useRef } from "react";

import authService from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

const REFRESH_BUFFER_MS = 60_000;

export function useAuthSession() {
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const session = useAuthStore((state) => state.session);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
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

  const refreshSession = useCallback(async () => {
    try {
      setStatus("refreshing");

      const response = await authService.refresh();

      if (response.success && response.session) {
        setSession(response.session);
        return response.session;
      }

      clearSession();
      return null;
    } catch (error) {
      clearSession();

      setError(
        error instanceof Error
          ? error.message
          : "Your session has expired."
      );

      return null;
    }
  }, [
    clearSession,
    setError,
    setSession,
    setStatus,
  ]);

  useEffect(() => {
    if (!session?.expiresAt || !isAuthenticated) {
      return;
    }

    const delay = Math.max(
      session.expiresAt * 1000 -
        Date.now() -
        REFRESH_BUFFER_MS,
      10_000
    );

    refreshTimer.current = setTimeout(() => {
      void refreshSession();
    }, delay);

    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
    };
  }, [
    session,
    isAuthenticated,
    refreshSession,
  ]);

  return {
    session,
    isAuthenticated,
    refreshSession,
  };
}

export default useAuthSession;

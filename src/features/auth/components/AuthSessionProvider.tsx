import {
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import authService from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: ReactNode;
}

export default function AuthSessionProvider({
  children,
}: Props) {
  const initialized = useRef(false);

  const session = useAuthStore(
    (state) => state.session
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

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const restoreSession = async () => {
      if (!session) {
        setStatus("unauthenticated");
        return;
      }

      setStatus("initializing");

      try {
        const response = await authService.me();

        if (
          response.success &&
          response.session
        ) {
          setSession(response.session);
          return;
        }

        clearSession();
      } catch (error) {
        clearSession();

        setError(
          error instanceof Error
            ? error.message
            : "Unable to restore your session."
        );
      }
    };

    void restoreSession();
  }, [
    clearSession,
    session,
    setError,
    setSession,
    setStatus,
  ]);

  return <>{children}</>;
}

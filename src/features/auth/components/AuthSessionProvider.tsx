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

      try {
        setStatus("initializing");

        const response =
          await authService.me();

        if (
          response.success &&
          response.session
        ) {
          setSession(response.session);
        } else {
          clearSession();
        }
      } catch {
        clearSession();
      }
    };

    void restoreSession();
  }, [
    clearSession,
    session,
    setSession,
    setStatus,
  ]);

  return <>{children}</>;
}

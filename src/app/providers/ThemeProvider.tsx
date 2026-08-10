import type { ReactNode } from "react";

import { ThemeProvider as ApplicationThemeProvider } from "@/context/ThemeContext";

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return (
    <ApplicationThemeProvider>
      {children}
    </ApplicationThemeProvider>
  );
}

export default ThemeProvider;

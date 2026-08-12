import type { ReactNode } from "react";

import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthSessionProvider from "@/features/auth/components/AuthSessionProvider";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider>
          <AuthSessionProvider>
            <CartProvider>
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </CartProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  );
}

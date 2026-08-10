import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { CartProvider } from "@/context/CartContext";
import AuthSessionProvider from "@/features/auth/components/AuthSessionProvider";
import { ThemeProvider } from "@/context/ThemeContext";

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </HelmetProvider>
  );
}

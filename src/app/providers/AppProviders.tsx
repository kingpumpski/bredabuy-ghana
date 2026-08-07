import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/context/CartContext";

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  return (
    <HelmetProvider>
      <QueryProvider>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </QueryProvider>
    </HelmetProvider>
  );
  
}
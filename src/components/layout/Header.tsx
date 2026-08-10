import {
  Heart,
  Menu,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/features/auth/store/auth.store";

import ThemeToggle from "./ThemeToggle";
import StorefrontSearch from "./StorefrontSearch";
import AccountMenu from "./AccountMenu";
import StorefrontNavigation from "./StorefrontNavigation";

const Header = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const {
    items,
  } = useCart();

  // const cartCount = Array.isArray(items)
  //   ? items.reduce(
  //       (total: number, item: any) =>
  //         total + (item.quantity || 1),
  //       0
  //     )
  //   : 0;

  const cartCount = Array.isArray(items)
    ? items.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      )
    : 0;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">

      <div className="container mx-auto px-4">

        <div className="flex min-h-16 items-center gap-3">

          {/* Mobile navigation */}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[300px] sm:w-[360px]"
            >
              <div className="mt-8 flex flex-col gap-4">

                <Link
                  to="/shop"
                  className="text-lg font-medium"
                >
                  Shop
                </Link>

                <Link
                  to="/categories"
                  className="text-lg font-medium"
                >
                  Categories
                </Link>

                <Link
                  to="/deals"
                  className="text-lg font-medium"
                >
                  Deals
                </Link>

                <Link
                  to="/flash-sales"
                  className="text-lg font-medium text-destructive"
                >
                  Flash Sales
                </Link>

                <Link
                  to="/brands"
                  className="text-lg font-medium"
                >
                  Brands
                </Link>

                <Link
                  to="/about"
                  className="text-lg font-medium"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="text-lg font-medium"
                >
                  Contact
                </Link>

                {user ? (
                  <Link
                    to="/account"
                    className="text-lg font-medium"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    to="/auth/login"
                    className="text-lg font-medium"
                  >
                    Login
                  </Link>
                )}

              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}

          <Link
            to="/"
            className="shrink-0"
            aria-label="BredaBuy Ghana home"
          >
            <div className="text-xl font-black tracking-tight md:text-2xl">
              Breda<span className="text-primary">Buy</span>
            </div>

            <div className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              Ghana's Digital Marketplace
            </div>
          </Link>

          {/* Search */}

          <div className="hidden flex-1 px-4 md:block">
            <StorefrontSearch />
          </div>

          {/* Actions */}

          <div className="ml-auto flex items-center gap-1">

            <Link
              to="/wishlist"
              className="hidden sm:block"
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <ThemeToggle />

            <AccountMenu />

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />

                {cartCount > 0 && (
                  <Badge
                    className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]"
                  >
                    {cartCount > 99
                      ? "99+"
                      : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

          </div>

        </div>

        {/* Mobile search */}

        <div className="pb-3 md:hidden">
          <StorefrontSearch />
        </div>

      </div>

      <StorefrontNavigation />

    </header>
  );
};

export default Header;

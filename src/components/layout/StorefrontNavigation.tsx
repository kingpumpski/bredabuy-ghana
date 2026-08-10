import {
  ChevronDown,
  Percent,
  Store,
  Tag,
} from "lucide-react";

import { Link } from "react-router-dom";

const StorefrontNavigation = () => {
  return (
    <nav
      className="hidden border-t md:block"
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-12 items-center gap-6 px-4">

        <Link
          to="/shop"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Store className="h-4 w-4" />
          Shop
        </Link>

        <Link
          to="/categories"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          Categories
          <ChevronDown className="h-4 w-4" />
        </Link>

        <Link
          to="/deals"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
          <Tag className="h-4 w-4" />
          Deals
        </Link>

        <Link
          to="/flash-sales"
          className="flex items-center gap-2 text-sm font-medium text-destructive transition-colors hover:opacity-80"
        >
          <Percent className="h-4 w-4" />
          Flash Sales
        </Link>

        <Link
          to="/brands"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Brands
        </Link>

        <Link
          to="/about"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Contact
        </Link>

      </div>
    </nav>
  );
};

export default StorefrontNavigation;

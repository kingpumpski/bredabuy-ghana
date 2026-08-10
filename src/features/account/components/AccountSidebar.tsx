import {
  Bell,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  MapPin,
  Package,
  Settings,
  Shield,
  Star,
  User,
  Wallet,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navigation = [
  {
    label: "Overview",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    label: "Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    label: "Wishlist",
    href: "/account/wishlist",
    icon: Heart,
  },
  {
    label: "Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Notifications",
    href: "/account/notifications",
    icon: Bell,
  },
  {
    label: "Wallet",
    href: "/account/wallet",
    icon: Wallet,
  },
  {
    label: "Reviews",
    href: "/account/reviews",
    icon: Star,
  },
  {
    label: "Security",
    href: "/account/security",
    icon: Shield,
  },
  {
    label: "Support",
    href: "/account/support",
    icon: LifeBuoy,
  },
];

export default function AccountSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="rounded-xl border bg-background p-3 shadow-sm">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/account"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  ].join(" ")
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-4 border-t pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );
}

import {
  Bell,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Package,
  Settings,
  ShieldCheck,
  Star,
  User,
  Wallet,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  {
    label: "Overview",
    path: "/account",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Profile",
    path: "/account/profile",
    icon: User,
  },
  {
    label: "My Orders",
    path: "/account/orders",
    icon: Package,
  },
  {
    label: "Wishlist",
    path: "/account/wishlist",
    icon: Heart,
  },
  {
    label: "Addresses",
    path: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Wallet",
    path: "/account/wallet",
    icon: Wallet,
  },
  {
    label: "Notifications",
    path: "/account/notifications",
    icon: Bell,
  },
  {
    label: "My Reviews",
    path: "/account/reviews",
    icon: Star,
  },
  {
    label: "Support",
    path: "/account/support",
    icon: MessageCircle,
  },
  {
    label: "Security",
    path: "/account/security",
    icon: ShieldCheck,
  },
];

export default function AccountShell() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          My Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, orders, payments and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-xl border bg-background p-2 shadow-sm">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

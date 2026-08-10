import {
  ArrowRight,
  Heart,
  Package,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { accountOrders } from "../data/account.data";

export default function AccountDashboardPage() {
  const user = useAuthStore((state) => state.user);

  const firstName =
    user?.firstName ||
    user?.name?.split(" ")[0] ||
    "Customer";

  const stats = [
    {
      label: "Total Orders",
      value: "12",
      icon: Package,
    },
    {
      label: "Wishlist",
      value: "8",
      icon: Heart,
    },
    {
      label: "Wallet Balance",
      value: "GH₵ 450",
      icon: Wallet,
    },
    {
      label: "Shopping Activity",
      value: "Active",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Welcome back,
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {firstName}
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Track your purchases, manage your account and discover
            products from trusted sellers across Ghana.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>

          <Button asChild variant="ghost" size="sm">
            <Link to="/account/orders">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {accountOrders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date} · {order.items} items
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="secondary">
                  {order.status}
                </Badge>

                <span className="font-semibold">
                  GH₵ {order.total.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { accountOrders } from "../data/account.data";

export default function AccountOrderDetailsPage() {
  const { id } = useParams();

  const order = accountOrders.find((item) => item.id === id);

  if (!order) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">
            Order not found
          </h2>

          <Button asChild>
            <Link to="/account/orders">
              Back to Orders
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>{order.id}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Placed on {order.date}
              </p>
            </div>

            <Badge>{order.status}</Badge>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Items
            </p>
            <p className="font-semibold">{order.items}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Order Total
            </p>
            <p className="font-semibold">
              GH₵ {order.total.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Payment
            </p>
            <p className="font-semibold">
              Mobile Money
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Timeline</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[
            "Order placed",
            "Payment confirmed",
            "Seller processing order",
            "Order dispatched",
            "Order delivered",
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {index + 1}
              </div>

              <span className="text-sm">
                {step}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

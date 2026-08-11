import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";
import type { OrderStatus } from "@/features/orders/types/order.types";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  "ready-for-dispatch": "Ready for dispatch",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
  refunded: "Refunded",
};

export default function AccountOrdersPage() {
  const { user } = useAuth();
  const orders = orderService.list(user?.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
        <p className="text-sm text-muted-foreground">Track your purchases, configurations and delivery progress.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="font-semibold">No orders yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Your completed checkout orders will appear here.</p>
            <Button asChild className="mt-5"><Link to="/products">Start Shopping</Link></Button>
          </div>
        ) : orders.map((order) => (
          <div key={order.id} className="rounded-xl border p-4 transition-shadow hover:shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">Placed {new Date(order.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-sm">{order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={order.status === "cancelled" ? "destructive" : "secondary"}>{statusLabel[order.status]}</Badge>
                <span className="font-semibold">GH₵ {order.total.toLocaleString()}</span>
                <Button asChild variant="outline" size="sm"><Link to={`/account/orders/${order.id}`}>View details</Link></Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

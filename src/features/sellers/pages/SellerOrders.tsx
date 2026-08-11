import { useMemo, useState } from "react";
import { RefreshCw, PackageCheck, Truck, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";
import type { Order, OrderStatus } from "@/features/orders/types/order.types";
import { toast } from "@/hooks/use-toast";

const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "processing",
  processing: "ready-for-dispatch",
  "ready-for-dispatch": "shipped",
  shipped: "out-for-delivery",
  "out-for-delivery": "delivered",
};

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

const statusTone = (status: OrderStatus) => {
  if (["delivered"].includes(status)) return "default" as const;
  if (["cancelled", "returned", "refunded"].includes(status)) return "destructive" as const;
  return "secondary" as const;
};

export default function SellerOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(() =>
    user ? orderService.listForSeller(user.id) : [],
  );

  const refresh = () => {
    setOrders(user ? orderService.listForSeller(user.id) : []);
  };

  const activeCount = useMemo(
    () => orders.filter((order) => !["delivered", "cancelled", "returned", "refunded"].includes(order.status)).length,
    [orders],
  );

  const advance = (order: Order) => {
    const next = nextStatus[order.status];
    if (!next) return;
    const updated = orderService.updateStatus(order.id, next);
    if (updated) {
      setOrders((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      toast({
        title: "Order updated",
        description: `${updated.orderNumber} is now ${statusLabel[updated.status]}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Seller workspace</p>
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeCount} active order{activeCount === 1 ? "" : "s"} requiring attention.
          </p>
        </div>
        <Button variant="outline" onClick={refresh}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <PackageCheck className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-lg font-semibold">No seller orders yet</h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Orders containing products assigned to this seller will appear here automatically.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const sellerItems = order.items.filter((item) => item.sellerId === user?.id);
            const next = nextStatus[order.status];

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="border-b bg-muted/20">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <CardTitle className="text-base">{order.orderNumber}</CardTitle>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString("en-GH")}
                      </p>
                    </div>
                    <Badge variant={statusTone(order.status)}>{statusLabel[order.status]}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 p-5">
                  <div className="space-y-3">
                    {sellerItems.map((item) => (
                      <div key={item.id} className="flex gap-3 rounded-xl border p-3">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                            <PackageCheck className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                          {item.attributes && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {Object.entries(item.attributes).map(([key, value]) => `${key}: ${value}`).join(" • ")}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-semibold">Qty {item.quantity}</p>
                          <p className="text-muted-foreground">GH₵ {item.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 rounded-xl bg-muted/30 p-4 text-sm sm:grid-cols-3">
                    <div><p className="text-muted-foreground">Payment</p><p className="font-medium capitalize">{order.paymentMethod.replaceAll("-", " ")}</p></div>
                    <div><p className="text-muted-foreground">Payment status</p><p className="font-medium capitalize">{order.paymentStatus}</p></div>
                    <div><p className="text-muted-foreground">Order total</p><p className="font-semibold">GH₵ {order.total.toLocaleString()}</p></div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {next && (
                      <Button onClick={() => advance(order)}>
                        {next === "shipped" ? <Truck className="mr-2 h-4 w-4" /> : next === "delivered" ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <PackageCheck className="mr-2 h-4 w-4" />}
                        Mark {statusLabel[next]}
                      </Button>
                    )}
                    {!next && order.status === "delivered" && <span className="text-sm font-medium text-muted-foreground">Fulfillment complete</span>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

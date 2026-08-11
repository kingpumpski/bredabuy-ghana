import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";
import type { OrderStatus } from "@/features/orders/types/order.types";

const steps: OrderStatus[] = ["pending", "confirmed", "processing", "ready-for-dispatch", "shipped", "out-for-delivery", "delivered"];
const labels: Record<OrderStatus, string> = {
  pending: "Order placed",
  confirmed: "Order confirmed",
  processing: "Seller processing",
  "ready-for-dispatch": "Ready for dispatch",
  shipped: "Dispatched",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
  refunded: "Refunded",
};

export default function AccountOrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const order = refresh >= 0 ? orderService.getById(id ?? "") : null;

  if (!order || order.customerId !== user?.id) {
    return <Card><CardContent className="space-y-4 p-6"><h2 className="text-xl font-semibold">Order not found</h2><Button asChild><Link to="/account/orders">Back to Orders</Link></Button></CardContent></Card>;
  }

  const currentIndex = steps.indexOf(order.status);
  const canCancel = ["pending", "confirmed"].includes(order.status);

  const handleCancel = () => {
    if (!window.confirm("Cancel this order? This action cannot be undone.")) return;
    if (orderService.cancel(order.id)) setRefresh((value) => value + 1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><CardTitle>{order.orderNumber}</CardTitle><p className="mt-1 text-sm text-muted-foreground">Placed {new Date(order.createdAt).toLocaleString()}</p></div>
            <Badge variant={order.status === "cancelled" ? "destructive" : "secondary"}>{labels[order.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div><p className="text-sm text-muted-foreground">Items</p><p className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</p></div>
            <div><p className="text-sm text-muted-foreground">Order Total</p><p className="font-semibold">GH₵ {order.total.toLocaleString()}</p></div>
            <div><p className="text-sm text-muted-foreground">Payment</p><p className="font-semibold capitalize">{order.paymentMethod.replaceAll("-", " ")}</p><p className="text-xs text-muted-foreground">{order.paymentStatus}</p></div>
          </div>
          {canCancel && <Button variant="destructive" onClick={handleCancel}>Cancel Order</Button>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Items & configurations</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item) => <div key={item.id} className="flex gap-4 rounded-xl border p-4">
            {item.image && <img src={item.image} alt="" className="h-20 w-20 rounded-lg object-cover" loading="lazy" />}
            <div className="min-w-0 flex-1"><p className="font-semibold">{item.name}</p><p className="text-xs text-muted-foreground">SKU: {item.sku} · Qty: {item.quantity}</p>{item.attributes && Object.keys(item.attributes).length > 0 && <div className="mt-2 flex flex-wrap gap-2">{Object.entries(item.attributes).map(([key, value]) => <Badge key={key} variant="outline">{key}: {value}</Badge>)}</div>}</div>
            <p className="font-semibold">GH₵ {(item.totalPrice * item.quantity).toLocaleString()}</p>
          </div>)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Delivery timeline</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {order.status === "cancelled" ? <div className="rounded-lg bg-destructive/10 p-4 text-sm">This order was cancelled.</div> : steps.map((step, index) => {
            const complete = currentIndex >= index;
            return <div key={step} className="flex items-center gap-3"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${complete ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{complete ? "✓" : index + 1}</div><span className={complete ? "font-medium" : "text-muted-foreground"}>{labels[step]}</span></div>;
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Delivery address</CardTitle></CardHeader>
        <CardContent className="text-sm leading-6"><p className="font-medium">{order.shippingAddress.fullName}</p><p>{order.shippingAddress.addressLine}</p><p>{order.shippingAddress.area}, {order.shippingAddress.city}, {order.shippingAddress.region}</p>{order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}<p>Phone: {order.shippingAddress.phone}</p>{order.shippingAddress.digitalAddress && <p>Digital address: {order.shippingAddress.digitalAddress}</p>}</CardContent>
      </Card>

      <Button variant="outline" onClick={() => navigate("/account/orders")}>Back to Orders</Button>
    </div>
  );
}

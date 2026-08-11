import React, { FormEvent, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Circle, PackageSearch, Search, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import orderService from "@/features/orders/services/order.service";
import type { Order, OrderStatus } from "@/features/orders/types/order.types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Order placed",
  confirmed: "Order confirmed",
  processing: "Being prepared",
  "ready-for-dispatch": "Ready for dispatch",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
  refunded: "Refunded",
};

const TRACKABLE_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "ready-for-dispatch",
  "shipped",
  "out-for-delivery",
  "delivered",
];

const normalizeContact = (value: string) => value.trim().toLowerCase();

const TrackOrder: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const currentIndex = useMemo(
    () => (order ? TRACKABLE_FLOW.indexOf(order.status) : -1),
    [order],
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setOrder(null);

    const normalizedOrderNumber = orderNumber.trim().toUpperCase();
    const normalizedContact = normalizeContact(contact);

    if (!normalizedOrderNumber || !normalizedContact) {
      setError("Enter your order number and the email address or phone number used at checkout.");
      return;
    }

    const found = orderService.getByOrderNumber(normalizedOrderNumber);
    if (!found) {
      setError("We could not find an order with those details. Check the order number and try again.");
      return;
    }

    const expectedContact = found.customerId.replace(/^guest:/, "").toLowerCase();
    if (expectedContact !== normalizedContact) {
      setError("The order number and contact details do not match our records.");
      return;
    }

    setOrder(found);
  };

  return (
    <>
      <Helmet>
        <title>Track Order | BredaBuy Ghana</title>
        <meta
          name="description"
          content="Securely check the delivery status of your BredaBuy Ghana order."
        />
      </Helmet>

      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <PackageSearch className="h-7 w-7 text-primary" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-display font-bold md:text-4xl">Track your order</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Enter your order number and the email address or phone number used at checkout.
              We use both details to protect your order information.
            </p>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="track-order-title">
            <h2 id="track-order-title" className="sr-only">Order tracking lookup</h2>
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="order-number">Order number</Label>
                <Input
                  id="order-number"
                  value={orderNumber}
                  onChange={(event) => setOrderNumber(event.target.value)}
                  placeholder="BB-2026-..."
                  autoComplete="off"
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="order-contact">Email or phone</Label>
                <Input
                  id="order-contact"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="you@example.com or +233..."
                  autoComplete="email"
                  className="mt-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="hero" className="w-full md:w-auto">
                  <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                  Track order
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">
                {error}
              </div>
            )}
          </section>

          {order && (
            <section className="mt-8 space-y-6" aria-live="polite" aria-labelledby="tracking-result-title">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Order number</p>
                    <h2 id="tracking-result-title" className="mt-1 font-mono text-xl font-bold">{order.orderNumber}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Placed {new Intl.DateTimeFormat("en-GH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt))}
                    </p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {STATUS_LABELS[order.status]}
                  </div>
                </div>

                <div className="mt-8 space-y-0">
                  {order.status === "cancelled" || order.status === "returned" || order.status === "refunded" ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
                      <p className="font-semibold">{STATUS_LABELS[order.status]}</p>
                      <p className="mt-1 text-muted-foreground">This order is no longer progressing through the normal delivery flow.</p>
                    </div>
                  ) : (
                    TRACKABLE_FLOW.map((status, index) => {
                      const completed = currentIndex >= index;
                      const active = order.status === status;
                      const event = order.statusHistory?.find((item) => item.status === status);
                      return (
                        <div key={status} className="relative flex gap-4 pb-7 last:pb-0">
                          {index < TRACKABLE_FLOW.length - 1 && (
                            <span className={`absolute left-3.5 top-8 h-[calc(100%-1rem)] w-px ${completed && currentIndex > index ? "bg-primary" : "bg-border"}`} aria-hidden="true" />
                          )}
                          <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            {completed ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <Circle className="h-4 w-4" aria-hidden="true" />}
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <p className={`font-semibold ${active ? "text-primary" : "text-foreground"}`}>{STATUS_LABELS[status]}</p>
                            {event ? (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {new Intl.DateTimeFormat("en-GH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(event.timestamp))}
                                {event.note ? ` · ${event.note}` : ""}
                              </p>
                            ) : !completed ? (
                              <p className="mt-1 text-sm text-muted-foreground">Waiting for the previous step.</p>
                            ) : null}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h3 className="font-semibold">Delivery</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{order.shippingMethod?.name ?? "Delivery method pending"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{order.shippingMethod?.estimatedDays ?? "Estimated timing will appear when available."}</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <p className="text-sm text-muted-foreground">Order total</p>
                  <p className="mt-2 text-2xl font-bold">{formatPrice(order.total)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Payment: {order.paymentStatus}</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default TrackOrder;

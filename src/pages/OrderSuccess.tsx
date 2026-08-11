import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Package, ArrowRight, ClipboardList } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

type OrderSuccessState = {
  orderId?: string;
  orderNumber?: string;
  total?: number;
};

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const state = (location.state ?? {}) as OrderSuccessState;

  const formatPrice = (price: number) => new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <>
      <Helmet>
        <title>Order Confirmed - BredaBuy</title>
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-secondary/10 animate-scale-in">
              <CheckCircle2 className="h-14 w-14 text-secondary" />
            </div>

            <h1 className="mb-4 text-3xl font-display font-bold text-foreground md:text-4xl animate-slide-up">
              Order Confirmed!
            </h1>
            <p className="mb-8 text-lg text-muted-foreground animate-slide-up">
              Thank you for shopping with BredaBuy. Your order has been placed successfully.
            </p>

            <div className="mb-8 rounded-2xl border border-border bg-card p-6 text-left shadow-sm animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                  <span className="text-muted-foreground">Order Number</span>
                  <span className="font-mono text-sm font-semibold">{state.orderNumber ?? "Pending"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Order Total</span>
                  <span className="text-xl font-bold text-foreground">
                    {typeof state.total === "number" ? formatPrice(state.total) : "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8 space-y-4 animate-slide-up">
              <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <ClipboardList className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Order saved</p>
                  <p className="text-sm text-muted-foreground">
                    Your order is now available in your account order history.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Delivery tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Tracking will become available when the order is dispatched.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row animate-slide-up">
              <Link to="/products" className="flex-1">
                <Button variant="hero" className="w-full">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/account/orders" className="flex-1">
                <Button variant="outline" className="w-full">
                  View My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderSuccess;

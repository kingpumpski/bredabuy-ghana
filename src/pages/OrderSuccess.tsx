import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Package, Mail, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const { transactionId, trackingNumber, total } = location.state || {};

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>Order Confirmed - BredaBuy</title>
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-lg mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
              <CheckCircle2 className="w-14 h-14 text-secondary" />
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 animate-slide-up">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up stagger-1">
              Thank you for shopping with BredaBuy. Your order has been placed successfully.
            </p>

            {/* Order Details */}
            <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left animate-slide-up stagger-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <span className="font-mono font-semibold text-sm">
                    {transactionId || "TXN-DEMO-12345"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Tracking Number</span>
                  <span className="font-mono font-semibold text-sm text-primary">
                    {trackingNumber || "TRK-DEMO-67890"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="text-xl font-bold text-foreground">
                    {total ? formatPrice(total) : formatPrice(0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4 mb-8 animate-slide-up stagger-3">
              <div className="flex items-center gap-4 bg-muted/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Confirmation Email Sent</p>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox for order details
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-muted/50 rounded-xl p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Track Your Order</p>
                  <p className="text-sm text-muted-foreground">
                    Use your tracking number to monitor delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-4">
              <Link to="/products" className="flex-1">
                <Button variant="hero" className="w-full">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/track-order" className="flex-1">
                <Button variant="outline" className="w-full">
                  Track Order
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

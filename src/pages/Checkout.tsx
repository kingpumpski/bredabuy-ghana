import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CreditCard, Smartphone, Banknote, ChevronLeft, Check, Lock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { VAT_RATE } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PaymentMethod = "mobile-money" | "bank-transfer" | "cod";

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money");
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal >= 500 ? 0 : 50;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + shipping + vat;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const generateTransactionId = () => {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const transactionId = generateTransactionId();
    const trackingNumber = `TRK-${Date.now()}`;
    
    clearCart();
    
    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Transaction ID: ${transactionId}. Tracking: ${trackingNumber}`,
    });
    
    navigate("/order-success", {
      state: { transactionId, trackingNumber, total },
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout - BredaBuy</title>
        </Helmet>
        <Layout>
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - BredaBuy</title>
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Back Link */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Shipping Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="+233 20 123 4567"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="123 Independence Avenue, Accra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Region</label>
                    <select className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none">
                      <option>Greater Accra</option>
                      <option>Ashanti</option>
                      <option>Western</option>
                      <option>Eastern</option>
                      <option>Central</option>
                      <option>Northern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Accra"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      id: "mobile-money",
                      icon: Smartphone,
                      name: "Mobile Money",
                      description: "MTN, Vodafone, AirtelTigo",
                    },
                    {
                      id: "bank-transfer",
                      icon: CreditCard,
                      name: "Bank Transfer",
                      description: "Direct bank transfer",
                    },
                    {
                      id: "cod",
                      icon: Banknote,
                      name: "Cash on Delivery",
                      description: "Pay when you receive",
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          paymentMethod === method.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <Check className="w-6 h-6 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-display font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-sm">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border mb-6" />

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className={shipping === 0 ? "text-secondary" : ""}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (12.5%)</span>
                    <span>{formatPrice(vat)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" />
                  Secure checkout powered by BredaBuy
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;

import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CreditCard, Smartphone, Banknote, ChevronLeft, Check, Lock, AlertTriangle } from "lucide-react";
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
  const unavailableItems = useMemo(
    () => items.filter((item) => item.availableStock <= 0 || item.quantity > item.availableStock),
    [items],
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);

  const generateTransactionId = () =>
    `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;

  const handlePlaceOrder = async () => {
    if (unavailableItems.length > 0) {
      toast({
        title: "Cart needs attention",
        description: "One or more product configurations are no longer available.",
        variant: "destructive",
      });
      navigate("/cart");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const transactionId = generateTransactionId();
    const trackingNumber = `TRK-${Date.now()}`;
    clearCart();

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Transaction ID: ${transactionId}. Tracking: ${trackingNumber}`,
    });

    navigate("/order-success", {
      state: { transactionId, trackingNumber, total, paymentMethod },
    });
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Checkout - BredaBuy</title></Helmet>
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
          <Link to="/products"><Button>Continue Shopping</Button></Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Checkout - BredaBuy</title></Helmet>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/cart" className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <ChevronLeft className="h-5 w-5" /> Back to Cart
        </Link>

        <h1 className="mb-8 text-3xl font-display font-bold text-foreground md:text-4xl">Checkout</h1>

        {unavailableItems.length > 0 && (
          <div className="mb-8 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
            <div>
              <p className="font-semibold">Checkout is temporarily unavailable</p>
              <p className="mt-1 text-muted-foreground">Return to your cart and remove or reduce unavailable configurations before placing the order.</p>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="shipping-title">
              <h2 id="shipping-title" className="mb-6 text-xl font-display font-bold text-foreground">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">First Name<input required type="text" autoComplete="given-name" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="John" /></label>
                <label className="block text-sm font-medium">Last Name<input required type="text" autoComplete="family-name" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="Doe" /></label>
                <label className="block text-sm font-medium sm:col-span-2">Phone Number<input required type="tel" autoComplete="tel" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="+233 20 123 4567" /></label>
                <label className="block text-sm font-medium sm:col-span-2">Email Address<input required type="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="john@example.com" /></label>
                <label className="block text-sm font-medium sm:col-span-2">Delivery Address<input required type="text" autoComplete="street-address" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="123 Independence Avenue, Accra" /></label>
                <label className="block text-sm font-medium">Region<select defaultValue="Greater Accra" autoComplete="address-level1" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"><option>Greater Accra</option><option>Ashanti</option><option>Western</option><option>Eastern</option><option>Central</option><option>Northern</option></select></label>
                <label className="block text-sm font-medium">City<input required type="text" autoComplete="address-level2" className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" placeholder="Accra" /></label>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="payment-title">
              <h2 id="payment-title" className="mb-6 text-xl font-display font-bold text-foreground">Payment Method</h2>
              <div className="space-y-4">
                {[
                  { id: "mobile-money", icon: Smartphone, name: "Mobile Money", description: "MTN, Vodafone, AirtelTigo" },
                  { id: "bank-transfer", icon: CreditCard, name: "Bank Transfer", description: "Direct bank transfer" },
                  { id: "cod", icon: Banknote, name: "Cash on Delivery", description: "Pay when you receive" },
                ].map((method) => (
                  <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id as PaymentMethod)} aria-pressed={paymentMethod === method.id} className={cn("w-full flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200", paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted")}><method.icon className="h-6 w-6" /></div>
                    <div className="flex-1 text-left"><p className="font-semibold">{method.name}</p><p className="text-sm text-muted-foreground">{method.description}</p></div>
                    {paymentMethod === method.id && <Check className="h-6 w-6 text-primary" />}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1" aria-label="Order summary">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h2 className="mb-6 text-xl font-display font-bold text-foreground">Order Summary</h2>
              <div className="mb-6 space-y-4">
                {items.map((item) => {
                  const attributeSummary = item.attributes ? Object.entries(item.attributes).map(([name, value]) => `${name}: ${value}`).join(" • ") : "";
                  const unavailable = item.availableStock <= 0 || item.quantity > item.availableStock;
                  return (
                    <article key={`${item.product.id}:${item.variantId ?? "base"}`} className={cn("flex gap-3 rounded-lg p-2", unavailable && "bg-destructive/5")}>
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg"><img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" loading="lazy" decoding="async" /></div>
                      <div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{item.product.name}</p>{attributeSummary && <p className="mt-1 text-xs text-muted-foreground">{attributeSummary}</p>}<p className="mt-1 text-xs text-muted-foreground">SKU: {item.sku} · Qty: {item.quantity}</p>{unavailable && <p className="mt-1 text-xs font-medium text-destructive">Unavailable</p>}</div>
                      <p className="text-sm font-semibold">{formatPrice(item.unitPrice * item.quantity)}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mb-6 h-px bg-border" />
              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className={shipping === 0 ? "text-secondary" : ""}>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">VAT</span><span>{formatPrice(vat)}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
              </div>
              <Button variant="hero" className="w-full" onClick={handlePlaceOrder} disabled={isProcessing || unavailableItems.length > 0}>
                {isProcessing ? <span className="flex items-center gap-2"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />Processing...</span> : <><Lock className="mr-2 h-5 w-5" />Place Order</>}
              </Button>
              <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"><Lock className="h-3 w-3" />Secure checkout powered by BredaBuy</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Checkout;

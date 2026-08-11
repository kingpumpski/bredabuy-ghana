import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CreditCard, Smartphone, Banknote, ChevronLeft, Check, Lock, AlertTriangle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { VAT_RATE } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { validateCheckoutForm, type CheckoutFormValues } from "@/features/checkout/utils/checkout.validation";

type PaymentMethod = "mobile-money" | "bank-transfer" | "cod";

const initialForm: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  region: "Greater Accra",
  city: "",
};

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile-money");
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<CheckoutFormValues>(initialForm);
  const [errors, setErrors] = useState<ReturnType<typeof validateCheckoutForm>>({});

  const shipping = subtotal >= 500 ? 0 : 50;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + shipping + vat;
  const unavailableItems = useMemo(
    () => items.filter((item) => item.availableStock <= 0 || item.quantity > item.availableStock),
    [items],
  );

  const formatPrice = (price: number) => new Intl.NumberFormat("en-GH", {
    style: "currency", currency: "GHS", minimumFractionDigits: 2,
  }).format(price);

  const updateField = <K extends keyof CheckoutFormValues>(field: K, value: CheckoutFormValues[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handlePlaceOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateCheckoutForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({ title: "Complete your delivery details", description: "Please correct the highlighted fields before placing your order.", variant: "destructive" });
      return;
    }
    if (unavailableItems.length > 0) {
      toast({ title: "Cart needs attention", description: "One or more product configurations are no longer available.", variant: "destructive" });
      navigate("/cart");
      return;
    }

    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
    const trackingNumber = `TRK-${Date.now()}`;
    clearCart();
    toast({ title: "Order Placed Successfully! 🎉", description: `Transaction ID: ${transactionId}. Tracking: ${trackingNumber}` });
    navigate("/order-success", { state: { transactionId, trackingNumber, total, paymentMethod, customer: form } });
  };

  if (items.length === 0) {
    return <><Helmet><title>Checkout - BredaBuy</title></Helmet><main className="container mx-auto px-4 py-16 text-center"><h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1><Link to="/products"><Button>Continue Shopping</Button></Link></main></>;
  }

  const fieldClass = (field: keyof CheckoutFormValues) => cn("mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary", errors[field] ? "border-destructive" : "border-border");

  return <>
    <Helmet><title>Checkout - BredaBuy</title></Helmet>
    <form onSubmit={handlePlaceOrder} noValidate>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/cart" className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><ChevronLeft className="h-5 w-5" /> Back to Cart</Link>
        <h1 className="mb-8 text-3xl font-display font-bold text-foreground md:text-4xl">Checkout</h1>
        {unavailableItems.length > 0 && <div className="mb-8 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" /><div><p className="font-semibold">Checkout is temporarily unavailable</p><p className="mt-1 text-muted-foreground">Return to your cart and remove or reduce unavailable configurations before placing the order.</p></div></div>}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="shipping-title">
              <h2 id="shipping-title" className="mb-6 text-xl font-display font-bold">Shipping Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {([['firstName','First Name','given-name','text','John'],['lastName','Last Name','family-name','text','Doe'],['phone','Phone Number','tel','tel','+233 20 123 4567'],['email','Email Address','email','email','john@example.com'],['address','Delivery Address','street-address','text','123 Independence Avenue, Accra']] as const).map(([field,label,autocomplete,type,placeholder], index) => <label key={field} className={cn("block text-sm font-medium", index > 1 && "sm:col-span-2")}>{label}<input required type={type} autoComplete={autocomplete} value={form[field]} onChange={(e) => updateField(field, e.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} className={fieldClass(field)} placeholder={placeholder} />{errors[field] && <span id={`${field}-error`} className="mt-1 block text-xs text-destructive">{errors[field]}</span>}</label>)}
                <label className="block text-sm font-medium">Region<select required value={form.region} onChange={(e) => updateField("region", e.target.value)} className={fieldClass("region")}><option>Greater Accra</option><option>Ashanti</option><option>Western</option><option>Eastern</option><option>Central</option><option>Northern</option></select>{errors.region && <span className="mt-1 block text-xs text-destructive">{errors.region}</span>}</label>
                <label className="block text-sm font-medium">City<input required type="text" autoComplete="address-level2" value={form.city} onChange={(e) => updateField("city", e.target.value)} aria-invalid={Boolean(errors.city)} className={fieldClass("city")} placeholder="Accra" />{errors.city && <span className="mt-1 block text-xs text-destructive">{errors.city}</span>}</label>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="payment-title">
              <h2 id="payment-title" className="mb-6 text-xl font-display font-bold">Payment Method</h2>
              <div className="space-y-4">{[
                { id: "mobile-money", icon: Smartphone, name: "Mobile Money", description: "MTN, Vodafone, AirtelTigo" },
                { id: "bank-transfer", icon: CreditCard, name: "Bank Transfer", description: "Direct bank transfer" },
                { id: "cod", icon: Banknote, name: "Cash on Delivery", description: "Pay when you receive" },
              ].map((method) => <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id as PaymentMethod)} aria-pressed={paymentMethod === method.id} className={cn("w-full flex items-center gap-4 rounded-xl border-2 p-4 transition-all", paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}><div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted")}><method.icon className="h-6 w-6" /></div><div className="flex-1 text-left"><p className="font-semibold">{method.name}</p><p className="text-sm text-muted-foreground">{method.description}</p></div>{paymentMethod === method.id && <Check className="h-6 w-6 text-primary" />}</button>)}</div>
            </section>
          </div>

          <aside className="lg:col-span-1" aria-label="Order summary"><div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-display font-bold">Order Summary</h2>
            <div className="mb-6 space-y-4">{items.map((item) => { const unavailable = item.availableStock <= 0 || item.quantity > item.availableStock; const attributeSummary = item.attributes ? Object.entries(item.attributes).map(([name,value]) => `${name}: ${value}`).join(" • ") : ""; return <article key={`${item.product.id}:${item.variantId ?? "base"}`} className={cn("flex gap-3 rounded-lg p-2", unavailable && "bg-destructive/5")}><div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg"><img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" loading="lazy" decoding="async" /></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{item.product.name}</p>{attributeSummary && <p className="mt-1 text-xs text-muted-foreground">{attributeSummary}</p>}<p className="mt-1 text-xs text-muted-foreground">SKU: {item.sku} · Qty: {item.quantity}</p>{unavailable && <p className="mt-1 text-xs font-medium text-destructive">Unavailable</p>}</div><p className="text-sm font-semibold">{formatPrice(item.unitPrice * item.quantity)}</p></article>; })}</div>
            <div className="mb-6 h-px bg-border" /><div className="mb-6 space-y-3"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">VAT</span><span>{formatPrice(vat)}</span></div><div className="h-px bg-border" /><div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div></div>
            <Button type="submit" variant="hero" className="w-full" disabled={isProcessing || unavailableItems.length > 0}>{isProcessing ? <span className="flex items-center gap-2"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />Processing...</span> : <><Lock className="mr-2 h-5 w-5" />Place Order</>}</Button>
            <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"><Lock className="h-3 w-3" />Secure checkout powered by BredaBuy</p>
          </div></aside>
        </div>
      </main>
    </form>
  </>;
};

export default Checkout;

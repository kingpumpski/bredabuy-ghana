import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CreditCard, Smartphone, Banknote, ChevronLeft, Check, Lock, AlertTriangle, Truck, Store } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { VAT_RATE } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { checkoutService } from "@/features/checkout/services/checkout.service";
import { validateCheckoutForm, type CheckoutFormValues } from "@/features/checkout/utils/checkout.validation";
import type { PaymentMethod } from "@/features/payments/types/payment.types";
import type { ShippingAddress, ShippingMethod } from "@/features/shipping/types/shipping.types";
import shippingService from "@/features/shipping/services/shipping.service";

type CheckoutPaymentMethod = PaymentMethod;

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
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>("mobile-money");
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState("standard");
  const [isLoadingShipping, setIsLoadingShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState<CheckoutFormValues>(initialForm);
  const [errors, setErrors] = useState<ReturnType<typeof validateCheckoutForm>>({});

  const unavailableItems = useMemo(
    () => items.filter((item) => item.availableStock <= 0 || item.quantity > item.availableStock),
    [items],
  );

  useEffect(() => {
    let active = true;
    setIsLoadingShipping(true);
    shippingService.getMethods().then((methods) => {
      if (!active) return;
      setShippingMethods(methods);
      setSelectedShippingMethodId((current) =>
        methods.some((method) => method.id === current) ? current : methods[0]?.id ?? "",
      );
      setIsLoadingShipping(false);
    }).catch(() => {
      if (!active) return;
      setShippingMethods([]);
      setIsLoadingShipping(false);
      toast({
        title: "Delivery options unavailable",
        description: "Please try again before placing your order.",
        variant: "destructive",
      });
    });

    return () => {
      active = false;
    };
  }, []);

  const selectedShippingMethod = useMemo(
    () => shippingMethods.find((method) => method.id === selectedShippingMethodId),
    [shippingMethods, selectedShippingMethodId],
  );

  const shipping = selectedShippingMethod?.price ?? 0;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + shipping + vat;

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
      toast({ title: "Complete your delivery details", description: "Please correct the highlighted fields before placing the order.", variant: "destructive" });
      return;
    }
    if (!selectedShippingMethod) {
      toast({ title: "Choose a delivery method", description: "Select how you want to receive your order before continuing.", variant: "destructive" });
      return;
    }
    if (unavailableItems.length > 0) {
      toast({ title: "Cart needs attention", description: "One or more product configurations are no longer available.", variant: "destructive" });
      navigate("/cart");
      return;
    }

    setIsProcessing(true);

    try {
      const shippingAddress: ShippingAddress = {
        fullName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        region: form.region,
        city: form.city.trim(),
        area: form.city.trim(),
        addressLine: form.address.trim(),
      };

      const order = await checkoutService.submit({
        customerId: `guest:${(form.email || form.phone).trim().toLowerCase()}`,
        items: items.map((item) => ({
          id: crypto.randomUUID(),
          productId: item.product.id,
          variantId: item.variantId,
          name: item.product.name,
          sku: item.sku,
          image: item.product.image,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
          sellerId: item.product.sellerId,
          sellerName: item.product.sellerName,
          attributes: item.attributes,
        })),
        totals: {
          subtotal,
          discount: 0,
          shipping,
          tax: vat,
          total,
          itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        },
        paymentMethod,
        shippingAddress,
        shippingMethod: selectedShippingMethod,
      });

      clearCart();
      toast({
        title: "Order placed successfully! 🎉",
        description: `${order.order.orderNumber} has been created and inventory reserved.`,
      });
      navigate("/order-success", {
        state: {
          orderId: order.order.id,
          orderNumber: order.order.orderNumber,
          total: order.order.total,
          paymentMethod: order.order.paymentMethod,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Inventory could not be reserved.";
      toast({
        title: "Unable to place order",
        description: message.includes("Insufficient stock")
          ? `${message} Return to your cart to review the affected configuration.`
          : "Your cart was not cleared. Please try again.",
        variant: "destructive",
      });
      if (message.includes("Insufficient stock")) navigate("/cart");
    } finally {
      setIsProcessing(false);
    }
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
                {([['firstName','First Name','given-name','text','John'],['lastName','Last Name','family-name','text','Doe'],['phone','Phone Number','tel','tel','+233 20 123 4567'],['email','Email Address','email','email','john@example.com'],['address','Delivery Address','street-address','text','123 Independence Avenue, Accra']] as const).map(([field,label,autocomplete,type,placeholder], index) => <label key={field} className={cn("block text-sm font-medium", index > 1 && "sm:col-span-2")}>{label}<input required={field !== "email"} type={type} autoComplete={autocomplete} value={form[field]} onChange={(e) => updateField(field, e.target.value)} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : undefined} className={fieldClass(field)} placeholder={placeholder} />{errors[field] && <span id={`${field}-error`} className="mt-1 block text-xs text-destructive">{errors[field]}</span>}</label>)}
                <label className="block text-sm font-medium">Region<select required value={form.region} onChange={(e) => updateField("region", e.target.value)} className={fieldClass("region")}><option>Greater Accra</option><option>Ashanti</option><option>Western</option><option>Eastern</option><option>Central</option><option>Northern</option></select>{errors.region && <span className="mt-1 block text-xs text-destructive">{errors.region}</span>}</label>
                <label className="block text-sm font-medium">City<input required type="text" autoComplete="address-level2" value={form.city} onChange={(e) => updateField("city", e.target.value)} aria-invalid={Boolean(errors.city)} className={fieldClass("city")} placeholder="Accra" />{errors.city && <span className="mt-1 block text-xs text-destructive">{errors.city}</span>}</label>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="delivery-title">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 id="delivery-title" className="text-xl font-display font-bold">Delivery Method</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Choose the option that best suits your order.</p>
                </div>
                <Truck className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              {isLoadingShipping ? (
                <div className="space-y-3" aria-live="polite"><div className="h-20 animate-pulse rounded-xl bg-muted" /><div className="h-20 animate-pulse rounded-xl bg-muted" /></div>
              ) : shippingMethods.length === 0 ? (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive" role="alert">No delivery methods are currently available.</div>
              ) : (
                <div className="space-y-3">
                  {shippingMethods.map((method) => {
                    const selected = selectedShippingMethodId === method.id;
                    const isPickup = method.id === "pickup";
                    return <button key={method.id} type="button" onClick={() => setSelectedShippingMethodId(method.id)} aria-pressed={selected} className={cn("flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all", selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                      <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", selected ? "bg-primary text-primary-foreground" : "bg-muted")}>
                        {isPickup ? <Store className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
                      </div>
                      <div className="min-w-0 flex-1"><p className="font-semibold">{method.name}</p><p className="mt-1 text-sm text-muted-foreground">{method.description}</p><p className="mt-1 text-xs font-medium text-muted-foreground">{method.estimatedDays}</p></div>
                      <div className="text-right"><p className="font-semibold">{method.price === 0 ? "Free" : formatPrice(method.price)}</p>{selected && <Check className="ml-auto mt-1 h-5 w-5 text-primary" aria-hidden="true" />}</div>
                    </button>;
                  })}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card p-6" aria-labelledby="payment-title">
              <h2 id="payment-title" className="mb-6 text-xl font-display font-bold">Payment Method</h2>
              <div className="space-y-4">{[
                { id: "mobile-money", icon: Smartphone, name: "Mobile Money", description: "MTN, Vodafone, AirtelTigo" },
                { id: "bank-transfer", icon: CreditCard, name: "Bank Transfer", description: "Direct bank transfer" },
                { id: "cash-on-delivery", icon: Banknote, name: "Cash on Delivery", description: "Pay when you receive" },
              ].map((method) => <button key={method.id} type="button" onClick={() => setPaymentMethod(method.id as CheckoutPaymentMethod)} aria-pressed={paymentMethod === method.id} className={cn("w-full flex items-center gap-4 rounded-xl border-2 p-4 transition-all", paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}><div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-muted")}><method.icon className="h-6 w-6" /></div><div className="flex-1 text-left"><p className="font-semibold">{method.name}</p><p className="text-sm text-muted-foreground">{method.description}</p></div>{paymentMethod === method.id && <Check className="h-6 w-6 text-primary" />}</button>)}</div>
            </section>
          </div>

          <aside className="lg:col-span-1" aria-label="Order summary"><div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-xl font-display font-bold">Order Summary</h2>
            <div className="mb-6 space-y-4">{items.map((item) => { const unavailable = item.availableStock <= 0 || item.quantity > item.availableStock; const attributeSummary = item.attributes ? Object.entries(item.attributes).map(([name,value]) => `${name}: ${value}`).join(" • ") : ""; return <article key={`${item.product.id}:${item.variantId ?? "base"}`} className={cn("flex gap-3 rounded-lg p-2", unavailable && "bg-destructive/5")}><div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg"><img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" loading="lazy" decoding="async" /></div><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-medium">{item.product.name}</p>{attributeSummary && <p className="mt-1 text-xs text-muted-foreground">{attributeSummary}</p>}<p className="mt-1 text-xs text-muted-foreground">SKU: {item.sku} · Qty: {item.quantity}</p>{unavailable && <p className="mt-1 text-xs font-medium text-destructive">Unavailable</p>}</div><p className="text-sm font-semibold">{formatPrice(item.unitPrice * item.quantity)}</p></article>; })}</div>
            <div className="mb-6 h-px bg-border" /><div className="mb-6 space-y-3"><div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div><div className="flex justify-between text-sm"><span className="text-muted-foreground">VAT</span><span>{formatPrice(vat)}</span></div><div className="h-px bg-border" /><div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div></div>
            <Button type="submit" variant="hero" className="w-full" disabled={isProcessing || unavailableItems.length > 0 || isLoadingShipping || !selectedShippingMethod}>{isProcessing ? <span className="flex items-center gap-2"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />Checking stock...</span> : <><Lock className="mr-2 h-5 w-5" />Place Order</>}</Button>
            <p className="mt-4 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"><Lock className="h-3 w-3" />Secure checkout powered by BredaBuy</p>
          </div></aside>
        </div>
      </main>
    </form>
  </>;
};

export default Checkout;

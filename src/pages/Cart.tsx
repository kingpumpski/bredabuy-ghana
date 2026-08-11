import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, AlertTriangle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { VAT_RATE } from "@/data/mockData";

const STANDARD_SHIPPING_FEE = 25;

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart, totalItems } = useCart();
  const vat = subtotal * VAT_RATE;
  const shipping = STANDARD_SHIPPING_FEE;
  const total = subtotal + vat + shipping;
  const formatPrice = (price: number) => new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", minimumFractionDigits: 2 }).format(price);
  const hasUnavailableItems = items.some((item) => item.availableStock <= 0 || item.quantity > item.availableStock);

  if (items.length === 0) {
    return (
      <>
        <Helmet><title>Shopping Cart - BredaBuy</title></Helmet>
        <main className="container mx-auto px-4 py-16" aria-labelledby="empty-cart-title">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted"><ShoppingBag className="h-12 w-12 text-muted-foreground" aria-hidden="true" /></div>
            <h1 id="empty-cart-title" className="mb-2 text-2xl font-display font-bold text-foreground">Your cart is empty</h1>
            <p className="mb-8 text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
            <Link to="/products"><Button variant="hero">Start Shopping<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Button></Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet><title>{`Shopping Cart (${totalItems}) - BredaBuy`}</title></Helmet>
      <main className="container mx-auto px-4 py-8 md:py-12" aria-labelledby="cart-title">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm font-medium text-primary">BredaBuy Marketplace</p><h1 id="cart-title" className="mt-1 text-3xl font-display font-bold text-foreground md:text-4xl">Shopping Cart</h1><p className="mt-2 text-sm text-muted-foreground">Review each product configuration before checkout.</p></div>
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium" aria-label={`${totalItems} items in cart`}>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
        </div>

        {hasUnavailableItems && <div className="mb-6 flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm" role="alert"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" /><div><p className="font-semibold">Some items are unavailable</p><p className="mt-1 text-muted-foreground">Remove unavailable configurations or reduce their quantities before continuing to checkout.</p></div></div>}

        <div className="grid gap-8 lg:grid-cols-3">
          <section className="space-y-4 lg:col-span-2" aria-label="Cart items">
            {items.map((item) => {
              const itemKey = `${item.product.id}:${item.variantId ?? "base"}`;
              const attributeSummary = item.attributes ? Object.entries(item.attributes).map(([name, value]) => `${name}: ${value}`).join(" • ") : "";
              const unavailable = item.availableStock <= 0 || item.quantity > item.availableStock;
              const limited = !unavailable && item.quantity >= item.availableStock;
              return (
                <article key={itemKey} className={`flex gap-4 rounded-2xl border bg-card p-4 shadow-sm ${unavailable ? "border-destructive/40" : "border-border"}`} aria-label={`${item.product.name}${attributeSummary ? `, ${attributeSummary}` : ""}`}>
                  <Link to={`/product/${item.product.id}`} className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:h-32 md:w-32" aria-label={`View ${item.product.name}`}>
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3"><div className="min-w-0"><Link to={`/product/${item.product.id}`}><h2 className="line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">{item.product.name}</h2></Link><p className="mt-1 text-sm text-muted-foreground">{item.product.brand}</p></div><button type="button" onClick={() => removeFromCart(item.product.id, item.variantId)} className="flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Remove ${item.product.name}${attributeSummary ? `, ${attributeSummary}` : ""} from cart`}><Trash2 className="h-5 w-5" aria-hidden="true" /></button></div>
                    {attributeSummary && <div className="mt-3 rounded-lg bg-muted/60 px-3 py-2"><p className="text-xs font-medium text-foreground">Selected configuration</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{attributeSummary}</p></div>}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1"><p className="text-lg font-bold text-foreground">{formatPrice(item.unitPrice)}</p>{item.sku && <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>}</div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div><div className="flex items-center rounded-lg border border-border" aria-label={`Quantity for ${item.product.name}`}><button type="button" disabled={item.quantity <= 1} onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)} className="flex min-h-10 min-w-10 items-center justify-center rounded-l-lg hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Decrease quantity of ${item.product.name}`}><Minus className="h-4 w-4" aria-hidden="true" /></button><span className="min-w-10 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span><button type="button" disabled={unavailable || item.quantity >= item.availableStock} onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)} className="flex min-h-10 min-w-10 items-center justify-center rounded-r-lg hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={`Increase quantity of ${item.product.name}`}><Plus className="h-4 w-4" aria-hidden="true" /></button></div><p className={`mt-1 text-xs ${unavailable ? "font-medium text-destructive" : "text-muted-foreground"}`}>{unavailable ? `Only ${Math.max(0, item.availableStock)} available` : `${item.availableStock} available`}</p></div><div className="text-right"><p className="text-xs text-muted-foreground">Line total</p><p className="font-bold">{formatPrice(item.unitPrice * item.quantity)}</p></div></div>
                    {limited && <p className="mt-3 text-xs font-medium text-amber-700 dark:text-amber-300" role="status">You have reached the available stock for this configuration.</p>}
                  </div>
                </article>
              );
            })}
            <Button variant="outline" onClick={clearCart} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"><Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />Clear Cart</Button>
          </section>

          <aside className="lg:col-span-1" aria-label="Order summary"><div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-sm"><h2 className="mb-6 text-xl font-display font-bold text-foreground">Order Summary</h2><div className="mb-6 space-y-4"><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Subtotal ({totalItems} items)</span><span className="font-medium">{formatPrice(subtotal)}</span></div><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">Standard delivery</span><span className="font-medium">{formatPrice(shipping)}</span></div><div className="flex justify-between gap-4 text-sm"><span className="text-muted-foreground">VAT</span><span className="font-medium">{formatPrice(vat)}</span></div><div className="h-px bg-border" /><div className="flex justify-between gap-4 text-lg font-bold"><span>Estimated total</span><span className="text-primary">{formatPrice(total)}</span></div></div><p className="mb-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">Final delivery cost is confirmed at checkout. You can choose standard delivery, express delivery, or pickup.</p><Link to="/checkout" aria-disabled={hasUnavailableItems} className={hasUnavailableItems ? "pointer-events-none" : ""}><Button variant="hero" className="w-full" disabled={hasUnavailableItems}>Proceed to Checkout<ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Button></Link><Link to="/products" className="mt-4 block"><Button variant="outline" className="w-full">Continue Shopping</Button></Link><div className="mt-6 border-t border-border pt-6"><p className="mb-3 text-sm text-muted-foreground">Available payment methods:</p><div className="flex flex-wrap gap-2">{["Mobile Money", "Bank Transfer", "Cash on Delivery"].map((method) => <span key={method} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{method}</span>)}</div></div></div></aside>
        </div>
      </main>
    </>
  );
};

export default Cart;

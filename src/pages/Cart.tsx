import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { VAT_RATE } from "@/data/mockData";

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart, totalItems } = useCart();

  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - BredaBuy</title>
        </Helmet>
        <Layout>
          <div className="container mx-auto px-4 py-16">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="mb-2 text-2xl font-display font-bold text-foreground">
                Your cart is empty
              </h1>
              <p className="mb-8 text-muted-foreground">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link to="/products">
                <Button variant="hero">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${totalItems}) - BredaBuy`}</title>
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="mb-8 text-3xl font-display font-bold text-foreground md:text-4xl">
            Shopping Cart
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => {
                const itemKey = `${item.product.id}:${item.variantId ?? "base"}`;
                const attributeSummary = item.attributes
                  ? Object.entries(item.attributes)
                      .map(([name, value]) => `${name}: ${value}`)
                      .join(" • ")
                  : "";

                return (
                  <div
                    key={itemKey}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-4 animate-fade-in"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-32"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.product.brand}
                      </p>
                      {attributeSummary && (
                        <p className="mt-2 rounded-md bg-muted/50 px-2 py-1 text-xs text-muted-foreground">
                          {attributeSummary}
                        </p>
                      )}
                      <p className="mt-2 text-lg font-bold text-foreground">
                        {formatPrice(item.unitPrice)}
                      </p>
                      {item.sku && (
                        <p className="mt-1 text-xs text-muted-foreground">SKU: {item.sku}</p>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            type="button"
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1, item.variantId)
                            }
                            className="flex h-8 w-8 items-center justify-center hover:bg-muted disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            disabled={item.quantity >= item.availableStock}
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1, item.variantId)
                            }
                            className="flex h-8 w-8 items-center justify-center hover:bg-muted disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="rounded-lg p-2 text-destructive transition-colors hover:bg-destructive/10"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Button
                variant="outline"
                onClick={clearCart}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-6 text-xl font-display font-bold text-foreground">
                  Order Summary
                </h2>

                <div className="mb-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-secondary">
                      {subtotal >= 500 ? "Free" : formatPrice(50)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (12.5%)</span>
                    <span className="font-medium">{formatPrice(vat)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <p className="mb-4 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
                    Add {formatPrice(500 - subtotal)} more for free shipping!
                  </p>
                )}

                <Link to="/checkout">
                  <Button variant="hero" className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/products" className="mt-4 block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="mb-3 text-sm text-muted-foreground">We accept:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Mobile Money", "Bank Transfer", "COD"].map((method) => (
                      <span key={method} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;

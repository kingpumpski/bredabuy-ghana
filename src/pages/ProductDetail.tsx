import {
useProduct,
} from "../hooks/useProducts";
import type { Product } from "../types/product.types";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { products, calculateTotalWithVAT, VAT_RATE } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "reviews">("description");
  const { addToCart } = useCart();

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const subtotal = product.price * quantity;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  // const handleAddToCart = () => {
  //   for (let i = 0; i < quantity; i++) {
  //     addToCart(product);
  //   }
  // };

  // const handleAddToCart = () => {
  //   addToCart(product);
  // };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} - BredaBuy</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Layout>
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <Link to="/products" className="text-muted-foreground hover:text-primary">
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted animate-fade-in">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <span className="absolute top-4 left-4 px-4 py-2 bg-accent text-accent-foreground font-bold rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
              <button className="absolute top-4 right-4 w-12 h-12 bg-card rounded-full shadow-medium flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="animate-slide-up">
              {/* Brand & Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {product.brand}
                </span>
                <span className="text-muted-foreground text-sm">
                  ID: {product.id}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-foreground font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="bg-muted/50 rounded-2xl p-6 mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-display font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  VAT ({VAT_RATE * 100}%): {formatPrice(product.price * VAT_RATE)} •
                  Total with VAT: {formatPrice(calculateTotalWithVAT(product.price))}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>

              {/* Order Summary */}
              <div className="bg-card border border-border rounded-2xl p-6 mb-8">
                <h3 className="font-display font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({quantity} items)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VAT (12.5%)</span>
                    <span className="font-medium">{formatPrice(vat)}</span>
                  </div>
                  <div className="h-px bg-border my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, text: "Fast Delivery" },
                  { icon: Shield, text: "Secure Payment" },
                  { icon: RotateCcw, text: "7-Day Returns" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-2 p-4 bg-muted/50 rounded-xl text-center"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="text-xs font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <div className="border-b border-border mb-8">
              <div className="flex gap-8">
                {[
                  { id: "description", label: "Description" },
                  { id: "reviews", label: `Reviews (${product.reviewCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as "description" | "reviews")}
                    className={cn(
                      "pb-4 font-medium transition-colors relative",
                      selectedTab === tab.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                    {selectedTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedTab === "description" && (
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <h3 className="text-xl font-display font-semibold mt-8 mb-4">
                  Product Features
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Premium quality materials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Authentic Ghanaian product
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    Manufacturer warranty included
                  </li>
                </ul>
              </div>
            )}

            {selectedTab === "reviews" && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Reviews coming soon! Be the first to review this product.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;

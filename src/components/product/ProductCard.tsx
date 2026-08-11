import React, { memo, useCallback } from "react";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import type { Product } from "@/features/products/types/product.types";

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

const priceFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 0,
});

const getProductPath = (product: Product) =>
  `/products/${product.slug || product.id}`;

const AddToCartButton = memo(function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <Button
      className="w-full"
      disabled={product.stock <= 0}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
});

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0]?.url;
  const imageAlt = product.images?.[0]?.alt || product.name;
  const productPath = getProductPath(product);
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
        )
      : 0;

  return (
    <article className="group card-product border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <Link to={productPath} aria-label={`View ${product.name}`}>
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
              No image
            </div>
          )}
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">
              NEW
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            type="button"
            aria-label="Wishlist"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Heart className="h-4 w-4" />
          </button>
          <Link
            to={productPath}
            aria-label={`Quick view ${product.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-soft transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.categoryName}
        </p>

        <Link to={productPath}>
          <h3 className="mb-2 line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating?.average ?? 0}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">
            {priceFormatter.format(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {priceFormatter.format(product.compareAtPrice)}
            </span>
          )}
        </div>

        <div className="mt-2">
          <span
            className={cn(
              "text-xs font-medium",
              product.stock > 0 ? "text-secondary" : "text-destructive"
            )}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  showDiscount?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showDiscount }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group card-product bg-card border border-border">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="px-2.5 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-9 h-9 bg-card rounded-full shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 bg-card rounded-full shadow-soft flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button
            variant="cart"
            className="w-full"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          <span
            className={cn(
              "text-xs font-medium",
              product.inStock ? "text-secondary" : "text-destructive"
            )}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

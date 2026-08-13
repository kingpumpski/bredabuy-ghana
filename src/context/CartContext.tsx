import React, { createContext, useCallback, useContext, useMemo } from "react";

import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/features/cart/store/cart.store";
import { cartService } from "@/features/cart/services/cart.service";
import type { CartItem as MarketplaceCartItem } from "@/features/cart/types/cart.types";
import type { Product as MarketplaceProduct, ProductVariant } from "@/features/products/types/product.types";
import type { CartItem as LegacyCartItem, Product as LegacyProduct } from "@/types";

export type CartProductInput = MarketplaceProduct | LegacyProduct;

export interface LegacyCartItemWithVariant extends LegacyCartItem {
  variantId?: string;
  attributes?: Record<string, string>;
  sku: string;
  unitPrice: number;
  availableStock: number;
}

interface CartContextType {
  items: LegacyCartItemWithVariant[];
  addToCart: (
    product: CartProductInput,
    quantity?: number,
    variant?: ProductVariant,
  ) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function isMarketplaceProduct(product: CartProductInput): product is MarketplaceProduct {
  return "images" in product;
}

function toMarketplaceCartItem(
  product: CartProductInput,
  quantity: number,
  variant?: ProductVariant,
): MarketplaceCartItem {
  if (isMarketplaceProduct(product)) {
    const image = variant?.image ?? product.images[0]?.url;
    const unitPrice = variant?.price ?? product.price;
    const availableStock = variant?.stock ?? product.stock;

    return {
      id: `${product.id}:${variant?.id ?? "base"}`,
      productId: product.id,
      variantId: variant?.id,
      name: product.name,
      sku: variant?.sku ?? product.sku,
      image,
      unitPrice,
      compareAtPrice: variant?.compareAtPrice ?? product.compareAtPrice,
      quantity,
      availableStock,
      sellerId: product.sellerId,
      sellerName: product.sellerName,
      attributes: variant?.attributes,
    };
  }

  return {
    id: `${product.id}:base`,
    productId: product.id,
    name: product.name,
    sku: product.id,
    image: product.image,
    unitPrice: product.price,
    compareAtPrice: product.originalPrice,
    quantity,
    availableStock: product.inStock ? Number.MAX_SAFE_INTEGER : 0,
  };
}

function toLegacyCartItem(item: MarketplaceCartItem): LegacyCartItemWithVariant {
  return {
    product: {
      id: item.productId,
      name: item.name,
      description: "",
      price: item.unitPrice,
      originalPrice: item.compareAtPrice,
      image: item.image ?? "/placeholder.svg",
      category: "",
      brand: item.sellerName ?? "",
      rating: 0,
      reviewCount: 0,
      inStock: item.availableStock > 0,
    },
    quantity: item.quantity,
    variantId: item.variantId,
    attributes: item.attributes,
    sku: item.sku,
    unitPrice: item.unitPrice,
    availableStock: item.availableStock,
  };
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateStoreQuantity = useCartStore((state) => state.updateQuantity);
  const clearStore = useCartStore((state) => state.clearCart);

  const items = useMemo(() => storeItems.map(toLegacyCartItem), [storeItems]);
  const totals = useMemo(() => cartService.getTotals(storeItems), [storeItems]);

  const addToCart = useCallback(
    (product: CartProductInput, quantity = 1, variant?: ProductVariant) => {
      const item = toMarketplaceCartItem(product, quantity, variant);
      const validation = cartService.validateItems([item]);

      if (!validation.valid) {
        toast({
          title: "Unable to add to cart",
          description: validation.message,
          variant: "destructive",
        });
        return;
      }

      addItem(item, quantity);
      toast({
        title: "Added to Cart",
        description: variant
          ? `${product.name} — ${Object.values(variant.attributes ?? {}).join(" / ")}`
          : `${product.name} has been added to your cart`,
      });
    },
    [addItem],
  );

  const removeFromCart = useCallback(
    (productId: string, variantId?: string) => {
      removeItem(productId, variantId);
    },
    [removeItem],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      updateStoreQuantity(productId, quantity, variantId);
    },
    [updateStoreQuantity],
  );

  const clearCart = useCallback(() => {
    clearStore();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  }, [clearStore]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems: totals.itemCount,
        subtotal: totals.subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

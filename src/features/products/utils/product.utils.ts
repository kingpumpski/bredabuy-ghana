import type { Product } from "../types/product.types";

export function getProductUrl(product: Product): string {
  return `/products/${product.slug || product.id}`;
}

export function getProductDiscountPercentage(
  product: Product,
): number {
  if (
    !product.compareAtPrice ||
    product.compareAtPrice <= product.price
  ) {
    return 0;
  }

  return Math.round(
    ((product.compareAtPrice - product.price) /
      product.compareAtPrice) *
      100,
  );
}

export function isProductAvailable(
  product: Product,
): boolean {
  return product.stock > 0;
}

export function getProductStockStatus(
  product: Product,
): "in-stock" | "low-stock" | "out-of-stock" {
  if (product.stock <= 0) {
    return "out-of-stock";
  }

  if (product.stock <= 5) {
    return "low-stock";
  }

  return "in-stock";
}

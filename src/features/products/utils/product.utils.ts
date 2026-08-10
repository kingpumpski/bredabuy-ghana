import type { Product, ProductVariant } from "../types/product.types";

export function getProductPrice(
  product: Product,
  variant?: ProductVariant,
): number {
  return variant?.price ?? product.price;
}

export function getProductComparePrice(
  product: Product,
  variant?: ProductVariant,
): number | undefined {
  return variant?.compareAtPrice ?? product.compareAtPrice;
}

export function getProductDiscountPercentage(
  product: Product,
  variant?: ProductVariant,
): number {
  const price = getProductPrice(product, variant);
  const comparePrice = getProductComparePrice(product, variant);

  if (!comparePrice || comparePrice <= price) {
    return 0;
  }

  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function isProductInStock(
  product: Product,
  variant?: ProductVariant,
): boolean {
  return (variant?.stock ?? product.stock) > 0;
}

export function getProductPrimaryImage(
  product: Product,
): string | undefined {
  return [...product.images]
    .sort((a, b) => a.position - b.position)[0]?.url;
}

export function formatProductPrice(
  amount: number,
  currency: string = "GHS",
): string {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

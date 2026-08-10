import type { Product } from "../types/product.types";

export function formatProductPrice(
  product: Product
): string {
  return new Intl.NumberFormat(
    "en-GH",
    {
      style: "currency",
      currency: product.currency,
      minimumFractionDigits: 2,
    }
  ).format(product.price);
}

export function getProductDiscountPercentage(
  product: Product
): number {
  if (
    !product.compareAtPrice ||
    product.compareAtPrice <=
      product.price
  ) {
    return 0;
  }

  return Math.round(
    ((product.compareAtPrice -
      product.price) /
      product.compareAtPrice) *
      100
  );
}

export function isProductAvailable(
  product: Product
): boolean {
  return product.stock > 0;
}

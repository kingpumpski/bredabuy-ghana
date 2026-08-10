import type {
  CartItem,
  CartTotals,
} from "../types/cart.types";

export function calculateCartTotals(
  items: CartItem[],
  shipping = 0,
  taxRate = 0,
  discount = 0,
): CartTotals {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.unitPrice * item.quantity,
    0,
  );

  const taxableAmount = Math.max(
    subtotal - discount,
    0,
  );

  const tax = taxableAmount * taxRate;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total:
      taxableAmount +
      shipping +
      tax,
    itemCount: items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    ),
  };
}

export function getCartItemKey(
  productId: string,
  variantId?: string,
): string {
  return variantId
    ? `${productId}:${variantId}`
    : productId;
}

export function canAddQuantity(
  item: CartItem,
  quantity: number,
): boolean {
  return (
    quantity > 0 &&
    quantity <= item.availableStock
  );
}

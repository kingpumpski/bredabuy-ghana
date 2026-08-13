import type { CartItem, CartTotals } from "../types/cart.types";

export const cartService = {
  getTotals(items: CartItem[], shipping = 0, tax = 0, discount = 0): CartTotals {
    const subtotal = items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    );

    return {
      subtotal,
      discount: Math.max(0, discount),
      shipping: Math.max(0, shipping),
      tax: Math.max(0, tax),
      total: Math.max(0, subtotal - Math.max(0, discount) + Math.max(0, shipping) + Math.max(0, tax)),
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
    };
  },

  validateItems(items: CartItem[]): { valid: boolean; message?: string } {
    if (items.length === 0) {
      return { valid: false, message: "Your cart is empty." };
    }

    for (const item of items) {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return { valid: false, message: `${item.name} has an invalid quantity.` };
      }

      if (item.availableStock < item.quantity) {
        return {
          valid: false,
          message: `${item.name} has only ${Math.max(0, item.availableStock)} available.`,
        };
      }
    }

    return { valid: true };
  },
};

export default cartService;

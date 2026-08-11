import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "../types/cart.types";
import { getCartItemKey } from "../utils/cart.utils";

interface CartStore {
  items: CartItem[];
  couponCode?: string;
  addItem: (item: CartItem, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  setCouponCode: (couponCode?: string) => void;
}

const normalizeQuantity = (quantity: number, availableStock: number) => {
  if (!Number.isFinite(quantity) || availableStock <= 0) return 0;
  return Math.max(1, Math.min(Math.floor(quantity), availableStock));
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, quantity = 1) =>
        set((state) => {
          const key = getCartItemKey(item.productId, item.variantId);
          const stock = Math.max(0, item.availableStock);
          const requested = normalizeQuantity(quantity, stock);
          if (requested === 0) return state;

          const existingIndex = state.items.findIndex(
            (current) => getCartItemKey(current.productId, current.variantId) === key,
          );

          if (existingIndex === -1) {
            return {
              items: [...state.items, { ...item, quantity: requested }],
            };
          }

          const items = [...state.items];
          const existing = items[existingIndex];
          const existingStock = Math.max(0, existing.availableStock);
          const nextQuantity = normalizeQuantity(
            existing.quantity + requested,
            existingStock,
          );

          if (nextQuantity === 0) {
            items.splice(existingIndex, 1);
            return { items };
          }

          items[existingIndex] = {
            ...existing,
            availableStock: stock || existing.availableStock,
            quantity: nextQuantity,
          };
          return { items };
        }),

      updateQuantity: (productId, quantity, variantId) =>
        set((state) => {
          const key = getCartItemKey(productId, variantId);
          return {
            items: state.items.flatMap((item) => {
              if (getCartItemKey(item.productId, item.variantId) !== key) return [item];
              const nextQuantity = normalizeQuantity(quantity, item.availableStock);
              return nextQuantity > 0 ? [{ ...item, quantity: nextQuantity }] : [];
            }),
          };
        }),

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              getCartItemKey(item.productId, item.variantId) !==
              getCartItemKey(productId, variantId),
          ),
        })),

      clearCart: () => set({ items: [], couponCode: undefined }),
      setCouponCode: (couponCode) => set({ couponCode }),
    }),
    { name: "bredabuy-cart" },
  ),
);

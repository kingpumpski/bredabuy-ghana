import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "../types/cart.types";
import {
  getCartItemKey,
} from "../utils/cart.utils";

interface CartStore {
  items: CartItem[];
  couponCode?: string;

  addItem: (
    item: CartItem,
    quantity?: number,
  ) => void;

  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void;

  removeItem: (
    productId: string,
    variantId?: string,
  ) => void;

  clearCart: () => void;

  setCouponCode: (
    couponCode?: string,
  ) => void;
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({
        items: [],

        addItem: (item, quantity = 1) =>
          set((state) => {
            const key = getCartItemKey(
              item.productId,
              item.variantId,
            );

            const existingIndex =
              state.items.findIndex(
                (current) =>
                  getCartItemKey(
                    current.productId,
                    current.variantId,
                  ) === key,
              );

            if (existingIndex === -1) {
              return {
                items: [
                  ...state.items,
                  {
                    ...item,
                    quantity: Math.min(
                      quantity,
                      item.availableStock,
                    ),
                  },
                ],
              };
            }

            const items = [...state.items];
            const existing =
              items[existingIndex];

            items[existingIndex] = {
              ...existing,
              quantity: Math.min(
                existing.quantity + quantity,
                existing.availableStock,
              ),
            };

            return { items };
          }),

        updateQuantity: (
          productId,
          quantity,
          variantId,
        ) =>
          set((state) => {
            if (quantity <= 0) {
              return {
                items: state.items.filter(
                  (item) =>
                    getCartItemKey(
                      item.productId,
                      item.variantId,
                    ) !==
                    getCartItemKey(
                      productId,
                      variantId,
                    ),
                ),
              };
            }

            return {
              items: state.items.map((item) => {
                if (
                  getCartItemKey(
                    item.productId,
                    item.variantId,
                  ) !==
                  getCartItemKey(
                    productId,
                    variantId,
                  )
                ) {
                  return item;
                }

                return {
                  ...item,
                  quantity: Math.min(
                    quantity,
                    item.availableStock,
                  ),
                };
              }),
            };
          }),

        removeItem: (
          productId,
          variantId,
        ) =>
          set((state) => ({
            items: state.items.filter(
              (item) =>
                getCartItemKey(
                  item.productId,
                  item.variantId,
                ) !==
                getCartItemKey(
                  productId,
                  variantId,
                ),
            ),
          })),

        clearCart: () =>
          set({
            items: [],
            couponCode: undefined,
          }),

        setCouponCode: (couponCode) =>
          set({ couponCode }),
      }),
      {
        name: "bredabuy-cart",
      },
    ),
  );

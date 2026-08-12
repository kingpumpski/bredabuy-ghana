import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * @deprecated Legacy cart store retained only for compatibility with older imports.
 * New application code must use `@/features/cart/store/cart.store`.
 *
 * Its storage key is intentionally isolated from the canonical cart store so the
 * two schemas cannot overwrite or hydrate each other's persisted state.
 */
export interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existing = get().items.find((product) => product.id === item.id);

        if (existing) {
          set({
            items: get().items.map((product) =>
              product.id === item.id
                ? { ...product, quantity: product.quantity + item.quantity }
                : product,
            ),
          });
          return;
        }

        set({ items: [...get().items, item] });
      },

      removeItem: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),

      updateQuantity: (id, quantity) =>
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    { name: "bredabuy-cart-legacy" },
  ),
);

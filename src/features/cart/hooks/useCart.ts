import { useMemo } from "react";

import {
  calculateCartTotals,
} from "../utils/cart.utils";
import { useCartStore } from "../store/cart.store";

export function useCart() {
  const items = useCartStore(
    (state) => state.items,
  );

  const couponCode = useCartStore(
    (state) => state.couponCode,
  );

  const addItem = useCartStore(
    (state) => state.addItem,
  );

  const updateQuantity = useCartStore(
    (state) => state.updateQuantity,
  );

  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const setCouponCode = useCartStore(
    (state) => state.setCouponCode,
  );

  const totals = useMemo(
    () =>
      calculateCartTotals(
        items,
        0,
        0,
        0,
      ),
    [items],
  );

  return {
    items,
    couponCode,
    totals,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    setCouponCode,
    isEmpty: items.length === 0,
  };
}

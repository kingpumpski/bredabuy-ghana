import type { CartTotals } from "@/features/cart/types/cart.types";
import type { PaymentMethod } from "@/features/payments/types/payment.types";
import type { CreateOrderPayload } from "@/features/orders/types/order.types";
import type { ShippingAddress } from "@/features/shipping/types/shipping.types";

import orderService from "@/features/orders/services/order.service";

export interface CheckoutPayload {
  customerId: string;
  items: CreateOrderPayload["items"];
  totals: CartTotals;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
}

export const checkoutService = {
  async submit(
    payload: CheckoutPayload,
  ) {
    return orderService.createOrder({
      customerId:
        payload.customerId,
      items: payload.items,
      subtotal:
        payload.totals.subtotal,
      discount:
        payload.totals.discount,
      shipping:
        payload.totals.shipping,
      tax:
        payload.totals.tax,
      total:
        payload.totals.total,
      paymentMethod:
        payload.paymentMethod,
      shippingAddress:
        payload.shippingAddress,
    });
  },
};

export default checkoutService;

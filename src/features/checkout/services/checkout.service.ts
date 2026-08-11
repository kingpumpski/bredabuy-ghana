import type { CartTotals } from "@/features/cart/types/cart.types";
import type { PaymentMethod } from "@/features/payments/types/payment.types";
import type { CreateOrderPayload } from "@/features/orders/types/order.types";
import type { ShippingAddress } from "@/features/shipping/types/shipping.types";
import inventoryService from "@/features/inventory/services/inventory.service";
import orderService from "@/features/orders/services/order.service";

export interface CheckoutPayload {
  customerId: string;
  items: CreateOrderPayload["items"];
  totals: CartTotals;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
}

export interface CheckoutResult {
  order: ReturnType<typeof orderService.create>;
  reservationId: string;
}

export const checkoutService = {
  submit(payload: CheckoutPayload): CheckoutResult {
    const order = orderService.create({
      customerId: payload.customerId,
      items: payload.items,
      subtotal: payload.totals.subtotal,
      discount: payload.totals.discount,
      shipping: payload.totals.shipping,
      tax: payload.totals.tax,
      total: payload.totals.total,
      paymentMethod: payload.paymentMethod,
      shippingAddress: payload.shippingAddress,
    });

    try {
      const reservation = inventoryService.reserve(
        order.id,
        payload.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          sku: item.sku,
          quantity: item.quantity,
        })),
      );

      return { order, reservationId: reservation.id };
    } catch (error) {
      orderService.cancel(order.id);
      throw error;
    }
  },
};

export default checkoutService;

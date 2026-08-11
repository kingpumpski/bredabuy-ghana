import type { CartTotals } from "@/features/cart/types/cart.types";
import type { PaymentMethod } from "@/features/payments/types/payment.types";
import type { CreateOrderPayload } from "@/features/orders/types/order.types";
import type { ShippingAddress } from "@/features/shipping/types/shipping.types";
import inventoryService from "@/features/inventory/services/inventory.service";
import orderService from "@/features/orders/services/order.service";
import sellerOrderService from "@/features/orders/services/seller-order.service";

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
  sellerOrders: ReturnType<typeof sellerOrderService.createFromOrder>;
}

export const checkoutService = {
  async submit(payload: CheckoutPayload): Promise<CheckoutResult> {
    const reservationItems = payload.items.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      sku: item.sku,
      quantity: item.quantity,
    }));

    // Reserve stock before creating the order. This prevents a checkout from
    // succeeding for a variant that has become unavailable since it was added
    // to the cart. The production API should perform this atomically in a DB
    // transaction with row-level locking.
    const reservationPreview = await inventoryService.ensureRecords(reservationItems);
    for (const item of reservationItems) {
      const record = reservationPreview.find(
        (entry) =>
          entry.productId === item.productId &&
          entry.variantId === item.variantId,
      );
      if (!record || record.available < item.quantity) {
        throw new Error(`Insufficient stock for ${item.sku}. Available: ${record?.available ?? 0}.`);
      }
    }

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
      const reservation = await inventoryService.reserve(order.id, reservationItems);
      const sellerOrders = sellerOrderService.createFromOrder(order);
      return { order, reservationId: reservation.id, sellerOrders };
    } catch (error) {
      orderService.cancel(order.id);
      throw error;
    }
  },
};

export default checkoutService;

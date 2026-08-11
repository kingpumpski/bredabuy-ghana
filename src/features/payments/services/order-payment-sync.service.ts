import orderService from "@/features/orders/services/order.service";
import paymentTransactionService from "./payment-transaction.service";
import type { PaymentStatus } from "../types/payment.types";

const mapPaymentStatus = (status: PaymentStatus) => status === "successful" ? "paid" : status === "failed" || status === "cancelled" ? "failed" : "pending";

export const orderPaymentSyncService = {
  sync(orderId: string, paymentReference: string) {
    const order = orderService.getById(orderId);
    const transaction = paymentTransactionService.findByReference(paymentReference);
    if (!order || !transaction || transaction.orderId !== orderId) return null;
    const paymentStatus = mapPaymentStatus(transaction.status as PaymentStatus);
    if (paymentStatus === "paid") {
      const updated = orderService.updatePaymentStatus(orderId, "successful");
      if (updated && updated.status === "pending") orderService.updateStatus(orderId, "confirmed", "Payment confirmed");
      return orderService.getById(orderId);
    }
    if (paymentStatus === "failed") {
      return orderService.updatePaymentStatus(orderId, "failed");
    }
    return order;
  },
};

export default orderPaymentSyncService;

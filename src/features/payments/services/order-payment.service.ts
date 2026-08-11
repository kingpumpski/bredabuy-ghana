import orderService from "@/features/orders/services/order.service";
import type { PaymentStatus } from "../types/payment.types";
import paymentService from "./payment.service";

const PAYMENT_ORDER_STATUS: PaymentStatus[] = [
  "successful",
  "failed",
  "cancelled",
  "refunded",
];

export const orderPaymentService = {
  async syncPaymentToOrder(paymentId: string) {
    const payment = paymentService.getPayment(paymentId);
    if (!payment || !PAYMENT_ORDER_STATUS.includes(payment.status)) return null;

    return orderService.updatePaymentStatus(
      payment.orderId,
      payment.status,
      `BredaPay status synchronized: ${payment.status}`,
    );
  },

  async confirmAndSync(paymentId: string, reference?: string) {
    const payment = await paymentService.confirmPayment(paymentId, reference);
    if (!payment) return null;
    return this.syncPaymentToOrder(payment.id);
  },

  async failAndSync(paymentId: string, note?: string) {
    const payment = await paymentService.failPayment(paymentId, note);
    if (!payment) return null;
    return this.syncPaymentToOrder(payment.id);
  },

  async cancelAndSync(paymentId: string) {
    const payment = await paymentService.cancelPayment(paymentId);
    if (!payment) return null;
    return this.syncPaymentToOrder(payment.id);
  },

  async refundAndSync(paymentId: string) {
    const payment = await paymentService.refundPayment(paymentId);
    if (!payment) return null;
    return this.syncPaymentToOrder(payment.id);
  },
};

export default orderPaymentService;

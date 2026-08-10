import type {
  CreatePaymentPayload,
  PaymentIntent,
} from "../types/payment.types";

const now = () =>
  new Date().toISOString();

export const paymentService = {
  async createPayment(
    payload: CreatePaymentPayload,
  ): Promise<PaymentIntent> {
    return {
      id: crypto.randomUUID(),
      orderId: payload.orderId,
      amount: payload.amount,
      currency: "GHS",
      method: payload.method,
      provider: payload.provider,
      status: "pending",
      createdAt: now(),
      updatedAt: now(),
    };
  },

  async verifyPayment(
    paymentId: string,
  ): Promise<PaymentIntent> {
    return {
      id: paymentId,
      orderId: "",
      amount: 0,
      currency: "GHS",
      method: "mobile-money",
      provider: "momo",
      status: "pending",
      createdAt: now(),
      updatedAt: now(),
    };
  },
};

export default paymentService;

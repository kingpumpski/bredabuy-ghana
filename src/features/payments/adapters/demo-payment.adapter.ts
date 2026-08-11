import type { PaymentAdapter, PaymentAdapterRequest, PaymentAdapterResponse } from "../types/payment-adapter.types";

export const demoPaymentAdapter: PaymentAdapter = {
  name: "development",
  async collect(request: PaymentAdapterRequest): Promise<PaymentAdapterResponse> {
    return { reference: request.reference, status: "pending", message: "Development adapter: awaiting simulated confirmation." };
  },
  async verify(reference: string): Promise<PaymentAdapterResponse> {
    return { reference, status: "pending", message: "Development adapter does not move real funds." };
  },
  async refund(reference: string, amount?: number): Promise<PaymentAdapterResponse> {
    return { reference, status: "pending", message: `Development refund queued${amount ? ` for GHS ${amount.toFixed(2)}` : ""}.` };
  },
};

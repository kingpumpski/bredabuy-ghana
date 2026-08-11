import paymentTransactionService from "@/features/payments/services/payment-transaction.service";
import type { PaymentStatus } from "@/features/payments/types/payment.types";

export type CheckoutPaymentState = "unpaid" | "pending" | "paid" | "failed";

const stateFromPayment = (status: PaymentStatus): CheckoutPaymentState => {
  if (status === "successful") return "paid";
  if (status === "failed" || status === "cancelled" || status === "refunded") return "failed";
  return status === "processing" || status === "pending" ? "pending" : "unpaid";
};

export const checkoutPaymentStateService = {
  get(reference: string): CheckoutPaymentState {
    const transaction = paymentTransactionService.findByReference(reference);
    return transaction ? stateFromPayment(transaction.status as PaymentStatus) : "unpaid";
  },
  canFinalizeOrder(reference: string) {
    return this.get(reference) === "paid";
  },
  canRetry(reference: string) {
    const state = this.get(reference);
    return state === "failed" || state === "unpaid";
  },
  isAwaitingProvider(reference: string) {
    return this.get(reference) === "pending";
  },
};

export default checkoutPaymentStateService;

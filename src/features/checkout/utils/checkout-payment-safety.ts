import type { PaymentMethod } from "@/features/payments/types/payment.types";

export type CheckoutPaymentChoice = PaymentMethod | "wallet";

export const getPaymentActionLabel = (method: CheckoutPaymentChoice) => {
  switch (method) {
    case "wallet": return "Pay with BredaBuy Wallet";
    case "mobile-money": return "Continue to Mobile Money";
    case "card": return "Continue to Card Payment";
    case "bank-transfer": return "Continue to Bank Transfer";
    case "cash-on-delivery": return "Place Order";
  }
};

export const isPaymentMethodReady = (method: CheckoutPaymentChoice, walletBalance: number | null, total: number) =>
  method !== "wallet" || (walletBalance !== null && walletBalance >= total);

export const paymentNeedsConfirmation = (method: CheckoutPaymentChoice) => method !== "wallet" && method !== "cash-on-delivery";

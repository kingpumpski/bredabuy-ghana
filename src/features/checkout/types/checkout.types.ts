import type { CartTotals } from "@/features/cart/types/cart.types";
import type { PaymentMethod } from "@/features/payments/types/payment.types";
import type { ShippingAddress, ShippingMethod } from "@/features/shipping/types/shipping.types";

export interface CheckoutState {
  shippingAddress?: ShippingAddress;
  shippingMethod?: ShippingMethod;
  paymentMethod?: PaymentMethod;
  totals?: CartTotals;
}

export interface CheckoutValidation {
  valid: boolean;
  errors: Record<string, string>;
}

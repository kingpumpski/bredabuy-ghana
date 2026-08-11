export type CorePaymentMethod = "mobile-money" | "card" | "bank-transfer" | "cash-on-delivery";
export type CorePaymentProvider = "momo" | "card-network" | "bank" | "internal";
export type CorePaymentStatus = "pending" | "processing" | "successful" | "failed" | "cancelled" | "refunded";

export interface CorePaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  fee: number;
  total: number;
  currency: "GHS";
  method: CorePaymentMethod;
  provider: CorePaymentProvider;
  status: CorePaymentStatus;
  reference: string;
  idempotencyKey: string;
  customerEmail?: string;
  customerPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCorePaymentPayload {
  orderId: string;
  amount: number;
  method: CorePaymentMethod;
  provider?: CorePaymentProvider;
  phoneNumber?: string;
  email?: string;
  idempotencyKey?: string;
}

import type { PaymentMethod } from "./payment.types";

export type PaymentOperation = "collect" | "verify" | "refund";
export type PaymentAdapterStatus = "pending" | "successful" | "failed" | "cancelled";

export interface PaymentAdapterRequest {
  reference: string;
  amount: number;
  currency: "GHS";
  method: PaymentMethod;
  customerId?: string;
  customerEmail?: string;
  customerPhone?: string;
  metadata?: Record<string, string>;
}

export interface PaymentAdapterResponse {
  reference: string;
  status: PaymentAdapterStatus;
  providerReference?: string;
  message?: string;
  raw?: unknown;
}

export interface PaymentAdapter {
  readonly name: string;
  collect(request: PaymentAdapterRequest): Promise<PaymentAdapterResponse>;
  verify(reference: string): Promise<PaymentAdapterResponse>;
  refund(reference: string, amount?: number): Promise<PaymentAdapterResponse>;
}

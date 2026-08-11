export type PaymentMethod =
  | "mobile-money"
  | "card"
  | "bank-transfer"
  | "cash-on-delivery";

export type PaymentProvider =
  | "paystack"
  | "flutterwave"
  | "momo"
  | "internal";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "successful"
  | "failed"
  | "cancelled"
  | "refunded";

export type PaymentEventType =
  | "created"
  | "processing"
  | "successful"
  | "failed"
  | "cancelled"
  | "refunded";

export interface PaymentEvent {
  id: string;
  paymentId: string;
  type: PaymentEventType;
  status: PaymentStatus;
  timestamp: string;
  reference?: string;
  note?: string;
}

export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  currency: "GHS";
  method: PaymentMethod;
  provider: PaymentProvider;
  status: PaymentStatus;
  reference?: string;
  events?: PaymentEvent[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePaymentPayload {
  orderId: string;
  amount: number;
  method: PaymentMethod;
  provider: PaymentProvider;
  phoneNumber?: string;
  email?: string;
}

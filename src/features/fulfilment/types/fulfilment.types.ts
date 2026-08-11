import type { OrderItem, OrderStatus } from "@/features/orders/types/order.types";

export type FulfilmentStatus =
  | "awaiting-payment"
  | "awaiting-confirmation"
  | "picking"
  | "packed"
  | "ready-for-dispatch"
  | "dispatched"
  | "completed"
  | "cancelled";

export interface FulfilmentItem {
  orderItemId: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  quantity: number;
  sellerId?: string;
  attributes?: Record<string, string>;
}

export interface FulfilmentRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  sellerId?: string;
  items: FulfilmentItem[];
  status: FulfilmentStatus;
  paymentRequired: boolean;
  paymentConfirmed: boolean;
  pickedAt?: string;
  packedAt?: string;
  readyAt?: string;
  dispatchedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FulfilmentSummary {
  total: number;
  awaitingPayment: number;
  awaitingConfirmation: number;
  picking: number;
  packed: number;
  readyForDispatch: number;
  dispatched: number;
  completed: number;
}

export const FULFILMENT_STATUS_FROM_ORDER: Partial<Record<OrderStatus, FulfilmentStatus>> = {
  pending: "awaiting-payment",
  confirmed: "awaiting-confirmation",
  processing: "picking",
  "ready-for-dispatch": "ready-for-dispatch",
  shipped: "dispatched",
  delivered: "completed",
  cancelled: "cancelled",
};

export type { OrderItem };

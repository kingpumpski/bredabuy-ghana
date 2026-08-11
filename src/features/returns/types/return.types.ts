import type { OrderItem } from "@/features/orders/types/order.types";

export type ReturnReason =
  | "wrong-item"
  | "damaged"
  | "defective"
  | "not-as-described"
  | "wrong-size"
  | "changed-mind"
  | "other";

export type ReturnStatus =
  | "requested"
  | "approved"
  | "rejected"
  | "item-received"
  | "refund-pending"
  | "refunded"
  | "cancelled";

export interface ReturnItem {
  id: string;
  orderItemId: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  attributes?: Record<string, string>;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  customerId: string;
  items: ReturnItem[];
  reason: ReturnReason;
  note?: string;
  status: ReturnStatus;
  refundAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReturnPayload {
  orderId: string;
  orderNumber: string;
  customerId: string;
  items: ReturnItem[];
  reason: ReturnReason;
  note?: string;
  refundAmount: number;
}

export const RETURN_REASON_LABELS: Record<ReturnReason, string> = {
  "wrong-item": "Wrong item received",
  damaged: "Item arrived damaged",
  defective: "Item is defective",
  "not-as-described": "Not as described",
  "wrong-size": "Wrong size or fit",
  "changed-mind": "Changed my mind",
  other: "Other",
};

export const RETURN_STATUS_LABELS: Record<ReturnStatus, string> = {
  requested: "Request submitted",
  approved: "Return approved",
  rejected: "Return rejected",
  "item-received": "Item received",
  "refund-pending": "Refund pending",
  refunded: "Refund completed",
  cancelled: "Cancelled",
};

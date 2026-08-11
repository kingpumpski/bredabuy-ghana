import type { ShippingAddress, ShippingMethod } from "@/features/shipping/types/shipping.types";
import type {
  PaymentMethod,
  PaymentStatus,
} from "@/features/payments/types/payment.types";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready-for-dispatch"
  | "shipped"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "returned"
  | "refunded";

export interface OrderStatusEvent {
  id: string;
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface ShipmentTracking {
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  dispatchedAt?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  sku: string;
  image?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sellerId?: string;
  sellerName?: string;
  attributes?: Record<string, string>;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: "GHS";
  status: OrderStatus;
  statusHistory?: OrderStatusEvent[];
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  shippingMethod?: ShippingMethod;
  shipment?: ShipmentTracking;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  shippingAddress: ShippingAddress;
  shippingMethod?: ShippingMethod;
}

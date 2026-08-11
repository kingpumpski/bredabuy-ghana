import type { OrderItem, OrderStatus } from "./order.types";

export interface SellerOrder {
  id: string;
  orderId: string;
  orderNumber: string;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SellerOrderSummary {
  sellerId: string;
  sellerName: string;
  orderId: string;
  orderNumber: string;
  itemCount: number;
  subtotal: number;
  status: OrderStatus;
}

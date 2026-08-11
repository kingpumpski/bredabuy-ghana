import type { Order } from "../types/order.types";
import type { SellerOrder, SellerOrderSummary } from "../types/seller-order.types";

const STORAGE_KEY = "bredabuy:seller-orders";

const read = (): SellerOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SellerOrder[]) : [];
  } catch {
    return [];
  }
};

const write = (orders: SellerOrder[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Persistence remains optional until the production API is connected.
  }
};

const splitOrder = (order: Order): SellerOrder[] => {
  const groups = new Map<string, SellerOrder>();

  for (const item of order.items) {
    const sellerId = item.sellerId ?? "platform";
    const sellerName = item.sellerName ?? "BredaBuy Marketplace";
    const existing = groups.get(sellerId);

    if (existing) {
      existing.items.push(item);
      existing.subtotal += item.totalPrice;
      existing.total += item.totalPrice;
      existing.updatedAt = order.updatedAt;
      continue;
    }

    groups.set(sellerId, {
      id: `${order.id}:${sellerId}`,
      orderId: order.id,
      orderNumber: order.orderNumber,
      sellerId,
      sellerName,
      items: [item],
      subtotal: item.totalPrice,
      shipping: 0,
      tax: 0,
      total: item.totalPrice,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }

  return [...groups.values()];
};

export const sellerOrderService = {
  createFromOrder(order: Order): SellerOrder[] {
    const existing = read().filter((item) => item.orderId !== order.id);
    const sellerOrders = splitOrder(order);
    write([...sellerOrders, ...existing]);
    return sellerOrders;
  },

  listForSeller(sellerId: string): SellerOrder[] {
    return read().filter((order) => order.sellerId === sellerId);
  },

  listForOrder(orderId: string): SellerOrder[] {
    return read().filter((order) => order.orderId === orderId);
  },

  getSummaryForOrder(orderId: string): SellerOrderSummary[] {
    return this.listForOrder(orderId).map((order) => ({
      sellerId: order.sellerId,
      sellerName: order.sellerName,
      orderId: order.orderId,
      orderNumber: order.orderNumber,
      itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: order.subtotal,
      status: order.status,
    }));
  },
};

export default sellerOrderService;

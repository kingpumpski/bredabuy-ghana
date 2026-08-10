import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
} from "../types/order.types";

const orders: Order[] = [];

function createOrderNumber(): string {
  const timestamp =
    Date.now().toString().slice(-8);

  return `BB-${timestamp}`;
}

export const orderService = {
  async createOrder(
    payload: CreateOrderPayload,
  ): Promise<Order> {
    const now =
      new Date().toISOString();

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: createOrderNumber(),
      customerId: payload.customerId,
      items: payload.items,
      subtotal: payload.subtotal,
      discount: payload.discount,
      shipping: payload.shipping,
      tax: payload.tax,
      total: payload.total,
      currency: "GHS",
      status: "pending",
      paymentMethod: payload.paymentMethod,
      paymentStatus: "pending",
      shippingAddress:
        payload.shippingAddress,
      createdAt: now,
      updatedAt: now,
    };

    orders.unshift(order);

    return order;
  },

  async getOrders(
    customerId: string,
  ): Promise<Order[]> {
    return orders.filter(
      (order) =>
        order.customerId === customerId,
    );
  },

  async getOrder(
    orderId: string,
  ): Promise<Order | null> {
    return (
      orders.find(
        (order) => order.id === orderId,
      ) ?? null
    );
  },

  async updateStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order | null> {
    const order = orders.find(
      (item) => item.id === orderId,
    );

    if (!order) {
      return null;
    }

    order.status = status;
    order.updatedAt =
      new Date().toISOString();

    return order;
  },
};

export default orderService;

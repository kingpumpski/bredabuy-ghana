import type { CreateOrderPayload, Order } from "../types/order.types";

const STORAGE_KEY = "bredabuy:orders";

const readOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
};

const writeOrders = (orders: Order[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Persistence is optional until the production API is connected.
  }
};

const makeOrderNumber = () =>
  `BB-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;

export const orderService = {
  create(payload: CreateOrderPayload): Order {
    const now = new Date().toISOString();

    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: makeOrderNumber(),
      ...payload,
      status: "pending",
      paymentStatus: "pending",
      currency: "GHS",
      createdAt: now,
      updatedAt: now,
    };

    writeOrders([order, ...readOrders()]);

    return order;
  },

  list(customerId?: string): Order[] {
    const orders = readOrders();

    return customerId
      ? orders.filter((order) => order.customerId === customerId)
      : orders;
  },

  getById(id: string): Order | null {
    return readOrders().find((order) => order.id === id) ?? null;
  },

  getByOrderNumber(orderNumber: string): Order | null {
    return (
      readOrders().find((order) => order.orderNumber === orderNumber) ?? null
    );
  },
};

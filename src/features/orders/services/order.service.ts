import type { PaymentStatus } from "@/features/payments/types/payment.types";
import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
  OrderStatusEvent,
  ShipmentTracking,
} from "../types/order.types";

const STORAGE_KEY = "bredabuy:orders";

const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["processing", "cancelled"],
  processing: ["ready-for-dispatch", "cancelled"],
  "ready-for-dispatch": ["shipped", "cancelled"],
  shipped: ["out-for-delivery"],
  "out-for-delivery": ["delivered"],
  delivered: ["returned"],
  returned: ["refunded"],
  cancelled: ["refunded"],
  refunded: [],
};

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
    // Persistence remains optional until the production API is connected.
  }
};

const makeOrderNumber = () =>
  `BB-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;

const createStatusEvent = (
  status: OrderStatus,
  timestamp: string,
  note?: string,
): OrderStatusEvent => ({
  id: crypto.randomUUID(),
  status,
  timestamp,
  ...(note ? { note } : {}),
});

export const orderService = {
  create(payload: CreateOrderPayload): Order {
    const now = new Date().toISOString();
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber: makeOrderNumber(),
      ...payload,
      status: "pending",
      statusHistory: [createStatusEvent("pending", now, "Order placed")],
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
    return customerId ? orders.filter((order) => order.customerId === customerId) : orders;
  },

  listForSeller(sellerId: string): Order[] {
    return readOrders().filter((order) => order.items.some((item) => item.sellerId === sellerId));
  },

  getById(id: string): Order | null {
    return readOrders().find((order) => order.id === id) ?? null;
  },

  getByOrderNumber(orderNumber: string): Order | null {
    return readOrders().find((order) => order.orderNumber === orderNumber) ?? null;
  },

  canTransition(from: OrderStatus, to: OrderStatus): boolean {
    return from === to || STATUS_TRANSITIONS[from].includes(to);
  },

  getNextStatuses(status: OrderStatus): OrderStatus[] {
    return STATUS_TRANSITIONS[status];
  },

  updateStatus(id: string, status: OrderStatus, note?: string): Order | null {
    const orders = readOrders();
    const index = orders.findIndex((order) => order.id === id);
    if (index < 0) return null;

    const current = orders[index];
    if (!this.canTransition(current.status, status)) return null;

    const now = new Date().toISOString();
    const history = current.statusHistory?.length
      ? current.statusHistory
      : [createStatusEvent(current.status, current.createdAt, "Order placed")];

    const updated: Order = {
      ...current,
      status,
      statusHistory: [...history, createStatusEvent(status, now, note)],
      updatedAt: now,
    };

    if (status === "shipped") {
      updated.shipment = {
        ...current.shipment,
        dispatchedAt: current.shipment?.dispatchedAt ?? now,
      };
    }
    if (status === "delivered") {
      updated.shipment = {
        ...current.shipment,
        deliveredAt: current.shipment?.deliveredAt ?? now,
      };
    }

    orders[index] = updated;
    writeOrders(orders);
    return updated;
  },

  updateShipment(id: string, shipment: Partial<ShipmentTracking>): Order | null {
    const orders = readOrders();
    const index = orders.findIndex((order) => order.id === id);
    if (index < 0) return null;

    const current = orders[index];
    const now = new Date().toISOString();
    const updated: Order = {
      ...current,
      shipment: { ...current.shipment, ...shipment },
      updatedAt: now,
    };
    orders[index] = updated;
    writeOrders(orders);
    return updated;
  },

  dispatch(id: string, shipment: ShipmentTracking): Order | null {
    const order = this.getById(id);
    if (!order || order.status !== "ready-for-dispatch" || order.paymentStatus !== "successful") return null;

    const now = new Date().toISOString();
    const updated = this.updateStatus(id, "shipped", "Shipment dispatched");
    if (!updated) return null;

    return this.updateShipment(id, {
      ...shipment,
      dispatchedAt: shipment.dispatchedAt ?? now,
    });
  },

  updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
    note?: string,
  ): Order | null {
    const orders = readOrders();
    const index = orders.findIndex((order) => order.id === id);
    if (index < 0) return null;

    const current = orders[index];
    const now = new Date().toISOString();
    let updated: Order = { ...current, paymentStatus, updatedAt: now };

    if (paymentStatus === "successful" && current.status === "pending") {
      updated = {
        ...updated,
        status: "confirmed",
        statusHistory: [
          ...(current.statusHistory ?? [createStatusEvent("pending", current.createdAt, "Order placed")]),
          createStatusEvent("confirmed", now, note ?? "Payment confirmed; order confirmed"),
        ],
      };
    } else if (paymentStatus === "failed") {
      updated = {
        ...updated,
        statusHistory: [
          ...(current.statusHistory ?? [createStatusEvent(current.status, current.createdAt, "Order placed")]),
          createStatusEvent(current.status, now, note ?? "Payment failed; order remains unpaid"),
        ],
      };
    } else if (paymentStatus === "cancelled" && current.status === "pending") {
      updated = {
        ...updated,
        status: "cancelled",
        statusHistory: [
          ...(current.statusHistory ?? [createStatusEvent("pending", current.createdAt, "Order placed")]),
          createStatusEvent("cancelled", now, note ?? "Payment cancelled; order cancelled"),
        ],
      };
    }

    orders[index] = updated;
    writeOrders(orders);
    return updated;
  },

  cancel(id: string): Order | null {
    const order = this.getById(id);
    if (!order || !this.canTransition(order.status, "cancelled")) return null;
    return this.updateStatus(id, "cancelled", "Order cancelled");
  },
};

export default orderService;

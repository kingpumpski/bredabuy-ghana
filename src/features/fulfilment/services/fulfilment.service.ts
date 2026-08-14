import orderService from "@/features/orders/services/order.service";
import shipmentService from "@/features/logistics/services/shipment.service";
import type { Order } from "@/features/orders/types/order.types";
import type { FulfilmentRecord, FulfilmentStatus, FulfilmentSummary } from "../types/fulfilment.types";

const STORAGE_KEY = "bredabuy:fulfilments";

const read = (): FulfilmentRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FulfilmentRecord[]) : [];
  } catch {
    return [];
  }
};

const write = (records: FulfilmentRecord[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); } catch { /* API persistence later */ }
};

const now = () => new Date().toISOString();

const sellerItems = (order: Order, sellerId?: string) =>
  order.items.filter((item) => !sellerId || item.sellerId === sellerId);

export const fulfilmentService = {
  createForOrder(order: Order, sellerId?: string): FulfilmentRecord | null {
    const existing = read().find((item) => item.orderId === order.id && item.sellerId === sellerId);
    if (existing) return existing;
    const items = sellerItems(order, sellerId);
    if (!items.length) return null;
    const timestamp = now();
    const record: FulfilmentRecord = {
      id: crypto.randomUUID(),
      orderId: order.id,
      orderNumber: order.orderNumber,
      sellerId,
      items: items.map((item) => ({
        orderItemId: item.id,
        productId: item.productId,
        variantId: item.variantId,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        sellerId: item.sellerId,
        attributes: item.attributes,
      })),
      status: order.paymentStatus === "successful" ? "awaiting-confirmation" : "awaiting-payment",
      paymentRequired: order.paymentMethod !== "cash-on-delivery",
      paymentConfirmed: order.paymentStatus === "successful" || order.paymentMethod === "cash-on-delivery",
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    write([record, ...read()]);
    return record;
  },

  syncOrder(order: Order): FulfilmentRecord[] {
    const sellerIds = [...new Set(order.items.map((item) => item.sellerId).filter(Boolean))] as string[];
    const ids = sellerIds.length ? sellerIds : [undefined];
    return ids.map((sellerId) => this.createForOrder(order, sellerId)).filter(Boolean) as FulfilmentRecord[];
  },

  list(sellerId?: string): FulfilmentRecord[] {
    return read().filter((item) => !sellerId || item.sellerId === sellerId);
  },

  getById(id: string): FulfilmentRecord | null {
    return read().find((item) => item.id === id) ?? null;
  },

  getByOrder(orderId: string): FulfilmentRecord[] {
    return read().filter((item) => item.orderId === orderId);
  },

  canAdvance(record: FulfilmentRecord, next: FulfilmentStatus): boolean {
    if (next === "cancelled") return !["completed", "cancelled", "dispatched"].includes(record.status);
    if (!record.paymentConfirmed) return false;
    const transitions: Record<FulfilmentStatus, FulfilmentStatus[]> = {
      "awaiting-payment": ["awaiting-confirmation"],
      "awaiting-confirmation": ["picking"],
      picking: ["packed"],
      packed: ["ready-for-dispatch"],
      "ready-for-dispatch": ["dispatched"],
      dispatched: ["completed"],
      completed: [],
      cancelled: [],
    };
    return transitions[record.status].includes(next);
  },

  updateStatus(id: string, next: FulfilmentStatus): FulfilmentRecord | null {
    const records = read();
    const index = records.findIndex((item) => item.id === id);
    if (index < 0) return null;
    const current = records[index];
    if (!this.canAdvance(current, next)) return null;
    const timestamp = now();
    const updated: FulfilmentRecord = { ...current, status: next, updatedAt: timestamp };
    if (next === "picking") updated.pickedAt = timestamp;
    if (next === "packed") updated.packedAt = timestamp;
    if (next === "ready-for-dispatch") updated.readyAt = timestamp;
    if (next === "dispatched") updated.dispatchedAt = timestamp;
    if (next === "completed") updated.completedAt = timestamp;
    records[index] = updated;
    write(records);
    return updated;
  },

  dispatchWithShipment(
    id: string,
    carrier: { id: string; name: string },
    estimatedDelivery?: string,
  ): { fulfilment: FulfilmentRecord; trackingNumber: string } | null {
    const record = this.getById(id);
    if (!record || record.status !== "ready-for-dispatch" || !record.orderId) return null;
    const order = orderService.getById(record.orderId);
    if (!order || order.status !== "ready-for-dispatch" || order.paymentStatus !== "successful") return null;

    const shipment = shipmentService.create({
      orderId: order.id,
      orderNumber: order.orderNumber,
      fulfilmentId: record.id,
      sellerId: record.sellerId,
      carrierId: carrier.id,
      carrierName: carrier.name,
      destination: {
        fullName: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        region: order.shippingAddress.region,
        city: order.shippingAddress.city,
        area: order.shippingAddress.area,
        addressLine: order.shippingAddress.addressLine,
        digitalAddress: order.shippingAddress.digitalAddress,
      },
      estimatedDelivery,
    });

    const dispatched = this.updateStatus(id, "dispatched");
    if (!dispatched) return null;

    const updatedOrder = orderService.dispatch(order.id, {
      carrier: carrier.name,
      trackingNumber: shipment.trackingNumber,
      estimatedDelivery,
    });
    if (!updatedOrder) return null;

    shipmentService.updateStatus(shipment.id, "label-created", "Shipment label created");
    return { fulfilment: dispatched, trackingNumber: shipment.trackingNumber };
  },

  confirmPayment(id: string): FulfilmentRecord | null {
    const record = this.getById(id);
    if (!record) return null;
    const records = read();
    const index = records.findIndex((item) => item.id === id);
    const updated = { ...record, paymentConfirmed: true, status: record.status === "awaiting-payment" ? "awaiting-confirmation" as const : record.status, updatedAt: now() };
    records[index] = updated;
    write(records);
    return updated;
  },

  summary(sellerId?: string): FulfilmentSummary {
    const records = this.list(sellerId);
    return {
      total: records.length,
      awaitingPayment: records.filter((x) => x.status === "awaiting-payment").length,
      awaitingConfirmation: records.filter((x) => x.status === "awaiting-confirmation").length,
      picking: records.filter((x) => x.status === "picking").length,
      packed: records.filter((x) => x.status === "packed").length,
      readyForDispatch: records.filter((x) => x.status === "ready-for-dispatch").length,
      dispatched: records.filter((x) => x.status === "dispatched").length,
      completed: records.filter((x) => x.status === "completed").length,
    };
  },
};

export default fulfilmentService;

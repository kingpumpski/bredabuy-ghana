import type { CreateShipmentPayload, Shipment, ShipmentEvent, ShipmentEventType, ShipmentStatus, ShipmentSummary } from "../types/logistics.types";

const SHIPMENTS = "bredabuy:shipments";
const EVENTS = "bredabuy:shipment-events";
const read = <T>(key: string): T[] => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T[] : []; } catch { return []; } };
const write = <T>(key: string, value: T[]) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* API persistence later */ } };
const now = () => new Date().toISOString();
const reference = () => `BB-SHP-${Date.now().toString(36).toUpperCase()}`;

const transitions: Record<ShipmentStatus, ShipmentStatus[]> = {
  pending: ["label-created", "cancelled"], "label-created": ["picked-up", "cancelled"], "picked-up": ["in-transit"], "in-transit": ["out-for-delivery", "returned"], "out-for-delivery": ["delivered", "failed-delivery"], "failed-delivery": ["out-for-delivery", "returned"], delivered: [], returned: [], cancelled: [],
};

export const shipmentService = {
  create(payload: CreateShipmentPayload): Shipment {
    const timestamp = now();
    const shipment: Shipment = { id: crypto.randomUUID(), trackingNumber: reference(), status: "pending", deliveryAttempts: 0, ...payload, createdAt: timestamp, updatedAt: timestamp };
    write(SHIPMENTS, [shipment, ...read<Shipment>(SHIPMENTS)]);
    this.addEvent(shipment, "created", "Shipment created");
    return shipment;
  },
  list(sellerId?: string) { return read<Shipment>(SHIPMENTS).filter((x) => !sellerId || x.sellerId === sellerId); },
  getById(id: string) { return read<Shipment>(SHIPMENTS).find((x) => x.id === id) ?? null; },
  track(trackingNumber: string) { return read<Shipment>(SHIPMENTS).find((x) => x.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()) ?? null; },
  events(shipmentId: string) { return read<ShipmentEvent>(EVENTS).filter((x) => x.shipmentId === shipmentId).sort((a,b) => b.occurredAt.localeCompare(a.occurredAt)); },
  canTransition(current: ShipmentStatus, next: ShipmentStatus) { return transitions[current].includes(next); },
  updateStatus(id: string, status: ShipmentStatus, description?: string, location?: string): Shipment | null {
    const shipments = read<Shipment>(SHIPMENTS); const index = shipments.findIndex((x) => x.id === id); if (index < 0) return null;
    const shipment = shipments[index]; if (!this.canTransition(shipment.status, status)) return null;
    const timestamp = now(); const updated: Shipment = { ...shipment, status, updatedAt: timestamp };
    if (status === "picked-up") updated.pickedUpAt = timestamp;
    if (status === "delivered") updated.deliveredAt = timestamp;
    if (status === "failed-delivery") updated.deliveryAttempts += 1;
    shipments[index] = updated; write(SHIPMENTS, shipments);
    const descriptions: Record<ShipmentStatus, string> = { pending:"Shipment pending", "label-created":"Shipping label created", "picked-up":"Shipment picked up", "in-transit":"Shipment is in transit", "out-for-delivery":"Shipment is out for delivery", delivered:"Shipment delivered", "failed-delivery":"Delivery attempt failed", returned:"Shipment returned", cancelled:"Shipment cancelled" };
    this.addEvent(updated, status as ShipmentEventType, description || descriptions[status], location);
    return updated;
  },
  addEvent(shipment: Shipment, type: ShipmentEventType, description: string, location?: string, metadata?: Record<string,string>): ShipmentEvent {
    const event: ShipmentEvent = { id: crypto.randomUUID(), shipmentId: shipment.id, type, status: shipment.status, description, location, occurredAt: now(), metadata };
    write(EVENTS, [event, ...read<ShipmentEvent>(EVENTS)]); return event;
  },
  recordDeliveryFailure(id: string, reason: string, location?: string) { return this.updateStatus(id, "failed-delivery", reason, location); },
  confirmDelivery(id: string, recipientName: string, note?: string): Shipment | null {
    const shipment = this.updateStatus(id, "delivered", "Delivery confirmed"); if (!shipment) return null;
    const shipments = read<Shipment>(SHIPMENTS); const index = shipments.findIndex((x) => x.id === id); if (index < 0) return shipment;
    shipments[index] = { ...shipment, proofOfDelivery: { recipientName, receivedAt: now(), note } }; write(SHIPMENTS, shipments); return shipments[index];
  },
  summary(sellerId?: string): ShipmentSummary { const items = this.list(sellerId); return { total: items.length, pending: items.filter(x=>x.status==="pending"||x.status==="label-created").length, inTransit: items.filter(x=>x.status==="picked-up"||x.status==="in-transit").length, outForDelivery: items.filter(x=>x.status==="out-for-delivery").length, delivered: items.filter(x=>x.status==="delivered").length, failedDelivery: items.filter(x=>x.status==="failed-delivery").length, returned: items.filter(x=>x.status==="returned").length }; },
};
export default shipmentService;

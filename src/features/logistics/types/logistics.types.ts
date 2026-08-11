export type ShipmentStatus = "pending" | "label-created" | "picked-up" | "in-transit" | "out-for-delivery" | "delivered" | "failed-delivery" | "returned" | "cancelled";
export type ShipmentEventType = "created" | "label-created" | "picked-up" | "in-transit" | "out-for-delivery" | "delivery-attempted" | "delivered" | "returned" | "cancelled" | "note";

export interface ShipmentEvent {
  id: string;
  shipmentId: string;
  type: ShipmentEventType;
  status: ShipmentStatus;
  description: string;
  location?: string;
  occurredAt: string;
  metadata?: Record<string, string>;
}

export interface Shipment {
  id: string;
  orderId: string;
  orderNumber: string;
  fulfilmentId: string;
  sellerId?: string;
  carrierId: string;
  carrierName: string;
  trackingNumber: string;
  status: ShipmentStatus;
  destination: { fullName: string; phone: string; region: string; city: string; area: string; addressLine: string; digitalAddress?: string };
  estimatedDelivery?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  deliveryAttempts: number;
  proofOfDelivery?: { recipientName: string; receivedAt: string; note?: string };
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentPayload { orderId: string; orderNumber: string; fulfilmentId: string; sellerId?: string; carrierId: string; carrierName: string; destination: Shipment["destination"]; estimatedDelivery?: string; }
export interface ShipmentSummary { total: number; pending: number; inTransit: number; outForDelivery: number; delivered: number; failedDelivery: number; returned: number; }

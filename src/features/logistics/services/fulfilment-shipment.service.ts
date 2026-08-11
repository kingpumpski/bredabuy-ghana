import shipmentService from "./shipment.service";
import type { CreateShipmentPayload, Shipment } from "../types/logistics.types";

export interface FulfilmentShipmentSource {
  id: string;
  orderId: string;
  orderNumber: string;
  sellerId?: string;
  status: "ready-for-dispatch" | string;
  shipping?: CreateShipmentPayload["destination"];
}

export interface CreateShipmentFromFulfilmentPayload {
  fulfilment: FulfilmentShipmentSource;
  carrierId: string;
  carrierName: string;
  estimatedDelivery?: string;
}

export const fulfilmentShipmentService = {
  createFromReadyFulfilment(payload: CreateShipmentFromFulfilmentPayload): Shipment | null {
    const { fulfilment } = payload;
    if (fulfilment.status !== "ready-for-dispatch" || !fulfilment.shipping) return null;
    return shipmentService.create({
      orderId: fulfilment.orderId,
      orderNumber: fulfilment.orderNumber,
      fulfilmentId: fulfilment.id,
      sellerId: fulfilment.sellerId,
      carrierId: payload.carrierId,
      carrierName: payload.carrierName,
      destination: fulfilment.shipping,
      estimatedDelivery: payload.estimatedDelivery,
    });
  },
};

export default fulfilmentShipmentService;

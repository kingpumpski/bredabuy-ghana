import carrierService from "./carrier.service";
import shipmentService from "./shipment.service";

export interface ShipmentAssignmentResult { success: boolean; shipmentId: string; carrierId: string; error?: string; }

export const shipmentAssignmentService = {
  assign(shipmentId: string, carrierId: string): ShipmentAssignmentResult {
    const shipment = shipmentService.get(shipmentId);
    if (!shipment) return { success: false, shipmentId, carrierId, error: "Shipment not found." };
    const carrier = carrierService.get(carrierId);
    if (!carrier || !carrier.active) return { success: false, shipmentId, carrierId, error: "Carrier is unavailable." };
    const destinationRegion = shipment.destination.region;
    if (carrier.serviceRegions.length > 0 && !carrier.serviceRegions.includes(destinationRegion)) {
      return { success: false, shipmentId, carrierId, error: `Carrier does not serve ${destinationRegion}.` };
    }
    const updated = shipmentService.assignCarrier(shipmentId, carrier.id, carrier.name);
    return updated
      ? { success: true, shipmentId, carrierId }
      : { success: false, shipmentId, carrierId, error: "Shipment could not be updated." };
  },
};

export default shipmentAssignmentService;

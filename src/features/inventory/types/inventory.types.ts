export type InventoryMovementType =
  | "reservation"
  | "release"
  | "sale"
  | "restock"
  | "adjustment"
  | "return";

export interface InventoryRecord {
  id: string;
  productId: string;
  variantId?: string;
  sku: string;
  onHand: number;
  reserved: number;
  available: number;
  updatedAt: string;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  variantId?: string;
  sku: string;
  type: InventoryMovementType;
  quantity: number;
  referenceId?: string;
  note?: string;
  createdAt: string;
}

export interface InventoryReservationItem {
  productId: string;
  variantId?: string;
  sku: string;
  quantity: number;
}

export interface InventoryReservation {
  id: string;
  orderId: string;
  items: InventoryReservationItem[];
  status: "active" | "released" | "committed";
  createdAt: string;
  updatedAt: string;
}

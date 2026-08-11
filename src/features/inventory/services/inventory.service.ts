import { productService } from "@/features/products/services/product.service";
import type {
  InventoryMovement,
  InventoryRecord,
  InventoryReservation,
  InventoryReservationItem,
} from "../types/inventory.types";

const INVENTORY_KEY = "bredabuy:inventory";
const RESERVATIONS_KEY = "bredabuy:inventory-reservations";
const MOVEMENTS_KEY = "bredabuy:inventory-movements";

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Production persistence will move to the API/database.
  }
};

const keyFor = (productId: string, variantId?: string) =>
  variantId ? `${productId}:${variantId}` : productId;

const makeId = () => crypto.randomUUID();

export type ReturnInventoryDisposition = "restock" | "quarantine" | "damaged" | "write-off";

export interface ReturnInventoryReconciliationItem {
  productId: string;
  variantId?: string;
  sku: string;
  quantity: number;
  disposition: ReturnInventoryDisposition;
}

export interface ReturnInventoryReconciliation {
  id: string;
  returnId: string;
  orderId: string;
  items: ReturnInventoryReconciliationItem[];
  note?: string;
  createdAt: string;
}

const RECONCILIATIONS_KEY = "bredabuy:return-reconciliations";

export const inventoryService = {
  seed(records: InventoryRecord[]) {
    const current = read<InventoryRecord[]>(INVENTORY_KEY, []);
    const merged = [...current];
    for (const record of records) {
      const index = merged.findIndex(
        (item) => keyFor(item.productId, item.variantId) === keyFor(record.productId, record.variantId),
      );
      if (index === -1) {
        merged.push({
          ...record,
          reserved: record.reserved ?? 0,
          quarantined: record.quarantined ?? 0,
          damaged: record.damaged ?? 0,
          available: Math.max(0, record.onHand - (record.reserved ?? 0)),
        });
      }
    }
    write(INVENTORY_KEY, merged);
  },

  get(productId: string, variantId?: string): InventoryRecord | null {
    return read<InventoryRecord[]>(INVENTORY_KEY, []).find(
      (item) => keyFor(item.productId, item.variantId) === keyFor(productId, variantId),
    ) ?? null;
  },

  list(): InventoryRecord[] {
    return read<InventoryRecord[]>(INVENTORY_KEY, []);
  },

  movements(): InventoryMovement[] {
    return read<InventoryMovement[]>(MOVEMENTS_KEY, []);
  },

  returnReconciliations(returnId?: string): ReturnInventoryReconciliation[] {
    const records = read<ReturnInventoryReconciliation[]>(RECONCILIATIONS_KEY, []);
    return returnId ? records.filter((item) => item.returnId === returnId) : records;
  },

  async ensureRecords(items: InventoryReservationItem[]): Promise<InventoryRecord[]> {
    const inventory = read<InventoryRecord[]>(INVENTORY_KEY, []);
    let changed = false;

    for (const item of items) {
      const existing = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      );
      if (existing) continue;

      const product = await productService.getProduct(item.productId);
      const variant = product?.variants?.find((candidate) => candidate.id === item.variantId);
      const onHand = Math.max(0, variant?.stock ?? product?.stock ?? 0);

      inventory.push({
        productId: item.productId,
        variantId: item.variantId,
        sku: item.sku,
        onHand,
        reserved: 0,
        available: onHand,
        quarantined: 0,
        damaged: 0,
        updatedAt: new Date().toISOString(),
      });
      changed = true;
    }

    if (changed) write(INVENTORY_KEY, inventory);
    return inventory;
  },

  async reserve(orderId: string, items: InventoryReservationItem[]): Promise<InventoryReservation> {
    if (!orderId || !items.length) throw new Error("An order and at least one item are required.");

    const normalized = items.filter((item) => item.quantity > 0);
    if (!normalized.length) throw new Error("At least one valid item is required.");

    const inventory = await this.ensureRecords(normalized);

    for (const item of normalized) {
      const record = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      );
      if (!record || record.available < item.quantity) {
        throw new Error(`Insufficient stock for ${item.sku}. Available: ${record?.available ?? 0}.`);
      }
    }

    for (const item of normalized) {
      const record = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      )!;
      record.reserved += item.quantity;
      record.available = Math.max(0, record.onHand - record.reserved);
      record.updatedAt = new Date().toISOString();
    }

    const now = new Date().toISOString();
    const reservation: InventoryReservation = {
      id: makeId(),
      orderId,
      items: normalized,
      status: "active",
      createdAt: now,
      updatedAt: now,
    };
    const reservations = read<InventoryReservation[]>(RESERVATIONS_KEY, []);
    write(INVENTORY_KEY, inventory);
    write(RESERVATIONS_KEY, [reservation, ...reservations]);

    const movements = read<InventoryMovement[]>(MOVEMENTS_KEY, []);
    write(MOVEMENTS_KEY, [
      ...normalized.map((item) => ({
        id: makeId(),
        ...item,
        type: "reservation" as const,
        referenceId: orderId,
        createdAt: now,
      })),
      ...movements,
    ]);
    return reservation;
  },

  release(reservationId: string): InventoryReservation | null {
    const reservations = read<InventoryReservation[]>(RESERVATIONS_KEY, []);
    const reservation = reservations.find((item) => item.id === reservationId);
    if (!reservation || reservation.status !== "active") return null;

    const inventory = read<InventoryRecord[]>(INVENTORY_KEY, []);
    for (const item of reservation.items) {
      const record = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      );
      if (record) {
        record.reserved = Math.max(0, record.reserved - item.quantity);
        record.available = Math.max(0, record.onHand - record.reserved);
        record.updatedAt = new Date().toISOString();
      }
    }

    const now = new Date().toISOString();
    const updated = { ...reservation, status: "released" as const, updatedAt: now };
    write(INVENTORY_KEY, inventory);
    write(RESERVATIONS_KEY, reservations.map((item) => item.id === reservationId ? updated : item));
    return updated;
  },

  commit(reservationId: string): InventoryReservation | null {
    const reservations = read<InventoryReservation[]>(RESERVATIONS_KEY, []);
    const reservation = reservations.find((item) => item.id === reservationId);
    if (!reservation || reservation.status !== "active") return null;

    const inventory = read<InventoryRecord[]>(INVENTORY_KEY, []);
    const now = new Date().toISOString();
    for (const item of reservation.items) {
      const record = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      );
      if (!record || record.reserved < item.quantity || record.onHand < item.quantity) return null;
      record.onHand -= item.quantity;
      record.reserved -= item.quantity;
      record.available = Math.max(0, record.onHand - record.reserved);
      record.updatedAt = now;
    }

    const updated = { ...reservation, status: "committed" as const, updatedAt: now };
    write(INVENTORY_KEY, inventory);
    write(RESERVATIONS_KEY, reservations.map((item) => item.id === reservationId ? updated : item));
    return updated;
  },

  reconcileReturn(
    returnId: string,
    orderId: string,
    items: ReturnInventoryReconciliationItem[],
    note?: string,
  ): ReturnInventoryReconciliation {
    if (!returnId || !orderId || !items.length) {
      throw new Error("A return, order and at least one returned item are required.");
    }

    const previous = this.returnReconciliations(returnId);
    if (previous.length) throw new Error("This return has already been reconciled into inventory.");

    const inventory = read<InventoryRecord[]>(INVENTORY_KEY, []);
    const movements = read<InventoryMovement[]>(MOVEMENTS_KEY, []);
    const now = new Date().toISOString();

    for (const item of items) {
      if (item.quantity <= 0) throw new Error(`Invalid return quantity for ${item.sku}.`);
      const record = inventory.find(
        (entry) => keyFor(entry.productId, entry.variantId) === keyFor(item.productId, item.variantId),
      );
      if (!record) throw new Error(`Inventory record not found for ${item.sku}.`);

      if (item.disposition === "restock") {
        record.onHand += item.quantity;
      } else if (item.disposition === "quarantine") {
        record.quarantined = (record.quarantined ?? 0) + item.quantity;
      } else if (item.disposition === "damaged" || item.disposition === "write-off") {
        record.damaged = (record.damaged ?? 0) + item.quantity;
      }

      record.available = Math.max(0, record.onHand - record.reserved);
      record.updatedAt = now;

      movements.unshift({
        id: makeId(),
        productId: item.productId,
        variantId: item.variantId,
        sku: item.sku,
        type: "return",
        quantity: item.quantity,
        referenceId: returnId,
        note: `Return reconciliation: ${item.disposition}${note ? ` — ${note}` : ""}`,
        createdAt: now,
      });
    }

    const reconciliation: ReturnInventoryReconciliation = {
      id: makeId(),
      returnId,
      orderId,
      items,
      note,
      createdAt: now,
    };

    write(INVENTORY_KEY, inventory);
    write(MOVEMENTS_KEY, movements);
    write(RECONCILIATIONS_KEY, [reconciliation, ...this.returnReconciliations()]);
    return reconciliation;
  },

  reservations(orderId?: string) {
    const reservations = read<InventoryReservation[]>(RESERVATIONS_KEY, []);
    return orderId ? reservations.filter((item) => item.orderId === orderId) : reservations;
  },
};

export default inventoryService;

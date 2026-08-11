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

export const inventoryService = {
  seed(records: InventoryRecord[]) {
    const current = read<InventoryRecord[]>(INVENTORY_KEY, []);
    const merged = [...current];
    for (const record of records) {
      const index = merged.findIndex(
        (item) => keyFor(item.productId, item.variantId) === keyFor(record.productId, record.variantId),
      );
      if (index === -1) {
        merged.push({ ...record, available: Math.max(0, record.onHand - record.reserved) });
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
        reorderLevel: 0,
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
        (entry) => keyFor(entry.productId, item.variantId) === keyFor(item.productId, item.variantId),
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

  reservations(orderId?: string) {
    const reservations = read<InventoryReservation[]>(RESERVATIONS_KEY, []);
    return orderId ? reservations.filter((item) => item.orderId === orderId) : reservations;
  },
};

export default inventoryService;

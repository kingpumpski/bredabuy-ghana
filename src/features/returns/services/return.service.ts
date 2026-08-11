import inventoryService from "@/features/inventory/services/inventory.service";
import type { CreateReturnPayload, ReturnInventoryDisposition, ReturnRequest, ReturnStatus } from "../types/return.types";

const STORAGE_KEY = "bredabuy:returns";

const read = (): ReturnRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReturnRequest[]) : [];
  } catch {
    return [];
  }
};

const write = (requests: ReturnRequest[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch {
    // Production persistence becomes API-backed when the backend is connected.
  }
};

export const returnService = {
  create(payload: CreateReturnPayload): ReturnRequest {
    const now = new Date().toISOString();
    const request: ReturnRequest = {
      id: crypto.randomUUID(),
      ...payload,
      status: "requested",
      createdAt: now,
      updatedAt: now,
    };
    write([request, ...read()]);
    return request;
  },

  list(customerId?: string): ReturnRequest[] {
    const requests = read();
    return customerId ? requests.filter((item) => item.customerId === customerId) : requests;
  },

  getById(id: string): ReturnRequest | null {
    return read().find((item) => item.id === id) ?? null;
  },

  updateStatus(id: string, status: ReturnStatus): ReturnRequest | null {
    let updated: ReturnRequest | null = null;
    const requests = read().map((item) => {
      if (item.id !== id) return item;
      updated = { ...item, status, updatedAt: new Date().toISOString() };
      return updated;
    });
    if (updated) write(requests);
    return updated;
  },

  reconcileInventory(
    id: string,
    disposition: ReturnInventoryDisposition,
    note?: string,
  ): ReturnRequest | null {
    const request = this.getById(id);
    if (!request) throw new Error("Return request not found.");
    if (request.status !== "item-received") {
      throw new Error("Only received returns can be reconciled into inventory.");
    }
    if (request.inventoryReconciledAt) {
      throw new Error("This return has already been reconciled into inventory.");
    }

    inventoryService.reconcileReturn(
      request.id,
      request.orderId,
      request.items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        sku: item.sku,
        quantity: item.quantity,
        disposition,
      })),
      note,
    );

    const now = new Date().toISOString();
    const updated = {
      ...request,
      inventoryDisposition: disposition,
      inventoryReconciledAt: now,
      updatedAt: now,
    };
    write(read().map((item) => item.id === id ? updated : item));
    return updated;
  },
};

export default returnService;

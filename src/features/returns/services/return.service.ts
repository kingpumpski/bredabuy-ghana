import type { CreateReturnPayload, ReturnRequest, ReturnStatus } from "../types/return.types";

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
    // Persistence becomes API-backed when the production backend is connected.
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
};

export default returnService;

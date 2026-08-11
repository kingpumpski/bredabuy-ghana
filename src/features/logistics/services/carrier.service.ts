export interface Carrier {
  id: string;
  name: string;
  code: string;
  phone?: string;
  email?: string;
  serviceRegions: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const KEY = "bredabuy:logistics:carriers";
const read = (): Carrier[] => { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Carrier[]; } catch { return []; } };
const write = (items: Carrier[]) => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* persistence failure is intentionally non-fatal */ } };

export const carrierService = {
  list(activeOnly = false) { const items = read(); return activeOnly ? items.filter(item => item.active) : items; },
  get(id: string) { return read().find(item => item.id === id) ?? null; },
  create(input: Omit<Carrier, "id" | "createdAt" | "updatedAt">) {
    const now = new Date().toISOString();
    const carrier: Carrier = { ...input, id: crypto.randomUUID(), createdAt: now, updatedAt: now };
    write([carrier, ...read()]);
    return carrier;
  },
  update(id: string, patch: Partial<Omit<Carrier, "id" | "createdAt">>) {
    const now = new Date().toISOString();
    let updated: Carrier | null = null;
    write(read().map(item => item.id === id ? (updated = { ...item, ...patch, updatedAt: now }) : item));
    return updated;
  },
  deactivate(id: string) { return this.update(id, { active: false }); },
};
export default carrierService;

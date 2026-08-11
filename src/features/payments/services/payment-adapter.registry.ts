import type { PaymentAdapter, PaymentAdapterResponse, PaymentAdapterRequest } from "../types/payment-adapter.types";

class PaymentAdapterRegistry {
  private adapters = new Map<string, PaymentAdapter>();

  register(adapter: PaymentAdapter) {
    this.adapters.set(adapter.name, adapter);
    return adapter;
  }

  get(name: string) {
    return this.adapters.get(name);
  }

  has(name: string) {
    return this.adapters.has(name);
  }

  async collect(name: string, request: PaymentAdapterRequest): Promise<PaymentAdapterResponse> {
    const adapter = this.adapters.get(name);
    if (!adapter) throw new Error(`Payment adapter '${name}' is not registered.`);
    return adapter.collect(request);
  }

  async verify(name: string, reference: string): Promise<PaymentAdapterResponse> {
    const adapter = this.adapters.get(name);
    if (!adapter) throw new Error(`Payment adapter '${name}' is not registered.`);
    return adapter.verify(reference);
  }

  async refund(name: string, reference: string, amount?: number): Promise<PaymentAdapterResponse> {
    const adapter = this.adapters.get(name);
    if (!adapter) throw new Error(`Payment adapter '${name}' is not registered.`);
    return adapter.refund(reference, amount);
  }
}

export const paymentAdapterRegistry = new PaymentAdapterRegistry();
export default paymentAdapterRegistry;

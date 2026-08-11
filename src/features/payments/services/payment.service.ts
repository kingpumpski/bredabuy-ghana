import type {
  CreatePaymentPayload,
  PaymentEvent,
  PaymentEventType,
  PaymentIntent,
  PaymentStatus,
} from "../types/payment.types";

const STORAGE_KEY = "bredabuy:payment-intents";

const now = () => new Date().toISOString();

const readPayments = (): PaymentIntent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PaymentIntent[]) : [];
  } catch {
    return [];
  }
};

const writePayments = (payments: PaymentIntent[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  } catch {
    // Persistence remains optional until the production API is connected.
  }
};

const makeReference = () =>
  `BBPAY-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

const event = (
  paymentId: string,
  type: PaymentEventType,
  status: PaymentStatus,
  timestamp: string,
  reference?: string,
  note?: string,
): PaymentEvent => ({
  id: crypto.randomUUID(),
  paymentId,
  type,
  status,
  timestamp,
  ...(reference ? { reference } : {}),
  ...(note ? { note } : {}),
});

const validTransitions: Record<PaymentStatus, PaymentStatus[]> = {
  pending: ["processing", "successful", "failed", "cancelled"],
  processing: ["successful", "failed", "cancelled"],
  successful: ["refunded"],
  failed: ["processing"],
  cancelled: [],
  refunded: [],
};

export const paymentService = {
  async createPayment(payload: CreatePaymentPayload): Promise<PaymentIntent> {
    const timestamp = now();
    const id = crypto.randomUUID();
    const reference = makeReference();
    const payment: PaymentIntent = {
      id,
      orderId: payload.orderId,
      amount: payload.amount,
      currency: "GHS",
      method: payload.method,
      provider: payload.provider,
      status: "pending",
      reference,
      events: [event(id, "created", "pending", timestamp, reference, "Payment initiated")],
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    writePayments([payment, ...readPayments()]);
    return payment;
  },

  getPayment(paymentId: string): PaymentIntent | null {
    return readPayments().find((payment) => payment.id === paymentId) ?? null;
  },

  getPaymentByOrder(orderId: string): PaymentIntent | null {
    return readPayments().find((payment) => payment.orderId === orderId) ?? null;
  },

  listPayments(orderId?: string): PaymentIntent[] {
    const payments = readPayments();
    return orderId ? payments.filter((payment) => payment.orderId === orderId) : payments;
  },

  async updateStatus(
    paymentId: string,
    status: PaymentStatus,
    note?: string,
    reference?: string,
  ): Promise<PaymentIntent | null> {
    const payments = readPayments();
    const index = payments.findIndex((payment) => payment.id === paymentId);
    if (index < 0) return null;

    const current = payments[index];
    if (current.status !== status && !validTransitions[current.status].includes(status)) return null;

    const timestamp = now();
    const updated: PaymentIntent = {
      ...current,
      status,
      reference: reference ?? current.reference,
      events: [
        ...(current.events ?? []),
        event(paymentId, status, status, timestamp, reference ?? current.reference, note),
      ],
      updatedAt: timestamp,
    };

    payments[index] = updated;
    writePayments(payments);
    return updated;
  },

  async verifyPayment(paymentId: string): Promise<PaymentIntent | null> {
    return this.getPayment(paymentId);
  },

  async confirmPayment(
    paymentId: string,
    reference?: string,
  ): Promise<PaymentIntent | null> {
    return this.updateStatus(paymentId, "successful", "Payment confirmed", reference);
  },

  async failPayment(paymentId: string, note = "Payment failed"): Promise<PaymentIntent | null> {
    return this.updateStatus(paymentId, "failed", note);
  },

  async cancelPayment(paymentId: string): Promise<PaymentIntent | null> {
    return this.updateStatus(paymentId, "cancelled", "Payment cancelled");
  },

  async refundPayment(paymentId: string): Promise<PaymentIntent | null> {
    return this.updateStatus(paymentId, "refunded", "Payment refunded");
  },
};

export default paymentService;

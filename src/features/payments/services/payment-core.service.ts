import { ledgerService } from "./ledger.service";
import type {
  CreateCorePaymentPayload,
  CorePaymentIntent,
  CorePaymentProvider,
  CorePaymentStatus,
} from "../types/payment-core.types";

const PAYMENTS_KEY = "bredabuy:payments:core";
const EVENTS_KEY = "bredabuy:payments:events";
const now = () => new Date().toISOString();

const read = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* server persistence later */ }
};

const providerFor = (method: CreateCorePaymentPayload["method"]): CorePaymentProvider => {
  if (method === "mobile-money") return "momo";
  if (method === "card") return "card-network";
  if (method === "bank-transfer") return "bank";
  return "internal";
};

const feeFor = (amount: number, method: CreateCorePaymentPayload["method"]) => {
  if (method === "cash-on-delivery") return 0;
  return Number((amount * 0.01).toFixed(2));
};

const appendEvent = (payment: CorePaymentIntent, status: CorePaymentStatus) => {
  const events = read<Array<{ id: string; paymentId: string; status: CorePaymentStatus; reference: string; createdAt: string }>>(EVENTS_KEY, []);
  write(EVENTS_KEY, [{ id: crypto.randomUUID(), paymentId: payment.id, status, reference: payment.reference, createdAt: now() }, ...events]);
};

export const paymentCoreService = {
  quote(amount: number, method: CreateCorePaymentPayload["method"]) {
    const fee = feeFor(amount, method);
    return { amount, fee, total: Number((amount + fee).toFixed(2)), currency: "GHS" as const };
  },

  create(payload: CreateCorePaymentPayload): CorePaymentIntent {
    if (payload.amount <= 0) throw new Error("Payment amount must be greater than zero");
    const idempotencyKey = payload.idempotencyKey?.trim() || crypto.randomUUID();
    const existing = read<CorePaymentIntent[]>(PAYMENTS_KEY, []).find((item) => item.idempotencyKey === idempotencyKey);
    if (existing) return existing;

    const createdAt = now();
    const fee = feeFor(payload.amount, payload.method);
    const payment: CorePaymentIntent = {
      id: crypto.randomUUID(),
      orderId: payload.orderId,
      amount: payload.amount,
      fee,
      total: Number((payload.amount + fee).toFixed(2)),
      currency: "GHS",
      method: payload.method,
      provider: payload.provider ?? providerFor(payload.method),
      status: "pending",
      reference: `BBPAY-${Date.now().toString(36).toUpperCase()}`,
      idempotencyKey,
      customerEmail: payload.email,
      customerPhone: payload.phoneNumber,
      createdAt,
      updatedAt: createdAt,
    };
    write(PAYMENTS_KEY, [payment, ...read<CorePaymentIntent[]>(PAYMENTS_KEY, [])]);
    appendEvent(payment, "pending");
    return payment;
  },

  updateStatus(paymentId: string, status: CorePaymentStatus): CorePaymentIntent {
    const payments = read<CorePaymentIntent[]>(PAYMENTS_KEY, []);
    const payment = payments.find((item) => item.id === paymentId);
    if (!payment) throw new Error("Payment intent not found");

    const updated = { ...payment, status, updatedAt: now() };
    write(PAYMENTS_KEY, payments.map((item) => item.id === paymentId ? updated : item));
    appendEvent(updated, status);

    if (status === "successful" && payment.status !== "successful") {
      ledgerService.post({
        reference: payment.reference,
        type: "payment",
        status: "posted",
        entries: [
          { id: crypto.randomUUID(), transactionId: "pending", accountId: "cash-clearing", direction: "debit", amount: payment.total, currency: "GHS", description: `Payment ${payment.reference}`, createdAt: now() },
          { id: crypto.randomUUID(), transactionId: "pending", accountId: "customer-payments", direction: "credit", amount: payment.amount, currency: "GHS", description: `Customer payment for ${payment.orderId}`, createdAt: now() },
          ...(payment.fee > 0 ? [{ id: crypto.randomUUID(), transactionId: "pending", accountId: "platform-revenue", direction: "credit" as const, amount: payment.fee, currency: "GHS" as const, description: `Payment fee for ${payment.reference}`, createdAt: now() }] : []),
        ],
      });
    }
    return updated;
  },

  get(paymentId: string) {
    return read<CorePaymentIntent[]>(PAYMENTS_KEY, []).find((item) => item.id === paymentId) ?? null;
  },

  getByOrder(orderId: string) {
    return read<CorePaymentIntent[]>(PAYMENTS_KEY, []).filter((item) => item.orderId === orderId);
  },

  list() {
    return read<CorePaymentIntent[]>(PAYMENTS_KEY, []);
  },

  events(paymentId?: string) {
    const events = read<Array<{ id: string; paymentId: string; status: CorePaymentStatus; reference: string; createdAt: string }>>(EVENTS_KEY, []);
    return paymentId ? events.filter((event) => event.paymentId === paymentId) : events;
  },
};

export default paymentCoreService;

import type {
  LedgerAccount,
  LedgerEntry,
  LedgerTransaction,
} from "../types/payment-ledger.types";

const ACCOUNTS_KEY = "bredabuy:payment-ledger:accounts";
const TRANSACTIONS_KEY = "bredabuy:payment-ledger:transactions";

const read = <T>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence becomes server-backed in production.
  }
};

const now = () => new Date().toISOString();

const defaultAccounts = (): LedgerAccount[] => [
  { id: "cash-clearing", name: "Payment Clearing", type: "cash-clearing", currency: "GHS", active: true, createdAt: now() },
  { id: "customer-payments", name: "Customer Payments", type: "customer-payment", currency: "GHS", active: true, createdAt: now() },
  { id: "seller-payables", name: "Seller Payables", type: "seller-payable", currency: "GHS", active: true, createdAt: now() },
  { id: "platform-revenue", name: "Platform Revenue", type: "platform-revenue", currency: "GHS", active: true, createdAt: now() },
  { id: "refunds-payable", name: "Refunds Payable", type: "refunds-payable", currency: "GHS", active: true, createdAt: now() },
];

const accounts = () => {
  const existing = read<LedgerAccount[]>(ACCOUNTS_KEY, []);
  if (existing.length) return existing;
  const created = defaultAccounts();
  write(ACCOUNTS_KEY, created);
  return created;
};

export const ledgerService = {
  getAccounts(): LedgerAccount[] {
    return accounts();
  },

  post(transaction: Omit<LedgerTransaction, "id" | "createdAt">): LedgerTransaction {
    const entries = transaction.entries;
    const debits = entries.filter((entry) => entry.direction === "debit").reduce((sum, entry) => sum + entry.amount, 0);
    const credits = entries.filter((entry) => entry.direction === "credit").reduce((sum, entry) => sum + entry.amount, 0);

    if (Math.abs(debits - credits) > 0.000001) {
      throw new Error("Ledger transaction is not balanced");
    }

    for (const entry of entries) {
      if (entry.amount <= 0) throw new Error("Ledger entries must be positive");
      if (!accounts().some((account) => account.id === entry.accountId && account.active)) {
        throw new Error(`Unknown ledger account: ${entry.accountId}`);
      }
    }

    const posted: LedgerTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: now(),
      entries: entries.map((entry) => ({ ...entry, id: entry.id || crypto.randomUUID() })),
    };

    const transactions = read<LedgerTransaction[]>(TRANSACTIONS_KEY, []);
    write(TRANSACTIONS_KEY, [posted, ...transactions]);
    return posted;
  },

  list(): LedgerTransaction[] {
    return read<LedgerTransaction[]>(TRANSACTIONS_KEY, []);
  },
};

export default ledgerService;

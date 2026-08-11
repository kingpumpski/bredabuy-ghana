export type LedgerAccountType =
  | "cash-clearing"
  | "customer-payment"
  | "seller-payable"
  | "platform-revenue"
  | "refunds-payable";

export interface LedgerAccount {
  id: string;
  name: string;
  type: LedgerAccountType;
  currency: "GHS";
  active: boolean;
  createdAt: string;
}

export interface LedgerEntry {
  id: string;
  transactionId: string;
  accountId: string;
  direction: "debit" | "credit";
  amount: number;
  currency: "GHS";
  description: string;
  createdAt: string;
}

export interface LedgerTransaction {
  id: string;
  reference: string;
  type: "payment" | "fee" | "refund" | "settlement" | "adjustment";
  status: "posted" | "reversed";
  entries: LedgerEntry[];
  createdAt: string;
}

export interface PaymentFee {
  amount: number;
  rate?: number;
  fixed?: number;
  currency: "GHS";
  description: string;
}

export type WalletTransactionType = "top-up" | "purchase" | "refund" | "withdrawal" | "adjustment";
export type WalletTransactionStatus = "pending" | "completed" | "failed" | "reversed";
export interface WalletAccount { id:string; customerId:string; currency:"GHS"; availableBalance:number; createdAt:string; updatedAt:string; }
export interface WalletTransaction { id:string; walletId:string; type:WalletTransactionType; status:WalletTransactionStatus; amount:number; reference:string; description:string; orderId?:string; createdAt:string; }

import paymentTransactionService from "./payment-transaction.service";

export type PaymentRecoveryAction = "resume" | "retry" | "unavailable";
export interface PaymentRecoveryResult { action:PaymentRecoveryAction; reference:string; transaction:ReturnType<typeof paymentTransactionService.findByReference>; reason?:string; }

export const paymentRecoveryService={
 recover(reference:string):PaymentRecoveryResult {
  const transaction=paymentTransactionService.findByReference(reference);
  if(!transaction)return {action:"unavailable",reference,transaction:null,reason:"Payment transaction was not found."};
  if(transaction.status==="successful")return {action:"unavailable",reference,transaction,reason:"Payment has already been completed."};
  if(transaction.status==="pending")return {action:"resume",reference,transaction};
  if(transaction.status==="failed"||transaction.status==="cancelled")return {action:"retry",reference,transaction};
  return {action:"unavailable",reference,transaction,reason:"Payment cannot be recovered from its current state."};
 },
 canRetry(reference:string){const tx=paymentTransactionService.findByReference(reference);return Boolean(tx&&["failed","cancelled"].includes(tx.status));},
 get(reference:string){return paymentTransactionService.findByReference(reference)}
};
export default paymentRecoveryService;

import walletPurchaseService from "@/features/wallet/services/wallet-purchase.service";
import paymentTransactionService from "@/features/payments/services/payment-transaction.service";
import type { PaymentMethod } from "@/features/payments/types/payment.types";

export interface CheckoutPaymentRequest { customerId:string; orderId:string; amount:number; method:PaymentMethod; }
export const checkoutPaymentService={
 authorize(input:CheckoutPaymentRequest){
  const reference=`BBPAY-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  if(input.method==="card"||input.method==="mobile-money"||input.method==="bank-transfer"){
   const tx=paymentTransactionService.create({reference,operation:"collect",amount:input.amount,currency:"GHS",status:"pending",orderId:input.orderId});
   return {status:"pending" as const,reference,transaction:tx};
  }
  if(input.method==="cash-on-delivery") return {status:"pending" as const,reference,transaction:paymentTransactionService.create({reference,operation:"collect",amount:input.amount,currency:"GHS",status:"pending",orderId:input.orderId})};
  return {status:"failed" as const,reference,transaction:null};
 },
 authorizeWallet(input:{customerId:string;orderId:string;amount:number;reference:string}){return walletPurchaseService.authorize(input)}
};
export default checkoutPaymentService;

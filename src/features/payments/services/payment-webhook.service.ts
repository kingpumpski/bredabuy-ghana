import paymentTransactionService from "./payment-transaction.service";
import orderPaymentSyncService from "./order-payment-sync.service";

export interface PaymentWebhookEvent { eventId:string; reference:string; status:"successful"|"failed"|"cancelled"; providerReference?:string; amount?:number; receivedAt:string; }
const KEY="bredabuy:payment:webhook-events";
const read=():PaymentWebhookEvent[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as PaymentWebhookEvent[]}catch{return[]}};
const write=(v:PaymentWebhookEvent[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const paymentWebhookService={
 process(event:PaymentWebhookEvent){
  const seen=read().find(x=>x.eventId===event.eventId);if(seen)return {accepted:true,duplicate:true,transaction:paymentTransactionService.findByReference(event.reference)};
  const tx=paymentTransactionService.findByReference(event.reference);if(!tx)return {accepted:false,duplicate:false,reason:"Unknown payment reference."};
  const updated=paymentTransactionService.update(event.reference,{status:event.status,providerReference:event.providerReference});
  if(!updated)return {accepted:false,duplicate:false,reason:"Unable to update payment transaction."};
  write([event,...read()]);
  const orderSync=updated.orderId?orderPaymentSyncService.sync(updated.orderId,event.reference):null;
  return {accepted:true,duplicate:false,transaction:updated,order:orderSync};
 },
 list(){return read()}
};
export default paymentWebhookService;

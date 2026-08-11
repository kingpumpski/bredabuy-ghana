import paymentTransactionService from "./payment-transaction.service";

export interface PaymentWebhookEvent { eventId:string; reference:string; status:"successful"|"failed"|"cancelled"; providerReference?:string; amount?:number; receivedAt:string; }
const KEY="bredabuy:payment:webhook-events";
const read=():PaymentWebhookEvent[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as PaymentWebhookEvent[]}catch{return[]}};
const write=(v:PaymentWebhookEvent[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
export const paymentWebhookService={
 process(event:PaymentWebhookEvent){
  const seen=read().find(x=>x.eventId===event.eventId);if(seen)return {accepted:true,duplicate:true,transaction:paymentTransactionService.findByReference(event.reference)};
  const tx=paymentTransactionService.findByReference(event.reference);if(!tx)return {accepted:false,duplicate:false,reason:"Unknown payment reference."};
  if(tx.status==="successful"&&event.status==="successful"){write([event,...read()]);return {accepted:true,duplicate:false,transaction:tx};}
  const updated=paymentTransactionService.update(event.reference,{status:event.status,providerReference:event.providerReference});
  write([event,...read()]);
  return {accepted:Boolean(updated),duplicate:false,transaction:updated};
 },
 list(){return read()}
};
export default paymentWebhookService;

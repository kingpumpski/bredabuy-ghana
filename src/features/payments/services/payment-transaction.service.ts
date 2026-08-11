import type { PaymentAdapterStatus } from "../types/payment-adapter.types";

export interface PaymentTransaction { id:string; reference:string; operation:"collect"|"verify"|"refund"; amount:number; currency:"GHS"; status:PaymentAdapterStatus; provider?:string; providerReference?:string; orderId?:string; walletId?:string; createdAt:string; updatedAt:string; }
const KEY="bredabuy:payment:transactions";
const read=():PaymentTransaction[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as PaymentTransaction[]}catch{return[]}};
const write=(v:PaymentTransaction[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const paymentTransactionService={
 findByReference(reference:string){return read().find(x=>x.reference===reference)??null},
 create(input:Omit<PaymentTransaction,"id"|"createdAt"|"updatedAt">){const existing=this.findByReference(input.reference);if(existing)return existing;const now=new Date().toISOString();const tx:PaymentTransaction={...input,id:crypto.randomUUID(),createdAt:now,updatedAt:now};write([tx,...read()]);return tx},
 update(reference:string,patch:Partial<Omit<PaymentTransaction,"id"|"reference"|"createdAt">>){let updated:PaymentTransaction|null=null;const now=new Date().toISOString();write(read().map(x=>x.reference===reference?(updated={...x,...patch,updatedAt:now}):x));return updated},
 list(){return read()}
};
export default paymentTransactionService;

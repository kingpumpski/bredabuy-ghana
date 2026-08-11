import walletService from "./wallet.service";

export type WalletTopUpMethod = "mobile-money" | "card" | "bank-transfer";
export type WalletTopUpStatus = "created" | "awaiting-payment" | "confirmed" | "failed" | "cancelled";
export interface WalletTopUpIntent { id:string; walletId:string; customerId:string; amount:number; currency:"GHS"; method:WalletTopUpMethod; status:WalletTopUpStatus; providerReference?:string; createdAt:string; updatedAt:string; }
const KEY="bredabuy:wallet:topups";
const read=():WalletTopUpIntent[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as WalletTopUpIntent[]}catch{return[]}};
const write=(v:WalletTopUpIntent[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
export const walletTopUpService={
 create(input:{customerId:string;amount:number;method:WalletTopUpMethod}){if(input.amount<=0)return null;const wallet=walletService.getOrCreate(input.customerId);const now=new Date().toISOString();const intent:WalletTopUpIntent={id:crypto.randomUUID(),walletId:wallet.id,customerId:input.customerId,amount:input.amount,currency:"GHS",method:input.method,status:"awaiting-payment",createdAt:now,updatedAt:now};write([intent,...read()]);return intent},
 confirm(id:string,providerReference:string){const items=read();const index=items.findIndex(x=>x.id===id);if(index<0)return null;const intent=items[index];if(intent.status!=="awaiting-payment")return intent;const tx=walletService.record(intent.walletId,{type:"top-up",amount:intent.amount,description:`Wallet top-up via ${intent.method}`,status:"completed"});if(!tx)return null;const updated={...intent,status:"confirmed" as const,providerReference,updatedAt:new Date().toISOString()};items[index]=updated;write(items);return updated},
 fail(id:string){return this.updateStatus(id,"failed")},
 cancel(id:string){return this.updateStatus(id,"cancelled")},
 list(customerId?:string){return read().filter(x=>!customerId||x.customerId===customerId)},
 updateStatus(id:string,status:WalletTopUpStatus){let updated:WalletTopUpIntent|null=null;write(read().map(x=>x.id===id?(updated={...x,status,updatedAt:new Date().toISOString()}):x));return updated}
};
export default walletTopUpService;

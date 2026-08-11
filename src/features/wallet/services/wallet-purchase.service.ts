import walletService from "./wallet.service";

export interface WalletPurchase { id:string; walletId:string; customerId:string; orderId:string; reference:string; amount:number; currency:"GHS"; status:"completed"|"failed"; transactionId?:string; createdAt:string; }
const KEY="bredabuy:wallet:purchases";
const read=():WalletPurchase[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as WalletPurchase[]}catch{return[]}};
const write=(v:WalletPurchase[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const walletPurchaseService={
 authorize(input:{customerId:string;orderId:string;amount:number;reference:string}){
  if(input.amount<=0)return null;
  const existing=read().find(x=>x.reference===input.reference);if(existing)return existing;
  const wallet=walletService.getOrCreate(input.customerId);
  if(wallet.availableBalance<input.amount){const failed:WalletPurchase={id:crypto.randomUUID(),walletId:wallet.id,customerId:input.customerId,orderId:input.orderId,reference:input.reference,amount:input.amount,currency:"GHS",status:"failed",createdAt:new Date().toISOString()};write([failed,...read()]);return failed;}
  const tx=walletService.record(wallet.id,{type:"purchase",amount:input.amount,description:`Wallet payment for order ${input.orderId}`,orderId:input.orderId,status:"completed"});
  if(!tx)return null;
  const purchase:WalletPurchase={id:crypto.randomUUID(),walletId:wallet.id,customerId:input.customerId,orderId:input.orderId,reference:input.reference,amount:input.amount,currency:"GHS",status:"completed",transactionId:tx.id,createdAt:new Date().toISOString()};write([purchase,...read()]);return purchase;
 },
 getByReference(reference:string){return read().find(x=>x.reference===reference)??null},
 list(customerId?:string){return read().filter(x=>!customerId||x.customerId===customerId)}
};
export default walletPurchaseService;

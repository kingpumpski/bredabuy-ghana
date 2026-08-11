import type { WalletAccount, WalletTransaction, WalletTransactionStatus, WalletTransactionType } from "../types/wallet.types";

const ACCOUNT_KEY="bredabuy:wallet:accounts";
const TX_KEY="bredabuy:wallet:transactions";
const readAccounts=():WalletAccount[]=>{try{return JSON.parse(localStorage.getItem(ACCOUNT_KEY)??"[]") as WalletAccount[]}catch{return[]}};
const readTx=():WalletTransaction[]=>{try{return JSON.parse(localStorage.getItem(TX_KEY)??"[]") as WalletTransaction[]}catch{return[]}};
const write=(a:WalletAccount[],t:WalletTransaction[])=>{try{localStorage.setItem(ACCOUNT_KEY,JSON.stringify(a));localStorage.setItem(TX_KEY,JSON.stringify(t))}catch {
    /* Non-fatal local persistence failure. */
  }};
const reference=()=>`WAL-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
export const walletService={
 getOrCreate(customerId:string){const accounts=readAccounts();const existing=accounts.find(x=>x.customerId===customerId);if(existing)return existing;const now=new Date().toISOString();const account:WalletAccount={id:crypto.randomUUID(),customerId,currency:"GHS",availableBalance:0,createdAt:now,updatedAt:now};write([account,...accounts],readTx());return account},
 getTransactions(walletId:string){return readTx().filter(x=>x.walletId===walletId)},
 record(walletId:string,input:{type:WalletTransactionType;amount:number;description:string;status?:WalletTransactionStatus;orderId?:string}){if(input.amount<=0)return null;const accounts=readAccounts();const wallet=accounts.find(x=>x.id===walletId);if(!wallet)return null;if(input.type==="purchase"||input.type==="withdrawal"){if(wallet.availableBalance<input.amount)return null;wallet.availableBalance-=input.amount}else if(input.type==="top-up"||input.type==="refund"||input.type==="adjustment"){wallet.availableBalance+=input.amount}else return null;wallet.updatedAt=new Date().toISOString();const tx:WalletTransaction={id:crypto.randomUUID(),walletId,type:input.type,status:input.status??"completed",amount:input.amount,reference:reference(),description:input.description,orderId:input.orderId,createdAt:wallet.updatedAt};write(accounts,[tx,...readTx()]);return tx},
 getBalance(walletId:string){return readAccounts().find(x=>x.id===walletId)?.availableBalance??0}
};
export default walletService;

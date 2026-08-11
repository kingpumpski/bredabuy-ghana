import paymentTransactionService from "./payment-transaction.service";

export type ReconciliationResult = "matched" | "amount-mismatch" | "unknown-reference" | "status-mismatch";
export interface ReconciliationRecord { id:string; reference:string; providerReference:string; result:ReconciliationResult; internalAmount:number; providerAmount:number; providerStatus:"successful"|"failed"|"cancelled"; note?:string; reconciledAt:string; }
const KEY="bredabuy:payment:reconciliation";
const read=():ReconciliationRecord[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReconciliationRecord[]}catch{return[]}};
const write=(v:ReconciliationRecord[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const paymentReconciliationService={
 reconcile(input:{reference:string;providerReference:string;providerAmount:number;providerStatus:"successful"|"failed"|"cancelled";note?:string}){
  const tx=paymentTransactionService.findByReference(input.reference);
  const now=new Date().toISOString();
  if(!tx){const r:ReconciliationRecord={id:crypto.randomUUID(),reference:input.reference,providerReference:input.providerReference,result:"unknown-reference",internalAmount:0,providerAmount:input.providerAmount,providerStatus:input.providerStatus,note:input.note,reconciledAt:now};write([r,...read()]);return r;}
  let result:ReconciliationResult="matched";
  if(tx.amount!==input.providerAmount) result="amount-mismatch";
  else if(tx.status!==input.providerStatus) result="status-mismatch";
  const r:ReconciliationRecord={id:crypto.randomUUID(),reference:input.reference,providerReference:input.providerReference,result,internalAmount:tx.amount,providerAmount:input.providerAmount,providerStatus:input.providerStatus,note:input.note,reconciledAt:now};write([r,...read()]);
  return r;
 },
 list(result?:ReconciliationResult){return read().filter(x=>!result||x.result===result)},
 getUnresolved(){return read().filter(x=>x.result!=="matched")}
};
export default paymentReconciliationService;

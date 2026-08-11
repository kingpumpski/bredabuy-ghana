import paymentReconciliationService, { type ReconciliationResult } from "./payment-reconciliation.service";
import paymentTransactionService from "./payment-transaction.service";

export type ReconciliationResolution = "confirmed" | "reversed" | "escalated";
export interface ReconciliationResolutionRecord { id:string; reconciliationId:string; reference:string; resolution:ReconciliationResolution; note:string; resolvedBy:string; resolvedAt:string; }
const KEY="bredabuy:payment:reconciliation-resolutions";
const read=():ReconciliationResolutionRecord[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReconciliationResolutionRecord[]}catch{return[]}};
const write=(v:ReconciliationResolutionRecord[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const paymentReconciliationQueueService={
 getQueue(){return paymentReconciliationService.getUnresolved().filter(x=>!read().some(r=>r.reconciliationId===x.id&&r.resolution!=="escalated"))},
 resolve(input:{reconciliationId:string;resolution:ReconciliationResolution;note:string;resolvedBy:string}){
  const record=paymentReconciliationService.list().find(x=>x.id===input.reconciliationId);if(!record)return null;
  const resolution:ReconciliationResolutionRecord={id:crypto.randomUUID(),reconciliationId:record.id,reference:record.reference,resolution:input.resolution,note:input.note,resolvedBy:input.resolvedBy,resolvedAt:new Date().toISOString()};
  write([resolution,...read()]);
  if(input.resolution==="reversed") paymentTransactionService.update(record.reference,{status:"failed"});
  if(input.resolution==="confirmed"&&record.result==="amount-mismatch") paymentTransactionService.update(record.reference,{amount:record.providerAmount,status:record.providerStatus});
  if(input.resolution==="confirmed"&&record.result==="status-mismatch") paymentTransactionService.update(record.reference,{status:record.providerStatus});
  return resolution;
 },
 listResolutions(){return read()},
 listByResult(result:ReconciliationResult){return paymentReconciliationService.list(result)}
};
export default paymentReconciliationQueueService;

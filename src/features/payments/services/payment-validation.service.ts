import paymentTransactionService from "./payment-transaction.service";

export interface PaymentCallbackInput { reference:string; status:"successful"|"failed"|"cancelled"; amount:number; currency:"GHS"; providerReference?:string; signature?:string; }
export interface PaymentValidationResult { valid:boolean; reason?:string; transaction?:ReturnType<typeof paymentTransactionService.findByReference>; }

export const paymentValidationService={
 validate(input:PaymentCallbackInput):PaymentValidationResult {
  const tx=paymentTransactionService.findByReference(input.reference);
  if(!tx)return {valid:false,reason:"Unknown payment reference."};
  if(input.currency!=="GHS")return {valid:false,reason:"Unsupported payment currency."};
  if(input.amount!==tx.amount)return {valid:false,reason:"Payment amount does not match the transaction."};
  if(input.status==="successful"&&tx.status==="failed")return {valid:false,reason:"A failed transaction cannot be marked successful without reconciliation."};
  return {valid:true,transaction:tx};
 },
 validateSignature(_payload:string,_signature?:string){
  // Production signature verification belongs in the server-side adapter/webhook boundary.
  // Never treat a client-side signature check as proof of payment authenticity.
  return Boolean(_signature);
 }
};
export default paymentValidationService;

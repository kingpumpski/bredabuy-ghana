import returnInspectionService from "@/features/logistics/services/return-inspection.service";
import returnShipmentService from "@/features/logistics/services/return-shipment.service";

export type RefundStatus = "requested" | "approved" | "rejected" | "processing" | "completed" | "failed";
export type RefundDestination = "wallet" | "original-method";
export interface Refund { id:string; orderId:string; returnId:string; amount:number; currency:"GHS"; destination:RefundDestination; status:RefundStatus; reason:string; createdAt:string; updatedAt:string; }
const KEY="bredabuy:refunds";
const read=():Refund[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as Refund[]}catch{return[]}};
const write=(v:Refund[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
export const refundService={
 list(orderId?:string){return read().filter(x=>!orderId||x.orderId===orderId)},
 request(input:{inspectionId:string;destination?:RefundDestination}){const inspection=returnInspectionService.list().find(x=>x.id===input.inspectionId);if(!inspection||!inspection.refundEligible||!inspection.refundAmount)return null;const returnRecord=returnShipmentService.list().find(x=>x.id===inspection.returnId);if(!returnRecord)return null;const now=new Date().toISOString();const refund:Refund={id:crypto.randomUUID(),orderId:returnRecord.orderId,returnId:returnRecord.id,amount:inspection.refundAmount,currency:"GHS",destination:input.destination??"wallet",status:"requested",reason:"Approved return inspection",createdAt:now,updatedAt:now};write([refund,...read()]);return refund;},
 updateStatus(id:string,status:RefundStatus){let updated:Refund|null=null;const now=new Date().toISOString();write(read().map(x=>x.id===id?(updated={...x,status,updatedAt:now}):x));return updated;}
};
export default refundService;

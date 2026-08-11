import returnShipmentService from "./return-shipment.service";

export type InspectionDecision = "accepted" | "rejected" | "partial";
export type InventoryDisposition = "restock" | "quarantine" | "damaged" | "dispose" | "return-to-seller";
export interface ReturnInspection { id:string; returnId:string; decision:InspectionDecision; disposition:InventoryDisposition; conditionNote:string; refundEligible:boolean; refundAmount?:number; inspectedBy?:string; inspectedAt:string; }
const KEY="bredabuy:return-inspections";
const read=():ReturnInspection[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReturnInspection[]}catch{return[]}};
const write=(v:ReturnInspection[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
export const returnInspectionService={
 list(returnId?:string){return read().filter(x=>!returnId||x.returnId===returnId)},
 inspect(input:Omit<ReturnInspection,"id"|"inspectedAt">){const request=returnShipmentService.list().find(x=>x.id===input.returnId);if(!request||request.status!=="received")return null;const item={...input,id:crypto.randomUUID(),inspectedAt:new Date().toISOString()};write([item,...read()]);return item},
 approveRefundEligibility(id:string,amount:number){let updated:ReturnInspection|null=null;write(read().map(x=>x.id===id?(updated={...x,refundEligible:true,refundAmount:amount}):x));return updated},
};
export default returnInspectionService;

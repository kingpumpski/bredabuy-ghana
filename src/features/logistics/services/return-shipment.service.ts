import shipmentService from "./shipment.service";

export type ReturnReason = "customer-request" | "failed-delivery" | "damaged" | "wrong-item" | "defective" | "other";
export type ReturnStatus = "requested" | "approved" | "in-transit" | "received" | "rejected" | "completed";
export interface ReturnShipment { id:string; shipmentId:string; orderId:string; orderNumber:string; reason:ReturnReason; note:string; status:ReturnStatus; createdAt:string; updatedAt:string; receivedAt?:string; }
const KEY="bredabuy:reverse-logistics";
const read=():ReturnShipment[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReturnShipment[]}catch{return[]}};
const write=(v:ReturnShipment[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch {
    /* Non-fatal local persistence failure. */
  }};
export const returnShipmentService={
 list(status?:ReturnStatus){return read().filter(x=>!status||x.status===status)},
 request(input:{shipmentId:string;reason:ReturnReason;note:string}){const shipment=shipmentService.getById(input.shipmentId);if(!shipment)return null;const now=new Date().toISOString();const item:ReturnShipment={id:crypto.randomUUID(),shipmentId:shipment.id,orderId:shipment.orderId,orderNumber:shipment.orderNumber,reason:input.reason,note:input.note,status:"requested",createdAt:now,updatedAt:now};write([item,...read()]);return item},
 updateStatus(id:string,status:ReturnStatus){let updated:ReturnShipment|null=null;const now=new Date().toISOString();write(read().map(x=>x.id===id?(updated={...x,status,updatedAt:now,receivedAt:status==="received"?now:x.receivedAt}):x));if(updated&&status==="in-transit")shipmentService.updateStatus(updated.shipmentId,"returned","Reverse logistics shipment in transit");return updated},
};
export default returnShipmentService;

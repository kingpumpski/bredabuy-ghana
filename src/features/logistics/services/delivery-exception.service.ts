import shipmentService from "./shipment.service";

export type DeliveryExceptionReason = "recipient-unavailable" | "invalid-address" | "phone-unreachable" | "access-restricted" | "refused" | "damaged-package" | "other";
export interface DeliveryException { id:string; shipmentId:string; reason:DeliveryExceptionReason; note:string; attempt:number; nextAction:"retry"|"return"; nextAttemptAt?:string; createdAt:string; resolvedAt?:string; }
const KEY="bredabuy:delivery-exceptions";
const read=():DeliveryException[]=>{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as DeliveryException[]}catch{return[]}};
const write=(v:DeliveryException[])=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch{}};
export const deliveryExceptionService={
 list(shipmentId?:string){return read().filter(x=>!shipmentId||x.shipmentId===shipmentId)},
 record(input:Omit<DeliveryException,"id"|"attempt"|"createdAt"|"resolvedAt">){const shipment=shipmentService.getById(input.shipmentId);if(!shipment)return null;const item:DeliveryException={...input,id:crypto.randomUUID(),attempt:shipment.deliveryAttempts,createdAt:new Date().toISOString()};write([item,...read()]);shipmentService.recordDeliveryFailure(shipment.id,input.note);return item},
 scheduleRetry(id:string,when:string){const items=read();const i=items.findIndex(x=>x.id===id);if(i<0)return null;items[i]={...items[i],nextAction:"retry",nextAttemptAt:when,resolvedAt:undefined};write(items);const shipment=shipmentService.getById(items[i].shipmentId);if(shipment)shipmentService.updateStatus(shipment.id,"out-for-delivery","Delivery retry scheduled");return items[i]},
 markReturn(id:string){const items=read();const i=items.findIndex(x=>x.id===id);if(i<0)return null;items[i]={...items[i],nextAction:"return",resolvedAt:new Date().toISOString()};write(items);const shipment=shipmentService.getById(items[i].shipmentId);if(shipment)shipmentService.updateStatus(shipment.id,"returned","Shipment marked for return");return items[i]},
};
export default deliveryExceptionService;

import { useMemo, useState } from "react";
import { CheckCircle2, PackageCheck, RefreshCw, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import fulfilmentService from "@/features/fulfilment/services/fulfilment.service";
import type { FulfilmentRecord, FulfilmentStatus } from "@/features/fulfilment/types/fulfilment.types";
import { toast } from "@/hooks/use-toast";

const labels: Record<FulfilmentStatus, string> = {
  "awaiting-payment": "Awaiting payment", "awaiting-confirmation": "Awaiting confirmation", picking: "Picking", packed: "Packed", "ready-for-dispatch": "Ready for dispatch", dispatched: "Dispatched", completed: "Completed", cancelled: "Cancelled",
};

const next: Partial<Record<FulfilmentStatus, FulfilmentStatus>> = { "awaiting-confirmation": "picking", picking: "packed", packed: "ready-for-dispatch", dispatched: "completed" };

const carriers = [
  { id: "bredabuy-logistics", name: "BredaBuy Logistics" },
  { id: "partner-courier", name: "Partner Courier" },
];

export default function SellerFulfilment() {
  const { user } = useAuth();
  const [records, setRecords] = useState<FulfilmentRecord[]>(() => (user ? fulfilmentService.list(user.id) : []));
  const [carrier, setCarrier] = useState(carriers[0].id);
  const refresh = () => setRecords(user ? fulfilmentService.list(user.id) : []);
  const summary = useMemo(() => fulfilmentService.summary(user?.id), [records, user?.id]);
  const advance = (record: FulfilmentRecord) => {
    const target = next[record.status];
    if (!target) return;
    const updated = fulfilmentService.updateStatus(record.id, target);
    if (updated) { setRecords((items) => items.map((x) => x.id === updated.id ? updated : x)); toast({ title: "Fulfilment updated", description: `${record.orderNumber} is now ${labels[target]}.` }); }
    else toast({ title: "Action unavailable", description: "Payment must be confirmed before fulfilment can advance." });
  };
  const dispatch = (record: FulfilmentRecord) => {
    const selectedCarrier = carriers.find((item) => item.id === carrier) ?? carriers[0];
    const estimated = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const result = fulfilmentService.dispatchWithShipment(record.id, selectedCarrier, estimated);
    if (!result) {
      toast({ title: "Dispatch unavailable", description: "The order must be paid and ready for dispatch before a shipment can be created." });
      return;
    }
    refresh();
    toast({ title: "Shipment created", description: `${record.orderNumber} dispatched with tracking ${result.trackingNumber}.` });
  };
  return <div className="space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-muted-foreground">Seller operations</p><h1 className="text-2xl font-bold">Fulfilment</h1><p className="mt-1 text-sm text-muted-foreground">Pick, pack and prepare paid orders for dispatch.</p></div><Button variant="outline" onClick={refresh}><RefreshCw className="mr-2 h-4 w-4"/>Refresh</Button></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[["Awaiting payment", summary.awaitingPayment],["Picking", summary.picking],["Ready", summary.readyForDispatch],["Completed", summary.completed]].map(([label,value]) => <Card key={label}><CardContent className="p-4"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></CardContent></Card>)}</div>
    {records.length === 0 ? <Card><CardContent className="py-16 text-center"><PackageCheck className="mx-auto mb-4 h-12 w-12 text-muted-foreground"/><h2 className="font-semibold">No fulfilment tasks</h2><p className="mt-1 text-sm text-muted-foreground">Paid seller orders will appear here.</p></CardContent></Card> : <div className="space-y-4">{records.map((record) => { const target = next[record.status]; return <Card key={record.id}><CardHeader className="border-b"><div className="flex items-center justify-between gap-3"><CardTitle className="text-base">{record.orderNumber}</CardTitle><Badge variant={record.status === "completed" ? "default" : record.status === "cancelled" ? "destructive" : "secondary"}>{labels[record.status]}</Badge></div></CardHeader><CardContent className="space-y-4 p-5"><div className="space-y-2">{record.items.map((item) => <div key={item.orderItemId} className="rounded-lg border p-3"><div className="flex justify-between gap-3"><div><p className="font-medium">{item.name}</p><p className="text-xs text-muted-foreground">SKU: {item.sku} · Qty: {item.quantity}</p>{item.attributes && <div className="mt-1 flex flex-wrap gap-1">{Object.entries(item.attributes).map(([key,value]) => <Badge key={key} variant="outline" className="text-[10px]">{key}: {value}</Badge>)}</div>}</div><span className="font-semibold">×{item.quantity}</span></div></div>)}</div><div className="rounded-lg bg-muted/40 p-3 text-sm"><p>Payment: <strong>{record.paymentConfirmed ? "Confirmed" : "Not confirmed"}</strong></p><p className="mt-1 text-muted-foreground">Last updated {new Date(record.updatedAt).toLocaleString("en-GH")}</p></div>{target && <Button onClick={() => advance(record)} disabled={!record.paymentConfirmed}><>{target === "ready-for-dispatch" ? <PackageCheck className="mr-2 h-4 w-4"/> : <CheckCircle2 className="mr-2 h-4 w-4"/>}Mark {labels[target]}</></Button>}{record.status === "ready-for-dispatch" && <div className="rounded-lg border bg-background p-4"><div className="mb-3"><p className="font-medium">Dispatch shipment</p><p className="text-sm text-muted-foreground">Create a tracking number and hand the order to a delivery partner.</p></div><div className="flex flex-col gap-3 sm:flex-row sm:items-end"><label className="flex-1 text-sm font-medium">Carrier<select className="mt-1 flex h-10 w-full rounded-md border bg-background px-3 text-sm font-normal" value={carrier} onChange={(event) => setCarrier(event.target.value)}>{carriers.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><Button onClick={() => dispatch(record)} disabled={!record.paymentConfirmed}><Truck className="mr-2 h-4 w-4"/>Create shipment & dispatch</Button></div></div>}{record.status === "dispatched" && <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3 text-sm"><Truck className="h-4 w-4"/><span>Shipment dispatched. Customer tracking is now available.</span></div>}</CardContent></Card>; })}</div>}
  </div>;
}

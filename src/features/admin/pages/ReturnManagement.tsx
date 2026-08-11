import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, Clock3, PackageCheck, Search, Warehouse, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import returnService from "@/features/returns/services/return.service";
import {
  RETURN_DISPOSITION_LABELS,
  RETURN_REASON_LABELS,
  RETURN_STATUS_LABELS,
  type ReturnInventoryDisposition,
  type ReturnRequest,
  type ReturnStatus,
} from "@/features/returns/types/return.types";

const statusTone: Record<ReturnStatus, "default" | "secondary" | "destructive" | "outline"> = {
  requested: "secondary",
  approved: "default",
  rejected: "destructive",
  "item-received": "default",
  "refund-pending": "secondary",
  refunded: "default",
  cancelled: "outline",
};

const ReturnManagement = () => {
  const [requests, setRequests] = useState<ReturnRequest[]>(() => returnService.list());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ReturnStatus>("all");
  const [dispositions, setDispositions] = useState<Record<string, ReturnInventoryDisposition>>({});
  const [reconciliationErrors, setReconciliationErrors] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return requests.filter((request) => {
      const matchesStatus = status === "all" || request.status === status;
      const matchesQuery = !normalized ||
        request.orderNumber.toLowerCase().includes(normalized) ||
        request.id.toLowerCase().includes(normalized) ||
        request.items.some((item) => item.name.toLowerCase().includes(normalized) || item.sku.toLowerCase().includes(normalized));
      return matchesStatus && matchesQuery;
    });
  }, [requests, query, status]);

  const changeStatus = (id: string, nextStatus: ReturnStatus) => {
    const updated = returnService.updateStatus(id, nextStatus);
    if (updated) setRequests((current) => current.map((item) => item.id === id ? updated : item));
  };

  const reconcile = (request: ReturnRequest) => {
    try {
      const disposition = dispositions[request.id] ?? "restock";
      const updated = returnService.reconcileInventory(request.id, disposition);
      if (updated) {
        setRequests((current) => current.map((item) => item.id === request.id ? updated : item));
        setReconciliationErrors((current) => ({ ...current, [request.id]: "" }));
      }
    } catch (error) {
      setReconciliationErrors((current) => ({
        ...current,
        [request.id]: error instanceof Error ? error.message : "Inventory reconciliation failed.",
      }));
    }
  };

  const counts = useMemo(() => requests.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {}), [requests]);

  return (
    <>
      <Helmet><title>Returns Management | BredaBuy</title></Helmet>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Operations</p>
            <h1 className="text-3xl font-bold tracking-tight">Returns Management</h1>
            <p className="mt-2 text-muted-foreground">Review returns, reconcile received goods and protect saleable inventory accuracy.</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <Card><CardContent className="p-3"><div className="font-bold">{counts.requested ?? 0}</div><div className="text-muted-foreground">Pending</div></CardContent></Card>
            <Card><CardContent className="p-3"><div className="font-bold">{counts["item-received"] ?? 0}</div><div className="text-muted-foreground">Received</div></CardContent></Card>
            <Card><CardContent className="p-3"><div className="font-bold">{counts.refunded ?? 0}</div><div className="text-muted-foreground">Refunded</div></CardContent></Card>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, return ID, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <select value={status} onChange={(event) => setStatus(event.target.value as "all" | ReturnStatus)} className="h-10 rounded-md border bg-background px-3 text-sm">
              <option value="all">All statuses</option>
              {(Object.keys(RETURN_STATUS_LABELS) as ReturnStatus[]).map((key) => <option key={key} value={key}>{RETURN_STATUS_LABELS[key]}</option>)}
            </select>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-muted-foreground">No return requests match your filters.</CardContent></Card>
          ) : filtered.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle className="text-lg">Return for {request.orderNumber}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">{request.id} · {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                <Badge variant={statusTone[request.status]}>{RETURN_STATUS_LABELS[request.status]}</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="space-y-3">
                    <div><span className="text-sm font-medium">Reason: </span><span className="text-sm text-muted-foreground">{RETURN_REASON_LABELS[request.reason]}</span></div>
                    {request.note && <div><span className="text-sm font-medium">Customer note: </span><span className="text-sm text-muted-foreground">{request.note}</span></div>}
                    <div className="divide-y rounded-lg border">
                      {request.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4 p-3 text-sm">
                          <div><div className="font-medium">{item.name}</div><div className="text-xs text-muted-foreground">SKU {item.sku} · Qty {item.quantity}{item.attributes ? ` · ${Object.entries(item.attributes).map(([key, value]) => `${key}: ${value}`).join(", ")}` : ""}</div></div>
                          <div className="whitespace-nowrap font-medium">GH₵ {(item.unitPrice * item.quantity).toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="min-w-60 space-y-3 rounded-lg bg-muted/40 p-4">
                    <div className="flex justify-between text-sm"><span className="text-muted-foreground">Refund estimate</span><strong>GH₵ {request.refundAmount.toLocaleString()}</strong></div>
                    <div className="flex flex-wrap gap-2">
                      {request.status === "requested" && <><Button size="sm" onClick={() => changeStatus(request.id, "approved")}><CheckCircle2 className="mr-1 h-4 w-4" />Approve</Button><Button size="sm" variant="destructive" onClick={() => changeStatus(request.id, "rejected")}><XCircle className="mr-1 h-4 w-4" />Reject</Button></>}
                      {request.status === "approved" && <Button size="sm" onClick={() => changeStatus(request.id, "item-received")}><PackageCheck className="mr-1 h-4 w-4" />Mark received</Button>}
                      {request.status === "item-received" && !request.inventoryReconciledAt && (
                        <div className="w-full space-y-2">
                          <label className="text-xs font-semibold text-foreground" htmlFor={`disposition-${request.id}`}>Inventory disposition</label>
                          <select
                            id={`disposition-${request.id}`}
                            value={dispositions[request.id] ?? "restock"}
                            onChange={(event) => setDispositions((current) => ({ ...current, [request.id]: event.target.value as ReturnInventoryDisposition }))}
                            className="h-10 w-full rounded-md border bg-background px-3 text-xs"
                          >
                            {(Object.keys(RETURN_DISPOSITION_LABELS) as ReturnInventoryDisposition[]).map((key) => <option key={key} value={key}>{RETURN_DISPOSITION_LABELS[key]}</option>)}
                          </select>
                          <Button size="sm" className="w-full" onClick={() => reconcile(request)}><Warehouse className="mr-1 h-4 w-4" />Reconcile inventory</Button>
                          {reconciliationErrors[request.id] && <p className="text-xs text-destructive" role="alert">{reconciliationErrors[request.id]}</p>}
                        </div>
                      )}
                      {request.inventoryReconciledAt && <div className="w-full rounded-md border bg-background p-3 text-xs"><div className="font-semibold">Inventory reconciled</div><div className="mt-1 text-muted-foreground">{RETURN_DISPOSITION_LABELS[request.inventoryDisposition ?? "restock"]}</div><div className="mt-1 text-muted-foreground">{new Date(request.inventoryReconciledAt).toLocaleString()}</div></div>}
                      {request.status === "item-received" && request.inventoryReconciledAt && <Button size="sm" onClick={() => changeStatus(request.id, "refund-pending")}><Clock3 className="mr-1 h-4 w-4" />Queue refund</Button>}
                      {request.status === "refund-pending" && <Button size="sm" onClick={() => changeStatus(request.id, "refunded")}><CheckCircle2 className="mr-1 h-4 w-4" />Mark refunded</Button>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default ReturnManagement;

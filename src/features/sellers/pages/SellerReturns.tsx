import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PackageCheck, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import returnService from "@/features/returns/services/return.service";
import {
  RETURN_REASON_LABELS,
  RETURN_STATUS_LABELS,
  type ReturnRequest,
  type ReturnStatus,
} from "@/features/returns/types/return.types";

const SellerReturns = () => {
  const [requests, setRequests] = useState<ReturnRequest[]>(() => returnService.list());
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ReturnStatus>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((request) => {
      if (status !== "all" && request.status !== status) return false;
      if (!q) return true;
      return request.orderNumber.toLowerCase().includes(q) ||
        request.items.some((item) => item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q));
    });
  }, [requests, query, status]);

  const acknowledgeReceipt = (id: string) => {
    const updated = returnService.updateStatus(id, "item-received");
    if (updated) setRequests((current) => current.map((item) => item.id === id ? updated : item));
  };

  return (
    <>
      <Helmet><title>Returns | Seller Centre | BredaBuy</title></Helmet>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Seller Centre</p>
          <h1 className="text-3xl font-bold tracking-tight">Returns & After-Sales</h1>
          <p className="mt-2 text-muted-foreground">Monitor customer returns and confirm physical receipt of approved items.</p>
        </div>

        <Card className="mb-6">
          <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order, product or SKU" className="h-10 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value as "all" | ReturnStatus)} className="h-10 rounded-md border bg-background px-3 text-sm">
              <option value="all">All statuses</option>
              {(Object.keys(RETURN_STATUS_LABELS) as ReturnStatus[]).map((key) => <option key={key} value={key}>{RETURN_STATUS_LABELS[key]}</option>)}
            </select>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-muted-foreground">No returns match your filters.</CardContent></Card>
          ) : filtered.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle className="text-lg">Order {request.orderNumber}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">Submitted {new Date(request.createdAt).toLocaleString()}</p>
                </div>
                <Badge variant={request.status === "rejected" ? "destructive" : "secondary"}>{RETURN_STATUS_LABELS[request.status]}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm"><strong>Reason:</strong> <span className="text-muted-foreground">{RETURN_REASON_LABELS[request.reason]}</span></p>
                {request.note && <p className="text-sm"><strong>Customer note:</strong> <span className="text-muted-foreground">{request.note}</span></p>}
                <div className="divide-y rounded-lg border">
                  {request.items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1 p-3 text-sm md:flex-row md:items-center md:justify-between">
                      <div><div className="font-medium">{item.name}</div><div className="text-xs text-muted-foreground">SKU {item.sku} · Qty {item.quantity}{item.attributes ? ` · ${Object.entries(item.attributes).map(([key, value]) => `${key}: ${value}`).join(", ")}` : ""}</div></div>
                      <span className="font-medium">GH₵ {(item.unitPrice * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                {request.status === "approved" && <Button size="sm" onClick={() => acknowledgeReceipt(request.id)}><PackageCheck className="mr-2 h-4 w-4" />Confirm item received</Button>}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default SellerReturns;

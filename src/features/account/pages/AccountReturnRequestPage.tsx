import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, CheckCircle2, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";
import returnService from "@/features/returns/services/return.service";
import {
  RETURN_REASON_LABELS,
  type ReturnItem,
  type ReturnReason,
} from "@/features/returns/types/return.types";

const reasons = Object.entries(RETURN_REASON_LABELS) as [ReturnReason, string][];

export default function AccountReturnRequestPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const order = orderService.getById(id ?? "");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState<ReturnReason | "">("");
  const [note, setNote] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const eligible = order?.customerId === user?.id && order.status === "delivered";
  const selectedItems = useMemo(
    () => order?.items.filter((item) => (quantities[item.id] ?? 0) > 0) ?? [],
    [order, quantities],
  );
  const refundAmount = selectedItems.reduce(
    (sum, item) => sum + item.unitPrice * (quantities[item.id] ?? 0),
    0,
  );

  if (!order || order.customerId !== user?.id) {
    return (
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Order not found</h2>
          <Button asChild><Link to="/account/orders">Back to Orders</Link></Button>
        </CardContent>
      </Card>
    );
  }

  if (!eligible) {
    return (
      <Card>
        <CardHeader><CardTitle>Return not available</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3 rounded-lg bg-muted/50 p-4 text-sm">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>Returns can be requested after an order has been delivered. This order is currently <strong>{order.status.replaceAll("-", " ")}</strong>.</p>
          </div>
          <Button onClick={() => navigate(`/account/orders/${order.id}`)}>Back to Order</Button>
        </CardContent>
      </Card>
    );
  }

  if (submittedId) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
          <div><h1 className="text-2xl font-bold">Return request submitted</h1><p className="mt-2 text-muted-foreground">Your request has been recorded and will be reviewed.</p></div>
          <Badge variant="outline">Request ID: {submittedId}</Badge>
          <div className="flex flex-wrap justify-center gap-3"><Button onClick={() => navigate("/account/orders")}>View Orders</Button><Button variant="outline" onClick={() => navigate(`/account/orders/${order.id}`)}>View Order</Button></div>
        </CardContent>
      </Card>
    );
  }

  const updateQuantity = (itemId: string, value: number, max: number) => {
    setQuantities((current) => ({ ...current, [itemId]: Math.max(0, Math.min(max, value)) }));
  };

  const submit = () => {
    if (!reason || selectedItems.length === 0) return;
    const items: ReturnItem[] = selectedItems.map((item) => ({
      id: crypto.randomUUID(),
      orderItemId: item.id,
      productId: item.productId,
      variantId: item.variantId,
      name: item.name,
      sku: item.sku,
      quantity: quantities[item.id] ?? 0,
      unitPrice: item.unitPrice,
      attributes: item.attributes,
    }));
    const request = returnService.create({
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerId: user!.id,
      items,
      reason,
      note: note.trim() || undefined,
      refundAmount,
    });
    setSubmittedId(request.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" className="mb-2 -ml-3" onClick={() => navigate(`/account/orders/${order.id}`)}><ArrowLeft className="mr-2 h-4 w-4" />Back to Order</Button>
        <h1 className="text-3xl font-bold">Request a Return</h1>
        <p className="mt-1 text-muted-foreground">Order {order.orderNumber} · Select the exact configurations and quantities you want to return.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Select items</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item) => {
            const selected = quantities[item.id] ?? 0;
            return (
              <div key={item.id} className={`rounded-xl border p-4 ${selected ? "border-primary ring-1 ring-primary/20" : ""}`}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {item.image ? <img src={item.image} alt="" className="h-20 w-20 rounded-lg object-cover" loading="lazy" /> : <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted"><Package className="h-6 w-6 text-muted-foreground" /></div>}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">SKU: {item.sku} · Purchased: {item.quantity}</p>
                    {item.attributes && Object.keys(item.attributes).length > 0 && <div className="mt-2 flex flex-wrap gap-2">{Object.entries(item.attributes).map(([key, value]) => <Badge key={key} variant="outline">{key}: {value}</Badge>)}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <label htmlFor={`return-qty-${item.id}`} className="text-sm font-medium">Return qty</label>
                    <select id={`return-qty-${item.id}`} value={selected} onChange={(event) => updateQuantity(item.id, Number(event.target.value), item.quantity)} className="rounded-lg border bg-background px-3 py-2 text-sm">
                      {Array.from({ length: item.quantity + 1 }, (_, quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Why are you returning these items?</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {reasons.map(([value, label]) => <label key={value} className={`cursor-pointer rounded-xl border p-3 text-sm ${reason === value ? "border-primary bg-primary/5" : ""}`}><input type="radio" name="return-reason" value={value} checked={reason === value} onChange={() => setReason(value)} className="mr-2" />{label}</label>)}
          </div>
          <div><label htmlFor="return-note" className="text-sm font-medium">Additional details <span className="text-muted-foreground">(optional)</span></label><Textarea id="return-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Tell us anything that will help us review the request." className="mt-2 min-h-28" maxLength={1000} /><p className="mt-1 text-right text-xs text-muted-foreground">{note.length}/1000</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm text-muted-foreground">Estimated item refund</p><p className="text-2xl font-bold">GH₵ {refundAmount.toLocaleString()}</p><p className="text-xs text-muted-foreground">Final refund is subject to review and applicable policy.</p></div>
          <Button size="lg" onClick={submit} disabled={!reason || selectedItems.length === 0}>Submit Return Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}

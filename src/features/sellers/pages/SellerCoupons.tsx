import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, TicketPercent, Users, WalletCards } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  used: number;
  limit: number;
  active: boolean;
}

const initialCoupons: Coupon[] = [
  { id: "CP-001", code: "WELCOME10", type: "percentage", value: 10, used: 24, limit: 100, active: true },
  { id: "CP-002", code: "SAVE50", type: "fixed", value: 50, used: 12, limit: 50, active: true },
  { id: "CP-003", code: "WEEKEND15", type: "percentage", value: 15, used: 41, limit: 50, active: false },
];

export default function SellerCoupons() {
  const [query, setQuery] = useState("");
  const [coupons, setCoupons] = useState(initialCoupons);

  const filtered = useMemo(
    () => coupons.filter((coupon) => coupon.code.toLowerCase().includes(query.toLowerCase())),
    [coupons, query],
  );

  const toggleCoupon = (id: string) => {
    setCoupons((items) => items.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
          <p className="text-muted-foreground">Create and manage discounts for your customers.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Create Coupon</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="flex items-center gap-3 p-5"><TicketPercent className="h-5 w-5" /><div><p className="text-sm text-muted-foreground">Active coupons</p><p className="text-2xl font-bold">{coupons.filter((c) => c.active).length}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><Users className="h-5 w-5" /><div><p className="text-sm text-muted-foreground">Total redemptions</p><p className="text-2xl font-bold">{coupons.reduce((sum, c) => sum + c.used, 0)}</p></div></CardContent></Card>
        <Card><CardContent className="flex items-center gap-3 p-5"><WalletCards className="h-5 w-5" /><div><p className="text-sm text-muted-foreground">Campaign capacity</p><p className="text-2xl font-bold">{coupons.reduce((sum, c) => sum + c.limit, 0)}</p></div></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Coupon catalogue</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search coupon code..." className="pl-9" /></div>
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filtered.map((coupon) => (
              <Card key={coupon.id} className="border-dashed">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3"><div><p className="font-mono text-lg font-bold">{coupon.code}</p><p className="text-sm text-muted-foreground">{coupon.type === "percentage" ? `${coupon.value}% off` : `GH₵ ${coupon.value} off`}</p></div><Badge variant={coupon.active ? "default" : "secondary"}>{coupon.active ? "Active" : "Paused"}</Badge></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Redemptions</span><span className="font-medium">{coupon.used} / {coupon.limit}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, (coupon.used / coupon.limit) * 100)}%` }} /></div>
                  <div className="flex items-center justify-between border-t pt-3"><Label htmlFor={coupon.id}>Enabled</Label><Switch id={coupon.id} checked={coupon.active} onCheckedChange={() => toggleCoupon(coupon.id)} /></div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && <div className="py-10 text-center text-muted-foreground">No coupons match your search.</div>}
        </CardContent>
      </Card>
    </div>
  );
}

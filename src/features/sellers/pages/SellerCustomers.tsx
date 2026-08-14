import { useMemo, useState } from "react";
import { Search, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";

export default function SellerCustomers() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const orders = useMemo(() => user ? orderService.listForSeller(user.id) : [], [user]);
  const customers = useMemo(() => {
    const map = new Map<string, { name: string; phone: string; orders: number; value: number; latest: string }>();
    orders.forEach((order) => {
      const key = order.shippingAddress.phone || order.shippingAddress.fullName;
      const existing = map.get(key);
      if (existing) { existing.orders += 1; existing.value += order.total; if (order.createdAt > existing.latest) existing.latest = order.createdAt; }
      else map.set(key, { name: order.shippingAddress.fullName, phone: order.shippingAddress.phone, orders: 1, value: order.total, latest: order.createdAt });
    });
    return [...map.values()].sort((a, b) => b.value - a.value);
  }, [orders]);
  const filtered = customers.filter((customer) => [customer.name, customer.phone].join(" ").toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="space-y-6">
    <div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Customers</h1><p className="mt-1 text-muted-foreground">Understand your customer relationships using authorized order information.</p></div>
    <div className="grid gap-4 sm:grid-cols-3"><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Customers</p><p className="mt-2 text-2xl font-bold">{customers.length}</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Orders</p><p className="mt-2 text-2xl font-bold">{orders.length}</p></CardContent></Card><Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Order value</p><p className="mt-2 text-2xl font-bold">GH₵ {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p></CardContent></Card></div>
    <Card><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search customer name or phone" /></div></CardContent></Card>
    {filtered.length === 0 ? <Card><CardContent className="py-16 text-center"><Users className="mx-auto h-12 w-12 text-muted-foreground" /><h2 className="mt-4 font-semibold">No customer records</h2><p className="mt-1 text-sm text-muted-foreground">Customer insights will appear when orders are placed.</p></CardContent></Card> : <div className="overflow-x-auto rounded-xl border"><table className="w-full text-sm"><thead className="bg-muted/50 text-left"><tr><th className="p-4">Customer</th><th className="p-4">Orders</th><th className="p-4">Order value</th><th className="p-4">Latest order</th></tr></thead><tbody className="divide-y">{filtered.map((customer) => <tr key={`${customer.phone}-${customer.name}`}><td className="p-4"><p className="font-medium">{customer.name}</p><p className="text-xs text-muted-foreground">{customer.phone}</p></td><td className="p-4"><Badge variant="secondary">{customer.orders}</Badge></td><td className="p-4 font-medium">GH₵ {customer.value.toLocaleString()}</td><td className="p-4 text-muted-foreground">{new Date(customer.latest).toLocaleDateString("en-GH")}</td></tr>)}</tbody></table></div>}
  </div>;
}

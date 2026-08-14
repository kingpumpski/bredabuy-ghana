import { useMemo } from "react";
import { ArrowDownToLine, Banknote, Clock3, WalletCards } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";

export default function SellerPayouts() {
  const { user } = useAuth();
  const orders = useMemo(() => user ? orderService.listForSeller(user.id) : [], [user]);
  const deliveredValue = orders.filter((order) => order.status === "delivered").reduce((sum, order) => sum + order.total, 0);
  const pendingValue = orders.filter((order) => !["delivered", "cancelled", "returned", "refunded"].includes(order.status)).reduce((sum, order) => sum + order.total, 0);
  const commission = deliveredValue * 0.05;
  const payable = deliveredValue - commission;
  return <div className="space-y-6">
    <div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Payouts</h1><p className="mt-1 text-muted-foreground">Track seller settlement amounts separately from customer payments.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[WalletCards,"Available payout",`GH₵ ${payable.toLocaleString()}`],[Clock3,"Pending settlement",`GH₵ ${pendingValue.toLocaleString()}`],[Banknote,"Gross delivered",`GH₵ ${deliveredValue.toLocaleString()}`],[ArrowDownToLine,"Platform commission",`GH₵ ${commission.toLocaleString()}`]].map(([Icon,label,value]) => <Card key={label as string}><CardContent className="p-5"><div className="flex justify-between"><p className="text-sm text-muted-foreground">{label as string}</p><Icon className="h-5 w-5 text-primary" /></div><p className="mt-3 text-2xl font-bold">{value as string}</p></CardContent></Card>)}</div>
    <Card><CardContent className="p-6"><div className="flex items-start gap-4"><div className="rounded-full bg-primary/10 p-3"><WalletCards className="h-5 w-5 text-primary" /></div><div><h2 className="font-semibold">Settlement overview</h2><p className="mt-1 text-sm text-muted-foreground">Delivered orders form the current payout basis. Actual payment processing and settlement will use the configured payment provider once connected.</p></div></div></CardContent></Card>
    <Card><CardContent className="p-6"><h2 className="font-semibold">Settlement history</h2>{orders.length === 0 ? <p className="py-10 text-center text-sm text-muted-foreground">No settlement records yet.</p> : <div className="mt-4 divide-y">{orders.slice(0, 10).map((order) => <div key={order.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-medium">{order.orderNumber}</p><p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString("en-GH")}</p></div><div className="flex items-center gap-3"><Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status.replaceAll("-", " ")}</Badge><span className="font-semibold">GH₵ {order.total.toLocaleString()}</span></div></div>)}</div>}</CardContent></Card>
  </div>;
}

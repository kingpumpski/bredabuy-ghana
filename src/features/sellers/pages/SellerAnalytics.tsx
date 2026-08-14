import { useMemo } from "react";
import { BarChart3, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import orderService from "@/features/orders/services/order.service";
import { productService } from "@/features/products/services/product.service";
import { useEffect, useState } from "react";
import type { Product } from "@/features/products/types/product.types";

export default function SellerAnalytics() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { void productService.getProducts({ page: 1, pageSize: 100, filters: { seller: "current-seller" } }).then((result) => setProducts(result.items)).catch(() => setProducts([])); }, []);
  const orders = useMemo(() => user ? orderService.listForSeller(user.id) : [], [user]);
  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const delivered = orders.filter((order) => order.status === "delivered").length;
    const average = orders.length ? revenue / orders.length : 0;
    const units = orders.reduce((sum, order) => sum + order.items.filter((item) => item.sellerId === user?.id).reduce((n, item) => n + item.quantity, 0), 0);
    return { revenue, delivered, average, units };
  }, [orders, user?.id]);
  const topProducts = useMemo(() => products.slice().sort((a, b) => b.rating.count - a.rating.count).slice(0, 5), [products]);
  return <div className="space-y-6">
    <div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Analytics</h1><p className="mt-1 text-muted-foreground">A clear view of catalogue, order and revenue performance.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[[TrendingUp,"Order value",`GH₵ ${metrics.revenue.toLocaleString()}`],[ShoppingCart,"Orders",orders.length],[Package,"Units sold",metrics.units],[BarChart3,"Average order",`GH₵ ${Math.round(metrics.average).toLocaleString()}`]].map(([Icon,label,value]) => <Card key={label as string}><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label as string}</p><Icon className="h-5 w-5 text-primary" /></div><p className="mt-3 text-2xl font-bold">{value as string}</p></CardContent></Card>)}</div>
    <div className="grid gap-6 lg:grid-cols-2"><Card><CardContent className="p-6"><h2 className="font-semibold">Fulfilment performance</h2><div className="mt-5 space-y-4"><div className="flex justify-between text-sm"><span>Delivered orders</span><span className="font-semibold">{metrics.delivered}</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${orders.length ? Math.min(100, metrics.delivered / orders.length * 100) : 0}%` }} /></div><p className="text-xs text-muted-foreground">Based on seller order records currently available.</p></div></CardContent></Card><Card><CardContent className="p-6"><h2 className="font-semibold">Catalogue health</h2><div className="mt-5 grid grid-cols-3 gap-3 text-center"><div className="rounded-lg bg-muted/50 p-4"><p className="text-2xl font-bold">{products.length}</p><p className="text-xs text-muted-foreground">Products</p></div><div className="rounded-lg bg-muted/50 p-4"><p className="text-2xl font-bold">{products.filter((p) => p.stock > 0).length}</p><p className="text-xs text-muted-foreground">In stock</p></div><div className="rounded-lg bg-muted/50 p-4"><p className="text-2xl font-bold">{products.filter((p) => p.stock === 0).length}</p><p className="text-xs text-muted-foreground">Out</p></div></div></CardContent></Card></div>
    <Card><CardContent className="p-6"><h2 className="font-semibold">Top catalogue products</h2><div className="mt-4 divide-y">{topProducts.length ? topProducts.map((product) => <div key={product.id} className="flex items-center justify-between gap-4 py-3"><div className="min-w-0"><p className="truncate font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{product.categoryName} · {product.rating.count} reviews</p></div><span className="font-semibold">GH₵ {product.price.toLocaleString()}</span></div>) : <p className="py-8 text-center text-sm text-muted-foreground">Analytics will populate as products and orders are added.</p>}</div></CardContent></Card>
  </div>;
}

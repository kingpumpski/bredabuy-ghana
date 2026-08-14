import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Package, RefreshCw, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product.types";

export default function SellerInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const result = await productService.getProducts({ page: 1, pageSize: 100, filters: { seller: "current-seller" }, sort: "newest" });
      setProducts(result.items);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to load inventory.");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => products.filter((product) => {
    const q = query.trim().toLowerCase();
    return !q || [product.name, product.sku, product.categoryName, product.brandName ?? ""].join(" ").toLowerCase().includes(q);
  }), [products, query]);

  const metrics = useMemo(() => ({
    units: products.reduce((sum, product) => sum + product.stock, 0),
    healthy: products.filter((product) => product.stock > 5).length,
    low: products.filter((product) => product.stock > 0 && product.stock <= 5).length,
    out: products.filter((product) => product.stock === 0).length,
  }), [products]);

  return <div className="space-y-6">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Inventory</h1><p className="mt-1 text-muted-foreground">Monitor stock levels and identify products that need attention.</p></div><Button variant="outline" onClick={() => void load()}><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Units available", metrics.units], ["Healthy stock", metrics.healthy], ["Low stock", metrics.low], ["Out of stock", metrics.out]].map(([label, value]) => <Card key={label as string}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></CardContent></Card>)}</div>
    <Card><CardContent className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search product, SKU, category or brand" /></div></CardContent></Card>
    {loading && <div className="grid gap-4 md:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <Card key={i}><CardContent className="p-5"><Skeleton className="h-5 w-2/3" /><Skeleton className="mt-3 h-4 w-1/3" /><Skeleton className="mt-5 h-3 w-full" /></CardContent></Card>)}</div>}
    {!loading && error && <Card className="border-destructive"><CardContent className="py-12 text-center text-destructive">{error}<br /><Button className="mt-4" variant="outline" onClick={() => void load()}>Try again</Button></CardContent></Card>}
    {!loading && !error && filtered.length === 0 && <Card><CardContent className="py-16 text-center"><Package className="mx-auto h-12 w-12 text-muted-foreground" /><h2 className="mt-4 font-semibold">No inventory records</h2><p className="mt-1 text-sm text-muted-foreground">Add products to start managing inventory.</p></CardContent></Card>}
    {!loading && !error && filtered.length > 0 && <div className="grid gap-4 lg:grid-cols-2">{filtered.map((product) => { const low = product.stock > 0 && product.stock <= 5; const out = product.stock === 0; return <Card key={product.id} className={low || out ? "border-amber-500/40" : ""}><CardContent className="p-5"><div className="flex gap-4"><div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">{product.images?.[0]?.url ? <img src={product.images[0].url} alt={product.name} className="h-full w-full object-cover" /> : <Package className="m-5 h-6 w-6 text-muted-foreground" />}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{product.name}</h2><p className="text-xs text-muted-foreground">SKU: {product.sku} · {product.categoryName}</p></div><Badge variant={out ? "destructive" : low ? "secondary" : "default"}>{out ? "Out of stock" : low ? "Low stock" : "Healthy"}</Badge></div><div className="mt-5 flex items-end justify-between"><div><p className="text-xs text-muted-foreground">Available units</p><p className="text-2xl font-bold">{product.stock}</p></div>{(low || out) && <div className="flex items-center gap-1 text-xs text-amber-700"><AlertTriangle className="h-4 w-4" />Restock attention</div>}</div></div></div></CardContent></Card>; })}</div>}
  </div>;
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, PackagePlus, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { productService } from "@/features/products/services/product.service";
import type { Product } from "@/features/products/types/product.types";

const currency = new Intl.NumberFormat("en-GH", { style: "currency", currency: "GHS", minimumFractionDigits: 0 });

export default function SellerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "low-stock" | "out-of-stock">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const result = await productService.getProducts({ page: 1, pageSize: 100, filters: { seller: "current-seller" }, sort: "newest" }); setProducts(result.items); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load products."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = !query.trim() || [product.name, product.sku, product.categoryName, product.brandName ?? ""].join(" ").toLowerCase().includes(query.trim().toLowerCase());
    const matchesStock = stockFilter === "all" || (stockFilter === "in-stock" && product.stock > 5) || (stockFilter === "low-stock" && product.stock > 0 && product.stock <= 5) || (stockFilter === "out-of-stock" && product.stock === 0);
    return matchesQuery && matchesStock;
  }), [products, query, stockFilter]);
  const stats = useMemo(() => ({ total: products.length, active: products.length, low: products.filter((p) => p.stock > 0 && p.stock <= 5).length, out: products.filter((p) => p.stock === 0).length }), [products]);

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-medium text-primary">Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Products</h1><p className="mt-1 text-muted-foreground">Manage listings, inventory and marketplace presentation.</p></div><Button asChild><Link to="/seller/products/new"><PackagePlus className="mr-2 h-4 w-4" />Add Product</Link></Button></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Products", stats.total], ["Active", stats.active], ["Low stock", stats.low], ["Out of stock", stats.out]].map(([label, value]) => <Card key={label as string}><CardContent className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></CardContent></Card>)}</div>
    <Card><CardContent className="p-4"><div className="flex flex-col gap-3 lg:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, SKU, category or brand..." /></div><div className="flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-muted-foreground" /><select value={stockFilter} onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)} className="h-10 rounded-md border bg-background px-3 text-sm"><option value="all">All stock</option><option value="in-stock">In stock</option><option value="low-stock">Low stock</option><option value="out-of-stock">Out of stock</option></select></div></div></CardContent></Card>
    {loading && <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Card key={i}><CardContent className="p-4"><Skeleton className="h-48 w-full" /><Skeleton className="mt-4 h-5 w-3/4" /><Skeleton className="mt-2 h-4 w-1/2" /></CardContent></Card>)}</div>}
    {!loading && error && <Card className="border-destructive"><CardContent className="py-12 text-center text-destructive">{error}<div><Button variant="outline" className="mt-4" onClick={() => void load()}>Try again</Button></div></CardContent></Card>}
    {!loading && !error && filtered.length === 0 && <Card><CardContent className="flex flex-col items-center justify-center py-20 text-center"><ShoppingBag className="h-12 w-12 text-muted-foreground" /><h2 className="mt-4 text-xl font-semibold">{products.length ? "No matching products" : "Your catalogue is empty"}</h2><p className="mt-2 max-w-md text-sm text-muted-foreground">{products.length ? "Change your search or stock filter." : "Add your first product and it will appear here and in the marketplace catalogue."}</p>{!products.length && <Button asChild className="mt-5"><Link to="/seller/products/new">Add your first product</Link></Button>}</CardContent></Card>}
    {!loading && !error && filtered.length > 0 && <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((product) => { const image = product.images?.[0]?.url; return <Card key={product.id} className="group overflow-hidden transition-shadow hover:shadow-lg"><div className="relative aspect-[4/3] overflow-hidden bg-muted">{image ? <img src={image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /> : <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>}<div className="absolute left-3 top-3"><Badge variant={product.stock > 0 ? "default" : "destructive"}>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</Badge></div></div><CardContent className="p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs uppercase tracking-wide text-muted-foreground">{product.categoryName}</p><h2 className="mt-1 line-clamp-2 font-semibold">{product.name}</h2></div><p className="shrink-0 font-bold">{currency.format(product.price)}</p></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span>SKU: {product.sku}</span><span>{product.rating.count} reviews</span></div><div className="mt-4"><Button asChild variant="outline" size="sm" className="w-full"><Link to={`/products/${product.slug}`}><Eye className="mr-2 h-4 w-4" />View in marketplace</Link></Button></div></CardContent></Card>; })}</div>}
  </div>;
}

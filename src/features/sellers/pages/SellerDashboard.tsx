import { useEffect, useState } from "react";
import { ArrowUpRight, BarChart3, Boxes, ClipboardList, Package, Plus, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productService } from "@/features/products/services/product.service";

export default function SellerDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  useEffect(() => { void productService.getProducts({ page: 1, pageSize: 100, filters: { seller: "current-seller" } }).then((result) => { setProductCount(result.total); setLowStock(result.items.filter((p) => p.stock > 0 && p.stock <= 5).length); setOutOfStock(result.items.filter((p) => p.stock === 0).length); }); }, []);

  const metrics = [
    ["Products", productCount, Boxes],
    ["Low stock", lowStock, Package],
    ["Out of stock", outOfStock, ClipboardList],
    ["Store status", "Live", Truck],
  ] as const;

  return <div className="space-y-7">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-medium text-primary">BredaBuy Seller Centre</p><h1 className="text-3xl font-bold tracking-tight">Good business starts with a great catalogue.</h1><p className="mt-2 max-w-2xl text-muted-foreground">Manage products, monitor inventory and keep every order moving from purchase to fulfilment.</p></div><Button asChild><Link to="/seller/products/new"><Plus className="mr-2 h-4 w-4" />Add Product</Link></Button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(([label, value, Icon]) => <Card key={label}><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">{label}</p><Icon className="h-5 w-5 text-muted-foreground" /></div><p className="mt-3 text-3xl font-bold">{value}</p></CardContent></Card>)}</div>
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <Card><CardHeader><div className="flex items-center justify-between"><CardTitle>Seller operations</CardTitle><BarChart3 className="h-5 w-5 text-muted-foreground" /></div></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2"><Link to="/seller/products" className="rounded-xl border p-5 transition-colors hover:bg-muted"><p className="font-semibold">Catalogue management</p><p className="mt-1 text-sm text-muted-foreground">Create, present and monitor marketplace products.</p><span className="mt-4 inline-flex text-sm font-medium">Manage products <ArrowUpRight className="ml-1 h-4 w-4" /></span></Link><Link to="/seller/orders" className="rounded-xl border p-5 transition-colors hover:bg-muted"><p className="font-semibold">Order management</p><p className="mt-1 text-sm text-muted-foreground">Review customer orders and move them through fulfilment.</p><span className="mt-4 inline-flex text-sm font-medium">View orders <ArrowUpRight className="ml-1 h-4 w-4" /></span></Link><Link to="/seller/inventory" className="rounded-xl border p-5 transition-colors hover:bg-muted"><p className="font-semibold">Inventory control</p><p className="mt-1 text-sm text-muted-foreground">Watch stock levels and identify products requiring attention.</p><span className="mt-4 inline-flex text-sm font-medium">Inventory <ArrowUpRight className="ml-1 h-4 w-4" /></span></Link><Link to="/seller/fulfilment" className="rounded-xl border p-5 transition-colors hover:bg-muted"><p className="font-semibold">Fulfilment queue</p><p className="mt-1 text-sm text-muted-foreground">Keep packing, dispatch and tracking operations organised.</p><span className="mt-4 inline-flex text-sm font-medium">Fulfilment <ArrowUpRight className="ml-1 h-4 w-4" /></span></Link></CardContent></Card>
      <Card><CardHeader><CardTitle>Launch checklist</CardTitle></CardHeader><CardContent className="space-y-4 text-sm"><div className="flex gap-3"><span className="mt-0.5 h-2 w-2 rounded-full bg-primary" /><div><p className="font-medium">Add your first product</p><p className="text-muted-foreground">Use the guided listing form.</p></div></div><div className="flex gap-3"><span className="mt-0.5 h-2 w-2 rounded-full bg-primary" /><div><p className="font-medium">Set healthy stock levels</p><p className="text-muted-foreground">Avoid missed sales from stock-outs.</p></div></div><div className="flex gap-3"><span className="mt-0.5 h-2 w-2 rounded-full bg-primary" /><div><p className="font-medium">Prepare fulfilment</p><p className="text-muted-foreground">Keep dispatch information accurate.</p></div></div></CardContent></Card>
    </div>
  </div>;
}

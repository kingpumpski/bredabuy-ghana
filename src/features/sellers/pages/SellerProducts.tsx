import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Boxes, PackagePlus, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DraftSummary {
  name: string;
  sku: string;
  category: string;
  variants: Array<{ id: string; stock: number; attributes: Record<string, string> }>;
}

const DRAFT_KEY = "bredabuy:seller-product-draft";

export default function SellerProducts() {
  const [draft, setDraft] = useState<DraftSummary | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (stored) setDraft(JSON.parse(stored) as DraftSummary);
    } catch {
      // Draft persistence is optional.
    }
  }, []);

  const stockSummary = useMemo(() => {
    const variants = draft?.variants ?? [];
    return {
      variants: variants.length,
      units: variants.reduce((sum, variant) => sum + variant.stock, 0),
      outOfStock: variants.filter((variant) => variant.stock <= 0).length,
    };
  }, [draft]);

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-primary">Seller workspace</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Products & variants</h1>
          <p className="mt-2 text-muted-foreground">
            Manage marketplace products and the inventory combinations customers can select.
          </p>
        </div>
        <Button asChild>
          <Link to="/seller/products/new">
            <PackagePlus className="mr-2 h-4 w-4" />
            Add product
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-primary/10 p-3"><Boxes className="h-5 w-5 text-primary" /></div>
            <div><p className="text-sm text-muted-foreground">Configured variants</p><p className="text-2xl font-bold">{stockSummary.variants}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-primary/10 p-3"><SlidersHorizontal className="h-5 w-5 text-primary" /></div>
            <div><p className="text-sm text-muted-foreground">Units in variants</p><p className="text-2xl font-bold">{stockSummary.units}</p></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-destructive/10 p-3"><Boxes className="h-5 w-5 text-destructive" /></div>
            <div><p className="text-sm text-muted-foreground">Out of stock</p><p className="text-2xl font-bold">{stockSummary.outOfStock}</p></div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Product workspace</CardTitle>
        </CardHeader>
        <CardContent>
          {draft ? (
            <div className="rounded-xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">{draft.name || "Untitled product"}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {draft.category || "Uncategorised"} · {draft.sku || "No SKU"}
                  </p>
                </div>
                <Badge variant="secondary">Local draft</Badge>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {draft.variants.slice(0, 8).map((variant) => (
                  <div key={variant.id} className="rounded-lg bg-muted/40 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{Object.values(variant.attributes).join(" / ")}</span>
                      <Badge variant={variant.stock > 0 ? "default" : "destructive"}>{variant.stock > 0 ? `${variant.stock} stock` : "Out"}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="mt-5">
                <Link to="/seller/products/new">
                  Continue editing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <PackagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
              <h2 className="mt-4 font-semibold">Create your first configurable product</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Add sizes, colours, materials or any seller-defined options and manage stock for every combination.
              </p>
              <Button asChild className="mt-5">
                <Link to="/seller/products/new">Create product</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

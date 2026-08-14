import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ImagePlus, Package, Save, Store } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productService } from "@/features/products/services/product.service";

const categories = [
  ["electronics", "Electronics"],
  ["fashion", "Fashion"],
  ["home-living", "Home & Living"],
  ["groceries", "Groceries"],
  ["health-beauty", "Health & Beauty"],
  ["sports", "Sports & Fitness"],
  ["automotive", "Automotive"],
  ["agriculture", "Agriculture"],
] as const;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronics");
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categoryName = useMemo(
    () => categories.find(([id]) => id === category)?.[1] ?? category,
    [category],
  );

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericCompareAt = compareAtPrice ? Number(compareAtPrice) : undefined;

    if (!name.trim()) return setError("Product name is required.");
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) return setError("Enter a valid selling price.");
    if (!Number.isInteger(numericStock) || numericStock < 0) return setError("Stock must be a whole number of zero or more.");
    if (numericCompareAt !== undefined && (!Number.isFinite(numericCompareAt) || numericCompareAt <= numericPrice)) {
      return setError("Compare-at price must be greater than the selling price.");
    }

    setSaving(true);
    try {
      await productService.createProduct({
        name: name.trim(),
        description: description.trim() || `${name.trim()} available on BredaBuy.`,
        categoryId: category,
        categoryName,
        brandName: brand.trim() || undefined,
        sku: sku.trim() || undefined,
        price: numericPrice,
        compareAtPrice: numericCompareAt,
        stock: numericStock,
        image: image.trim() || undefined,
        status,
      });
      navigate("/seller/products");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/seller/products" className="mb-2 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
          <p className="mt-1 text-muted-foreground">Create a marketplace-ready product with pricing, stock and presentation details.</p>
        </div>
        <Badge variant={status === "published" ? "default" : "secondary"}>{status === "published" ? "Ready to publish" : "Draft"}</Badge>
      </div>

      <form onSubmit={submit} className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Product information</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2"><Label htmlFor="product-name">Product name</Label><Input id="product-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rechargeable Solar Lantern" /></div>
                <div className="space-y-2"><Label htmlFor="category">Category</Label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 w-full rounded-md border bg-background px-3 text-sm">{categories.map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></div>
                <div className="space-y-2"><Label htmlFor="brand">Brand</Label><Input id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand name" /></div>
                <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Description</Label><Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product, key benefits and important specifications..." className="min-h-36" /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pricing & inventory</CardTitle></CardHeader>
            <CardContent className="grid gap-5 md:grid-cols-3">
              <div className="space-y-2"><Label htmlFor="price">Selling price (GHS)</Label><Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" /></div>
              <div className="space-y-2"><Label htmlFor="compare">Compare-at price</Label><Input id="compare" type="number" min="0" step="0.01" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} placeholder="Optional" /></div>
              <div className="space-y-2"><Label htmlFor="stock">Opening stock</Label><Input id="stock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} /></div>
              <div className="space-y-2 md:col-span-3"><Label htmlFor="sku">SKU</Label><Input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Optional — generated when omitted" /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Product image</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex min-h-48 items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted/30">
                {image ? <img src={image} alt="Product preview" className="h-64 w-full object-contain" /> : <div className="text-center text-muted-foreground"><ImagePlus className="mx-auto mb-3 h-10 w-10" /><p>Paste a public image URL to preview the product.</p></div>}
              </div>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://... product image URL" />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4 text-sm"><div className="flex items-center gap-2 font-medium"><Store className="h-4 w-4" /> Marketplace visibility</div><p className="mt-2 text-muted-foreground">Published products can appear in the public catalogue. Drafts remain seller-only.</p></div>
              <div className="grid grid-cols-2 gap-2"><Button type="button" variant={status === "draft" ? "default" : "outline"} onClick={() => setStatus("draft")}>Save Draft</Button><Button type="button" variant={status === "published" ? "default" : "outline"} onClick={() => setStatus("published")}>Publish</Button></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Listing checklist</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className={name.trim() ? "text-green-600" : "text-muted-foreground"}>✓ Product name</p>
              <p className={Number(price) > 0 ? "text-green-600" : "text-muted-foreground"}>✓ Valid price</p>
              <p className={Number(stock) >= 0 ? "text-green-600" : "text-muted-foreground"}>✓ Inventory quantity</p>
              <p className={image ? "text-green-600" : "text-muted-foreground"}>✓ Product image</p>
            </CardContent>
          </Card>

          {error && <Card className="border-destructive"><CardContent className="pt-6 text-sm text-destructive">{error}</CardContent></Card>}

          <Button type="submit" size="lg" className="w-full" disabled={saving}><Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Save Product"}</Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Package className="h-4 w-4" />Product data is stored through the BredaBuy product service.</div>
        </aside>
      </form>
    </div>
  );
}

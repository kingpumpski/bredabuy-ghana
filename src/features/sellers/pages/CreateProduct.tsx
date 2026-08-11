import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import VariantManager from "../components/VariantManager";
import type { ProductVariant } from "@/features/products/types/product.types";

interface ProductDraft {
  name: string;
  sku: string;
  price: number;
  category: string;
  description: string;
  variants: ProductVariant[];
}

const DRAFT_KEY = "bredabuy:seller-product-draft";

const initialDraft: ProductDraft = {
  name: "",
  sku: "",
  price: 0,
  category: "",
  description: "",
  variants: [],
};

export default function CreateProduct() {
  const [draft, setDraft] = useState<ProductDraft>(initialDraft);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY);
      if (stored) setDraft(JSON.parse(stored) as ProductDraft);
    } catch {
      // Draft persistence is optional.
    }
  }, []);

  const update = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const saveDraft = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setSaved(true);
  };

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/seller/products" className="mb-3 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create marketplace product</h1>
          <p className="mt-2 text-muted-foreground">
            Build the product once, then manage every size, colour, design or other combination independently.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <Badge variant="secondary">Draft saved</Badge>}
          <Button onClick={saveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Save draft
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Product name</label>
              <Input value={draft.name} onChange={(event) => update("name", event.target.value)} placeholder="e.g. Premium Running Shoe" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Base SKU</label>
              <Input value={draft.sku} onChange={(event) => update("sku", event.target.value)} placeholder="e.g. SHOE-001" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <Input value={draft.category} onChange={(event) => update("category", event.target.value)} placeholder="e.g. Footwear" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Base price (GH₵)</label>
              <Input type="number" min={0} value={draft.price} onChange={(event) => update("price", Number(event.target.value) || 0)} />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Description</label>
              <Textarea value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="Describe the product, use cases and important details..." rows={5} />
            </div>
          </CardContent>
        </Card>

        <VariantManager value={draft.variants} onChange={(variants) => update("variants", variants)} />

        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <p className="font-semibold">Marketplace readiness</p>
              <p className="text-sm text-muted-foreground">
                Variant inventory is ready for customer-side selection once this draft is connected to the product service.
              </p>
            </div>
            <Badge variant={draft.variants.length ? "default" : "outline"}>
              {draft.variants.length ? `${draft.variants.length} variants configured` : "No variants configured"}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

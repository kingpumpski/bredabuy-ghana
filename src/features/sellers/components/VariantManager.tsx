import { useEffect, useMemo, useState } from "react";
import { Plus, Trash2, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import type { ProductVariant } from "@/features/products/types/product.types";

export interface VariantOptionGroup {
  name: string;
  values: string[];
}

interface VariantManagerProps {
  value?: ProductVariant[];
  onChange?: (variants: ProductVariant[]) => void;
}

const slug = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const makeCombinations = (groups: VariantOptionGroup[]) => {
  const active = groups.filter((group) => group.name.trim() && group.values.some(Boolean));
  if (!active.length) return [];

  return active.reduce<Record<string, string>[]>((combinations, group) => {
    const values = group.values.map((value) => value.trim()).filter(Boolean);
    if (!values.length) return combinations;
    if (!combinations.length) return values.map((value) => ({ [group.name.trim()]: value }));
    return combinations.flatMap((combination) =>
      values.map((value) => ({ ...combination, [group.name.trim()]: value })),
    );
  }, []);
};

const defaultGroups: VariantOptionGroup[] = [
  { name: "Colour", values: ["Black", "White"] },
  { name: "Size", values: ["40", "41", "42", "43"] },
];

export default function VariantManager({ value = [], onChange }: VariantManagerProps) {
  const [groups, setGroups] = useState<VariantOptionGroup[]>(defaultGroups);
  const [variants, setVariants] = useState<ProductVariant[]>(value);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    setVariants(value);
  }, [value]);

  const update = (next: ProductVariant[]) => {
    setVariants(next);
    onChange?.(next);
  };

  const combinationCount = useMemo(() => makeCombinations(groups).length, [groups]);

  const updateGroup = (index: number, patch: Partial<VariantOptionGroup>) => {
    setGroups((current) => current.map((group, i) => (i === index ? { ...group, ...patch } : group)));
  };

  const addGroup = () => setGroups((current) => [...current, { name: "", values: [""] }]);

  const removeGroup = (index: number) => setGroups((current) => current.filter((_, i) => i !== index));

  const addValue = (groupIndex: number) => {
    setGroups((current) => current.map((group, index) =>
      index === groupIndex ? { ...group, values: [...group.values, ""] } : group,
    ));
  };

  const updateValue = (groupIndex: number, valueIndex: number, nextValue: string) => {
    setGroups((current) => current.map((group, index) => {
      if (index !== groupIndex) return group;
      return { ...group, values: group.values.map((item, i) => (i === valueIndex ? nextValue : item)) };
    }));
  };

  const removeValue = (groupIndex: number, valueIndex: number) => {
    setGroups((current) => current.map((group, index) => {
      if (index !== groupIndex) return group;
      const values = group.values.filter((_, i) => i !== valueIndex);
      return { ...group, values: values.length ? values : [""] };
    }));
  };

  const generate = () => {
    const combinations = makeCombinations(groups);
    const existing = new Map(variants.map((variant) => [JSON.stringify(variant.attributes), variant]));

    update(combinations.map((attributes) => {
      const previous = existing.get(JSON.stringify(attributes));
      if (previous) return previous;
      const suffix = Object.values(attributes).map(slug).filter(Boolean).join("-");
      return {
        id: createId(),
        name: Object.values(attributes).join(" / "),
        sku: `SKU-${suffix.toUpperCase()}`,
        price: basePrice,
        stock: 0,
        attributes,
      } satisfies ProductVariant;
    }));
  };

  const updateVariant = (id: string, patch: Partial<ProductVariant>) => {
    update(variants.map((variant) => (variant.id === id ? { ...variant, ...patch } : variant)));
  };

  const removeVariant = (id: string) => update(variants.filter((variant) => variant.id !== id));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle>Variant options</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Define the options customers can combine. BredaBuy will generate every valid combination.
              </p>
            </div>
            <Button type="button" variant="outline" onClick={addGroup}>
              <Plus className="mr-2 h-4 w-4" /> Add option group
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {groups.map((group, groupIndex) => (
            <div key={`${group.name}-${groupIndex}`} className="rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <Input value={group.name} onChange={(event) => updateGroup(groupIndex, { name: event.target.value })} placeholder="Option name e.g. Size, Colour, Material" aria-label={`Option group ${groupIndex + 1} name`} />
                <Button type="button" size="icon" variant="ghost" onClick={() => removeGroup(groupIndex)} aria-label="Remove option group">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-3 space-y-2">
                {group.values.map((value, valueIndex) => (
                  <div key={`${groupIndex}-${valueIndex}`} className="flex gap-2">
                    <Input value={value} onChange={(event) => updateValue(groupIndex, valueIndex, event.target.value)} placeholder="Option value" aria-label={`${group.name || "Option"} value ${valueIndex + 1}`} />
                    <Button type="button" size="icon" variant="ghost" onClick={() => removeValue(groupIndex, valueIndex)} aria-label="Remove option value">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="ghost" size="sm" onClick={() => addValue(groupIndex)}>
                  <Plus className="mr-2 h-4 w-4" /> Add value
                </Button>
              </div>
            </div>
          ))}

          <Separator />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="w-full max-w-xs">
              <label className="mb-2 block text-sm font-medium">Default variant price (GH₵)</label>
              <Input type="number" min={0} value={basePrice} onChange={(event) => setBasePrice(Number(event.target.value) || 0)} />
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{combinationCount} combinations</Badge>
              <Button type="button" onClick={generate} disabled={!combinationCount}>
                <WandSparkles className="mr-2 h-4 w-4" /> Generate variants
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Variant inventory</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Each combination has its own SKU, price and stock level.</p>
            </div>
            <Badge variant={variants.length ? "default" : "outline"}>{variants.length} variants</Badge>
          </div>
        </CardHeader>
        <CardContent>
          {!variants.length ? (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              Generate variants above to manage inventory at combination level.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    <th className="p-3 font-medium">Combination</th><th className="p-3 font-medium">SKU</th><th className="p-3 font-medium">Price</th><th className="p-3 font-medium">Stock</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant.id} className="border-t align-middle">
                      <td className="p-3"><div className="font-medium">{variant.name}</div><div className="mt-1 flex flex-wrap gap-1">{Object.entries(variant.attributes).map(([key, itemValue]) => <Badge key={key} variant="outline" className="font-normal">{key}: {itemValue}</Badge>)}</div></td>
                      <td className="p-3"><Input className="w-40" value={variant.sku} onChange={(event) => updateVariant(variant.id, { sku: event.target.value })} /></td>
                      <td className="p-3"><Input className="w-28" type="number" min={0} value={variant.price} onChange={(event) => updateVariant(variant.id, { price: Number(event.target.value) || 0 })} /></td>
                      <td className="p-3"><Input className="w-24" type="number" min={0} value={variant.stock} onChange={(event) => updateVariant(variant.id, { stock: Number(event.target.value) || 0 })} /></td>
                      <td className="p-3"><Badge variant={variant.stock > 0 ? "default" : "destructive"}>{variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}</Badge></td>
                      <td className="p-3 text-right"><Button type="button" size="icon" variant="ghost" onClick={() => removeVariant(variant.id)} aria-label="Remove variant"><Trash2 className="h-4 w-4" /></Button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

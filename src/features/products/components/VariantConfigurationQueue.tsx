import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductVariant } from "../types/product.types";
import { getVariantSelectionLabel } from "../utils/variant.utils";

export interface PendingProductConfiguration {
  id: string;
  variant: ProductVariant;
  quantity: number;
}

interface VariantConfigurationQueueProps {
  configurations: PendingProductConfiguration[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onAddAllToCart: () => void;
  onAddAnother: () => void;
}

const VariantConfigurationQueue = ({
  configurations,
  onQuantityChange,
  onRemove,
  onAddAllToCart,
  onAddAnother,
}: VariantConfigurationQueueProps) => {
  if (!configurations.length) return null;

  const totalQuantity = configurations.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = configurations.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0,
  );

  return (
    <section className="mt-6 rounded-2xl border bg-card p-5 shadow-sm" aria-labelledby="configuration-queue-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="configuration-queue-title" className="text-base font-semibold">
            Selected configurations
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Add multiple sizes, colours, designs or other combinations from this product.
          </p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {configurations.length} {configurations.length === 1 ? "configuration" : "configurations"}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {configurations.map((item) => (
          <div key={item.id} className="rounded-xl border bg-background p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">{getVariantSelectionLabel(item.variant)}</p>
                <p className="mt-1 text-xs text-muted-foreground">SKU: {item.variant.sku}</p>
                <p className="mt-1 text-sm font-semibold">
                  GH₵ {Number(item.variant.price).toLocaleString()}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${getVariantSelectionLabel(item.variant)}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {item.variant.stock} available
              </span>
              <div className="flex items-center rounded-lg border">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={item.quantity <= 1}
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  disabled={item.quantity >= item.variant.stock}
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Total quantity</p>
          <p className="text-lg font-semibold">{totalQuantity}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Configuration total</p>
          <p className="text-xl font-bold">GH₵ {Number(totalValue).toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button type="button" variant="outline" onClick={onAddAnother}>
          <Plus className="mr-2 h-4 w-4" />
          Add another configuration
        </Button>
        <Button type="button" onClick={onAddAllToCart}>
          Add all to cart
        </Button>
      </div>
    </section>
  );
};

export default VariantConfigurationQueue;

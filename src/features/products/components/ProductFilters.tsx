import {
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import {
  useProductStore,
} from "../store/product.store";

const ProductFilters = () => {
  const filters = useProductStore(
    (state) => state.filters
  );

  const updateFilters =
    useProductStore(
      (state) => state.updateFilters
    );

  const clearFilters =
    useProductStore(
      (state) => state.clearFilters
    );

  const minPrice =
    filters.minPrice ?? 0;

  const maxPrice =
    filters.maxPrice ?? 5000;

  return (
    <aside className="space-y-6">

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">
          Filters
        </h2>

        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">
          Price Range
        </h3>

        <Slider
          value={[
            minPrice,
            maxPrice,
          ]}
          min={0}
          max={5000}
          step={10}
          onValueChange={(
            value
          ) => {
            updateFilters({
              minPrice: value[0],
              maxPrice: value[1],
            });
          }}
        />

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            GH₵ {minPrice}
          </span>

          <span>
            GH₵ {maxPrice}
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-3">
        <Checkbox
          id="in-stock"
          checked={Boolean(
            filters.inStock
          )}
          onCheckedChange={(
            checked
          ) =>
            updateFilters({
              inStock:
                checked === true,
            })
          }
        />

        <Label htmlFor="in-stock">
          In stock only
        </Label>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="on-sale"
          checked={Boolean(
            filters.onSale
          )}
          onCheckedChange={(
            checked
          ) =>
            updateFilters({
              onSale:
                checked === true,
            })
          }
        />

        <Label htmlFor="on-sale">
          On sale
        </Label>
      </div>

    </aside>
  );
};

export default ProductFilters;

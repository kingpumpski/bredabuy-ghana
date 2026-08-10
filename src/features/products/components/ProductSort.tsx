import {
  ArrowDownAZ,
} from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  ProductSort as ProductSortType,
} from "../types/product.types";

import {
  useProductStore,
} from "../store/product.store";

const ProductSort = () => {
  const sort = useProductStore(
    (state) => state.sort
  );

  const setSort = useProductStore(
    (state) => state.setSort
  );

  return (
    <div className="flex items-center gap-3">
      <ArrowDownAZ className="h-4 w-4 text-muted-foreground" />

      <Label
        htmlFor="product-sort"
        className="sr-only"
      >
        Sort products
      </Label>

      <Select
        value={sort}
        onValueChange={(value) =>
          setSort(
            value as ProductSortType
          )
        }
      >
        <SelectTrigger
          id="product-sort"
          className="w-[190px]"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="featured">
            Featured
          </SelectItem>

          <SelectItem value="newest">
            Newest
          </SelectItem>

          <SelectItem value="popular">
            Most Popular
          </SelectItem>

          <SelectItem value="rating">
            Highest Rated
          </SelectItem>

          <SelectItem value="price-low">
            Price: Low to High
          </SelectItem>

          <SelectItem value="price-high">
            Price: High to Low
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSort;

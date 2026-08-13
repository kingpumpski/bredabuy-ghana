import type { ProductFilters, ProductResult, ProductSort } from "@/features/products/types/product.types";

export interface SearchQuery {
  query?: string;
  filters?: Omit<ProductFilters, "search">;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

export type SearchResult = ProductResult;

import { productService, type ProductQuery } from "@/features/products/services/product.service";

import type { SearchQuery, SearchResult } from "../types/search.types";

const DEFAULT_PAGE_SIZE = 12;

const normalizeQuery = (query?: string) => {
  const value = query?.trim();
  return value || undefined;
};

export const searchService = {
  async searchProducts(search: SearchQuery = {}): Promise<SearchResult> {
    const query = normalizeQuery(search.query);

    const productQuery: ProductQuery = {
      page: search.page ?? 1,
      pageSize: search.pageSize ?? DEFAULT_PAGE_SIZE,
      sort: search.sort,
      filters: {
        ...(search.filters ?? {}),
        search: query,
      },
    };

    return productService.getProducts(productQuery);
  },
};

export default searchService;

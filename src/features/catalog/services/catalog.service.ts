import type {
  CatalogQuery,
  CatalogResult,
} from "../types/catalog.types";

import type { Product } from "@/features/products/types/product.types";
import {
  productService,
  type ProductQuery,
} from "@/features/products/services/product.service";

export const catalogService = {
  async search(
    query: CatalogQuery = {},
  ): Promise<CatalogResult<Product>> {
    const productQuery: ProductQuery = {
      page: query.page,
      pageSize: query.pageSize,
      sort:
        query.sort as ProductQuery["sort"],
      filters: {
        search: query.search,
        category:
          query.categoryId ?? query.categorySlug,
        brand:
          query.brandId ?? query.brandSlug,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        rating: query.rating,
        inStock: query.inStock,
        onSale: query.onSale,
      },
    };

    return productService.getProducts(productQuery);
  },
};

export default catalogService;

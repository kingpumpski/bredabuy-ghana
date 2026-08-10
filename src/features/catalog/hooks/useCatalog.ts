import {
  useQuery,
} from "@tanstack/react-query";

import productService from "@/features/products/services/product.service";

import {
  useCatalogStore,
} from "../store/catalog.store";

export function useCatalog() {
  const query =
    useCatalogStore(
      (state) => state.query
    );

  return useQuery({
    queryKey: [
      "catalog",
      query,
    ],
    queryFn: () =>
      productService.getProducts({
        page: query.page,
        pageSize:
          query.pageSize,
        filters: {
          search: query.search,
          category:
            query.categoryId,
          brand: query.brandId,
          seller:
            query.sellerId,
          minPrice:
            query.minPrice,
          maxPrice:
            query.maxPrice,
          rating:
            query.rating,
          inStock:
            query.inStock,
          onSale:
            query.onSale,
          featured:
            query.featured,
        },
        sort: query.sort,
      }),
  });
}

export default useCatalog;

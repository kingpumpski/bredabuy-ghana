import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { searchService } from "@/features/search/services/search.service";

import { productService } from "../services/product.service";
import { useProductStore } from "../store/product.store";

const PRODUCT_LIST_STALE_TIME = 60_000;
const PRODUCT_DETAIL_STALE_TIME = 5 * 60_000;
const PRODUCT_GC_TIME = 15 * 60_000;
const PRODUCT_PAGE_SIZE = 12;

export const productQueryKeys = {
  all: ["products"] as const,
  list: (
    filters: ReturnType<typeof useProductStore.getState>["filters"],
    sort: ReturnType<typeof useProductStore.getState>["sort"],
    page: number,
  ) => [
    "products",
    "list",
    { filters, sort, page, pageSize: PRODUCT_PAGE_SIZE },
  ] as const,
  detail: (idOrSlug: string) => ["products", "detail", idOrSlug] as const,
};

export const useProducts = () => {
  const filters = useProductStore((state) => state.filters);
  const sort = useProductStore((state) => state.sort);
  const page = useProductStore((state) => state.page);

  return useQuery({
    queryKey: productQueryKeys.list(filters, sort, page),
    queryFn: () =>
      searchService.searchProducts({
        query: filters.search,
        filters: {
          category: filters.category,
          brand: filters.brand,
          seller: filters.seller,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          rating: filters.rating,
          inStock: filters.inStock,
          onSale: filters.onSale,
          featured: filters.featured,
        },
        sort,
        page,
        pageSize: PRODUCT_PAGE_SIZE,
      }),
    staleTime: PRODUCT_LIST_STALE_TIME,
    gcTime: PRODUCT_GC_TIME,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
};

export const useProduct = (idOrSlug?: string) => {
  return useQuery({
    queryKey: idOrSlug
      ? productQueryKeys.detail(idOrSlug)
      : ["products", "detail", "disabled"],
    queryFn: () => productService.getProduct(idOrSlug!),
    enabled: Boolean(idOrSlug),
    staleTime: PRODUCT_DETAIL_STALE_TIME,
    gcTime: PRODUCT_GC_TIME,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

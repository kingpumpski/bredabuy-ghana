import {
  useQuery,
} from "@tanstack/react-query";

import { productService } from "../services/product.service";

import {
  useProductStore,
} from "../store/product.store";

export const useProducts = () => {
  const filters = useProductStore(
    (state) => state.filters
  );

  const sort = useProductStore(
    (state) => state.sort
  );

  const page = useProductStore(
    (state) => state.page
  );

  return useQuery({
    queryKey: [
      "products",
      filters,
      sort,
      page,
    ],

    queryFn: () =>
      productService.getProducts({
        filters,
        sort,
        page,
        pageSize: 12,
      }),
  });
};

export const useProduct = (
  idOrSlug?: string
) => {
  return useQuery({
    queryKey: [
      "product",
      idOrSlug,
    ],

    queryFn: () =>
      productService.getProduct(
        idOrSlug!
      ),

    enabled: Boolean(idOrSlug),
  });
};

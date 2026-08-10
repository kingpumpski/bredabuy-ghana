import {
  useQuery,
} from "@tanstack/react-query";

import productService from "../services/product.service";

export function useProduct(
  idOrSlug: string | undefined
) {
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
}

export default useProduct;

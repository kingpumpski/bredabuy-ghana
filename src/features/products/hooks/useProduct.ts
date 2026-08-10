import { useQuery } from "@tanstack/react-query";

import { productService } from "../services/product.service";

export function useProduct(idOrSlug?: string) {
  return useQuery({
    queryKey: ["product", idOrSlug],
    queryFn: () =>
      productService.getProduct(idOrSlug as string),
    enabled: Boolean(idOrSlug),
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts(limit = 8) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: () =>
      productService.getFeaturedProducts(limit),
    staleTime: 5 * 60 * 1000,
  });
}

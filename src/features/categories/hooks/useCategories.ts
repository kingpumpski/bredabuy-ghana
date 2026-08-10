import { useQuery } from "@tanstack/react-query";

import categoryService from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(idOrSlug?: string) {
  return useQuery({
    queryKey: ["category", idOrSlug],
    queryFn: () =>
      categoryService.getCategory(idOrSlug as string),
    enabled: Boolean(idOrSlug),
    staleTime: 5 * 60 * 1000,
  });
}

import { useQuery } from "@tanstack/react-query";

import categoryService from "../services/category.service";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    staleTime: 5 * 60 * 1000,
  });
}

import { useQuery } from "@tanstack/react-query";

import brandService from "../services/brand.service";

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => brandService.getBrands(),
    staleTime: 5 * 60 * 1000,
  });
}

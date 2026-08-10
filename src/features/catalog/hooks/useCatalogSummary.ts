import { useQuery } from "@tanstack/react-query";

import catalogService from "../services/catalog.service";

export function useCatalogSummary() {
  return useQuery({
    queryKey: ["catalog", "summary"],
    queryFn: () => catalogService.getSummary(),
    staleTime: 5 * 60 * 1000,
  });
}

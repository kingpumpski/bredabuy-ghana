import { useQuery } from "@tanstack/react-query";

import orderService from "../services/order.service";

export function useOrders(
  customerId?: string,
) {
  return useQuery({
    queryKey: ["orders", customerId],
    queryFn: () =>
      orderService.getOrders(
        customerId as string,
      ),
    enabled: Boolean(customerId),
  });
}

export function useOrder(
  orderId?: string,
) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () =>
      orderService.getOrder(
        orderId as string,
      ),
    enabled: Boolean(orderId),
  });
}

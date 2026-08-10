import type {
  ShippingAddress,
  ShippingMethod,
} from "../types/shipping.types";

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Reliable delivery to your location.",
    price: 25,
    estimatedDays: "2–5 business days",
  },
  {
    id: "express",
    name: "Express Delivery",
    description: "Priority delivery for eligible locations.",
    price: 50,
    estimatedDays: "1–2 business days",
  },
  {
    id: "pickup",
    name: "Pickup",
    description: "Collect your order from an eligible pickup point.",
    price: 0,
    estimatedDays: "Ready when notified",
  },
];

export const shippingService = {
  async getMethods(
    address?: ShippingAddress,
  ): Promise<ShippingMethod[]> {
    void address;
    return [...shippingMethods];
  },

  async calculateShipping(
    methodId: string,
    address?: ShippingAddress,
  ): Promise<number> {
    void address;

    return (
      shippingMethods.find(
        (method) => method.id === methodId,
      )?.price ?? 0
    );
  },
};

export default shippingService;

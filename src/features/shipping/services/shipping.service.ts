import type { ShippingAddress, ShippingMethod } from "../types/shipping.types";

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Reliable doorstep delivery with order tracking.",
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

const REGION_SURCHARGES: Record<string, number> = {
  "Greater Accra": 0,
  Ashanti: 10,
  Central: 5,
  Eastern: 5,
  Western: 15,
  "Western North": 20,
  Volta: 15,
  Oti: 25,
  Bono: 25,
  "Bono East": 25,
  Ahafo: 25,
  Northern: 35,
  Savannah: 40,
  "North East": 40,
  "Upper East": 45,
  "Upper West": 45,
};

export const shippingService = {
  async getMethods(
    address?: ShippingAddress,
    subtotal = 0,
  ): Promise<ShippingMethod[]> {
    const regionCharge = address ? REGION_SURCHARGES[address.region] ?? 30 : 0;
    const freeStandard = subtotal >= 500;

    return shippingMethods.map((method) => ({
      ...method,
      price:
        method.id === "pickup"
          ? 0
          : method.id === "standard"
            ? freeStandard
              ? 0
              : method.price + regionCharge
            : method.price + Math.ceil(regionCharge / 2),
    }));
  },

  async calculateShipping(
    methodId: string,
    address?: ShippingAddress,
    subtotal = 0,
  ): Promise<number> {
    const methods = await this.getMethods(address, subtotal);
    return methods.find((method) => method.id === methodId)?.price ?? 0;
  },

  async getEstimatedDelivery(
    methodId: string,
    address?: ShippingAddress,
  ): Promise<string> {
    const isAccra = address?.region === "Greater Accra";
    if (methodId === "pickup") return "Ready when notified";
    if (methodId === "express") return isAccra ? "Same day–2 business days" : "1–4 business days";
    return isAccra ? "1–3 business days" : "2–6 business days";
  },
};

export default shippingService;

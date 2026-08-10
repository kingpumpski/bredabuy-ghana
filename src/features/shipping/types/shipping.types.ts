export type GhanaRegion =
  | "Greater Accra"
  | "Ashanti"
  | "Central"
  | "Eastern"
  | "Western"
  | "Western North"
  | "Volta"
  | "Oti"
  | "Bono"
  | "Bono East"
  | "Ahafo"
  | "Northern"
  | "Savannah"
  | "North East"
  | "Upper East"
  | "Upper West";

export interface ShippingAddress {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  region: GhanaRegion | string;
  city: string;
  area: string;
  addressLine: string;
  landmark?: string;
  digitalAddress?: string;
  deliveryInstructions?: string;
  isDefault?: boolean;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

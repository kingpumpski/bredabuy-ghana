export type SellerStatus =
  | "pending"
  | "active"
  | "suspended"
  | "inactive";

export interface Seller {
  id: string;
  businessName: string;
  slug: string;
  description?: string;
  logo?: string;
  email?: string;
  phone?: string;
  status: SellerStatus;
  rating?: number;
  reviewCount?: number;
  productCount?: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

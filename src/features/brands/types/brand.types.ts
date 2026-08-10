export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  productCount?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

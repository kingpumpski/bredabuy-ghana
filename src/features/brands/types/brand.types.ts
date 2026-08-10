export interface Brand {
  id: string;
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

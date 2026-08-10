export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  productCount?: number;
  children?: Category[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  productCount?: number;
  isActive?: boolean;
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
}

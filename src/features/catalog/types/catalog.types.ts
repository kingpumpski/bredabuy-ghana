export interface CatalogQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  categorySlug?: string;
  brandId?: string;
  brandSlug?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sort?: string;
}

export interface CatalogResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CatalogFacet {
  id: string;
  name: string;
  slug: string;
  count: number;
}

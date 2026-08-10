export interface CatalogPagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface CatalogQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string;
  brandId?: string;
  sellerId?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  sort?: CatalogSort;
}

export type CatalogSort =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popular";

export interface CatalogResult<T> {
  items: T[];
  pagination: CatalogPagination;
}

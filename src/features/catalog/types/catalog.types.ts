export interface CatalogSummary {
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  featuredProducts: number;
  productsOnSale: number;
}

export interface CatalogQuery {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

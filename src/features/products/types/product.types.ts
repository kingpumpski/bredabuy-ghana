export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: Record<string, string>;
  image?: string;
}

export interface ProductRating {
  average: number;
  count: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription?: string;

  categoryId: string;
  categoryName: string;

  brandId?: string;
  brandName?: string;

  sellerId?: string;
  sellerName?: string;

  sku: string;

  price: number;
  compareAtPrice?: number;

  currency: "GHS";

  images: ProductImage[];
  variants?: ProductVariant[];

  rating: ProductRating;

  stock: number;

  isFeatured?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  isFlashSale?: boolean;

  tags?: string[];

  specifications?: Record<string, string>;

  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  seller?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
}

export type ProductSort =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "rating"
  | "popular";

export interface ProductQuery {
  page?: number;
  pageSize?: number;
  filters?: ProductFilters;
  sort?: ProductSort;
}

export interface ProductResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

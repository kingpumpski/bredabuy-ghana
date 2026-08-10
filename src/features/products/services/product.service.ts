import type {
  Product,
  ProductFilters,
  ProductSort,
} from "../types/product.types";

import { products as mockProducts } from "@/data/mockData";

const catalogue = mockProducts as unknown as Product[];

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

const normalize = (value: string) =>
  value.trim().toLowerCase();

export const productService = {
  async getProducts(
    query: ProductQuery = {}
  ): Promise<ProductResult> {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 12;
    const filters = query.filters ?? {};
    const sort = query.sort ?? "featured";

    let result = [...catalogue];

    if (filters.search) {
      const search = normalize(filters.search);

      result = result.filter((product) =>
        [
          product.name,
          product.description,
          product.categoryName,
          product.brandName ?? "",
          ...(product.tags ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(search)
      );
    }

    if (filters.category) {
      result = result.filter(
        (product) =>
          product.categoryId === filters.category ||
          product.categoryName === filters.category
      );
    }

    if (filters.brand) {
      result = result.filter(
        (product) =>
          product.brandId === filters.brand ||
          product.brandName === filters.brand
      );
    }

    if (
      filters.minPrice !== undefined
    ) {
      result = result.filter(
        (product) =>
          product.price >= filters.minPrice!
      );
    }

    if (
      filters.maxPrice !== undefined
    ) {
      result = result.filter(
        (product) =>
          product.price <= filters.maxPrice!
      );
    }

    if (filters.rating !== undefined) {
      result = result.filter(
        (product) =>
          product.rating.average >=
          filters.rating!
      );
    }

    if (filters.inStock) {
      result = result.filter(
        (product) => product.stock > 0
      );
    }

    if (filters.onSale) {
      result = result.filter(
        (product) =>
          product.isOnSale ||
          Boolean(product.compareAtPrice)
      );
    }

    switch (sort) {
      case "price-low":
        result.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        result.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            b.rating.average -
            a.rating.average
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        break;

      case "popular":
        result.sort(
          (a, b) =>
            b.rating.count -
            a.rating.count
        );
        break;

      default:
        result.sort(
          (a, b) =>
            Number(Boolean(b.isFeatured)) -
            Number(Boolean(a.isFeatured))
        );
    }

    const total = result.length;
    const totalPages =
      Math.ceil(total / pageSize);

    const start =
      (page - 1) * pageSize;

    const items = result.slice(
      start,
      start + pageSize
    );

    return {
      items,
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getProduct(
    idOrSlug: string
  ): Promise<Product | null> {
    return (
      catalogue.find(
        (product) =>
          product.id === idOrSlug ||
          product.slug === idOrSlug
      ) ?? null
    );
  },

  async getFeaturedProducts(
    limit = 8
  ): Promise<Product[]> {
    return catalogue
      .filter(
        (product) => product.isFeatured
      )
      .slice(0, limit);
  },

  async getRelatedProducts(
    product: Product,
    limit = 4
  ): Promise<Product[]> {
    return catalogue
      .filter(
        (item) =>
          item.id !== product.id &&
          item.categoryId ===
            product.categoryId
      )
      .slice(0, limit);
  },
};

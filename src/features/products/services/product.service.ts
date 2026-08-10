import apiClient from "@/services/api/client";

import type {
  Product,
  ProductFilters,
  ProductSort,
} from "../types/product.types";

import {
  products as mockProducts,
} from "@/data/mockData";

const catalogue =
  mockProducts as unknown as Product[];

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

const useMockCatalogue =
  import.meta.env.VITE_USE_MOCK_DATA !== "false";

export const productService = {
  async getProducts(
    query: ProductQuery = {}
  ): Promise<ProductResult> {
    if (!useMockCatalogue) {
      const response = await apiClient.get(
        "/products",
        {
          params: {
            page: query.page,
            pageSize: query.pageSize,
            ...query.filters,
            sort: query.sort,
          },
        }
      );

      return response.data;
    }

    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 12;
    const filters = query.filters ?? {};
    const sort = query.sort ?? "featured";

    let result = [...catalogue];

    if (filters.search) {
      const search =
        normalize(filters.search);

      result = result.filter((product) =>
        [
          product.name,
          product.description,
          product.categoryName,
          product.brandName ?? "",
          product.sellerName ?? "",
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
          product.categoryId ===
            filters.category ||
          product.categoryName ===
            filters.category
      );
    }

    if (filters.brand) {
      result = result.filter(
        (product) =>
          product.brandId ===
            filters.brand ||
          product.brandName ===
            filters.brand
      );
    }

    if (filters.seller) {
      result = result.filter(
        (product) =>
          product.sellerId ===
            filters.seller
      );
    }

    if (
      filters.minPrice !== undefined
    ) {
      result = result.filter(
        (product) =>
          product.price >=
          filters.minPrice!
      );
    }

    if (
      filters.maxPrice !== undefined
    ) {
      result = result.filter(
        (product) =>
          product.price <=
          filters.maxPrice!
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
          Boolean(
            product.compareAtPrice
          )
      );
    }

    if (filters.featured) {
      result = result.filter(
        (product) =>
          product.isFeatured === true
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
            new Date(
              b.createdAt
            ).getTime() -
            new Date(
              a.createdAt
            ).getTime()
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
            Number(
              Boolean(b.isFeatured)
            ) -
            Number(
              Boolean(a.isFeatured)
            )
        );
    }

    const total = result.length;

    const totalPages =
      Math.ceil(total / pageSize);

    const start =
      (page - 1) * pageSize;

    return {
      items: result.slice(
        start,
        start + pageSize
      ),
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  async getProduct(
    idOrSlug: string
  ): Promise<Product | null> {
    if (!useMockCatalogue) {
      const response =
        await apiClient.get(
          `/products/${idOrSlug}`
        );

      return response.data?.item ??
        response.data ??
        null;
    }

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
    const result =
      await this.getProducts({
        page: 1,
        pageSize: limit,
        filters: {
          featured: true,
        },
        sort: "featured",
      });

    return result.items;
  },

  async getRelatedProducts(
    product: Product,
    limit = 4
  ): Promise<Product[]> {
    const result =
      await this.getProducts({
        page: 1,
        pageSize: limit,
        filters: {
          category:
            product.categoryId,
        },
      });

    return result.items.filter(
      (item) =>
        item.id !== product.id
    );
  },
};

export default productService;

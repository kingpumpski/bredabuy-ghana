import { products as mockProducts } from "@/data/mockData";

import type { CatalogSummary } from "../types/catalog.types";

export const catalogService = {
  async getSummary(): Promise<CatalogSummary> {
    // const products = mockProducts as any[];
    const products = mockProducts as unknown as CatalogSummary[];

    const categories = new Set(
      products
        .map((product) =>
          product.categoryId ||
          product.categoryName,
        )
        .filter(Boolean),
    );

    const brands = new Set(
      products
        .map((product) =>
          product.brandId ||
          product.brandName,
        )
        .filter(Boolean),
    );

    return {
      totalProducts: products.length,
      totalCategories: categories.size,
      totalBrands: brands.size,
      featuredProducts: products.filter(
        (product) => product.isFeatured,
      ).length,
      productsOnSale: products.filter(
        (product) =>
          product.isOnSale ||
          Boolean(product.compareAtPrice),
      ).length,
    };
  },
};

export default catalogService;

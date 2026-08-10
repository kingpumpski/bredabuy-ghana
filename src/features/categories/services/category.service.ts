import { products as mockProducts } from "@/data/mockData";

import type { Category } from "../types/category.types";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    // const products = mockProducts as any[];
    const products = mockProducts as unknown as Category[];

    const map = new Map<string, Category>();

    for (const product of products) {
      if (!product.categoryName) {
        continue;
      }

      const id =
        product.categoryId ||
        product.categoryName;

      if (!map.has(id)) {
        map.set(id, {
          id,
          name: product.categoryName,
          slug: product.categoryName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-"),
          productCount: 0,
        });
      }

      const category = map.get(id)!;
      category.productCount =
        (category.productCount || 0) + 1;
    }

    return Array.from(map.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  },

  async getCategory(
    idOrSlug: string,
  ): Promise<Category | null> {
    const categories =
      await this.getCategories();

    return (
      categories.find(
        (category) =>
          category.id === idOrSlug ||
          category.slug === idOrSlug,
      ) ?? null
    );
  },
};

export default categoryService;

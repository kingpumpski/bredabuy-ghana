import type {
  Category,
  CategoryTree,
} from "../types/category.types";

import { mockCategories } from "@/data/mockData";

const categories = mockCategories as unknown as Category[];

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    return [...categories].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );
  },

  async getCategory(
    idOrSlug: string,
  ): Promise<Category | null> {
    return (
      categories.find(
        (category) =>
          category.id === idOrSlug ||
          category.slug === idOrSlug,
      ) ?? null
    );
  },

  async getCategoryTree(): Promise<CategoryTree[]> {
    const roots = categories.filter(
      (category) => !category.parentId,
    );

    return roots.map((root) => ({
      ...root,
      children: categories
        .filter((category) => category.parentId === root.id)
        .map((child) => ({
          ...child,
          children: [],
        })),
    }));
  },
};

export default categoryService;

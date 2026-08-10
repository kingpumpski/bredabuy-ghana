import apiClient from "@/services/api/client";

import type {
  Category,
  CategoryTree,
} from "../types/category.types";

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get("/categories");

    return response.data?.items ??
      response.data ??
      [];
  },

  async getCategory(
    idOrSlug: string
  ): Promise<Category | null> {
    const response = await apiClient.get(
      `/categories/${idOrSlug}`
    );

    return response.data?.item ??
      response.data ??
      null;
  },

  async getCategoryTree(): Promise<CategoryTree[]> {
    const response = await apiClient.get(
      "/categories/tree"
    );

    return response.data?.items ??
      response.data ??
      [];
  },
};

export default categoryService;
